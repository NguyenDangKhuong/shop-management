import mongoose, { Schema, Document } from 'mongoose'

export interface IPrompt extends Document {
    productId: string
    title: string
    content: string
    mediaId?: string
    createdAt?: Date
    updatedAt?: Date
}

export type Prompt = IPrompt

const PromptSchema = new Schema({
    productId: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    mediaId: { type: String }
}, {
    timestamps: true,
    collection: 'prompts'
})

const PromptModel = mongoose.models.Prompt ||
    mongoose.model<IPrompt>('Prompt', PromptSchema)

export default PromptModel
export { PromptSchema }
