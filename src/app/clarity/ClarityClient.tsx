'use client'

/**
 * ========================================================================
 * CLARITY CLIENT — Trang lập kế hoạch tháng cá nhân
 * ========================================================================
 *
 * 5 Sections:
 * 1. Monthly Goals — 3-5 mục tiêu với thanh progress
 * 2. Habit Tracker — Grid: thói quen × ngày trong tháng
 * 3. Weekly Goals — 4-5 tuần với mục tiêu + reflection
 * 4. Daily Tasks — Chọn ngày → danh sách task + notes
 * 5. Reflection — Cuối tháng: went well / improve / grateful / rating
 *
 * Auto-save: debounce 1s → PUT /api/clarity
 */

import { useCallback, useEffect, useState, useRef } from 'react'
import useDebounce from '@/hooks/useDebounce'

// ─── Types ────────────────────────────────────────────────────────────

interface Goal { text: string; progress: number; color: string }
interface Habit { name: string; days: boolean[] }
interface Task { text: string; done: boolean }
interface DailyEntry { date: string; tasks: Task[]; notes: string }
interface Week { weekNumber: number; goals: string[]; reflection: string }
interface MonthReflection { wentWell: string; improve: string; grateful: string; rating: number }

interface MonthPlan {
    _id?: string
    month: string
    goals: Goal[]
    habits: Habit[]
    weeks: Week[]
    dailyTasks: DailyEntry[]
    monthReflection: MonthReflection
}

// ─── Helpers ──────────────────────────────────────────────────────────

function getCurrentMonth() {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function formatMonthLabel(month: string) {
    const [y, m] = month.split('-').map(Number)
    const date = new Date(y, m - 1)
    return date.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })
}

function getDaysInMonth(month: string) {
    const [y, m] = month.split('-').map(Number)
    return new Date(y, m, 0).getDate()
}

