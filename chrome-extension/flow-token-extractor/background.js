// Background service worker - intercepts request headers from Google Flow

const FLOW_URL_PATTERNS = [
  '*://labs.google/*',
  '*://*.googleapis.com/*'
]

const DEFAULT_API_URL = 'https://shop.thetaphoa.store/api/veo3-tokens'
const DEFAULT_WS_URL = 'ws://localhost:3001'
const AUTO_POST_ALARM = 'auto-post-tokens'
const AUTO_GENERATE_ALARM = 'auto-generate-recaptcha'
const AUTO_POST_INTERVAL_MINUTES = 5
const AUTO_GENERATE_INTERVAL_MINUTES = 1 // check pool every 1 min
const POOL_MIN_AVAILABLE = 3
const POOL_BATCH_SIZE = 5

// ==========================================
// WEBSOCKET BRIDGE CLIENT
// ==========================================
let wsConnection = null
let wsReconnectAttempts = 0
const WS_MAX_RECONNECT_DELAY = 30000 // 30s max

function connectWebSocket() {
  chrome.storage.local.get(['wsUrl'], (result) => {
    const wsUrl = result.wsUrl || DEFAULT_WS_URL

    try {
      wsConnection = new WebSocket(wsUrl)

      wsConnection.onopen = () => {
        wsReconnectAttempts = 0
        console.log('🌉 WS Bridge: Connected to', wsUrl)
        chrome.action.setBadgeText({ text: '🟢' })

        // Push latest token immediately on connect
        chrome.storage.local.get(['capturedTokens'], (data) => {
          const tokens = data.capturedTokens || []
          if (tokens.length > 0 && tokens[0].tokenValue) {
            wsSend({
              type: 'ya29_push',
              token: tokens[0].tokenValue,
              sessionId: tokens[0].sessionId || '',
              projectId: tokens[0].projectId || ''
            })
          }
        })
      }

      wsConnection.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data)
          handleWsMessage(msg)
        } catch (err) {
          console.warn('🌉 WS Bridge: Invalid message', err.message)
        }
      }

      wsConnection.onclose = () => {
        console.log('🌉 WS Bridge: Disconnected')
        wsConnection = null
        scheduleReconnect()
      }

      wsConnection.onerror = (err) => {
        console.warn('🌉 WS Bridge: Error', err.message || 'connection failed')
        // onclose will handle reconnect
      }
    } catch (err) {
      console.warn('🌉 WS Bridge: Failed to connect', err.message)
      scheduleReconnect()
    }
  })
}

function scheduleReconnect() {
  wsReconnectAttempts++
  const delay = Math.min(1000 * Math.pow(2, wsReconnectAttempts), WS_MAX_RECONNECT_DELAY)
  console.log(`🌉 WS Bridge: Reconnecting in ${delay / 1000}s (attempt ${wsReconnectAttempts})`)
  setTimeout(connectWebSocket, delay)
}

function wsSend(msg) {
  if (wsConnection && wsConnection.readyState === WebSocket.OPEN) {
    wsConnection.send(JSON.stringify(msg))
    return true
  }
  return false
}

function handleWsMessage(msg) {
  switch (msg.type) {
    case 'ping':
      wsSend({ type: 'pong' })
      break

    case 'request_fresh_ya29':
      console.log('🌉 WS Bridge: Server requesting fresh ya29...')
      // Re-push latest token from storage (it gets updated by webRequest listener)
      chrome.storage.local.get(['capturedTokens'], (data) => {
        const tokens = data.capturedTokens || []
        if (tokens.length > 0 && tokens[0].tokenValue) {
          wsSend({
            type: 'ya29_push',
            token: tokens[0].tokenValue,
            sessionId: tokens[0].sessionId || '',
            projectId: tokens[0].projectId || ''
          })
          console.log('🌉 WS Bridge: Pushed latest ya29 to bridge')
        } else {
          console.warn('🌉 WS Bridge: No ya29 token available to push')
        }
      })
      break

    case 'request_recaptcha':
      console.log('🌉 WS Bridge: Server requesting fresh reCAPTCHA...' + (msg.siteKey ? ` (siteKey: ${msg.siteKey.substring(0, 10)}...)` : ''))
      triggerRecaptchaGeneration(msg.siteKey)
        .then(token => {
          wsSend({
            type: 'recaptcha_push',
            token: token
          })
          console.log('🌉 WS Bridge: reCAPTCHA generated and pushed to bridge')
        })
        .catch(err => {
          console.error('🌉 WS Bridge: Failed to generate reCAPTCHA:', err.message)
          wsSend({
            type: 'recaptcha_push',
            token: null,
            error: err.message
          })
        })
      break

    case 'welcome':
      console.log('🌉 WS Bridge: Welcome received, bridge has token:', msg.hasToken)
      break

    default:
      console.log('🌉 WS Bridge: Unknown message type:', msg.type)
  }
}

