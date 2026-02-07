import mongoose, { Schema, Document } from 'mongoose'

export interface IPrompt extends Document {
    title: string
    content: string
    mediaId?: string
    productId?: string
    productTitle?: string
    productImage?: string
    accountId?: string
    createdAt?: Date
    updatedAt?: Date
}

export type Prompt = IPrompt

const PromptSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    mediaId: { type: String },
    productId: { type: String },
    productTitle: { type: String },
    productImage: { type: String },
    accountId: { type: String }
}, {
    timestamps: true,
    collection: 'prompts'
})

const PromptModel = mongoose.models.Prompt ||
    mongoose.model<IPrompt>('Prompt', PromptSchema)

export default PromptModel
export { PromptSchema }
