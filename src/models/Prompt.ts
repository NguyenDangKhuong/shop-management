import mongoose, { Schema, Document } from 'mongoose'

export interface IReferenceImage {
    imageUsageType: string
    mediaId: string
}

export interface IPrompt extends Document {
    accountId: string
    title: string
    content: string
    subPrompt?: string
    referenceImages?: IReferenceImage[]
    type?: 'hook' | 'describe'
    order?: number
    createdAt?: Date
    updatedAt?: Date
}

export type Prompt = IPrompt

const PromptSchema = new Schema({
    accountId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    subPrompt: { type: String },
    referenceImages: [{
        imageUsageType: { type: String, default: 'IMAGE_USAGE_TYPE_ASSET' },
        mediaId: { type: String }
    }],
    type: { type: String, enum: ['hook', 'describe'], default: 'describe' },
    order: { type: Number, default: 0 }
}, {
    timestamps: true,
    collection: 'prompts'
})

const PromptModel = mongoose.models.Prompt ||
    mongoose.model<IPrompt>('Prompt', PromptSchema)

export default PromptModel
export { PromptSchema }
