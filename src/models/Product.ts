import { getModelForClass, mongoose, prop } from '@typegoose/typegoose'
export class Product {
  _id!: string

  @prop({ type: () => String, required: true, sparse: true })
  name!: string

  @prop({ type: () => String, required: true, unique: true, sparse: true })
  sku!: string

  @prop({ type: () => Number, required: true })
  price!: number

  @prop({ type: () => Number, required: true })
  storage!: number

  @prop({ type: () => String })
  categoryId?: string

  @prop({ type: () => String })
  imageUrl?: string

  @prop({ type: () => String })
  imagePublicId?: string

  @prop({ type: () => Boolean })
  isPublic?: boolean

  @prop({ type: () => Date })
  createdAt?: Date

  @prop({ type: () => Date })
  updatedAt?: Date
}

const ProductModel = mongoose.models.Product || getModelForClass(Product, {
  schemaOptions: { timestamps: true }
})

export default ProductModel