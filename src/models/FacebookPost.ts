import mongoose, { Schema, Document } from 'mongoose'

// MediaFile subdocument interface
export interface IMediaFile {
    url: string
    type: 'image' | 'video' | 'link'
    publicId?: string
}

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

// Type aliases for backwards compatibility
export type MediaFile = IMediaFile
export type FacebookPost = IFacebookPost

// MediaFile subdocument schema
const MediaFileSchema = new Schema({
    url: { type: String, required: true },
    type: { type: String, enum: ['image', 'video', 'link'], required: true },
    publicId: { type: String }
}, { _id: false })

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

// Delete any existing model to prevent caching issues
if (mongoose.models.FacebookPost) {
    delete mongoose.models.FacebookPost
}

// Use pure Mongoose with explicit model name
const FacebookPostModel = mongoose.model<IFacebookPost>('FacebookPost', FacebookPostSchema)

export default FacebookPostModel
export { FacebookPostSchema }
