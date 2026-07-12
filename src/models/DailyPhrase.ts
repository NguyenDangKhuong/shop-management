/**
 * ========================================================================
 * DAILY PHRASE MODEL — Cụm từ tiếng Anh hằng ngày + Spaced Repetition
 * ========================================================================
 *
 * Dùng cho tính năng nhắc ôn cụm từ tiếng Anh standup / FE dev.
 * Áp dụng thuật toán SM-2 đơn giản:
 *   - Hard:  interval = 1
 *   - Good:  interval × easeFactor
 *   - Easy:  interval × easeFactor × 1.5
 *
 * Schema:
 *   category      — Nhóm: standup, dev, corporate, general
 *   phrase        — Cụm tiếng Anh (VD: "I'm blocked on...")
 *   meaning       — Nghĩa tiếng Việt
 *   example       — Câu ví dụ đầy đủ
 *   tip           — Ghi chú cách dùng
 *   interval      — Khoảng cách ôn (ngày), khởi tạo = 1
 *   nextReviewAt  — Ngày cần ôn tiếp theo
 *   easeFactor    — Hệ số dễ, khởi tạo = 2.5, min 1.3
 *   reviewCount   — Số lần đã ôn
 *   lastReviewedAt — Lần ôn gần nhất
 */

import mongoose, { Document, Schema } from 'mongoose'

export type PhraseCategory = 'standup' | 'dev' | 'corporate' | 'general'
export type ReviewRating = 'hard' | 'good' | 'easy'

export interface IDailyPhrase extends Document {
    category: PhraseCategory
    phrase: string
    meaning: string
    example?: string
    tip?: string
    interval: number
    nextReviewAt: Date
    easeFactor: number
    reviewCount: number
    lastReviewedAt: Date | null
    createdAt?: Date
    updatedAt?: Date
}

const DailyPhraseSchema = new Schema({
    category: {
        type: String,
        required: true,
        enum: ['standup', 'dev', 'corporate', 'general'],
    },
    phrase: { type: String, required: true, trim: true },
    meaning: { type: String, required: true, trim: true },
    example: { type: String, trim: true },
    tip: { type: String, trim: true },
    // ── Spaced Repetition ──
    interval: { type: Number, default: 1 },
    nextReviewAt: { type: Date, default: Date.now },
    easeFactor: { type: Number, default: 2.5 },
    reviewCount: { type: Number, default: 0 },
    lastReviewedAt: { type: Date, default: null },
}, {
    timestamps: true,
    collection: 'daily_phrases',
})

// Index for efficient querying of due phrases
DailyPhraseSchema.index({ nextReviewAt: 1 })
DailyPhraseSchema.index({ category: 1, nextReviewAt: 1 })

const DailyPhraseModel = mongoose.models.DailyPhrase
    || mongoose.model<IDailyPhrase>('DailyPhrase', DailyPhraseSchema)

export default DailyPhraseModel
