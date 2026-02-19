// Page-level interceptor for Flow Token Extractor
// This file runs in the MAIN world (same as the page's JavaScript)
// It can access window.grecaptcha and intercept fetch calls

; (function () {
    'use strict'

    // Prevent double-injection
    if (window.__flowTokenExtractorInjected) return
    window.__flowTokenExtractorInjected = true

    const TARGET_URL = 'aisandbox-pa.googleapis.com/v1/video:batchAsyncGenerateVideoText'

    // Dynamically detected siteKey — NO fallback, must come from the page
    let detectedSiteKey = null
    let detectedAction = 'VIDEO_GENERATION'

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
    function generateRecaptchaToken(overrideSiteKey) {
        if (!window.grecaptcha || !window.grecaptcha.enterprise || !window.grecaptcha.enterprise.execute) {
            window.postMessage({
                type: 'VEO3_RECAPTCHA_ERROR',
                error: 'grecaptcha.enterprise not available yet. Please wait for the page to fully load.',
                timestamp: new Date().toISOString()
            }, '*')
            return
        }

        // Try detecting siteKey again if not yet found
        if (!detectedSiteKey) {
            detectSiteKeyFromPage()
        }

        // Priority: overrideSiteKey from server > detectedSiteKey from page
        var siteKey = overrideSiteKey || detectedSiteKey

        if (!siteKey) {
            window.postMessage({
                type: 'VEO3_RECAPTCHA_ERROR',
                error: 'No siteKey available. Please gen a video on Flow page first, or save siteKey in DB.',
                timestamp: new Date().toISOString()
            }, '*')
            return
        }

        console.log('🔑 Generating reCAPTCHA with siteKey:', siteKey, 'action:', detectedAction)

        window.grecaptcha.enterprise.execute(siteKey, { action: detectedAction })
            .then(function (token) {
                window.postMessage({
                    type: 'VEO3_RECAPTCHA_GENERATED',
                    recaptchaToken: token,
                    siteKey: siteKey,
                    action: detectedAction,
                    timestamp: new Date().toISOString()
                }, '*')
                console.log('🔑 reCAPTCHA token generated:', token.substring(0, 30) + '...')
            })
            .catch(function (err) {
                window.postMessage({
                    type: 'VEO3_RECAPTCHA_ERROR',
                    error: err.message || String(err),
                    siteKey: siteKey,
                    timestamp: new Date().toISOString()
                }, '*')
            })
    }

    // Listen for token generation requests
    window.addEventListener('message', function (event) {
        if (event.source !== window) return
        if (event.data && event.data.type === 'GENERATE_RECAPTCHA_TOKEN') {
            generateRecaptchaToken(event.data.siteKey || '')
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
                if (!detectedSiteKey) {
                    window.postMessage({ type: 'VEO3_RECAPTCHA_ERROR', error: 'No siteKey detected', timestamp: new Date().toISOString() }, '*')
                    return
                }
                window.grecaptcha.enterprise.execute(detectedSiteKey, { action: detectedAction })
                    .then(function (token) {
                        generated++
                        window.postMessage({
                            type: 'VEO3_RECAPTCHA_GENERATED',
                            recaptchaToken: token,
                            siteKey: detectedSiteKey,
                            action: detectedAction,
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
    // 3. Hook grecaptcha.enterprise.execute to auto-detect siteKey
    // =============================================
    function hookRecaptcha() {
        if (window.grecaptcha && window.grecaptcha.enterprise && window.grecaptcha.enterprise.execute) {
            const original = window.grecaptcha.enterprise.execute
            if (original.__hooked) return

            window.grecaptcha.enterprise.execute = function (...args) {
                // Auto-detect siteKey and action from the page's real calls
                if (args[0] && typeof args[0] === 'string') {
                    if (!detectedSiteKey || detectedSiteKey !== args[0]) {
                        detectedSiteKey = args[0]
                        console.log('🔑 Auto-detected reCAPTCHA siteKey:', detectedSiteKey)
                    }
                }
                if (args[1] && args[1].action) {
                    detectedAction = args[1].action
                }

                const result = original.apply(this, args)
                if (result && result.then) {
                    result.then(function (token) {
                        window.postMessage({
                            type: 'VEO3_RECAPTCHA_GENERATED',
                            recaptchaToken: token,
                            siteKey: args[0] || '',
                            action: (args[1] && args[1].action) || '',
                            autoDetected: true,
                            timestamp: new Date().toISOString()
                        }, '*')
                    })
                }
                return result
            }
            window.grecaptcha.enterprise.execute.__hooked = true
            console.log('🔑 grecaptcha.enterprise.execute hooked (auto-detect siteKey enabled)')
        }
    }

    // Detect siteKey from the reCAPTCHA script tag on the page
    function detectSiteKeyFromPage() {
        var scripts = document.querySelectorAll('script[src*="recaptcha"]')
        scripts.forEach(function (s) {
            var match = s.src.match(/render=([^&]+)/)
            if (match && match[1] && match[1] !== 'explicit') {
                detectedSiteKey = match[1]
                console.log('🔑 SiteKey from script tag:', detectedSiteKey)
            }
        })
    }

    // Retry detecting siteKey until found (page may load the script late)
    function startSiteKeyDetection() {
        detectSiteKeyFromPage()
        if (!detectedSiteKey) {
            var retryCount = 0
            var interval = setInterval(function () {
                detectSiteKeyFromPage()
                retryCount++
                if (detectedSiteKey || retryCount >= 15) { // max 30s
                    clearInterval(interval)
                    if (detectedSiteKey) {
                        console.log('🔑 SiteKey detected after', retryCount * 2, 'seconds')
                    } else {
                        console.warn('🔑 Could not detect siteKey from page after 30s')
                    }
                }
            }, 2000)
        }
    }

    startSiteKeyDetection()
    hookRecaptcha()
    setTimeout(hookRecaptcha, 2000)
    setTimeout(hookRecaptcha, 5000)
    setTimeout(hookRecaptcha, 10000)

    console.log('🔑 Flow Token Extractor: Page interceptor installed (siteKey:', detectedSiteKey || 'detecting...', ')')
})()
