import { getModelForClass, mongoose, prop } from '@typegoose/typegoose'
import { ProductCart } from './ProductCart'

export class Cart {
  _id!: string

  @prop()
  products?: ProductCart[]
}

// Clear cached model to prevent hot reload issues
if (mongoose.models.Cart) {
  delete mongoose.models.Cart
}

const CartModel = getModelForClass(Cart, {
  schemaOptions: { timestamps: true }
})

export default CartModel