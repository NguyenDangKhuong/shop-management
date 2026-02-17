// Page-level interceptor for Flow Token Extractor
// This file runs in the MAIN world (same as the page's JavaScript)
// It can access window.grecaptcha and intercept fetch calls

; (function () {
    'use strict'

    // Prevent double-injection
    if (window.__flowTokenExtractorInjected) return
    window.__flowTokenExtractorInjected = true

    const SITE_KEY = '6LdsFiUsAAAAAIjVDZcuLhaHiDn5nnHVXVRQGeMV'
    const TARGET_URL = 'aisandbox-pa.googleapis.com/v1/video:batchAsyncGenerateVideoText'

    // =============================================
    // 1. Intercept fetch to capture request data
    // =============================================
    const originalFetch = window.fetch
    window.fetch = async function (...args) {
        const [url, options] = args
        const urlStr = typeof url === 'string' ? url : (url && url.url ? url.url : '')

        if (urlStr.includes(TARGET_URL) && options && options.body) {
            try {
                const bodyStr = typeof options.body === 'string' ? options.body : null
                if (bodyStr) {
                    const bodyJson = JSON.parse(bodyStr)
                    const ctx = bodyJson.clientContext || {}
                    const recaptchaCtx = ctx.recaptchaContext || {}

                    window.postMessage({
                        type: 'VEO3_REQUEST_CAPTURED',
                        recaptchaToken: recaptchaCtx.token || '',
                        sessionId: ctx.sessionId || '',
                        projectId: ctx.projectId || '',
                        prompt: (bodyJson.requests && bodyJson.requests[0] && bodyJson.requests[0].textInput)
                            ? bodyJson.requests[0].textInput.prompt : '',
                        videoModelKey: (bodyJson.requests && bodyJson.requests[0])
                            ? bodyJson.requests[0].videoModelKey : '',
                        aspectRatio: (bodyJson.requests && bodyJson.requests[0])
                            ? bodyJson.requests[0].aspectRatio : '',
                        timestamp: new Date().toISOString()
                    }, '*')
                }
            } catch (e) { /* ignore */ }
        }

        return originalFetch.apply(this, args)
    }

    // =============================================
    // 2. On-demand reCAPTCHA token generation
    // =============================================
    function generateRecaptchaToken() {
        if (!window.grecaptcha || !window.grecaptcha.enterprise || !window.grecaptcha.enterprise.execute) {
            window.postMessage({
                type: 'VEO3_RECAPTCHA_ERROR',
                error: 'grecaptcha.enterprise not available yet. Please wait for the page to fully load.',
                timestamp: new Date().toISOString()
            }, '*')
            return
        }

        window.grecaptcha.enterprise.execute(SITE_KEY, { action: 'VIDEO_GENERATION' })
            .then(function (token) {
                window.postMessage({
                    type: 'VEO3_RECAPTCHA_GENERATED',
                    recaptchaToken: token,
                    siteKey: SITE_KEY,
                    action: 'VIDEO_GENERATION',
                    timestamp: new Date().toISOString()
                }, '*')
                console.log('🔑 reCAPTCHA token generated:', token.substring(0, 30) + '...')
            })
            .catch(function (err) {
                window.postMessage({
                    type: 'VEO3_RECAPTCHA_ERROR',
                    error: err.message || String(err),
                    timestamp: new Date().toISOString()
                }, '*')
            })
    }

    // Listen for token generation requests
    window.addEventListener('message', function (event) {
        if (event.source !== window) return
        if (event.data && event.data.type === 'GENERATE_RECAPTCHA_TOKEN') {
            generateRecaptchaToken()
        }
        // Batch generation — generate N tokens sequentially
        if (event.data && event.data.type === 'GENERATE_RECAPTCHA_BATCH') {
            var count = event.data.count || 5
            var generated = 0
            function genNext() {
                if (generated >= count) {
                    window.postMessage({ type: 'VEO3_RECAPTCHA_BATCH_DONE', total: generated }, '*')
                    return
                }
                if (!window.grecaptcha || !window.grecaptcha.enterprise) {
                    window.postMessage({ type: 'VEO3_RECAPTCHA_ERROR', error: 'grecaptcha not available', timestamp: new Date().toISOString() }, '*')
                    return
                }
                window.grecaptcha.enterprise.execute(SITE_KEY, { action: 'VIDEO_GENERATION' })
                    .then(function (token) {
                        generated++
                        window.postMessage({
                            type: 'VEO3_RECAPTCHA_GENERATED',
                            recaptchaToken: token,
                            siteKey: SITE_KEY,
                            action: 'VIDEO_GENERATION',
                            batchIndex: generated,
                            batchTotal: count,
                            timestamp: new Date().toISOString()
                        }, '*')
                        // Small delay between generations to avoid rate limiting
                        setTimeout(genNext, 500)
                    })
                    .catch(function (err) {
                        window.postMessage({
                            type: 'VEO3_RECAPTCHA_ERROR',
                            error: err.message || String(err),
                            timestamp: new Date().toISOString()
                        }, '*')
                    })
            }
            genNext()
        }
    })

    // =============================================
    // 3. Hook grecaptcha.enterprise.execute
    // =============================================
    function hookRecaptcha() {
        if (window.grecaptcha && window.grecaptcha.enterprise && window.grecaptcha.enterprise.execute) {
            const original = window.grecaptcha.enterprise.execute
            if (original.__hooked) return

            window.grecaptcha.enterprise.execute = function (...args) {
                const result = original.apply(this, args)
                if (result && result.then) {
                    result.then(function (token) {
                        window.postMessage({
                            type: 'VEO3_RECAPTCHA_GENERATED',
                            recaptchaToken: token,
                            siteKey: args[0] || '',
                            action: (args[1] && args[1].action) || '',
                            timestamp: new Date().toISOString()
                        }, '*')
                    })
                }
                return result
            }
            window.grecaptcha.enterprise.execute.__hooked = true
            console.log('🔑 grecaptcha.enterprise.execute hooked')
        }
    }

    hookRecaptcha()
    setTimeout(hookRecaptcha, 2000)
    setTimeout(hookRecaptcha, 5000)
    setTimeout(hookRecaptcha, 10000)

    console.log('🔑 Flow Token Extractor: Page interceptor installed')
})()
