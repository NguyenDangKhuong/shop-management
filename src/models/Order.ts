import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { ProductCart } from './ProductCart'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'orders',
  },
  options: {
    customName: 'Order',
  },
})
export class Order {
  @prop()
  public orderId!: string

  @prop()
  public customerCash!: number

  @prop()
  public totalPrice!: number

  @prop()
  public totalCart!: number

  @prop()
  public exchange!: number

  @prop()
  public discountPrice!: number

  @prop({ type: () => [ProductCart] })
  public products!: ProductCart[]

  public createdAt?: Date
  public updatedAt?: Date
}

export const OrderModel = mongoose.models.Order || getModelForClass(Order)
export default OrderModel