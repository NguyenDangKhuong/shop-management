'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import {
    useSwipeDrag, useFlashcardKeys, useProgressSync,
    FlashcardProgressBar, SwipeIndicators, CardStackBg,
    FlashcardControls, KeyboardHints, FlipCard,
} from '@/components/flashcards/FlashcardRenderer'

// Types
type Topic = 'JavaScript' | 'React' | 'CSS' | 'HTML' | 'Web APIs' | 'Security' | 'Performance' | 'Testing' | 'Async' | 'OOP' | 'Networking' | 'Closure'
type Difficulty = 'Easy' | 'Medium' | 'Hard'

interface InterviewCard {
    cardId: string
    question: string
    answer_vi: string
    answer_en: string
    topic: Topic
    difficulty: Difficulty
}

interface AlgoCard {
    cardId: string
    pattern: string
    emoji: string
    color: string
    front: { signal: string; question: string }
    back: { approach: string; template: string; complexity: string; example: string }
}

// ═══════════════════════════════════════════════
//  Topic colors + emoji
// ═══════════════════════════════════════════════
const topicConfig: Record<Topic, { color: string; emoji: string }> = {
    JavaScript: { color: '#fbbf24', emoji: '⚡' },
    React: { color: '#61dafb', emoji: '⚛️' },
    CSS: { color: '#38bdf8', emoji: '🎨' },
    HTML: { color: '#f97316', emoji: '📄' },
    'Web APIs': { color: '#a78bfa', emoji: '🌐' },
    Security: { color: '#ef4444', emoji: '🔒' },
    Performance: { color: '#22c55e', emoji: '⚡' },
    Testing: { color: '#06b6d4', emoji: '🧪' },
    Async: { color: '#818cf8', emoji: '⏳' },
    OOP: { color: '#f472b6', emoji: '🧬' },
    Networking: { color: '#14b8a6', emoji: '📡' },
    Closure: { color: '#e879f9', emoji: '📦' },
}

const difficultyConfig: Record<Difficulty, { color: string; bg: string }> = {
    Easy: { color: '#4ade80', bg: 'rgba(74, 222, 128, 0.15)' },
    Medium: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)' },
    Hard: { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
}

const allTopics: Topic[] = ['JavaScript', 'React', 'CSS', 'HTML', 'Async', 'OOP', 'Closure', 'Security', 'Performance', 'Networking', 'Web APIs', 'Testing']

// ═══════════════════════════════════════════════
//  Answer Renderer (lightweight markdown-like)
// ═══════════════════════════════════════════════

