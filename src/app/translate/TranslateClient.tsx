'use client'

/**
 * ========================================================================
 * TRANSLATE CLIENT — Trang dịch VI ↔ EN
 * ========================================================================
 *
 * Tính năng:
 * 1. Auto-translate: Gõ xong 800ms → tự dịch (debounce)
 * 2. Swap: Đổi chiều ngôn ngữ (VI→EN thành EN→VI)
 * 3. Bookmark: Bấm 🔖 → lưu từ vựng vào MongoDB
 * 4. Saved list: Hiển thị danh sách từ đã lưu bên dưới
 * 5. Delete: Xóa từ vựng đã lưu
 *
 * Flow:
 *   Gõ text → debounce 800ms → POST /api/translate → hiện kết quả
 *   Bấm 🔖 → POST /api/vocabulary → thêm vào savedItems
 *   Load page → GET /api/vocabulary → hiện danh sách
 *
 * State:
 *   - input/output: text đang dịch
 *   - from/to: ngôn ngữ nguồn/đích
 *   - savedItems: danh sách từ đã lưu (từ MongoDB)
 *   - saving: đang lưu (tránh double-click)
 *   - loading: đang dịch
 */

import { useState, useRef, useEffect, useCallback } from 'react'
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

// Convert VAPID base64 key to Uint8Array for PushManager.subscribe
function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

