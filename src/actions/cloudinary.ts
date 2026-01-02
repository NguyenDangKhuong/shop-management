'use server'

import removeImage, { removeImages } from '@/utils/removeImage'

/**
 * Server action to delete image from Cloudinary
 * @param publicId - The public ID of the image to delete
 * @returns Promise with success status and message
 */
export async function deleteCloudinaryImage(publicId: string) {
    try {
        const result = await removeImage(publicId)

        if (result.success) {
            return {
                success: true,
                message: 'Image deleted from Cloudinary'
            }
        } else {
            return {
                success: false,
                message: result.error || 'Failed to delete image'
            }
        }
    } catch (error: any) {
        console.error('Error deleting Cloudinary image:', error)
        return {
            success: false,
            message: error.message || 'Unknown error'
        }
    }
}

/**
 * Server action to delete multiple images from Cloudinary
 * @param publicIds - Array of public IDs to delete
 * @returns Promise with success status and message
 */
export async function deleteCloudinaryImages(publicIds: string[]) {
    try {
        if (!publicIds || publicIds.length === 0) {
            return {
                success: true,
                message: 'No images to delete'
            }
        }

        const results = await removeImages(publicIds)
        const successCount = results.filter(r => r.success).length
        const failCount = results.length - successCount

        return {
            success: failCount === 0,
            message: `Deleted ${successCount}/${results.length} images from Cloudinary`,
            details: { successCount, failCount, total: results.length }
        }
    } catch (error: any) {
        console.error('Error deleting Cloudinary images:', error)
        return {
            success: false,
            message: error.message || 'Unknown error'
        }
    }
}
