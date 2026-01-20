import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import ShopeeLinkModel from '@/models/ShopeeLink'


// GET - Fetch all Shopee links
export async function GET() {
    try {
        await connectDB()

        const links = await ShopeeLinkModel.find().sort({ createdAt: -1 })

        return NextResponse.json({
            success: true,
            data: links
        })
    } catch (error: any) {
        console.error('❌ Shopee Links GET Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

// POST - Create new Shopee link
export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()

        // Validate required fields
        if (!body.name || !body.productUrl || !body.mediaFile) {
            return NextResponse.json({
                success: false,
                error: 'Missing required fields: name, productUrl, or mediaFile'
            }, { status: 400 })
        }

        // Create link data
        const linkData = {
            name: body.name,
            productUrl: body.productUrl,
            mediaFile: body.mediaFile,
            description: body.description
        }

        const newLink = await ShopeeLinkModel.create(linkData)

        return NextResponse.json({
            success: true,
            data: newLink
        })
    } catch (error: any) {
        console.error('❌ Shopee Link POST Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

// PUT - Update existing Shopee link
export async function PUT(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()
        const { id, ...updateData } = body

        if (!id) {
            return NextResponse.json({
                success: false,
                error: 'ID is required'
            }, { status: 400 })
        }

        const updatedLink = await ShopeeLinkModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )

        if (!updatedLink) {
            return NextResponse.json({
                success: false,
                error: 'Link not found'
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            data: updatedLink
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

// DELETE - Delete Shopee link
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

        const deletedLink = await ShopeeLinkModel.findByIdAndDelete(id)

        if (!deletedLink) {
            return NextResponse.json({
                success: false,
                error: 'Link not found'
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: 'Link deleted successfully'
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}
