import { Schema } from 'mongoose'
import { IProduct } from './Product'

// ProductCart is a subdocument, not a model itself usually, but we define interface and schema
export interface IProductCart {
  quantity: number
  product: IProduct // This might be referencing the Product document structure
}

export type ProductCart = IProductCart

export const ProductCartSchema = new Schema({
  quantity: { type: Number, required: true },
  product: { type: Object, required: true } // Storing the full product object or reference? Assuming snapshot based on "type: () => Product" in typegoose
}, { _id: false })