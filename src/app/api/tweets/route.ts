import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import TwitterTokenModel from '@/models/TwitterToken'

// In-memory cache: username -> { html, timestamp }
const cache = new Map<string, { html: string; ts: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

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
    return process.env.TWITTER_COOKIE || null // fallback to env
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
                'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
                'X-Cache': 'HIT',
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

        const res = await fetch(url, { headers })

        if (!res.ok) {
            // If rate limited but have stale cache, serve it
            if (res.status === 429 && cached) {
                return new NextResponse(cached.html, {
                    headers: {
                        'Content-Type': 'text/html; charset=utf-8',
                        'Cache-Control': 'public, s-maxage=60',
                        'X-Cache': 'STALE',
                    },
                })
            }
            return NextResponse.json(
                { error: `Twitter returned ${res.status}` },
                { status: res.status }
            )
        }

        let html = await res.text()

        // Auto-bypass "sensitive content" warning
        const bypassScript = `<script>
(function(){var t=setInterval(function(){var b=document.querySelector('[data-testid="interstitialViewButton"]')||document.querySelector('button');if(b&&b.textContent&&b.textContent.includes('Yes')){b.click();clearInterval(t);}},300);setTimeout(function(){clearInterval(t);},5000);})();
</script>`
        html = html.replace('</body>', bypassScript + '</body>')

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
