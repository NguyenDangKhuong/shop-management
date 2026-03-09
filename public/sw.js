// ═══════════════════════════════════════════════════════════════
// TheTapHoa PWA Service Worker
// ═══════════════════════════════════════════════════════════════
// Caching strategy:
// - Static assets (JS, CSS, images, fonts): Cache First
// - API calls: Network First (fallback to cache)
// - HTML pages: Network First (fallback to cache)
// ═══════════════════════════════════════════════════════════════

const CACHE_NAME = 'thetaphoa-v1'

// Assets to pre-cache on install
const PRE_CACHE = [
    '/',
    '/favicon_io/android-chrome-192x192.png',
    '/favicon_io/android-chrome-512x512.png',
]

// ─── Install: pre-cache essential assets ─────────────────────
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('📦 SW: Pre-caching assets')
            return cache.addAll(PRE_CACHE)
        })
    )
    // Activate immediately (don't wait for old SW to finish)
    self.skipWaiting()
})

// ─── Activate: clean up old caches ──────────────────────────
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => {
                        console.log('🗑️ SW: Deleting old cache:', key)
                        return caches.delete(key)
                    })
            )
        )
    )
    // Claim all clients immediately
    self.clients.claim()
})

// ─── Fetch: smart caching strategy ─────────────────────────
self.addEventListener('fetch', (event) => {
    const { request } = event
    const url = new URL(request.url)

    // Skip non-GET requests
    if (request.method !== 'GET') return

    // Skip chrome-extension, webpack HMR, and other non-http
    if (!url.protocol.startsWith('http')) return

    // Skip Next.js HMR/dev requests
    if (url.pathname.startsWith('/_next/webpack-hmr')) return

    // API calls: Network First
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(networkFirst(request))
        return
    }

    // Static assets (JS, CSS, images, fonts): Cache First
    if (isStaticAsset(url.pathname)) {
        event.respondWith(cacheFirst(request))
        return
    }

    // HTML pages: Network First
    event.respondWith(networkFirst(request))
})

// ─── Caching strategies ─────────────────────────────────────

async function cacheFirst(request) {
    const cached = await caches.match(request)
    if (cached) return cached

    try {
        const response = await fetch(request)
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME)
            cache.put(request, response.clone())
        }
        return response
    } catch {
        return new Response('Offline', { status: 503 })
    }
}

async function networkFirst(request) {
    try {
        const response = await fetch(request)
        if (response.ok) {
            const cache = await caches.open(CACHE_NAME)
            cache.put(request, response.clone())
        }
        return response
    } catch {
        const cached = await caches.match(request)
        return cached || new Response('Offline', { status: 503 })
    }
}

// ─── Helpers ────────────────────────────────────────────────

function isStaticAsset(pathname) {
    return (
        pathname.startsWith('/_next/static/') ||
        pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff|woff2|ttf)$/)
    )
}
