'use client'

import { useState, useEffect, useCallback } from 'react'

interface TopicModalProps {
    title: string
    emoji?: string
    color?: string
    summary: string
    children: React.ReactNode
}

export function TopicModal({ title, emoji = '📖', color = '#38bdf8', summary, children }: TopicModalProps) {
    const [open, setOpen] = useState(false)

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
                className="w-full text-left group flex items-start gap-3 p-3.5 rounded-xl bg-slate-800/40 border border-white/10 hover:border-white/20 hover:bg-slate-800/60 transition-all duration-200 cursor-pointer"
                style={{ boxShadow: open ? `0 0 20px ${color}20` : undefined }}
            >
                <span className="text-lg mt-0.5 shrink-0">{emoji}</span>
                <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white group-hover:text-[color] transition flex items-center gap-2" style={{ color: open ? color : undefined }}>
                        {title}
                        <span className="text-xs text-slate-500 group-hover:text-slate-400 transition">← click</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{summary}</div>
                </div>
                <span className="text-slate-600 group-hover:text-slate-400 transition text-sm mt-1 shrink-0">→</span>
            </button>

            {/* Modal Overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                    onClick={close}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                    {/* Modal Content */}
                    <div
                        className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                        style={{ boxShadow: `0 0 60px ${color}15` }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div
                            className="sticky top-0 z-10 px-6 py-4 border-b border-white/10 flex items-center justify-between"
                            style={{ background: `linear-gradient(135deg, #0f172a, #1e293b)` }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-xl">{emoji}</span>
                                <h3 className="text-lg font-bold text-white">{title}</h3>
                            </div>
                            <button
                                onClick={close}
                                className="w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 flex items-center justify-center text-slate-400 hover:text-white transition"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Gradient bar */}
                        <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />

                        {/* Scrollable Body */}
                        <div
                            className="overflow-y-auto p-6 space-y-4"
                            style={{ maxHeight: 'calc(85vh - 73px)', background: '#0c1222' }}
                        >
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
