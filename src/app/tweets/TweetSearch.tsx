'use client'

import { useState, useCallback, useEffect } from 'react'

interface SavedUser {
    _id: string
    username: string
}

export function TweetSearch() {
    const [input, setInput] = useState('')
    const [users, setUsers] = useState<SavedUser[]>([])
    const [adding, setAdding] = useState(false)
    const [error, setError] = useState('')
    const [selectedUser, setSelectedUser] = useState<string | null>(null)
    const [deleteConfirm, setDeleteConfirm] = useState<SavedUser | null>(null)
    // Cookie state
    const [cookieModal, setCookieModal] = useState(false)
    const [cookieInput, setCookieInput] = useState('')
    const [cookieStatus, setCookieStatus] = useState<string | null>(null)
    const [cookieSaving, setCookieSaving] = useState(false)
    const [cookieError, setCookieError] = useState('')

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
                setCookieStatus(`auth_token: ${data.data.authToken}`)
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
            const res = await fetch('/api/twitter-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cookieText: cookieInput }),
            })
            const data = await res.json()
            if (data.success) {
                setCookieStatus(`auth_token: ${data.data.authToken}`)
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
        : users

    return (
        <>
            {/* Add Input */}
            <div className="w-full max-w-3xl mx-auto mb-6 z-10">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => { setInput(e.target.value); setError('') }}
                        onKeyDown={handleKeyDown}
                        placeholder="Nhập username — vd: vercel, reactjs, dan_abramov"
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-800/60 border border-white/10 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#38bdf8]/50 focus:ring-1 focus:ring-[#38bdf8]/30 transition"
                    />
                    <button
                        onClick={handleAdd}
                        disabled={!input.trim() || adding}
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#38bdf8] to-[#c084fc] text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
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

            {/* Saved Users Tags */}
            {users.length > 0 && (
                <div className="w-full max-w-3xl mx-auto mb-6 z-10">
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedUser(null)}
                            className={`px-3 py-1.5 rounded-full text-sm transition-all ${!selectedUser
                                ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40'
                                : 'bg-slate-800/60 text-slate-300 border border-white/10 hover:border-white/20'
                                }`}
                        >
                            Tất cả
                        </button>
                        {users.map((user) => (
                            <div
                                key={user._id}
                                onClick={() => setSelectedUser(selectedUser === user.username ? null : user.username)}
                                className={`flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-full text-sm cursor-pointer transition-all ${selectedUser === user.username
                                    ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40'
                                    : 'bg-slate-800/60 text-slate-300 border border-white/10 hover:border-white/20'
                                    }`}
                            >
                                <span>@{user.username}</span>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setDeleteConfirm(user) }}
                                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] transition ${selectedUser === user.username
                                        ? 'text-[#38bdf8]/60 hover:bg-red-500 hover:text-white'
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
            <div className="w-full max-w-3xl mx-auto z-10">
                {users.length > 0 ? (
                    <div className="space-y-6">
                        {displayUsers.map((user) => (
                            <div key={user._id}>
                                <div className="flex items-center gap-2 mb-3">
                                    <a
                                        href={`https://x.com/${user.username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#38bdf8] font-semibold text-sm hover:underline"
                                    >
                                        @{user.username}
                                    </a>
                                </div>
                                <div className="rounded-xl overflow-hidden border border-white/10">
                                    <iframe
                                        key={user.username}
                                        src={`/api/tweets?username=${encodeURIComponent(user.username)}`}
                                        className="w-full border-0"
                                        style={{ minHeight: '600px', colorScheme: 'dark' }}
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

            {/* Delete Confirmation Popup */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
                        <h3 className="text-white font-semibold text-lg mb-2">Xóa username?</h3>
                        <p className="text-slate-400 text-sm mb-6">
                            Bạn có chắc muốn xóa <span className="text-[#38bdf8] font-semibold">@{deleteConfirm.username}</span> khỏi danh sách?
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
                        <h3 className="text-white font-semibold text-lg mb-1">🍪 Cookie X</h3>
                        <p className="text-slate-400 text-xs mb-4">
                            Paste cookie từ DevTools (Application → Cookies → x.com). Cần auth_token và ct0.
                        </p>
                        {cookieStatus && (
                            <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                                <span className="w-2 h-2 bg-green-500 rounded-full" />
                                <span className="text-green-400 text-xs">{cookieStatus}</span>
                            </div>
                        )}
                        <textarea
                            value={cookieInput}
                            onChange={(e) => { setCookieInput(e.target.value); setCookieError('') }}
                            placeholder={'auth_token: xxx\nct0: yyy\natt: zzz (optional)'}
                            rows={4}
                            className="w-full px-3 py-2 rounded-lg bg-slate-900/80 border border-white/10 text-white text-xs font-mono placeholder:text-slate-600 focus:outline-none focus:border-[#38bdf8]/50 resize-none"
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
                                className="px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-[#38bdf8] to-[#c084fc] text-white hover:opacity-90 transition disabled:opacity-40"
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
