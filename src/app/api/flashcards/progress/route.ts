import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/../auth'
import connectDB from '@/utils/connectDb'
import FlashcardProgressModel, { type IFlashcardProgress } from '@/models/FlashcardProgress'
import { withCache, invalidateCache } from '@/lib/cache'

export const dynamic = 'force-dynamic'

/**
 * GET /api/flashcards/progress
 * Load user's flashcard progress (known card IDs)
 */
export async function GET() {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const data = await withCache(`flashcard-progress:${session.user.id}`, 300, async () => {
            await connectDB()
            const progress = await FlashcardProgressModel.findOne({ userId: session.user!.id }).lean<IFlashcardProgress>()
            return {
                algoKnown: progress?.algoKnown || [],
                interviewKnown: progress?.interviewKnown || [],
                vocabKnown: progress?.vocabKnown || [],
            }
        })

        return NextResponse.json(data)
    } catch (err) {
        console.error('Progress GET error:', err)
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
    }
}

/**
 * PUT /api/flashcards/progress
 * Toggle a card as known/unknown
 */
export async function PUT(req: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { category, cardId, known } = await req.json()

        if (!category || !cardId || typeof known !== 'boolean') {
            return NextResponse.json({ error: 'Missing fields: category, cardId, known' }, { status: 400 })
        }

        const fieldMap: Record<string, string> = {
            algo: 'algoKnown',
            interview: 'interviewKnown',
            vocab: 'vocabKnown',
        }
        const field = fieldMap[category]
        if (!field) {
            return NextResponse.json({ error: 'Invalid category' }, { status: 400 })
        }

        await connectDB()

        if (known) {
            await FlashcardProgressModel.findOneAndUpdate(
                { userId: session.user.id },
                { $addToSet: { [field]: cardId } },
                { upsert: true, new: true }
            )
        } else {
            await FlashcardProgressModel.findOneAndUpdate(
                { userId: session.user.id },
                { $pull: { [field]: cardId } },
                { upsert: true, new: true }
            )
        }

        await invalidateCache(`flashcard-progress:${session.user.id}`)
        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Progress PUT error:', err)
        return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
    }
}
