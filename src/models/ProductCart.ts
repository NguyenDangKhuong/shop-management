import { prop, modelOptions, getModelForClass } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { Product } from './Product'

@modelOptions({
  options: {
    customName: 'ProductCart',
  },
})
export class ProductCart {
  @prop({ required: true })
  public quantity!: number;

  @prop({ required: true })
  public product!: Product;
}

export const ProductCartModel = mongoose.models.ProductCart || getModelForClass(ProductCart)
export default ProductCartModel