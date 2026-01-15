import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { cookie, offset = 0, count = 100 } = body

        if (!cookie) {
            return NextResponse.json({
                success: false,
                error: 'Cookie is required'
            }, { status: 400 })
        }

        const url = `https://shop.tiktok.com/api/v1/streamer_desktop/showcase_product/list?offset=${offset}&count=${count}`

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1',
                'Cookie': cookie,
                'Referer': 'https://shop.tiktok.com/',
                'Origin': 'https://shop.tiktok.com'
            }
        })

        const data = await response.json()

        return NextResponse.json({
            success: true,
            data: data
        })

    } catch (error: any) {
        console.error('TikTok API Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}
