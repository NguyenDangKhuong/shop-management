'use client'

import Link from 'next/link'
import { BlogPost } from '../types'
import { useLang } from './LangContext'
import LangSwitcher from './LangSwitcher'
import ThemeToggle from '@/components/ui/ThemeToggle'

export function BlogDetailContent({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
    const { t, lang } = useLang()

    return (
        <div className="bg-gray-50 dark:bg-[#0a0a0a] text-gray-800 dark:text-slate-200 font-sans min-h-screen flex flex-col items-center p-4 md:p-8 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-100 dark:from-slate-900 via-gray-50 dark:via-[#0a0a0a] to-gray-50 dark:to-[#0a0a0a] relative transition-colors duration-300">
            {/* Header */}
            <header className="w-full max-w-3xl mx-auto flex items-center mb-12 z-20">
                {/* Mobile: back+lang left, logo center */}
                <div className="flex md:hidden items-center w-full">
                    <Link
                        href="/blogs"
                        className="text-sm text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition"
                    >
                        ←
                    </Link>
                    <div className="flex-1 flex justify-center">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#c084fc] flex items-center justify-center font-bold text-white shadow-lg">
                                Y
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                                The<span className="text-[#38bdf8]">TapHoa</span>
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <LangSwitcher />
                    </div>
                </div>
                {/* Desktop: logo left, buttons right */}
                <div className="hidden md:flex justify-between items-center w-full">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#c084fc] flex items-center justify-center font-bold text-white shadow-lg">
                            Y
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                            The<span className="text-[#38bdf8]">TapHoa</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <LangSwitcher />
                        <Link
                            href="/blogs"
                            className="text-sm text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition flex items-center gap-1"
                        >
                            {lang === 'vi' ? '← Tất cả bài viết' : '← All posts'}
                        </Link>
                    </div>
                </div>
            </header>

            {/* Article */}
            <article className="w-full max-w-3xl mx-auto z-10">
                {/* Article Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{post.emoji}</span>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 text-xs rounded-full border border-gray-200 dark:border-white/10 text-gray-600 dark:text-slate-300"
                                    style={{ backgroundColor: `${post.color}15` }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-3">
                        {t(post.title)}
                    </h1>

                    <p className="text-gray-500 dark:text-slate-400 text-lg leading-relaxed mb-4">
                        {t(post.description)}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-400 dark:text-slate-500">
                        <span>📅 {post.date}</span>
                        <span>·</span>
                        <span>{lang === 'vi' ? '☕ ~10 phút đọc' : '☕ ~10 min read'}</span>
                    </div>

                    {/* Gradient Divider */}
                    <div
                        className="h-0.5 w-full mt-6 rounded-full opacity-50"
                        style={{ background: `linear-gradient(to right, ${post.color}, transparent)` }}
                    />
                </div>

                {/* Article Content */}
                <div className="prose-custom">
                    {post.content[lang]}
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="w-full max-w-3xl mx-auto mt-16 z-10">
                    <div
                        className="h-px w-full mb-8 opacity-30"
                        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)' }}
                    />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        {lang === 'vi' ? 'Bài viết khác' : 'Related posts'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {relatedPosts.map((related) => (
                            <Link
                                key={related.slug}
                                href={`/blogs/${related.slug}`}
                                className="group rounded-xl bg-white dark:bg-slate-800/40 border border-gray-200 dark:border-white/10 p-5 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-all duration-300 no-underline"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span>{related.emoji}</span>
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-[#38bdf8] transition">
                                        {t(related.title)}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2">{t(related.description)}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="w-full max-w-3xl mx-auto mt-16 pt-8 pb-6 border-t border-gray-300 dark:border-slate-700/50 z-20 text-center">
                <p className="text-sm text-gray-400 dark:text-slate-500">
                    Built with Next.js, TypeScript & MongoDB
                </p>
            </footer>

            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-[100px]" />
            </div>
        </div>
    )
}
