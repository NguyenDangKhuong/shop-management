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

// POST: Upload edited video file → R2 → create post
export async function POST(request: NextRequest) {
    try {
        await connectDb()

        const formData = await request.formData()
        const file = formData.get('video') as File | null
        const caption = formData.get('caption') as string || ''
        const douyinUrl = formData.get('douyinUrl') as string || ''

        if (!file) {
            return NextResponse.json({ success: false, error: 'No video file uploaded' }, { status: 400 })
        }

        // Read file to buffer
        const arrayBuffer = await file.arrayBuffer()
        const videoBuffer = Buffer.from(arrayBuffer)

        const timestamp = Date.now()
        const r2Key = `facebook-auto/${timestamp}-edited.mp4`
        const bucketName = R2_BUCKET_NAME || 'tiktok-videos'

        // Upload to R2
        await r2Client.putObject(bucketName, r2Key, videoBuffer, videoBuffer.length, {
            'Content-Type': file.type || 'video/mp4',
        })

        const videoR2Url = `${R2_PUBLIC_URL}/${r2Key}`

        // Save to DB
        const post = await FacebookPostModel.create({
            content: caption || 'Video đã chỉnh sửa',
            postType: 'auto-video',
            targetType: 'page',
            targetId: FB_PAGE_ID,
            targetName: FB_PAGE_NAME,
            douyinUrl: douyinUrl || '',
            douyinDesc: '',
            aiCaption: caption,
            videoR2Key: r2Key,
            videoR2Url,
            status: 'draft',
        })

        return NextResponse.json({ success: true, data: post })
    } catch (error: any) {
        console.error('Upload video error:', error)
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
