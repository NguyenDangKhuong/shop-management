import TwitterUserModel from '@/models/TwitterUser'
import connectDB from '@/utils/connectDb'
import { NextRequest, NextResponse } from 'next/server'

// GET - Fetch all saved Twitter usernames
export async function GET() {
    try {
        await connectDB()
        const users = await TwitterUserModel.find().sort({ createdAt: -1 })
        return NextResponse.json({ success: true, data: users })
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

        // Check duplicate
        const existing = await TwitterUserModel.findOne({ username: clean })
        if (existing) {
            return NextResponse.json({ success: false, error: 'Username đã tồn tại' }, { status: 409 })
        }

        // Fetch avatar from Twitter syndication (best-effort)
        let avatarUrl = ''
        try {
            const res = await fetch(
                `https://syndication.twitter.com/srv/timeline-profile/screen-name/${encodeURIComponent(clean)}?dnt=true&embedId=twitter-widget-0&theme=dark`,
                {
                    headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
                    signal: AbortSignal.timeout(5000),
                }
            )
            if (res.ok) {
                const html = await res.text()
                const match = html.match(/https:\/\/pbs\.twimg\.com\/profile_images\/[^"\\]+/)
                if (match) avatarUrl = match[0]
            }
        } catch {
            // Avatar fetch failed — continue without it
        }

        const newUser = await TwitterUserModel.create({ username: clean, avatarUrl })
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

        return NextResponse.json({ success: true, message: 'Deleted' })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        return NextResponse.json({ success: false, error: message }, { status: 500 })
    }
}
