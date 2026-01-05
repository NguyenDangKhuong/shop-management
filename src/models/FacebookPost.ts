import mongoose, { Schema, Document } from 'mongoose'
import { IMediaFile, MediaFile, MediaFileSchema } from './MediaFile'

// FacebookPost interface
export interface IFacebookPost extends Document {
    content: string
    mediaFiles?: IMediaFile[]
    postUrl?: string
    status: 'draft' | 'scheduled' | 'published' | 'failed'
    postType: 'post' | 'reel-video' | 'reel-link'
    scheduledAt?: Date
    scheduledDate?: string // Format: dd/MM/yyyy
    scheduledTime?: string // Format: HH:mm
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
        enum: ['post', 'reel-video', 'reel-link'],
        default: 'post'
    },
    scheduledAt: { type: Date },
    scheduledDate: { type: String },
    scheduledTime: { type: String }
}, {
    timestamps: true,
    collection: 'facebookposts'
})

// Use pure Mongoose with explicit model name
const FacebookPostModel = mongoose.models.FacebookPost || mongoose.model<IFacebookPost>('FacebookPost', FacebookPostSchema)

export default FacebookPostModel
export { FacebookPostSchema }
