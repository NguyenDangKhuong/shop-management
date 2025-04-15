import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import mongoose from 'mongoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'customers',
  },
  options: {
    customName: 'Customer',
  },
})
export class Customer {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public phoneNumber!: number;

  @prop()
  public amountPurchased!: number;

  public createdAt?: Date;
  public updatedAt?: Date;
}

export const CustomerModel = mongoose.models.Customer || getModelForClass(Customer);
export default CustomerModel;