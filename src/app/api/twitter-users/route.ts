import TwitterUserModel from '@/models/TwitterUser'
import connectDB from '@/utils/connectDb'
import { NextRequest, NextResponse } from 'next/server'
import { withCache, invalidateCache } from '@/lib/cache'

// GET - Fetch all saved Twitter usernames
export async function GET() {
    try {
        const data = await withCache('twitter-users', 300, async () => {
            await connectDB()
            return await TwitterUserModel.find().sort({ createdAt: -1 }).lean()
        })
        return NextResponse.json({ success: true, data })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ success: false, error: message }, { status: 500 })
    }
}

// POST - Add a new Twitter username
export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const { username } = await request.json()

        if (!username || typeof username !== 'string') {
            return NextResponse.json({ success: false, error: 'Username is required' }, { status: 400 })
        }

        const clean = username.trim().toLowerCase().replace(/^@/, '')
        if (!clean) {
            return NextResponse.json({ success: false, error: 'Invalid username' }, { status: 400 })
        }

        const existing = await TwitterUserModel.findOne({ username: clean })
        if (existing) {
            return NextResponse.json({ success: false, error: 'Username đã tồn tại' }, { status: 409 })
        }

        const newUser = await TwitterUserModel.create({ username: clean })
        await invalidateCache('twitter-users')
        return NextResponse.json({ success: true, data: newUser })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ success: false, error: message }, { status: 500 })
    }
}

// DELETE - Remove a Twitter username
export async function DELETE(request: NextRequest) {
    try {
        await connectDB()
        const id = request.nextUrl.searchParams.get('id')

        if (!id) {
            return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })
        }

        const deleted = await TwitterUserModel.findByIdAndDelete(id)
        if (!deleted) {
            return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
        }

        await invalidateCache('twitter-users')
        return NextResponse.json({ success: true, message: 'Deleted' })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ success: false, error: message }, { status: 500 })
    }
}
