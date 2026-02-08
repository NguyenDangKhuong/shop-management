import { Schema, model, models } from 'mongoose'
import { IMediaFile, MediaFileSchema } from './MediaFile'

export interface IVeo3Media {
    _id?: string
    accountId: string
    mediaId: string
    mediaFile?: IMediaFile
    createdAt?: Date
    updatedAt?: Date
}

const Veo3MediaSchema = new Schema({
    accountId: { type: String, required: true },
    mediaId: { type: String, required: true },
    mediaFile: { type: MediaFileSchema }
}, {
    timestamps: true,
    collection: 'veo3medias'
})

const Veo3MediaModel = models.Veo3Media || model('Veo3Media', Veo3MediaSchema)

export default Veo3MediaModel
