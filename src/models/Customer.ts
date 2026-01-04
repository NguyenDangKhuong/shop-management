import { prop } from '@typegoose/typegoose'
import { getSingletonModel } from '@/utils/getSingletonModel'

export class Customer {
  _id!: string

  @prop({ type: () => String, required: true })
  name!: string

  @prop({ type: () => Number, required: true })
  phoneNumber!: number

  @prop({ type: () => Number })
  amountPurchased: number

  @prop({ type: () => Date })
  createdAt?: Date

  @prop({ type: () => Date })
  updatedAt?: Date
}

export default getSingletonModel('Customer', Customer, {
  schemaOptions: { timestamps: true }
})