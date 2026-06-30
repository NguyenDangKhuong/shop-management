import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const url = searchParams.get('url')

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        })

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to fetch video stream: ${response.status}` },
                { status: response.status }
            )
        }

        const headers = new Headers()
        headers.set('Content-Type', response.headers.get('Content-Type') || 'video/mp4')
        headers.set('Content-Disposition', 'attachment; filename="douyin-video.mp4"')
        headers.set('Accept-Ranges', 'bytes')

        const contentLength = response.headers.get('Content-Length')
        if (contentLength) {
            headers.set('Content-Length', contentLength)
        }

        // Return streaming response directly to prevent loading full video in server RAM
        return new Response(response.body, {
            status: 200,
            headers
        })
    } catch (error: any) {
        console.error('Download proxy error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to proxy download' },
            { status: 500 }
        )
    }
}
