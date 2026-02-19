'use client'

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'
import en, { TranslationKeys } from './en'
import vi from './vi'

type Language = 'en' | 'vi'
type Translations = Record<TranslationKeys, string>

const translations: Record<Language, Translations> = { en, vi }

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: TranslationKeys) => string
}

const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => { },
    t: (key) => key,
})

const STORAGE_KEY = 'lang'

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLang] = useState<Language>('en')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY) as Language | null
        if (saved && (saved === 'en' || saved === 'vi')) {
            setLang(saved)
        }
        setMounted(true)
    }, [])

    const setLanguage = useCallback((lang: Language) => {
        setLang(lang)
        localStorage.setItem(STORAGE_KEY, lang)
    }, [])

    const t = useCallback(
        (key: TranslationKeys): string => {
            return translations[language][key] || key
        },
        [language]
    )

    // Prevent hydration mismatch by rendering with default lang until mounted
    const value = {
        language: mounted ? language : 'en' as Language,
        setLanguage,
        t: mounted ? t : (key: TranslationKeys) => en[key] || key,
    }

    return (
        <LanguageContext.Provider value= { value } >
        { children }
        </LanguageContext.Provider>
  )
}

export function useTranslation() {
    return useContext(LanguageContext)
}

export type { Language, TranslationKeys as TKey }
