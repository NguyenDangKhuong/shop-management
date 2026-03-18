import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import VocabularyModel from '@/models/Vocabulary'

const CLI_PROXY_URL = process.env.CLI_PROXY_URL || ''
const CLI_PROXY_KEY = process.env.CLI_PROXY_API_KEY || ''
const MODEL = 'gemini-2.5-flash'

/**
 * POST /api/vocabulary/backfill
 * Temp endpoint — enrich old vocab items with wordType/example.
 * Delete after all items are backfilled.
 */
export async function POST(req: NextRequest) {
    const secret = req.headers.get('x-cron-secret')
    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        await connectDB()

        // Find items missing wordType (short text only ≤8 words)
        const items = await VocabularyModel.find({
            wordType: { $exists: false },
        }).limit(10).lean()

        if (items.length === 0) {
            return NextResponse.json({ message: 'All items enriched', updated: 0 })
        }

        let updated = 0
        for (const item of items) {
            // Only enrich short text (≤8 words)
            const wordCount = item.original.trim().split(/\s+/).length
            if (wordCount > 8) {
                // Mark as "phrase" type for long text so we don't re-process
                await VocabularyModel.updateOne({ _id: item._id }, { wordType: 'sentence' })
                updated++
                continue
            }

            const fromLang = item.from === 'vi' ? 'Vietnamese' : 'English'
            const toLang = item.to === 'vi' ? 'Vietnamese' : 'English'

            try {
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
                                content: `You are a language expert. Given a word/phrase, return JSON:
{"wordType":"noun/verb/adjective/adverb/phrase/idiom/other","example":"example sentence using the word in ${fromLang}","exampleTranslation":"translation of example in ${toLang}"}
Return ONLY valid JSON, no markdown.`
                            },
                            { role: 'user', content: item.original },
                        ],
                        temperature: 0.3,
                        max_tokens: 512,
                    }),
                })

                if (!res.ok) continue

                const data = await res.json()
                const content = data?.choices?.[0]?.message?.content?.trim() || ''
                const cleaned = content.replace(/^```json\s*\n?/, '').replace(/\n?```$/, '')
                const parsed = JSON.parse(cleaned)

                await VocabularyModel.updateOne({ _id: item._id }, {
                    wordType: parsed.wordType || 'other',
                    example: parsed.example || undefined,
                    exampleTranslation: parsed.exampleTranslation || undefined,
                })
                updated++
            } catch {
                // Skip this item on error
                continue
            }
        }

        return NextResponse.json({
            message: `Enriched ${updated}/${items.length} items`,
            updated,
            remaining: await VocabularyModel.countDocuments({ wordType: { $exists: false } }),
        })
    } catch (err) {
        console.error('Backfill error:', err)
        return NextResponse.json({ error: 'Backfill failed' }, { status: 500 })
    }
}
