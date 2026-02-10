import mongoose, { Document, Schema } from 'mongoose'

export interface IVeo3Token extends Document {
    value: string
    tokenCheckStatus?: string
    createdAt?: Date
    updatedAt?: Date
}

const Veo3TokenSchema = new Schema({
    value: { type: String, required: true },
    tokenCheckStatus: { type: String, default: '' }
}, {
    timestamps: true,
    collection: 'veo3tokens'
})

const Veo3TokenModel = mongoose.models.Veo3Token || mongoose.model<IVeo3Token>('Veo3Token', Veo3TokenSchema)

export default Veo3TokenModel
export { Veo3TokenSchema }
