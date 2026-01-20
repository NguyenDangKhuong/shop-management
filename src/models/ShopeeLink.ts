import mongoose, { Schema, Document } from 'mongoose'
import { IMediaFile, MediaFileSchema } from './MediaFile'

export interface IShopeeLink extends Document {
    name: string
    mediaFile: IMediaFile  // Required media file
    productUrl: string
    description?: string
    order: number
    createdAt?: Date
    updatedAt?: Date
}

// Type alias for backwards compatibility
export type ShopeeLink = IShopeeLink

const ShopeeLinkSchema = new Schema({
    name: { type: String, required: true },
    mediaFile: { type: MediaFileSchema, required: true },
    productUrl: { type: String, required: true },
    description: { type: String, required: false },
    order: { type: Number, default: 0, index: true }
}, {
    timestamps: true,
    collection: 'shopeelinks'
})

// Use pure Mongoose with explicit model name
const ShopeeLinkModel = mongoose.models.ShopeeLink || mongoose.model<IShopeeLink>('ShopeeLink', ShopeeLinkSchema)

export default ShopeeLinkModel
export { ShopeeLinkSchema }
