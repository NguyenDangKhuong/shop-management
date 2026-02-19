import mongoose, { Schema, Document } from 'mongoose'

export interface IPasswordResetToken extends Document {
    email: string
    token: string
    expiresAt: Date
}

const PasswordResetTokenSchema = new Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
}, {
    timestamps: true,
    collection: 'passwordresettokens'
})

// TTL index — MongoDB auto-deletes expired documents
PasswordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const PasswordResetTokenModel =
    mongoose.models.PasswordResetToken ||
    mongoose.model<IPasswordResetToken>('PasswordResetToken', PasswordResetTokenSchema)

export default PasswordResetTokenModel
