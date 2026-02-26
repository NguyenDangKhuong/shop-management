'use client'

import { useThemeMode } from '@/contexts/ThemeContext'
import { useCallback, useEffect, useState } from 'react'

interface TopicModalProps {
    title: string
    emoji?: string
    color?: string
    summary: string
    children: React.ReactNode
}

export function TopicModal({ title, emoji = '📖', color = '#38bdf8', summary, children }: TopicModalProps) {
    const [open, setOpen] = useState(false)
    const { isDarkMode } = useThemeMode()

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

    return (
        <>
            {/* Clickable Card */}
            <button
                onClick={() => setOpen(true)}
                className="w-full text-left group flex items-start gap-3 p-3.5 rounded-xl bg-gray-100 dark:bg-slate-800/40 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-200 dark:hover:bg-slate-800/60 transition-all duration-200 cursor-pointer"
                style={{ boxShadow: open ? `0 0 20px ${color}20` : undefined }}
            >
                <span className="text-lg mt-0.5 shrink-0">{emoji}</span>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[color] transition flex items-center gap-2" style={{ color: open ? color : undefined }}>
                        {title}
                        <span className="text-xs text-gray-400 dark:text-slate-500 group-hover:text-gray-500 dark:group-hover:text-slate-400 transition">← click</span>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-slate-500 mt-0.5 line-clamp-1">{summary}</div>
                </div>
                <span className="text-gray-400 dark:text-slate-600 group-hover:text-gray-500 dark:group-hover:text-slate-400 transition text-sm mt-1 shrink-0">→</span>
            </button>

            {/* Modal Overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    onClick={close}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" />

                    {/* Modal Content */}
                    <div
                        className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl"
                        style={{ boxShadow: `0 0 60px ${color}15` }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div
                            className="sticky top-0 z-10 px-6 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between"
                            style={{ background: isDarkMode ? 'linear-gradient(135deg, #0f172a, #1e293b)' : 'linear-gradient(135deg, #f8fafc, #e2e8f0)' }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{emoji}</span>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
                            </div>
                            <button
                                onClick={close}
                                className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-slate-700/50 hover:bg-gray-300 dark:hover:bg-slate-600/50 flex items-center justify-center text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Gradient bar */}
                        <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />

                        {/* Scrollable Body */}
                        <div
                            className="overflow-y-auto p-6 space-y-4 bg-white dark:bg-[#0c1222]"
                            style={{ maxHeight: 'calc(85vh - 73px)' }}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
