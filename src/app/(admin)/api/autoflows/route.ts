import { NextRequest, NextResponse } from 'next/server'
import AutoFlowModel from '@/models/AutoFlow'
import PromptModel from '@/models/Prompt'
import connectDb from '@/utils/connectDb'

// GET all autoflows (filter by accountId), populate child prompts
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

        // Fetch all prompts for these autoflows' products
        const productIds = autoflows.map((a: any) => a.productId)
        const prompts = productIds.length > 0
            ? await PromptModel.find({ productId: { $in: productIds } })
                .sort({ order: 1, createdAt: -1 })
                .lean()
            : []

        // Group prompts by productId
        const promptsByProduct = new Map<string, any[]>()
        prompts.forEach((p: any) => {
            const list = promptsByProduct.get(p.productId) || []
            list.push(p)
            promptsByProduct.set(p.productId, list)
        })

        // Attach prompts to each autoflow
        const populatedAutoFlows = autoflows.map((a: any) => ({
            ...a,
            prompts: promptsByProduct.get(a.productId) || []
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

// DELETE autoflow and its child prompts
export async function DELETE(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        // Find autoflow to get productId for cascade delete
        const autoflow = await AutoFlowModel.findById(id)
        if (autoflow) {
            await PromptModel.deleteMany({ productId: autoflow.productId })
        }
        await AutoFlowModel.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
