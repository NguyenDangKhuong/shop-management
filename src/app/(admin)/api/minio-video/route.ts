import { NextRequest, NextResponse } from 'next/server'
import { Client } from 'minio'
import { MINIO_ACCESS_KEY, MINIO_SECRET_KEY, MINIO_FACEBOOK_BUCKET } from '@/utils/constants'

// MinIO Client Configuration
const minioClient = new Client({
    endPoint: 's3.thetaphoa.store',
    port: 443,
    useSSL: true,
    accessKey: MINIO_ACCESS_KEY || '',
    secretKey: MINIO_SECRET_KEY || '',
})

const bucketName = MINIO_FACEBOOK_BUCKET || 'videos'

// GET - Generate Presigned URL for direct upload
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const fileName = searchParams.get('fileName')
        const fileType = searchParams.get('fileType')

        if (fileName) {
            // Case 1: Generate Presigned URL for Upload

            // Sanitize filename (double check safety)
            const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
            const timestamp = Date.now()
            const objectName = `reel-${timestamp}-${sanitizedName}`

            // Generate presigned URL (valid for 1 hour)
            const uploadUrl = await minioClient.presignedPutObject(
                bucketName,
                objectName,
                60 * 60
            )

            // Public URL for accessing the file after upload
            const publicUrl = `http://s3.thetaphoa.store/${bucketName}/${objectName}`

            return NextResponse.json({
                success: true,
                uploadUrl,
                publicUrl,
                fileName: objectName
            })
        }

        return NextResponse.json(
            { success: false, message: 'Missing fileName parameter' },
            { status: 400 }
        )

    } catch (error: any) {
        console.error('MinIO presigned url error:', error)
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to generate upload URL' },
            { status: 500 }
        )
    }
}

// POST - Legacy direct upload (kept for reference or fallback, though we are moving to presigned)
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('video') as File

        if (!file) {
            return NextResponse.json(
                { success: false, message: 'No file provided' },
                { status: 400 }
            )
        }

        // Convert File to Buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Generate unique filename
        const timestamp = Date.now()
        // Sanitize filename: remove special characters, spaces, etc.
        const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const fileName = `reel-${timestamp}-${sanitizedFileName}`

        // Upload to MinIO
        await minioClient.putObject(
            bucketName,
            fileName,
            buffer,
            buffer.length,
            {
                'Content-Type': file.type,
            }
        )

        // Generate public URL
        const url = `http://s3.thetaphoa.store/${bucketName}/${fileName}`

        return NextResponse.json({
            success: true,
            url,
            fileName,
        })
    } catch (error: any) {
        console.error('MinIO upload error:', error)
        return NextResponse.json(
            { success: false, message: error.message || 'Upload failed' },
            { status: 500 }
        )
    }
}

// DELETE - Delete video from MinIO
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const fileName = searchParams.get('fileName')

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
