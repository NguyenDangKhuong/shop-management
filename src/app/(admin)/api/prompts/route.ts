import PromptModel from '@/models/Prompt'
import connectDb from '@/utils/connectDb'
import { NextRequest, NextResponse } from 'next/server'

// GET prompts (filter by accountId and/or productId)
export async function GET(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const accountId = searchParams.get('accountId')
        const productId = searchParams.get('productId')

        const query: any = {}
        if (accountId) query.accountId = accountId
        if (productId) query.productId = productId

        const prompts = await PromptModel.find(query)
            .sort({ order: 1, createdAt: 1 })
            .lean()

        // Strip _id from referenceImages subdocuments
        prompts.forEach((p: any) => {
            if (p.referenceImages) {
                p.referenceImages = p.referenceImages.map(({ _id, ...rest }: any) => rest)
            }
        })

        return NextResponse.json({ success: true, data: prompts })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// POST create new prompt
export async function POST(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const prompt = await PromptModel.create(body)
        return NextResponse.json({ success: true, data: prompt })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// PUT update prompt
export async function PUT(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const { id, ...data } = body
        const prompt = await PromptModel.findByIdAndUpdate(id, data, { new: true })
        return NextResponse.json({ success: true, data: prompt })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// DELETE prompt
export async function DELETE(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        await PromptModel.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
