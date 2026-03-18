import mongoose, { Document, Schema } from 'mongoose'

// ── Interview card ──
export interface IInterviewCard {
    cardId: string
    type: 'interview'
    question: string
    answer_vi: string
    answer_en: string
    topic: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
}

// ── Algorithm card ──
export interface IAlgoCard {
    cardId: string
    type: 'algorithm'
    pattern: string
    emoji: string
    color: string
    front: { signal: string; question: string }
    back: { approach: string; template: string; complexity: string; example: string }
}

export type IFlashcard = (IInterviewCard | IAlgoCard) & Document

const FlashcardSchema = new Schema({
    cardId: { type: String, required: true, unique: true },
    type: { type: String, required: true, enum: ['interview', 'algorithm'] },

    // Interview fields
    question: String,
    answer_vi: String,
    answer_en: String,
    topic: String,
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },

    // Algorithm fields
    pattern: String,
    emoji: String,
    color: String,
    front: { signal: String, question: String },
    back: { approach: String, template: String, complexity: String, example: String },
}, {
    timestamps: true,
    collection: 'flashcards',
})

FlashcardSchema.index({ type: 1 })
FlashcardSchema.index({ type: 1, topic: 1 })

const FlashcardModel = mongoose.models.Flashcard
    || mongoose.model<IFlashcard>('Flashcard', FlashcardSchema)

export default FlashcardModel
