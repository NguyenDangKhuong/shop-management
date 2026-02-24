'use client'

import { useLang } from './LangContext'

export default function LangSwitcher() {
    const { lang, setLang } = useLang()

    return (
        <button
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/60 border border-white/10 hover:border-white/20 hover:bg-slate-800/80 transition-all duration-200 text-sm"
            aria-label="Switch language"
        >
            <span className={`transition-opacity duration-200 ${lang === 'vi' ? 'opacity-100' : 'opacity-50'}`}>
                🇻🇳
            </span>
            <span className="text-slate-500 text-xs">/</span>
            <span className={`transition-opacity duration-200 ${lang === 'en' ? 'opacity-100' : 'opacity-50'}`}>
                🇬🇧
            </span>
        </button>
    )
}
