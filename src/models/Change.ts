import { getModelForClass, prop } from '@typegoose/typegoose'
import { getSingletonModel } from '@/utils/getSingletonModel'

export class Change {
  _id!: string

  @prop({ type: () => Number })
  change!: number

  @prop({ type: () => Date })
  createdAt?: Date

  @prop({ type: () => Date })
  updatedAt?: Date
}

export default getSingletonModel('Change', Change, {
  schemaOptions: { timestamps: true }
})