/**
 * ThemeToggle — Sun/Moon button to switch light/dark mode.
 *
 * Uses useThemeMode() hook to toggle .dark class on <html>.
 * Button styling uses .theme-btn-round class from globals.css.
 * Only component that needs isDarkMode for icon animation (sun ↔ moon).
 */
'use client'

import { useThemeMode } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
    const { isDarkMode, toggleTheme } = useThemeMode()

    return (
        <button
            onClick={toggleTheme}
            className="theme-btn-round relative w-9 h-9 rounded-full flex items-center justify-center shadow-sm cursor-pointer"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Light mode' : 'Dark mode'}
        >
            {/* Sun icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className={`w-4 h-4 text-yellow-500 absolute transition-all duration-300 ${isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            {/* Moon icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className={`w-4 h-4 text-blue-400 absolute transition-all duration-300 ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
        </button>
    )
}
