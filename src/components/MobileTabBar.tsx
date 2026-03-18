'use client'

/**
 * ========================================================================
 * MobileTabBar — Bottom navigation for PWA standalone mode
 * ========================================================================
 *
 * Only renders when app is opened from Home Screen (Add to Home Screen).
 * Regular mobile browser → hidden.
 *
 * Tabs:
 *   🏠 Home  ·  📝 Blog  ·  📖 Translate  ·  🃏 Flashcards  ·  ⚙️ More
 *
 * "More" menu includes: Login, LeetCode, CV, Projects, Privacy, Terms
 */

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useStandalone } from '@/hooks/useStandalone'

interface TabItem {
    icon: string
    label: string
    href: string
}

const TABS: TabItem[] = [
    { icon: '🏠', label: 'Home', href: '/' },
    { icon: '📝', label: 'Blog', href: '/blogs' },
    { icon: '📖', label: 'Translate', href: '/translate' },
    { icon: '🛍️', label: 'Shopee Links', href: '/shopee-links' },
]

const MORE_ITEMS = [
    { icon: '🔐', label: 'Đăng nhập', href: '/login' },
    { icon: '🃏', label: 'Flashcards', href: '/vocabulary-flashcards' },
    { icon: '💻', label: 'LeetCode', href: '/leetcode' },
    { icon: '🧩', label: 'Algorithm', href: '/flashcards' },
    { icon: '📄', label: 'CV', href: '/cv' },
    { icon: '🚀', label: 'Projects', href: '/projects' },
    { icon: '🔒', label: 'Privacy', href: '/privacy' },
    { icon: '📋', label: 'Terms', href: '/terms' },
]

export default function MobileTabBar() {
    const { isStandalone, isReady } = useStandalone()
    const pathname = usePathname()
    const [moreOpen, setMoreOpen] = useState(false)
    const moreRef = useRef<HTMLDivElement>(null)

    // Close "More" menu when clicking outside
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
                setMoreOpen(false)
            }
        }
        if (moreOpen) document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [moreOpen])

    // Close "More" on navigation
    useEffect(() => {
        setMoreOpen(false)
    }, [pathname])

    // Only render in standalone mode
    if (!isReady || !isStandalone) return null

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    const isMoreActive = MORE_ITEMS.some(item => isActive(item.href))

    return (
        <>
            {/* Spacer to prevent content from being hidden behind tab bar */}
            <div className="h-[calc(60px+env(safe-area-inset-bottom))]" />

            {/* More Menu Popup */}
            {moreOpen && (
                <div
                    className="fixed bottom-[calc(60px+env(safe-area-inset-bottom))] right-2 z-[9999] min-w-[160px] rounded-xl bg-[#1a1a2e] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden animate-in slide-in-from-bottom-2 duration-200"
                >
                    {MORE_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                                isActive(item.href)
                                    ? 'bg-blue-600/20 text-blue-400'
                                    : 'text-slate-300 hover:bg-white/5'
                            }`}
                        >
                            <span className="text-base">{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            )}

            {/* Tab Bar */}
            <nav
                className="fixed bottom-0 left-0 right-0 z-[9998] bg-[#0d0d1a]/95 backdrop-blur-xl border-t border-white/5"
                style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
                <div className="flex items-center justify-around h-[60px] max-w-lg mx-auto">
                    {TABS.map((tab) => (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                                isActive(tab.href)
                                    ? 'text-blue-400 scale-105'
                                    : 'text-slate-500 active:scale-95'
                            }`}
                        >
                            <span className="text-xl leading-none">{tab.icon}</span>
                            <span className="text-[10px] font-medium">{tab.label}</span>
                        </Link>
                    ))}

                    {/* More button */}
                    <div ref={moreRef}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setMoreOpen(!moreOpen)
                            }}
                            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                                moreOpen || isMoreActive
                                    ? 'text-blue-400 scale-105'
                                    : 'text-slate-500 active:scale-95'
                            }`}
                        >
                            <span className="text-xl leading-none">⚙️</span>
                            <span className="text-[10px] font-medium">More</span>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}
