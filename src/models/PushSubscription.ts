/**
 * ========================================================================
 * PUSH SUBSCRIPTION MODEL — Lưu push subscription của user
 * ========================================================================
 *
 * Schema:
 * - endpoint:     Push service URL (FCM/APNs)
 * - keys:         p256dh + auth cho encryption
 * - frequency:    Số giờ giữa mỗi lần nhắc (1, 2, 4, 6, 12, 24)
 * - lastPushedAt: Thời điểm push gần nhất
 * - active:       Bật/tắt nhắc nhở
 */

import mongoose, { Document, Schema } from 'mongoose'

export interface IPushSubscription extends Document {
    endpoint: string
    keys: {
        p256dh: string
        auth: string
    }
    frequency: number       // hours between reminders
    lastPushedAt: Date | null
    active: boolean
    createdAt?: Date
    updatedAt?: Date
}

const PushSubscriptionSchema = new Schema({
    endpoint: { type: String, required: true, unique: true },
    keys: {
        p256dh: { type: String, required: true },
        auth: { type: String, required: true },
    },
    frequency: { type: Number, required: true, default: 4, enum: [1, 2, 4, 6, 12, 24] },
    lastPushedAt: { type: Date, default: null },
    active: { type: Boolean, default: true },
}, {
    timestamps: true,
    collection: 'push_subscriptions'
})

const PushSubscriptionModel = mongoose.models.PushSubscription
    || mongoose.model<IPushSubscription>('PushSubscription', PushSubscriptionSchema)

export default PushSubscriptionModel
