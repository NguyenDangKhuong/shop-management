/**
 * GET /api/clarity/streak
 * Calculate current streak: consecutive days with ≥1 habit ticked OR ≥1 daily task done.
 * Cross-month supported (queries up to 12 months back).
 */

import { NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import MonthPlanModel from '@/models/MonthPlan'

export const dynamic = 'force-dynamic'

interface MonthPlanDoc {
    month: string
    habits: { name: string; days: boolean[] }[]
    dailyTasks: { date: string; tasks: { text: string; done: boolean }[] }[]
}

function isDayActive(plan: MonthPlanDoc, dayIndex: number, dateStr: string): boolean {
    // Check habits: any habit has this day ticked?
    const habitActive = plan.habits.some(h => h.days[dayIndex] === true)
    if (habitActive) return true

    // Check daily tasks: any task done on this date?
    const entry = plan.dailyTasks.find(d => d.date === dateStr)
    if (entry && entry.tasks.some(t => t.done)) return true

    return false
}

function formatMonth(year: number, month: number): string {
    return `${year}-${String(month).padStart(2, '0')}`
}

function formatDate(year: number, month: number, day: number): string {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export async function GET() {
    try {
        await connectDB()

        const now = new Date()
        const todayYear = now.getFullYear()
        const todayMonth = now.getMonth() + 1
        const todayDay = now.getDate()

        // Cache of fetched month plans
        const planCache = new Map<string, MonthPlanDoc | null>()

        async function getMonthPlan(monthKey: string): Promise<MonthPlanDoc | null> {
            if (planCache.has(monthKey)) return planCache.get(monthKey)!
            const doc = await MonthPlanModel.findOne({ month: monthKey })
                .select('month habits dailyTasks')
                .lean<MonthPlanDoc>()
            planCache.set(monthKey, doc || null)
            return doc || null
        }

        let streak = 0
        let year = todayYear
        let month = todayMonth
        let day = todayDay
        let todayDone = false

        // Walk backwards day by day, max 365 days
        for (let i = 0; i < 365; i++) {
            const monthKey = formatMonth(year, month)
            const dateStr = formatDate(year, month, day)
            const dayIndex = day - 1

            const plan = await getMonthPlan(monthKey)

            if (plan && isDayActive(plan, dayIndex, dateStr)) {
                streak++
                if (i === 0) todayDone = true
            } else {
                // If today is not active, still check yesterday (streak starts from last active day)
                if (i === 0) {
                    // Today not done yet — don't break, check yesterday
                } else {
                    break
                }
            }

            // Move to previous day
            day--
            if (day < 1) {
                month--
                if (month < 1) {
                    month = 12
                    year--
                }
                const daysInPrevMonth = new Date(year, month, 0).getDate()
                day = daysInPrevMonth
            }
        }

        return NextResponse.json({ currentStreak: streak, todayDone })
    } catch (err) {
        console.error('Streak API error:', err)
        return NextResponse.json({ error: 'Failed to calculate streak' }, { status: 500 })
    }
}
