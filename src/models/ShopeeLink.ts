import mongoose, { Schema, Document } from 'mongoose'

export interface IShopeeLink extends Document {
    imageUrl: string
    productUrl: string
    createdAt?: Date
    updatedAt?: Date
}

// Type alias for backwards compatibility
export type ShopeeLink = IShopeeLink

const ShopeeLinkSchema = new Schema({
    imageUrl: { type: String, required: true },
    productUrl: { type: String, required: true }
}, {
    timestamps: true,
    collection: 'shopeelinks'
})

// Delete any existing model to prevent caching issues
if (mongoose.models.ShopeeLink) {
    delete mongoose.models.ShopeeLink
}

// Use pure Mongoose with explicit model name
const ShopeeLinkModel = mongoose.model<IShopeeLink>('ShopeeLink', ShopeeLinkSchema)

export default ShopeeLinkModel
export { ShopeeLinkSchema }
