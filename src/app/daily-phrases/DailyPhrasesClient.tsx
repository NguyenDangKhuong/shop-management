'use client'

/**
 * ========================================================================
 * DAILY PHRASES CLIENT — Ôn cụm tiếng Anh với Spaced Repetition
 * ========================================================================
 *
 * UI giống vocabulary list trong /translate:
 * - Dark theme, cards: 🇬🇧 phrase → 🇻🇳 meaning
 * - Click card → modal chi tiết (example + tip)
 * - 3 nút review: 😣 Hard / 👍 Good / 🔥 Easy
 * - Filter tabs: All / Due Now / Standup / Dev / Corporate / General
 */

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

type Category = 'standup' | 'dev' | 'corporate' | 'general'
type Rating = 'hard' | 'good' | 'easy'
type FilterTab = 'all' | 'due' | Category

interface Phrase {
    _id: string
    category: Category
    phrase: string
    meaning: string
    example?: string
    tip?: string
    interval: number
    nextReviewAt: string
    easeFactor: number
    reviewCount: number
    lastReviewedAt: string | null
}

const categoryConfig: Record<Category, { emoji: string; label: string; color: string; border: string; bg: string }> = {
    standup: { emoji: '🗣️', label: 'Standup', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10' },
    dev: { emoji: '💻', label: 'Dev', color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
    corporate: { emoji: '🏦', label: 'Corporate', color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' },
    general: { emoji: '🇦🇺', label: 'General', color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10' },
}

const tabs: { key: FilterTab; label: string; emoji: string }[] = [
    { key: 'all', label: 'All', emoji: '📋' },
    { key: 'due', label: 'Due Now', emoji: '🔴' },
    { key: 'standup', label: 'Standup', emoji: '🗣️' },
    { key: 'dev', label: 'Dev', emoji: '💻' },
    { key: 'corporate', label: 'Corporate', emoji: '🏦' },
    { key: 'general', label: 'General', emoji: '🇦🇺' },
]

export default function DailyPhrasesClient() {
    const [phrases, setPhrases] = useState<Phrase[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<FilterTab>('due')
    const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null)
    const [reviewing, setReviewing] = useState(false)
    const [reviewFeedback, setReviewFeedback] = useState<string | null>(null)
    const [dueCount, setDueCount] = useState(0)

    // ─── Fetch phrases ────────────────────────────────────────────
    const fetchPhrases = useCallback(async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams()
            if (activeTab === 'due') {
                params.set('due', 'true')
            } else if (activeTab !== 'all') {
                params.set('category', activeTab)
            }
            const res = await fetch(`/api/daily-phrases?${params}`)
            const data = await res.json()
            if (data.items) {
                setPhrases(data.items)
                setDueCount(data.dueCount || 0)
            }
        } catch {
            console.error('Failed to fetch phrases')
        } finally {
            setLoading(false)
        }
    }, [activeTab])

    useEffect(() => {
        fetchPhrases()
    }, [fetchPhrases])

    // ─── Review phrase (SM-2) ──────────────────────────────────────
    const reviewPhrase = async (id: string, rating: Rating) => {
        if (reviewing) return
        setReviewing(true)
        try {
            const res = await fetch('/api/daily-phrases', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, rating }),
            })
            const data = await res.json()
            if (data.success) {
                // Update phrase in state
                setPhrases((prev) =>
                    prev.map((p) =>
                        p._id === id
                            ? {
                                ...p,
                                interval: data.phrase.interval,
                                nextReviewAt: data.phrase.nextReviewAt,
                                easeFactor: data.phrase.easeFactor,
                                reviewCount: data.phrase.reviewCount,
                            }
                            : p
                    )
                )
                // Show feedback
                const feedbackMap: Record<Rating, string> = {
                    hard: '😣 See you tomorrow!',
                    good: `👍 Next in ${data.phrase.interval} days`,
                    easy: `🔥 Next in ${data.phrase.interval} days`,
                }
                setReviewFeedback(feedbackMap[rating])
                setTimeout(() => {
                    setReviewFeedback(null)
                    setSelectedPhrase(null)
                    // Re-fetch to update due count
                    fetchPhrases()
                }, 1200)
            }
        } catch {
            console.error('Failed to review phrase')
        } finally {
            setReviewing(false)
        }
    }

    // ─── Helpers ───────────────────────────────────────────────────
    const isDue = (phrase: Phrase) => new Date(phrase.nextReviewAt) <= new Date()
    const formatNextReview = (phrase: Phrase) => {
        if (isDue(phrase)) return 'Due now'
        const days = Math.ceil(
            (new Date(phrase.nextReviewAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
        return days === 1 ? 'Tomorrow' : `In ${days} days`
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex flex-col items-center px-4 py-8 md:py-12">
            {/* ───────── Header ───────── */}
            <div className="w-full max-w-5xl mb-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">📚</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">Daily English</h1>
                    </div>
                    <Link
                        href="/translate"
                        className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 border border-white/10 text-slate-400 hover:text-white hover:border-blue-500/50 transition-all"
                    >
                        🌐 Translate
                    </Link>
                </div>
                <p className="text-slate-400 text-sm">
                    Standup phrases & FE dev jargon • Spaced Repetition
                </p>

                {/* Stats bar */}
                <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5">
                        <span className="text-red-400 text-xs">●</span>
                        <span className="text-xs text-slate-400">
                            <span className="text-white font-medium">{dueCount}</span> due
                        </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5">
                        <span className="text-xs text-slate-400">
                            <span className="text-white font-medium">{phrases.length}</span> phrases
                        </span>
                    </div>
                </div>
            </div>

            {/* ───────── Filter Tabs ───────── */}
            <div className="w-full max-w-5xl flex items-center gap-2 mb-6 overflow-x-auto pb-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeTab === tab.key
                            ? 'bg-blue-600/20 border border-blue-500/40 text-blue-400'
                            : 'bg-slate-900/60 border border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                            }`}
                    >
                        {tab.emoji} {tab.label}
                        {tab.key === 'due' && dueCount > 0 && (
                            <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px]">
                                {dueCount}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* ───────── Phrase List ───────── */}
            <div className="w-full max-w-5xl">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <span className="inline-block w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                        <span className="ml-3 text-slate-400 text-sm">Loading phrases...</span>
                    </div>
                ) : phrases.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="text-4xl block mb-3">
                            {activeTab === 'due' ? '🎉' : '📭'}
                        </span>
                        <p className="text-slate-400 text-sm">
                            {activeTab === 'due'
                                ? 'All caught up! No phrases due for review.'
                                : 'No phrases found in this category.'}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {phrases.map((phrase) => {
                            const config = categoryConfig[phrase.category]
                            const due = isDue(phrase)
                            return (
                                <div
                                    key={phrase._id}
                                    onClick={() => setSelectedPhrase(phrase)}
                                    className={`group grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/60 border transition-colors cursor-pointer ${due
                                        ? 'border-blue-500/20 hover:border-blue-500/40'
                                        : 'border-white/5 hover:border-cyan-500/30'
                                        }`}
                                >
                                    {/* English phrase */}
                                    <div className="min-w-0">
                                        <span className="text-xs text-slate-500 mr-1">🇬🇧</span>
                                        <span className="text-sm text-slate-300 break-words">{phrase.phrase}</span>
                                        <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${config.bg} ${config.color} border ${config.border}`}>
                                            {config.label}
                                        </span>
                                    </div>

                                    {/* Arrow */}
                                    <span className="text-slate-600 text-xs shrink-0">→</span>

                                    {/* Vietnamese meaning */}
                                    <div className="min-w-0">
                                        <span className="text-xs text-slate-500 mr-1">🇻🇳</span>
                                        <span className="text-sm text-white break-words">{phrase.meaning}</span>
                                    </div>

                                    {/* Review status */}
                                    <div className="shrink-0 text-right">
                                        {due ? (
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/25">
                                                Due
                                            </span>
                                        ) : (
                                            <span className="text-[10px] text-slate-600">
                                                {formatNextReview(phrase)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* ───────── Background effects ───────── */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[100px]" />
            </div>

            {/* ───────── Phrase Detail + Review Modal ───────── */}
            {selectedPhrase && (() => {
                const phrase = selectedPhrase
                const config = categoryConfig[phrase.category]
                const due = isDue(phrase)
                return (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => !reviewing && setSelectedPhrase(null)}
                    >
                        <div
                            className="w-full max-w-md rounded-2xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="px-6 pt-5 pb-3 border-b border-white/5">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="text-2xl shrink-0">🇬🇧</span>
                                        <h3 className="text-lg font-semibold text-white truncate">{phrase.phrase}</h3>
                                    </div>
                                    <button
                                        onClick={() => setSelectedPhrase(null)}
                                        className="text-slate-500 hover:text-white transition-colors text-lg shrink-0 ml-2"
                                    >✕</button>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color} border ${config.border} font-medium`}>
                                        {config.emoji} {config.label}
                                    </span>
                                    {due ? (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/25">
                                            Due now
                                        </span>
                                    ) : (
                                        <span className="text-xs text-slate-600">
                                            📅 {formatNextReview(phrase)}
                                        </span>
                                    )}
                                    {phrase.reviewCount > 0 && (
                                        <span className="text-xs text-slate-600">
                                            🔄 {phrase.reviewCount}x reviewed
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Body */}
                            <div className="px-6 py-5 space-y-4">
                                {/* Vietnamese meaning */}
                                <div>
                                    <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">Nghĩa</div>
                                    <div className="text-base text-white">🇻🇳 {phrase.meaning}</div>
                                </div>

                                {/* Example */}
                                {phrase.example && (
                                    <div className="p-3 rounded-xl bg-slate-800/50 border border-white/5">
                                        <div className="text-xs text-slate-500 mb-2 uppercase tracking-wider">📝 Ví dụ</div>
                                        <div className="text-sm text-slate-300 italic">&ldquo;{phrase.example}&rdquo;</div>
                                    </div>
                                )}

                                {/* Tip */}
                                {phrase.tip && (
                                    <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                                        <div className="text-xs text-amber-400/80 mb-1">💡 Tip</div>
                                        <div className="text-sm text-slate-300">{phrase.tip}</div>
                                    </div>
                                )}

                                {/* Review feedback */}
                                {reviewFeedback && (
                                    <div className="text-center py-2 px-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium animate-pulse">
                                        {reviewFeedback}
                                    </div>
                                )}

                                {/* ── Review Buttons ── */}
                                {!reviewFeedback && (
                                    <div className="pt-2">
                                        <div className="text-xs text-slate-500 mb-3 text-center">Bạn nhớ cụm này không?</div>
                                        <div className="grid grid-cols-3 gap-2">
                                            <button
                                                onClick={() => reviewPhrase(phrase._id, 'hard')}
                                                disabled={reviewing}
                                                className="py-2.5 px-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition-all text-sm font-medium disabled:opacity-50"
                                            >
                                                😣 Hard
                                                <div className="text-[10px] text-red-400/60 mt-0.5">1 day</div>
                                            </button>
                                            <button
                                                onClick={() => reviewPhrase(phrase._id, 'good')}
                                                disabled={reviewing}
                                                className="py-2.5 px-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/30 transition-all text-sm font-medium disabled:opacity-50"
                                            >
                                                👍 Good
                                                <div className="text-[10px] text-blue-400/60 mt-0.5">
                                                    {phrase.reviewCount === 0 ? '1 day' : `${Math.ceil(phrase.interval * phrase.easeFactor)}d`}
                                                </div>
                                            </button>
                                            <button
                                                onClick={() => reviewPhrase(phrase._id, 'easy')}
                                                disabled={reviewing}
                                                className="py-2.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/30 transition-all text-sm font-medium disabled:opacity-50"
                                            >
                                                🔥 Easy
                                                <div className="text-[10px] text-emerald-400/60 mt-0.5">
                                                    {phrase.reviewCount === 0 ? '3d' : `${Math.ceil(phrase.interval * phrase.easeFactor * 1.5)}d`}
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })()}
        </div>
    )
}
