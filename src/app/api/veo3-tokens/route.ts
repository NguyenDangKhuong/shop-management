import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import Veo3TokenModel from '@/models/Veo3Token'

// GET - Fetch all veo3 tokens
export async function GET() {
    try {
        await connectDB()

        const tokens = await Veo3TokenModel.find().sort({ createdAt: -1 })

        return NextResponse.json({
            success: true,
            data: tokens
        })
    } catch (error: any) {
        console.error('❌ Veo3 Tokens GET Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

// POST - Create a new veo3 token
export async function POST(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()

        // Validate required field
        if (!body.value) {
            return NextResponse.json({
                success: false,
                error: 'Missing required field: value'
            }, { status: 400 })
        }

        const token = await Veo3TokenModel.create({
            value: body.value,
            ...(body.projectId !== undefined && { projectId: body.projectId }),
            ...(body.sessionId !== undefined && { sessionId: body.sessionId }),
            ...(body.apiKeyNanoAI !== undefined && { apiKeyNanoAI: body.apiKeyNanoAI })
        })

        return NextResponse.json({
            success: true,
            data: token
        })
    } catch (error: any) {
        console.error('❌ Veo3 Token POST Error:', error)
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

// PUT - Update existing veo3 token
export async function PUT(request: NextRequest) {
    try {
        await connectDB()
        const body = await request.json()
        const { id, value, projectId, sessionId, apiKeyNanoAI } = body

        if (!id) {
            return NextResponse.json({
                success: false,
                error: 'ID is required'
            }, { status: 400 })
        }

        const updateData: any = {}
        if (value !== undefined) updateData.value = value
        if (projectId !== undefined) updateData.projectId = projectId
        if (sessionId !== undefined) updateData.sessionId = sessionId
        if (apiKeyNanoAI !== undefined) updateData.apiKeyNanoAI = apiKeyNanoAI

        const updatedToken = await Veo3TokenModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )

        if (!updatedToken) {
            return NextResponse.json({
                success: false,
                error: 'Token not found'
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            data: updatedToken
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}

// DELETE - Delete veo3 token
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

        const deletedToken = await Veo3TokenModel.findByIdAndDelete(id)

        if (!deletedToken) {
            return NextResponse.json({
                success: false,
                error: 'Token not found'
            }, { status: 404 })
        }

        return NextResponse.json({
            success: true,
            message: 'Token deleted successfully'
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 })
    }
}
