/**
 * LanguageSwitcher — Shared language toggle button.
 *
 * Used on both home page and blog pages.
 * Uses .theme-btn class from globals.css for consistent theming.
 * Accepts lang/onToggle props so it works with any context (useTranslation or useLang).
 */
'use client'

interface LanguageSwitcherProps {
    lang: string
    onToggle: () => void
}

export default function LanguageSwitcher({ lang, onToggle }: LanguageSwitcherProps) {
    return (
        <button
            onClick={onToggle}
            className="theme-btn flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm cursor-pointer"
            aria-label="Switch language"
        >
            <span className={`transition-opacity duration-200 ${lang === 'vi' ? 'opacity-100' : 'opacity-50'}`}>
                🇻🇳
            </span>
            <span className="text-xs text-text-muted">/</span>
            <span className={`transition-opacity duration-200 ${lang === 'en' ? 'opacity-100' : 'opacity-50'}`}>
                🇬🇧
            </span>
        </button>
    )
}
