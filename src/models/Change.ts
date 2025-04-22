import { prop, getModelForClass, modelOptions, mongoose } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'changes',
  },
  options: {
    customName: 'Change',
  },
})
export class Change {
  @prop()
  public change!: number;

  public createdAt?: Date;
  public updatedAt?: Date;
}

export const ChangeModel = mongoose.models.Change || getModelForClass(Change);
export default ChangeModel;