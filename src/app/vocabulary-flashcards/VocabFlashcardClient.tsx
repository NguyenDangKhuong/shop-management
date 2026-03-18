'use client'

/**
 * ========================================================================
 * VOCABULARY FLASHCARDS — Học từ vựng kiểu Tinder
 * ========================================================================
 *
 * Uses shared components from FlashcardRenderer for swipe/drag UX
 * and useProgressSync for cross-device persistence.
 */

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import {
    useSwipeDrag, useFlashcardKeys, useProgressSync,
    FlashcardProgressBar, SwipeIndicators, CardStackBg,
    FlashcardControls,
} from '@/components/flashcards/FlashcardRenderer'

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

    const langFlag: Record<Lang, string> = { vi: '🇻🇳', en: '🇬🇧' }

    // Progress sync
    const vocabProgress = useProgressSync('vocab')

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

    // ── Load saved progress ──
    useEffect(() => {
        if (vocabProgress.initialKnown && allItems.length > 0) {
            const knownSet = new Set(vocabProgress.initialKnown)
            setKnownIds(knownSet)
            // Remove already-known items from stack
            setStack(allItems.filter(item => !knownSet.has(item._id)))
        }
    }, [vocabProgress.initialKnown, allItems])

    const currentCard = stack[0]
    const progress = knownIds.size
    const total = allItems.length

    // ── Swipe handlers ──
    const handleSwipeRight = useCallback(() => {
        if (!currentCard) return
        setKnownIds(prev => new Set(prev).add(currentCard._id))
        vocabProgress.saveProgress(currentCard._id, true)
        setStack(prev => prev.slice(1))
        setIsFlipped(false)
    }, [currentCard, vocabProgress])

    const handleSwipeLeft = useCallback(() => {
        if (!currentCard) return
        setStack(prev => [...prev.slice(1), prev[0]])
        setIsFlipped(false)
    }, [currentCard])

    // ── Swipe/drag ──
    const { cardStyle, dragHandlers, rightOpacity, leftOpacity, isDragging, dragX, dragY } = useSwipeDrag({
        onSwipeRight: handleSwipeRight,
        onSwipeLeft: handleSwipeLeft,
    })

    // Keyboard shortcuts
    useFlashcardKeys({
        onFlip: () => setIsFlipped(f => !f),
        onSwipeRight: handleSwipeRight,
        onSwipeLeft: handleSwipeLeft,
    })

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
                    <Link href="/translate" className="text-slate-500 hover:text-white transition-colors text-sm">← Translate</Link>
                </div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    🔖 Vocabulary Flashcards
                </h1>
                <p className="text-sm text-slate-500 mt-1">Swipe phải = Thuộc ✅ · Swipe trái = Chưa thuộc ❌</p>
            </div>

            {/* Progress */}
            <div className="w-full max-w-lg">
                <FlashcardProgressBar known={progress} total={total} label={`Còn lại: ${stack.length}`} />
            </div>

            {/* Card Stack */}
            <div className="relative w-full max-w-lg" style={{ height: '340px' }}>
                <CardStackBg count={stack.length} />

                {/* Active card — draggable */}
                <div
                    className="absolute inset-0 select-none"
                    style={{ ...cardStyle, perspective: '1000px' }}
                    {...dragHandlers}
                    onClick={() => { if (!isDragging || (Math.abs(dragX) < 5 && Math.abs(dragY) < 5)) setIsFlipped(f => !f) }}
                >
                    <SwipeIndicators rightOpacity={rightOpacity} leftOpacity={leftOpacity} />

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
            <div className="mt-8">
                <FlashcardControls
                    onLeft={handleSwipeLeft}
                    onRight={handleSwipeRight}
                    onFlip={() => setIsFlipped(f => !f)}
                />
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
