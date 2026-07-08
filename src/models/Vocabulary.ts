/**
 * ========================================================================
 * VOCABULARY MODEL — Lưu từ vựng / mẫu câu đã dịch
 * ========================================================================
 *
 * Tại sao cần model này?
 * - User dịch văn bản trên /translate → gặp từ/câu hay → bấm bookmark để lưu
 * - Sau đó xem lại danh sách đã lưu bên dưới trang translate
 *
 * Schema:
 * - original:   Văn bản gốc (ví dụ: "Xin chào")
 * - translated:  Bản dịch (ví dụ: "Hello")
 * - from:       Ngôn ngữ gốc ('vi' hoặc 'en')
 * - to:         Ngôn ngữ đích ('en' hoặc 'vi')
 * - timestamps: createdAt + updatedAt tự động
 *
 * Flow:
 *   User dịch text → bấm 🔖 → POST /api/vocabulary
 *   → Mongoose tạo document → lưu vào collection 'vocabularies'
 *   → GET /api/vocabulary → trả danh sách đã lưu
 */

import mongoose, { Document, Schema } from 'mongoose'

export interface IVocabulary extends Document {
    original: string
    translated: string
    from: 'vi' | 'en'
    to: 'vi' | 'en'
    wordType?: string            // noun, verb, adjective, phrase, idiom...
    example?: string             // Example sentence in source language
    exampleTranslation?: string  // Translated example sentence
    createdAt?: Date
    updatedAt?: Date
}

const VocabularySchema = new Schema({
    // Văn bản gốc — bắt buộc, cắt khoảng trắng đầu/cuối
    original: { type: String, required: true, trim: true },

    // Bản dịch — bắt buộc
    translated: { type: String, required: true, trim: true },

    // Ngôn ngữ: chỉ chấp nhận 'vi' hoặc 'en'
    from: { type: String, required: true, enum: ['vi', 'en'] },
    to: { type: String, required: true, enum: ['vi', 'en'] },

    // Rich word data (optional — from translate API)
    wordType: { type: String, trim: true },
    example: { type: String, trim: true },
    exampleTranslation: { type: String, trim: true },
}, {
    timestamps: true,             // Tự thêm createdAt + updatedAt
    collection: 'vocabularies'    // Tên collection trong MongoDB
})

// Tránh tạo model trùng trong development (hot-reload)
const VocabularyModel = mongoose.models.Vocabulary
    || mongoose.model<IVocabulary>('Vocabulary', VocabularySchema)

export default VocabularyModel
