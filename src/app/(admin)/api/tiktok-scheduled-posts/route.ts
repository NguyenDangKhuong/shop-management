import { NextRequest, NextResponse } from 'next/server'
import TikTokScheduledPostModel from '@/models/TikTokScheduledPost'
import connectDb from '@/utils/connectDb'

// GET all scheduled posts (optionally filter by accountId)
export async function GET(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const accountId = searchParams.get('accountId')

        const query = accountId ? { accountId } : {}
        const posts = await TikTokScheduledPostModel.find(query)
            .sort({ scheduledDate: 1, scheduledTime: 1 })
            .lean()

        return NextResponse.json({ success: true, data: posts })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// POST create new scheduled post
export async function POST(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const post = await TikTokScheduledPostModel.create(body)
        return NextResponse.json({ success: true, data: post })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// PUT update scheduled post
export async function PUT(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const { id, ...data } = body
        const post = await TikTokScheduledPostModel.findByIdAndUpdate(id, data, { new: true })
        return NextResponse.json({ success: true, data: post })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// DELETE scheduled post
export async function DELETE(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        await TikTokScheduledPostModel.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
