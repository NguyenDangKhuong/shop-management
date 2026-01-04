import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  sku: string
  price: number
  storage: number
  categoryId?: string
  imageUrl?: string
  imagePublicId?: string
  isPublic?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type Product = IProduct

const ProductSchema = new Schema({
  name: { type: String, required: true, sparse: true },
  sku: { type: String, required: true, unique: true, sparse: true },
  price: { type: Number, required: true },
  storage: { type: Number, required: true },
  categoryId: { type: String },
  imageUrl: { type: String },
  imagePublicId: { type: String },
  isPublic: { type: Boolean }
}, {
  timestamps: true,
  collection: 'products'
})

const ProductModel = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

export default ProductModel
export { ProductSchema }