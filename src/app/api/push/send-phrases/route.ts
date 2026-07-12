/**
 * ========================================================================
 * PUSH SEND PHRASES — Gửi push notification cụm tiếng Anh hằng ngày
 * ========================================================================
 *
 * Được gọi bởi cron job mỗi ngày:
 *   curl -X POST https://domain.com/api/push/send-phrases -H "x-cron-secret: ..."
 *
 * Flow:
 *   1. Tìm phrases đến hạn ôn (nextReviewAt ≤ now)
 *   2. Pick random 2-3 phrases
 *   3. Gửi push cho active subscriptions (có dailyPhrasesEnabled)
 */

import { NextRequest, NextResponse } from 'next/server'

const webpush = require('web-push')
import connectDB from '@/utils/connectDb'
import PushSubscriptionModel from '@/models/PushSubscription'
import DailyPhraseModel from '@/models/DailyPhrase'

export const dynamic = 'force-dynamic'

// Configure web-push
if (process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(
        'mailto:khuong@thetaphoa.com',
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    )
}

export async function POST(req: NextRequest) {
    const secret = req.headers.get('x-cron-secret')
    if (secret !== process.env.CRON_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        await connectDB()

        const now = new Date()

        // 1. Tìm phrases đến hạn ôn
        let duePhrases = await DailyPhraseModel.find({ nextReviewAt: { $lte: now } })
            .sort({ nextReviewAt: 1 })
            .limit(20)
            .lean()

        // Nếu không có phrases nào due → có thể tất cả đã ôn xong
        if (duePhrases.length === 0) {
            return NextResponse.json({ message: 'No phrases due for review', sent: 0 })
        }

        // 2. Pick random 2-3 phrases từ nhóm due
        const count = Math.min(duePhrases.length, Math.random() < 0.5 ? 2 : 3)
        const shuffled = duePhrases.sort(() => Math.random() - 0.5)
        const selected = shuffled.slice(0, count)

        // 3. Format notification body
        const categoryEmoji: Record<string, string> = {
            standup: '🗣️ Standup',
            dev: '💻 Dev',
            corporate: '🏦 Corporate',
            general: '🇦🇺 Aussie',
        }

        const mainCategory = selected[0].category as string
        const title = `📚 Daily English — ${categoryEmoji[mainCategory] || 'Phrases'}`

        let body = selected
            .map((p) => `🔹 "${p.phrase}"\n   → ${p.meaning}`)
            .join('\n\n')

        // Add tip from first phrase if available
        const tipPhrase = selected.find((p) => p.tip)
        if (tipPhrase) {
            body += `\n\n💡 ${tipPhrase.tip}`
        }

        const payload = JSON.stringify({
            title,
            body,
            url: '/daily-phrases',
            tag: 'daily-phrase',
        })

        // 4. Find active subscriptions with dailyPhrasesEnabled
        const subscriptions = await PushSubscriptionModel.find({
            active: true,
            dailyPhrasesEnabled: { $ne: false }, // default true
        }).lean()

        // Filter DND (UTC+7)
        const currentHour = new Date(now.getTime() + 7 * 60 * 60 * 1000).getUTCHours()
        const activeSubs = subscriptions.filter((sub) => {
            if (sub.dndFrom == null || sub.dndTo == null) return true
            if (sub.dndFrom <= sub.dndTo) {
                return currentHour < sub.dndFrom || currentHour >= sub.dndTo
            } else {
                return currentHour < sub.dndFrom && currentHour >= sub.dndTo
            }
        })

        if (activeSubs.length === 0) {
            return NextResponse.json({ message: 'No active subscriptions', sent: 0 })
        }

        // 5. Gửi push
        let sent = 0
        let failed = 0
        const failedEndpoints: string[] = []

        for (const sub of activeSubs) {
            try {
                await webpush.sendNotification(
                    { endpoint: sub.endpoint, keys: sub.keys as { p256dh: string; auth: string } },
                    payload
                )
                sent++
            } catch (err: unknown) {
                failed++
                const statusCode = (err as { statusCode?: number })?.statusCode
                if (statusCode === 410 || statusCode === 404) {
                    failedEndpoints.push(sub.endpoint)
                }
            }
        }

        // Clean up expired subscriptions
        if (failedEndpoints.length > 0) {
            await PushSubscriptionModel.deleteMany({ endpoint: { $in: failedEndpoints } })
        }

        return NextResponse.json({
            message: `Sent ${sent}, failed ${failed}`,
            sent,
            failed,
            phrases: selected.map((p) => ({ phrase: p.phrase, category: p.category })),
        })
    } catch (err) {
        console.error('Push send-phrases error:', err)
        return NextResponse.json({ error: 'Failed to send phrases' }, { status: 500 })
    }
}
