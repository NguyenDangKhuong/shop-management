/**
 * ========================================================================
 * MONTH PLAN MODEL — Clarity Monthly Planner
 * ========================================================================
 *
 * Lưu toàn bộ kế hoạch tháng trong 1 document:
 * - goals:           Mục tiêu tháng (3-5 items, mỗi cái có progress 0-100%)
 * - habits:          Thói quen hàng ngày (habit tracker grid)
 * - weeks:           Mục tiêu tuần + reflection tuần
 * - dailyTasks:      Task hàng ngày + notes
 * - monthReflection: Reflection cuối tháng
 *
 * Key: `month` field (format: "2026-03") — unique per month
 */

import mongoose, { Document, Schema } from 'mongoose'

// ─── Sub-types ────────────────────────────────────────────────────────

interface IGoal {
    text: string
    progress: number       // 0-100
    color: string          // hex color for visual
}

interface IHabit {
    name: string
    days: boolean[]        // array of 31 booleans (day 1 = index 0)
}

interface ITask {
    text: string
    done: boolean
}

interface IDailyEntry {
    date: string           // "2026-03-15"
    tasks: ITask[]
    notes: string
}

interface IWeek {
    weekNumber: number     // 1-5
    goals: string[]        // 2-3 weekly goals
    reflection: string     // weekly reflection
}

interface IMonthReflection {
    wentWell: string
    improve: string
    grateful: string
    rating: number         // 1-10
}

// ─── Main interface ───────────────────────────────────────────────────

export interface IMonthPlan extends Document {
    month: string                    // "2026-03" — unique key
    goals: IGoal[]
    habits: IHabit[]
    weeks: IWeek[]
    dailyTasks: IDailyEntry[]
    monthReflection: IMonthReflection
    createdAt?: Date
    updatedAt?: Date
}

// ─── Schema ───────────────────────────────────────────────────────────

const MonthPlanSchema = new Schema({
    month: { type: String, required: true, unique: true, index: true },

    goals: [{
        text: { type: String, default: '' },
        progress: { type: Number, default: 0, min: 0, max: 100 },
        color: { type: String, default: '#3b82f6' },
    }],

    habits: [{
        name: { type: String, default: '' },
        days: { type: [Boolean], default: () => Array(31).fill(false) },
    }],

    weeks: [{
        weekNumber: { type: Number, required: true },
        goals: { type: [String], default: [] },
        reflection: { type: String, default: '' },
    }],

    dailyTasks: [{
        date: { type: String, required: true },
        tasks: [{
            text: { type: String, default: '' },
            done: { type: Boolean, default: false },
        }],
        notes: { type: String, default: '' },
    }],

    monthReflection: {
        wentWell: { type: String, default: '' },
        improve: { type: String, default: '' },
        grateful: { type: String, default: '' },
        rating: { type: Number, default: 0, min: 0, max: 10 },
    },
}, {
    timestamps: true,
    collection: 'monthplans',
})

const MonthPlanModel = mongoose.models.MonthPlan
    || mongoose.model<IMonthPlan>('MonthPlan', MonthPlanSchema)

export default MonthPlanModel
