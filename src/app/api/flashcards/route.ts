import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import FlashcardModel from '@/models/Flashcard'
import { withCache } from '@/lib/cache'

export const dynamic = 'force-dynamic'

/**
 * GET /api/flashcards
 * Fetch cards, optionally filtered by type/topic/difficulty
 */
export async function GET(req: NextRequest) {
    try {
        const type = req.nextUrl.searchParams.get('type')
        const topic = req.nextUrl.searchParams.get('topic')
        const difficulty = req.nextUrl.searchParams.get('difficulty')
        const cacheKey = `flashcards:${type || ''}:${topic || ''}:${difficulty || ''}`

        const cards = await withCache(cacheKey, 300, async () => {
            await connectDB()
            const filter: Record<string, string> = {}
            if (type) filter.type = type
            if (topic) filter.topic = topic
            if (difficulty) filter.difficulty = difficulty
            return await FlashcardModel.find(filter).lean()
        })

        return NextResponse.json({ cards })
    } catch (err) {
        console.error('Flashcards GET error:', err)
        return NextResponse.json({ error: 'Failed to fetch flashcards' }, { status: 500 })
    }
}
