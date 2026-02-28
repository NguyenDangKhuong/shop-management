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

        // Auto-calculate scheduledDate & scheduledTime if not provided
        if (!body.scheduledDate || !body.scheduledTime) {
            // Find the latest scheduled post for this account
            const latestPost = await TikTokScheduledPostModel.findOne(
                { accountId: body.accountId }
            ).sort({ scheduledDate: -1, scheduledTime: -1 }).lean() as any

            let baseDate: Date

            if (latestPost?.scheduledDate && latestPost?.scheduledTime) {
                // Parse latest post date (DD/MM/YYYY HH:mm)
                const [day, month, year] = latestPost.scheduledDate.split('/')
                const [hour, minute] = latestPost.scheduledTime.split(':')
                baseDate = new Date(+year, +month - 1, +day, +hour, +minute)
            } else {
                baseDate = new Date()
            }

            // Add 2 hours + random 0-59 minutes
            const randomMinutes = Math.floor(Math.random() * 60)
            baseDate.setHours(baseDate.getHours() + 2)
            baseDate.setMinutes(baseDate.getMinutes() + randomMinutes)

            // Format back to DD/MM/YYYY and HH:mm
            const dd = String(baseDate.getDate()).padStart(2, '0')
            const mm = String(baseDate.getMonth() + 1).padStart(2, '0')
            const yyyy = baseDate.getFullYear()
            const hh = String(baseDate.getHours()).padStart(2, '0')
            const min = String(baseDate.getMinutes()).padStart(2, '0')

            body.scheduledDate = body.scheduledDate || `${dd}/${mm}/${yyyy}`
            body.scheduledTime = body.scheduledTime || `${hh}:${min}`
        }

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
