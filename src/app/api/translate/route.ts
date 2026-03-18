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

        // Short text (word/phrase) → return word type + example
        const isShortText = text.trim().split(/\s+/).length <= 8

        const systemPrompt = isShortText
            ? `You are a professional translator and language expert. Translate from ${fromLang} to ${toLang}.

Return a JSON object with this exact format:
{
  "translated": "the translation",
  "wordType": "noun/verb/adjective/adverb/phrase/idiom/other",
  "example": "a natural example sentence using the ORIGINAL word/phrase in ${fromLang}",
  "exampleTranslation": "translation of the example sentence in ${toLang}"
}

Rules:
- "translated": natural, fluent translation
- "wordType": the grammatical type (noun, verb, adjective, adverb, phrase, idiom, preposition, conjunction, other)
- "example": a practical, everyday example sentence using the original input
- "exampleTranslation": translate the example sentence
- Return ONLY valid JSON, no markdown, no code blocks
- Keep technical terms, brand names as-is`
            : `You are a professional translator. Translate the following text from ${fromLang} to ${toLang}. 
Rules:
- Return ONLY the translated text, no explanations
- Preserve formatting, line breaks, and punctuation
- Keep technical terms, brand names, and code as-is
- Use natural, fluent ${toLang} (not robotic/literal)
- Fix grammar, spelling, and punctuation errors in the translation
- If the text is already in ${toLang}, fix any grammar/spelling errors and return the corrected version`

        const res = await fetch(CLI_PROXY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CLI_PROXY_KEY}`,
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: text },
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
        const content = data?.choices?.[0]?.message?.content?.trim() || ''

        // Try parsing JSON for short text
        if (isShortText) {
            try {
                const cleaned = content.replace(/^```json\s*\n?/, '').replace(/\n?```$/, '')
                const parsed = JSON.parse(cleaned)
                return NextResponse.json({
                    translated: parsed.translated || content,
                    wordType: parsed.wordType || null,
                    example: parsed.example || null,
                    exampleTranslation: parsed.exampleTranslation || null,
                })
            } catch {
                // Fallback: return as plain translation
                return NextResponse.json({ translated: content })
            }
        }

        return NextResponse.json({ translated: content })
    } catch (err) {
        console.error('Translate API error:', err)
        return NextResponse.json({ error: 'Translation failed' }, { status: 500 })
    }
}

