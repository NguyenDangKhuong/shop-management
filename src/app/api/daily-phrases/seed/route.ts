/**
 * ========================================================================
 * DAILY PHRASES SEED API — Seed phrases qua HTTP
 * ========================================================================
 *
 * POST /api/daily-phrases/seed
 * Dùng khi không thể chạy script trực tiếp (VD: production)
 */

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import DailyPhraseModel from '@/models/DailyPhrase'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DAILY_PHRASES } = require('../../../../../scripts/seed-daily-phrases')

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    const secret = req.headers.get('x-cron-secret')
    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        await connectDB()

        const existing = await DailyPhraseModel.countDocuments()
        if (existing > 0) {
            return NextResponse.json({ success: true, skipped: true, existing })
        }

        const now = new Date()
        const docs = DAILY_PHRASES.map((p) => ({
            ...p,
            interval: 1,
            nextReviewAt: now,
            easeFactor: 2.5,
            reviewCount: 0,
            lastReviewedAt: null,
        }))

        const result = await DailyPhraseModel.insertMany(docs)
        return NextResponse.json({ success: true, seeded: result.length })
    } catch (err) {
        console.error('Seed daily phrases error:', err)
        return NextResponse.json({ error: 'Failed to seed' }, { status: 500 })
    }
}
