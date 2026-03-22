import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import ShopeeLinkModel from '@/models/ShopeeLink'
import { withCache, invalidateCache } from '@/lib/cache'


// GET - Fetch all Shopee links
export async function GET() {
    try {
        const data = await withCache('shopee-links', 300, async () => {
            await connectDB()
            return await ShopeeLinkModel.find().sort({ order: 1, createdAt: -1 }).lean()
        })

        return NextResponse.json({ success: true, data })
    } catch (error: any) {
        console.error('❌ Shopee Links GET Error:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// POST - Create new Shopee link
export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()

        if (!body.name || !body.productUrl || !body.mediaFile) {
            return NextResponse.json({
                success: false,
                error: 'Missing required fields: name, productUrl, or mediaFile'
            }, { status: 400 })
        }

        const maxOrderLink = await ShopeeLinkModel.findOne().sort({ order: -1 }).select('order')
        const nextOrder = (maxOrderLink?.order ?? -1) + 1

        const newLink = await ShopeeLinkModel.create({
            name: body.name,
            productUrl: body.productUrl,
            mediaFile: body.mediaFile,
            description: body.description,
            order: nextOrder
        })

        await invalidateCache('shopee-links')
        return NextResponse.json({ success: true, data: newLink })
    } catch (error: any) {
        console.error('❌ Shopee Link POST Error:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// PUT - Update existing Shopee link
export async function PUT(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()
        const { id, ...updateData } = body

        if (!id) {
            return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })
        }

        const updatedLink = await ShopeeLinkModel.findByIdAndUpdate(id, updateData, { new: true })

        if (!updatedLink) {
            return NextResponse.json({ success: false, error: 'Link not found' }, { status: 404 })
        }

        await invalidateCache('shopee-links')
        return NextResponse.json({ success: true, data: updatedLink })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// DELETE - Delete Shopee link
export async function DELETE(request: NextRequest) {
    try {
        await connectDB()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 })
        }

        const deletedLink = await ShopeeLinkModel.findByIdAndDelete(id)

        if (!deletedLink) {
            return NextResponse.json({ success: false, error: 'Link not found' }, { status: 404 })
        }

        await invalidateCache('shopee-links')
        return NextResponse.json({ success: true, message: 'Link deleted successfully' })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
