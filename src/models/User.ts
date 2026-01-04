import { getModelForClass, prop } from '@typegoose/typegoose'
import { getSingletonModel } from '@/utils/getSingletonModel'

export class User {
  _id!: string

  @prop({ type: () => String, required: true })
  name!: string

  @prop({ type: () => String, required: true, unique: true })
  email!: string

  @prop({ type: () => String, required: true })
  password!: string

  @prop({ type: () => Number, required: true })
  role!: number

  @prop({ type: () => Date })
  createAt?: Date

  @prop({ type: () => Date })
  updateAt?: Date
}

export default getSingletonModel('User', User, {
  schemaOptions: { timestamps: true, collection: 'users' }
})