import mongoose, { Schema, Document } from 'mongoose'

export interface ITwitterToken extends Document {
    authToken: string
    ct0: string
    att?: string
    cookie: string // full cookie string
    createdAt?: Date
    updatedAt?: Date
}

const TwitterTokenSchema = new Schema({
    authToken: { type: String, required: true },
    ct0: { type: String, required: true },
    att: { type: String },
    cookie: { type: String, required: true },
}, {
    timestamps: true,
    collection: 'twittertokens'
})

const TwitterTokenModel = mongoose.models.TwitterToken || mongoose.model<ITwitterToken>('TwitterToken', TwitterTokenSchema)

export default TwitterTokenModel
