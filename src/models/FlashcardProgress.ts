import mongoose, { Document, Schema } from 'mongoose'

export interface IFlashcardProgress extends Document {
    userId: string
    algoKnown: string[]
    interviewKnown: string[]
    vocabKnown: string[]
    updatedAt?: Date
}

const FlashcardProgressSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    algoKnown: { type: [String], default: [] },
    interviewKnown: { type: [String], default: [] },
    vocabKnown: { type: [String], default: [] },
}, {
    timestamps: true,
    collection: 'flashcard_progress',
})

const FlashcardProgressModel = mongoose.models.FlashcardProgress
    || mongoose.model<IFlashcardProgress>('FlashcardProgress', FlashcardProgressSchema)

export default FlashcardProgressModel
