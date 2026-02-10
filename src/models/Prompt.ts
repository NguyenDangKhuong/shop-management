import mongoose, { Schema, Document } from 'mongoose'

export interface IPrompt extends Document {
    accountId: string
    title: string
    content: string
    subPrompt?: string
    mediaId?: string
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
    mediaId: { type: String },
    order: { type: Number, default: 0 }
}, {
    timestamps: true,
    collection: 'prompts'
})

const PromptModel = mongoose.models.Prompt ||
    mongoose.model<IPrompt>('Prompt', PromptSchema)

export default PromptModel
export { PromptSchema }
