'use client'

import Link from 'next/link'
import { BlogPost } from '../types'
import { useLang } from './LangContext'
import LangSwitcher from './LangSwitcher'

export function BlogListContent({ posts }: { posts: BlogPost[] }) {
    const { t, lang } = useLang()

    return (
        <div className="bg-[#0a0a0a] text-slate-200 font-sans min-h-screen flex flex-col items-center p-4 md:p-8 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-[#0a0a0a] relative">
            {/* Header */}
            <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-12 z-20">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#c084fc] flex items-center justify-center font-bold text-white shadow-lg">
                        Y
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">
                        The<span className="text-[#38bdf8]">TapHoa</span>
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <LangSwitcher />
                    <Link
                        href="/"
                        className="text-sm text-slate-400 hover:text-white transition flex items-center gap-1"
                    >
                        ← Back
                    </Link>
                </div>
            </header>

            {/* Title */}
            <div className="w-full max-w-4xl mx-auto mb-10 z-10">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">📝</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        Blog
                    </h1>
                </div>
                <p className="text-slate-400">
                    {lang === 'vi'
                        ? 'Chia sẻ kiến thức Frontend — JavaScript, React, TypeScript và nhiều hơn nữa.'
                        : 'Sharing Frontend knowledge — JavaScript, React, TypeScript and more.'}
                </p>
            </div>

            {/* Blog Grid */}
            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blogs/${post.slug}`}
                        className="group rounded-2xl bg-slate-800/40 border border-white/10 overflow-hidden hover:border-white/20 hover:bg-slate-800/60 transition-all duration-300 no-underline"
                        style={{ boxShadow: `0 0 30px ${post.color}10` }}
                    >
                        {/* Gradient Top Bar */}
                        <div
                            className="h-1.5 w-full"
                            style={{ background: `linear-gradient(to right, ${post.color}, ${post.color}80)` }}
                        />

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{post.emoji}</span>
                                <h2 className="text-lg font-semibold text-white group-hover:text-[#38bdf8] transition leading-tight">
                                    {t(post.title)}
                                </h2>
                            </div>

                            <p className="text-sm text-slate-400 leading-relaxed">
                                {t(post.description)}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-1">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 text-xs rounded-full border border-white/10 text-slate-300"
                                        style={{ backgroundColor: `${post.color}15` }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <span className="text-xs text-slate-500">{post.date}</span>
                                <span
                                    className="text-sm font-medium group-hover:translate-x-1 transition-transform"
                                    style={{ color: post.color }}
                                >
                                    {lang === 'vi' ? 'Đọc bài →' : 'Read more →'}
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {posts.length === 0 && (
                <div className="w-full max-w-4xl mx-auto text-center py-20 z-10">
                    <span className="text-6xl mb-4 block">📚</span>
                    <p className="text-slate-400 text-lg">
                        {lang === 'vi' ? 'Chưa có bài viết nào. Quay lại sau nhé!' : 'No posts yet. Come back later!'}
                    </p>
                </div>
            )}

            {/* Footer */}
            <footer className="w-full max-w-4xl mx-auto mt-16 pt-8 pb-6 border-t border-slate-700/50 z-20 text-center">
                <p className="text-sm text-slate-500">
                    Built with Next.js, TypeScript & MongoDB
                </p>
            </footer>

            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>
        </div>
    )
}
