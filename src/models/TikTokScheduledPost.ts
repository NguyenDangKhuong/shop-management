import mongoose, { Schema, Document } from 'mongoose'
import { IMediaFile, MediaFileSchema } from './MediaFile'

export interface ITikTokScheduledPost extends Document {
    accountId: string
    scheduledDate: string // Format: DD/MM/YYYY
    scheduledTime: string
    productId?: string
    productTitle?: string
    description: string
    video: IMediaFile
    status: 'draft' | 'scheduled' | 'posted' | 'failed'
    createdAt?: Date
    updatedAt?: Date
}

export type TikTokScheduledPost = ITikTokScheduledPost

const TikTokScheduledPostSchema = new Schema({
    accountId: { type: String, required: true },
    scheduledDate: { type: String, required: true }, // Format: DD/MM/YYYY
    scheduledTime: { type: String, required: true },
    productId: { type: String },
    productTitle: { type: String },
    description: { type: String, required: true },
    video: { type: MediaFileSchema, required: true },
    status: {
        type: String,
        enum: ['draft', 'scheduled', 'posted', 'failed'],
        default: 'draft'
    }
}, {
    timestamps: true,
    collection: 'tiktokscheduledposts'
})

const TikTokScheduledPostModel = mongoose.models.TikTokScheduledPost ||
    mongoose.model<ITikTokScheduledPost>('TikTokScheduledPost', TikTokScheduledPostSchema)

export default TikTokScheduledPostModel
export { TikTokScheduledPostSchema }
