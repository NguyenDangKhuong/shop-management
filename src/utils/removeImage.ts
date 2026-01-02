import { v2 as cloudinary } from 'cloudinary'

import { API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY, CLOUD_NAME_CLOUDINARY } from './constants'

interface RemoveImageResult {
  success: boolean
  result?: any
  error?: string
}

// Configure Cloudinary once
cloudinary.config({
  cloud_name: CLOUD_NAME_CLOUDINARY,
  api_key: API_KEY_CLOUDINARY,
  api_secret: API_SECRET_CLOUDINARY
})

/**
 * Remove a single image from Cloudinary
 * @param publicId - The public ID of the image to remove
 * @returns Promise with success status and result/error
 */
const removeImage = async (publicId: string): Promise<RemoveImageResult> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    console.log('Image removed:', result)
    return {
      success: result.result === 'ok',
      result
    }
  } catch (err) {
    console.error('Error removing image:', err)
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error'
    }
  }
}

/**
 * Remove multiple images from Cloudinary
 * @param publicIds - Array of public IDs to remove
 * @returns Promise with array of results for each image
 */
export const removeImages = async (publicIds: string[]): Promise<RemoveImageResult[]> => {
  try {
    const results = await Promise.all(publicIds.map(id => removeImage(id)))
    return results
  } catch (err) {
    console.error('Error removing images:', err)
    return publicIds.map(() => ({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error'
    }))
  }
}

export default removeImage

