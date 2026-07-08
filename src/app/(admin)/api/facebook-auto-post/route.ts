import { NextRequest, NextResponse } from 'next/server'
import FacebookPostModel from '@/models/FacebookPost'
import connectDb from '@/utils/connectDb'
import { Client } from 'minio'
import {
    R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY,
    R2_BUCKET_NAME, R2_PUBLIC_URL, FB_PAGE_ID, FB_PAGE_NAME,
} from '@/utils/constants'

const r2Client = new Client({
    endPoint: `${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    region: 'auto',
    useSSL: true,
    accessKey: R2_ACCESS_KEY_ID || '',
    secretKey: R2_SECRET_ACCESS_KEY || '',
    port: 443,
    pathStyle: true,
})

// GET: List auto-post entries (filter by status, postType=auto-video)
export async function GET(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status')

        const query: any = { postType: 'auto-video' }
        if (status) query.status = status

        const posts = await FacebookPostModel.find(query)
            .sort({ createdAt: -1 })
            .lean()

        return NextResponse.json({ success: true, data: posts })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// POST: Create new auto-post from Douyin URL
export async function POST(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const { douyinUrl, caption, scheduledDate, scheduledTime, targetType = 'page' } = body

        if (!douyinUrl) {
            return NextResponse.json({ success: false, error: 'Missing douyinUrl' }, { status: 400 })
        }

        // 1. Fetch Douyin video metadata via existing API
        const apiBase = process.env.NEXT_PUBLIC_DOUYIN_API_URL || 'https://khuong.theworkpc.com/douyin-api'
        const metaRes = await fetch(`${apiBase}?url=${encodeURIComponent(douyinUrl)}&minimal=true`)
        if (!metaRes.ok) {
            return NextResponse.json({ success: false, error: 'Failed to fetch Douyin metadata' }, { status: 502 })
        }
        const metaData = await metaRes.json()
        const videoInfo = metaData?.data
        if (!videoInfo) {
            return NextResponse.json({ success: false, error: 'No video data returned from Douyin API' }, { status: 404 })
        }

        const videoUrl = videoInfo.video_data?.nwm_video_url_HQ
            || videoInfo.video_data?.nwm_video_url
        const douyinDesc = videoInfo.desc || ''

        if (!videoUrl) {
            return NextResponse.json({ success: false, error: 'No video URL found in Douyin response' }, { status: 404 })
        }

        // 2. Download video from CDN via VPS proxy
        const downloadUrl = `${apiBase}/download?url=${encodeURIComponent(videoUrl)}`
        const videoRes = await fetch(downloadUrl)
        if (!videoRes.ok) {
            return NextResponse.json({ success: false, error: 'Failed to download video' }, { status: 502 })
        }

        const videoBuffer = Buffer.from(await videoRes.arrayBuffer())
        const timestamp = Date.now()
        const r2Key = `facebook-auto/${timestamp}.mp4`
        const bucketName = R2_BUCKET_NAME || 'tiktok-videos'

        // 3. Upload to R2
        await r2Client.putObject(bucketName, r2Key, videoBuffer, videoBuffer.length, {
            'Content-Type': 'video/mp4',
        })

        const videoR2Url = `${R2_PUBLIC_URL}/${r2Key}`

        // 4. Save to DB
        const postData: any = {
            content: caption || douyinDesc || 'Video from Douyin',
            postType: 'auto-video',
            targetType,
            targetId: FB_PAGE_ID,
            targetName: FB_PAGE_NAME,
            douyinUrl,
            douyinDesc,
            aiCaption: caption || '',
            videoR2Key: r2Key,
            videoR2Url,
            status: scheduledDate ? 'scheduled' : 'draft',
        }

        if (scheduledDate) postData.scheduledDate = scheduledDate
        if (scheduledTime) postData.scheduledTime = scheduledTime

        const post = await FacebookPostModel.create(postData)

        return NextResponse.json({ success: true, data: post })
    } catch (error: any) {
        console.error('Facebook auto-post create error:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// PUT: Update post (caption, schedule, status)
export async function PUT(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const { id, ...data } = body

        if (!id) {
            return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 })
        }

        // Update content if aiCaption changes
        if (data.aiCaption) {
            data.content = data.aiCaption
        }

        const post = await FacebookPostModel.findByIdAndUpdate(id, data, { new: true })
        return NextResponse.json({ success: true, data: post })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// DELETE: Delete post + R2 video
export async function DELETE(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ success: false, error: 'Missing id' }, { status: 400 })
        }

        const post = await FacebookPostModel.findById(id).lean() as any
        if (!post) {
            return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })
        }

        // Delete R2 video
        if (post.videoR2Key) {
            try {
                const bucketName = R2_BUCKET_NAME || 'tiktok-videos'
                await r2Client.removeObject(bucketName, post.videoR2Key)
            } catch (err) {
                console.error('Failed to delete R2 video:', err)
            }
        }

        await FacebookPostModel.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
