'use client'

import { useState, useCallback } from 'react'

export function TweetSearch() {
    const [input, setInput] = useState('')
    const [username, setUsername] = useState('')

    const handleSearch = useCallback(() => {
        const trimmed = input.trim().replace(/^@/, '')
        if (!trimmed) return
        setUsername(trimmed)
        setInput('')
    }, [input])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch()
    }, [handleSearch])

    const handleClear = useCallback(() => {
        setUsername('')
    }, [])

    return (
        <>
            {/* Search Input */}
            <div className="w-full max-w-3xl mx-auto mb-8 z-10">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Nhập username — vd: danabramov, elonmusk"
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-800/60 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#38bdf8]/50 focus:ring-1 focus:ring-[#38bdf8]/30 transition"
                    />
                    <button
                        onClick={handleSearch}
                        disabled={!input.trim()}
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#c084fc] text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        🔍 Tìm
                    </button>
                </div>
            </div>

            {/* Timeline via publish.twitter.com embed */}
            <div className="w-full max-w-3xl mx-auto z-10">
                {username ? (
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400 text-sm">Tweets của</span>
                                <a
                                    href={`https://x.com/${username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#38bdf8] font-semibold text-sm hover:underline"
                                >
                                    @{username}
                                </a>
                            </div>
                            <button
                                onClick={handleClear}
                                className="text-xs text-slate-500 hover:text-white transition"
                            >
                                ✕ Đóng
                            </button>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-white/10">
                            <iframe
                                key={username}
                                src={`https://syndication.twitter.com/srv/timeline-profile/screen-name/${username}?dnt=true&embedId=twitter-widget-0&frame=false&hideBorder=true&hideFooter=true&hideHeader=true&hideScrollBar=false&lang=en&theme=dark&transparent=true`}
                                className="w-full border-0"
                                style={{ minHeight: '600px', colorScheme: 'dark' }}
                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                loading="lazy"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <span className="text-5xl mb-4 block opacity-50">𝕏</span>
                        <p className="text-slate-500 text-sm">
                            Nhập username X để xem tweets của họ
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}
