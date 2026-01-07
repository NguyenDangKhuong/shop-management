import mongoose, { Schema, Document } from 'mongoose'
import { IMediaFile, MediaFileSchema } from './MediaFile'

export interface ITikTokAccount extends Document {
    username: string
    displayName: string
    email: string
    cookie: string
    avatar?: IMediaFile
    createdAt?: Date
    updatedAt?: Date
}

// Type alias for backwards compatibility
export type TikTokAccount = ITikTokAccount

const TikTokAccountSchema = new Schema({
    username: { type: String, required: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    cookie: { type: String, required: true },
    avatar: { type: MediaFileSchema, required: false }
}, {
    timestamps: true,
    collection: 'tiktokaccounts'
})

// Use pure Mongoose with explicit model name
const TikTokAccountModel = mongoose.models.TikTokAccount || mongoose.model<ITikTokAccount>('TikTokAccount', TikTokAccountSchema)

export default TikTokAccountModel
export { TikTokAccountSchema }
