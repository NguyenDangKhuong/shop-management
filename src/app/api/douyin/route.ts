import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const url = searchParams.get('url')

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const apiUrl = process.env.NEXT_PUBLIC_DOUYIN_API_URL || 'https://douyin-api.thetaphoa.store'

    try {
        const response = await fetch(`${apiUrl}/api/hybrid/video_data?url=${encodeURIComponent(url)}&minimal=true`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        })

        if (!response.ok) {
            return NextResponse.json({ error: `VPS API responded with status ${response.status}` }, { status: response.status })
        }

        const data = await response.json()
        return NextResponse.json(data)
    } catch (error: any) {
        console.error('Douyin proxy API error:', error)
        return NextResponse.json({ error: error.message || 'Failed to fetch video data from VPS' }, { status: 500 })
    }
}
