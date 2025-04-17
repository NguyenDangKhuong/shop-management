import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'
import mongoose from 'mongoose'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'categories',
  },
  options: {
    customName: 'Category',
  },
})
export class Category {
  @prop({ required: true, unique: true })
  public name!: string

  public createdAt?: Date
  public updatedAt?: Date
}

console.log('cate', mongoose.models)

export const CategoryModel = mongoose.models.Category || getModelForClass(Category)
export default CategoryModel