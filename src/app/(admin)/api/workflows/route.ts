import PromptModel from '@/models/Prompt'
import WorkflowModel from '@/models/Workflow'
import connectDb from '@/utils/connectDb'
import { NextRequest, NextResponse } from 'next/server'

// GET all workflows (filter by accountId), populate prompt data
export async function GET(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const accountId = searchParams.get('accountId')

        const query: any = {}
        if (accountId) query.accountId = accountId

        const workflows = await WorkflowModel.find(query)
            .sort({ createdAt: -1 })
            .lean()

        // Manually populate prompt data
        const promptIds = workflows.map((w: any) => w.promptId).filter(Boolean)
        const prompts = await PromptModel.find({ _id: { $in: promptIds } }).lean()
        const promptMap = new Map(prompts.map((p: any) => [p._id.toString(), p]))

        const populatedWorkflows = workflows.map((w: any) => ({
            ...w,
            prompt: promptMap.get(w.promptId) || null
        }))

        return NextResponse.json({ success: true, data: populatedWorkflows })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// POST create new workflow
export async function POST(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const workflow = await WorkflowModel.create(body)
        return NextResponse.json({ success: true, data: workflow })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// PUT update workflow
export async function PUT(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const { id, ...data } = body
        const workflow = await WorkflowModel.findByIdAndUpdate(id, data, { new: true })
        return NextResponse.json({ success: true, data: workflow })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// DELETE workflow
export async function DELETE(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        await WorkflowModel.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