function AnswerRenderer({ text }: { text: string }) {
    const blocks = text.split('\n')
    const elements: React.ReactNode[] = []
    let i = 0

    while (i < blocks.length) {
        const line = blocks[i]

        // Code block: ```...```
        if (line.startsWith('```')) {
            const codeLines: string[] = []
            i++
            while (i < blocks.length && !blocks[i].startsWith('```')) {
                codeLines.push(blocks[i])
                i++
            }
            i++ // skip closing ```
            elements.push(
                <pre key={`code-${i}`} className="p-3 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed my-2"
                    style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}>
                    {codeLines.join('\n')}
                </pre>
            )
            continue
        }

        // Table: lines starting with |
        if (line.startsWith('|')) {
            const tableLines: string[] = []
            while (i < blocks.length && blocks[i].startsWith('|')) {
                // skip separator rows like |---|---|
                if (!/^\|[\s-|]+\|$/.test(blocks[i])) {
                    tableLines.push(blocks[i])
                }
                i++
            }
            const rows = tableLines.map(r => r.split('|').filter(c => c.trim() !== ''))
            const colCount = rows[0]?.length || 1
            elements.push(
                <table key={`tbl-${i}`} className="w-full text-xs my-2 border-collapse table-fixed">
                    {rows.length > 0 && (
                        <thead>
                            <tr>{rows[0].map((h, hi) => (
                                <th key={hi} className="text-left px-2 py-1.5 font-semibold border-b"
                                    style={{ borderColor: 'var(--border-primary)', color: 'var(--text-primary)', width: hi === 0 && h.trim() === '' ? '20%' : `${80 / (colCount - (rows[0][0]?.trim() === '' ? 1 : 0))}%` }}>
                                    <InlineCode text={h.trim()} />
                                </th>
                            ))}</tr>
                        </thead>
                    )}
                    <tbody>
                        {rows.slice(1).map((row, ri) => (
                            <tr key={ri}>
                                {row.map((cell, ci) => (
                                    <td key={ci} className="px-2 py-1.5 border-b" style={{ borderColor: 'var(--border-primary)', color: ci === 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                        <InlineCode text={cell.trim()} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            continue
        }

        // Bullet list: lines starting with • or -
        if (line.match(/^[•\-]\s/)) {
            const items: string[] = []
            while (i < blocks.length && blocks[i].match(/^[•\-]\s/)) {
                items.push(blocks[i].replace(/^[•\-]\s/, ''))
                i++
            }
            elements.push(
                <ul key={`ul-${i}`} className="text-sm space-y-1 my-1 ml-1">
                    {items.map((item, ii) => (
                        <li key={ii} className="flex gap-2" style={{ color: 'var(--text-secondary)' }}>
                            <span className="text-[var(--text-muted)] select-none">•</span>
                            <span><InlineCode text={item} /></span>
                        </li>
                    ))}
                </ul>
            )
            continue
        }

        // Empty line = spacer
        if (line.trim() === '') {
            elements.push(<div key={`sp-${i}`} className="h-1" />)
            i++
            continue
        }

        // Regular text line with inline code
        elements.push(
            <p key={`p-${i}`} className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <InlineCode text={line} />
            </p>
        )
        i++
    }

    return <div className="space-y-1">{elements}</div>
}

// Inline code renderer: wraps `code` in styled <code> tags
function InlineCode({ text }: { text: string }) {
    const parts = text.split(/(`[^`]+`)/g)
    return (
        <>
            {parts.map((part, i) => {
                if (part.startsWith('`') && part.endsWith('`')) {
                    return (
                        <code key={i} className="px-1.5 py-0.5 rounded text-xs font-mono"
                            style={{ background: 'var(--bg-tag)', color: '#e879f9', border: '1px solid var(--border-primary)' }}>
                            {part.slice(1, -1)}
                        </code>
                    )
                }
                return <span key={i}>{part}</span>
            })}
        </>
    )
}

// ═══════════════════════════════════════════════
//  Study Tips Component
// ═══════════════════════════════════════════════

function StudyTips() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="mt-8">
            <button
                onClick={() => setIsOpen(o => !o)}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-primary)',
                    color: 'var(--text-secondary)',
                }}
            >
                {isOpen ? '▼' : '▶'} 🧠 Cách ghi nhớ cú pháp thuật toán
            </button>
            {isOpen && (
                <div className="mt-3 p-5 rounded-xl text-sm leading-relaxed space-y-6"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}>
                    <div>
                        <h3 className="font-bold text-[var(--text-primary)] mb-2">1. Nhớ Pattern, không nhớ code</h3>
                        <pre className="p-3 rounded-lg text-xs font-mono leading-relaxed" style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)' }}>
                            {`🗂️ HashMap:      "Duyệt 1 lần, check Map trước, lưu Map sau"
👉 Two Pointers:  "2 con trỏ, thu hẹp từ 2 đầu"
🪟 Sliding Window: "for mở rộng right, while thu hẹp left"
📚 Stack:         "Gặp mở → push, gặp đóng → pop + kiểm tra"
🔍 Binary Search: "while left <= right, mid = floor((l+r)/2)"`}
                        </pre>
                    </div>
                    <div>
                        <h3 className="font-bold text-[var(--text-primary)] mb-2">2. Quy tắc 3 lần viết tay</h3>
                        <p className="text-[var(--text-muted)]">Lần 1: Đọc + hiểu + tự code lại → Lần 2: Ngày hôm sau, code lại <strong>không xem</strong> → Lần 3: 1 tuần sau. Sau 3 lần → <strong className="text-[var(--text-primary)]">muscle memory</strong> 💪</p>
                    </div>
                </div>
            )}
        </div>
    )
}

// ═══════════════════════════════════════════════
//  Flashcard App (Tabs: Algorithm | Interview)
// ═══════════════════════════════════════════════

type TabMode = 'algorithm' | 'interview'
type Lang = 'vi' | 'en'

export default function FlashcardApp() {
    const [tab, setTab] = useState<TabMode>('interview')
    const [lang, setLang] = useState<Lang>('vi')
    const [selectedTopics, setSelectedTopics] = useState<Set<Topic>>(new Set())
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All')

    // Card data from API
    const [allInterviewCards, setAllInterviewCards] = useState<InterviewCard[]>([])
    const [allAlgoCards, setAllAlgoCards] = useState<AlgoCard[]>([])
    const [loading, setLoading] = useState(true)

    // Algorithm state
    const [algoIndex, setAlgoIndex] = useState(0)
    const [algoFlipped, setAlgoFlipped] = useState(false)
    const [algoKnown, setAlgoKnown] = useState<Set<string>>(new Set())

    // Interview state
    const [interviewIndex, setInterviewIndex] = useState(0)
    const [interviewFlipped, setInterviewFlipped] = useState(false)
    const [interviewKnown, setInterviewKnown] = useState<Set<string>>(new Set())
    const [shuffleSeed, setShuffleSeed] = useState(0)

    // Progress sync
    const algoProgress = useProgressSync('algo')
    const interviewProgress = useProgressSync('interview')

    // ── Fetch cards from API ──
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const [interviewRes, algoRes] = await Promise.all([
                    fetch('/api/flashcards?type=interview'),
                    fetch('/api/flashcards?type=algorithm'),
                ])
                const interviewData = await interviewRes.json()
                const algoData = await algoRes.json()
                setAllInterviewCards(interviewData.cards || [])
                setAllAlgoCards(algoData.cards || [])
            } catch {
                console.error('Failed to fetch flashcards')
            } finally {
                setLoading(false)
            }
        }
        fetchCards()
    }, [])

    // ── Load saved progress ──
    useEffect(() => {
        if (algoProgress.initialKnown) {
            setAlgoKnown(new Set(algoProgress.initialKnown))
        }
    }, [algoProgress.initialKnown])

    useEffect(() => {
        if (interviewProgress.initialKnown) {
            setInterviewKnown(new Set(interviewProgress.initialKnown))
        }
    }, [interviewProgress.initialKnown])

    // Filter + shuffle interview cards
    const filteredInterviewCards = useMemo(() => {
        let cards = [...allInterviewCards]
        if (selectedTopics.size > 0) {
            cards = cards.filter(c => selectedTopics.has(c.topic))
        }
        if (selectedDifficulty !== 'All') {
            cards = cards.filter(c => c.difficulty === selectedDifficulty)
        }
        if (shuffleSeed > 0) {
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]]
            }
        }
        return cards
    }, [allInterviewCards, selectedTopics, selectedDifficulty, shuffleSeed])

    // Reset index when filters change
    useEffect(() => {
        setInterviewIndex(0)
        setInterviewFlipped(false)
    }, [selectedTopics, selectedDifficulty])

    // Current card
    const currentCards = tab === 'algorithm' ? allAlgoCards : filteredInterviewCards
    const currentIndex = tab === 'algorithm' ? algoIndex : interviewIndex
    const isFlipped = tab === 'algorithm' ? algoFlipped : interviewFlipped
    const knownCards = tab === 'algorithm' ? algoKnown : interviewKnown

    const currentCard = currentCards[currentIndex]

    const setFlipped = tab === 'algorithm' ? setAlgoFlipped : setInterviewFlipped
    const setIndex = tab === 'algorithm' ? setAlgoIndex : setInterviewIndex
    const setKnown = tab === 'algorithm' ? setAlgoKnown : setInterviewKnown
    const progressSync = tab === 'algorithm' ? algoProgress : interviewProgress

    // ── Swipe handlers ──
    const handleSwipeRight = useCallback(() => {
        if (!currentCard) return
        const id = currentCard.cardId
        setKnown(prev => new Set(prev).add(id))
        progressSync.saveProgress(id, true)
        setFlipped(false)
        setTimeout(() => setIndex(i => (i + 1) % currentCards.length), 150)
    }, [currentCard, currentCards.length, setFlipped, setIndex, setKnown, progressSync])

    const handleSwipeLeft = useCallback(() => {
        if (!currentCard) return
        setFlipped(false)
        setTimeout(() => setIndex(i => (i + 1) % currentCards.length), 150)
    }, [currentCard, currentCards.length, setFlipped, setIndex])

    // ── Swipe/drag ──
    const { cardStyle, dragHandlers, rightOpacity, leftOpacity, isDragging, dragX, dragY } = useSwipeDrag({
        onSwipeRight: handleSwipeRight,
        onSwipeLeft: handleSwipeLeft,
    })

    // ── Navigation ──
    const goNext = useCallback(() => {
        setFlipped(false)
        setIndex(i => (i + 1) % currentCards.length)
    }, [currentCards.length, setFlipped, setIndex])

    const goPrev = useCallback(() => {
        setFlipped(false)
        setIndex(i => (i - 1 + currentCards.length) % currentCards.length)
    }, [currentCards.length, setFlipped, setIndex])

    const shuffle = useCallback(() => {
        if (tab === 'algorithm') {
            setAllAlgoCards(prev => [...prev].sort(() => Math.random() - 0.5))
        } else {
            setShuffleSeed(s => s + 1)
        }
        setIndex(0)
        setFlipped(false)
    }, [tab, setIndex, setFlipped])

    const toggleKnown = useCallback(() => {
        if (!currentCard) return
        const id = currentCard.cardId
        setKnown(prev => {
            const next = new Set(prev)
            const isKnown = next.has(id)
            if (isKnown) next.delete(id)
            else next.add(id)
            progressSync.saveProgress(id, !isKnown)
            return next
        })
    }, [currentCard, setKnown, progressSync])

    const resetKnown = useCallback(() => {
        setKnown(new Set())
        // Also reset on server for each known card
        if (progressSync.isLoggedIn) {
            knownCards.forEach(id => progressSync.saveProgress(id, false))
        }
    }, [setKnown, knownCards, progressSync])

    const toggleTopic = (topic: Topic) => {
        setSelectedTopics(prev => {
            const next = new Set(prev)
            if (next.has(topic)) next.delete(topic)
            else next.add(topic)
            return next
        })
    }

    const isCurrentKnown = currentCard ? knownCards.has(currentCard.cardId) : false

    // Keyboard shortcuts
    useFlashcardKeys({
        onFlip: () => setFlipped(f => !f),
        onSwipeRight: handleSwipeRight,
        onSwipeLeft: handleSwipeLeft,
        onNext: goNext,
        onPrev: goPrev,
        onShuffle: shuffle,
        onToggleKnown: toggleKnown,
    })

    const progress = knownCards.size
    const total = currentCards.length

    // ── Loading state ──
    if (loading) {
        return (
            <div className="dark">
                <div className="min-h-screen bg-[var(--bg-page)] flex items-center justify-center">
                    <div className="text-[var(--text-muted)] animate-pulse">Loading flashcards...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="dark">
            <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] p-4 sm:p-8">
                <div className="max-w-2xl mx-auto">
                    {/* Tab Bar */}
                    <div className="flex gap-2 mb-6">
                        <button
                            onClick={() => setTab('algorithm')}
                            className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                            style={{
                                background: tab === 'algorithm' ? 'rgba(251, 191, 36, 0.15)' : 'var(--bg-card)',
                                border: tab === 'algorithm' ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid var(--border-primary)',
                                color: tab === 'algorithm' ? '#fbbf24' : 'var(--text-muted)',
                            }}
                        >
                            🧮 Algorithm ({allAlgoCards.length})
                        </button>
                        <button
                            onClick={() => setTab('interview')}
                            className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                            style={{
                                background: tab === 'interview' ? 'rgba(56, 189, 248, 0.15)' : 'var(--bg-card)',
                                border: tab === 'interview' ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid var(--border-primary)',
                                color: tab === 'interview' ? '#38bdf8' : 'var(--text-muted)',
                            }}
                        >
                            💼 Interview ({allInterviewCards.length})
                        </button>
                    </div>

                    {/* Interview Filters */}
                    {tab === 'interview' && (
                        <div className="mb-4 space-y-3">
                            {/* Language toggle + Difficulty */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <button
                                    onClick={() => setLang(l => l === 'vi' ? 'en' : 'vi')}
                                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                                    style={{
                                        background: 'rgba(168, 85, 247, 0.15)',
                                        border: '1px solid rgba(168, 85, 247, 0.4)',
                                        color: '#a855f7',
                                    }}
                                >
                                    {lang === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}
                                </button>
                                <div className="h-4 w-px bg-[var(--border-primary)]" />
                                {(['All', 'Easy', 'Medium', 'Hard'] as const).map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setSelectedDifficulty(d)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                                        style={{
                                            background: selectedDifficulty === d
                                                ? (d === 'All' ? 'rgba(255,255,255,0.1)' : difficultyConfig[d as Difficulty].bg)
                                                : 'var(--bg-tag)',
                                            border: selectedDifficulty === d
                                                ? `1px solid ${d === 'All' ? 'var(--border-primary)' : difficultyConfig[d as Difficulty].color}40`
                                                : '1px solid transparent',
                                            color: selectedDifficulty === d
                                                ? (d === 'All' ? 'var(--text-secondary)' : difficultyConfig[d as Difficulty].color)
                                                : 'var(--text-muted)',
                                        }}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                            {/* Topic pills */}
                            <div className="flex flex-wrap gap-1.5">
                                {allTopics.map(topic => {
                                    const isSelected = selectedTopics.has(topic)
                                    const cfg = topicConfig[topic]
                                    const count = allInterviewCards.filter(c => c.topic === topic).length
                                    return (
                                        <button
                                            key={topic}
                                            onClick={() => toggleTopic(topic)}
                                            className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                                            style={{
                                                background: isSelected ? `${cfg.color}20` : 'var(--bg-tag)',
                                                border: isSelected ? `1px solid ${cfg.color}40` : '1px solid transparent',
                                                color: isSelected ? cfg.color : 'var(--text-muted)',
                                            }}
                                        >
                                            {cfg.emoji} {topic} ({count})
                                        </button>
                                    )
                                })}
                                {selectedTopics.size > 0 && (
                                    <button
                                        onClick={() => setSelectedTopics(new Set())}
                                        className="px-2.5 py-1 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                                    >
                                        ✕ Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Progress */}
                    <FlashcardProgressBar known={progress} total={total} current={currentIndex} />

                    {/* Empty state */}
                    {total === 0 && (
                        <div className="text-center py-20 text-[var(--text-muted)]">
                            <p className="text-4xl mb-3">🔍</p>
                            <p className="text-sm">Không có câu hỏi nào phù hợp bộ lọc</p>
                            <button
                                onClick={() => { setSelectedTopics(new Set()); setSelectedDifficulty('All') }}
                                className="mt-3 px-4 py-2 rounded-lg text-xs font-medium"
                                style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
                            >
                                Clear filters
                            </button>
                        </div>
                    )}

                    {/* Flashcard */}
                    {currentCard && total > 0 && (
                        <>
                            <div className="relative mb-6" style={{ minHeight: tab === 'algorithm' ? '380px' : '340px' }}>
                                <CardStackBg count={total} />
                                <div
                                    className="absolute inset-0 select-none"
                                    style={{ ...cardStyle, perspective: '1000px' }}
                                    {...dragHandlers}
                                    onClick={() => { if (!isDragging || (Math.abs(dragX) < 5 && Math.abs(dragY) < 5)) setFlipped(f => !f) }}
                                >
                                    <SwipeIndicators rightOpacity={rightOpacity} leftOpacity={leftOpacity} />
                                    <FlipCard
                                        isFlipped={isFlipped}
                                        height={tab === 'algorithm' ? '380px' : '340px'}
                                        front={
                                            tab === 'algorithm' ? (
                                                <div>
                                                    <div className="mb-2">
                                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-tag)] border border-[var(--border-primary)] text-[var(--text-muted)]">
                                                            🤔 Bài toán này dùng thuật toán gì?
                                                        </span>
                                                    </div>
                                                    <div className="mb-6 mt-6">
                                                        <p className="text-xl sm:text-2xl font-bold leading-snug">{(currentCard as AlgoCard).front.signal}</p>
                                                    </div>
                                                    <div className="p-4 rounded-xl bg-[var(--bg-tag)] border border-[var(--border-primary)]">
                                                        <p className="text-[var(--text-muted)] text-xs mb-1">Ví dụ:</p>
                                                        <code className="text-sm text-[var(--text-secondary)] font-mono">{(currentCard as AlgoCard).front.question}</code>
                                                    </div>
                                                    <p className="text-center text-[var(--text-muted)] text-xs mt-4 animate-pulse">
                                                        👆 Click để xem đáp án
                                                    </p>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                                                        <span
                                                            className="px-2.5 py-1 rounded-lg text-xs font-medium"
                                                            style={{
                                                                background: `${topicConfig[(currentCard as InterviewCard).topic]?.color || '#888'}20`,
                                                                color: topicConfig[(currentCard as InterviewCard).topic]?.color || '#888',
                                                                border: `1px solid ${topicConfig[(currentCard as InterviewCard).topic]?.color || '#888'}30`,
                                                            }}
                                                        >
                                                            {topicConfig[(currentCard as InterviewCard).topic]?.emoji} {(currentCard as InterviewCard).topic}
                                                        </span>
                                                        <span
                                                            className="px-2.5 py-1 rounded-lg text-xs font-medium"
                                                            style={{
                                                                background: difficultyConfig[(currentCard as InterviewCard).difficulty]?.bg,
                                                                color: difficultyConfig[(currentCard as InterviewCard).difficulty]?.color,
                                                            }}
                                                        >
                                                            {(currentCard as InterviewCard).difficulty}
                                                        </span>
                                                    </div>
                                                    <p className="text-lg sm:text-xl font-bold leading-relaxed mt-4">{(currentCard as InterviewCard).question}</p>
                                                    <p className="text-center text-[var(--text-muted)] text-xs mt-4 animate-pulse">
                                                        👆 Click để xem đáp án
                                                    </p>
                                                </div>
                                            )
                                        }
                                        back={
                                            tab === 'algorithm' ? (
                                                <>
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <span className="text-2xl">{(currentCard as AlgoCard).emoji}</span>
                                                        <span
                                                            className="px-3 py-1 rounded-full text-xs font-bold"
                                                            style={{
                                                                background: `${(currentCard as AlgoCard).color}20`,
                                                                color: (currentCard as AlgoCard).color,
                                                                border: `1px solid ${(currentCard as AlgoCard).color}40`,
                                                            }}
                                                        >
                                                            {(currentCard as AlgoCard).pattern}
                                                        </span>
                                                    </div>
                                                    <div className="mb-3">
                                                        <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Cách tiếp cận</p>
                                                        <p className="text-base font-semibold" style={{ color: (currentCard as AlgoCard).color }}>{(currentCard as AlgoCard).back.approach}</p>
                                                    </div>
                                                    <div className="mb-3">
                                                        <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Template Code</p>
                                                        <pre className="p-3 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed"
                                                            style={{ background: 'var(--bg-tag)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}>
                                                            {(currentCard as AlgoCard).back.template}
                                                        </pre>
                                                    </div>
                                                    <div className="flex gap-3 text-xs">
                                                        <div className="flex-1 p-2 rounded-lg bg-[var(--bg-tag)] border border-[var(--border-primary)]">
                                                            <span className="text-[var(--text-muted)]">⏱️ </span>
                                                            <span className="text-[var(--text-secondary)]">{(currentCard as AlgoCard).back.complexity}</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Bài LeetCode</p>
                                                        <p className="text-xs text-[var(--text-secondary)]">{(currentCard as AlgoCard).back.example}</p>
                                                    </div>
                                                    <p className="text-center text-[var(--text-muted)] text-xs mt-3">
                                                        👆 Click để quay lại
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex items-center gap-2 mb-4">
                                                        <span
                                                            className="px-2.5 py-1 rounded-lg text-xs font-medium"
                                                            style={{
                                                                background: `${topicConfig[(currentCard as InterviewCard).topic]?.color || '#888'}20`,
                                                                color: topicConfig[(currentCard as InterviewCard).topic]?.color || '#888',
                                                            }}
                                                        >
                                                            {topicConfig[(currentCard as InterviewCard).topic]?.emoji} {(currentCard as InterviewCard).topic}
                                                        </span>
                                                        <span
                                                            className="px-2.5 py-1 rounded-lg text-xs font-medium"
                                                            style={{
                                                                background: difficultyConfig[(currentCard as InterviewCard).difficulty]?.bg,
                                                                color: difficultyConfig[(currentCard as InterviewCard).difficulty]?.color,
                                                            }}
                                                        >
                                                            {(currentCard as InterviewCard).difficulty}
                                                        </span>
                                                    </div>
                                                    <div className="mb-3">
                                                        <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">
                                                            {lang === 'vi' ? '💡 Câu trả lời' : '💡 Answer'}
                                                        </p>
                                                        <AnswerRenderer
                                                            text={lang === 'vi'
                                                                ? (currentCard as InterviewCard).answer_vi
                                                                : (currentCard as InterviewCard).answer_en
                                                            }
                                                        />
                                                    </div>
                                                    <p className="text-center text-[var(--text-muted)] text-xs mt-3">
                                                        👆 Click để quay lại
                                                    </p>
                                                </>
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            {/* Navigation — prev/next */}
                            <div className="flex items-center justify-center gap-3 mb-3">
                                <button
                                    onClick={(e) => { e.stopPropagation(); goPrev() }}
                                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95"
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
                                    title="Previous (←)"
                                >◀ Trước</button>

                                <span className="text-xs text-[var(--text-muted)] font-mono min-w-[60px] text-center">
                                    {currentIndex + 1} / {total}
                                </span>

                                <button
                                    onClick={(e) => { e.stopPropagation(); goNext() }}
                                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95"
                                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
                                    title="Next (→)"
                                >Sau ▶</button>
                            </div>

                            {/* Controls — Tinder style */}
                            <FlashcardControls
                                onLeft={handleSwipeLeft}
                                onRight={handleSwipeRight}
                                onFlip={() => setFlipped(f => !f)}
                                extraButtons={
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); shuffle() }}
                                            className="w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110 active:scale-95"
                                            style={{ background: 'rgba(251, 191, 36, 0.15)', border: '2px solid rgba(251, 191, 36, 0.4)' }}
                                            title="Trộn thẻ (S)"
                                        >🎲</button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); toggleKnown() }}
                                            className="w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all hover:scale-110 active:scale-95"
                                            style={{
                                                background: isCurrentKnown ? 'rgba(74, 222, 128, 0.25)' : 'rgba(148, 163, 184, 0.15)',
                                                border: isCurrentKnown ? '2px solid rgba(74, 222, 128, 0.6)' : '2px solid rgba(148, 163, 184, 0.4)',
                                            }}
                                            title="Toggle đã thuộc (K)"
                                        >{isCurrentKnown ? '🧠' : '💭'}</button>
                                    </>
                                }
                            />

                            {/* Reset known */}
                            {knownCards.size > 0 && (
                                <div className="mt-4 text-center">
                                    <button
                                        onClick={resetKnown}
                                        className="px-4 py-2 rounded-xl text-xs font-medium transition-all hover:scale-105 active:scale-95"
                                        style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444' }}
                                    >
                                        🗑️ Reset tiến độ ({knownCards.size} đã thuộc)
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {/* Keyboard shortcuts hint */}
                    <KeyboardHints showShuffle />

                    {/* Study Tips (only for algorithm tab) */}
                    {tab === 'algorithm' && <StudyTips />}
                </div>
            </div>
        </div>
    )
}
