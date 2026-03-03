'use client'

import { useCallback, useEffect, useState, useRef } from 'react'

interface TweetMedia {
    type: 'photo' | 'video' | 'animated_gif'
    url: string
    width: number
    height: number
    videoUrl?: string
}

interface TweetData {
    id: string
    text: string
    createdAt: string
    user: {
        name: string
        screenName: string
        avatar: string
        verified: boolean
    }
    metrics: {
        replies: number
        retweets: number
        likes: number
        views: number
    }
    media: TweetMedia[]
    isRetweet: boolean
    retweetUser?: { name: string; screenName: string }
    quotedTweet?: TweetData
}

function formatCount(n: number): string {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
    if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
    return n.toString()
}

function timeAgo(dateStr: string): string {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000)
    if (diff < 60) return `${diff}s`
    if (diff < 3600) return `${Math.floor(diff / 60)}m`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`
    if (diff < 604800) return `${Math.floor(diff / 86400)}d`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** Replace t.co URLs with display URLs and linkify @mentions and #hashtags */
function formatTweetText(text: string): string {
    // Remove t.co media URLs at the end
    let cleaned = text.replace(/https:\/\/t\.co\/\w+$/g, '').trim()
    // Linkify remaining URLs
    cleaned = cleaned.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener" class="text-[#1d9bf0] hover:underline">$1</a>'
    )
    // @mentions
    cleaned = cleaned.replace(
        /@(\w+)/g,
        '<span class="text-[#1d9bf0]">@$1</span>'
    )
    // #hashtags
    cleaned = cleaned.replace(
        /#(\w+)/g,
        '<span class="text-[#1d9bf0]">#$1</span>'
    )
    return cleaned
}

function ImagePreview({ src, onClose }: { src: string; onClose: () => void }) {
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handleKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [onClose])

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
            onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white text-xl transition cursor-pointer z-10"
            >
                ✕
            </button>
            <img
                src={src}
                alt=""
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl animate-[scaleIn_0.2s_ease-out]"
            />
        </div>
    )
}

function MediaGrid({ media, videoProxyUrl, onImageClick }: { media: TweetMedia[]; videoProxyUrl: string; onImageClick?: (url: string) => void }) {
    if (media.length === 0) return null

    const gridClass = media.length === 1
        ? 'grid-cols-1'
        : media.length === 2
            ? 'grid-cols-2'
            : media.length === 3
                ? 'grid-cols-2'
                : 'grid-cols-2'

    return (
        <div className={`grid ${gridClass} gap-0.5 rounded-2xl overflow-hidden mt-3`}>
            {media.map((m, i) => {
                if (m.type === 'photo') {
                    return (
                        <img
                            key={i}
                            src={m.url}
                            alt=""
                            className={`w-full object-cover cursor-pointer hover:brightness-90 transition ${media.length === 1
                                ? 'max-h-[500px] rounded-2xl'
                                : media.length === 3 && i === 0
                                    ? 'row-span-2 h-full'
                                    : 'aspect-square'
                                }`}
                            loading="lazy"
                            onClick={() => onImageClick?.(m.url)}
                        />
                    )
                }
                if (m.type === 'video' || m.type === 'animated_gif') {
                    const src = videoProxyUrl
                        ? `${videoProxyUrl}/?url=${encodeURIComponent(m.videoUrl || '')}`
                        : `/api/tweets/video?url=${encodeURIComponent(m.videoUrl || '')}`
                    return (
                        <div key={i} className="relative rounded-2xl overflow-hidden">
                            <video
                                controls
                                playsInline
                                preload="metadata"
                                poster={m.url}
                                className="w-full max-h-[500px]"
                                loop={m.type === 'animated_gif'}
                                muted={m.type === 'animated_gif'}
                            >
                                <source src={src} type="video/mp4" />
                            </video>
                            {m.type === 'animated_gif' && (
                                <span className="absolute bottom-2 left-2 px-1.5 py-0.5 bg-black/70 text-white text-[10px] rounded font-semibold">GIF</span>
                            )}
                        </div>
                    )
                }
                return null
            })}
        </div>
    )
}

function TweetCard({ tweet, videoProxyUrl, onUserClick, onImageClick }: { tweet: TweetData; videoProxyUrl: string; onUserClick?: (username: string) => void; onImageClick?: (url: string) => void }) {
    return (
        <article className="px-4 py-3 border-b border-white/5 hover:bg-white/[0.02] transition">
            {/* Retweet indicator */}
            {tweet.isRetweet && tweet.retweetUser && (
                <div className="flex items-center gap-2 ml-10 mb-1 text-slate-500 text-xs">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V19.5H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4.5h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 16.12V8.75c0-.97-.784-1.75-1.75-1.75z" /></svg>
                    <span>{tweet.retweetUser.name} reposted</span>
                </div>
            )}

            <div className="flex gap-3">
                {/* Avatar */}
                <img
                    src={tweet.user.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full shrink-0 mt-0.5"
                />

                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center gap-1 text-sm">
                        <span className="font-bold text-white truncate">{tweet.user.name}</span>
                        {tweet.user.verified && (
                            <svg viewBox="0 0 22 22" className="w-4 h-4 fill-[#1d9bf0] shrink-0"><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.855-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.607-.274 1.264-.144 1.897.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" /></svg>
                        )}
                        <button onClick={() => onUserClick?.(tweet.user.screenName)} className="text-slate-500 truncate hover:text-[#1d9bf0] hover:underline transition cursor-pointer">@{tweet.user.screenName}</button>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-500 shrink-0">{timeAgo(tweet.createdAt)}</span>
                    </div>

                    {/* Text */}
                    <p
                        className="text-[15px] text-slate-200 leading-relaxed mt-0.5 whitespace-pre-wrap break-words"
                        dangerouslySetInnerHTML={{ __html: formatTweetText(tweet.text) }}
                    />

                    {/* Media */}
                    <MediaGrid media={tweet.media} videoProxyUrl={videoProxyUrl} onImageClick={onImageClick} />

                    {/* Quoted tweet */}
                    {tweet.quotedTweet && (
                        <div className="mt-3 border border-white/10 rounded-2xl overflow-hidden">
                            <div className="px-3 py-2">
                                <div className="flex items-center gap-1.5 text-sm">
                                    <img src={tweet.quotedTweet.user.avatar} alt="" className="w-5 h-5 rounded-full" />
                                    <span className="font-bold text-white text-xs">{tweet.quotedTweet.user.name}</span>
                                    <button onClick={() => onUserClick?.(tweet.quotedTweet!.user.screenName)} className="text-slate-500 text-xs hover:text-[#1d9bf0] hover:underline transition cursor-pointer">@{tweet.quotedTweet.user.screenName}</button>
                                </div>
                                <p className="text-sm text-slate-300 mt-1" dangerouslySetInnerHTML={{ __html: formatTweetText(tweet.quotedTweet.text) }} />
                                <MediaGrid media={tweet.quotedTweet.media} videoProxyUrl={videoProxyUrl} onImageClick={onImageClick} />
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-3 max-w-[425px] -ml-2">
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-[#1d9bf0] transition group px-2 py-1.5 rounded-full hover:bg-[#1d9bf0]/10">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" /></svg>
                            <span className="text-xs">{formatCount(tweet.metrics.replies)}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-[#00ba7c] transition group px-2 py-1.5 rounded-full hover:bg-[#00ba7c]/10">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V19.5H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4.5h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 16.12V8.75c0-.97-.784-1.75-1.75-1.75z" /></svg>
                            <span className="text-xs">{formatCount(tweet.metrics.retweets)}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-[#f91880] transition group px-2 py-1.5 rounded-full hover:bg-[#f91880]/10">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.7-.514-6.67.89-1.93 2.754-3.17 4.665-3.27 1.93-.1 3.63.56 4.93 2.01 1.3-1.45 3-2.11 4.93-2.01 1.91.1 3.78 1.34 4.66 3.27.9 1.97.85 4.17-.51 6.67z" /></svg>
                            <span className="text-xs">{formatCount(tweet.metrics.likes)}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-slate-500 hover:text-[#1d9bf0] transition px-2 py-1.5 rounded-full hover:bg-[#1d9bf0]/10">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21v-5.5h2V21H4z" /></svg>
                            <span className="text-xs">{formatCount(tweet.metrics.views)}</span>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

interface GraphQLTweetsProps {
    username: string
    onUserClick?: (username: string) => void
}

export function GraphQLTweets({ username, onUserClick }: GraphQLTweetsProps) {
    const [tweets, setTweets] = useState<TweetData[]>([])
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState('')
    const [cursorBottom, setCursorBottom] = useState('')
    const [hasMore, setHasMore] = useState(true)
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    const videoProxyUrl = process.env.NEXT_PUBLIC_VIDEO_PROXY_URL || ''

    const fetchTweets = useCallback(async (cursor?: string) => {
        const isLoadMore = !!cursor
        if (isLoadMore) setLoadingMore(true)
        else setLoading(true)
        setError('')

        try {
            const params = new URLSearchParams({ username, count: '20' })
            if (cursor) params.set('cursor', cursor)
            const res = await fetch(`/api/tweets/graphql?${params}`)
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
    }, [username])

    useEffect(() => {
        fetchTweets()
    }, [fetchTweets])

    if (loading) {
        return (
            <div className="bg-slate-900/40 rounded-2xl border border-white/10 overflow-hidden">
                <div className="flex items-center justify-center py-16">
                    <div className="w-6 h-6 border-2 border-[#1d9bf0] border-t-transparent rounded-full animate-spin" />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-slate-900/40 rounded-2xl border border-white/10 p-6 text-center">
                <p className="text-red-400 text-sm">{error}</p>
                <button
                    onClick={() => fetchTweets()}
                    className="mt-3 text-[#1d9bf0] text-sm hover:underline"
                >
                    Thử lại
                </button>
            </div>
        )
    }

    if (tweets.length === 0) return null

    return (
        <>
            <div className="bg-slate-900/40 rounded-2xl border border-white/10 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                    <img src={tweets[0].user.avatar} alt="" className="w-8 h-8 rounded-full" />
                    <div>
                        <span className="font-bold text-white text-sm">{tweets[0].user.name}</span>
                        <span className="text-slate-500 text-sm ml-1.5">@{username}</span>
                    </div>
                    <span className="ml-auto text-slate-600 text-xs">{tweets.length} tweets</span>
                </div>

                {/* Tweets */}
                {tweets.map(tweet => (
                    <TweetCard key={tweet.id} tweet={tweet} videoProxyUrl={videoProxyUrl} onUserClick={onUserClick} onImageClick={setPreviewImage} />
                ))}

                {/* Load More */}
                {hasMore && (
                    <div className="px-4 py-4 text-center">
                        <button
                            onClick={() => fetchTweets(cursorBottom)}
                            disabled={loadingMore}
                            className="px-6 py-2.5 rounded-full bg-[#1d9bf0] text-white text-sm font-semibold hover:bg-[#1a8cd8] transition disabled:opacity-50"
                        >
                            {loadingMore ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Loading...
                                </span>
                            ) : 'Load more tweets'}
                        </button>
                    </div>
                )}
            </div>

            {/* Image Preview Lightbox */}
            {previewImage && <ImagePreview src={previewImage} onClose={() => setPreviewImage(null)} />}

            {/* Keyframe animations for lightbox */}
            <style jsx global>{`
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes scaleIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
        `}</style>
        </>
    )
}
