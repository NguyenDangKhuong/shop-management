import { NextRequest, NextResponse } from 'next/server'
import AutoFlowModel from '@/models/AutoFlow'
import PromptModel from '@/models/Prompt'
import connectDb from '@/utils/connectDb'

// GET all autoflows (filter by accountId), populate prompts via promptIds
export async function GET(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const accountId = searchParams.get('accountId')
        const productId = searchParams.get('productId')

        const query: any = {}
        if (accountId) query.accountId = accountId
        if (productId) query.productId = productId

        const autoflows = await AutoFlowModel.find(query)
            .sort({ createdAt: -1 })
            .lean()

        // Collect all promptIds from all autoflows
        const allPromptIds = autoflows.flatMap((a: any) => a.promptIds || [])
        const uniquePromptIds = [...new Set(allPromptIds)]

        // Fetch all referenced prompts in one query
        const prompts = uniquePromptIds.length > 0
            ? await PromptModel.find({ _id: { $in: uniquePromptIds } })
                .sort({ order: 1, createdAt: -1 })
                .lean()
            : []

        // Create a map for fast lookup
        const promptsMap = new Map<string, any>()
        prompts.forEach((p: any) => {
            promptsMap.set(p._id.toString(), p)
        })

        // Attach prompts to each autoflow (maintaining order from promptIds)
        const populatedAutoFlows = autoflows.map((a: any) => ({
            ...a,
            prompts: (a.promptIds || [])
                .map((id: string) => promptsMap.get(id))
                .filter(Boolean)
        }))

        return NextResponse.json({ success: true, data: populatedAutoFlows })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// POST create new autoflow
export async function POST(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const autoflow = await AutoFlowModel.create(body)
        return NextResponse.json({ success: true, data: autoflow })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// PUT update autoflow
export async function PUT(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const { id, ...data } = body
        const autoflow = await AutoFlowModel.findByIdAndUpdate(id, data, { new: true })
        return NextResponse.json({ success: true, data: autoflow })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// DELETE autoflow (no longer cascades to prompts - prompts are independent)
export async function DELETE(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        await AutoFlowModel.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
