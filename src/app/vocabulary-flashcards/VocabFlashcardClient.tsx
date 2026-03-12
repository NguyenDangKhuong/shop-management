'use client'

/**
 * ========================================================================
 * VOCABULARY FLASHCARDS — Học từ vựng kiểu Tinder
 * ========================================================================
 *
 * Tính năng:
 * 1. Swipe phải (→) = Đã thuộc  ✅
 * 2. Swipe trái (←) = Chưa thuộc ❌ → quay lại stack
 * 3. Click thẻ = Lật xem nghĩa
 * 4. Hiệu ứng rotation khi kéo (giống Tinder)
 * 5. Progress bar: đã thuộc / tổng
 *
 * Flow:
 *   Load page → GET /api/vocabulary → render stack flashcards
 *   Kéo phải → known (remove from stack)
 *   Kéo trái → unknown (move to bottom of stack)
 *   Click → flip card (xem nghĩa)
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'

type Lang = 'vi' | 'en'

interface VocabItem {
    _id: string
    original: string
    translated: string
    from: Lang
    to: Lang
    createdAt: string
}

export default function VocabFlashcardClient() {
    const [allItems, setAllItems] = useState<VocabItem[]>([])
    const [stack, setStack] = useState<VocabItem[]>([])
    const [knownIds, setKnownIds] = useState<Set<string>>(new Set())
    const [isFlipped, setIsFlipped] = useState(false)
    const [loading, setLoading] = useState(true)

    // ── Drag state ──
    const [dragX, setDragX] = useState(0)
    const [dragY, setDragY] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    const startRef = useRef({ x: 0, y: 0 })
    const cardRef = useRef<HTMLDivElement>(null)

    const langFlag: Record<Lang, string> = { vi: '🇻🇳', en: '🇬🇧' }

    // ── Fetch vocabulary ──
    useEffect(() => {
        const fetchVocab = async () => {
            try {
                const res = await fetch('/api/vocabulary')
                const data = await res.json()
                if (data.items) {
                    setAllItems(data.items)
                    setStack(data.items)
                }
            } catch {
                console.error('Failed to fetch vocabulary')
            } finally {
                setLoading(false)
            }
        }
        fetchVocab()
    }, [])

    const currentCard = stack[0]
    const progress = knownIds.size
    const total = allItems.length

    // ── Swipe handlers ──
    const handleSwipeRight = useCallback(() => {
        // Đã thuộc → loại khỏi stack
        if (!currentCard) return
        setKnownIds(prev => new Set(prev).add(currentCard._id))
        setStack(prev => prev.slice(1))
        setIsFlipped(false)
        setDragX(0)
        setDragY(0)
    }, [currentCard])

    const handleSwipeLeft = useCallback(() => {
        // Chưa thuộc → đưa xuống cuối stack để ôn lại
        if (!currentCard) return
        setStack(prev => [...prev.slice(1), prev[0]])
        setIsFlipped(false)
        setDragX(0)
        setDragY(0)
    }, [currentCard])

    // ── Mouse/Touch drag ──
    const handleDragStart = (clientX: number, clientY: number) => {
        setIsDragging(true)
        startRef.current = { x: clientX, y: clientY }
    }

    const handleDragMove = (clientX: number, clientY: number) => {
        if (!isDragging) return
        const dx = clientX - startRef.current.x
        const dy = clientY - startRef.current.y
        setDragX(dx)
        setDragY(dy)
    }

    const handleDragEnd = () => {
        setIsDragging(false)
        const threshold = 120  // px cần kéo để trigger swipe
        if (dragX > threshold) {
            handleSwipeRight()
        } else if (dragX < -threshold) {
            handleSwipeLeft()
        } else {
            // Snap back khi kéo không đủ xa
            setDragX(0)
            setDragY(0)
        }
    }

    // Mouse events
    const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX, e.clientY)
    const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX, e.clientY)
    const onMouseUp = () => handleDragEnd()

    // Touch events
    const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)
    const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)
    const onTouchEnd = () => handleDragEnd()

    // ── Card style — Tinder rotation effect ──
    const rotation = dragX * 0.1  // Xoay nhẹ theo hướng kéo
    const cardStyle = {
        transform: `translate(${dragX}px, ${dragY * 0.3}px) rotate(${rotation}deg)`,
        transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: isDragging ? 'grabbing' : 'grab',
    }

    // ── Swipe indicator opacity (green/red glow khi kéo) ──
    const rightOpacity = Math.min(Math.max(dragX / 120, 0), 1)
    const leftOpacity = Math.min(Math.max(-dragX / 120, 0), 1)

    // ── Keyboard support ──
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setIsFlipped(f => !f) }
            if (e.key === 'ArrowRight' || e.key === 'l') handleSwipeRight()
            if (e.key === 'ArrowLeft' || e.key === 'h') handleSwipeLeft()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [handleSwipeRight, handleSwipeLeft])

    // ── Reset ──
    const resetAll = () => {
        setStack([...allItems])
        setKnownIds(new Set())
        setIsFlipped(false)
    }

    // ── Loading ──
    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-slate-400 animate-pulse">Loading vocabulary...</div>
            </div>
        )
    }

    // ── Empty state ──
    if (allItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-4">
                <span className="text-6xl mb-4">📚</span>
                <h1 className="text-2xl font-bold text-white mb-2">Chưa có từ vựng nào!</h1>
                <p className="text-slate-400 mb-6">Hãy lưu từ vựng từ trang Translate trước nhé.</p>
                <Link href="/translate" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all">
                    → Đi đến Translate
                </Link>
            </div>
        )
    }

    // ── Done state ──
    if (stack.length === 0) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-4">
                <span className="text-6xl mb-4">🎉</span>
                <h1 className="text-2xl font-bold text-white mb-2">Xuất sắc! Đã thuộc hết!</h1>
                <p className="text-slate-400 mb-6">{progress}/{total} từ vựng đã thuộc</p>
                <div className="flex gap-3">
                    <button onClick={resetAll} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all">
                        🔄 Ôn lại
                    </button>
                    <Link href="/translate" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all border border-white/10">
                        ← Về Translate
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex flex-col items-center px-4 py-8 md:py-12">
            {/* Header */}
            <div className="w-full max-w-lg mb-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <Link href="/translate" className="text-slate-500 hover:text-white transition-colors text-sm">← Translate</Link>
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    🔖 Vocabulary Flashcards
                </h1>
                <p className="text-sm text-slate-500 mt-1">Swipe phải = Thuộc ✅ · Swipe trái = Chưa thuộc ❌</p>
            </div>

            {/* Progress */}
            <div className="w-full max-w-lg mb-8">
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>🧠 Đã thuộc: {progress}/{total}</span>
                    <span>Còn lại: {stack.length}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${(progress / total) * 100}%`,
                            background: 'linear-gradient(90deg, #4ade80, #22d3ee, #818cf8)',
                        }}
                    />
                </div>
            </div>

            {/* Card Stack */}
            <div className="relative w-full max-w-lg" style={{ height: '340px' }}>
                {/* Background cards (stack effect) */}
                {stack.length > 2 && (
                    <div className="absolute inset-0 rounded-2xl bg-slate-900/40 border border-white/5"
                        style={{ transform: 'scale(0.92) translateY(16px)' }} />
                )}
                {stack.length > 1 && (
                    <div className="absolute inset-0 rounded-2xl bg-slate-900/60 border border-white/5"
                        style={{ transform: 'scale(0.96) translateY(8px)' }} />
                )}

                {/* Active card — draggable */}
                <div
                    ref={cardRef}
                    className="absolute inset-0 select-none"
                    style={cardStyle}
                    onMouseDown={onMouseDown}
                    onMouseMove={isDragging ? onMouseMove : undefined}
                    onMouseUp={onMouseUp}
                    onMouseLeave={isDragging ? onMouseUp : undefined}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onClick={() => { if (!isDragging || (Math.abs(dragX) < 5 && Math.abs(dragY) < 5)) setIsFlipped(f => !f) }}
                >
                    {/* Swipe indicators — green/red glow */}
                    <div className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-opacity"
                        style={{ boxShadow: `inset 0 0 60px rgba(74, 222, 128, ${rightOpacity * 0.5})`, opacity: rightOpacity }}>
                        <div className="absolute top-6 left-6 text-green-400 font-bold text-xl" style={{ opacity: rightOpacity }}>
                            ✅ THUỘC
                        </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl pointer-events-none z-10 transition-opacity"
                        style={{ boxShadow: `inset 0 0 60px rgba(239, 68, 68, ${leftOpacity * 0.5})`, opacity: leftOpacity }}>
                        <div className="absolute top-6 right-6 text-red-400 font-bold text-xl" style={{ opacity: leftOpacity }}>
                            ❌ ÔN LẠI
                        </div>
                    </div>

                    {/* Card container — flip */}
                    <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
                        <div
                            className="relative w-full h-full transition-transform duration-500"
                            style={{
                                transformStyle: 'preserve-3d',
                                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                            }}
                        >
                            {/* FRONT — Original text */}
                            <div
                                className="absolute inset-0 rounded-2xl p-8 flex flex-col justify-between"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                                }}
                            >
                                <div>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800 border border-white/10 text-slate-400">
                                        {langFlag[currentCard.from]} {currentCard.from === 'vi' ? 'Tiếng Việt' : 'English'}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                                        {currentCard.original}
                                    </p>
                                </div>
                                <p className="text-center text-slate-500 text-xs animate-pulse">
                                    👆 Tap để xem nghĩa · Swipe trái/phải
                                </p>
                            </div>

                            {/* BACK — Translation */}
                            <div
                                className="absolute inset-0 rounded-2xl p-8 flex flex-col justify-between"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)',
                                    background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                                    border: '1px solid rgba(56, 189, 248, 0.15)',
                                    boxShadow: '0 0 40px rgba(56, 189, 248, 0.05)',
                                }}
                            >
                                <div>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-900/30 border border-cyan-500/30 text-cyan-400">
                                        {langFlag[currentCard.to]} {currentCard.to === 'vi' ? 'Tiếng Việt' : 'English'}
                                    </span>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl md:text-3xl font-bold text-cyan-300 leading-relaxed">
                                        {currentCard.translated}
                                    </p>
                                </div>
                                <p className="text-center text-slate-500 text-xs">
                                    👆 Tap để quay lại · Swipe trái/phải
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
                <button
                    onClick={handleSwipeLeft}
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all hover:scale-110 active:scale-95"
                    style={{ background: 'rgba(239, 68, 68, 0.15)', border: '2px solid rgba(239, 68, 68, 0.4)' }}
                    title="Chưa thuộc (←)"
                >
                    ❌
                </button>

                <button
                    onClick={() => setIsFlipped(f => !f)}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110 active:scale-95"
                    style={{ background: 'rgba(56, 189, 248, 0.15)', border: '2px solid rgba(56, 189, 248, 0.4)' }}
                    title="Lật thẻ (Space)"
                >
                    🔄
                </button>

                <button
                    onClick={handleSwipeRight}
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all hover:scale-110 active:scale-95"
                    style={{ background: 'rgba(74, 222, 128, 0.15)', border: '2px solid rgba(74, 222, 128, 0.4)' }}
                    title="Đã thuộc (→)"
                >
                    ✅
                </button>
            </div>

            {/* Keyboard hints */}
            <div className="mt-6 text-center text-xs text-slate-600">
                <span className="hidden md:inline">
                    ⌨️ Space: lật thẻ · ← →: swipe · H/L: trái/phải
                </span>
            </div>

            {/* Background effects */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[100px]" />
            </div>
        </div>
    )
}
