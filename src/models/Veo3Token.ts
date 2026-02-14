import mongoose, { Document, Schema } from 'mongoose'

export interface IVeo3Token extends Document {
    value: string
    projectId?: string
    sessionId?: string
    apiKeyNanoAI?: string
    tokenCheckStatus?: string
    createdAt?: Date
    updatedAt?: Date
}

const Veo3TokenSchema = new Schema({
    value: { type: String, required: true },
    projectId: { type: String, default: '' },
    sessionId: { type: String, default: '' },
    apiKeyNanoAI: { type: String, default: '' },
    tokenCheckStatus: { type: String, default: '' }
}, {
    timestamps: true,
    collection: 'veo3tokens'
})

const Veo3TokenModel = mongoose.models.Veo3Token || mongoose.model<IVeo3Token>('Veo3Token', Veo3TokenSchema)

export default Veo3TokenModel
export { Veo3TokenSchema }
