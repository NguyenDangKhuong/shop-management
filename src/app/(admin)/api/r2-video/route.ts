import { NextRequest, NextResponse } from 'next/server'
import { Client } from 'minio'
import { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL } from '@/utils/constants'

export const dynamic = 'force-dynamic'

// Cloudflare R2 client (S3-compatible)
const r2Client = new Client({
    endPoint: `${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    region: 'auto',
    useSSL: true,
    accessKey: R2_ACCESS_KEY_ID || '',
    secretKey: R2_SECRET_ACCESS_KEY || '',
    port: 443,
    pathStyle: true,
})

// POST - Generate presigned PUT URL
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { fileName, bucketName: customBucket, accountId } = body
        const bucketName = customBucket || R2_BUCKET_NAME || 'tiktok-videos'

        if (!fileName) {
            return NextResponse.json(
                { success: false, message: 'No fileName provided' },
                { status: 400 }
            )
        }

        const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
        const prefix = accountId ? `tiktok-${accountId}` : `reel-${Date.now()}`
        const objectName = `${prefix}-${sanitizedFileName}`

        const presignedUrl = await r2Client.presignedPutObject(
            bucketName,
            objectName,
            600
        )

        const r2PublicUrl = R2_PUBLIC_URL || process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://pub-105b411e9219481986379bfce642a4ae.r2.dev'
        const publicUrl = `${r2PublicUrl}/${objectName}`

        return NextResponse.json({
            success: true,
            presignedUrl,
            publicUrl,
            fileName: objectName,
        })
    } catch (error: any) {
        console.error('R2 presign error:', error)
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to generate URL' },
            { status: 500 }
        )
    }
}

// DELETE - Delete video from R2
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const fileName = searchParams.get('fileName')
        const bucketName = searchParams.get('bucketName') || R2_BUCKET_NAME || 'tiktok-videos'

        if (!fileName) {
            return NextResponse.json(
                { success: false, message: 'No fileName provided' },
                { status: 400 }
            )
        }

        await r2Client.removeObject(bucketName, fileName)

        return NextResponse.json({
            success: true,
            message: 'Video deleted successfully',
        })
    } catch (error: any) {
        console.error('R2 delete error:', error)
        return NextResponse.json(
            { success: false, message: error.message || 'Delete failed' },
            { status: 500 }
        )
    }
}
