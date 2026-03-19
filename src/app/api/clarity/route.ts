/**
 * ========================================================================
 * CLARITY API — CRUD cho Monthly Plan
 * ========================================================================
 *
 * Endpoints:
 *   GET  /api/clarity?month=2026-03  → Lấy plan theo tháng (tạo mới nếu chưa có)
 *   PUT  /api/clarity               → Cập nhật plan (auto-save)
 *   DELETE /api/clarity?month=2026-03 → Xóa plan (reset tháng)
 */

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import MonthPlanModel from '@/models/MonthPlan'

export const dynamic = 'force-dynamic'

/** Helper: tạo plan mặc định cho tháng mới */
function createDefaultPlan(month: string) {
    // Tính số ngày & số tuần trong tháng
    const [year, mon] = month.split('-').map(Number)
    const daysInMonth = new Date(year, mon, 0).getDate()

    // Tạo 4-5 tuần
    const weeks = []
    let weekNum = 1
    for (let d = 1; d <= daysInMonth; d += 7) {
        weeks.push({ weekNumber: weekNum++, goals: [''], reflection: '' })
    }

    return {
        month,
        goals: [
            { text: '', progress: 0, color: '#3b82f6' },
            { text: '', progress: 0, color: '#10b981' },
            { text: '', progress: 0, color: '#f59e0b' },
        ],
        habits: [
            { name: '', days: Array(daysInMonth).fill(false) },
        ],
        weeks,
        dailyTasks: [],
        monthReflection: { wentWell: '', improve: '', grateful: '', rating: 0 },
    }
}

/**
 * GET /api/clarity?month=2026-03
 * Lấy plan theo tháng. Nếu chưa có → tạo mới với template mặc định.
 */
export async function GET(req: NextRequest) {
    try {
        const month = req.nextUrl.searchParams.get('month')
        if (!month || !/^\d{4}-\d{2}$/.test(month)) {
            return NextResponse.json({ error: 'Invalid month format (YYYY-MM)' }, { status: 400 })
        }

        await connectDB()

        const existing = await MonthPlanModel.findOne({ month }).lean()

        if (existing) {
            return NextResponse.json({ plan: existing })
        }

        // Tạo plan mới cho tháng này
        const created = await MonthPlanModel.create(createDefaultPlan(month))
        return NextResponse.json({ plan: created.toObject() })
    } catch (err) {
        console.error('Clarity GET error:', err)
        return NextResponse.json({ error: 'Failed to fetch plan' }, { status: 500 })
    }
}

/**
 * PUT /api/clarity
 * Cập nhật plan (auto-save từ frontend)
 * Body: full plan object với month field
 */
export async function PUT(req: NextRequest) {
    try {
        const data = await req.json()

        if (!data.month || !/^\d{4}-\d{2}$/.test(data.month)) {
            return NextResponse.json({ error: 'Invalid month format' }, { status: 400 })
        }

        await connectDB()

        const plan = await MonthPlanModel.findOneAndUpdate(
            { month: data.month },
            {
                goals: data.goals,
                habits: data.habits,
                weeks: data.weeks,
                dailyTasks: data.dailyTasks,
                monthReflection: data.monthReflection,
            },
            { new: true, upsert: true, lean: true }
        )

        return NextResponse.json({ success: true, plan })
    } catch (err) {
        console.error('Clarity PUT error:', err)
        return NextResponse.json({ error: 'Failed to save plan' }, { status: 500 })
    }
}

/**
 * DELETE /api/clarity?month=2026-03
 * Xóa plan (reset tháng)
 */
export async function DELETE(req: NextRequest) {
    try {
        const month = req.nextUrl.searchParams.get('month')
        if (!month) {
            return NextResponse.json({ error: 'month required' }, { status: 400 })
        }

        await connectDB()

        await MonthPlanModel.findOneAndDelete({ month })
        return NextResponse.json({ success: true })
    } catch (err) {
        console.error('Clarity DELETE error:', err)
        return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 })
    }
}
