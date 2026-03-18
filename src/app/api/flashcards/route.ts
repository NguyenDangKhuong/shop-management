import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import FlashcardModel from '@/models/Flashcard'

export const dynamic = 'force-dynamic'

/**
 * GET /api/flashcards
 * Fetch cards, optionally filtered by type/topic/difficulty
 */
export async function GET(req: NextRequest) {
    try {
        await connectDB()

        const type = req.nextUrl.searchParams.get('type')         // 'interview' | 'algorithm'
        const topic = req.nextUrl.searchParams.get('topic')       // e.g. 'JavaScript'
        const difficulty = req.nextUrl.searchParams.get('difficulty') // 'Easy' | 'Medium' | 'Hard'

        const filter: Record<string, string> = {}
        if (type) filter.type = type
        if (topic) filter.topic = topic
        if (difficulty) filter.difficulty = difficulty

        const cards = await FlashcardModel.find(filter).lean()

        return NextResponse.json({ cards })
    } catch (err) {
        console.error('Flashcards GET error:', err)
        return NextResponse.json({ error: 'Failed to fetch flashcards' }, { status: 500 })
    }
}
