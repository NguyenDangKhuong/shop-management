import { getModelForClass, mongoose, prop } from '@typegoose/typegoose'

export class ShopeeLink {
    _id!: string

    @prop({ type: () => String, required: true })
    imageUrl!: string

    @prop({ type: () => String, required: true })
    productUrl!: string

    @prop({ type: () => Date })
    createdAt?: Date

    @prop({ type: () => Date })
    updatedAt?: Date
}

const ShopeeLinkModel = mongoose.models.ShopeeLink || getModelForClass(ShopeeLink, {
    schemaOptions: { timestamps: true, collection: 'shopeelinks' }
})

export default ShopeeLinkModel