// Start WS connection
connectWebSocket()

// Listen for requests to Google Flow and extract ya29.* token
chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    if (!details.requestHeaders) return

    let tokenValue = null
    const capturedHeaders = {}

    for (const header of details.requestHeaders) {
      const nameLower = header.name.toLowerCase()

      // Look for Authorization: Bearer ya29.* token
      if (nameLower === 'authorization' && header.value) {
        const match = header.value.match(/Bearer\s+(ya29\.[^\s]+)/i)
        if (match) {
          tokenValue = match[1] // Just the ya29.xxx part
        }
        capturedHeaders[header.name] = header.value
      }

      // Also capture useful x-goog-* headers for context
      if (nameLower.startsWith('x-goog-') || nameLower === 'cookie') {
        capturedHeaders[header.name] = header.value
      }
    }

    // Only store if we found a ya29 token
    if (tokenValue) {
      const tokenData = {
        tokenValue,
        url: details.url,
        method: details.method,
        headers: capturedHeaders,
        recaptchaToken: '',
        sessionId: '',
        projectId: '',
        prompt: '',
        videoModelKey: '',
        aspectRatio: '',
        timestamp: new Date().toISOString()
      }

      // Instantly push to WS bridge (fastest path)
      wsSend({
        type: 'ya29_push',
        token: tokenValue,
        sessionId: '',
        projectId: ''
      })

      chrome.storage.local.get(['capturedTokens'], (result) => {
        const tokens = result.capturedTokens || []

        const exists = tokens.some(t => t.tokenValue === tokenValue)
        if (exists) {
          const idx = tokens.findIndex(t => t.tokenValue === tokenValue)
          if (idx !== -1) tokens[idx].timestamp = new Date().toISOString()
          chrome.storage.local.set({ capturedTokens: tokens })
          return
        }

        tokens.unshift(tokenData)
        if (tokens.length > 20) tokens.length = 20

        chrome.storage.local.set({ capturedTokens: tokens })
        chrome.action.setBadgeText({ text: String(tokens.length) })
        chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' })
      })
    }
  },
  { urls: FLOW_URL_PATTERNS },
  ['requestHeaders', 'extraHeaders']
)

// ==========================================
// AUTO-CAPTURE reCAPTCHA siteKey from page load
// Listens for requests to google.com/recaptcha/enterprise/* and extracts k= param
// ==========================================
let lastCapturedSiteKey = ''

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    try {
      const url = new URL(details.url)
      const siteKey = url.searchParams.get('k')
      if (!siteKey || siteKey === 'explicit' || siteKey === lastCapturedSiteKey) return

      lastCapturedSiteKey = siteKey
      console.log('🔑 Auto-captured reCAPTCHA siteKey:', siteKey)

      // Store in local storage
      chrome.storage.local.set({ capturedSiteKey: siteKey })

      // Push to WS bridge
      wsSend({ type: 'sitekey_push', siteKey })

      // Auto-PUT to API — get latest token ID first, then update
      fetch(DEFAULT_API_URL)
        .then(r => r.json())
        .then(data => {
          const latest = data?.data?.[0]
          if (latest?._id) {
            return fetch(DEFAULT_API_URL, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: latest._id, siteKey })
            })
          }
        })
        .then(r => r?.json())
        .then(result => {
          if (result?.success) {
            console.log('🔑 siteKey auto-saved to API:', siteKey)
          }
        })
        .catch(err => console.warn('🔑 Failed to auto-save siteKey:', err.message))
    } catch (err) {
      // ignore parse errors
    }
  },
  { urls: ['*://www.google.com/recaptcha/enterprise/*'] }
)

// ==========================================
// HELPER: Find a Veo3 tab to send messages to
// ==========================================
async function findVeo3Tab() {
  const tabs = await chrome.tabs.query({ url: '*://labs.google/fx/*' })
  return tabs.length > 0 ? tabs[0] : null
}

