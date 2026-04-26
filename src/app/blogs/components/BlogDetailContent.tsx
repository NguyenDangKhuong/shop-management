'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { BlogPost } from '../types'
import { useLang } from './LangContext'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import SiteHeader from '@/components/ui/SiteHeader'
import { TableOfContents } from './TableOfContents'

export function BlogDetailContent({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
    const { t, lang, setLang } = useLang()
    const [showBackToTop, setShowBackToTop] = useState(false)

    // Track scroll for back to top button
    useEffect(() => {
        const onScroll = () => setShowBackToTop(window.scrollY > 400)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    // Scroll to hash anchor on page load (for search deep-linking)
    useEffect(() => {
        const hash = window.location.hash.slice(1)
        if (hash) {
            const timer = setTimeout(() => {
                const el = document.getElementById(hash)
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 100)
            return () => clearTimeout(timer)
        }
    }, [])

    return (
        <div className="font-sans min-h-screen flex flex-col items-center relative transition-colors duration-300 bg-bg-page text-text-primary">
            <SiteHeader
                maxWidth="max-w-3xl"
                showProgress
                rightSlot={
                    <>
                        <LanguageSwitcher lang={lang} onToggle={() => { const next = lang === 'vi' ? 'en' : 'vi'; setLang(next) }} />
                        <Link
                            href="/blogs"
                            className="text-sm text-text-secondary hover:text-text-primary transition flex items-center gap-1"
                        >
                            {lang === 'vi' ? '← Tất cả bài viết' : '← All posts'}
                        </Link>
                    </>
                }
            />

            {/* Content wrapper — px matches SiteHeader's outer padding */}
            <div className="w-full px-4 md:px-8 relative">
                {/* TOC — absolute left, doesn't affect article centering */}
                <TableOfContents />

                {/* Article */}
                <article className="w-full max-w-3xl mx-auto z-10 mt-8">
                    {/* Article Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">{post.emoji}</span>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 text-xs rounded-full border border-border-primary text-text-secondary"
                                        style={{ backgroundColor: `${post.color}15` }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-3">
                            {t(post.title)}
                        </h1>

                        <p className="text-text-secondary text-lg leading-relaxed mb-4">
                            {t(post.description)}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-text-muted">
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
                        <h3 className="text-xl font-bold text-text-primary mb-6">
                            {lang === 'vi' ? 'Bài viết khác' : 'Related posts'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {relatedPosts.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/blogs/${related.slug}`}
                                    className="group rounded-xl bg-bg-card border border-border-primary p-5   transition-all duration-300 no-underline"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span>{related.emoji}</span>
                                        <span className="text-sm font-semibold text-text-primary group-hover:text-[#38bdf8] transition">
                                            {t(related.title)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-text-secondary line-clamp-2">{t(related.description)}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="w-full max-w-3xl mx-auto mt-16 pt-8 pb-6 border-t border-border-primary z-20 text-center">
                    <p className="text-sm text-text-muted">
                        Built with Next.js, TypeScript & MongoDB
                    </p>
                </footer>
            </div> {/* end content wrapper */}

            {/* Back to Top */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-bg-surface-dim border border-border-primary text-text-secondary  hover:text-text-primary transition-all duration-300 flex items-center justify-center shadow-lg ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                aria-label="Back to top"
            >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M12 4l-8 8h5v8h6v-8h5z" />
                </svg>
            </button>

            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-bg-glow-blue rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-bg-glow-purple rounded-full blur-[100px]" />
            </div>
        </div>
    )
}

