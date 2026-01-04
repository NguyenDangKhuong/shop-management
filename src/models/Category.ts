import { prop } from '@typegoose/typegoose'
import { getSingletonModel } from '@/utils/getSingletonModel'

export class Category {
  _id!: string

  @prop({ type: () => String, required: true, unique: true })
  name!: string

  @prop({ type: () => Date })
  createdAt?: Date

  @prop({ type: () => Date })
  updatedAt?: Date
}

export default getSingletonModel('Category', Category, {
  schemaOptions: { timestamps: true, collection: 'categories' }
})