import TikTokMusicModel from '@/models/TikTokMusic'
import connectDB from '@/utils/connectDb'
import { NextRequest, NextResponse } from 'next/server'

// GET - Fetch all music or random one (?random=1)
export async function GET(request: NextRequest) {
    try {
        await connectDB()
        const { searchParams } = new URL(request.url)
        const random = searchParams.get('random')

        if (random) {
            const [randomMusic] = await TikTokMusicModel.aggregate([
                { $sample: { size: 1 } }
            ])

            if (!randomMusic) {
                return NextResponse.json({
                    success: false,
                    error: 'No music found'
                }, { status: 404 })
            }

            return NextResponse.json({ success: true, data: randomMusic })
        }

        const music = await TikTokMusicModel.find()
            .sort({ createdAt: -1 })
            .lean()

        return NextResponse.json({ success: true, data: music })
    } catch (error: any) {
        console.error('❌ TikTok Music GET Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

// POST - Create new music
export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()

        if (!body.name) {
            return NextResponse.json({
                success: false,
                error: 'name is required'
            }, { status: 400 })
        }

        const music = await TikTokMusicModel.create({
            name: body.name,
            music: body.music
        })

        return NextResponse.json({ success: true, data: music })
    } catch (error: any) {
        console.error('❌ TikTok Music POST Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

// PUT - Update music
export async function PUT(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()
        const { id, ...data } = body

        if (!id) {
            return NextResponse.json({
                success: false,
                error: 'ID is required'
            }, { status: 400 })
        }

        const updated = await TikTokMusicModel.findByIdAndUpdate(
            id,
            data,
            { new: true }
        )

        if (!updated) {
            return NextResponse.json({
                success: false,
                error: 'Music not found'
            }, { status: 404 })
        }

        return NextResponse.json({ success: true, data: updated })
    } catch (error: any) {
        console.error('❌ TikTok Music PUT Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

// DELETE - Delete music
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

        const deleted = await TikTokMusicModel.findByIdAndDelete(id)

        if (!deleted) {
            return NextResponse.json({
                success: false,
                error: 'Music not found'
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: 'Music deleted successfully'
        })
    } catch (error: any) {
        console.error('❌ TikTok Music DELETE Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}
