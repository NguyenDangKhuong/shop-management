#!/usr/bin/env node
/**
 * WebSocket Bridge Server
 * Bridges Chrome extension ↔ Next.js API for real-time ya29 token delivery
 *
 * WS port 3001: Extension connects here (push ya29, receive requests)
 * HTTP port 3002: Next.js API calls here (get token, request fresh)
 *
 * Usage: node scripts/ws-bridge.js
 */

const { WebSocketServer, WebSocket } = require('ws')
const http = require('http')

const WS_PORT = process.env.WS_PORT || 3001
const HTTP_PORT = process.env.WS_HTTP_PORT || 3002

// ==========================================
// STATE
// ==========================================
let latestToken = {
    ya29: null,
    sessionId: null,
    projectId: null,
    timestamp: null
}

let extensionClient = null
let pendingFreshRequests = [] // { resolve, timeout } for ya29
let pendingRecaptchaRequests = [] // { resolve, timeout } for reCAPTCHA

// ==========================================
// WEBSOCKET SERVER (port 3001)
// ==========================================
const wss = new WebSocketServer({ port: WS_PORT })

wss.on('connection', (ws, req) => {
    const clientIp = req.socket.remoteAddress
    console.log(`🔌 Extension connected from ${clientIp}`)
    extensionClient = ws

    ws.on('message', (data) => {
        try {
            const msg = JSON.parse(data.toString())
            handleExtensionMessage(ws, msg)
        } catch (err) {
            console.error('❌ Invalid message:', err.message)
        }
    })

    ws.on('close', () => {
        console.log('🔌 Extension disconnected')
        if (extensionClient === ws) extensionClient = null
    })

    ws.on('error', (err) => {
        console.error('❌ WS error:', err.message)
    })

    // Send current state to newly connected extension
    ws.send(JSON.stringify({
        type: 'welcome',
        hasToken: !!latestToken.ya29,
        tokenAge: latestToken.timestamp
            ? Math.floor((Date.now() - new Date(latestToken.timestamp).getTime()) / 1000)
            : null
    }))
})

function handleExtensionMessage(ws, msg) {
    switch (msg.type) {
        case 'ya29_push': {
            const prev = latestToken.ya29
            latestToken = {
                ya29: msg.token,
                sessionId: msg.sessionId || latestToken.sessionId,
                projectId: msg.projectId || latestToken.projectId,
                timestamp: new Date().toISOString()
            }

            const isNew = prev !== msg.token
            console.log(`🔑 ya29 ${isNew ? 'NEW' : 'refresh'}: ${msg.token?.substring(0, 30)}... | age=0s`)

            // Resolve any pending fresh requests
            while (pendingFreshRequests.length > 0) {
                const req = pendingFreshRequests.shift()
                clearTimeout(req.timeout)
                req.resolve(latestToken)
            }
            break
        }

        case 'recaptcha_push': {
            console.log(`🛡️ reCAPTCHA received: ${msg.token?.substring(0, 30)}...`)

            // Resolve any pending reCAPTCHA requests
            if (pendingRecaptchaRequests.length > 0) {
                const req = pendingRecaptchaRequests.shift()
                clearTimeout(req.timeout)
                req.resolve(msg.token)
                console.log(`🛡️ reCAPTCHA delivered to pending request`)
            }
            break
        }

        case 'pong': {
            // Heartbeat response
            break
        }

        default:
            console.log('📨 Unknown message type:', msg.type)
    }
}

// Heartbeat to keep connection alive
setInterval(() => {
    if (extensionClient && extensionClient.readyState === WebSocket.OPEN) {
        extensionClient.send(JSON.stringify({ type: 'ping' }))
    }
}, 30000)

