import AutoFlowModel from '@/models/AutoFlow'
import PromptModel from '@/models/Prompt'
import connectDb from '@/utils/connectDb'
import { NextRequest, NextResponse } from 'next/server'

// GET all autoflows (filter by accountId), populate prompts via promptIds
export async function GET(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const accountId = searchParams.get('accountId')
        const productId = searchParams.get('productId')
        const randomPrompt = searchParams.get('randomPrompt') === 'true'

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
        // Also migrate old videoFile → videoFiles for backward compat
        const populatedAutoFlows = autoflows.map((a: any) => {
            const videoFiles = a.videoFiles?.length
                ? a.videoFiles
                : a.videoFile?.url
                    ? [a.videoFile]
                    : []

            // Strip _id from referenceImages subdocuments (backward compat with old data)
            const referenceImages = (a.referenceImages || []).map(({ _id, ...rest }: any) => rest)

            const allPrompts = (a.promptIds || [])
                .map((id: string) => promptsMap.get(id))
                .filter(Boolean)

            // If randomPrompt=true, randomly pick one mode:
            // - hook mode: return 1 random hook prompt + 1 random video + NO referenceImages
            // - describe mode: return all describe prompts + referenceImages + NO video
            let selectedPrompts = allPrompts
            let selectedVideos = videoFiles
            let selectedReferenceImages = referenceImages

            if (randomPrompt && allPrompts.length > 0) {
                const hookPrompts = allPrompts.filter((p: any) => p.type === 'hook')
                const describePrompts = allPrompts.filter((p: any) => p.type !== 'hook')

                // Randomly choose between hook or describe mode
                const useHook = hookPrompts.length > 0 && describePrompts.length > 0
                    ? Math.random() < 0.5
                    : hookPrompts.length > 0

                if (useHook) {
                    // Hook mode: pick 1 random hook + 1 random video, no referenceImages
                    selectedPrompts = [hookPrompts[Math.floor(Math.random() * hookPrompts.length)]]
                    selectedVideos = videoFiles.length > 0
                        ? [videoFiles[Math.floor(Math.random() * videoFiles.length)]]
                        : []
                    selectedReferenceImages = []
                } else {
                    // Describe mode: return all describe prompts + referenceImages, no video
                    selectedPrompts = describePrompts
                    selectedVideos = []
                    selectedReferenceImages = referenceImages
                }
            }

            // Inject autoflow's referenceImages into each prompt for API consumers
            const enrichedPrompts = selectedPrompts.map((p: any) => ({
                ...p,
                referenceImages: selectedReferenceImages
            }))

            return {
                ...a,
                referenceImages: selectedReferenceImages,
                videoFiles: selectedVideos,
                prompts: enrichedPrompts
            }
        })

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
