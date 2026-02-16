import mongoose, { Schema, Document } from 'mongoose'

export interface IPromptTemplate extends Document {
    title: string
    content: string
    subPrompt?: string
    group: string
    order: number
    createdAt?: Date
    updatedAt?: Date
}

const PromptTemplateSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    subPrompt: { type: String },
    group: { type: String, required: true },
    order: { type: Number, default: 0 }
}, {
    timestamps: true,
    collection: 'prompt_templates'
})

const PromptTemplateModel = mongoose.models.PromptTemplate ||
    mongoose.model<IPromptTemplate>('PromptTemplate', PromptTemplateSchema)

export default PromptTemplateModel
