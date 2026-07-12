/**
 * ========================================================================
 * DAILY PHRASES API — GET + PATCH (review with spaced repetition)
 * ========================================================================
 *
 * GET  /api/daily-phrases?category=standup&due=true
 *   → Lấy danh sách phrases (filter by category, due status)
 *
 * PATCH /api/daily-phrases
 *   → User review: { id, rating: 'hard' | 'good' | 'easy' }
 *   → Tính interval mới theo SM-2 → cập nhật nextReviewAt
 */

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import DailyPhraseModel from '@/models/DailyPhrase'
import type { ReviewRating } from '@/models/DailyPhrase'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        await connectDB()

        const { searchParams } = new URL(req.url)
        const category = searchParams.get('category')
        const due = searchParams.get('due')  // 'true' → only due phrases

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: any = {}
        if (category && ['standup', 'dev', 'corporate', 'general'].includes(category)) {
            filter.category = category
        }
        if (due === 'true') {
            filter.nextReviewAt = { $lte: new Date() }
        }

        const phrases = await DailyPhraseModel.find(filter)
            .sort({ nextReviewAt: 1 })
            .lean()

        // Count due phrases per category
        const now = new Date()
        const dueCount = await DailyPhraseModel.countDocuments({ nextReviewAt: { $lte: now } })

        return NextResponse.json({
            items: phrases,
            total: phrases.length,
            dueCount,
        })
    } catch (err) {
        console.error('Daily phrases GET error:', err)
        return NextResponse.json({ error: 'Failed to fetch phrases' }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { id, rating } = await req.json()

        if (!id || !rating) {
            return NextResponse.json({ error: 'id and rating required' }, { status: 400 })
        }

        const validRatings: ReviewRating[] = ['hard', 'good', 'easy']
        if (!validRatings.includes(rating)) {
            return NextResponse.json({ error: 'rating must be hard, good, or easy' }, { status: 400 })
        }

        await connectDB()

        const phrase = await DailyPhraseModel.findById(id)
        if (!phrase) {
            return NextResponse.json({ error: 'Phrase not found' }, { status: 404 })
        }

        // ── SM-2 Algorithm ──────────────────────────────────────
        const now = new Date()
        let { interval, easeFactor } = phrase

        if (rating === 'hard') {
            // Reset interval, decrease ease
            interval = 1
            easeFactor = Math.max(1.3, easeFactor - 0.3)
        } else if (rating === 'good') {
            // Normal progression
            interval = phrase.reviewCount === 0 ? 1 : Math.ceil(interval * easeFactor)
            // easeFactor stays the same
        } else {
            // Easy — accelerate + increase ease
            interval = phrase.reviewCount === 0 ? 3 : Math.ceil(interval * easeFactor * 1.5)
            easeFactor = easeFactor + 0.15
        }

        // Cap interval at 365 days max
        interval = Math.min(interval, 365)

        const nextReviewAt = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000)

        phrase.interval = interval
        phrase.easeFactor = easeFactor
        phrase.nextReviewAt = nextReviewAt
        phrase.reviewCount += 1
        phrase.lastReviewedAt = now
        await phrase.save()

        return NextResponse.json({
            success: true,
            phrase: {
                _id: phrase._id,
                interval,
                nextReviewAt,
                easeFactor: Math.round(easeFactor * 100) / 100,
                reviewCount: phrase.reviewCount,
            },
        })
    } catch (err) {
        console.error('Daily phrases PATCH error:', err)
        return NextResponse.json({ error: 'Failed to review phrase' }, { status: 500 })
    }
}
