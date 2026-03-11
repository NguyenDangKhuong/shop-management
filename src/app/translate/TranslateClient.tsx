'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

type Lang = 'vi' | 'en'

export default function TranslateClient() {
    const [from, setFrom] = useState<Lang>('vi')
    const [to, setTo] = useState<Lang>('en')
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [charCount, setCharCount] = useState(0)
    const debounceRef = useRef<NodeJS.Timeout | null>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const langLabel: Record<Lang, string> = { vi: '🇻🇳 Tiếng Việt', en: '🇬🇧 English' }

    const translate = useCallback(async (text: string, fromLang: Lang, toLang: Lang) => {
        if (!text.trim()) {
            setOutput('')
            return
        }
        setLoading(true)
        try {
            const res = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, from: fromLang, to: toLang }),
            })
            const data = await res.json()
            if (data.translated) {
                setOutput(data.translated)
            } else {
                setOutput('⚠️ Translation failed. Please try again.')
            }
        } catch {
            setOutput('⚠️ Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }, [])

    // Auto-translate with debounce (800ms)
    useEffect(() => {
        setCharCount(input.length)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        if (!input.trim()) {
            setOutput('')
            return
        }
        debounceRef.current = setTimeout(() => {
            translate(input, from, to)
        }, 800)
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
        }
    }, [input, from, to, translate])

    const swapLanguages = () => {
        setFrom(to)
        setTo(from)
        setInput(output)
        setOutput(input)
    }

    const copyOutput = async () => {
        if (!output) return
        await navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    const clearInput = () => {
        setInput('')
        setOutput('')
        inputRef.current?.focus()
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex flex-col items-center px-4 py-8 md:py-12">
            {/* Header */}
            <div className="w-full max-w-5xl mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">🌐</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Translate</h1>
                </div>
                <p className="text-slate-400 text-sm">Dịch tiếng Việt ↔ English • Powered by AI</p>
            </div>

            {/* Language Selector */}
            <div className="w-full max-w-5xl flex items-center gap-3 mb-4">
                <button
                    className="flex-1 py-3 px-4 rounded-xl text-center font-medium transition-all bg-slate-800/80 border border-white/10 hover:border-blue-500/50 text-white"
                >
                    {langLabel[from]}
                </button>
                <button
                    onClick={swapLanguages}
                    className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center text-white text-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 active:scale-95 shrink-0"
                    title="Swap languages"
                >
                    ⇄
                </button>
                <button
                    className="flex-1 py-3 px-4 rounded-xl text-center font-medium transition-all bg-slate-800/80 border border-white/10 hover:border-blue-500/50 text-white"
                >
                    {langLabel[to]}
                </button>
            </div>

            {/* Translation Area */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Input */}
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

                {/* Output */}
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
                    <div className="absolute bottom-3 right-4 flex items-center gap-2">
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

            {/* Keyboard shortcuts hint */}
            <div className="w-full max-w-5xl mt-4 text-center text-xs text-slate-600">
                Auto-translate after 0.8s • Press Swap (⇄) to reverse
            </div>

            {/* Background effects */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[100px]" />
            </div>
        </div>
    )
}
