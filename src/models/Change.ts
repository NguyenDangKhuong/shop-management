import { getModelForClass, mongoose, prop } from '@typegoose/typegoose'

export class Change {
  _id!: string

  @prop({ type: () => Number })
  change!: number

  @prop({ type: () => Date })
  createdAt?: Date

  @prop({ type: () => Date })
  updatedAt?: Date
}

// Clear cached model to prevent hot reload issues
if (mongoose.models.Change) {
  delete mongoose.models.Change
}

const ChangeModel = getModelForClass(Change, {
  schemaOptions: { timestamps: true }
})

export default ChangeModel