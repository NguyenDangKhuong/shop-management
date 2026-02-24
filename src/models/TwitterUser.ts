import mongoose, { Schema, Document } from 'mongoose'

export interface ITwitterUser extends Document {
    username: string
    createdAt?: Date
    updatedAt?: Date
}

const TwitterUserSchema = new Schema({
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
}, {
    timestamps: true,
    collection: 'twitterusers'
})

const TwitterUserModel = mongoose.models.TwitterUser || mongoose.model<ITwitterUser>('TwitterUser', TwitterUserSchema)

export default TwitterUserModel
