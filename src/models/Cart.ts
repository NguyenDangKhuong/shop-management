import { getModelForClass, prop } from '@typegoose/typegoose'
import { getSingletonModel } from '@/utils/getSingletonModel'
import { ProductCart } from './ProductCart'

export class Cart {
  _id!: string

  @prop()
  products?: ProductCart[]
}

export default getSingletonModel('Cart', Cart, {
  schemaOptions: { timestamps: true }
})