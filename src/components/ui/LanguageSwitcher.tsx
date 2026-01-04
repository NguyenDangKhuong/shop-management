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
            style={{ width: 100 }}
            suffixIcon={<GlobalOutlined />}
        >
            <Option value="vi">
                🇻🇳 VN
            </Option>
            <Option value="en">
                🇬🇧 EN
            </Option>
        </Select>
    )
}

export default LanguageSwitcher
