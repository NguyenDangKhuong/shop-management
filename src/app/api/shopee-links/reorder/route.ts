import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import ShopeeLinkModel from '@/models/ShopeeLink'

// POST - Batch update order of multiple links
export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()

        // Expect an array of {id, order}
        if (!Array.isArray(body.items) || body.items.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Invalid request: items array is required'
            }, { status: 400 })
        }

        // Batch update all items
        const updatePromises = body.items.map((item: { id: string; order: number }) =>
            ShopeeLinkModel.findByIdAndUpdate(
                item.id,
                { order: item.order },
                { new: true }
            )
        )

        await Promise.all(updatePromises)

        return NextResponse.json({
            success: true,
            message: 'Order updated successfully'
        })
    } catch (error: any) {
        console.error('❌ Shopee Link Reorder Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}
