import { Schema } from 'mongoose'

/**
 * MediaFile interface - represents a media file (image/video/audio/link)
 * Used in FacebookPost and potentially other models
 */
export interface IMediaFile {
    url: string
    type: 'image' | 'video' | 'audio' | 'link'
    publicId?: string
}

/**
 * MediaFile schema - Mongoose schema for media file subdocuments
 * Can be embedded in other schemas
 */
export const MediaFileSchema = new Schema({
    url: { type: String, required: true },
    type: { type: String, enum: ['image', 'video', 'audio', 'link'], required: true },
    publicId: { type: String }
}, { _id: false })

// Type alias for backwards compatibility
export type MediaFile = IMediaFile
