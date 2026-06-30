'use client'

/**
 * ========================================================================
 * DOUYIN DOWNLOADER CLIENT — Trang tải video Douyin không watermark
 * ========================================================================
 *
 * Tính năng:
 * 1. Nhận diện và tự động tách URL từ chuỗi chia sẻ Douyin phức tạp.
 * 2. Gọi API trung gian qua Route Handler Next.js để bypass CORS.
 * 3. Hiển thị trình xem thử video trực tiếp trên trang.
 * 4. Nút bấm tải video không watermark chất lượng cao, nhạc nền và ảnh bìa.
 * 5. Thiết kế Premium Spaceship UI đồng bộ với phong cách sci-fi của Landing Page.
 */

import { useState } from 'react'
import Link from 'next/link'

interface DouyinVideoData {
    desc?: string
    author?: {
        nickname?: string
        avatar_thumb?: {
            url_list?: string[]
        }
    }
    music?: {
        title?: string
        play_url?: {
            url_list?: string[]
        }
    }
    statistics?: {
        digg_count?: number
        collect_count?: number
        comment_count?: number
        share_count?: number
    }
    cover_data?: {
        cover?: {
            url_list?: string[]
        }
        dynamic_cover?: {
            url_list?: string[]
        }
    }
    video_data?: {
        nwm_video_url?: string
        nwm_video_url_HQ?: string
        wm_video_url?: string
        wm_video_url_HQ?: string
    }
}