function shiftMonth(month: string, delta: number) {
    const [y, m] = month.split('-').map(Number)
    const d = new Date(y, m - 1 + delta)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

const GOAL_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

// ─── Component ────────────────────────────────────────────────────────

export default function ClarityClient() {
    const [month, setMonth] = useState(getCurrentMonth)
    const [plan, setPlan] = useState<MonthPlan | null>(null)
    const [loading, setLoading] = useState(true)
    const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('idle')
    const [activeTab, setActiveTab] = useState<'goals' | 'habits' | 'weekly' | 'daily' | 'reflection'>('goals')
    const [selectedDay, setSelectedDay] = useState(() => new Date().getDate())
    const [activeWeek, setActiveWeek] = useState(1)
    const saveRef = useRef(false)
    const [streak, setStreak] = useState<{ currentStreak: number; todayDone: boolean }>({ currentStreak: 0, todayDone: false })

    // ─── Fetch streak ─────────────────────────────────────────────────
    const fetchStreak = useCallback(async () => {
        try {
            const res = await fetch('/api/clarity/streak')
            const data = await res.json()
            if (data.currentStreak !== undefined) setStreak(data)
        } catch { /* silent */ }
    }, [])

    useEffect(() => { fetchStreak() }, [fetchStreak])

    // ─── Fetch plan ───────────────────────────────────────────────────
    const fetchPlan = useCallback(async (m: string) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/clarity?month=${m}`)
            const data = await res.json()
            if (data.plan) {
                setPlan(data.plan)
                saveRef.current = false
            }
        } catch {
            console.error('Failed to fetch plan')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchPlan(month) }, [month, fetchPlan])

    // ─── Auto-save (debounce 1s) ──────────────────────────────────────
    const planJson = plan ? JSON.stringify(plan) : ''
    const debouncedPlan = useDebounce(planJson, 1000)

    useEffect(() => {
        if (!debouncedPlan || !saveRef.current) return
        const savePlan = async () => {
            setSaveStatus('saving')
            try {
                const data = JSON.parse(debouncedPlan)
                await fetch('/api/clarity', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                })
                setSaveStatus('saved')
                fetchStreak() // re-calculate streak after save
                setTimeout(() => setSaveStatus('idle'), 1500)
            } catch {
                console.error('Failed to save plan')
                setSaveStatus('idle')
            }
        }
        savePlan()
    }, [debouncedPlan, fetchStreak])

    // ─── Update helpers ───────────────────────────────────────────────
    const updatePlan = (updates: Partial<MonthPlan>) => {
        if (!plan) return
        saveRef.current = true
        setPlan({ ...plan, ...updates })
    }

    // Goals
    const updateGoal = (idx: number, field: keyof Goal, value: string | number) => {
        if (!plan) return
        const goals = [...plan.goals]
        goals[idx] = { ...goals[idx], [field]: value }
        updatePlan({ goals })
    }
    const addGoal = () => {
        if (!plan || plan.goals.length >= 5) return
        updatePlan({ goals: [...plan.goals, { text: '', progress: 0, color: GOAL_COLORS[plan.goals.length % GOAL_COLORS.length] }] })
    }
    const removeGoal = (idx: number) => {
        if (!plan || plan.goals.length <= 1) return
        updatePlan({ goals: plan.goals.filter((_, i) => i !== idx) })
    }

    // Habits
    const updateHabitName = (idx: number, name: string) => {
        if (!plan) return
        const habits = [...plan.habits]
        habits[idx] = { ...habits[idx], name }
        updatePlan({ habits })
    }
    const toggleHabitDay = (habitIdx: number, dayIdx: number) => {
        if (!plan) return
        const habits = [...plan.habits]
        const days = [...habits[habitIdx].days]
        days[dayIdx] = !days[dayIdx]
        habits[habitIdx] = { ...habits[habitIdx], days }
        updatePlan({ habits })
    }
    const addHabit = () => {
        if (!plan) return
        const daysCount = getDaysInMonth(month)
        updatePlan({ habits: [...plan.habits, { name: '', days: Array(daysCount).fill(false) }] })
    }
    const removeHabit = (idx: number) => {
        if (!plan || plan.habits.length <= 1) return
        updatePlan({ habits: plan.habits.filter((_, i) => i !== idx) })
    }

    // Weekly goals
    const updateWeekGoal = (weekIdx: number, goalIdx: number, value: string) => {
        if (!plan) return
        const weeks = [...plan.weeks]
        const goals = [...weeks[weekIdx].goals]
        goals[goalIdx] = value
        weeks[weekIdx] = { ...weeks[weekIdx], goals }
        updatePlan({ weeks })
    }
    const addWeekGoal = (weekIdx: number) => {
        if (!plan) return
        const weeks = [...plan.weeks]
        weeks[weekIdx] = { ...weeks[weekIdx], goals: [...weeks[weekIdx].goals, ''] }
        updatePlan({ weeks })
    }
    const updateWeekReflection = (weekIdx: number, reflection: string) => {
        if (!plan) return
        const weeks = [...plan.weeks]
        weeks[weekIdx] = { ...weeks[weekIdx], reflection }
        updatePlan({ weeks })
    }

    // Daily tasks
    const getDailyEntry = (): DailyEntry => {
        if (!plan) return { date: '', tasks: [], notes: '' }
        const dateStr = `${month}-${String(selectedDay).padStart(2, '0')}`
        return plan.dailyTasks.find(d => d.date === dateStr) || { date: dateStr, tasks: [], notes: '' }
    }
    const updateDailyEntry = (entry: DailyEntry) => {
        if (!plan) return
        const dailyTasks = [...plan.dailyTasks]
        const idx = dailyTasks.findIndex(d => d.date === entry.date)
        if (idx >= 0) dailyTasks[idx] = entry
        else dailyTasks.push(entry)
        updatePlan({ dailyTasks })
    }
    const addDailyTask = () => {
        const entry = getDailyEntry()
        updateDailyEntry({ ...entry, tasks: [...entry.tasks, { text: '', done: false }] })
    }
    const toggleTask = (taskIdx: number) => {
        const entry = getDailyEntry()
        const tasks = [...entry.tasks]
        tasks[taskIdx] = { ...tasks[taskIdx], done: !tasks[taskIdx].done }
        updateDailyEntry({ ...entry, tasks })
    }
    const updateTaskText = (taskIdx: number, text: string) => {
        const entry = getDailyEntry()
        const tasks = [...entry.tasks]
        tasks[taskIdx] = { ...tasks[taskIdx], text }
        updateDailyEntry({ ...entry, tasks })
    }
    const removeTask = (taskIdx: number) => {
        const entry = getDailyEntry()
        updateDailyEntry({ ...entry, tasks: entry.tasks.filter((_, i) => i !== taskIdx) })
    }
    const updateDailyNotes = (notes: string) => {
        const entry = getDailyEntry()
        updateDailyEntry({ ...entry, notes })
    }

    // Month reflection
    const updateReflection = (field: keyof MonthReflection, value: string | number) => {
        if (!plan) return
        updatePlan({ monthReflection: { ...plan.monthReflection, [field]: value } })
    }

    // ─── Computed values ──────────────────────────────────────────────
    const overallProgress = plan?.goals.length
        ? Math.round(plan.goals.reduce((sum, g) => sum + g.progress, 0) / plan.goals.length)
        : 0

    const daysInMonth = getDaysInMonth(month)
    const today = new Date()
    const isCurrentMonth = month === getCurrentMonth()

    // ─── Render ───────────────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="flex items-center gap-3 text-blue-400">
                    <span className="inline-block w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    Loading plan...
                </div>
            </div>
        )
    }

    if (!plan) return null

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex flex-col items-center px-4 py-8 md:py-12">
            {/* ───────── Header ───────── */}
            <div className="w-full max-w-5xl mb-8">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">📋</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">Clarity</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* 🔥 Streak Widget */}
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${streak.currentStreak > 0
                            ? 'bg-orange-500/15 border border-orange-500/30'
                            : 'bg-slate-800/60 border border-white/5'}`}
                            title={streak.currentStreak > 0 ? `${streak.currentStreak} ngày liên tiếp!` : 'Chưa có streak'}
                        >
                            <span className={`text-lg transition-all ${streak.currentStreak > 0
                                ? 'animate-[streakPulse_2s_ease-in-out_infinite] drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]'
                                : 'grayscale opacity-40'}`}>
                                🔥
                            </span>
                            <span className={`text-sm font-bold tabular-nums ${streak.currentStreak > 0 ? 'text-orange-400' : 'text-slate-500'}`}>
                                {streak.currentStreak}
                            </span>
                            {!streak.todayDone && streak.currentStreak > 0 && (
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" title="Hôm nay chưa hoàn thành!" />
                            )}
                        </div>
                        {/* Save status */}
                        <div className="text-xs">
                            {saveStatus === 'saving' && <span className="text-blue-400 flex items-center gap-1"><span className="inline-block w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />Saving...</span>}
                            {saveStatus === 'saved' && <span className="text-green-400">✓ Saved</span>}
                        </div>
                    </div>
                </div>

                {/* Month navigation */}
                <div className="flex items-center gap-3">
                    <button onClick={() => setMonth(shiftMonth(month, -1))} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-sm">←</button>
                    <span className="text-lg font-semibold text-white capitalize">{formatMonthLabel(month)}</span>
                    <button onClick={() => setMonth(shiftMonth(month, 1))} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-sm">→</button>
                    {!isCurrentMonth && (
                        <button onClick={() => setMonth(getCurrentMonth())} className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs transition-colors">Hôm nay</button>
                    )}
                </div>

                {/* Overall progress */}
                <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-slate-400">Tiến độ tháng</span>
                        <span className="text-white font-bold">{overallProgress}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500" style={{ width: `${overallProgress}%` }} />
                    </div>
                </div>
            </div>

            {/* ───────── Tab Navigation ───────── */}
            <div className="w-full max-w-5xl mb-6 flex gap-1 overflow-x-auto pb-1">
                {([
                    { key: 'goals', label: '🎯 Mục tiêu', shortLabel: '🎯' },
                    { key: 'habits', label: '🔁 Thói quen', shortLabel: '🔁' },
                    { key: 'weekly', label: '📅 Tuần', shortLabel: '📅' },
                    { key: 'daily', label: '✅ Task', shortLabel: '✅' },
                    { key: 'reflection', label: '💭 Reflection', shortLabel: '💭' },
                ] as const).map(tab => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.key
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                            : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                            }`}>
                        <span className="hidden md:inline">{tab.label}</span>
                        <span className="md:hidden">{tab.shortLabel}</span>
                    </button>
                ))}
            </div>

            {/* ───────── Tab Content ───────── */}
            <div className="w-full max-w-5xl">

                {/* ═══ TAB 1: Monthly Goals ═══ */}
                {activeTab === 'goals' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">🎯 Mục tiêu tháng</h2>
                            {plan.goals.length < 5 && (
                                <button onClick={addGoal} className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs transition-colors">+ Thêm</button>
                            )}
                        </div>
                        {plan.goals.map((goal, i) => (
                            <div key={i} className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: goal.color }} />
                                    <input
                                        value={goal.text}
                                        onChange={e => updateGoal(i, 'text', e.target.value)}
                                        placeholder={`Mục tiêu ${i + 1}...`}
                                        className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600 text-sm"
                                    />
                                    {plan.goals.length > 1 && (
                                        <button onClick={() => removeGoal(i)} className="text-slate-600 hover:text-red-400 text-xs transition-colors">✕</button>
                                    )}
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range" min="0" max="100" value={goal.progress}
                                        onChange={e => updateGoal(i, 'progress', Number(e.target.value))}
                                        className="flex-1 h-1.5 accent-blue-500 cursor-pointer"
                                        style={{ accentColor: goal.color }}
                                    />
                                    <span className="text-xs font-mono text-slate-400 w-10 text-right">{goal.progress}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ═══ TAB 2: Habit Tracker ═══ */}
                {activeTab === 'habits' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">🔁 Thói quen hàng ngày</h2>
                            <button onClick={addHabit} className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs transition-colors">+ Thêm</button>
                        </div>
                        <div className="overflow-x-auto rounded-xl border border-white/5">
                            <table className="w-full text-xs">
                                <thead>
                                    <tr className="bg-slate-900/80">
                                        <th className="text-left py-2 px-3 text-slate-400 font-medium sticky left-0 bg-slate-900/80 min-w-[140px]">Thói quen</th>
                                        {Array.from({ length: daysInMonth }, (_, i) => (
                                            <th key={i} className={`py-2 px-1 text-center font-medium min-w-[28px] ${isCurrentMonth && i + 1 === today.getDate() ? 'text-blue-400' : 'text-slate-500'}`}>
                                                {i + 1}
                                            </th>
                                        ))}
                                        <th className="py-2 px-2 text-center text-slate-400 font-medium min-w-[40px]">%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {plan.habits.map((habit, hi) => {
                                        const completed = habit.days.slice(0, daysInMonth).filter(Boolean).length
                                        const pct = Math.round((completed / daysInMonth) * 100)
                                        return (
                                            <tr key={hi} className="border-t border-white/5 hover:bg-slate-800/30">
                                                <td className="py-1.5 px-3 sticky left-0 bg-[#0a0a0a]">
                                                    <div className="flex items-center gap-1">
                                                        <input
                                                            value={habit.name}
                                                            onChange={e => updateHabitName(hi, e.target.value)}
                                                            placeholder="Thói quen..."
                                                            className="bg-transparent border-none outline-none text-slate-300 placeholder-slate-600 text-xs w-full"
                                                        />
                                                        {plan.habits.length > 1 && (
                                                            <button onClick={() => removeHabit(hi)} className="text-slate-700 hover:text-red-400 text-[10px] shrink-0">✕</button>
                                                        )}
                                                    </div>
                                                </td>
                                                {Array.from({ length: daysInMonth }, (_, di) => (
                                                    <td key={di} className="py-1 px-0.5 text-center">
                                                        <button
                                                            onClick={() => toggleHabitDay(hi, di)}
                                                            className={`w-5 h-5 rounded-[4px] text-[10px] transition-all ${habit.days[di]
                                                                ? 'bg-emerald-500/80 text-white shadow-sm shadow-emerald-500/30'
                                                                : 'bg-slate-800 hover:bg-slate-700 text-slate-700'
                                                                }`}
                                                        >
                                                            {habit.days[di] ? '✓' : ''}
                                                        </button>
                                                    </td>
                                                ))}
                                                <td className="py-1 px-2 text-center">
                                                    <span className={`font-mono font-bold ${pct >= 80 ? 'text-emerald-400' : pct >= 50 ? 'text-yellow-400' : 'text-slate-500'}`}>{pct}%</span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ═══ TAB 3: Weekly Goals ═══ */}
                {activeTab === 'weekly' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white">📅 Mục tiêu tuần</h2>
                        {/* Week tabs */}
                        <div className="flex gap-2 mb-4">
                            {plan.weeks.map((w) => (
                                <button key={w.weekNumber} onClick={() => setActiveWeek(w.weekNumber)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeWeek === w.weekNumber
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-800 text-slate-400 hover:text-white'
                                        }`}>
                                    Tuần {w.weekNumber}
                                </button>
                            ))}
                        </div>
                        {plan.weeks.filter(w => w.weekNumber === activeWeek).map((week, wi) => {
                            const weekIdx = plan.weeks.findIndex(w => w.weekNumber === activeWeek)
                            return (
                                <div key={wi} className="space-y-4">
                                    <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-slate-400">Mục tiêu tuần {week.weekNumber}</span>
                                            <button onClick={() => addWeekGoal(weekIdx)} className="text-xs text-blue-400 hover:text-blue-300">+ Thêm</button>
                                        </div>
                                        {week.goals.map((goal, gi) => (
                                            <input
                                                key={gi}
                                                value={goal}
                                                onChange={e => updateWeekGoal(weekIdx, gi, e.target.value)}
                                                placeholder={`Mục tiêu ${gi + 1}...`}
                                                className="w-full bg-slate-800/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50"
                                            />
                                        ))}
                                    </div>
                                    <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                                        <span className="text-sm font-medium text-slate-400 block mb-2">💭 Reflection tuần {week.weekNumber}</span>
                                        <textarea
                                            value={week.reflection}
                                            onChange={e => updateWeekReflection(weekIdx, e.target.value)}
                                            placeholder="Tuần này mình đã làm được gì? Cần cải thiện gì?..."
                                            rows={3}
                                            className="w-full bg-slate-800/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 resize-none"
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* ═══ TAB 4: Daily Tasks ═══ */}
                {activeTab === 'daily' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white">✅ Task hằng ngày</h2>
                        {/* Day picker */}
                        <div className="flex gap-1 overflow-x-auto pb-2">
                            {Array.from({ length: daysInMonth }, (_, i) => {
                                const day = i + 1
                                const dateStr = `${month}-${String(day).padStart(2, '0')}`
                                const entry = plan.dailyTasks.find(d => d.date === dateStr)
                                const hasTasks = entry && entry.tasks.length > 0
                                const allDone = hasTasks && entry.tasks.every(t => t.done)
                                return (
                                    <button key={day} onClick={() => setSelectedDay(day)}
                                        className={`w-9 h-9 rounded-lg text-xs font-medium transition-all shrink-0 relative ${selectedDay === day
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                            : isCurrentMonth && day === today.getDate()
                                                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                            }`}>
                                        {day}
                                        {hasTasks && (
                                            <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${allDone ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                        {/* Tasks list */}
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-400">
                                    Ngày {selectedDay}/{month.split('-')[1]}
                                </span>
                                <button onClick={addDailyTask} className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs transition-colors">+ Task</button>
                            </div>
                            {getDailyEntry().tasks.length === 0 && (
                                <p className="text-sm text-slate-600 text-center py-4">Chưa có task nào. Bấm + Task để thêm!</p>
                            )}
                            {getDailyEntry().tasks.map((task, ti) => (
                                <div key={ti} className="flex items-center gap-3 group">
                                    <button onClick={() => toggleTask(ti)}
                                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center text-[10px] transition-all shrink-0 ${task.done
                                            ? 'bg-emerald-500 border-emerald-500 text-white'
                                            : 'border-slate-600 hover:border-blue-500'
                                            }`}>
                                        {task.done && '✓'}
                                    </button>
                                    <input
                                        value={task.text}
                                        onChange={e => updateTaskText(ti, e.target.value)}
                                        placeholder="Việc cần làm..."
                                        className={`flex-1 bg-transparent border-none outline-none text-sm placeholder-slate-600 ${task.done ? 'line-through text-slate-500' : 'text-white'}`}
                                    />
                                    <button onClick={() => removeTask(ti)} className="text-slate-700 hover:text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-all">✕</button>
                                </div>
                            ))}
                        </div>
                        {/* Notes */}
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5">
                            <span className="text-sm font-medium text-slate-400 block mb-2">📝 Ghi chú</span>
                            <textarea
                                value={getDailyEntry().notes}
                                onChange={e => updateDailyNotes(e.target.value)}
                                placeholder="Ghi chú thêm cho ngày hôm nay..."
                                rows={2}
                                className="w-full bg-slate-800/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500/50 resize-none"
                            />
                        </div>
                    </div>
                )}

                {/* ═══ TAB 5: Month Reflection ═══ */}
                {activeTab === 'reflection' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-white">💭 Reflection cuối tháng</h2>
                        <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-emerald-400 block mb-2">✅ Điều mình đã làm tốt</label>
                                <textarea
                                    value={plan.monthReflection.wentWell}
                                    onChange={e => updateReflection('wentWell', e.target.value)}
                                    placeholder="Tháng này mình đã làm được gì tốt?..."
                                    rows={3}
                                    className="w-full bg-slate-800/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-emerald-500/50 resize-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-amber-400 block mb-2">🔧 Cần cải thiện</label>
                                <textarea
                                    value={plan.monthReflection.improve}
                                    onChange={e => updateReflection('improve', e.target.value)}
                                    placeholder="Điều gì mình có thể làm tốt hơn?..."
                                    rows={3}
                                    className="w-full bg-slate-800/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-amber-500/50 resize-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-pink-400 block mb-2">🙏 Biết ơn</label>
                                <textarea
                                    value={plan.monthReflection.grateful}
                                    onChange={e => updateReflection('grateful', e.target.value)}
                                    placeholder="Mình biết ơn điều gì trong tháng này?..."
                                    rows={3}
                                    className="w-full bg-slate-800/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-600 outline-none focus:border-pink-500/50 resize-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-blue-400 block mb-2">⭐ Đánh giá tháng (1-10)</label>
                                <div className="flex items-center gap-2">
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <button key={i} onClick={() => updateReflection('rating', i + 1)}
                                            className={`w-9 h-9 rounded-lg text-sm font-bold transition-all ${plan.monthReflection.rating >= i + 1
                                                ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/20'
                                                : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                                                }`}>
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ───────── Background effects ───────── */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/5 rounded-full blur-[100px]" />
            </div>
        </div>
    )
}
