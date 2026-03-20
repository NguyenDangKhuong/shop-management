import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/../auth'
import connectDB from '@/utils/connectDb'
import RoadmapProgressModel, { type IRoadmapProgress } from '@/models/RoadmapProgress'

export const dynamic = 'force-dynamic'

/**
 * GET /api/roadmap/progress
 * Load user's roadmap learned topics
 */
export async function GET() {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        await connectDB()
        const progress = await RoadmapProgressModel.findOne({ userId: session.user.id }).lean<IRoadmapProgress>()

        return NextResponse.json({
            learnedTopics: progress?.learnedTopics || [],
        })
    } catch (err) {
        console.error('Roadmap progress GET error:', err)
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
    }
}

/**
 * PUT /api/roadmap/progress
 * Toggle a topic as learned/unlearned
 * Body: { title: string, learned: boolean }
 */
export async function PUT(req: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { title, learned } = await req.json()

        if (!title || typeof learned !== 'boolean') {
            return NextResponse.json({ error: 'Missing fields: title, learned' }, { status: 400 })
        }

        await connectDB()

        if (learned) {
            await RoadmapProgressModel.findOneAndUpdate(
                { userId: session.user.id },
                { $addToSet: { learnedTopics: title } },
                { upsert: true, new: true }
            )
        } else {
            await RoadmapProgressModel.findOneAndUpdate(
                { userId: session.user.id },
                { $pull: { learnedTopics: title } },
                { upsert: true, new: true }
            )
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Roadmap progress PUT error:', err)
        return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
    }
}
