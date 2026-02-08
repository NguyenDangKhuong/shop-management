import mongoose, { Document, Schema } from 'mongoose'

export interface IAutoFlow extends Document {
    accountId: string
    productId: string
    productTitle: string
    productImage?: string
    autoFlowUrl?: string
    enabled: boolean
    createdAt?: Date
    updatedAt?: Date
}

export type AutoFlow = IAutoFlow

const AutoFlowSchema = new Schema({
    accountId: { type: String, required: true },
    productId: { type: String, required: true },
    productTitle: { type: String, required: true },
    productImage: { type: String },
    autoFlowUrl: { type: String },
    enabled: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: 'autoflows'
})

const AutoFlowModel = mongoose.models.AutoFlow ||
    mongoose.model<IAutoFlow>('AutoFlow', AutoFlowSchema)

export default AutoFlowModel
export { AutoFlowSchema }
