import mongoose, { Schema, Document } from 'mongoose'
import { IProductCart, ProductCartSchema } from './ProductCart'

export interface ICart extends Document {
  products?: IProductCart[]
  createdAt?: Date
  updatedAt?: Date
}

export type Cart = ICart

const CartSchema = new Schema({
  products: { type: [ProductCartSchema], default: [] }
}, {
  timestamps: true,
})

const CartModel = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema)

export default CartModel
export { CartSchema }