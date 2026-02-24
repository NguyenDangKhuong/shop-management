import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const username = req.nextUrl.searchParams.get('username')
    if (!username) {
        return NextResponse.json({ error: 'username required' }, { status: 400 })
    }

    try {
        const url = `https://syndication.twitter.com/srv/timeline-profile/screen-name/${encodeURIComponent(username)}?dnt=true&embedId=twitter-widget-0&hideHeader=true&hideFooter=true&hideBorder=true&theme=dark&transparent=true&lang=en`

        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml',
                'Accept-Language': 'en-US,en;q=0.9',
            },
            next: { revalidate: 60 }, // cache for 1 min
        })

        if (!res.ok) {
            return NextResponse.json(
                { error: `Twitter returned ${res.status}` },
                { status: res.status }
            )
        }

        const html = await res.text()

        return new NextResponse(html, {
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            },
        })
    } catch {
        return NextResponse.json({ error: 'Failed to fetch tweets' }, { status: 500 })
    }
}
