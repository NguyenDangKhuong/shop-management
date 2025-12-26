import { App, ConfigProvider } from 'antd'

import StyledComponentsRegistry from '@/lib/antdRegistry'
import theme from '@/theme/themeConfig'

interface AntdProviderProps {
    children: React.ReactNode
}

export default function AntdProvider({ children }: AntdProviderProps) {
    return (
        <StyledComponentsRegistry>
            <ConfigProvider theme={theme}>
                <App>{children}</App>
            </ConfigProvider>
        </StyledComponentsRegistry>
    )
}
