import { getModelForClass, prop } from '@typegoose/typegoose'
import { getSingletonModel } from '@/utils/getSingletonModel'

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

export default getSingletonModel('ShopeeLink', ShopeeLink, {
    schemaOptions: { timestamps: true, collection: 'shopeelinks' }
})
