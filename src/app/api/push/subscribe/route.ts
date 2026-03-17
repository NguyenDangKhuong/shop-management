/**
 * ========================================================================
 * PUSH SUBSCRIBE API — Quản lý đăng ký push notification
 * ========================================================================
 *
 * Endpoints:
 *   POST   /api/push/subscribe → Đăng ký/cập nhật subscription
 *   DELETE /api/push/subscribe → Hủy đăng ký
 *
 * Body (POST):
 *   { subscription: PushSubscription, frequency: number }
 */

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import PushSubscriptionModel from '@/models/PushSubscription'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    try {
        const { subscription, frequency } = await req.json()

        if (!subscription?.endpoint || !subscription?.keys) {
            return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 })
        }

        const validFreqs = [1, 2, 4, 6, 12, 24]
        const freq = validFreqs.includes(frequency) ? frequency : 4

        await connectDB()

        // Upsert: update nếu endpoint đã tồn tại, tạo mới nếu chưa
        await PushSubscriptionModel.findOneAndUpdate(
            { endpoint: subscription.endpoint },
            {
                endpoint: subscription.endpoint,
                keys: subscription.keys,
                frequency: freq,
                active: true,
            },
            { upsert: true, new: true }
        )

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Push subscribe error:', err)
        return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { endpoint } = await req.json()

        if (!endpoint) {
            return NextResponse.json({ error: 'endpoint required' }, { status: 400 })
        }

        await connectDB()
        await PushSubscriptionModel.findOneAndDelete({ endpoint })

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Push unsubscribe error:', err)
        return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 })
    }
}
