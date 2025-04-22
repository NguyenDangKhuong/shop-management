import { prop, getModelForClass, modelOptions, mongoose } from '@typegoose/typegoose'
import { ProductCart } from './ProductCart'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'carts',
  },
  options: {
    customName: 'Cart',
  },
})
export class Cart {
  @prop({ type: () => [ProductCart] })
  public products?: ProductCart[]

  public createdAt?: Date
  public updatedAt?: Date
}

export const CartModel = mongoose.models.Cart || getModelForClass(Cart)
export default CartModel