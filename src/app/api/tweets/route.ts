import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import TwitterTokenModel from '@/models/TwitterToken'

// In-memory cache: username -> { html, timestamp }
const cache = new Map<string, { html: string; ts: number }>()
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

// Track rate limit cooldown
let rateLimitUntil = 0

// Cache DB cookie in memory
let cachedCookie: { value: string; ts: number } | null = null
const COOKIE_CACHE_TTL = 5 * 60 * 1000

async function getCookie(): Promise<string | null> {
    if (cachedCookie && Date.now() - cachedCookie.ts < COOKIE_CACHE_TTL) {
        return cachedCookie.value
    }
    try {
        await connectDB()
        const token = await TwitterTokenModel.findOne().sort({ createdAt: -1 })
        if (token?.cookie) {
            cachedCookie = { value: token.cookie, ts: Date.now() }
            return token.cookie
        }
    } catch {
        console.error('Failed to get cookie from DB')
    }
    return process.env.TWITTER_COOKIE || null
}

async function fetchWithRetry(url: string, headers: Record<string, string>, maxRetries = 3): Promise<Response> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        const res = await fetch(url, { headers })

        if (res.status !== 429) return res

        // Respect Retry-After header
        const retryAfter = res.headers.get('Retry-After')
        const waitMs = retryAfter
            ? parseInt(retryAfter) * 1000
            : Math.pow(2, attempt) * 1000 // exponential backoff: 1s, 2s, 4s

        rateLimitUntil = Date.now() + waitMs
        await new Promise(r => setTimeout(r, waitMs))
    }
    // Return last 429 response if all retries fail
    return fetch(url, { headers })
}

export async function GET(req: NextRequest) {
    const username = req.nextUrl.searchParams.get('username')
    if (!username) {
        return NextResponse.json({ error: 'username required' }, { status: 400 })
    }

    const key = username.toLowerCase()

    // Check cache first
    const cached = cache.get(key)
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
        return new NextResponse(cached.html, {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
                'X-Cache': 'HIT',
            },
        })
    }

    // If we're in rate limit cooldown, serve stale cache
    if (Date.now() < rateLimitUntil && cached) {
        return new NextResponse(cached.html, {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'X-Cache': 'RATE-LIMITED',
            },
        })
    }

    try {
        const url = `https://syndication.twitter.com/srv/timeline-profile/screen-name/${encodeURIComponent(key)}?dnt=true&embedId=twitter-widget-0&hideHeader=true&hideFooter=true&hideBorder=true&theme=dark&transparent=true&lang=en`

        const headers: Record<string, string> = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml',
            'Accept-Language': 'en-US,en;q=0.9',
        }

        const cookie = await getCookie()
        if (cookie) {
            headers['Cookie'] = cookie
        }

        const res = await fetchWithRetry(url, headers)

        if (!res.ok) {
            // If still rate limited after retries, serve stale cache
            if (res.status === 429 && cached) {
                return new NextResponse(cached.html, {
                    headers: {
                        'Content-Type': 'text/html; charset=utf-8',
                        'Cache-Control': 'public, s-maxage=60',
                        'X-Cache': 'STALE-429',
                    },
                })
            }
            return NextResponse.json(
                { error: `Twitter returned ${res.status}` },
                { status: res.status }
            )
        }

        let html = await res.text()

        // 1. Extract video mp4 URLs and group by video ID (highest quality)
        const mp4Regex = /https:\/\/video\.twimg\.com\/amplify_video\/(\d+)\/vid\/avc1\/(\d+)x(\d+)\/[^"\\]+\.mp4[^"\\]*/g
        const videoMap: Record<string, { url: string; w: number; h: number }> = {}
        let mp4Match
        while ((mp4Match = mp4Regex.exec(html)) !== null) {
            const [url, videoId, w, h] = mp4Match
            const width = parseInt(w)
            const height = parseInt(h)
            if (!videoMap[videoId] || width > videoMap[videoId].w) {
                videoMap[videoId] = { url, w: width, h: height }
            }
        }

        // 2. Inject client-side script to replace video thumbnails with <video> elements
        const videoMapJson = JSON.stringify(videoMap)
        const injectedScript = `<script>
(function(){
  // Bypass sensitive content warning
  var t=setInterval(function(){var b=document.querySelector('[data-testid="interstitialViewButton"]')||document.querySelector('button');if(b&&b.textContent&&b.textContent.includes('Yes')){b.click();clearInterval(t);}},300);setTimeout(function(){clearInterval(t);},5000);

  // Video map: videoId -> { url, w, h }
  var videoMap = ${videoMapJson};

  // Replace video thumbnails with actual <video> elements
  function replaceVideos() {
    var links = document.querySelectorAll('a[aria-label="View video on X"]');
    links.forEach(function(a) {
      var img = a.querySelector('img');
      if (!img) return;
      var src = img.src || '';
      var match = src.match(/amplify_video_thumb\\/(\\d+)/);
      if (!match) return;
      var videoId = match[1];
      var info = videoMap[videoId];
      if (!info) return;

      var isPortrait = info.h > info.w;
      var container = document.createElement('div');
      container.style.cssText = 'position:relative;width:100%;border-radius:12px;overflow:hidden;' +
        (isPortrait ? 'max-width:360px;margin:0 auto;' : '');
      var video = document.createElement('video');
      video.playsInline = true;
      video.controls = true;
      video.preload = 'metadata';
      video.poster = src;
      video.style.cssText = 'width:100%;display:block;border-radius:12px;aspect-ratio:' + info.w + '/' + info.h + ';object-fit:contain;';
      var source = document.createElement('source');
      source.src = '/api/tweets/video?url=' + encodeURIComponent(info.url);
      source.type = 'video/mp4';
      video.appendChild(source);
      container.appendChild(video);
      a.parentNode.replaceChild(container, a);
    });
  }

  // Wait for Twitter JS to render DOM, then replace
  var attempts = 0;
  var replacer = setInterval(function() {
    replaceVideos();
    attempts++;
    if (attempts > 20) clearInterval(replacer);
  }, 500);
})();
</script>`
        html = html.replace('</body>', injectedScript + '</body>')

        // Store in cache
        cache.set(key, { html, ts: Date.now() })

        return new NextResponse(html, {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
                'X-Cache': 'MISS',
            },
        })
    } catch {
        // Serve stale cache on error
        if (cached) {
            return new NextResponse(cached.html, {
                headers: {
                    'Content-Type': 'text/html; charset=utf-8',
                    'X-Cache': 'STALE-ERROR',
                },
            })
        }
        return NextResponse.json({ error: 'Failed to fetch tweets' }, { status: 500 })
    }
}
