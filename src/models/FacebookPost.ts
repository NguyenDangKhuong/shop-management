import { getModelForClass, mongoose, prop } from '@typegoose/typegoose'

export class MediaFile {
    @prop({ type: () => String, required: true })
    url!: string

    @prop({ type: () => String, enum: ['image', 'video', 'link'], required: true })
    type!: 'image' | 'video' | 'link'

    @prop({ type: () => String })
    publicId?: string
}

export class FacebookPost {
    _id!: string

    @prop({ type: () => String, required: true })
    content!: string

    @prop({ type: () => [MediaFile], default: [] })
    mediaFiles?: MediaFile[]

    @prop({ type: () => String })
    postUrl?: string

    @prop({ type: () => String, enum: ['draft', 'scheduled', 'published', 'failed'], default: 'draft' })
    status!: string

    @prop({ type: () => String, enum: ['post', 'reel-video', 'reel-link'], default: 'post' })
    postType!: string

    @prop({ type: () => Date })
    scheduledAt?: Date

    @prop({ type: () => String })
    scheduledDate?: string // Format: dd/MM/yyyy

    @prop({ type: () => String })
    scheduledTime?: string // Format: HH:mm

    @prop({ type: () => Date })
    createdAt?: Date

    @prop({ type: () => Date })
    updatedAt?: Date
}

// Clear cached model to prevent hot reload issues
if (mongoose.models.FacebookPost) {
    delete mongoose.models.FacebookPost
}

const FacebookPostModel = getModelForClass(FacebookPost, {
    schemaOptions: { timestamps: true, collection: 'facebookposts' }
})

export default FacebookPostModel