// ==========================================
// HELPER: Ensure content script is injected in a tab
// Fixes "Receiving end does not exist" when tab was opened before extension load
// ==========================================
async function ensureContentScriptInjected(tab) {
  try {
    // Try a ping first to check if content script is alive
    await chrome.tabs.sendMessage(tab.id, { type: 'PING' })
  } catch (err) {
    // Content script not loaded — inject both scripts programmatically
    console.log('🔑 Scripts not found, injecting into tab', tab.id)

    // 1. Inject injector.js in MAIN world (page context, accesses grecaptcha)
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['injector.js'],
      world: 'MAIN'
    })

    // 2. Inject content.js in ISOLATED world (message relay)
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    })

    // Wait for scripts to initialize
    await new Promise(r => setTimeout(r, 1000))
  }
}

// ==========================================
// HELPER: Trigger reCAPTCHA token generation on a Veo3 tab
// Returns a promise that resolves when the token is generated
// ==========================================
function triggerRecaptchaGeneration(siteKey) {
  return new Promise(async (resolve, reject) => {
    const tab = await findVeo3Tab()
    if (!tab) {
      reject(new Error('No Veo3 tab open. Please open labs.google/fx/ first.'))
      return
    }

    try {
      await ensureContentScriptInjected(tab)
    } catch (err) {
      reject(new Error('Failed to inject content script: ' + err.message))
      return
    }

    const timeout = setTimeout(() => {
      reject(new Error('reCAPTCHA token generation timed out (10s)'))
    }, 10000)

    chrome.storage.local.remove(['_lastGeneratedRecaptcha'])

    try {
      await chrome.tabs.sendMessage(tab.id, { type: 'GENERATE_RECAPTCHA_TOKEN', siteKey: siteKey || '' })
      const checkInterval = setInterval(async () => {
        const data = await chrome.storage.local.get(['_lastGeneratedRecaptcha'])
        if (data._lastGeneratedRecaptcha) {
          clearInterval(checkInterval)
          clearTimeout(timeout)
          const token = data._lastGeneratedRecaptcha
          chrome.storage.local.remove(['_lastGeneratedRecaptcha'])
          resolve(token)
        }
      }, 200)
    } catch (err) {
      clearTimeout(timeout)
      reject(err)
    }
  })
}

// ==========================================
// HELPER: Trigger batch reCAPTCHA generation on a Veo3 tab
// ==========================================
async function triggerBatchRecaptchaGeneration(count) {
  const tab = await findVeo3Tab()
  if (!tab) {
    console.warn('🛡️ Pool: No Veo3 tab open for batch generation')
    return
  }

  try {
    await ensureContentScriptInjected(tab)
  } catch (err) {
    console.warn('🛡️ Pool: Failed to inject scripts:', err.message)
    return
  }

  try {
    await chrome.tabs.sendMessage(tab.id, {
      type: 'GENERATE_RECAPTCHA_BATCH',
      count: count || POOL_BATCH_SIZE
    })
    console.log(`🛡️ Pool: Triggered batch generation of ${count || POOL_BATCH_SIZE} tokens`)
  } catch (err) {
    console.warn('🛡️ Pool: Failed to trigger batch:', err.message)
  }
}

// ==========================================
// AUTO-POST: Send latest token to API
// ==========================================
async function autoPostLatestToken() {
  const data = await chrome.storage.local.get(['capturedTokens', 'apiUrl', 'autoPostEnabled'])

  if (!data.autoPostEnabled) return

  const tokens = data.capturedTokens || []
  if (tokens.length === 0) {
    console.log('🔑 Auto-post: No tokens to send')
    return
  }

  const apiUrl = data.apiUrl || DEFAULT_API_URL
  const latestToken = tokens[0]

  // Generate a fresh reCAPTCHA token before posting
  try {
    const freshRecaptcha = await triggerRecaptchaGeneration()
    if (freshRecaptcha) {
      latestToken.recaptchaToken = freshRecaptcha
      tokens[0] = latestToken
      await chrome.storage.local.set({ capturedTokens: tokens })
      console.log('🔑 Auto-post: Fresh reCAPTCHA token generated')
    }
  } catch (err) {
    console.warn('🔑 Auto-post: Could not generate fresh reCAPTCHA:', err.message)
    // Continue with existing token if any
  }

  try {
    const getResponse = await fetch(apiUrl)
    const getResult = await getResponse.json()

    const updatePayload = { value: latestToken.tokenValue }
    if (latestToken.sessionId) updatePayload.sessionId = latestToken.sessionId
    if (latestToken.projectId) updatePayload.projectId = latestToken.projectId

    if (getResult.success && getResult.data && getResult.data.length > 0) {
      const existingToken = getResult.data[0]
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: existingToken._id,
          ...updatePayload
        })
      })

      const result = await response.json()

      chrome.storage.local.set({
        lastAutoPost: {
          timestamp: new Date().toISOString(),
          success: result.success,
          error: result.error || null,
          action: 'PUT'
        }
      })

      console.log(`🔑 Auto-post PUT: ${result.success ? '✅ Success' : '❌ Failed'} — updated token ${existingToken._id}`)
    } else {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
      })

      const result = await response.json()

      chrome.storage.local.set({
        lastAutoPost: {
          timestamp: new Date().toISOString(),
          success: result.success,
          error: result.error || null,
          action: 'POST'
        }
      })

      console.log(`🔑 Auto-post POST: ${result.success ? '✅ Success' : '❌ Failed'}`)
    }
  } catch (error) {
    chrome.storage.local.set({
      lastAutoPost: {
        timestamp: new Date().toISOString(),
        success: false,
        error: error.message
      }
    })
    console.error('🔑 Auto-post error:', error)
  }
}

