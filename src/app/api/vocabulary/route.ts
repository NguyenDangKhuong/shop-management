/**
 * ========================================================================
 * VOCABULARY API — CRUD cho từ vựng đã lưu
 * ========================================================================
 *
 * Endpoints:
 *   GET  /api/vocabulary         → Lấy danh sách từ vựng (mới nhất trước)
 *   POST /api/vocabulary         → Lưu từ vựng mới (bookmark)
 *   DELETE /api/vocabulary?id=x  → Xóa từ vựng theo ID
 *
 * Flow:
 *   1. User dịch text trên /translate
 *   2. Bấm nút 🔖 → frontend gửi POST { original, translated, from, to }
 *   3. API lưu vào MongoDB collection 'vocabularies'
 *   4. Frontend fetch GET → hiển thị danh sách bên dưới
 *
 * Bảo mật:
 *   - Không cần auth (public page) — có thể thêm auth sau nếu cần
 *   - Giới hạn original/translated ≤ 2000 ký tự để tránh spam
 */

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import VocabularyModel from '@/models/Vocabulary'

export const dynamic = 'force-dynamic'

/**
 * GET /api/vocabulary
 * Lấy danh sách từ vựng, sắp xếp mới nhất trước
 * Query params:
 *   - limit: số lượng tối đa (mặc định 50)
 *   - skip: bỏ qua bao nhiêu (cho pagination)
 */
export async function GET(req: NextRequest) {
    try {
        await connectDB()

        const limit = parseInt(req.nextUrl.searchParams.get('limit') || '50')
        const skip = parseInt(req.nextUrl.searchParams.get('skip') || '0')

        // Lấy từ vựng mới nhất trước, giới hạn 50 mỗi lần
        const items = await VocabularyModel
            .find()
            .sort({ createdAt: -1 })        // Mới nhất trước
            .skip(skip)
            .limit(Math.min(limit, 100))     // Tối đa 100 để tránh quá tải
            .lean()                          // Trả plain object (nhanh hơn)

        // Đếm tổng số để frontend biết còn bao nhiêu
        const total = await VocabularyModel.countDocuments()

        return NextResponse.json({ items, total })
    } catch (err) {
        console.error('Vocabulary GET error:', err)
        return NextResponse.json({ error: 'Failed to fetch vocabulary' }, { status: 500 })
    }
}

/**
 * POST /api/vocabulary
 * Lưu từ vựng mới
 * Body: { original: string, translated: string, from: 'vi'|'en', to: 'vi'|'en' }
 */
export async function POST(req: NextRequest) {
    try {
        const { original, translated, from, to, wordType, example, exampleTranslation } = await req.json()

        // Validate: cần đủ 4 trường
        if (!original?.trim() || !translated?.trim() || !from || !to) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // Giới hạn độ dài để tránh spam
        if (original.length > 2000 || translated.length > 2000) {
            return NextResponse.json({ error: 'Text too long (max 2000 chars)' }, { status: 400 })
        }

        await connectDB()

        // Tạo document mới trong MongoDB
        const doc = await VocabularyModel.create({
            original: original.trim(),
            translated: translated.trim(),
            from,
            to,
            ...(wordType && { wordType: wordType.trim() }),
            ...(example && { example: example.trim() }),
            ...(exampleTranslation && { exampleTranslation: exampleTranslation.trim() }),
        })

        return NextResponse.json({ success: true, item: doc }, { status: 201 })
    } catch (err) {
        console.error('Vocabulary POST error:', err)
        return NextResponse.json({ error: 'Failed to save vocabulary' }, { status: 500 })
    }
}

/**
 * DELETE /api/vocabulary?id=xxx
 * Xóa từ vựng theo MongoDB _id
 */
export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'id required' }, { status: 400 })
        }

        await connectDB()

        const result = await VocabularyModel.findByIdAndDelete(id)

        if (!result) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 })
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Vocabulary DELETE error:', err)
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
    }
}
