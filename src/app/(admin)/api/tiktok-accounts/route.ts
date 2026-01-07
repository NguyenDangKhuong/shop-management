import { NextRequest, NextResponse } from 'next/server'
import TikTokAccountModel from '@/models/TikTokAccount'
import connectDb from '@/utils/connectDb'

// GET all TikTok accounts
export async function GET() {
    try {
        await connectDb()
        const accounts = await TikTokAccountModel.find().sort({ createdAt: -1 }).lean()
        return NextResponse.json({ success: true, data: accounts })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// POST create new TikTok account
export async function POST(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const account = await TikTokAccountModel.create(body)
        return NextResponse.json({ success: true, data: account })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// PUT update TikTok account
export async function PUT(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const { id, ...data } = body
        const account = await TikTokAccountModel.findByIdAndUpdate(id, data, { new: true })
        return NextResponse.json({ success: true, data: account })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// DELETE TikTok account
export async function DELETE(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        await TikTokAccountModel.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
