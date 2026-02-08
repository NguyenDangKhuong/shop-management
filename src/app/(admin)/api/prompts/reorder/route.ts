import { NextRequest, NextResponse } from 'next/server'
import connectDb from '@/utils/connectDb'
import PromptModel from '@/models/Prompt'

// POST - Batch update order of multiple prompts
export async function POST(request: NextRequest) {
    try {
        await connectDb()
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
            PromptModel.findByIdAndUpdate(
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
        console.error('❌ Prompt Reorder Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}
