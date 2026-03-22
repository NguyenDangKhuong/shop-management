import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import TwitterTokenModel from '@/models/TwitterToken'

let cachedCookie: { value: string; ts: number } | null = null

async function getCookie(): Promise<string | null> {
    if (cachedCookie && Date.now() - cachedCookie.ts < 300000) return cachedCookie.value
    try {
        await connectDB()
        const token = await TwitterTokenModel.findOne().sort({ createdAt: -1 })
        if (token?.cookie) {
            cachedCookie = { value: token.cookie, ts: Date.now() }
            return token.cookie
        }
    } catch { }
    return process.env.TWITTER_COOKIE || null
}

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get('url')
    if (!url || !url.includes('video.twimg.com')) {
        return NextResponse.json({ error: 'Invalid video URL' }, { status: 400 })
    }

    try {
        const headers: Record<string, string> = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            'Referer': 'https://x.com/',
            'Origin': 'https://x.com',
        }

        const cookie = await getCookie()
        if (cookie) headers['Cookie'] = cookie

        // Pass Range header for seeking support
        const range = req.headers.get('Range')
        if (range) headers['Range'] = range

        const res = await fetch(url, { headers })

        if (!res.ok && res.status !== 206) {
            return NextResponse.json({ error: `Video fetch failed: ${res.status}` }, { status: res.status })
        }

        // Stream the response body directly
        const responseHeaders: Record<string, string> = {
            'Content-Type': res.headers.get('Content-Type') || 'video/mp4',
            'Cache-Control': 'public, max-age=21600, s-maxage=21600, immutable',
            'Accept-Ranges': 'bytes',
        }

        const contentLength = res.headers.get('Content-Length')
        if (contentLength) responseHeaders['Content-Length'] = contentLength

        const contentRange = res.headers.get('Content-Range')
        if (contentRange) responseHeaders['Content-Range'] = contentRange

        return new NextResponse(res.body, {
            status: res.status,
            headers: responseHeaders,
        })
    } catch {
        return NextResponse.json({ error: 'Failed to proxy video' }, { status: 500 })
    }
}
