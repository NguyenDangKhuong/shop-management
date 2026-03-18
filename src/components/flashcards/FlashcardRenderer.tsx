'use client'

import { useState, useCallback, useEffect, useRef, type ReactNode } from 'react'

// ── Shared hook for swipe/drag physics ──
export function useSwipeDrag(opts: {
    onSwipeRight: () => void
    onSwipeLeft: () => void
    threshold?: number
}) {
    const { onSwipeRight, onSwipeLeft, threshold = 120 } = opts
    const [dragX, setDragX] = useState(0)
    const [dragY, setDragY] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const [flyOut, setFlyOut] = useState<'left' | 'right' | null>(null)
    const startRef = useRef({ x: 0, y: 0 })

    const resetDrag = useCallback(() => { setDragX(0); setDragY(0); setFlyOut(null) }, [])

    const handleDragStart = useCallback((clientX: number, clientY: number) => {
        setIsDragging(true)
        startRef.current = { x: clientX, y: clientY }
    }, [])

    const handleDragMove = useCallback((clientX: number, clientY: number) => {
        setDragX(clientX - startRef.current.x)
        setDragY(clientY - startRef.current.y)
    }, [])

    const handleDragEnd = useCallback(() => {
        setIsDragging(false)
        if (dragX > threshold) {
            setFlyOut('right')
            setTimeout(() => { onSwipeRight(); resetDrag() }, 300)
        } else if (dragX < -threshold) {
            setFlyOut('left')
            setTimeout(() => { onSwipeLeft(); resetDrag() }, 300)
        } else {
            setDragX(0)
            setDragY(0)
        }
    }, [dragX, threshold, onSwipeRight, onSwipeLeft, resetDrag])

    // Card transform style
    const rotation = flyOut ? (flyOut === 'right' ? 30 : -30) : dragX * 0.1
    const translateX = flyOut ? (flyOut === 'right' ? 600 : -600) : dragX
    const translateY = flyOut ? -100 : dragY * 0.3
    const rightOpacity = Math.min(Math.max(dragX / threshold, 0), 1)
    const leftOpacity = Math.min(Math.max(-dragX / threshold, 0), 1)

    const cardStyle = {
        transform: `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`,
        transition: isDragging ? 'none' : flyOut ? 'transform 0.3s ease-out, opacity 0.3s' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        opacity: flyOut ? 0 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
    }

    const dragHandlers = {
        onMouseDown: (e: React.MouseEvent) => handleDragStart(e.clientX, e.clientY),
        onMouseMove: isDragging ? (e: React.MouseEvent) => handleDragMove(e.clientX, e.clientY) : undefined,
        onMouseUp: () => handleDragEnd(),
        onMouseLeave: isDragging ? () => handleDragEnd() : undefined,
        onTouchStart: (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY),
        onTouchMove: (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY),
        onTouchEnd: () => handleDragEnd(),
    }

    return { dragX, dragY, isDragging, flyOut, cardStyle, dragHandlers, rightOpacity, leftOpacity, resetDrag }
}

// ── Progress bar ──
export function FlashcardProgressBar({ known, total, current, label }: {
    known: number; total: number; current?: number; label?: string
}) {
    return (
        <div className="mb-6">
            <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1">
                <span>🧠 Đã thuộc: {known}/{total}</span>
                {current !== undefined && <span>{total > 0 ? current + 1 : 0} / {total}</span>}
                {label && <span>{label}</span>}
            </div>
            <div className="h-2 rounded-full bg-[var(--bg-tag)] overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                        width: `${total > 0 ? (known / total) * 100 : 0}%`,
                        background: 'linear-gradient(90deg, #4ade80, #22d3ee, #818cf8)',
                    }}
                />
            </div>
        </div>
    )
}

// ── Swipe indicators (green/red glow) ──
export function SwipeIndicators({ rightOpacity, leftOpacity }: { rightOpacity: number; leftOpacity: number }) {
    return (
        <>
            <div className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                style={{ boxShadow: `inset 0 0 60px rgba(74, 222, 128, ${rightOpacity * 0.5})`, opacity: rightOpacity }}>
                <div className="absolute top-6 left-6 text-green-400 font-bold text-xl" style={{ opacity: rightOpacity }}>
                    ✅ THUỘC
                </div>
            </div>
            <div className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                style={{ boxShadow: `inset 0 0 60px rgba(239, 68, 68, ${leftOpacity * 0.5})`, opacity: leftOpacity }}>
                <div className="absolute top-6 right-6 text-red-400 font-bold text-xl" style={{ opacity: leftOpacity }}>
                    ❌ SKIP
                </div>
            </div>
        </>
    )
}

// ── Card stack background ──
export function CardStackBg({ count }: { count: number }) {
    return (
        <>
            {count > 2 && (
                <div className="absolute inset-0 rounded-2xl"
                    style={{ transform: 'scale(0.92) translateY(16px)', background: 'var(--bg-card)', border: '1px solid var(--border-primary)', opacity: 0.4 }} />
            )}
            {count > 1 && (
                <div className="absolute inset-0 rounded-2xl"
                    style={{ transform: 'scale(0.96) translateY(8px)', background: 'var(--bg-card)', border: '1px solid var(--border-primary)', opacity: 0.6 }} />
            )}
        </>
    )
}

