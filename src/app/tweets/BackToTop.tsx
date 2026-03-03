'use client'

import { useEffect, useState } from 'react'

/**
 * Floating "back to top" button that appears after scrolling down 400px.
 * Uses smooth scrolling to return to the top of the page.
 * Positioned fixed at bottom-right corner.
 */
export function BackToTop() {
    const [show, setShow] = useState(false)

    // Listen for scroll events to toggle visibility
    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 400) // Show after scrolling 400px
        window.addEventListener('scroll', onScroll, { passive: true }) // passive for better perf
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    if (!show) return null

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-4 right-4 z-40 w-11 h-11 rounded-full bg-slate-800/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Back to top"
        >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 4l-8 8h5v8h6v-8h5z" />
            </svg>
        </button>
    )
}
