// MinIO S3 Video Upload Utility (via API Route)
export const uploadVideoToMinIO = async (file: File): Promise<{ url: string; fileName?: string; success: boolean; message?: string }> => {
    try {
        const formData = new FormData()
        formData.append('video', file)

        // Upload via Next.js API route (which handles MinIO connection)
        const response = await fetch('/api/minio-video', {
            method: 'POST',
            body: formData,
        })

        const result = await response.json()

        if (response.ok && result.success && result.url) {
            return {
                success: true,
                url: result.url,
                fileName: result.fileName
            }
        } else {
            return {
                success: false,
                message: result.message || 'Upload failed',
                url: ''
            }
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
export const deleteVideoFromMinIO = async (fileName: string): Promise<{ success: boolean; message?: string }> => {
    try {
        const response = await fetch(`/api/minio-video?fileName=${encodeURIComponent(fileName)}`, {
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
