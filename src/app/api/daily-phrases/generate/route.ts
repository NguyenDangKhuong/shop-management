/**
 * ========================================================================
 * AUTO-GENERATE DAILY PHRASES — Dùng AI sinh phrases mới tự động
 * ========================================================================
 *
 * POST /api/daily-phrases/generate
 * Gọi bởi cron job (hàng tuần) → AI sinh 5-10 phrases mới → insert vào DB
 *
 * Logic:
 *   1. Lấy danh sách phrases hiện có (tránh trùng)
 *   2. Gọi AI → sinh phrases mới theo các category
 *   3. Insert vào DB với spaced repetition defaults
 */

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import DailyPhraseModel from '@/models/DailyPhrase'

export const dynamic = 'force-dynamic'

const CLI_PROXY_URL = process.env.CLI_PROXY_URL || ''
const CLI_PROXY_KEY = process.env.CLI_PROXY_API_KEY || ''
const MODEL = 'gh-gpt-4.1-mini'

const SYSTEM_PROMPT = `You are an English language expert specializing in workplace communication, particularly for software developers working at large Australian banks (like ANZ, CBA, Westpac).

Generate NEW English phrases/chunks that a Vietnamese frontend developer would frequently encounter in their daily work. Focus on:
- Daily standup meetings
- Code review / PR discussions  
- Sprint planning / retro meetings
- Casual workplace conversation (Aussie English)
- Corporate/banking jargon

For each phrase, provide:
- "phrase": the English phrase/chunk (natural, commonly used)
- "meaning": Vietnamese translation (natural, not google-translate style)
- "example": a full example sentence using the phrase in context
- "tip": usage note or cultural context (in Vietnamese)
- "category": one of "standup", "dev", "corporate", "general"

Return a JSON array of phrases. Return ONLY valid JSON array, no markdown, no code blocks.

IMPORTANT: Do NOT generate phrases that are already in the existing list provided.`

export async function POST(req: NextRequest) {
    const secret = req.headers.get('x-cron-secret')
    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        if (!CLI_PROXY_URL || !CLI_PROXY_KEY) {
            return NextResponse.json({ error: 'AI proxy not configured' }, { status: 500 })
        }

        await connectDB()

        // 1. Get existing phrases to avoid duplicates
        const existing = await DailyPhraseModel.find({}, { phrase: 1 }).lean()
        const existingPhrases = existing.map((p) => p.phrase)

        // Parse count from request body (default 5)
        let count = 5
        try {
            const body = await req.json()
            if (body?.count && typeof body.count === 'number' && body.count >= 1 && body.count <= 20) {
                count = body.count
            }
        } catch {
            // No body or invalid JSON — use default count
        }

        // 2. Call AI to generate new phrases
        const userPrompt = `Generate exactly ${count} NEW English phrases for a Vietnamese developer working at ANZ Bank Australia.

Existing phrases (DO NOT repeat these):
${existingPhrases.map((p) => `- "${p}"`).join('\n')}

Generate ${count} completely new, different phrases. Mix categories but favor "standup" and "dev".`

        const res = await fetch(CLI_PROXY_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CLI_PROXY_KEY}`,
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: userPrompt },
                ],
                temperature: 0.8,
                max_tokens: 4096,
            }),
        })

        if (!res.ok) {
            const err = await res.text()
            console.error('AI proxy error:', err)
            return NextResponse.json({ error: 'AI generation failed' }, { status: 500 })
        }

        const data = await res.json()
        const content = data?.choices?.[0]?.message?.content?.trim() || ''

        // 3. Parse AI response
        let phrases
        try {
            const cleaned = content.replace(/^```json\s*\n?/, '').replace(/\n?```$/, '')
            phrases = JSON.parse(cleaned)
        } catch {
            console.error('Failed to parse AI response:', content)
            return NextResponse.json({ error: 'Failed to parse AI response', raw: content }, { status: 500 })
        }

        if (!Array.isArray(phrases) || phrases.length === 0) {
            return NextResponse.json({ error: 'AI returned no phrases', raw: content }, { status: 500 })
        }

        // 4. Validate and filter duplicates
        const validCategories = ['standup', 'dev', 'corporate', 'general']
        const newPhrases = phrases
            .filter((p: Record<string, unknown>) =>
                p.phrase &&
                p.meaning &&
                typeof p.phrase === 'string' &&
                typeof p.meaning === 'string' &&
                !existingPhrases.some((ep) => ep.toLowerCase() === (p.phrase as string).toLowerCase())
            )
            .map((p: Record<string, unknown>) => ({
                category: validCategories.includes(p.category as string) ? p.category : 'general',
                phrase: (p.phrase as string).trim(),
                meaning: (p.meaning as string).trim(),
                example: typeof p.example === 'string' ? p.example.trim() : undefined,
                tip: typeof p.tip === 'string' ? p.tip.trim() : undefined,
                interval: 1,
                nextReviewAt: new Date(),
                easeFactor: 2.5,
                reviewCount: 0,
                lastReviewedAt: null,
            }))

        if (newPhrases.length === 0) {
            return NextResponse.json({ message: 'All generated phrases already exist', added: 0 })
        }

        // 5. Insert into DB
        const result = await DailyPhraseModel.insertMany(newPhrases)

        return NextResponse.json({
            success: true,
            added: result.length,
            phrases: result.map((p) => ({ phrase: p.phrase, category: p.category })),
        })
    } catch (err) {
        console.error('Generate phrases error:', err)
        return NextResponse.json({ error: 'Failed to generate phrases' }, { status: 500 })
    }
}
