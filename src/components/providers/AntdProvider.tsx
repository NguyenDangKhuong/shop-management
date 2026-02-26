'use client'

import { App, ConfigProvider, theme as antdTheme } from 'antd'

import StyledComponentsRegistry from '@/lib/antdRegistry'
import themeConfig from '@/theme/themeConfig'
import { ThemeProvider, useThemeMode } from '@/contexts/ThemeContext'

interface AntdProviderProps {
    children: React.ReactNode
}

function AntdConfigured({ children }: AntdProviderProps) {
    const { isDarkMode } = useThemeMode()

    return (
        <ConfigProvider theme={{
            ...themeConfig,
            algorithm: isDarkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        }}>
            <App>{children}</App>
        </ConfigProvider>
    )
}

export default function AntdProvider({ children }: AntdProviderProps) {
    return (
        <StyledComponentsRegistry>
            <ThemeProvider>
                <AntdConfigured>{children}</AntdConfigured>
            </ThemeProvider>
        </StyledComponentsRegistry>
    )
}
