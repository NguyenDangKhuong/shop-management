'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BlogPost } from '../types'
import { useLang } from './LangContext'
import LangSwitcher from './LangSwitcher'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { blogSections } from '../posts/sections'

interface SearchResult {
    post: BlogPost
    matchedSections: { id: string; title: string }[]
}

export function BlogListContent({ posts }: { posts: BlogPost[] }) {
    const { t, lang } = useLang()
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Build flat list of search results: posts + matching sections
    const results: SearchResult[] = search.trim()
        ? posts.reduce<SearchResult[]>((acc, post) => {
              const q = search.toLowerCase()
              const titleMatch = t(post.title).toLowerCase().includes(q)
              const descMatch = t(post.description).toLowerCase().includes(q)
              const tagMatch = post.tags.some((tag) => tag.toLowerCase().includes(q))

              // Check section matches
              const sections = blogSections[post.slug] || []
              const matchedSections = sections
                  .filter((s) => s.title[lang].toLowerCase().includes(q))
                  .map((s) => ({ id: s.id, title: s.title[lang] }))

              if (titleMatch || descMatch || tagMatch || matchedSections.length > 0) {
                  acc.push({ post, matchedSections })
              }
              return acc
          }, [])
        : []

    // Build flat navigation list for keyboard: each entry is either a post or a section
    const navItems: { slug: string; hash?: string; label: string }[] = []
    results.forEach((r) => {
        navItems.push({ slug: r.post.slug, label: t(r.post.title) })
        r.matchedSections.slice(0, 3).forEach((s) => {
            navItems.push({ slug: r.post.slug, hash: s.id, label: s.title })
        })
    })

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleNavigate = useCallback(
        (slug: string, hash?: string) => {
            setSearch('')
            setIsOpen(false)
            const url = hash ? `/blogs/${slug}#${hash}` : `/blogs/${slug}`
            router.push(url)
        },
        [router]
    )

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen || navItems.length === 0) return
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((prev) => (prev < navItems.length - 1 ? prev + 1 : 0))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : navItems.length - 1))
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            e.preventDefault()
            const item = navItems[activeIndex]
            handleNavigate(item.slug, item.hash)
        } else if (e.key === 'Escape') {
            setIsOpen(false)
            inputRef.current?.blur()
        }
    }

    return (
        <div className="bg-gray-50 dark:bg-[#0a0a0a] text-gray-800 dark:text-slate-200 font-sans min-h-screen flex flex-col items-center p-4 md:p-8 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-100 dark:from-slate-900 via-gray-50 dark:via-[#0a0a0a] to-gray-50 dark:to-[#0a0a0a] relative transition-colors duration-300">
            {/* Header */}
            <header className="w-full max-w-4xl mx-auto flex items-center mb-12 z-20">
                {/* Mobile: back+lang left, logo center */}
                <div className="flex md:hidden items-center w-full">
                    <Link
                        href="/"
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
                            href="/"
                            className="text-sm text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition flex items-center gap-1"
                        >
                            ← Back
                        </Link>
                    </div>
                </div>
            </header>

            {/* Title */}
            <div className="w-full max-w-4xl mx-auto mb-6 z-10">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">📝</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Blog
                    </h1>
                </div>
                <p className="text-gray-500 dark:text-slate-400">
                    {lang === 'vi'
                        ? 'Chia sẻ kiến thức Frontend — JavaScript, React, TypeScript và nhiều hơn nữa.'
                        : 'Sharing Frontend knowledge — JavaScript, React, TypeScript and more.'}
                </p>
            </div>

            {/* Search */}
            <div className="w-full max-w-4xl mx-auto mb-8 z-30 relative" ref={wrapperRef}>
                <div className="relative">
                    <svg
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500 pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setIsOpen(true)
                            setActiveIndex(-1)
                        }}
                        onFocus={() => search.trim() && setIsOpen(true)}
                        onKeyDown={handleKeyDown}
                        placeholder={lang === 'vi' ? 'Tìm kiếm bài viết...' : 'Search posts...'}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#38bdf8]/50 focus:border-[#38bdf8] dark:focus:border-[#38bdf8] transition-all duration-200 text-sm shadow-sm dark:shadow-none"
                    />
                    {search && (
                        <button
                            onClick={() => { setSearch(''); setIsOpen(false) }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 dark:bg-slate-600 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-slate-500 transition text-gray-500 dark:text-slate-300 text-xs"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Dropdown Results */}
                {isOpen && search.trim() && (
                    <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white dark:bg-slate-800/95 border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl backdrop-blur-xl overflow-hidden max-h-80 overflow-y-auto">
                        {results.length > 0 ? (
                            (() => {
                                let navIndex = 0
                                return results.map((result, rIdx) => {
                                    const postNavIdx = navIndex++
                                    const sectionItems = result.matchedSections.slice(0, 3)
                                    return (
                                        <div key={result.post.slug}>
                                            {/* Post entry */}
                                            <button
                                                onClick={() => handleNavigate(result.post.slug)}
                                                onMouseEnter={() => setActiveIndex(postNavIdx)}
                                                className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors duration-100 ${
                                                    postNavIdx === activeIndex
                                                        ? 'bg-[#38bdf8]/10 dark:bg-[#38bdf8]/15'
                                                        : 'hover:bg-gray-50 dark:hover:bg-slate-700/40'
                                                } ${rIdx > 0 ? 'border-t border-gray-100 dark:border-white/5' : ''}`}
                                            >
                                                <span className="text-xl shrink-0">{result.post.emoji}</span>
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                        {t(result.post.title)}
                                                    </div>
                                                    <div className="text-xs text-gray-400 dark:text-slate-500 flex items-center gap-2 mt-0.5">
                                                        <span>{result.post.date}</span>
                                                        <span>·</span>
                                                        <span>{result.post.tags.slice(0, 2).join(', ')}</span>
                                                    </div>
                                                </div>
                                                <span className="text-gray-300 dark:text-slate-600 text-xs shrink-0">↵</span>
                                            </button>
                                            {/* Section entries */}
                                            {sectionItems.map((section) => {
                                                const secNavIdx = navIndex++
                                                return (
                                                    <button
                                                        key={section.id}
                                                        onClick={() => handleNavigate(result.post.slug, section.id)}
                                                        onMouseEnter={() => setActiveIndex(secNavIdx)}
                                                        className={`w-full text-left pl-12 pr-4 py-2 flex items-center gap-2.5 transition-colors duration-100 ${
                                                            secNavIdx === activeIndex
                                                                ? 'bg-[#38bdf8]/10 dark:bg-[#38bdf8]/15'
                                                                : 'hover:bg-gray-50 dark:hover:bg-slate-700/40'
                                                        }`}
                                                    >
                                                        <span className="text-xs text-[#38bdf8] dark:text-[#38bdf8] shrink-0">§</span>
                                                        <span className="text-xs text-gray-600 dark:text-slate-400 truncate">{section.title}</span>
                                                        <span className="text-gray-300 dark:text-slate-600 text-xs shrink-0 ml-auto">↵</span>
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    )
                                })
                            })()
                        ) : (
                            <div className="px-4 py-6 text-center text-sm text-gray-400 dark:text-slate-500">
                                {lang === 'vi' ? 'Không tìm thấy bài viết nào' : 'No posts found'}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Blog Grid */}
            <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
                {posts.map((post) => (
                    <Link
                        key={post.slug}
                        href={`/blogs/${post.slug}`}
                        className="group rounded-2xl bg-white dark:bg-slate-800/40 border border-gray-200 dark:border-white/10 overflow-hidden hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-all duration-300 no-underline"
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
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#38bdf8] transition leading-tight">
                                    {t(post.title)}
                                </h2>
                            </div>

                            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
                                {t(post.description)}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-1">
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

                            <div className="flex items-center justify-between pt-2">
                                <span className="text-xs text-gray-400 dark:text-slate-500">{post.date}</span>
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
                    <p className="text-gray-500 dark:text-slate-400 text-lg">
                        {lang === 'vi' ? 'Chưa có bài viết nào. Quay lại sau nhé!' : 'No posts yet. Come back later!'}
                    </p>
                </div>
            )}

            {/* Footer */}
            <footer className="w-full max-w-4xl mx-auto mt-16 pt-8 pb-6 border-t border-gray-300 dark:border-slate-700/50 z-20 text-center">
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
