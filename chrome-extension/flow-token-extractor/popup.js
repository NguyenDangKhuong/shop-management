// Popup logic for Flow Token Extractor

const DEFAULT_API_URL = 'https://shop.thetaphoa.store/api/veo3-tokens'

document.addEventListener('DOMContentLoaded', () => {
  const apiUrlInput = document.getElementById('apiUrl')
  const saveConfigBtn = document.getElementById('saveConfigBtn')
  const sendBtn = document.getElementById('sendBtn')
  const clearBtn = document.getElementById('clearBtn')
  const tokenList = document.getElementById('tokenList')
  const tokenCount = document.getElementById('tokenCount')
  const toast = document.getElementById('toast')
  const autoPostToggle = document.getElementById('autoPostToggle')
  const autoPostStatus = document.getElementById('autoPostStatus')
  const lastAutoPostEl = document.getElementById('lastAutoPost')
  const autoPostMinutes = document.getElementById('autoPostMinutes')


  let capturedTokens = []
  let selectedIndex = null

  // Load saved config, tokens, and auto-post state
  chrome.storage.local.get(['apiUrl', 'capturedTokens', 'autoPostEnabled', 'lastAutoPost', 'autoPostMinutes', 'capturedSiteKey'], (result) => {
    if (result.apiUrl) {
      apiUrlInput.value = result.apiUrl
    }
    if (result.capturedTokens && result.capturedTokens.length > 0) {
      capturedTokens = result.capturedTokens
      renderTokens()
    }

    if (result.autoPostEnabled) {
      autoPostToggle.checked = true
      autoPostStatus.textContent = 'ON'
      autoPostStatus.style.color = '#4caf50'
    }
    if (result.autoPostMinutes) {
      autoPostMinutes.value = result.autoPostMinutes
    }
    if (result.lastAutoPost) {
      updateLastAutoPost(result.lastAutoPost)
    }


    // Load captured siteKey
    if (result.capturedSiteKey) {
      updateSiteKeyDisplay(result.capturedSiteKey)
    }
  })

  // Save API URL config
  saveConfigBtn.addEventListener('click', () => {
    const url = apiUrlInput.value.trim()
    if (!url) {
      showToast('Please enter an API URL', 'error')
      return
    }
    chrome.storage.local.set({ apiUrl: url }, () => {
      showToast('API URL saved!', 'success')
    })
  })

  // Send selected token to API
  sendBtn.addEventListener('click', async () => {
    if (selectedIndex === null) {
      showToast('Please select a token first', 'error')
      return
    }
    const apiUrl = apiUrlInput.value.trim()
    if (!apiUrl) {
      showToast('Please configure API URL first', 'error')
      return
    }

    const tokenData = capturedTokens[selectedIndex]
    await sendTokenToApi(apiUrl, tokenData)
  })


  // Clear all captured tokens
  clearBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ type: 'CLEAR_TOKENS' }, (response) => {
      if (response && response.success) {
        capturedTokens = []
        selectedIndex = null
        renderTokens()
        showToast('Tokens cleared!', 'success')
      }
    })
  })


  // Send token to API (GET first, then PUT with id, or POST if none exist)
  async function sendTokenToApi(apiUrl, tokenData, silent = false) {
    try {
      const tokenValue = tokenData.tokenValue

      if (!tokenValue) {
        if (!silent) showToast('No ya29 token found', 'error')
        return false
      }

      // Build payload with all captured fields
      const payload = { value: tokenValue }
      if (tokenData.sessionId) payload.sessionId = tokenData.sessionId
      if (tokenData.projectId) payload.projectId = tokenData.projectId

      // Step 1: GET existing tokens to find id
      const getResponse = await fetch(apiUrl)
      const getResult = await getResponse.json()

      let response
      if (getResult.success && getResult.data && getResult.data.length > 0) {
        // PUT — update existing token with all captured data
        const existingToken = getResult.data[0]
        response = await fetch(apiUrl, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: existingToken._id,
            ...payload
          })
        })
      } else {
        // POST — no existing token, create new
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
      }

      const result = await response.json()

      if (result.success) {
        if (!silent) showToast('Token PUT successfully!', 'success')
        return true
      } else {
        if (!silent) showToast(`Error: ${result.error}`, 'error')
        return false
      }
    } catch (error) {
      if (!silent) showToast(`Network error: ${error.message}`, 'error')
      return false
    }
  }

  // Copy text to clipboard
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text)
      showToast('Copied!', 'success')
    } catch {
      showToast('Copy failed', 'error')
    }
  }

  // Render token list
  function renderTokens() {
    tokenCount.textContent = capturedTokens.length
    sendBtn.disabled = capturedTokens.length === 0
    sendBtn.disabled = capturedTokens.length === 0

    if (capturedTokens.length === 0) {
      tokenList.innerHTML = `
        <div class="empty-state">
          <div class="icon">🔍</div>
          <p>No tokens captured yet</p>
          <p class="hint">Navigate to Google Flow to start capturing headers</p>
        </div>
      `
      return
    }

    tokenList.innerHTML = capturedTokens.map((token, index) => {
      const url = token.url || 'Unknown URL'
      const time = token.timestamp ? formatTime(token.timestamp) : ''
      const ya29Preview = token.tokenValue
        ? token.tokenValue.substring(0, 40) + '...'
        : 'N/A'
      const hasRecaptcha = !!token.recaptchaToken
      const isSelected = selectedIndex === index
      const statusIcon = hasRecaptcha ? '🟠' : '🟢'
      const statusTitle = hasRecaptcha ? 'ya29 + reCAPTCHA' : 'ya29 only'

      return `
        <div class="token-item ${isSelected ? 'expanded' : ''}" data-index="${index}">
          <div class="token-item-header" data-index="${index}">
            <span class="method-badge method-${token.method || 'GET'}" title="${statusTitle}">${statusIcon}</span>
            <span class="token-url" title="ya29 token">${escapeHtml(ya29Preview)}</span>
            <span class="token-time">${time}</span>
            <span class="expand-icon">▶</span>
          </div>
          <div class="token-item-body">
            <div class="header-row">
              <span class="header-name" style="color:#e94560;font-weight:700">🔑 ya29 Token</span>
              <span class="header-value copy-btn" data-copy="${escapeHtml(token.tokenValue || '')}" title="Click to copy" style="cursor:pointer;color:#4caf50">${escapeHtml(truncate(token.tokenValue || '', 80))}</span>
            </div>
            ${token.recaptchaToken ? `
            <div class="header-row">
              <span class="header-name" style="color:#FF9800;font-weight:700">🛡️ reCAPTCHA</span>
              <span class="header-value copy-btn" data-copy="${escapeHtml(token.recaptchaToken)}" title="Click to copy" style="cursor:pointer;color:#FF9800">${escapeHtml(truncate(token.recaptchaToken, 60))}</span>
            </div>
            ` : ''}
            ${token.sessionId ? `
            <div class="header-row">
              <span class="header-name">📋 Session ID</span>
              <span class="header-value copy-btn" data-copy="${escapeHtml(token.sessionId)}" title="Click to copy" style="cursor:pointer">${escapeHtml(token.sessionId)}</span>
            </div>
            ` : ''}
            ${token.projectId ? `
            <div class="header-row">
              <span class="header-name">📁 Project ID</span>
              <span class="header-value copy-btn" data-copy="${escapeHtml(token.projectId)}" title="Click to copy" style="cursor:pointer">${escapeHtml(truncate(token.projectId, 40))}</span>
            </div>
            ` : ''}
            ${token.prompt ? `
            <div class="header-row">
              <span class="header-name">💬 Prompt</span>
              <span class="header-value" style="color:#aaa">${escapeHtml(truncate(token.prompt, 80))}</span>
            </div>
            ` : ''}
            ${token.videoModelKey ? `
            <div class="header-row">
              <span class="header-name">🎬 Model</span>
              <span class="header-value" style="color:#aaa">${escapeHtml(token.videoModelKey)}</span>
            </div>
            ` : ''}
            <div class="header-row">
              <span class="header-name">🔗 URL</span>
              <span class="header-value">${escapeHtml(truncate(url, 80))}</span>
            </div>
          </div>
        </div>
      `
    }).join('')

    // Add click handlers for expanding/selecting
    document.querySelectorAll('.token-item-header').forEach((el) => {
      el.addEventListener('click', () => {
        const index = parseInt(el.dataset.index)
        const item = el.closest('.token-item')

        if (selectedIndex === index) {
          item.classList.remove('expanded')
          selectedIndex = null
        } else {
          document.querySelectorAll('.token-item.expanded').forEach(el => el.classList.remove('expanded'))
          item.classList.add('expanded')
          selectedIndex = index
        }

        sendBtn.disabled = selectedIndex === null
      })
    })

    // Add click to copy for ya29 token values
    document.querySelectorAll('.copy-btn').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.stopPropagation()
        copyToClipboard(el.dataset.copy)
      })
    })
  }

  // Helpers
  function formatTime(isoString) {
    const date = new Date(isoString)
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  function truncate(str, maxLen) {
    return str.length > maxLen ? str.substring(0, maxLen) + '...' : str
  }

  function escapeHtml(str) {
    const div = document.createElement('div')
    div.textContent = str
    return div.innerHTML
  }

  function showToast(message, type = 'success') {
    toast.textContent = message
    toast.className = `toast ${type} show`
    setTimeout(() => {
      toast.classList.remove('show')
    }, 2500)
  }

  function updateLastAutoPost(data) {
    if (!data || !data.timestamp) {
      lastAutoPostEl.textContent = ''
      return
    }
    const time = new Date(data.timestamp).toLocaleString('vi-VN')
    const status = data.success ? '✅' : '❌'
    const errorText = data.error ? ` — ${data.error}` : ''
    lastAutoPostEl.textContent = `${status} Last: ${time}${errorText}`
    lastAutoPostEl.style.color = data.success ? '#4caf50' : '#ef5350'
  }

  // Auto-post toggle handler
  autoPostToggle.addEventListener('change', () => {
    const enabled = autoPostToggle.checked
    const minutes = parseInt(autoPostMinutes.value) || 5
    chrome.storage.local.set({ autoPostMinutes: minutes })
    chrome.runtime.sendMessage({ type: 'TOGGLE_AUTO_POST', enabled, minutes }, (response) => {
      if (response && response.success) {
        autoPostStatus.textContent = enabled ? 'ON' : 'OFF'
        autoPostStatus.style.color = enabled ? '#4caf50' : '#888'
        showToast(enabled ? `Auto-PUT enabled (every ${minutes}min)` : 'Auto-PUT disabled', 'success')
      }
    })
  })


  // Auto-refresh when storage changes
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.capturedTokens) {
      capturedTokens = changes.capturedTokens.newValue || []
      renderTokens()
    }
    if (changes.lastAutoPost && changes.lastAutoPost.newValue) {
      updateLastAutoPost(changes.lastAutoPost.newValue)
    }
    if (changes.capturedSiteKey && changes.capturedSiteKey.newValue) {
      updateSiteKeyDisplay(changes.capturedSiteKey.newValue)
    }
  })

  // ==========================================
  // WS Bridge status polling
  // ==========================================
  const wsStatusEl = document.getElementById('wsStatus')
  const wsTokenAgeEl = document.getElementById('wsTokenAge')

  async function checkWsBridgeStatus() {
    try {
      const resp = await fetch('http://localhost:3002/status')
      const data = await resp.json()

      if (data.extensionConnected) {
        wsStatusEl.textContent = '🟢 Connected'
        wsStatusEl.style.color = '#4caf50'
      } else {
        wsStatusEl.textContent = '🟡 No ext'
        wsStatusEl.style.color = '#FF9800'
      }

      if (data.hasToken && data.tokenAge != null) {
        const mins = Math.floor(data.tokenAge / 60)
        const secs = data.tokenAge % 60
        const fresh = data.tokenAge < 1800 ? '✅' : '⚠️'
        wsTokenAgeEl.textContent = `${fresh} Token: ${mins}m${secs}s old`
      } else {
        wsTokenAgeEl.textContent = 'No token'
      }
    } catch {
      wsStatusEl.textContent = '🔴 Offline'
      wsStatusEl.style.color = '#ef5350'
      wsTokenAgeEl.textContent = ''
    }
  }

  checkWsBridgeStatus()
  setInterval(checkWsBridgeStatus, 5000)

  // ==========================================
  // SiteKey display
  // ==========================================
  const siteKeyEl = document.getElementById('siteKeyValue')

  function updateSiteKeyDisplay(siteKey) {
    if (siteKey) {
      siteKeyEl.textContent = siteKey
      siteKeyEl.style.color = '#4caf50'
      siteKeyEl.title = 'Click to copy: ' + siteKey
    } else {
      siteKeyEl.textContent = '—'
      siteKeyEl.style.color = '#aaa'
    }
  }

  siteKeyEl.addEventListener('click', () => {
    const key = siteKeyEl.textContent
    if (key && key !== '—') {
      copyToClipboard(key)
    }
  })
})
