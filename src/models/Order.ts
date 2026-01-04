import { getModelForClass, mongoose, prop } from '@typegoose/typegoose'
import { ProductCart } from './ProductCart'

export class Order {
  _id?: string

  @prop({ type: () => String })
  orderId!: string

  @prop({ type: () => Number })
  customerCash!: number

  @prop({ type: () => Number })
  totalPrice!: number

  @prop({ type: () => Number })
  totalCart!: number

  @prop({ type: () => Number })
  exchange!: number

  @prop({ type: () => Number })
  discountPrice!: number

  @prop({ type: () => [ProductCart] })
  products!: ProductCart[]

  @prop({ type: () => Date })
  createdAt?: Date

  @prop({ type: () => Date })
  updatedAt?: Date
}

// Clear cached model to prevent hot reload issues
if (mongoose.models.Order) {
  delete mongoose.models.Order
}

const OrderModel = getModelForClass(Order, {
  schemaOptions: { timestamps: true, collection: 'orders' }
})

export default OrderModel