'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { BackToTop } from './BackToTop'
import { TweetSearch } from './TweetSearch'

interface SavedUser {
    _id: string
    username: string
}

const PINNED_USERNAME = process.env.NEXT_PUBLIC_PINNED_USERNAME || ''

const TABS = [
    { href: '/tweets/for-you', label: 'For You', emoji: '✨' },
    { href: '/tweets/following', label: 'Following', emoji: '👥' },
    { href: '/tweets/pinned', label: 'Pinned', emoji: '📌' },
    { href: '/tweets/likes', label: 'Liked', emoji: '❤️' },
] as const

export function TweetsShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()

    const [users, setUsers] = useState<SavedUser[]>([])
    const [inputUser, setInputUser] = useState('')
    const [searchExpanded, setSearchExpanded] = useState(false)
    const [tagsExpanded, setTagsExpanded] = useState(false)

    const isUserPage = pathname.startsWith('/tweets/user/')
    const currentUsername = isUserPage ? pathname.split('/tweets/user/')[1] : null

    useEffect(() => {
        fetch('/api/twitter-users')
            .then(r => r.json())
            .then(d => { if (d.success) setUsers(d.data) })
            .catch(() => { })
    }, [])

    const handleQuickAdd = useCallback(async () => {
        const name = inputUser.trim().replace(/^@/, '')
        if (!name) return

        router.push(`/tweets/user/${name}`)
        setInputUser('')

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
    }, [inputUser, users, router])

    const handleUserTagClick = (username: string) => {
        router.push(`/tweets/user/${username}`)
        setTagsExpanded(false)
    }

    return (
        <div className="bg-[#0a0a0a] text-slate-200 font-sans min-h-screen flex flex-col items-center px-0 py-4 md:p-8 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#1a1200] via-[#0a0a0a] to-[#0a0a0a] relative">
            {/* Title */}
            <div className="w-full max-w-3xl mx-auto mb-8 z-10 px-4 md:px-0">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl text-[#ff9900]">𝕏</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#ff9900]">Tweets</h1>
                </div>
            </div>

            {/* Feed area */}
            <div className="w-full max-w-3xl mx-auto z-10 px-4 md:px-0 mb-8">
                <div className="space-y-3">
                    {/* ═══ Search Toggle ═══ */}
                    <button
                        onClick={() => setSearchExpanded(!searchExpanded)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition cursor-pointer ${searchExpanded
                            ? 'bg-[#ff9900]/10 border-[#ff9900]/30 text-[#ff9900]'
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
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/60 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#ff9900]/50 transition"
                                />
                                <button
                                    onClick={handleQuickAdd}
                                    disabled={!inputUser.trim()}
                                    className="px-4 py-2.5 rounded-xl bg-[#ff9900] text-white text-sm font-semibold hover:bg-[#e68a00] transition disabled:opacity-40 cursor-pointer"
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
                                                {currentUsername ? `@${currentUsername}` : `${users.length} saved users`}
                                            </span>
                                        </div>
                                        <span className={`text-slate-400 text-xs transition-transform ${tagsExpanded ? 'rotate-180' : ''}`}>▼</span>
                                    </div>

                                    {/* Tags - always visible on desktop, toggle on mobile */}
                                    <div className={`${tagsExpanded ? 'mt-2 flex' : 'hidden'} md:flex flex-wrap gap-1.5`}>
                                        {users.map(u => (
                                            <button
                                                key={u._id}
                                                onClick={() => handleUserTagClick(u.username)}
                                                className={`px-3 py-1 rounded-full text-xs transition cursor-pointer ${isUserPage && currentUsername === u.username
                                                    ? 'bg-[#ff9900]/20 text-[#ff9900] border border-[#ff9900]/40'
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
                            {TABS.map(({ href, label, emoji }) => {
                                const isActive = pathname === href || (href === '/tweets/for-you' && pathname === '/tweets')
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`flex-1 py-3 text-sm font-semibold transition relative text-center ${isActive
                                            ? 'text-white'
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                            }`}
                                    >
                                        <span className="mr-1.5">{emoji}</span>
                                        {label}
                                        {isActive && (
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#ff9900] rounded-full" />
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    {/* ═══ Back button (when viewing user) ═══ */}
                    {isUserPage && (
                        <button
                            onClick={() => router.back()}
                            className="fixed bottom-4 left-4 md:bottom-auto md:top-4 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/10 text-slate-400 text-xs hover:text-white hover:border-white/20 transition cursor-pointer"
                        >
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
                            </svg>
                            Back to feed
                        </button>
                    )}

                    {/* ═══ Sub-page content ═══ */}
                    {children}
                </div>
            </div>

            {/* Tweet Search + Embed */}
            <TweetSearch />

            <BackToTop />

            {/* Background */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-600/10 rounded-full blur-[100px]" />
            </div>
        </div>
    )
}
