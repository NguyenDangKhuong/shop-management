import { getModelForClass, mongoose, prop } from '@typegoose/typegoose'
import { ProductCart } from './ProductCart'

export class Cart {
  _id!: string

  @prop()
  products?: ProductCart[]
}

const CartModel = mongoose.models.Cart || getModelForClass(Cart, {
  schemaOptions: { timestamps: true }
})

export default CartModel