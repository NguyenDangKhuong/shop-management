import mongoose, { Schema, Document } from 'mongoose'
import { IProductCart, ProductCartSchema } from './ProductCart'

export interface IOrder extends Document {
  orderId: string
  customerCash: number
  totalPrice: number
  totalCart: number
  exchange: number
  discountPrice: number
  products: IProductCart[]
  createdAt?: Date
  updatedAt?: Date
}

export type Order = IOrder

const OrderSchema = new Schema({
  orderId: { type: String },
  customerCash: { type: Number },
  totalPrice: { type: Number },
  totalCart: { type: Number },
  exchange: { type: Number },
  discountPrice: { type: Number },
  products: { type: [ProductCartSchema] }
}, {
  timestamps: true,
  collection: 'orders'
})

const OrderModel = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)

export default OrderModel
export { OrderSchema }