export default function DouyinClient() {
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [videoData, setVideoData] = useState<DouyinVideoData | null>(null)
    const [copiedVideo, setCopiedVideo] = useState(false)
    const [copiedAudio, setCopiedAudio] = useState(false)
    const [pasted, setPasted] = useState(false)

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText()
            if (text) {
                setInput(text)
                setPasted(true)
                setTimeout(() => setPasted(false), 1500)
            }
        } catch {
            // Fallback: nếu quyền clipboard bị từ chối, không làm gì
        }
    }

    // Helper: Trích xuất link HTTP/HTTPS từ chuỗi văn bản bất kỳ
    const extractUrl = (text: string): string | null => {
        const urlRegex = /(https?:\/\/[^\s]+)/g
        const matches = text.match(urlRegex)
        return matches ? matches[0] : null
    }

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const targetUrl = extractUrl(input)
        if (!targetUrl) {
            setError('Không tìm thấy đường link hợp lệ trong văn bản nhập vào. Vui lòng kiểm tra lại!')
            setVideoData(null)
            return
        }

        setLoading(true)
        setError(null)
        setVideoData(null)

        try {
            const res = await fetch(`/api/douyin?url=${encodeURIComponent(targetUrl)}`)
            
            let data: any = null
            const contentType = res.headers.get('content-type')
            if (contentType && contentType.includes('application/json')) {
                data = await res.json()
            } else {
                const text = await res.text()
                if (text.includes('<html') || text.includes('<!DOCTYPE')) {
                    throw new Error(`Máy chủ API phản hồi lỗi ${res.status} (Gateway Error). Vui lòng thử lại sau!`)
                }
                throw new Error(text || `Yêu cầu thất bại với trạng thái ${res.status}.`)
            }

            if (!res.ok || data.error) {
                throw new Error(data.error || 'Lỗi hệ thống khi phân tích liên kết.')
            }

            // API trả về code: 200 và data: {...}
            if (data.code === 200 && data.data) {
                setVideoData(data.data)
            } else if (data.desc) {
                // Trường hợp API trả về thẳng data gốc
                setVideoData(data)
            } else {
                throw new Error('API trả về định dạng dữ liệu không xác định.')
            }
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Không thể kết nối đến máy chủ API trên VPS. Vui lòng thử lại sau!')
        } finally {
            setLoading(false)
        }
    }

    const copyToClipboard = async (text: string, type: 'video' | 'audio') => {
        if (!text) return
        await navigator.clipboard.writeText(text)
        if (type === 'video') {
            setCopiedVideo(true)
            setTimeout(() => setCopiedVideo(false), 2000)
        } else {
            setCopiedAudio(true)
            setTimeout(() => setCopiedAudio(false), 2000)
        }
    }

    // Helper định dạng số lượng lượt tương tác
    const formatNumber = (num?: number) => {
        if (!num) return '0'
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M'
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K'
        }
        return num.toString()
    }

    // Lấy URL video tốt nhất
    const videoUrl = videoData?.video_data?.nwm_video_url_HQ || videoData?.video_data?.nwm_video_url
    // Lấy URL âm thanh
    const audioUrl = videoData?.music?.play_url?.url_list?.[0]
    // Lấy ảnh bìa tốt nhất
    const coverUrl = videoData?.cover_data?.dynamic_cover?.url_list?.[0] || videoData?.cover_data?.cover?.url_list?.[0]
    // Lấy ảnh avatar tác giả
    const avatarUrl = videoData?.author?.avatar_thumb?.url_list?.[0]

    return (
        <div className="min-h-screen bg-[#06060c] text-slate-200 flex flex-col items-center px-4 py-8 md:py-16 relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

            {/* Main Container */}
            <div className="w-full max-w-4xl relative z-10">
                {/* Back to Home Link */}
                <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-[var(--neon-cyan)] transition-colors mb-8 group">
                    <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Quay về trang chủ
                </Link>

                {/* Header */}
                <div className="mb-10 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                                <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">📥</span>
                                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wider text-white text-shadow-glow">
                                    Douyin Downloader
                                </h1>
                            </div>
                            <p className="text-slate-400 text-sm">Tải video Douyin chất lượng cao, không hình mờ (Watermark)</p>
                        </div>
                        <div className="flex justify-center">
                            <span className="px-3 py-1.5 rounded-full bg-slate-900 border border-white/10 text-xs font-mono text-[var(--neon-cyan)] shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                                VPS-API Status: ONLINE
                            </span>
                        </div>
                    </div>
                </div>

                {/* Input Card */}
                <div className="cyber-card hover-cyber-glow !p-6 md:!p-8 mb-8 border border-white/10 bg-slate-950/40 backdrop-blur-xl rounded-2xl" style={{ '--cyber-accent': 'var(--neon-cyan)' } as React.CSSProperties}>
                    <form onSubmit={handleDownload} className="space-y-4">
                        <div>
                            <label htmlFor="url" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                Nhập liên kết video Douyin
                            </label>
                            <textarea
                                id="url"
                                rows={3}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Dán link hoặc văn bản chứa liên kết chia sẻ của video Douyin tại đây... (Ví dụ: https://v.douyin.com/abc/)"
                                className="w-full p-4 rounded-xl bg-slate-900/60 border border-white/10 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 text-white placeholder-slate-600 text-sm leading-relaxed transition-all resize-none font-mono"
                                disabled={loading}
                            />
                        </div>
                        {/* Paste Button */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handlePaste}
                                className="px-4 py-2 rounded-xl border border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center gap-1.5"
                                disabled={loading}
                            >
                                {pasted ? '✓ Đã Dán' : '📋 Dán Link'}
                            </button>
                        </div>
                        <div className="flex justify-end gap-3">
                            {input && (
                                <button
                                    type="button"
                                    onClick={() => { setInput(''); setError(null); setVideoData(null) }}
                                    className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-slate-900 transition-all text-sm font-medium"
                                    disabled={loading}
                                >
                                    Xóa
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:border-transparent text-white text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(8,145,178,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-95 flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Đang tải...
                                    </>
                                ) : (
                                    <>🔍 Phân tích Link</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="p-4 mb-8 rounded-xl bg-red-950/20 border border-red-500/30 text-red-400 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                        <span className="text-base mt-0.5">⚠️</span>
                        <div>
                            <span className="font-bold">Lỗi:</span> {error}
                        </div>
                    </div>
                )}

                {/* Loading indicator detailed */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 rounded-full border-4 border-cyan-500/10" />
                            <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 animate-spin" />
                            <div className="absolute inset-2 rounded-full border-4 border-purple-500/10" />
                            <div className="absolute inset-2 rounded-full border-4 border-t-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
                        </div>
                        <p className="text-sm font-mono text-cyan-400 animate-pulse">
                            Connecting VPS API & extraction in progress...
                        </p>
                    </div>
                )}

                {/* Results Presentation */}
                {videoData && (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
                        {/* Video Player Column */}
                        <div className="md:col-span-5 flex flex-col items-center">
                            <div className="w-full aspect-[9/16] max-h-[550px] rounded-2xl overflow-hidden border border-white/10 bg-black relative shadow-2xl group">
                                {videoUrl ? (
                                    <video
                                        src={videoUrl}
                                        controls
                                        poster={coverUrl}
                                        playsInline
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-500">
                                        <span className="text-4xl mb-2">🎞️</span>
                                        Không tải được trình phát video trực tiếp.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Metadata & Downloads Column */}
                        <div className="md:col-span-7 space-y-6">
                            {/* Author Info */}
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/30 border border-white/5">
                                {avatarUrl && (
                                    <img
                                        src={avatarUrl}
                                        alt={videoData.author?.nickname || 'Author'}
                                        className="w-10 h-10 rounded-full border border-white/10 object-cover"
                                    />
                                )}
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-widest">Tác giả</div>
                                    <div className="text-sm font-bold text-white">@{videoData.author?.nickname || 'Douyin User'}</div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-1">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nội dung</h3>
                                <p className="text-sm text-slate-300 leading-relaxed max-h-24 overflow-y-auto pr-2">
                                    {videoData.desc || 'Không có mô tả cho video này.'}
                                </p>
                            </div>

                            {/* Statistics Grid */}
                            {videoData.statistics && (
                                <div className="grid grid-cols-4 gap-3">
                                    <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 text-center">
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">❤️ Tim</div>
                                        <div className="text-sm font-black text-rose-400">{formatNumber(videoData.statistics.digg_count)}</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 text-center">
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">💬 Chat</div>
                                        <div className="text-sm font-black text-blue-400">{formatNumber(videoData.statistics.comment_count)}</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 text-center">
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">🌟 Lưu</div>
                                        <div className="text-sm font-black text-amber-400">{formatNumber(videoData.statistics.collect_count)}</div>
                                    </div>
                                    <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 text-center">
                                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">🔗 Share</div>
                                        <div className="text-sm font-black text-emerald-400">{formatNumber(videoData.statistics.share_count)}</div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="space-y-3 pt-2">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tải xuống</h3>

                                {videoUrl && (
                                    <div className="space-y-2">
                                        <a
                                            href={`${process.env.NEXT_PUBLIC_DOUYIN_API_URL || 'https://khuong.theworkpc.com/douyin-api'}/download?url=${encodeURIComponent(videoUrl)}`}
                                            download
                                            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            📥 Tải Video (Không Watermark)
                                        </a>
                                        <div className="flex gap-2">
                                            <a
                                                href={videoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 py-3 px-4 rounded-xl border border-blue-500/30 hover:bg-blue-500/10 text-blue-400 font-bold text-xs uppercase tracking-wider text-center transition-all active:scale-95 flex items-center justify-center gap-2"
                                            >
                                                🔗 Mở Video
                                            </a>
                                            <button
                                                onClick={() => copyToClipboard(videoUrl, 'video')}
                                                className="py-3 px-4 rounded-xl border border-blue-500/30 hover:bg-blue-500/10 text-blue-400 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2"
                                            >
                                                {copiedVideo ? '✓ Đã Copy' : '📋 Copy Link'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {audioUrl && (
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <a
                                            href={audioUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download={`music_${videoData.music?.title || 'sound'}.mp3`}
                                            className="flex-1 py-3 px-4 rounded-xl border border-purple-500/30 hover:bg-purple-500/10 text-purple-400 font-bold text-xs uppercase tracking-wider text-center transition-all active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            🎵 Tải Nhạc Nền (Audio MP3)
                                        </a>
                                        <button
                                            onClick={() => copyToClipboard(audioUrl, 'audio')}
                                            className="py-3 px-4 rounded-xl border border-purple-500/30 hover:bg-purple-500/10 text-purple-400 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            {copiedAudio ? '✓ Đã Copy' : '📋 Copy'}
                                        </button>
                                    </div>
                                )}

                                {coverUrl && (
                                    <a
                                        href={coverUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-block py-3 px-4 rounded-xl border border-white/10 hover:bg-slate-900 text-slate-300 font-medium text-xs uppercase tracking-wider text-center transition-all active:scale-95"
                                    >
                                        🖼️ Xem ảnh bìa chất lượng cao
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
