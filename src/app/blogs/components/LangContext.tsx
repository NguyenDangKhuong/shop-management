'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { Lang } from '../types'

interface LangContextType {
    lang: Lang
    setLang: (lang: Lang) => void
    t: (obj: Record<Lang, string>) => string
}

const LangContext = createContext<LangContextType>({
    lang: 'en',
    setLang: () => { },
    t: (obj) => obj.en,
})

export function LangProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>('en')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('blog-lang') as Lang | null
        if (saved === 'vi' || saved === 'en') {
            setLangState(saved)
        }
        setMounted(true)
    }, [])

    const setLang = useCallback((newLang: Lang) => {
        setLangState(newLang)
        localStorage.setItem('blog-lang', newLang)
    }, [])

    const t = useCallback((obj: Record<Lang, string>) => {
        return obj[lang] || obj.en
    }, [lang])

    // Prevent hydration mismatch — render English by default on server
    if (!mounted) {
        return (
            <LangContext.Provider value={{ lang: 'en', setLang, t: (obj) => obj.en }}>
                {children}
            </LangContext.Provider>
        )
    }

    return (
        <LangContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LangContext.Provider>
    )
}

export function useLang() {
    return useContext(LangContext)
}
