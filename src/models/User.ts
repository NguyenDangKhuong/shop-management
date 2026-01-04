import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password?: string // password might be selected out or optional in some contexts
  role: number
  createAt?: Date
  updateAt?: Date
}

export type User = IUser

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, required: true },
  createAt: { type: Date },
  updateAt: { type: Date }
}, {
  timestamps: true,
  collection: 'users'
})

const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default UserModel
export { UserSchema }