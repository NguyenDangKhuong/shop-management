import { NextRequest, NextResponse } from 'next/server'
import FacebookPostModel from '@/models/FacebookPost'
import connectDb from '@/utils/connectDb'

// GET all posts
export async function GET() {
    try {
        await connectDb()
        const posts = await FacebookPostModel.find().sort({ createdAt: -1 }).lean()
        return NextResponse.json({ success: true, data: posts })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// POST create new post
export async function POST(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const post = await FacebookPostModel.create(body)
        return NextResponse.json({ success: true, data: post })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// PUT update post
export async function PUT(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const { id, ...data } = body
        const post = await FacebookPostModel.findByIdAndUpdate(id, data, { new: true })
        return NextResponse.json({ success: true, data: post })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// DELETE post
export async function DELETE(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        await FacebookPostModel.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
