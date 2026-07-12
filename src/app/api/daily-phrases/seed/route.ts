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

export const dynamic = 'force-dynamic'

// Import phrase data dynamically to avoid Vercel build issues with scripts/ folder
async function getPhraseData() {
    // Use dynamic import with try/catch for flexibility
    try {
        const mod = await import('../../../../../scripts/seed-daily-phrases')
        return mod.DAILY_PHRASES
    } catch {
        // Fallback: return empty if script not bundled (shouldn't happen in production)
        console.error('Failed to import DAILY_PHRASES from scripts/')
        return []
    }
}

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

        const DAILY_PHRASES = await getPhraseData()
        if (!DAILY_PHRASES || DAILY_PHRASES.length === 0) {
            return NextResponse.json({ error: 'No phrase data found' }, { status: 500 })
        }

        const now = new Date()
        const docs = DAILY_PHRASES.map((p: Record<string, unknown>) => ({
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
