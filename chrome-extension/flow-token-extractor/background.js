// Background service worker - intercepts request headers from Google Flow

const FLOW_URL_PATTERNS = [
  '*://labs.google/*',
  '*://*.googleapis.com/*'
]

const DEFAULT_API_URL = 'https://shop.thetaphoa.store/api/veo3-tokens'
const AUTO_POST_ALARM = 'auto-post-tokens'
const AUTO_POST_INTERVAL_MINUTES = 5 // 5 minutes

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
        tokenValue,  // Clean ya29.* token
        url: details.url,
        method: details.method,
        headers: capturedHeaders,
        timestamp: new Date().toISOString()
      }

      chrome.storage.local.get(['capturedTokens'], (result) => {
        const tokens = result.capturedTokens || []

        // Deduplicate: don't add if same ya29 token already exists
        const exists = tokens.some(t => t.tokenValue === tokenValue)
        if (exists) {
          // Update timestamp of existing token
          const idx = tokens.findIndex(t => t.tokenValue === tokenValue)
          if (idx !== -1) tokens[idx].timestamp = new Date().toISOString()
          chrome.storage.local.set({ capturedTokens: tokens })
          return
        }

        // Add new token at the top
        tokens.unshift(tokenData)
        if (tokens.length > 20) tokens.length = 20

        chrome.storage.local.set({ capturedTokens: tokens })

        // Update badge
        chrome.action.setBadgeText({ text: String(tokens.length) })
        chrome.action.setBadgeBackgroundColor({ color: '#4CAF50' })
      })
    }
  },
  { urls: FLOW_URL_PATTERNS },
  ['requestHeaders', 'extraHeaders']
)

// ==========================================
// AUTO-POST: Send latest token every 2 hours
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
  const latestToken = tokens[0] // Most recent captured ya29 token

  try {
    // Step 1: GET existing veo3 tokens from API
    const getResponse = await fetch(apiUrl)
    const getResult = await getResponse.json()

    if (getResult.success && getResult.data && getResult.data.length > 0) {
      // Step 2: PUT - update only the `value` of the first existing token
      const existingToken = getResult.data[0]
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: existingToken._id,
          value: latestToken.tokenValue  // Only update value, keep others
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
      // No existing token, POST a new one with only value
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: latestToken.tokenValue })
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

// Handle alarm trigger
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === AUTO_POST_ALARM) {
    autoPostLatestToken()
  }
})

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'CLEAR_TOKENS') {
    chrome.storage.local.remove(['capturedTokens'], () => {
      chrome.action.setBadgeText({ text: '' })
      sendResponse({ success: true })
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

  if (message.type === 'POST_NOW') {
    autoPostLatestToken().then(() => sendResponse({ success: true }))
    return true
  }
})

// On startup, restore alarm if auto-post was enabled
chrome.storage.local.get(['autoPostEnabled', 'autoPostMinutes'], (result) => {
  if (result.autoPostEnabled) {
    const minutes = result.autoPostMinutes || AUTO_POST_INTERVAL_MINUTES
    chrome.alarms.create(AUTO_POST_ALARM, {
      delayInMinutes: 1,
      periodInMinutes: minutes
    })
    console.log(`🔑 Auto-post: Restored alarm on startup (every ${minutes} min)`)
  }
})

console.log('🔑 Flow Token Extractor: Background service worker started')
