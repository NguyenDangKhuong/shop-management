import { NextRequest, NextResponse } from 'next/server'
import { Client } from 'minio'
import { MINIO_ACCESS_KEY, MINIO_SECRET_KEY, MINIO_FACEBOOK_BUCKET } from '@/utils/constants'

export const dynamic = 'force-dynamic'

// MinIO Client Configuration
const minioClient = new Client({
    endPoint: 's3.thetaphoa.store',
    port: 443,
    useSSL: true,
    accessKey: MINIO_ACCESS_KEY || '',
    secretKey: MINIO_SECRET_KEY || '',
})

// POST - Generate presigned PUT URL for direct upload
export async function POST(request: NextRequest) {
    try {
        const { fileName, contentType, bucketName: customBucket } = await request.json()
        const bucketName = customBucket || MINIO_FACEBOOK_BUCKET || 'facebookpost'

        if (!fileName) {
            return NextResponse.json(
                { success: false, message: 'No fileName provided' },
                { status: 400 }
            )
        }

        // Generate unique filename
        const timestamp = Date.now()
        const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
        const objectName = `reel-${timestamp}-${sanitizedFileName}`

        // Generate presigned PUT URL (valid for 10 minutes)
        const presignedUrl = await minioClient.presignedPutObject(
            bucketName,
            objectName,
            600 // 10 minutes
        )

        // Public URL after upload
        const publicUrl = `http://s3.thetaphoa.store/${bucketName}/${objectName}`

        return NextResponse.json({
            success: true,
            presignedUrl,
            publicUrl,
            fileName: objectName,
        })
    } catch (error: any) {
        console.error('MinIO presigned URL error:', error)
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to generate upload URL' },
            { status: 500 }
        )
    }
}

// DELETE - Delete video from MinIO
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const fileName = searchParams.get('fileName')
        const bucketName = searchParams.get('bucketName') || MINIO_FACEBOOK_BUCKET || 'facebookpost'

        if (!fileName) {
            return NextResponse.json(
                { success: false, message: 'No fileName provided' },
                { status: 400 }
            )
        }

        // Delete from MinIO
        await minioClient.removeObject(bucketName, fileName)

        return NextResponse.json({
            success: true,
            message: 'Video deleted successfully',
        })
    } catch (error: any) {
        console.error('MinIO delete error:', error)
        return NextResponse.json(
            { success: false, message: error.message || 'Delete failed' },
            { status: 500 }
        )
    }
}
