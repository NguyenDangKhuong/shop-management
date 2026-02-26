'use client'

import { useTranslation } from '@/i18n'

const LanguageSwitcher = () => {
    const { language, setLanguage } = useTranslation()

    const toggle = () => {
        setLanguage(language === 'en' ? 'vi' : 'en')
    }

    return (
        <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 text-sm text-gray-600 dark:text-slate-300 hover:border-[#38bdf8]/50 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer"
            aria-label="Switch language"
        >
            <span>{language === 'en' ? '🇬🇧' : '🇻🇳'}</span>
            <span className="font-medium">{language === 'en' ? 'EN' : 'VN'}</span>
        </button>
    )
}

export default LanguageSwitcher
