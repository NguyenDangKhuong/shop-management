'use client'

/**
 * Theme Context — Core theme management.
 *
 * HOW IT WORKS:
 * - Adds/removes `.dark` class on <html> element
 * - CSS variables in globals.css react to `.dark` class automatically
 * - Preference saved to localStorage key 'dashboard-theme-mode'
 * - Default: dark mode (if no preference saved)
 *
 * TO CHANGE DEFAULT THEME: edit useState(true) below → false for light default
 * TO ADD NEW THEME TOKENS: edit globals.css :root and .dark sections
 */

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
    const [isDarkMode, setIsDarkMode] = useState(true)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'light') {
            setIsDarkMode(false)
            document.documentElement.classList.remove('dark')
        } else {
            // Default to dark mode
            setIsDarkMode(true)
            document.documentElement.classList.add('dark')
        }
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        if (isDarkMode) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
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
