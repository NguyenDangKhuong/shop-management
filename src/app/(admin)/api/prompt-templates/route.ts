import PromptTemplateModel from '@/models/PromptTemplate'
import connectDb from '@/utils/connectDb'
import { NextRequest, NextResponse } from 'next/server'

// GET all prompt templates
export async function GET() {
    try {
        await connectDb()
        const templates = await PromptTemplateModel.find()
            .sort({ group: 1, order: 1 })
            .lean()
        return NextResponse.json({ success: true, data: templates })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// POST create new prompt template
export async function POST(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const template = await PromptTemplateModel.create(body)
        return NextResponse.json({ success: true, data: template })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// PUT update prompt template
export async function PUT(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const { id, ...data } = body
        const template = await PromptTemplateModel.findByIdAndUpdate(id, data, { new: true })
        return NextResponse.json({ success: true, data: template })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// DELETE prompt template
export async function DELETE(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        await PromptTemplateModel.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
