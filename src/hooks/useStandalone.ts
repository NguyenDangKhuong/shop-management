'use client'

/**
 * ========================================================================
 * useStandalone — Detect PWA standalone mode (Add to Home Screen)
 * ========================================================================
 *
 * Returns true ONLY when the app is opened as a standalone PWA
 * (e.g. from Home Screen on iOS/Android), NOT regular mobile browser.
 *
 * Use cases:
 * - Show/hide bottom tab bar
 * - Apply safe area padding
 * - Hide browser-style navigation
 */

import { useState, useEffect } from 'react'

interface StandaloneState {
    isStandalone: boolean   // Opened from Home Screen (iOS/Android)
    isReady: boolean        // Hook has initialized (avoid SSR flash)
}

export function useStandalone(): StandaloneState {
    const [state, setState] = useState<StandaloneState>({
        isStandalone: false,
        isReady: false,
    })

    useEffect(() => {
        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            (navigator as unknown as { standalone?: boolean }).standalone === true

        setState({ isStandalone, isReady: true })
    }, [])

    return state
}
