import { NextRequest, NextResponse } from 'next/server'
import FacebookPostModel from '@/models/FacebookPost'
import connectDb from '@/utils/connectDb'
import { FB_PAGE_ID, FB_PAGE_ACCESS_TOKEN, FB_GRAPH_API_BASE } from '@/utils/constants'

// POST: Publish a post to Facebook Page
export async function POST(request: NextRequest) {
    try {
        await connectDb()
        const { id } = await request.json()

        if (!id) {
            return NextResponse.json({ success: false, error: 'Missing post id' }, { status: 400 })
        }

        if (!FB_PAGE_ACCESS_TOKEN || !FB_PAGE_ID) {
            return NextResponse.json({ success: false, error: 'Facebook credentials not configured' }, { status: 500 })
        }

        const post = await FacebookPostModel.findById(id).lean() as any
        if (!post) {
            return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })
        }

        if (post.status === 'published') {
            return NextResponse.json({ success: false, error: 'Post already published' }, { status: 400 })
        }

        if (!post.videoR2Url) {
            return NextResponse.json({ success: false, error: 'No video URL found' }, { status: 400 })
        }

        const caption = post.aiCaption || post.content || ''

        // Upload video to Facebook Page via URL
        // Facebook accepts video via file_url (no need to upload binary)
        const fbRes = await fetch(`${FB_GRAPH_API_BASE}/${FB_PAGE_ID}/videos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                file_url: post.videoR2Url,
                description: caption,
                access_token: FB_PAGE_ACCESS_TOKEN,
            }),
        })

        const fbData = await fbRes.json()

        if (fbData.error) {
            // Update post with error
            await FacebookPostModel.findByIdAndUpdate(id, {
                status: 'failed',
                errorMessage: fbData.error.message || JSON.stringify(fbData.error),
            })
            return NextResponse.json({
                success: false,
                error: fbData.error.message || 'Facebook API error',
                details: fbData.error,
            }, { status: 502 })
        }

        // Success — update post status
        await FacebookPostModel.findByIdAndUpdate(id, {
            status: 'published',
            facebookPostId: fbData.id,
            publishedAt: new Date(),
            errorMessage: null,
        })

        return NextResponse.json({
            success: true,
            facebookPostId: fbData.id,
            message: 'Video published to Facebook Page successfully',
        })
    } catch (error: any) {
        console.error('Facebook publish error:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
