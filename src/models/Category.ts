import mongoose, { Schema, Document } from 'mongoose'


export interface ICategory extends Document {
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export type Category = ICategory

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true }
}, {
  timestamps: true,
  collection: 'categories'
})

const CategoryModel = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema)

export default CategoryModel
export { CategorySchema }