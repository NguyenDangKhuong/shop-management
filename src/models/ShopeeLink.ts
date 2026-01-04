import mongoose, { Schema, Document } from 'mongoose'

export interface IShopeeLink extends Document {
    name: string
    imageUrl: string
    productUrl: string
    createdAt?: Date
    updatedAt?: Date
}

// Type alias for backwards compatibility
export type ShopeeLink = IShopeeLink

const ShopeeLinkSchema = new Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    productUrl: { type: String, required: true }
}, {
    timestamps: true,
    collection: 'shopeelinks'
})

// Use pure Mongoose with explicit model name
const ShopeeLinkModel = mongoose.models.ShopeeLink || mongoose.model<IShopeeLink>('ShopeeLink', ShopeeLinkSchema)

export default ShopeeLinkModel
export { ShopeeLinkSchema }
