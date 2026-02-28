// MinIO S3 Video Upload Utility (via Presigned URL — direct upload to S3)
export const uploadVideoToMinIO = async (file: File, bucketName?: string): Promise<{ url: string; fileName?: string; success: boolean; message?: string }> => {
    try {
        // Step 1: Get presigned PUT URL from API
        const response = await fetch('/api/minio-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fileName: file.name,
                contentType: file.type,
                bucketName,
            }),
        })

        const result = await response.json()

        if (!response.ok || !result.success || !result.presignedUrl) {
            return {
                success: false,
                message: result.message || 'Failed to get upload URL',
                url: ''
            }
        }

        // Step 2: Upload directly to MinIO using presigned URL
        const uploadResponse = await fetch(result.presignedUrl, {
            method: 'PUT',
            headers: { 'Content-Type': file.type },
            body: file,
        })

        if (!uploadResponse.ok) {
            return {
                success: false,
                message: `Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}`,
                url: ''
            }
        }

        return {
            success: true,
            url: result.publicUrl,
            fileName: result.fileName
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Network error',
            url: ''
        }
    }
}

// MinIO S3 Video Delete Utility (via API Route)
export const deleteVideoFromMinIO = async (fileName: string, bucketName?: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const url = `/api/minio-video?fileName=${encodeURIComponent(fileName)}`
        const finalUrl = bucketName ? `${url}&bucketName=${encodeURIComponent(bucketName)}` : url
        const response = await fetch(finalUrl, {
            method: 'DELETE',
        })

        const result = await response.json()

        if (response.ok && result.success) {
            return {
                success: true,
                message: result.message
            }
        } else {
            return {
                success: false,
                message: result.message || 'Delete failed'
            }
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.message || 'Network error'
        }
    }
}
