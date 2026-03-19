/**
 * ========================================================================
 * PUSH SUBSCRIPTION MODEL — Lưu push subscription của user
 * ========================================================================
 *
 * Schema:
 * - endpoint:     Push service URL (FCM/APNs)
 * - keys:         p256dh + auth cho encryption
 * - frequency:    Số giờ giữa mỗi lần nhắc (1, 2, 4, 6, 12, 24)
 * - dndFrom:      Giờ bắt đầu Do Not Disturb (0-23, VD: 22 = 10pm)
 * - dndTo:        Giờ kết thúc Do Not Disturb (0-23, VD: 7 = 7am)
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
    dndFrom: number | null  // DND start hour (0-23), null = disabled
    dndTo: number | null    // DND end hour (0-23), null = disabled
    lastSentVocabIds: string[] // last N sent vocab IDs to avoid repeats
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
    dndFrom: { type: Number, default: null, min: 0, max: 23 },
    dndTo: { type: Number, default: null, min: 0, max: 23 },
    lastSentVocabIds: { type: [String], default: [] },
    lastPushedAt: { type: Date, default: null },
    active: { type: Boolean, default: true },
}, {
    timestamps: true,
    collection: 'push_subscriptions'
})

const PushSubscriptionModel = mongoose.models.PushSubscription
    || mongoose.model<IPushSubscription>('PushSubscription', PushSubscriptionSchema)

export default PushSubscriptionModel
