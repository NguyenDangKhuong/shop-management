import { prop, getModelForClass, modelOptions, mongoose } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'products',
  },
  options: {
    customName: 'Product',
  },
})
export class Product {
  @prop({ required: true, sparse: true })
  public name!: string;

  @prop({ required: true, unique: true, sparse: true })
  public sku!: string;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public storage!: number;

  @prop()
  public categoryId?: string;

  @prop()
  public imageUrl?: string;

  @prop()
  public imagePublicId?: string;

  @prop()
  public isPublic?: boolean;

  public createdAt?: Date;
  public updatedAt?: Date;
}

export const ProductModel = mongoose.models.Product || getModelForClass(Product);
export default ProductModel;