// ==========================================
// HTTP SERVER (port 3002) — for Next.js API
// ==========================================
const httpServer = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Access-Control-Allow-Origin', '*')

    // GET /status
    if (req.url === '/status') {
        const tokenAge = latestToken.timestamp
            ? Math.floor((Date.now() - new Date(latestToken.timestamp).getTime()) / 1000)
            : null

        res.end(JSON.stringify({
            extensionConnected: !!(extensionClient && extensionClient.readyState === WebSocket.OPEN),
            hasToken: !!latestToken.ya29,
            tokenAge,
            tokenTimestamp: latestToken.timestamp,
            tokenPreview: latestToken.ya29 ? latestToken.ya29.substring(0, 30) + '...' : null,
            sessionId: latestToken.sessionId,
            projectId: latestToken.projectId,
            pendingRequests: pendingFreshRequests.length
        }))
        return
    }

    // GET /token — get latest ya29 from memory (no wait)
    if (req.url === '/token') {
        if (!latestToken.ya29) {
            res.statusCode = 404
            res.end(JSON.stringify({ error: 'No token available' }))
            return
        }

        const age = Math.floor((Date.now() - new Date(latestToken.timestamp).getTime()) / 1000)
        res.end(JSON.stringify({
            token: latestToken.ya29,
            sessionId: latestToken.sessionId,
            projectId: latestToken.projectId,
            age,
            timestamp: latestToken.timestamp
        }))
        return
    }

    // GET /token/fresh — request fresh ya29 from extension (waits up to 10s)
    if (req.url === '/token/fresh') {
        if (!extensionClient || extensionClient.readyState !== WebSocket.OPEN) {
            res.statusCode = 503
            res.end(JSON.stringify({ error: 'Extension not connected' }))
            return
        }

        // If token is less than 30 minutes old, return it directly
        if (latestToken.ya29 && latestToken.timestamp) {
            const age = Math.floor((Date.now() - new Date(latestToken.timestamp).getTime()) / 1000)
            if (age < 1800) { // 30 minutes
                res.end(JSON.stringify({
                    token: latestToken.ya29,
                    sessionId: latestToken.sessionId,
                    projectId: latestToken.projectId,
                    age,
                    fresh: false,
                    timestamp: latestToken.timestamp
                }))
                return
            }
        }

        // Request fresh ya29 from extension
        console.log('🔄 Requesting fresh ya29 from extension...')
        extensionClient.send(JSON.stringify({ type: 'request_fresh_ya29' }))

        // Wait for push with timeout
        const promise = new Promise((resolve) => {
            const timeout = setTimeout(() => {
                // Timeout — return whatever we have
                const idx = pendingFreshRequests.findIndex(r => r.resolve === resolve)
                if (idx !== -1) pendingFreshRequests.splice(idx, 1)

                if (latestToken.ya29) {
                    resolve(latestToken)
                } else {
                    resolve(null)
                }
            }, 10000)

            pendingFreshRequests.push({ resolve, timeout })
        })

        promise.then((token) => {
            if (!token || !token.ya29) {
                res.statusCode = 504
                res.end(JSON.stringify({ error: 'Fresh token request timed out' }))
                return
            }

            const age = Math.floor((Date.now() - new Date(token.timestamp).getTime()) / 1000)
            res.end(JSON.stringify({
                token: token.ya29,
                sessionId: token.sessionId,
                projectId: token.projectId,
                age,
                fresh: true,
                timestamp: token.timestamp
            }))
        })
        return
    }

    // GET /recaptcha/fresh?siteKey=xxx — request a fresh reCAPTCHA token from extension (generated on labs.google)
    if (req.url.startsWith('/recaptcha/fresh')) {
        if (!extensionClient || extensionClient.readyState !== WebSocket.OPEN) {
            res.statusCode = 503
            res.end(JSON.stringify({ error: 'Extension not connected' }))
            return
        }

        // Parse siteKey from query string
        const urlObj = new URL(req.url, `http://localhost:${HTTP_PORT}`)
        const siteKey = urlObj.searchParams.get('siteKey') || ''

        console.log('🛡️ Requesting fresh reCAPTCHA from extension...' + (siteKey ? ` (siteKey: ${siteKey.substring(0, 10)}...)` : ''))
        extensionClient.send(JSON.stringify({ type: 'request_recaptcha', siteKey }))

        const promise = new Promise((resolve) => {
            const timeout = setTimeout(() => {
                const idx = pendingRecaptchaRequests.findIndex(r => r.resolve === resolve)
                if (idx !== -1) pendingRecaptchaRequests.splice(idx, 1)
                resolve(null)
            }, 15000) // 15s timeout for reCAPTCHA generation

            pendingRecaptchaRequests.push({ resolve, timeout })
        })

        promise.then((token) => {
            if (!token) {
                res.statusCode = 504
                res.end(JSON.stringify({ error: 'reCAPTCHA generation timed out' }))
                return
            }

            res.end(JSON.stringify({
                token,
                source: 'extension',
                timestamp: new Date().toISOString()
            }))
        })
        return
    }

    // 404
    res.statusCode = 404
    res.end(JSON.stringify({ error: 'Not found. Use /status, /token, /token/fresh, or /recaptcha/fresh' }))
})

httpServer.listen(HTTP_PORT, () => {
    console.log('')
    console.log('===========================================')
    console.log('  🌉 WS Bridge Server')
    console.log('===========================================')
    console.log(`  WebSocket : ws://localhost:${WS_PORT}`)
    console.log(`  HTTP API  : http://localhost:${HTTP_PORT}`)
    console.log('')
    console.log('  Endpoints:')
    console.log(`    GET http://localhost:${HTTP_PORT}/status`)
    console.log(`    GET http://localhost:${HTTP_PORT}/token`)
    console.log(`    GET http://localhost:${HTTP_PORT}/token/fresh`)
    console.log(`    GET http://localhost:${HTTP_PORT}/recaptcha/fresh`)
    console.log('===========================================')
    console.log('')
    console.log('⏳ Waiting for extension to connect...')
})

wss.on('listening', () => {
    console.log(`🔌 WebSocket server listening on port ${WS_PORT}`)
})
