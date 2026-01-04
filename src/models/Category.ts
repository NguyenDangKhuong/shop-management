import { getModelForClass, mongoose, prop } from '@typegoose/typegoose'

export class Category {
  _id!: string

  @prop({ type: () => String, required: true, unique: true })
  name!: string

  @prop({ type: () => Date })
  createdAt?: Date

  @prop({ type: () => Date })
  updatedAt?: Date
}

// Clear cached model to prevent hot reload issues
if (mongoose.models.Category) {
  delete mongoose.models.Category
}

const CategoryModel = getModelForClass(Category, {
  schemaOptions: { timestamps: true, collection: 'categories' }
})

export default CategoryModel