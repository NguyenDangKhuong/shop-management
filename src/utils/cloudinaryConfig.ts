import { CLOUD_NAME_CLOUDINARY, CLOUDINARY_UPLOAD_FACEBOOK_POST_PRESET, CLOUDINARY_UPLOAD_PRODUCT_PRESET, CLOUDINARY_UPLOAD_SHOPEE_LINK_PRESET } from './constants'

export interface CloudinaryUploadResult {
    url: string
    publicId: string
    resourceType: 'image' | 'video'
    format?: string
    width?: number
    height?: number
}

export interface CloudinaryWidgetOptions {
    cloudName: string
    uploadPreset: string
    multiple?: boolean
    maxFiles?: number
    resourceType?: 'auto' | 'image' | 'video'
    clientAllowedFormats?: string[]
    maxFileSize?: number
    sources?: string[]
    cropping?: boolean
    croppingAspectRatio?: number
    showSkipCropButton?: boolean
}

// Cloudinary Upload Widget configuration presets
export const productUploadConfig: CloudinaryWidgetOptions = {
    cloudName: CLOUD_NAME_CLOUDINARY || '',
    uploadPreset: CLOUDINARY_UPLOAD_PRODUCT_PRESET || '', //preset's manager in cloudinary
    multiple: false,
    resourceType: 'image',
    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    maxFileSize: 10485760, // 10MB
    sources: ['local', 'url', 'camera'],
    cropping: false
}


export const facebookPostUploadConfig: CloudinaryWidgetOptions = {
    cloudName: CLOUD_NAME_CLOUDINARY || '',
    uploadPreset: CLOUDINARY_UPLOAD_FACEBOOK_POST_PRESET || '',
    multiple: true,
    maxFiles: 10,
    resourceType: 'auto', // Support both images and videos
    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'mov', 'avi'],
    maxFileSize: 104857600, // 100MB
    sources: ['local', 'url', 'camera']
}

export const shopeeLinkUploadConfig: CloudinaryWidgetOptions = {
    cloudName: CLOUD_NAME_CLOUDINARY || '',
    uploadPreset: CLOUDINARY_UPLOAD_SHOPEE_LINK_PRESET || '',
    multiple: false,
    resourceType: 'image',
    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
    maxFileSize: 5242880, // 5MB
    sources: ['local', 'url', 'camera'],
    cropping: false
}


// Event handler types
export type UploadSuccessCallback = (result: CloudinaryUploadResult) => void
export type UploadErrorCallback = (error: any) => void
export type UploadProgressCallback = (progress: number) => void

// Create upload widget with custom event handlers
export const createUploadWidget = (
    config: CloudinaryWidgetOptions,
    onSuccess: UploadSuccessCallback,
    onError: UploadErrorCallback,
    onProgress?: UploadProgressCallback
) => {
    if (typeof window === 'undefined' || !(window as any).cloudinary) {
        console.error('Cloudinary widget not loaded')
        onError(new Error('Cloudinary widget not available'))
        return null
    }

    return (window as any).cloudinary.createUploadWidget(
        config,
        (error: any, result: any) => {
            if (error) {
                console.error('Cloudinary upload error:', error)
                onError(error)
                return
            }

            // Handle different events
            switch (result.event) {
                case 'success':
                    const uploadResult: CloudinaryUploadResult = {
                        url: result.info.secure_url || result.info.url,
                        publicId: result.info.public_id,
                        resourceType: result.info.resource_type === 'video' ? 'video' : 'image',
                        format: result.info.format,
                        width: result.info.width,
                        height: result.info.height
                    }
                    onSuccess(uploadResult)
                    break

                case 'upload-progress':
                    if (onProgress) {
                        const progress = Math.round((result.info.bytes / result.info.total_bytes) * 100)
                        onProgress(progress)
                    }
                    break

                case 'abort':
                    onError(new Error('Upload aborted by user'))
                    break

                default:
                    // Handle other events if needed
                    break
            }
        }
    )
}

// Validate file before upload
export const validateFile = (file: File, config: CloudinaryWidgetOptions): { valid: boolean; error?: string } => {
    // Check file size
    if (config.maxFileSize && file.size > config.maxFileSize) {
        return {
            valid: false,
            error: `File size exceeds ${(config.maxFileSize / 1048576).toFixed(0)}MB limit`
        }
    }

    // Check file format
    if (config.clientAllowedFormats) {
        const fileExtension = file.name.split('.').pop()?.toLowerCase()
        if (fileExtension && !config.clientAllowedFormats.includes(fileExtension)) {
            return {
                valid: false,
                error: `File format .${fileExtension} is not supported. Allowed formats: ${config.clientAllowedFormats.join(', ')}`
            }
        }
    }

    return { valid: true }
}