export default function TranslateClient() {
    // ─── Translation state ────────────────────────────────────────────
    const [from, setFrom] = useState<Lang>('vi')
    const [to, setTo] = useState<Lang>('en')
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [wordType, setWordType] = useState<string | null>(null)
    const [example, setExample] = useState<string | null>(null)
    const [exampleTranslation, setExampleTranslation] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [charCount, setCharCount] = useState(0)
    const debounceRef = useRef<NodeJS.Timeout | null>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    // ─── Vocabulary state ─────────────────────────────────────────────
    const [savedItems, setSavedItems] = useState<VocabItem[]>([])
    const [saving, setSaving] = useState(false)         // Tránh spam nút bookmark
    const [savedFeedback, setSavedFeedback] = useState(false)  // Hiệu ứng "Saved!"
    const [deletingId, setDeletingId] = useState<string | null>(null) // ID đang xóa

    // ─── Push notification state ──────────────────────────────────────
    const [pushEnabled, setPushEnabled] = useState(false)
    const [pushFrequency, setPushFrequency] = useState(4)
    const [pushLoading, setPushLoading] = useState(false)
    const [pushSupported, setPushSupported] = useState(false)

    const langLabel: Record<Lang, string> = { vi: '🇻🇳 Tiếng Việt', en: '🇬🇧 English' }

    // ─── Check push notification support on mount ─────────────────────
    useEffect(() => {
        const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window
        setPushSupported(supported)

        if (supported && navigator.serviceWorker.controller) {
            navigator.serviceWorker.ready.then(async (reg) => {
                const sub = await reg.pushManager.getSubscription()
                if (sub) {
                    setPushEnabled(true)
                    // Lấy frequency từ localStorage
                    const savedFreq = localStorage.getItem('push-frequency')
                    if (savedFreq) setPushFrequency(parseInt(savedFreq))
                }
            })
        }
    }, [])

    // ─── Subscribe/Unsubscribe push ───────────────────────────────────
    const togglePush = async () => {
        if (pushLoading) return
        setPushLoading(true)

        try {
            const reg = await navigator.serviceWorker.ready

            if (pushEnabled) {
                // Unsubscribe
                const sub = await reg.pushManager.getSubscription()
                if (sub) {
                    await fetch('/api/push/subscribe', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ endpoint: sub.endpoint }),
                    })
                    await sub.unsubscribe()
                }
                setPushEnabled(false)
                localStorage.removeItem('push-frequency')
            } else {
                // Request permission
                const permission = await Notification.requestPermission()
                if (permission !== 'granted') {
                    setPushLoading(false)
                    return
                }

                // Subscribe
                const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
                if (!vapidKey) throw new Error('VAPID key not found')

                const sub = await reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(vapidKey).buffer as ArrayBuffer,
                })

                await fetch('/api/push/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ subscription: sub.toJSON(), frequency: pushFrequency }),
                })

                setPushEnabled(true)
                localStorage.setItem('push-frequency', String(pushFrequency))
            }
        } catch (err) {
            console.error('Push toggle error:', err)
        } finally {
            setPushLoading(false)
        }
    }

    // Update frequency on server
    const updateFrequency = async (freq: number) => {
        setPushFrequency(freq)
        localStorage.setItem('push-frequency', String(freq))

        if (pushEnabled) {
            try {
                const reg = await navigator.serviceWorker.ready
                const sub = await reg.pushManager.getSubscription()
                if (sub) {
                    await fetch('/api/push/subscribe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ subscription: sub.toJSON(), frequency: freq }),
                    })
                }
            } catch (err) {
                console.error('Update frequency error:', err)
            }
        }
    }

    // ─── Auto-translate (debounce 800ms) ──────────────────────────────
    const translate = useCallback(async (text: string, fromLang: Lang, toLang: Lang) => {
        if (!text.trim()) {
            setOutput('')
            return
        }
        setLoading(true)
        setWordType(null)
        setExample(null)
        setExampleTranslation(null)
        try {
            const res = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, from: fromLang, to: toLang }),
            })
            const data = await res.json()
            if (data.translated) {
                setOutput(data.translated)
                if (data.wordType) setWordType(data.wordType)
                if (data.example) setExample(data.example)
                if (data.exampleTranslation) setExampleTranslation(data.exampleTranslation)
            } else {
                setOutput('⚠️ Translation failed. Please try again.')
            }
        } catch {
            setOutput('⚠️ Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }, [])

    // Debounce: chờ user ngưng gõ 800ms rồi mới dịch
    useEffect(() => {
        setCharCount(input.length)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        if (!input.trim()) {
            setOutput('')
            return
        }
        debounceRef.current = setTimeout(() => {
            translate(input, from, to)
        }, 2000)
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [input, from, to, translate])

    // ─── Fetch saved vocabulary on mount ──────────────────────────────
    const fetchVocabulary = useCallback(async () => {
        try {
            const res = await fetch('/api/vocabulary')
            const data = await res.json()
            if (data.items) setSavedItems(data.items)
        } catch {
            console.error('Failed to fetch vocabulary')
        }
    }, [])

    useEffect(() => {
        fetchVocabulary()
    }, [fetchVocabulary])

    // ─── Save vocabulary (bookmark) ───────────────────────────────────
    // Gọi khi user bấm nút 🔖
    // Lưu cặp original + translated vào MongoDB
    const saveVocabulary = async () => {
        if (!input.trim() || !output.trim() || saving) return
        setSaving(true)
        try {
            const res = await fetch('/api/vocabulary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ original: input, translated: output, from, to }),
            })
            const data = await res.json()
            if (data.success) {
                // Thêm item mới vào đầu danh sách (không cần fetch lại)
                setSavedItems(prev => [data.item, ...prev])
                // Hiệu ứng "Saved!" 1.5 giây
                setSavedFeedback(true)
                setTimeout(() => setSavedFeedback(false), 1500)
            }
        } catch {
            console.error('Failed to save vocabulary')
        } finally {
            setSaving(false)
        }
    }

    // ─── Delete vocabulary ────────────────────────────────────────────
    const deleteVocabulary = async (id: string) => {
        setDeletingId(id)
        try {
            const res = await fetch(`/api/vocabulary?id=${id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                // Xóa khỏi state (không cần fetch lại)
                setSavedItems(prev => prev.filter(item => item._id !== id))
            }
        } catch {
            console.error('Failed to delete vocabulary')
        } finally {
            setDeletingId(null)
        }
    }

    // ─── Swap languages ───────────────────────────────────────────────
    const swapLanguages = () => {
        setFrom(to)
        setTo(from)
        setInput(output)
        setOutput(input)
        setWordType(null)
        setExample(null)
        setExampleTranslation(null)
    }

    // ─── Copy output ──────────────────────────────────────────────────
    const copyOutput = async () => {
        if (!output) return
        await navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    // ─── Clear input ──────────────────────────────────────────────────
    const clearInput = () => {
        setInput('')
        setOutput('')
        setWordType(null)
        setExample(null)
        setExampleTranslation(null)
        inputRef.current?.focus()
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex flex-col items-center px-4 py-8 md:py-12">
            {/* ───────── Header ───────── */}
            <div className="w-full max-w-5xl mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">🌐</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Translate</h1>
                </div>
                <p className="text-slate-400 text-sm">Dịch tiếng Việt ↔ English • Powered by AI</p>
            </div>

            {/* ───────── Language Selector ───────── */}
            <div className="w-full max-w-5xl flex items-center gap-2 md:gap-3 mb-4">
                <button
                    className="flex-1 py-2 md:py-3 px-3 md:px-4 rounded-xl text-center font-medium transition-all bg-slate-800/80 border border-white/10 hover:border-blue-500/50 text-white text-sm md:text-base"
                >
                    <span className="md:hidden">{from === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}</span>
                    <span className="hidden md:inline">{langLabel[from]}</span>
                </button>
                <button
                    onClick={swapLanguages}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center text-white text-lg md:text-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 active:scale-95 shrink-0"
                    title="Swap languages"
                >
                    ⇄
                </button>
                <button
                    className="flex-1 py-2 md:py-3 px-3 md:px-4 rounded-xl text-center font-medium transition-all bg-slate-800/80 border border-white/10 hover:border-blue-500/50 text-white text-sm md:text-base"
                >
                    <span className="md:hidden">{to === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}</span>
                    <span className="hidden md:inline">{langLabel[to]}</span>
                </button>
            </div>

            {/* ───────── Translation Area ───────── */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input panel */}
                <div className="relative">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={from === 'vi' ? 'Nhập văn bản tiếng Việt...' : 'Type English text...'}
                        className="w-full h-64 md:h-80 p-4 pb-10 rounded-xl bg-slate-900/80 border border-white/10 focus:border-blue-500/50 focus:outline-none resize-none text-white placeholder-slate-500 text-base leading-relaxed transition-colors"
                        autoFocus
                    />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                        <span className="text-xs text-slate-500">{charCount} chars</span>
                        {input && (
                            <button
                                onClick={clearInput}
                                className="text-xs text-slate-500 hover:text-white transition-colors px-2 py-1 rounded hover:bg-slate-800"
                            >
                                ✕ Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Output panel */}
                <div className="relative">
                    <div
                        className={`w-full h-64 md:h-80 p-4 pb-10 rounded-xl border text-base leading-relaxed whitespace-pre-wrap overflow-auto ${loading
                            ? 'bg-slate-900/50 border-blue-500/30'
                            : 'bg-slate-900/80 border-white/10'
                            }`}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2 text-blue-400">
                                <span className="inline-block w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                                Đang dịch...
                            </div>
                        ) : output ? (
                            <span className="text-white">{output}</span>
                        ) : (
                            <span className="text-slate-500">
                                {to === 'vi' ? 'Bản dịch sẽ hiện ở đây...' : 'Translation will appear here...'}
                            </span>
                        )}
                    </div>

                    {/* ── Bottom bar: Copy + Bookmark ── */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                        <div />
                        <div className="flex items-center gap-2">
                            {/* Bookmark button — lưu từ vựng */}
                            {output && !loading && (
                                <button
                                    onClick={saveVocabulary}
                                    disabled={saving}
                                    className={`text-xs transition-colors px-2 py-1 rounded flex items-center gap-1 ${savedFeedback
                                        ? 'text-green-400'
                                        : 'text-slate-500 hover:text-amber-400 hover:bg-slate-800'
                                        }`}
                                    title="Save to vocabulary"
                                >
                                    {savedFeedback ? '✓ Saved' : saving ? '...' : '🔖 Save'}
                                </button>
                            )}
                            {/* Copy button */}
                            {output && !loading && (
                                <button
                                    onClick={copyOutput}
                                    className="text-xs text-slate-500 hover:text-white transition-colors px-2 py-1 rounded hover:bg-slate-800 flex items-center gap-1"
                                >
                                    {copied ? '✓ Copied' : '📋 Copy'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Word Type + Example (below output) ── */}
                {wordType && !loading && (
                    <div className="mt-3 space-y-2 animate-in fade-in duration-300">
                        <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                                wordType === 'noun' ? 'bg-blue-600/15 border-blue-500/30 text-blue-400' :
                                wordType === 'verb' ? 'bg-emerald-600/15 border-emerald-500/30 text-emerald-400' :
                                wordType === 'adjective' ? 'bg-amber-600/15 border-amber-500/30 text-amber-400' :
                                wordType === 'adverb' ? 'bg-purple-600/15 border-purple-500/30 text-cyan-400' :
                                wordType === 'phrase' ? 'bg-cyan-600/15 border-cyan-500/30 text-cyan-400' :
                                wordType === 'idiom' ? 'bg-rose-600/15 border-rose-500/30 text-rose-400' :
                                'bg-slate-600/15 border-slate-500/30 text-slate-400'
                            }`}>
                                {wordType}
                            </span>
                        </div>
                        {example && (
                            <div className="px-3 py-2.5 rounded-lg bg-slate-800/50 border border-white/5">
                                <div className="text-xs text-slate-500 mb-1">Example</div>
                                <div className="text-sm text-slate-300 italic">&ldquo;{example}&rdquo;</div>
                                {exampleTranslation && (
                                    <div className="text-sm text-slate-500 mt-1">&rarr; {exampleTranslation}</div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Translate button + Hint */}
            <div className="w-full max-w-5xl mt-4 flex items-center justify-center gap-4">
                <button
                    onClick={() => translate(input, from, to)}
                    disabled={!input.trim() || loading}
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-medium transition-all active:scale-95 shadow-md shadow-blue-600/20"
                >
                    {loading ? 'Translating...' : '🌐 Translate'}
                </button>
                <span className="text-xs text-slate-600">or auto after 2s</span>
            </div>

            {/* ───────── Saved Vocabulary List ───────── */}
            {savedItems.length > 0 && (
                <div className="w-full max-w-5xl mt-10">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🔖</span>
                            <h2 className="text-lg font-semibold text-white">
                                Saved Vocabulary
                                <span className="ml-2 text-sm font-normal text-slate-500">({savedItems.length})</span>
                            </h2>
                        </div>
                        <Link
                            href="/vocabulary-flashcards"
                            className="px-4 py-2 text-xs font-medium rounded-lg bg-cyan-600/15 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-600/25 transition-all"
                        >
                            🃏 Flashcard Mode
                        </Link>
                    </div>

                    <div className="space-y-2">
                        {savedItems.map((item) => {
                            // Normalize: luôn hiển thị EN → VI
                            const isReversed = item.from === 'vi' && item.to === 'en'
                            const enText = isReversed ? item.translated : item.original
                            const viText = isReversed ? item.original : item.translated
                            return (
                            <div
                                key={item._id}
                                className={`group grid grid-cols-[1fr_auto_1fr_auto] items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/10 transition-colors ${deletingId === item._id ? 'opacity-50' : ''
                                    }`}
                            >
                                {/* English text */}
                                <div className="min-w-0">
                                    <span className="text-xs text-slate-500 mr-1">🇬🇧</span>
                                    <span className="text-sm text-slate-300 break-words">{enText}</span>
                                </div>

                                {/* Arrow */}
                                <span className="text-slate-600 text-xs shrink-0">→</span>

                                {/* Vietnamese text */}
                                <div className="min-w-0">
                                    <span className="text-xs text-slate-500 mr-1">🇻🇳</span>
                                    <span className="text-sm text-white break-words">{viText}</span>
                                </div>

                                {/* Delete button */}
                                <button
                                    onClick={() => deleteVocabulary(item._id)}
                                    disabled={deletingId === item._id}
                                    className="text-xs text-slate-600 hover:text-red-400 transition-all px-1 py-0.5 rounded shrink-0 md:opacity-0 md:group-hover:opacity-100"
                                    title="Delete"
                                >
                                    ✕
                                </button>
                            </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* ───────── Push Notification Reminder ───────── */}
            {savedItems.length > 0 && (
                <div className="w-full max-w-5xl mt-8">
                    <div className="px-5 py-4 rounded-xl bg-slate-900/60 border border-white/5">
                        <div className="flex items-center justify-between flex-wrap gap-3">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">🔔</span>
                                <div>
                                    <div className="text-sm font-medium text-white">Nhắc ôn từ vựng</div>
                                    <div className="text-xs text-slate-500">Push notification random 1 từ đã lưu</div>
                                </div>
                            </div>

                            {pushSupported ? (
                                <div className="flex items-center gap-3">
                                    {/* Frequency selector */}
                                    <select
                                        value={pushFrequency}
                                        onChange={(e) => updateFrequency(Number(e.target.value))}
                                        disabled={pushLoading}
                                        className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 border border-white/10 text-slate-300 focus:outline-none focus:border-blue-500/50"
                                    >
                                        <option value={1}>Mỗi 1 giờ</option>
                                        <option value={2}>Mỗi 2 giờ</option>
                                        <option value={4}>Mỗi 4 giờ</option>
                                        <option value={6}>Mỗi 6 giờ</option>
                                        <option value={12}>Mỗi 12 giờ</option>
                                        <option value={24}>Mỗi ngày</option>
                                    </select>

                                    {/* Toggle button */}
                                    <button
                                        onClick={togglePush}
                                        disabled={pushLoading}
                                        className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
                                            pushEnabled
                                                ? 'bg-green-600/15 border border-green-500/30 text-green-400 hover:bg-red-600/15 hover:border-red-500/30 hover:text-red-400'
                                                : 'bg-blue-600/15 border border-blue-500/30 text-blue-400 hover:bg-blue-600/25'
                                        } disabled:opacity-50`}
                                    >
                                        {pushLoading ? '...' : pushEnabled ? '✓ Đang bật' : 'Bật nhắc'}
                                    </button>
                                </div>
                            ) : (
                                <div className="text-xs text-amber-400/80 max-w-[280px] text-right">
                                    📱 iOS: Bấm <strong>Share → Add to Home Screen</strong> rồi mở từ Home Screen để nhận notification
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ───────── Background effects ───────── */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[100px]" />
            </div>
        </div>
    )
}
