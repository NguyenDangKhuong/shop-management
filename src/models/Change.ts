import mongoose, { Schema, Document } from 'mongoose'

export interface IChange extends Document {
  change: number
  createdAt?: Date
  updatedAt?: Date
}

export type Change = IChange

const ChangeSchema = new Schema({
  change: { type: Number }
}, {
  timestamps: true
})

const ChangeModel = mongoose.models.Change || mongoose.model<IChange>('Change', ChangeSchema)

export default ChangeModel
export { ChangeSchema }