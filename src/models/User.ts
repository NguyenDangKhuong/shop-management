import { prop, getModelForClass, modelOptions, mongoose } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'users',
  },
  options: {
    customName: 'User',
  },
})
export class User {
  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true, enum: ['admin', 'user'], default: 'user' })
  public role!: 'admin' | 'user';

  public createdAt?: Date;
  public updatedAt?: Date;
}
console.log('mongoose.models.User', mongoose.models)

const UserModel = mongoose.models.User || getModelForClass(User);
export default UserModel