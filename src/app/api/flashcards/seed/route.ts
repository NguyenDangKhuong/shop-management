import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import FlashcardModel from '@/models/Flashcard'

/**
 * POST /api/flashcards/seed
 * Temp endpoint — seed flashcards via curl. Delete after use.
 */
export async function POST(req: NextRequest) {
    try {
        const { cards } = await req.json()
        if (!Array.isArray(cards) || cards.length === 0) {
            return NextResponse.json({ error: 'cards array required' }, { status: 400 })
        }

        await connectDB()

        // Upsert each card by cardId
        let inserted = 0
        let updated = 0
        for (const card of cards) {
            const result = await FlashcardModel.findOneAndUpdate(
                { cardId: card.cardId },
                card,
                { upsert: true, new: true }
            )
            if (result.createdAt?.getTime() === result.updatedAt?.getTime()) {
                inserted++
            } else {
                updated++
            }
        }

        return NextResponse.json({
            success: true,
            total: cards.length,
            inserted,
            updated,
        })
    } catch (err) {
        console.error('Seed error:', err)
        return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
    }
}
