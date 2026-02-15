import mongoose, { Document, Schema } from 'mongoose'
import { IMediaFile, MediaFileSchema } from './MediaFile'

export type AutoFlowStatus = 'pending' | 'running' | 'done' | 'error'

export interface IAutoFlow extends Document {
    accountId: string
    productId: string
    productTitle: string
    productImage?: string
    autoFlowUrl?: string
    n8nUrl?: string
    shopeeLinkId?: string
    description?: string
    enabled: boolean
    status: AutoFlowStatus
    promptIds: string[]
    videoFiles?: IMediaFile[]
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
    n8nUrl: { type: String },
    shopeeLinkId: { type: String },
    description: { type: String },
    enabled: { type: Boolean, default: false },
    status: { type: String, enum: ['pending', 'running', 'done', 'error'], default: 'pending' },
    promptIds: [{ type: String }],
    videoFiles: [{ type: MediaFileSchema }]
}, {
    timestamps: true,
    collection: 'autoflows'
})

const AutoFlowModel = mongoose.models.AutoFlow ||
    mongoose.model<IAutoFlow>('AutoFlow', AutoFlowSchema)

export default AutoFlowModel
export { AutoFlowSchema }

