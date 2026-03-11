import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const CLI_PROXY_URL = process.env.CLI_PROXY_URL || ''
const CLI_PROXY_KEY = process.env.CLI_PROXY_API_KEY || ''
const MODEL = 'gemini-2.5-flash'

export async function POST(req: NextRequest) {
    try {
        const { text, from, to } = await req.json()

        if (!text?.trim()) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 })
        }

        const fromLang = from === 'vi' ? 'Vietnamese' : 'English'
        const toLang = to === 'vi' ? 'Vietnamese' : 'English'

        const res = await fetch(CLI_PROXY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CLI_PROXY_KEY}`,
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    {
                        role: 'system',
                        content: `You are a professional translator. Translate the following text from ${fromLang} to ${toLang}. 
Rules:
- Return ONLY the translated text, no explanations
- Preserve formatting, line breaks, and punctuation
- Keep technical terms, brand names, and code as-is
- Use natural, fluent ${toLang} (not robotic/literal)
- If the text is already in ${toLang}, return it unchanged`,
                    },
                    {
                        role: 'user',
                        content: text,
                    },
                ],
                temperature: 0.3,
                max_tokens: 4096,
            }),
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('CLI proxy error:', err)
            return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
        }

        const data = await res.json()
        const translated = data?.choices?.[0]?.message?.content?.trim() || ''

        return NextResponse.json({ translated })
    } catch (err) {
        console.error('Translate API error:', err)
        return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
    }
}
