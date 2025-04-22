import { prop, getModelForClass, modelOptions, mongoose } from '@typegoose/typegoose'

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