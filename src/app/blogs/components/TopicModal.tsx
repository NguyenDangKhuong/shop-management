'use client'

import { useThemeMode } from '@/contexts/ThemeContext'
import { useCallback, useEffect, useState } from 'react'
import { useRoadmapProgress } from './RoadmapProgressProvider'

interface TopicModalProps {
    title: string
    emoji?: string
    color?: string
    summary: string
    concept?: string
    children: React.ReactNode
}

export function TopicModal({ title, emoji = '📖', color = '#38bdf8', summary, concept, children }: TopicModalProps) {
    const [open, setOpen] = useState(false)
    const { isDarkMode } = useThemeMode()
    const { learnedTopics, toggleLearned: contextToggle, isLoading } = useRoadmapProgress()
    const [mounted, setMounted] = useState(false)

    const isLearned = learnedTopics.has(title)

    useEffect(() => {
        setMounted(true)
    }, [])

    const close = useCallback(() => setOpen(false), [])

    useEffect(() => {
        if (!open) return
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleKey)
        return () => {
            document.body.style.overflow = ''
            window.removeEventListener('keydown', handleKey)
        }
    }, [open, close])

    const toggleLearned = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation()
        contextToggle(title)
    }

    return (
        <>
            {/* Clickable Card */}
            <div className="relative group">
                <button
                    onClick={() => setOpen(true)}
                    className={`w-full text-left flex items-start gap-3 p-3.5 pl-4 pr-12 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isLearned 
                            ? 'bg-emerald-500/5 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]' 
                            : 'bg-[var(--bg-tag)] border-[var(--border-primary)]'
                    }`}
                    style={{ 
                        boxShadow: open ? `0 0 20px ${color}20` : undefined,
                        borderColor: isLearned ? undefined : (open ? color : undefined)
                    }}
                >
                    <span className="text-lg mt-0.5 shrink-0 opacity-90">{emoji}</span>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold transition flex items-center gap-2" style={{ color: isLearned ? '#34d399' : (open ? color : 'var(--text-primary)') }}>
                            {title}
                        </div>
                        <div className={`text-xs mt-1 line-clamp-1 ${isLearned ? 'text-emerald-600/70 dark:text-emerald-400/60' : 'text-[var(--text-muted)]'}`}>
                            {summary}
                        </div>
                    </div>
                </button>
                
                {/* Checkmark Button */}
                {mounted && !isLoading && (
                    <button 
                        onClick={toggleLearned}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                            isLearned 
                                ? 'text-emerald-500 bg-emerald-500/10 hover:bg-emerald-500/20 scale-110' 
                                : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/10 opacity-0 group-hover:opacity-100 scale-90 hover:scale-100'
                        }`}
                        title={isLearned ? "Đã thuộc (Bấm để xoá)" : "Đánh dấu đã thuộc"}
                        aria-label="Mark as learned"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isLearned ? 3 : 2} d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Modal Overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    onClick={close}
                >
                    {/* Backdrop */}
                    <div className={`absolute inset-0 backdrop-blur-sm transition-opacity ${isDarkMode ? 'bg-black/70' : 'bg-black/50'}`} />

                    {/* Modal Content */}
                    <div
                        className={`relative w-full max-w-2xl max-h-[85vh] rounded-2xl overflow-hidden border shadow-2xl flex flex-col ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}
                        style={{ boxShadow: `0 0 60px ${color}15` }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div
                            className={`px-6 py-4 border-b flex items-center justify-between shrink-0 ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}
                            style={{ background: isDarkMode ? 'linear-gradient(135deg, #0f172a, #1e293b)' : 'linear-gradient(135deg, #f8fafc, #e2e8f0)' }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl drop-shadow-sm">{emoji}</span>
                                <h3 className={`text-lg font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Mark as learned button inside modal */}
                                <button
                                    onClick={(e) => toggleLearned(e)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                                        isLearned 
                                            ? 'bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30' 
                                            : isDarkMode 
                                                ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white' 
                                                : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm border border-slate-200'
                                    }`}
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isLearned ? 3 : 2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {isLearned ? 'Đã thuộc' : 'Đánh dấu đã thuộc'}
                                </button>
                                <button
                                    onClick={close}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isDarkMode ? 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-400 hover:text-white border border-white/5' : 'bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-900 shadow-sm border border-gray-200'}`}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Gradient bar */}
                        <div className="h-0.5 w-full shrink-0" style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />

                        {/* Scrollable Body */}
                        <div
                            className="overflow-y-auto p-6 space-y-4 grow"
                            style={{ background: isDarkMode ? '#0c1222' : '#ffffff' }}
                        >
                            {concept && (
                                <div
                                    className={`p-4 rounded-xl border text-sm leading-relaxed ${isDarkMode ? 'border-white/10 bg-white/[0.03]' : 'border-gray-200 bg-gray-50'}`}
                                    style={{ borderLeftWidth: 3, borderLeftColor: color }}
                                >
                                    <div className={`text-[10px] uppercase tracking-widest font-bold mb-1.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>💡 Concept</div>
                                    <div className={isDarkMode ? 'text-slate-200' : 'text-slate-700'}>{concept}</div>
                                </div>
                            )}
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
