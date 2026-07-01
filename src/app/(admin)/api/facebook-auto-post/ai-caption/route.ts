import { NextRequest, NextResponse } from 'next/server'
import { CLI_PROXY_URL, CLI_PROXY_API_KEY, AI_CAPTION_MODEL } from '@/utils/constants'

export async function POST(request: NextRequest) {
    try {
        const { description, style } = await request.json()

        if (!description) {
            return NextResponse.json({ success: false, error: 'Missing description' }, { status: 400 })
        }

        if (!CLI_PROXY_URL || !CLI_PROXY_API_KEY) {
            return NextResponse.json({ success: false, error: 'AI proxy not configured' }, { status: 500 })
        }

        const styleGuide = style === 'engagement'
            ? 'Viết caption tạo tương tác cao, đặt câu hỏi cho người xem, khuyến khích bình luận và chia sẻ.'
            : style === 'informative'
                ? 'Viết caption mang tính thông tin, chia sẻ kiến thức hoặc mẹo hay từ video.'
                : 'Viết caption hấp dẫn, cuốn hút, phù hợp với phong cách giải trí trên Facebook.'

        const prompt = `Bạn là chuyên gia viết caption Facebook Việt Nam. Viết 1 caption cho video được mô tả như sau:

"${description}"

Yêu cầu:
- ${styleGuide}
- Thêm emoji phù hợp (không quá 5)
- Thêm 5-8 hashtags phổ biến liên quan (đặt cuối caption)
- Giới hạn 150 từ (không tính hashtags)
- Chỉ trả về caption, không giải thích gì thêm
- Viết bằng tiếng Việt`

        const res = await fetch(CLI_PROXY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CLI_PROXY_API_KEY}`,
            },
            body: JSON.stringify({
                model: AI_CAPTION_MODEL,
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 500,
                temperature: 0.8,
            }),
        })

        if (!res.ok) {
            const errText = await res.text()
            return NextResponse.json({ success: false, error: `AI API error: ${errText}` }, { status: 502 })
        }

        const data = await res.json()
        const caption = data.choices?.[0]?.message?.content?.trim()

        if (!caption) {
            return NextResponse.json({ success: false, error: 'AI returned empty response' }, { status: 502 })
        }

        return NextResponse.json({ success: true, caption })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
