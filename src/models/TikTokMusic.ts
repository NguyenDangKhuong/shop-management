import { Document, Schema, model, models } from 'mongoose'
import { IMediaFile, MediaFileSchema } from './MediaFile'

export interface ITikTokMusic extends Document {
    name: string
    music?: IMediaFile
    createdAt?: Date
    updatedAt?: Date
}

const TikTokMusicSchema = new Schema({
    name: { type: String, required: true },
    music: { type: MediaFileSchema }
}, {
    timestamps: true,
    collection: 'tiktok_music'
})

const TikTokMusicModel = models.TikTokMusic || model<ITikTokMusic>('TikTokMusic', TikTokMusicSchema)
export default TikTokMusicModel
