'use client'

import React, { useEffect, useState } from 'react'

export function RadarNav() {
    const [scrollPct, setScrollPct] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight
            const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
            setScrollPct(Math.min(100, Math.max(0, pct)))
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        // Initial call
        handleScroll()
        
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="relative w-8 h-8 rounded-full border border-[var(--neon-cyan)]/50 bg-[var(--neon-cyan)]/5 overflow-hidden flex-shrink-0" style={{ boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.1)' }}>
            {/* Crosshairs */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[var(--neon-cyan)]/30 -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 w-[1px] h-full bg-[var(--neon-cyan)]/30 -translate-x-1/2" />
            
            {/* Concentric circles */}
            <div className="absolute inset-[20%] rounded-full border border-[var(--neon-cyan)]/20" />
            <div className="absolute inset-[40%] rounded-full border border-[var(--neon-cyan)]/20" />
            
            {/* Sweep animation */}
            <div 
                className="absolute top-1/2 left-1/2 w-[50%] h-[50%] origin-top-left bg-gradient-to-br from-[var(--neon-cyan)]/40 to-transparent pointer-events-none"
                style={{ 
                    animation: 'radar-sweep 4s linear infinite',
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
                }}
            />

            {/* Scroll position blip */}
            <div 
                className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_5px_#fff,0_0_10px_var(--neon-cyan)] z-10 transition-all duration-300 ease-out"
                style={{
                    // Map scroll percentage to an angle and radius, or just map it to Y axis for simplicity
                    // Let's make it travel in an arc or just top-to-bottom on the right side
                    top: `${5 + (scrollPct * 0.9)}%`,
                    left: `${50 + Math.sin((scrollPct / 100) * Math.PI) * 35}%`,
                    transform: 'translate(-50%, -50%)'
                }}
            />

            <style jsx>{`
                @keyframes radar-sweep {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}
