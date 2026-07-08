import mongoose, { Schema, Document } from 'mongoose'

export interface ITwitterToken extends Document {
    authToken: string
    ct0: string
    att?: string
    cookie: string // full cookie string
    bearerToken?: string // Bearer token for GraphQL API
    // GraphQL query IDs (change when X deploys new versions)
    userTweetsQueryId?: string
    userByScreenNameQueryId?: string
    homeTimelineQueryId?: string        // For You
    homeLatestTimelineQueryId?: string  // Following
    createdAt?: Date
    updatedAt?: Date
}

const TwitterTokenSchema = new Schema({
    authToken: { type: String, required: true },
    ct0: { type: String, required: true },
    att: { type: String },
    cookie: { type: String, required: true },
    bearerToken: { type: String },
    userTweetsQueryId: { type: String },
    userByScreenNameQueryId: { type: String },
    homeTimelineQueryId: { type: String },
    homeLatestTimelineQueryId: { type: String },
}, {
    timestamps: true,
    collection: 'twittertokens'
})

const TwitterTokenModel = mongoose.models.TwitterToken || mongoose.model<ITwitterToken>('TwitterToken', TwitterTokenSchema)

export default TwitterTokenModel

