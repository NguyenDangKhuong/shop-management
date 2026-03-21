'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { TweetData, TweetCard, ImagePreview } from './GraphQLTweets'

interface HomeFeedProps {
    tab: 'for_you' | 'following'
}

export function HomeFeed({ tab }: HomeFeedProps) {
    const router = useRouter()
    const [tweets, setTweets] = useState<TweetData[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState('')
    const [cursorBottom, setCursorBottom] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const [previewState, setPreviewState] = useState<{ images: string[]; index: number } | null>(null)

    const videoProxyUrl = process.env.NEXT_PUBLIC_VIDEO_PROXY_URL || ''

    const fetchHomeTweets = useCallback(async (cursor?: string) => {
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
    }, [tab])

    useEffect(() => {
        setTweets([])
        setCursorBottom('')
        setHasMore(true)
        fetchHomeTweets()
    }, [fetchHomeTweets])

    // Infinite scroll
    const sentinelRef = useRef<HTMLDivElement>(null)
    const loadingMoreRef = useRef(false)
    loadingMoreRef.current = loadingMore
    const hasMoreRef = useRef(true)
    hasMoreRef.current = hasMore

    useEffect(() => {
        const el = sentinelRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasMoreRef.current && !loadingMoreRef.current) {
                    fetchHomeTweets(cursorBottom)
                }
            },
            { rootMargin: '400px' }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [cursorBottom, fetchHomeTweets])

    const handleUserClick = (username: string) => {
        router.push(`/tweets/user/${username}`)
    }

    if (loading) {
        return (
            <div className="bg-slate-900/40 rounded-2xl border border-white/10 overflow-hidden">
                <div className="flex items-center justify-center py-16">
                    <div className="w-6 h-6 border-2 border-[#ff9900] border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        )
    }

    if (error && !loading) {
        return (
            <div className="bg-slate-900/40 rounded-2xl border border-white/10 p-6 text-center">
                <p className="text-red-400 text-sm">{error}</p>
                <button
                    onClick={() => fetchHomeTweets()}
                    className="mt-3 text-[#ff9900] text-sm hover:underline cursor-pointer"
                >
                    Thử lại
                </button>
            </div>
        )
    }

    if (!loading && !error && tweets.length === 0) {
        return (
            <div className="text-center py-8 text-slate-500 text-sm">
                No tweets found. Try refreshing or check credentials.
            </div>
        )
    }

    return (
        <>
            <div className="bg-slate-900/40 rounded-2xl border border-white/10 overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                    <span className="text-lg">{tab === 'for_you' ? '✨' : '👥'}</span>
                    <span className="font-bold text-white text-sm">
                        {tab === 'for_you' ? 'For You' : 'Following'}
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
                                <span className="w-4 h-4 border-2 border-[#ff9900] border-t-transparent rounded-full animate-spin" />
                                Loading more...
                            </div>
                        ) : (
                            <button
                                onClick={() => fetchHomeTweets(cursorBottom)}
                                className="text-[#ff9900] text-xs hover:underline opacity-50 cursor-pointer"
                            >
                                Load more
                            </button>
                        )}
                    </div>
                )}
            </div>

            {previewState && <ImagePreview images={previewState.images} index={previewState.index} onClose={() => setPreviewState(null)} onNavigate={(i) => setPreviewState(prev => prev ? { ...prev, index: i } : null)} />}
        </>
    )
}
