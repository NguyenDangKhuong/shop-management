'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface ThemeContextType {
    isDarkMode: boolean
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => { },
})

const STORAGE_KEY = 'dashboard-theme-mode'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'dark') {
            setIsDarkMode(true)
        }
        setMounted(true)
    }, [])

    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => {
            const next = !prev
            localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
            return next
        })
    }, [])

    // Prevent flash on first render
    if (!mounted) return null

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeMode = () => useContext(ThemeContext)
