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
 *   2. Random 1 từ vựng từ MongoDB
 *   3. Gửi push notification cho từng subscription
 *   4. Cập nhật lastPushedAt
 */

import { NextRequest, NextResponse } from 'next/server'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const webpush = require('web-push')
import connectDB from '@/utils/connectDb'
import PushSubscriptionModel from '@/models/PushSubscription'
import VocabularyModel from '@/models/Vocabulary'

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

        if (dueSubscriptions.length === 0) {
            return NextResponse.json({ message: 'No subscriptions due', sent: 0 })
        }

        // Random 1 từ vựng
        const totalVocab = await VocabularyModel.countDocuments()
        if (totalVocab === 0) {
            return NextResponse.json({ message: 'No vocabulary to send', sent: 0 })
        }

        const randomIndex = Math.floor(Math.random() * totalVocab)
        const vocab = await VocabularyModel.findOne().skip(randomIndex).lean() as { original: string; translated: string; from: string; to: string } | null

        if (!vocab) {
            return NextResponse.json({ message: 'No vocabulary found', sent: 0 })
        }

        // Chuẩn bị payload — normalize sang EN → VI
        const isEnToVi = vocab.from === 'en'
        const word = isEnToVi ? vocab.original : vocab.translated
        const meaning = isEnToVi ? vocab.translated : vocab.original

        const payload = JSON.stringify({
            title: `📖 ${word}`,
            body: meaning,
            url: '/translate',
            tag: 'vocab-reminder',
        })

        // Gửi push cho từng subscription
        let sent = 0
        let failed = 0
        const failedEndpoints: string[] = []

        for (const sub of dueSubscriptions) {
            try {
                await webpush.sendNotification(
                    { endpoint: sub.endpoint, keys: sub.keys as { p256dh: string; auth: string } },
                    payload
                )
                // Cập nhật lastPushedAt
                await PushSubscriptionModel.updateOne(
                    { endpoint: sub.endpoint },
                    { lastPushedAt: now }
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
