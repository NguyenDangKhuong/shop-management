/**
 * SiteHeader — Shared sticky header (LandingPage, BlogList, BlogDetail).
 *
 * THEMING: Uses CSS custom properties from globals.css (--bg-header, --text-primary, etc.)
 * No dark: classes needed — colors auto-switch when .dark class toggles on <html>.
 */
'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { RadarNav } from '@/components/ui/RadarNav'
import { SoundToggle } from '@/components/ui/SoundToggle'

interface SiteHeaderProps {
    /** Tailwind max-width class: 'max-w-3xl' | 'max-w-4xl' | 'max-w-6xl' */
    maxWidth?: string
    /** Content rendered on the right side (buttons, lang switcher, etc.) */
    rightSlot?: React.ReactNode
    /** Show reading progress bar at the top */
    showProgress?: boolean
}

/**
 * Shared sticky header with shrink-on-scroll behavior.
 * Uses CSS custom properties (--bg-header, --text-primary etc.) for theming.
 */
export default function SiteHeader({
    maxWidth = 'max-w-4xl',
    rightSlot,
    showProgress = false,
}: SiteHeaderProps) {
    const [scrolled, setScrolled] = useState(false)
    const progressRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 60)
            if (progressRef.current) {
                const docHeight = document.documentElement.scrollHeight - window.innerHeight
                const pct = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0
                progressRef.current.style.transform = `scaleX(${pct})`
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            {/* Reading Progress Bar */}
            {showProgress && (
                <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-transparent">
                    <div
                        ref={progressRef}
                        className="h-full w-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 will-change-transform"
                        style={{ transform: 'scaleX(0)' }}
                    />
                </div>
            )}

            {/* Sticky Header */}
            <header
                className={`w-full sticky top-0 z-50 transition-[padding,background-color,border-color,box-shadow] duration-300 backdrop-blur-xl border-b`}
                style={{
                    backgroundColor: scrolled ? 'var(--bg-header-scrolled)' : 'var(--bg-header)',
                    borderColor: scrolled ? 'var(--border-primary)' : 'transparent',
                    boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
                    paddingTop: `max(env(safe-area-inset-top), ${scrolled ? '8px' : '16px'})`,
                    paddingBottom: scrolled ? '8px' : '16px',
                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 10px))'
                }}
            >
                <div className={`${maxWidth} mx-auto px-4 md:px-8 transition-all duration-300 relative`}>
                    {/* Decorative HUD Corner Accents */}
                    <div className="absolute top-0 left-2 w-2 h-2 border-l border-t border-[var(--neon-cyan)] opacity-50" />
                    <div className="absolute top-0 right-2 w-2 h-2 border-r border-t border-[var(--neon-cyan)] opacity-50" />

                    {/* Mobile */}
                    <div className="flex md:hidden items-center w-full">
                        <div className="flex-1 flex justify-start">
                            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                                <div className={`rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#c084fc] flex items-center justify-center font-bold text-white shadow-lg transition-all duration-300 ${scrolled ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'}`}>
                                    K
                                </div>
                                <span
                                    className={`font-bold tracking-tight transition-all duration-300 ${scrolled ? 'text-base' : 'text-xl'}`}

                                >
                                    Khuong<span className="text-[#38bdf8]">.Dev</span>
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-2">
                            <SoundToggle />
                            <ThemeToggle />
                            {rightSlot}
                            <RadarNav />
                        </div>
                    </div>
                    {/* Desktop */}
                    <div className="hidden md:flex justify-between items-center w-full">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                            <div className={`rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#c084fc] flex items-center justify-center font-bold text-white shadow-lg transition-all duration-300 ${scrolled ? 'w-6 h-6 text-xs' : 'w-8 h-8 text-sm'}`}>
                                K
                            </div>
                            <span
                                className={`font-bold tracking-tight transition-all duration-300 ${scrolled ? 'text-base' : 'text-xl'}`}

                            >
                                Khuong<span className="text-[#38bdf8]">.Dev</span>
                            </span>
                        </Link>

                        {/* System Status (HUD) */}
                        <div className="hidden lg:flex items-center gap-4 mx-4 flex-1 justify-center opacity-70">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent opacity-30" />
                            <div className="font-mono text-[10px] tracking-widest text-[var(--neon-cyan)] whitespace-nowrap animate-pulse">
                                SYS.ONLINE // CPU: {Math.floor(Math.random() * 20 + 10)}% // UPLINK: STABLE
                            </div>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent opacity-30" />
                        </div>

                        <div className="flex items-center gap-3">
                            <SoundToggle />
                            <ThemeToggle />
                            {rightSlot}
                            <RadarNav />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
