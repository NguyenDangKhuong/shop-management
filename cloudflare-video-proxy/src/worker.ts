/**
 * Cloudflare Worker — Twitter Video Proxy
 *
 * Proxy video từ video.twimg.com qua Cloudflare Edge (free 100k req/ngày).
 * Giải quyết 403 Forbidden khi browser load trực tiếp từ Twitter CDN.
 *
 * Flow:
 *   Browser <video> → Cloudflare Worker → video.twimg.com → Cloudflare → Browser
 *                      (thêm Referer/Origin headers)
 *
 * URL format: https://twitter-video-proxy.xxx.workers.dev/?url=<encoded_video_url>
 *
 * Deploy:
 *   cd cloudflare-video-proxy
 *   npx wrangler deploy
 */

const ALLOWED_ORIGINS = [
    'https://xvn.vercel.app',
    'https://shop.thetaphoa.store',
    'http://localhost:3000',
    'http://localhost:3001',
]

export default {
    async fetch(request: Request): Promise<Response> {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return handleCors(request, new Response(null, { status: 204 }))
        }

        const url = new URL(request.url)
        const videoUrl = url.searchParams.get('url')

        // Validate URL
        if (!videoUrl || !videoUrl.includes('video.twimg.com')) {
            return handleCors(request, Response.json(
                { error: 'Invalid video URL. Must be from video.twimg.com' },
                { status: 400 }
            ))
        }

        try {
            // Build headers to mimic browser request from x.com
            const headers: Record<string, string> = {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                'Referer': 'https://x.com/',
                'Origin': 'https://x.com',
            }

            // Pass Range header for video seeking support
            const range = request.headers.get('Range')
            if (range) headers['Range'] = range

            const res = await fetch(videoUrl, { headers })

            if (!res.ok && res.status !== 206) {
                return handleCors(request, Response.json(
                    { error: `Twitter returned ${res.status}` },
                    { status: res.status }
                ))
            }

            // Build response headers
            const responseHeaders: Record<string, string> = {
                'Content-Type': res.headers.get('Content-Type') || 'video/mp4',
                'Cache-Control': 'public, max-age=86400', // Cache 24h on Cloudflare edge
                'Accept-Ranges': 'bytes',
            }

            const contentLength = res.headers.get('Content-Length')
            if (contentLength) responseHeaders['Content-Length'] = contentLength

            const contentRange = res.headers.get('Content-Range')
            if (contentRange) responseHeaders['Content-Range'] = contentRange

            return handleCors(request, new Response(res.body, {
                status: res.status,
                headers: responseHeaders,
            }))
        } catch {
            return handleCors(request, Response.json(
                { error: 'Failed to proxy video' },
                { status: 500 }
            ))
        }
    },
}

/**
 * Add CORS headers to response
 */
function handleCors(request: Request, response: Response): Response {
    const origin = request.headers.get('Origin') || ''
    const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]

    const headers = new Headers(response.headers)
    headers.set('Access-Control-Allow-Origin', allowed)
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Range')
    headers.set('Access-Control-Expose-Headers', 'Content-Range, Content-Length')

    return new Response(response.body, {
        status: response.status,
        headers,
    })
}
