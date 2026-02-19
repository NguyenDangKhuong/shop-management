'use client'

import { useTranslation, Language } from '@/i18n'

const LanguageSwitcher = () => {
    const { language, setLanguage } = useTranslation()

    const toggle = () => {
        setLanguage(language === 'en' ? 'vi' : 'en')
    }

    return (
        <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 hover:border-[#38bdf8]/50 hover:text-white transition-all cursor-pointer"
            aria-label="Switch language"
        >
            <span>{language === 'en' ? '🇬🇧' : '🇻🇳'}</span>
            <span className="font-medium">{language === 'en' ? 'EN' : 'VN'}</span>
        </button>
    )
}

export default LanguageSwitcher
