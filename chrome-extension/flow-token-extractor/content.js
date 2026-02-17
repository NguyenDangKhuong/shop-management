// Content script for Flow Token Extractor
// Runs in ISOLATED world on labs.google/fx/* pages
// Relays messages between the page-level injector.js (MAIN world) and background.js

; (function () {
  'use strict'

  // Prevent double-injection
  if (window.__flowTokenContentLoaded) return
  window.__flowTokenContentLoaded = true

  // =============================================
  // Listen for messages FROM the injected page script (MAIN world)
  // =============================================
  window.addEventListener('message', (event) => {
    if (event.source !== window) return
    if (!event.data || !event.data.type) return

    const validTypes = [
      'VEO3_REQUEST_CAPTURED',
      'VEO3_RECAPTCHA_GENERATED',
      'VEO3_RECAPTCHA_ERROR',
      'VEO3_RECAPTCHA_BATCH_DONE'
    ]

    if (validTypes.includes(event.data.type)) {
      // Forward to background service worker
      chrome.runtime.sendMessage(event.data).catch(() => {
        // Extension context might not be ready yet, ignore
      })
    }
  })

  // =============================================
  // Listen for messages FROM background (trigger token generation)
  // =============================================
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'PING') {
      sendResponse({ success: true, message: 'Content script alive' })
      return true
    }
    if (message.type === 'GENERATE_RECAPTCHA_TOKEN') {
      // Forward request to the injected page script (MAIN world)
      window.postMessage({ type: 'GENERATE_RECAPTCHA_TOKEN' }, '*')
      sendResponse({ success: true, message: 'Token generation triggered' })
    }
    if (message.type === 'GENERATE_RECAPTCHA_BATCH') {
      window.postMessage({ type: 'GENERATE_RECAPTCHA_BATCH', count: message.count || 5 }, '*')
      sendResponse({ success: true, message: `Batch generation triggered (${message.count || 5})` })
    }
    return true
  })

  console.log('🔑 Flow Token Extractor: Content script loaded (ISOLATED world)')
})()
