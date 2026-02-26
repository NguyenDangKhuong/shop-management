'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface ThemeContextType {
    isDarkMode: boolean
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: true,
    toggleTheme: () => { },
})

const STORAGE_KEY = 'theme-mode'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'light') {
            setIsDarkMode(false)
        } else if (saved === 'dark') {
            setIsDarkMode(true)
        }
        // Default is dark (no saved preference = dark)
        setMounted(true)
    }, [])

    // Sync dark class to <html> element
    useEffect(() => {
        if (!mounted) return
        const root = document.documentElement
        if (isDarkMode) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [isDarkMode, mounted])

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
