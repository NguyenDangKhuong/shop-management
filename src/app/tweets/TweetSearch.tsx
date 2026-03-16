'use client'

import { useCallback, useEffect, useState } from 'react'

interface SavedUser {
    _id: string
    username: string
    avatarUrl?: string
}

export function TweetSearch() {
    const [input, setInput] = useState('')
    const [users, setUsers] = useState<SavedUser[]>([])
    const [adding, setAdding] = useState(false)
    const [error, setError] = useState('')
    const [selectedUser, setSelectedUser] = useState<string | null>(process.env.NEXT_PUBLIC_PINNED_USERNAME || null)
    const [deleteConfirm, setDeleteConfirm] = useState<SavedUser | null>(null)
    // Cookie state
    const [cookieModal, setCookieModal] = useState(false)
    const [cookieInput, setCookieInput] = useState('')
    const [cookieStatus, setCookieStatus] = useState<string | null>(null)
    const [cookieSaving, setCookieSaving] = useState(false)
    const [cookieError, setCookieError] = useState('')
    // Tags expand state (mobile)
    const [tagsExpanded, setTagsExpanded] = useState(false)
    // Toggle search + cookie controls
    const [showControls, setShowControls] = useState(false)
    // Section collapse (mirroring GraphQLTimeline pattern)
    const [sectionExpanded, setSectionExpanded] = useState(false)

    // Load saved users + cookie status on mount
    useEffect(() => {
        fetchUsers()
        fetchCookieStatus()
    }, [])

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/twitter-users')
            const data = await res.json()
            if (data.success) setUsers(data.data)
        } catch {
            console.error('Failed to load users')
        }
    }

    const handleAdd = useCallback(async () => {
        const trimmed = input.trim().replace(/^@/, '')
        if (!trimmed) return

        setAdding(true)
        setError('')
        try {
            const res = await fetch('/api/twitter-users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: trimmed }),
            })
            const data = await res.json()
            if (data.success) {
                setUsers(prev => [data.data, ...prev])
                setInput('')
                setSelectedUser(data.data.username)
            } else {
                setError(data.error || 'Error')
            }
        } catch {
            setError('Lỗi kết nối')
        }
        setAdding(false)
    }, [input])

    const handleDelete = useCallback(async (user: SavedUser) => {
        try {
            const res = await fetch(`/api/twitter-users?id=${user._id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                setUsers(prev => prev.filter(u => u._id !== user._id))
                if (selectedUser === user.username) {
                    setSelectedUser(null)
                }
            }
        } catch {
            console.error('Delete failed')
        }
        setDeleteConfirm(null)
    }, [selectedUser])

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleAdd()
    }, [handleAdd])

    const fetchCookieStatus = async () => {
        try {
            const res = await fetch('/api/twitter-token')
            const data = await res.json()
            if (data.success && data.data) {
                const parts = [`auth: ${data.data.authToken}`, `ct0: ${data.data.ct0}`]
                if (data.data.att) parts.push(`att: ${data.data.att}`)
                setCookieStatus(parts.join(' · '))
            } else {
                setCookieStatus(null)
            }
        } catch { setCookieStatus(null) }
    }

    const handleSaveCookie = useCallback(async () => {
        if (!cookieInput.trim()) return
        setCookieSaving(true)
        setCookieError('')
        try {
            let cookieText = ''
            let bearerToken = ''

            // Try parse as JSON (full request dump from DevTools)
            const trimmed = cookieInput.trim()
            if (trimmed.startsWith('{')) {
                try {
                    const json = JSON.parse(trimmed)
                    // Support { http: { headers: { Cookie, authorization } } }
                    const headers = json?.http?.headers || json?.headers || json
                    cookieText = headers?.Cookie || headers?.cookie || ''
                    bearerToken = headers?.authorization || headers?.Authorization || ''
                } catch {
                    // Not valid JSON — treat as plain text
                    cookieText = trimmed
                }
            } else {
                // Plain cookie string
                cookieText = trimmed
            }

            if (!cookieText) {
                setCookieError('Không tìm thấy Cookie. Paste JSON request hoặc cookie string.')
                setCookieSaving(false)
                return
            }

            const payload: Record<string, string> = { cookieText }
            if (bearerToken) payload.bearerToken = bearerToken

            const res = await fetch('/api/twitter-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            const data = await res.json()
            if (data.success) {
                const parts = [`auth: ${data.data.authToken}`, `ct0: ${data.data.ct0 || '...'}`]
                if (data.data.att) parts.push(`att: ${data.data.att}`)
                if (data.data.bearerToken) parts.push('bearer: ✅')
                setCookieStatus(parts.join(' · '))
                setCookieInput('')
                setCookieModal(false)
            } else {
                setCookieError(data.error)
            }
        } catch {
            setCookieError('Lỗi kết nối')
        }
        setCookieSaving(false)
    }, [cookieInput])

    const displayUsers = selectedUser
        ? users.filter(u => u.username === selectedUser)
        : users.length > 0 ? [users[users.length - 1]] : []

    const mainContent = (
        <>
            {/* Toggle Controls Button */}
            <div className="mb-3 flex justify-end">
                <button
                    onClick={() => setShowControls(!showControls)}
                    className={`px-3 py-2 rounded-xl text-sm transition-all ${showControls
                        ? 'bg-[#ff9900]/20 border border-[#ff9900]/40 text-[#ff9900]'
                        : 'bg-slate-800/60 border border-white/10 text-slate-400 hover:border-white/20'
                        }`}
                    title="Hiển thị/Ẩn controls"
                >
                    ⚙️
                </button>
            </div>

            {/* Add Input + Cookie (toggleable) */}
            {showControls && (
                <div className="mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => { setInput(e.target.value); setError('') }}
                            onKeyDown={handleKeyDown}
                            placeholder="Nhập username — vd: vercel, reactjs, dan_abramov"
                            className="flex-1 px-4 py-3 rounded-xl bg-slate-800/60 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#ff9900]/50 focus:ring-1 focus:ring-[#ff9900]/30 transition"
                        />
                        <button
                            onClick={handleAdd}
                            disabled={!input.trim() || adding}
                            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#ff9900] to-[#ffb833] text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {adding ? '⏳' : '+'} Thêm
                        </button>
                        <button
                            onClick={() => setCookieModal(true)}
                            className={`relative px-3 py-3 rounded-xl text-sm transition-all ${cookieStatus
                                ? 'bg-slate-800/60 border border-green-500/30 text-green-400 hover:border-green-500/50'
                                : 'bg-slate-800/60 border border-white/10 text-slate-400 hover:border-white/20'
                                }`}
                            title={cookieStatus || 'Thêm cookie X'}
                        >
                            🍪
                            {cookieStatus && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full" />}
                        </button>
                    </div>
                    {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
                </div>
            )}

            {/* Saved Users Tags */}
            {users.length > 0 && (
                <div className="mb-6">
                    {/* Mobile: collapsed bar */}
                    <div
                        className="md:hidden flex items-center justify-between cursor-pointer"
                        onClick={() => setTagsExpanded(!tagsExpanded)}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-slate-400 text-xs">
                                {selectedUser ? `@${selectedUser}` : `@${users[users.length - 1]?.username || ''}`}
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
                    <div className={`${tagsExpanded ? 'mt-2 flex' : 'hidden'} md:flex flex-wrap gap-2`}>

                        {users.map((user) => (
                            <div
                                key={user._id}
                                onClick={() => { setSelectedUser(selectedUser === user.username ? null : user.username); setTagsExpanded(false) }}
                                className={`flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-full text-sm cursor-pointer transition-all ${selectedUser === user.username
                                    ? 'bg-[#ff9900]/20 text-[#ff9900] border border-[#ff9900]/40'
                                    : 'bg-slate-800/60 text-slate-300 border border-white/10 hover:border-white/20'
                                    }`}
                            >
                                {user.avatarUrl ? (
                                    <img src={user.avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
                                ) : (
                                    <span className="w-5 h-5 rounded-full bg-slate-600 flex items-center justify-center text-[10px] text-white">{user.username[0].toUpperCase()}</span>
                                )}
                                <span>@{user.username}</span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setDeleteConfirm(user) }}
                                    className={`w-6 h-6 md:w-5 md:h-5 rounded-full flex items-center justify-center text-[10px] transition ${selectedUser === user.username
                                        ? 'text-[#ff9900]/60 hover:bg-red-500 hover:text-white'
                                        : 'text-slate-500 hover:bg-red-500 hover:text-white'
                                        }`}
                                    title={`Xóa @${user.username}`}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Timelines */}
            <div>
                {users.length > 0 ? (
                    <div className="space-y-6">
                        {displayUsers.map((user) => (
                            <div key={user._id}>
                                <div className="md:rounded-xl overflow-hidden md:border border-white/10">
                                    <iframe
                                        key={user.username}
                                        src={`/api/tweets?username=${encodeURIComponent(user.username)}`}
                                        className="w-full border-0"
                                        style={{ minHeight: 'calc(100vh - 80px)', colorScheme: 'dark' }}
                                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <span className="text-5xl mb-4 block opacity-50">𝕏</span>
                        <p className="text-slate-500 text-sm">
                            Thêm username X để bắt đầu theo dõi tweets
                        </p>
                    </div>
                )}
            </div>
        </>
    )

    return (
        <>
            {/* ===== MOBILE: Fixed button + overlay panel ===== */}
            {!sectionExpanded && (
                <button
                    onClick={() => setSectionExpanded(true)}
                    className="md:hidden fixed bottom-18 right-4 z-50 w-11 h-11 rounded-full bg-gradient-to-r from-[#ff9900] to-[#ffb833] text-white shadow-lg shadow-[#ff9900]/30 flex items-center justify-center text-lg hover:scale-110 active:scale-95 transition-transform"
                    aria-label="Open Embed Tweets"
                >
                    🔗
                </button>
            )}

            {sectionExpanded && (
                <div className="md:hidden fixed inset-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-900/80">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🔗</span>
                            <h2 className="text-base font-bold text-white">Embed Tweets</h2>
                            <span className="text-[10px] text-slate-500 bg-slate-900/60 px-1.5 py-0.5 rounded-full border border-white/5">
                                REST
                            </span>
                        </div>
                        <button
                            onClick={() => setSectionExpanded(false)}
                            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 py-4">
                        {mainContent}
                    </div>
                </div>
            )}

            {/* ===== DESKTOP: Inline collapse/expand ===== */}
            <div className="hidden md:block w-full max-w-3xl mx-auto z-10 px-0 mt-10">
                <button
                    onClick={() => setSectionExpanded(!sectionExpanded)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-800/40 border border-white/10 hover:border-white/20 transition group"
                >
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-bold text-white">🔗 Embed Tweets</h2>
                        <span className="text-xs text-slate-500 bg-slate-900/60 px-2 py-0.5 rounded-full border border-white/5">
                            REST
                        </span>
                    </div>
                    <span className={`text-slate-400 text-sm transition-transform ${sectionExpanded ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </button>

                {sectionExpanded && (
                    <div className="mt-4">
                        {mainContent}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Popup */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
                        <h3 className="text-white font-semibold text-lg mb-2">Xóa username?</h3>
                        <p className="text-slate-400 text-sm mb-6">
                            Bạn có chắc muốn xóa <span className="text-[#ff9900] font-semibold">@{deleteConfirm.username}</span> khỏi danh sách?
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-700 transition"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="px-4 py-2 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition"
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Cookie Modal */}
            {cookieModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
                        <h3 className="text-white font-semibold text-lg mb-1">🍪 Cookie X (GraphQL)</h3>
                        <p className="text-slate-400 text-xs mb-2">
                            Paste một trong hai:
                        </p>
                        <ul className="text-slate-500 text-xs mb-4 space-y-0.5 list-disc list-inside">
                            <li><strong className="text-slate-300">JSON request</strong> — copy nguyên request từ DevTools (tự lọc Cookie + Bearer)</li>
                            <li><strong className="text-slate-300">Cookie string</strong> — <code className="text-[10px] bg-slate-900 px-1 rounded">auth_token=xxx; ct0=yyy</code></li>
                        </ul>
                        {cookieStatus && (
                            <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                                <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                                <span className="text-green-400 text-xs truncate">{cookieStatus}</span>
                            </div>
                        )}
                        <textarea
                            value={cookieInput}
                            onChange={(e) => { setCookieInput(e.target.value); setCookieError('') }}
                            placeholder={'{ "http": { "headers": { "Cookie": "...", "authorization": "..." } } }\n\nhoặc:\n\nauth_token=xxx; ct0=yyy; att=zzz'}
                            rows={6}
                            className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-white/10 text-white text-xs font-mono placeholder:text-slate-600 focus:outline-none focus:border-[#ff9900]/50 resize-none"
                        />
                        {cookieError && <p className="text-red-400 text-xs mt-2">{cookieError}</p>}
                        <div className="flex gap-3 justify-end mt-4">
                            <button
                                onClick={() => { setCookieModal(false); setCookieError('') }}
                                className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-700 transition"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={handleSaveCookie}
                                disabled={!cookieInput.trim() || cookieSaving}
                                className="px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-[#ff9900] to-[#ffb833] text-white hover:opacity-90 transition disabled:opacity-40"
                            >
                                {cookieSaving ? 'Đang lưu...' : 'Lưu'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
