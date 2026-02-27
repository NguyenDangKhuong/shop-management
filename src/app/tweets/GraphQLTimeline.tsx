'use client'

import { useEffect, useState } from 'react'
import { GraphQLTweets } from './GraphQLTweets'

interface SavedUser {
    _id: string
    username: string
}

/**
 * GraphQLTimeline — Hiển thị tweets từ GraphQL API với pagination
 * Collapsed by default — chỉ fetch data khi user expand, tiết kiệm bandwidth
 */
export function GraphQLTimeline() {
    const [expanded, setExpanded] = useState(false)
    const [users, setUsers] = useState<SavedUser[]>([])
    const [selectedUser, setSelectedUser] = useState<string | null>(null)
    const [inputUser, setInputUser] = useState('')

    // Only load users when expanded
    useEffect(() => {
        if (!expanded) return
        fetch('/api/twitter-users')
            .then(r => r.json())
            .then(d => { if (d.success) setUsers(d.data) })
            .catch(() => { })
    }, [expanded])

    const handleQuickAdd = () => {
        const name = inputUser.trim().replace(/^@/, '')
        if (!name) return
        setSelectedUser(name)
        setInputUser('')
    }

    const activeUser = selectedUser || (users.length > 0 ? users[users.length - 1]?.username : null)

    return (
        <div className="w-full max-w-3xl mx-auto z-10 px-4 md:px-0 mt-10">
            {/* Collapse/Expand Header */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-800/40 border border-white/10 hover:border-white/20 transition group"
            >
                <div className="flex items-center gap-3">
                    <h2 className="text-lg font-bold text-white">📡 GraphQL Tweets</h2>
                    <span className="text-xs text-slate-500 bg-slate-900/60 px-2 py-0.5 rounded-full border border-white/5">
                        Pagination
                    </span>
                </div>
                <span className={`text-slate-400 text-sm transition-transform ${expanded ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>

            {/* Content — only rendered when expanded */}
            {expanded && (
                <div className="mt-4 space-y-4">
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
                        <div className="flex flex-wrap gap-1.5">
                            {users.map(u => (
                                <button
                                    key={u._id}
                                    onClick={() => setSelectedUser(u.username)}
                                    className={`px-3 py-1 rounded-full text-xs transition ${activeUser === u.username
                                        ? 'bg-[#1d9bf0]/20 text-[#1d9bf0] border border-[#1d9bf0]/40'
                                        : 'bg-slate-800/60 text-slate-400 border border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    @{u.username}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Tweet Timeline */}
                    {activeUser ? (
                        <GraphQLTweets key={activeUser} username={activeUser} />
                    ) : (
                        <div className="text-center py-12 text-slate-500 text-sm">
                            Enter a username to browse their tweets
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
