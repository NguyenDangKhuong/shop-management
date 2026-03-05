'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import { TweetData, TweetCard, ImagePreview } from './GraphQLTweets'

type Tab = 'for_you' | 'following'

/**
 * HomeFeed — For You / Following timeline (X home page equivalent)
 *
 * Features:
 *   - Tab switcher: "For You" (algorithmic) and "Following" (chronological)
 *   - Cursor-based pagination via /api/tweets/home
 *   - Infinite scroll using IntersectionObserver (auto-loads at 400px before bottom)
 *   - Collapse/expand toggle to save bandwidth
 *   - Image preview lightbox
 *
 * State:
 *   - tab: active feed (for_you | following)
 *   - tweets: accumulated tweet list (appended on load more)
 *   - cursorBottom: pagination cursor from last API response
 *   - hasMore: false when API returns no more tweets or no cursor
 *   - expanded: controls collapse/expand (collapsed = no API calls)
 *
 * Props:
 *   - onUserClick: callback when user clicks a username (navigates to profile)
 */
export function HomeFeed({ onUserClick }: { onUserClick?: (username: string) => void }) {
    const [tab, setTab] = useState<Tab>('for_you')
    const [tweets, setTweets] = useState<TweetData[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState('')
    const [cursorBottom, setCursorBottom] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const [previewImage, setPreviewImage] = useState<string | null>(null)
    const [expanded, setExpanded] = useState(true)

    const videoProxyUrl = process.env.NEXT_PUBLIC_VIDEO_PROXY_URL || ''

    const fetchTweets = useCallback(async (activeTab: Tab, cursor?: string) => {
        const isLoadMore = !!cursor
        if (isLoadMore) setLoadingMore(true)
        else setLoading(true)
        setError('')

        try {
            const params = new URLSearchParams({ tab: activeTab, count: '20' })
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

    useEffect(() => {
        if (expanded) {
            setTweets([])
            setCursorBottom('')
            setHasMore(true)
            fetchTweets(tab)
        }
    }, [tab, expanded, fetchTweets])

    const handleTabSwitch = (newTab: Tab) => {
        if (newTab === tab) return
        setTab(newTab)
    }

    // Infinite scroll — auto-load when sentinel enters viewport
    const sentinelRef = useRef<HTMLDivElement>(null)
    const loadingMoreRef = useRef(false)
    loadingMoreRef.current = loadingMore
    const hasMoreRef = useRef(true)
    hasMoreRef.current = hasMore

    useEffect(() => {
        const el = sentinelRef.current
        if (!el || !expanded) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMoreRef.current && !loadingMoreRef.current) {
                    fetchTweets(tab, cursorBottom)
                }
            },
            { rootMargin: '400px' }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [tab, cursorBottom, expanded, fetchTweets])

    return (
        <div className="w-full max-w-3xl mx-auto z-10 px-4 md:px-0 mb-8">
            {/* Header with collapse toggle */}
            <div
                className="flex items-center gap-2 mb-3 cursor-pointer group"
                onClick={() => setExpanded(!expanded)}
            >
                <span className="text-lg">🏠</span>
                <h2 className="text-lg font-bold text-white">Home Feed</h2>
                <span className={`text-slate-500 text-xs transition-transform ml-1 ${expanded ? 'rotate-180' : ''}`}>
                    ▼
                </span>
                <span className="text-slate-600 text-xs ml-auto">
                    {expanded ? 'click to collapse' : 'click to expand'}
                </span>
            </div>

            {!expanded && (
                <div className="text-center py-3 text-slate-600 text-xs">
                    Feed collapsed to save bandwidth
                </div>
            )}

            {expanded && (
                <div className="space-y-3">
                    {/* Tab bar — styled like X's For You / Following tabs */}
                    <div className="bg-slate-900/40 rounded-xl border border-white/10 overflow-hidden">
                        <div className="flex">
                            {([
                                { key: 'for_you' as Tab, label: 'For You', emoji: '✨' },
                                { key: 'following' as Tab, label: 'Following', emoji: '👥' },
                            ]).map(({ key, label, emoji }) => (
                                <button
                                    key={key}
                                    onClick={() => handleTabSwitch(key)}
                                    className={`flex-1 py-3 text-sm font-semibold transition relative ${tab === key
                                        ? 'text-white'
                                        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                        }`}
                                >
                                    <span className="mr-1.5">{emoji}</span>
                                    {label}
                                    {tab === key && (
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#1d9bf0] rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <div className="bg-slate-900/40 rounded-2xl border border-white/10 overflow-hidden">
                            <div className="flex items-center justify-center py-16">
                                <div className="w-6 h-6 border-2 border-[#1d9bf0] border-t-transparent rounded-full animate-spin" />
                            </div>
                        </div>
                    )}

                    {/* Error */}
                    {error && !loading && (
                        <div className="bg-slate-900/40 rounded-2xl border border-white/10 p-6 text-center">
                            <p className="text-red-400 text-sm">{error}</p>
                            <button
                                onClick={() => fetchTweets(tab)}
                                className="mt-3 text-[#1d9bf0] text-sm hover:underline"
                            >
                                Thử lại
                            </button>
                        </div>
                    )}

                    {/* Tweets */}
                    {!loading && !error && tweets.length > 0 && (
                        <div className="bg-slate-900/40 rounded-2xl border border-white/10 overflow-hidden">
                            {/* Header */}
                            <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                                <span className="text-lg">{tab === 'for_you' ? '✨' : '👥'}</span>
                                <span className="font-bold text-white text-sm">
                                    {tab === 'for_you' ? 'For You' : 'Following'}
                                </span>
                                <span className="ml-auto text-slate-600 text-xs">{tweets.length} tweets</span>
                            </div>

                            {/* Tweet list */}
                            {tweets.map(tweet => (
                                <TweetCard
                                    key={tweet.id}
                                    tweet={tweet}
                                    videoProxyUrl={videoProxyUrl}
                                    onUserClick={onUserClick}
                                    onImageClick={setPreviewImage}
                                />
                            ))}

                            {/* Infinite scroll sentinel + fallback button */}
                            {hasMore && (
                                <div ref={sentinelRef} className="px-4 py-4 text-center">
                                    {loadingMore ? (
                                        <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
                                            <span className="w-4 h-4 border-2 border-[#1d9bf0] border-t-transparent rounded-full animate-spin" />
                                            Loading more...
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => fetchTweets(tab, cursorBottom)}
                                            className="text-[#1d9bf0] text-xs hover:underline opacity-50"
                                        >
                                            Load more
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Empty state */}
                    {!loading && !error && tweets.length === 0 && (
                        <div className="text-center py-8 text-slate-500 text-sm">
                            No tweets found. Try refreshing or check credentials.
                        </div>
                    )}
                </div>
            )}

            {/* Image Preview Lightbox */}
            {previewImage && <ImagePreview src={previewImage} onClose={() => setPreviewImage(null)} />}
        </div>
    )
}