// ── Control buttons (Tinder-style) ──
export function FlashcardControls({ onLeft, onRight, onFlip, extraButtons }: {
    onLeft: () => void; onRight: () => void; onFlip: () => void
    extraButtons?: ReactNode
}) {
    return (
        <div className="flex items-center justify-center gap-4">
            <button
                onClick={(e) => { e.stopPropagation(); onLeft() }}
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all hover:scale-110 active:scale-95"
                style={{ background: 'rgba(239, 68, 68, 0.15)', border: '2px solid rgba(239, 68, 68, 0.4)' }}
                title="Skip (←)"
            >❌</button>

            <button
                onClick={(e) => { e.stopPropagation(); onFlip() }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110 active:scale-95"
                style={{ background: 'rgba(56, 189, 248, 0.15)', border: '2px solid rgba(56, 189, 248, 0.4)' }}
                title="Lật thẻ (Space)"
            >🔄</button>

            {extraButtons}

            <button
                onClick={(e) => { e.stopPropagation(); onRight() }}
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all hover:scale-110 active:scale-95"
                style={{ background: 'rgba(74, 222, 128, 0.15)', border: '2px solid rgba(74, 222, 128, 0.4)' }}
                title="Đã thuộc (→)"
            >✅</button>
        </div>
    )
}

// ── Keyboard shortcuts ──
export function useFlashcardKeys(opts: {
    onFlip: () => void
    onSwipeRight: () => void
    onSwipeLeft: () => void
    onShuffle?: () => void
    onToggleKnown?: () => void
}) {
    const { onFlip, onSwipeRight, onSwipeLeft, onShuffle, onToggleKnown } = opts
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); onFlip() }
            if (e.key === 'ArrowRight' || e.key === 'l') onSwipeRight()
            if (e.key === 'ArrowLeft' || e.key === 'h') onSwipeLeft()
            if (e.key === 'k' && onToggleKnown) onToggleKnown()
            if (e.key === 's' && onShuffle) onShuffle()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onFlip, onSwipeRight, onSwipeLeft, onShuffle, onToggleKnown])
}

// ── Keyboard hints ──
export function KeyboardHints({ showShuffle = false }: { showShuffle?: boolean }) {
    return (
        <div className="mt-6 text-center">
            <p className="text-xs text-[var(--text-muted)]">
                ⌨️ <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-tag)] border border-[var(--border-primary)] font-mono text-[10px]">Space</kbd> Lật
                {' · '}
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-tag)] border border-[var(--border-primary)] font-mono text-[10px]">←</kbd> Skip
                {' · '}
                <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-tag)] border border-[var(--border-primary)] font-mono text-[10px]">→</kbd> Thuộc
                {showShuffle && (
                    <>
                        {' · '}
                        <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-tag)] border border-[var(--border-primary)] font-mono text-[10px]">S</kbd> Trộn
                    </>
                )}
            </p>
        </div>
    )
}

// ── Flip card wrapper ──
export function FlipCard({ isFlipped, front, back, height = '340px' }: {
    isFlipped: boolean; front: ReactNode; back: ReactNode; height?: string
}) {
    return (
        <div
            className="relative w-full transition-transform duration-500"
            style={{
                transformStyle: 'preserve-3d',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                minHeight: height,
            }}
        >
            <div className="absolute inset-0 rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
                style={{
                    backfaceVisibility: 'hidden',
                    background: 'linear-gradient(135deg, var(--bg-card), var(--bg-surface))',
                    border: '1px solid var(--border-primary)',
                    boxShadow: 'var(--shadow-xl)',
                }}>
                {front}
            </div>
            <div className="absolute inset-0 rounded-2xl p-6 sm:p-8 overflow-y-auto"
                style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, var(--bg-card), var(--bg-surface))',
                    border: '1px solid var(--border-primary)',
                    boxShadow: 'var(--shadow-xl)',
                }}>
                {back}
            </div>
        </div>
    )
}

// ── Progress sync hook ──
export function useProgressSync(category: 'algo' | 'interview' | 'vocab') {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [initialKnown, setInitialKnown] = useState<string[] | null>(null)

    // Load progress on mount
    useEffect(() => {
        const loadProgress = async () => {
            try {
                const res = await fetch('/api/flashcards/progress')
                if (res.ok) {
                    const data = await res.json()
                    setIsLoggedIn(true)
                    const fieldMap = { algo: 'algoKnown', interview: 'interviewKnown', vocab: 'vocabKnown' }
                    setInitialKnown(data[fieldMap[category]] || [])
                }
            } catch {
                // Not logged in or error — use local state
            }
        }
        loadProgress()
    }, [category])

    // Save progress change
    const saveProgress = useCallback(async (cardId: string, known: boolean) => {
        if (!isLoggedIn) return
        try {
            await fetch('/api/flashcards/progress', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category, cardId, known }),
            })
        } catch {
            console.error('Failed to save progress')
        }
    }, [category, isLoggedIn])

    return { isLoggedIn, initialKnown, saveProgress }
}