// ==========================================
// AUTO-GENERATE: Check pool and refill if needed
// ==========================================
async function autoGenerateRecaptchaToken() {
  const data = await chrome.storage.local.get(['autoGenerateEnabled', 'apiUrl'])
  if (!data.autoGenerateEnabled) return

  // Check pool stats from API
  try {
    const baseUrl = (data.apiUrl || DEFAULT_API_URL).replace('/veo3-tokens', '')
    const resp = await fetch(baseUrl + '/veo3-recaptcha')
    const result = await resp.json()

    if (result.success) {
      const { available, used, expired } = result.data
      console.log(`🛡️ Pool stats: ${available} available, ${used} used, ${expired} expired`)

      // Clean up used/expired tokens
      if (used > 0 || expired > 0) {
        await fetch(baseUrl + '/veo3-recaptcha', { method: 'DELETE' })
        console.log('🛡️ Pool: Cleaned used/expired tokens')
      }

      // Refill if below threshold
      if (available < POOL_MIN_AVAILABLE) {
        const needed = POOL_BATCH_SIZE - available
        console.log(`🛡️ Pool: ${available} available < ${POOL_MIN_AVAILABLE} min, generating ${needed} more`)
        await triggerBatchRecaptchaGeneration(needed)
      }
    }
  } catch (err) {
    console.warn('🛡️ Pool: Error checking pool:', err.message)
    // Fallback: just generate a batch
    await triggerBatchRecaptchaGeneration(POOL_BATCH_SIZE)
  }
}

// Handle alarm triggers
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === AUTO_POST_ALARM) {
    autoPostLatestToken()
  }
  if (alarm.name === AUTO_GENERATE_ALARM) {
    autoGenerateRecaptchaToken()
  }
})

