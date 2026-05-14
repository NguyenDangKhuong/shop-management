'use client'

import React from 'react'
import { useSoundContext } from '@/contexts/SoundContext'

export function SoundToggle() {
    const { isEnabled, toggleSound, playClick, playHover } = useSoundContext()

    const handleClick = () => {
        toggleSound()
        // Play click sound right after toggling if it just got enabled
        if (!isEnabled) {
            // Slight delay to allow state update if necessary, but direct AudioContext call in playClick works
            setTimeout(playClick, 50)
        }
    }

    return (
        <button
            onClick={handleClick}
            onMouseEnter={playHover}
            className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300 border ${
                isEnabled 
                ? 'bg-[var(--neon-cyan)]/20 border-[var(--neon-cyan)] shadow-[0_0_10px_var(--neon-cyan)]' 
                : 'bg-transparent border-border-dim text-text-muted hover:border-border-primary'
            }`}
            title="Toggle Sound Effects"
        >
            {isEnabled ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[var(--neon-cyan)]">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
            )}
        </button>
    )
}
