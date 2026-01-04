import mongoose, { Schema, Document } from 'mongoose'

export interface ICustomer extends Document {
  name: string
  phoneNumber: number
  amountPurchased?: number
  createdAt?: Date
  updatedAt?: Date
}

export type Customer = ICustomer

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  amountPurchased: { type: Number }
}, {
  timestamps: true
  // Mongoose will pluralize to 'customers' by default
})

const CustomerModel = mongoose.models.Customer || mongoose.model<ICustomer>('Customer', CustomerSchema)

export default CustomerModel
export { CustomerSchema }