import { getModelForClass, mongoose, prop } from '@typegoose/typegoose'

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

// Clear cached model to prevent hot reload issues
if (mongoose.models.User) {
  delete mongoose.models.User
}

const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true, collection: 'users' }
})

export default UserModel