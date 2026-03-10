'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import { TweetData, TweetCard, ImagePreview, GraphQLTweets } from './GraphQLTweets'

interface SavedUser {
    _id: string
    username: string
}

type FeedMode = 'for_you' | 'following' | 'user'

/**
 * TweetsFeed — Unified feed combining HomeFeed + GraphQLTimeline
 *
 * Layout:
 *   1. Quick username input + saved user tags (from old GraphQLTimeline)
 *   2. Tabs: For You | Following (from old HomeFeed)
 *   3. Tweet list: home feed tweets OR user's tweets (swaps in-place)
 *
 * Clicking @username in tweets or user tags switches to that user's timeline.
 * Back button returns to previous view.
 */
export function TweetsFeed() {
    // ─── Feed state ──────────────────────────────────────────────────────
    const [mode, setMode] = useState<FeedMode>('for_you')
    const [selectedUser, setSelectedUser] = useState<string | null>(null)
    const [userHistory, setUserHistory] = useState<string[]>([])
    const [previousMode, setPreviousMode] = useState<'for_you' | 'following'>('for_you')

    // ─── Home feed state ─────────────────────────────────────────────────
    const [tweets, setTweets] = useState<TweetData[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState('')
    const [cursorBottom, setCursorBottom] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const [previewState, setPreviewState] = useState<{ images: string[]; index: number } | null>(null)

    // ─── Saved users state (from GraphQLTimeline) ────────────────────────
    const [users, setUsers] = useState<SavedUser[]>([])
    const [inputUser, setInputUser] = useState('')
    const [tagsExpanded, setTagsExpanded] = useState(false)
    const [searchExpanded, setSearchExpanded] = useState(false)

    const videoProxyUrl = process.env.NEXT_PUBLIC_VIDEO_PROXY_URL || ''

    // Load saved users from DB
    useEffect(() => {
        fetch('/api/twitter-users')
            .then(r => r.json())
            .then(d => { if (d.success) setUsers(d.data) })
            .catch(() => { })
    }, [])

    // ─── Home feed fetch ─────────────────────────────────────────────────
    const fetchHomeTweets = useCallback(async (tab: 'for_you' | 'following', cursor?: string) => {
        const isLoadMore = !!cursor
        if (isLoadMore) setLoadingMore(true)
        else setLoading(true)
        setError('')

        try {
            const params = new URLSearchParams({ tab, count: '20' })
            if (cursor) params.set('cursor', cursor)
            const res = await fetch(`/api/tweets/home?${params}`)
            const data = await res.json()

            if (!data.success) {
                setError(data.error || 'Failed to load')
                return
            }

            const newTweets = data.data.tweets as TweetData[]
            if (isLoadMore) {
                setTweets(prev => [...prev, ...newTweets])
            } else {
                setTweets(newTweets)
            }
            setCursorBottom(data.data.cursors.bottom || '')
            setHasMore(!!data.data.cursors.bottom && newTweets.length > 0)
        } catch {
            setError('Network error')
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }, [])

    // Fetch when tab changes (only for home feed modes)
    useEffect(() => {
        if (mode === 'for_you' || mode === 'following') {
            setTweets([])
            setCursorBottom('')
            setHasMore(true)
            fetchHomeTweets(mode)
        }
    }, [mode, fetchHomeTweets])

    // ─── Infinite scroll for home feed ───────────────────────────────────
    const sentinelRef = useRef<HTMLDivElement>(null)
    const loadingMoreRef = useRef(false)
    loadingMoreRef.current = loadingMore
    const hasMoreRef = useRef(true)
    hasMoreRef.current = hasMore

    useEffect(() => {
        const el = sentinelRef.current
        if (!el || mode === 'user') return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMoreRef.current && !loadingMoreRef.current) {
                    fetchHomeTweets(mode as 'for_you' | 'following', cursorBottom)
                }
            },
            { rootMargin: '400px' }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [mode, cursorBottom, fetchHomeTweets])

    // ─── User navigation ─────────────────────────────────────────────────
    const handleUserClick = (username: string) => {
        if (mode !== 'user') {
            setPreviousMode(mode as 'for_you' | 'following')
        }
        if (selectedUser && username !== selectedUser) {
            setUserHistory(prev => [...prev, selectedUser])
        }
        setSelectedUser(username)
        setMode('user')
    }

    const handleBack = () => {
        if (userHistory.length > 0) {
            const prev = userHistory[userHistory.length - 1]
            setUserHistory(h => h.slice(0, -1))
            setSelectedUser(prev)
        } else {
            // No history — go back to home feed
            setSelectedUser(null)
            setMode(previousMode)
        }
    }

    const handleQuickAdd = async () => {
        const name = inputUser.trim().replace(/^@/, '')
        if (!name) return
        handleUserClick(name)
        setInputUser('')
        setUserHistory([])

        if (!users.some(u => u.username.toLowerCase() === name.toLowerCase())) {
            try {
                const res = await fetch('/api/twitter-users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: name }),
                })
                const data = await res.json()
                if (data.success) {
                    setUsers(prev => [data.data, ...prev])
                }
            } catch { }
        }
    }

    const handleTabSwitch = (newMode: 'for_you' | 'following') => {
        setMode(newMode)
        setSelectedUser(null)
        setUserHistory([])
    }

    // ─── Render ──────────────────────────────────────────────────────────
    return (
        <div className="w-full max-w-3xl mx-auto z-10 px-4 md:px-0 mb-8">
            <div className="space-y-3">
                {/* ═══ Search Toggle ═══ */}
                <button
                    onClick={() => setSearchExpanded(!searchExpanded)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition cursor-pointer ${searchExpanded
                        ? 'bg-[#1d9bf0]/10 border-[#1d9bf0]/30 text-[#1d9bf0]'
                        : 'bg-slate-800/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                        <path d="M10.25 3.75a6.5 6.5 0 100 13 6.5 6.5 0 000-13zm-8.5 6.5a8.5 8.5 0 1117.09 5.17l4.62 4.62a1 1 0 01-1.42 1.42l-4.62-4.62A8.5 8.5 0 011.75 10.25z" />
                    </svg>
                    {searchExpanded ? 'Hide search' : 'Browse user'}
                    {users.length > 0 && !searchExpanded && (
                        <span className="text-slate-600">({users.length})</span>
                    )}
                </button>

                {/* ═══ Username Search + Tags (collapsible) ═══ */}
                {searchExpanded && (
                    <>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputUser}
                                onChange={e => setInputUser(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleQuickAdd()}
                                placeholder="Enter @username to browse..."
                                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/60 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#1d9bf0]/50 transition"
                            />
                            <button
                                onClick={handleQuickAdd}
                                disabled={!inputUser.trim()}
                                className="px-4 py-2.5 rounded-xl bg-[#1d9bf0] text-white text-sm font-semibold hover:bg-[#1a8cd8] transition disabled:opacity-40 cursor-pointer"
                            >
                                Browse
                            </button>
                        </div>

                        {/* Saved user tags */}
                        {users.length > 0 && (
                            <div>
                                {/* Mobile: collapsed bar */}
                                <div
                                    className="md:hidden flex items-center justify-between cursor-pointer"
                                    onClick={() => setTagsExpanded(!tagsExpanded)}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-slate-400 text-xs">
                                            {selectedUser ? `@${selectedUser}` : `${users.length} saved users`}
                                        </span>
                                    </div>
                                    <span className={`text-slate-400 text-xs transition-transform ${tagsExpanded ? 'rotate-180' : ''}`}>▼</span>
                                </div>

                                {/* Tags - always visible on desktop, toggle on mobile */}
                                <div className={`${tagsExpanded ? 'mt-2 flex' : 'hidden'} md:flex flex-wrap gap-1.5`}>
                                    {users.map(u => (
                                        <button
                                            key={u._id}
                                            onClick={() => { handleUserClick(u.username); setTagsExpanded(false); setUserHistory([]) }}
                                            className={`px-3 py-1 rounded-full text-xs transition cursor-pointer ${mode === 'user' && selectedUser === u.username
                                                ? 'bg-[#1d9bf0]/20 text-[#1d9bf0] border border-[#1d9bf0]/40'
                                                : 'bg-slate-800/60 text-slate-400 border border-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            @{u.username}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* ═══ Tab Bar ═══ */}
                <div className="bg-slate-900/40 rounded-xl border border-white/10 overflow-hidden">
                    <div className="flex">
                        {([
                            { key: 'for_you' as const, label: 'For You', emoji: '✨' },
                            { key: 'following' as const, label: 'Following', emoji: '👥' },
                        ]).map(({ key, label, emoji }) => (
                            <button
                                key={key}
                                onClick={() => handleTabSwitch(key)}
                                className={`flex-1 py-3 text-sm font-semibold transition relative cursor-pointer ${mode === key
                                    ? 'text-white'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                    }`}
                            >
                                <span className="mr-1.5">{emoji}</span>
                                {label}
                                {mode === key && (
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#1d9bf0] rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ═══ Back button (when viewing user) — fixed at top ═══ */}
                {mode === 'user' && (
                    <button
                        onClick={handleBack}
                        className="fixed top-4 left-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/10 text-slate-400 text-xs hover:text-white hover:border-white/20 transition cursor-pointer"
                    >
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
                        </svg>
                        {userHistory.length > 0 ? `Back to @${userHistory[userHistory.length - 1]}` : 'Back to feed'}
                    </button>
                )}

                {/* ═══ Tweet List ═══ */}
                {mode === 'user' && selectedUser ? (
                    /* User timeline — uses GraphQLTweets with its own pagination */
                    <GraphQLTweets key={selectedUser} username={selectedUser} onUserClick={handleUserClick} />
                ) : (
                    /* Home feed — For You / Following */
                    <>
                        {loading && (
                            <div className="bg-slate-900/40 rounded-2xl border border-white/10 overflow-hidden">
                                <div className="flex items-center justify-center py-16">
                                    <div className="w-6 h-6 border-2 border-[#1d9bf0] border-t-transparent rounded-full animate-spin" />
                                </div>
                            </div>
                        )}

                        {error && !loading && (
                            <div className="bg-slate-900/40 rounded-2xl border border-white/10 p-6 text-center">
                                <p className="text-red-400 text-sm">{error}</p>
                                <button
                                    onClick={() => fetchHomeTweets(mode as 'for_you' | 'following')}
                                    className="mt-3 text-[#1d9bf0] text-sm hover:underline cursor-pointer"
                                >
                                    Thử lại
                                </button>
                            </div>
                        )}

                        {!loading && !error && tweets.length > 0 && (
                            <div className="bg-slate-900/40 rounded-2xl border border-white/10 overflow-hidden">
                                <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                                    <span className="text-lg">{mode === 'for_you' ? '✨' : '👥'}</span>
                                    <span className="font-bold text-white text-sm">
                                        {mode === 'for_you' ? 'For You' : 'Following'}
                                    </span>
                                    <span className="ml-auto text-slate-600 text-xs">{tweets.length} tweets</span>
                                </div>

                                {tweets.map(tweet => (
                                    <TweetCard
                                        key={tweet.id}
                                        tweet={tweet}
                                        videoProxyUrl={videoProxyUrl}
                                        onUserClick={handleUserClick}
                                        onImageClick={(url) => {
                                            const allPhotos = tweet.media.filter(m => m.type === 'photo').map(m => m.url)
                                            const idx = allPhotos.indexOf(url)
                                            setPreviewState({ images: allPhotos, index: idx >= 0 ? idx : 0 })
                                        }}
                                    />
                                ))}

                                {hasMore && (
                                    <div ref={sentinelRef} className="px-4 py-4 text-center">
                                        {loadingMore ? (
                                            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                                                <span className="w-4 h-4 border-2 border-[#1d9bf0] border-t-transparent rounded-full animate-spin" />
                                                Loading more...
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => fetchHomeTweets(mode as 'for_you' | 'following', cursorBottom)}
                                                className="text-[#1d9bf0] text-xs hover:underline opacity-50 cursor-pointer"
                                            >
                                                Load more
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {!loading && !error && tweets.length === 0 && (
                            <div className="text-center py-8 text-slate-500 text-sm">
                                No tweets found. Try refreshing or check credentials.
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Image Preview Lightbox */}
            {previewState && <ImagePreview images={previewState.images} index={previewState.index} onClose={() => setPreviewState(null)} onNavigate={(i) => setPreviewState(prev => prev ? { ...prev, index: i } : null)} />}
        </div>
    )
}
