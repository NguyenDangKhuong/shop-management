/**
 * ========================================================================
 * PUSH SEND API — Gửi push notification nhắc từ vựng
 * ========================================================================
 *
 * Được gọi bởi cron job (VPS) mỗi giờ:
 *   curl -X POST https://domain.com/api/push/send -H "x-cron-secret: ..."
 *
 * Flow:
 *   1. Tìm subscriptions cần gửi (active + đã đến lúc theo frequency)
 *   2. Random 1 từ vựng từ MongoDB (không lặp lại 20 từ gần nhất)
 *   3. Gửi push notification cho từng subscription
 *   4. Cập nhật lastPushedAt + lastSentVocabIds
 */

import { NextRequest, NextResponse } from 'next/server'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const webpush = require('web-push')
import connectDB from '@/utils/connectDb'
import PushSubscriptionModel from '@/models/PushSubscription'
import VocabularyModel from '@/models/Vocabulary'
import mongoose from 'mongoose'

export const dynamic = 'force-dynamic'

// Configure web-push with VAPID keys
webpush.setVapidDetails(
    'mailto:khuong@thetaphoa.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)

export async function POST(req: NextRequest) {
    // Verify cron secret
    const secret = req.headers.get('x-cron-secret')
    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        await connectDB()

        const now = new Date()

        // Tìm subscriptions active cần gửi
        const subscriptions = await PushSubscriptionModel.find({ active: true }).lean()

        // Filter: chỉ gửi cho sub mà đã đến lúc (dựa trên frequency + lastPushedAt)
        const dueSubscriptions = subscriptions.filter((sub) => {
            if (!sub.lastPushedAt) return true // Chưa gửi bao giờ → gửi ngay
            const hoursSinceLastPush = (now.getTime() - new Date(sub.lastPushedAt).getTime()) / (1000 * 60 * 60)
            return hoursSinceLastPush >= sub.frequency
        })

        // Filter: bỏ qua subscriptions đang trong giờ Do Not Disturb
        const currentHour = new Date(now.getTime() + 7 * 60 * 60 * 1000).getUTCHours() // UTC+7
        const activeSubs = dueSubscriptions.filter((sub) => {
            if (sub.dndFrom == null || sub.dndTo == null) return true // DND tắt
            // VD: dndFrom=22, dndTo=7 → quiet từ 22h-7h (qua đêm)
            // VD: dndFrom=13, dndTo=14 → quiet từ 13h-14h (cùng ngày)
            if (sub.dndFrom <= sub.dndTo) {
                // Cùng ngày: 13-14 → skip nếu 13 <= hour < 14
                return currentHour < sub.dndFrom || currentHour >= sub.dndTo
            } else {
                // Qua đêm: 22-7 → skip nếu hour >= 22 HOẶC hour < 7
                return currentHour < sub.dndFrom && currentHour >= sub.dndTo
            }
        })

        if (activeSubs.length === 0) {
            return NextResponse.json({ message: 'No subscriptions due', sent: 0 })
        }

        // Random 1 từ vựng — avoid repeats
        // Collect all recently sent vocab IDs across due subscriptions
        const recentIds = [...new Set(
            activeSubs.flatMap((sub) =>
                (sub.lastSentVocabIds || []).map((id: string) => new mongoose.Types.ObjectId(id))
            )
        )]

        // Use $sample with $nin to exclude recently sent words
        const pipeline: mongoose.PipelineStage[] = [
            ...(recentIds.length > 0 ? [{ $match: { _id: { $nin: recentIds } } }] : []),
            { $sample: { size: 1 } },
        ]

        let vocabResult = await VocabularyModel.aggregate(pipeline)

        // Fallback: if all words have been sent recently, reset and pick any
        if (vocabResult.length === 0) {
            vocabResult = await VocabularyModel.aggregate([{ $sample: { size: 1 } }])
            // Reset lastSentVocabIds for all due subscriptions
            await PushSubscriptionModel.updateMany(
                { endpoint: { $in: activeSubs.map((s) => s.endpoint) } },
                { lastSentVocabIds: [] }
            )
        }

        if (vocabResult.length === 0) {
            return NextResponse.json({ message: 'No vocabulary to send', sent: 0 })
        }

        const vocab = vocabResult[0] as { _id: mongoose.Types.ObjectId; original: string; translated: string; from: string; to: string; wordType?: string; example?: string; exampleTranslation?: string }

        // Chuẩn bị payload — normalize sang EN → VI
        const isEnToVi = vocab.from === 'en'
        const word = isEnToVi ? vocab.original : vocab.translated
        const meaning = isEnToVi ? vocab.translated : vocab.original

        // Build rich body: meaning + wordType + example
        let body = meaning
        if (vocab.wordType) body = `(${vocab.wordType}) ${body}`
        if (vocab.example) {
            const exTrans = vocab.exampleTranslation ? ` → ${vocab.exampleTranslation}` : ''
            body += `\n📝 "${vocab.example}"${exTrans}`
        }

        const payload = JSON.stringify({
            title: `📖 ${word}`,
            body,
            url: '/translate',
            tag: 'vocab-reminder',
        })

        // Gửi push cho từng subscription
        let sent = 0
        let failed = 0
        const failedEndpoints: string[] = []
        const MAX_HISTORY = 20 // Track last 20 words

        for (const sub of activeSubs) {
            try {
                await webpush.sendNotification(
                    { endpoint: sub.endpoint, keys: sub.keys as { p256dh: string; auth: string } },
                    payload
                )
                // Cập nhật lastPushedAt + add vocab ID to history (keep last N)
                const updatedIds = [...(sub.lastSentVocabIds || []), vocab._id.toString()].slice(-MAX_HISTORY)
                await PushSubscriptionModel.updateOne(
                    { endpoint: sub.endpoint },
                    { lastPushedAt: now, lastSentVocabIds: updatedIds }
                )
                sent++
            } catch (err: unknown) {
                failed++
                const statusCode = (err as { statusCode?: number })?.statusCode
                // 410 Gone hoặc 404 → subscription expired, xóa
                if (statusCode === 410 || statusCode === 404) {
                    failedEndpoints.push(sub.endpoint)
                }
            }
        }

        // Xóa expired subscriptions
        if (failedEndpoints.length > 0) {
            await PushSubscriptionModel.deleteMany({ endpoint: { $in: failedEndpoints } })
        }

        return NextResponse.json({
            message: `Sent ${sent}, failed ${failed}, cleaned ${failedEndpoints.length}`,
            sent,
            failed,
            word,
            meaning,
        })
    } catch (err) {
        console.error('Push send error:', err)
        return NextResponse.json({ error: 'Failed to send push' }, { status: 500 })
    }
}
