import { getModelForClass, mongoose, prop } from '@typegoose/typegoose'

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

const CustomerModel = mongoose.models.Customer || getModelForClass(Customer, {
  schemaOptions: { timestamps: true }
})

export default CustomerModel