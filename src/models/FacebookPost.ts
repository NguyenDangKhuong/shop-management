import mongoose, { Schema, Document } from 'mongoose'
import { IMediaFile, MediaFile, MediaFileSchema } from './MediaFile'

export interface IFacebookPost extends Document {
    content: string
    mediaFiles?: IMediaFile[]
    postUrl?: string
    status: 'draft' | 'scheduled' | 'published' | 'failed'
    postType: 'post' | 'reel-video' | 'reel-link' | 'auto-video'
    scheduledAt?: Date
    scheduledDate?: string // Format: dd/MM/yyyy
    scheduledTime?: string // Format: HH:mm
    // Auto-post fields
    targetType?: 'page' | 'profile' | 'group'
    targetId?: string
    targetName?: string
    facebookPostId?: string // ID of published post on Facebook
    douyinUrl?: string // Original Douyin URL
    douyinDesc?: string // Original Douyin description
    aiCaption?: string // AI-generated caption
    videoR2Key?: string // R2 object key for downloaded video
    videoR2Url?: string // R2 public URL
    publishedAt?: Date
    errorMessage?: string // Error message if failed
    createdAt?: Date
    updatedAt?: Date
}

// Type alias for backwards compatibility
export type FacebookPost = IFacebookPost

// Re-export MediaFile types for backwards compatibility
export type { MediaFile }

// FacebookPost schema
const FacebookPostSchema = new Schema({
    content: { type: String, required: true },
    mediaFiles: { type: [MediaFileSchema], default: [] },
    postUrl: { type: String },
    status: {
        type: String,
        enum: ['draft', 'scheduled', 'published', 'failed'],
        default: 'draft'
    },
    postType: {
        type: String,
        enum: ['post', 'reel-video', 'reel-link', 'auto-video'],
        default: 'post'
    },
    scheduledAt: { type: Date },
    scheduledDate: { type: String },
    scheduledTime: { type: String },
    // Auto-post fields
    targetType: {
        type: String,
        enum: ['page', 'profile', 'group'],
    },
    targetId: { type: String },
    targetName: { type: String },
    facebookPostId: { type: String },
    douyinUrl: { type: String },
    douyinDesc: { type: String },
    aiCaption: { type: String },
    videoR2Key: { type: String },
    videoR2Url: { type: String },
    publishedAt: { type: Date },
    errorMessage: { type: String },
}, {
    timestamps: true,
    collection: 'facebookposts'
})

// Use pure Mongoose with explicit model name
const FacebookPostModel = mongoose.models.FacebookPost || mongoose.model<IFacebookPost>('FacebookPost', FacebookPostSchema)

export default FacebookPostModel
export { FacebookPostSchema }
