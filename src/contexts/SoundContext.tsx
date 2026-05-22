'use client'

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'

interface SoundContextType {
    isEnabled: boolean
    toggleSound: () => void
    playHover: () => void
    playClick: () => void
}

const SoundContext = createContext<SoundContextType>({
    isEnabled: false,
    toggleSound: () => {},
    playHover: () => {},
    playClick: () => {},
})

export function SoundProvider({ children }: { children: React.ReactNode }) {
    const [isEnabled, setIsEnabled] = useState(false)
    const audioCtxRef = useRef<AudioContext | null>(null)
    const lastHoveredRef = useRef<Element | null>(null)

    useEffect(() => {
        const stored = localStorage.getItem('sound_enabled')
        if (stored === 'true') {
            setIsEnabled(true)
        }
    }, [])

    const toggleSound = () => {
        setIsEnabled((prev) => {
            const next = !prev
            localStorage.setItem('sound_enabled', String(next))
            if (next && !audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
            }
            return next
        })
    }

    const initCtx = () => {
        if (!audioCtxRef.current) {
            audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        }
        if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume()
        }
        return audioCtxRef.current
    }

    const playHover = useCallback(() => {
        if (!isEnabled) return
        const ctx = initCtx()
        
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        
        osc.type = 'sine'
        osc.frequency.setValueAtTime(800, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05)
        
        gain.gain.setValueAtTime(0, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
        
        osc.connect(gain)
        gain.connect(ctx.destination)
        
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.1)
    }, [isEnabled])

    const playClick = useCallback(() => {
        if (!isEnabled) return
        const ctx = initCtx()
        
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        
        osc.type = 'square'
        osc.frequency.setValueAtTime(300, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1)
        
        gain.gain.setValueAtTime(0, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
        
        osc.connect(gain)
        gain.connect(ctx.destination)
        
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.15)
    }, [isEnabled])

    useEffect(() => {
        if (!isEnabled) return

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const interactive = target.closest('a, button, [role="button"]')
            if (interactive) {
                if (interactive.getAttribute('data-sound-hover') === 'none') return

                if (interactive !== lastHoveredRef.current) {
                    lastHoveredRef.current = interactive
                    playHover()
                }
            } else {
                lastHoveredRef.current = null
            }
        }

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const interactive = target.closest('a, button, [role="button"]')
            if (interactive) {
                if (interactive.getAttribute('data-sound-click') === 'none') return
                playClick()
            }
        }

        document.addEventListener('mouseover', handleMouseOver)
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('mouseover', handleMouseOver)
            document.removeEventListener('click', handleClick)
        }
    }, [isEnabled, playHover, playClick])

    return (
        <SoundContext.Provider value={{ isEnabled, toggleSound, playHover, playClick }}>
            {children}
        </SoundContext.Provider>
    )
}

export function useSoundContext() {
    return useContext(SoundContext)
}
