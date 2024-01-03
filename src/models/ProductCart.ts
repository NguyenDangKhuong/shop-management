import { prop } from '@typegoose/typegoose'
import { Product } from './Product'

export class ProductCart {
  @prop({type: () => Number, required: true})
  public quantity!: number;

  @prop({type: () => Product, required: true})
  public product!: Product;
}