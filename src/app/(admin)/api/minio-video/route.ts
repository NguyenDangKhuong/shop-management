import { NextRequest, NextResponse } from 'next/server'
import { Client } from 'minio'
import { MINIO_ACCESS_KEY, MINIO_SECRET_KEY, MINIO_BUCKET } from '@/utils/constants'

// MinIO Client Configuration
const minioClient = new Client({
    endPoint: 's3.thetaphoa.store',
    port: 443,
    useSSL: true,
    accessKey: MINIO_ACCESS_KEY || '',
    secretKey: MINIO_SECRET_KEY || '',
})

const bucketName = MINIO_BUCKET || 'videos'

// POST - Upload video to MinIO
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
        const fileName = `reel-${timestamp}-${file.name}`

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
        const url = `https://s3.thetaphoa.store/${bucketName}/${fileName}`

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