// ==========================================
// MESSAGE HANDLERS
// ==========================================
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CLEAR_TOKENS') {
    chrome.storage.local.remove(['capturedTokens'], () => {
      chrome.action.setBadgeText({ text: '' })
      sendResponse({ success: true })
    })
    return true
  }

  // Handle captured Veo3 request data from content script (fetch intercept)
  if (message.type === 'VEO3_REQUEST_CAPTURED') {
    chrome.storage.local.get(['capturedTokens'], (result) => {
      const tokens = result.capturedTokens || []
      if (tokens.length > 0) {
        tokens[0].recaptchaToken = message.recaptchaToken || tokens[0].recaptchaToken
        tokens[0].sessionId = message.sessionId || tokens[0].sessionId
        tokens[0].projectId = message.projectId || tokens[0].projectId
        tokens[0].prompt = message.prompt || tokens[0].prompt
        tokens[0].videoModelKey = message.videoModelKey || tokens[0].videoModelKey
        tokens[0].aspectRatio = message.aspectRatio || tokens[0].aspectRatio
        tokens[0].timestamp = message.timestamp || new Date().toISOString()

        chrome.storage.local.set({ capturedTokens: tokens })
        chrome.action.setBadgeBackgroundColor({ color: '#FF9800' })
        console.log('🔑 Veo3 request captured: reCAPTCHA + sessionId + projectId merged')

        // Push updated ya29 with sessionId/projectId to WS bridge
        wsSend({
          type: 'ya29_push',
          token: tokens[0].tokenValue,
          sessionId: tokens[0].sessionId || '',
          projectId: tokens[0].projectId || ''
        })
      }
    })
    sendResponse({ success: true })
    return true
  }

  // Handle generated reCAPTCHA token (from content script / on-demand generation)
  if (message.type === 'VEO3_RECAPTCHA_GENERATED') {
    const recaptchaToken = message.recaptchaToken

    // Store for pending single-gen resolve (used by triggerRecaptchaGeneration)
    chrome.storage.local.set({ _lastGeneratedRecaptcha: recaptchaToken })
    chrome.action.setBadgeBackgroundColor({ color: '#FF9800' })

    console.log('🛡️ reCAPTCHA generated:', recaptchaToken.substring(0, 30) + '...')

    sendResponse({ success: true })
    return true
  }

  // Handle batch generation complete
  if (message.type === 'VEO3_RECAPTCHA_BATCH_DONE') {
    console.log(`🛡️ Batch complete: ${message.total} tokens generated and sent to pool`)
    sendResponse({ success: true })
    return true
  }

  // Handle reCAPTCHA generation error
  if (message.type === 'VEO3_RECAPTCHA_ERROR') {
    console.error('🔑 reCAPTCHA generation error:', message.error)
    chrome.storage.local.set({
      lastRecaptchaError: {
        error: message.error,
        timestamp: message.timestamp
      }
    })
    sendResponse({ success: false, error: message.error })
    return true
  }

  // Trigger manual reCAPTCHA generation from popup
  if (message.type === 'GENERATE_TOKEN_NOW') {
    triggerRecaptchaGeneration()
      .then(token => {
        sendResponse({ success: true, token: token ? token.substring(0, 30) + '...' : null })
      })
      .catch(err => {
        sendResponse({ success: false, error: err.message })
      })
    return true
  }

  if (message.type === 'TOGGLE_AUTO_POST') {
    const enabled = message.enabled
    const minutes = message.minutes || AUTO_POST_INTERVAL_MINUTES
    chrome.storage.local.set({ autoPostEnabled: enabled, autoPostMinutes: minutes })

    if (enabled) {
      chrome.alarms.create(AUTO_POST_ALARM, {
        delayInMinutes: 1,
        periodInMinutes: minutes
      })
      console.log(`🔑 Auto-post: ENABLED (every ${minutes} min)`)
    } else {
      chrome.alarms.clear(AUTO_POST_ALARM)
      console.log('🔑 Auto-post: DISABLED')
    }

    sendResponse({ success: true, enabled })
    return true
  }

  // Toggle auto-generate reCAPTCHA token
  if (message.type === 'TOGGLE_AUTO_GENERATE') {
    const enabled = message.enabled
    chrome.storage.local.set({ autoGenerateEnabled: enabled })

    if (enabled) {
      chrome.alarms.create(AUTO_GENERATE_ALARM, {
        delayInMinutes: 0.1, // Start almost immediately
        periodInMinutes: AUTO_GENERATE_INTERVAL_MINUTES
      })
      // Also trigger immediately
      triggerRecaptchaGeneration().catch(err => console.warn('🔑 Initial generate error:', err.message))
      console.log(`🔑 Auto-generate: ENABLED (every ${AUTO_GENERATE_INTERVAL_MINUTES} min)`)
    } else {
      chrome.alarms.clear(AUTO_GENERATE_ALARM)
      console.log('🔑 Auto-generate: DISABLED')
    }

    sendResponse({ success: true, enabled })
    return true
  }

  if (message.type === 'POST_NOW') {
    autoPostLatestToken().then(() => sendResponse({ success: true }))
    return true
  }
})

// On startup, restore alarms if they were enabled
chrome.storage.local.get(['autoPostEnabled', 'autoPostMinutes', 'autoGenerateEnabled'], (result) => {
  if (result.autoPostEnabled) {
    const minutes = result.autoPostMinutes || AUTO_POST_INTERVAL_MINUTES
    chrome.alarms.create(AUTO_POST_ALARM, {
      delayInMinutes: 1,
      periodInMinutes: minutes
    })
    console.log(`🔑 Auto-post: Restored alarm on startup (every ${minutes} min)`)
  }
  if (result.autoGenerateEnabled) {
    chrome.alarms.create(AUTO_GENERATE_ALARM, {
      delayInMinutes: 0.5,
      periodInMinutes: AUTO_GENERATE_INTERVAL_MINUTES
    })
    console.log(`🔑 Auto-generate: Restored alarm on startup (every ${AUTO_GENERATE_INTERVAL_MINUTES} min)`)
  }
})

console.log('🔑 Flow Token Extractor: Background service worker started')
