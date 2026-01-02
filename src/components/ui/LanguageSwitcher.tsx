'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Select } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'

const { Option } = Select

const LanguageSwitcher = () => {
    const router = useRouter()
    const pathname = usePathname()

    // Get current locale from pathname
    const currentLocale = pathname?.startsWith('/en') ? 'en' : 'vi'

    const handleLanguageChange = (locale: string) => {
        // Remove current locale prefix if exists
        let newPath = pathname
        if (pathname?.startsWith('/en') || pathname?.startsWith('/vi')) {
            newPath = pathname.slice(3) || '/'
        }

        // Add new locale prefix (except for default 'vi')
        const finalPath = locale === 'vi' ? newPath : `/${locale}${newPath}`

        router.push(finalPath)
    }

    return (
        <Select
            value={currentLocale}
            onChange={handleLanguageChange}
            style={{ width: 120 }}
            suffixIcon={<GlobalOutlined />}
        >
            <Option value="vi">
                <span className="flex items-center gap-2">
                    🇻🇳 Tiếng Việt
                </span>
            </Option>
            <Option value="en">
                <span className="flex items-center gap-2">
                    🇬🇧 English
                </span>
            </Option>
        </Select>
    )
}

export default LanguageSwitcher
