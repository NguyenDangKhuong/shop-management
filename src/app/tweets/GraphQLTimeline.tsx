'use client'

import { useEffect, useState } from 'react'
import { GraphQLTweets } from './GraphQLTweets'

interface SavedUser {
    _id: string
    username: string
}

/**
 * GraphQLTimeline — Hiển thị tweets từ GraphQL API với pagination
 * Luôn hiện, không collapse
 */
export function GraphQLTimeline() {
    const [users, setUsers] = useState<SavedUser[]>([])
    const [selectedUser, setSelectedUser] = useState<string | null>('linhnhi_69')
    const [inputUser, setInputUser] = useState('')
    const [tagsExpanded, setTagsExpanded] = useState(false)
    const [userHistory, setUserHistory] = useState<string[]>([])

    // Load saved users from DB on mount
    useEffect(() => {
        fetch('/api/twitter-users')
            .then(r => r.json())
            .then(d => { if (d.success) setUsers(d.data) })
            .catch(() => { })
    }, [])

    /** Navigate to a new user from clicking @username inside a tweet */
    const handleUserClick = (newUser: string) => {
        if (selectedUser && newUser !== selectedUser) {
            setUserHistory(prev => [...prev, selectedUser])
        }
        setSelectedUser(newUser)
    }

    /** Go back to previous user */
    const handleBack = () => {
        if (userHistory.length === 0) return
        const prev = userHistory[userHistory.length - 1]
        setUserHistory(h => h.slice(0, -1))
        setSelectedUser(prev)
    }

    /**
     * Handle adding a username via the quick-browse input.
     * 1. Set selectedUser immediately → UI switches to the new user's timeline without waiting
     * 2. If user is not already in the saved list, POST to DB in the background
     * 3. On success, prepend the new user to the local list so it appears in tags
     */
    const handleQuickAdd = async () => {
        const name = inputUser.trim().replace(/^@/, '') // Strip @ prefix if present
        if (!name) return
        setSelectedUser(name) // Switch timeline immediately (optimistic)
        setInputUser('') // Clear input
        setUserHistory([]) // Clear navigation history on manual browse

        // Save to DB if not already in list (case-insensitive check)
        if (!users.some(u => u.username.toLowerCase() === name.toLowerCase())) {
            try {
                const res = await fetch('/api/twitter-users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: name }),
                })
                const data = await res.json()
                if (data.success) {
                    setUsers(prev => [data.data, ...prev]) // Prepend to tag list
                }
            } catch { }
        }
    }

    // Determine which user's tweets to display: explicit selection > last saved user
    const activeUser = selectedUser || (users.length > 0 ? users[users.length - 1]?.username : null)

    return (
        <div className="w-full max-w-3xl mx-auto z-10 px-4 md:px-0">
            <div className="space-y-4">
                {/* Quick username input */}
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
                        className="px-4 py-2.5 rounded-xl bg-[#1d9bf0] text-white text-sm font-semibold hover:bg-[#1a8cd8] transition disabled:opacity-40"
                    >
                        Browse
                    </button>
                </div>

                {/* User quick-select */}
                {users.length > 0 && (
                    <div>
                        {/* Mobile: collapsed bar */}
                        <div
                            className="md:hidden flex items-center justify-between cursor-pointer"
                            onClick={() => setTagsExpanded(!tagsExpanded)}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-slate-400 text-xs">
                                    {activeUser ? `@${activeUser}` : `@${users[users.length - 1]?.username || ''}`}
                                </span>
                                <span className="text-slate-500 text-[10px]">
                                    ({users.length} users)
                                </span>
                            </div>
                            <span className={`text-slate-400 text-xs transition-transform ${tagsExpanded ? 'rotate-180' : ''}`}>
                                ▼
                            </span>
                        </div>

                        {/* Tags - always visible on desktop, toggle on mobile */}
                        <div className={`${tagsExpanded ? 'mt-2 flex' : 'hidden'} md:flex flex-wrap gap-1.5`}>
                            {users.map(u => (
                                <button
                                    key={u._id}
                                    onClick={() => { setSelectedUser(u.username); setTagsExpanded(false); setUserHistory([]) }}
                                    className={`px-3 py-1 rounded-full text-xs transition ${activeUser === u.username
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

                {/* Back button — shows when navigated via @username click */}
                {userHistory.length > 0 && (
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-white/10 text-slate-400 text-xs hover:text-white hover:border-white/20 transition cursor-pointer"
                    >
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z" />
                        </svg>
                        ← Back to @{userHistory[userHistory.length - 1]}
                    </button>
                )}

                {/* Tweet Timeline — onUserClick allows clicking @username in tweets to navigate */}
                {activeUser ? (
                    <GraphQLTweets key={activeUser} username={activeUser} onUserClick={handleUserClick} />
                ) : (
                    <div className="text-center py-12 text-slate-500 text-sm">
                        Enter a username to browse their tweets
                    </div>
                )}
            </div>
        </div>
    )
}

