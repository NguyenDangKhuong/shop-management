import Veo3MediaModel from '@/models/Veo3Media'
import connectDB from '@/utils/connectDb'
import { NextRequest, NextResponse } from 'next/server'

// GET - Fetch veo3 media by accountId
export async function GET(request: NextRequest) {
    try {
        await connectDB()
        const { searchParams } = new URL(request.url)
        const accountId = searchParams.get('accountId')

        if (!accountId) {
            return NextResponse.json({
                success: false,
                error: 'accountId is required'
            }, { status: 400 })
        }

        const media = await Veo3MediaModel.find({ accountId })
            .sort({ createdAt: -1 })
            .lean()

        return NextResponse.json({ success: true, data: media })
    } catch (error: any) {
        console.error('❌ Veo3 Media GET Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

// POST - Create a new veo3 media
export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()

        if (!body.accountId || !body.mediaId) {
            return NextResponse.json({
                success: false,
                error: 'accountId and mediaId are required'
            }, { status: 400 })
        }

        const media = await Veo3MediaModel.create({
            accountId: body.accountId,
            mediaId: body.mediaId,
            mediaFile: body.mediaFile
        })

        return NextResponse.json({ success: true, data: media })
    } catch (error: any) {
        console.error('❌ Veo3 Media POST Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

// PUT - Update existing veo3 media
export async function PUT(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()
        const { id, mediaId, mediaFile } = body

        if (!id) {
            return NextResponse.json({
                success: false,
                error: 'ID is required'
            }, { status: 400 })
        }

        const updateData: any = {}
        if (mediaId !== undefined) updateData.mediaId = mediaId
        if (mediaFile !== undefined) updateData.mediaFile = mediaFile

        const updated = await Veo3MediaModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )

        if (!updated) {
            return NextResponse.json({
                success: false,
                error: 'Media not found'
            }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: updated })
    } catch (error: any) {
        console.error('❌ Veo3 Media PUT Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

// DELETE - Delete veo3 media
export async function DELETE(request: NextRequest) {
    try {
        await connectDB()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({
                success: false,
                error: 'ID is required'
            }, { status: 400 })
        }

        const deleted = await Veo3MediaModel.findByIdAndDelete(id)

        if (!deleted) {
            return NextResponse.json({
                success: false,
                error: 'Media not found'
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: 'Media deleted successfully'
        })
    } catch (error: any) {
        console.error('❌ Veo3 Media DELETE Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}
