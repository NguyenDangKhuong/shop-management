import type { Metadata } from 'next'

import { App, ConfigProvider } from 'antd'

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import StyledComponentsRegistry from '@/lib/antdRegistry'
import theme from '@/theme/themeConfig'

export const metadata: Metadata = {
    title: 'Yumy Shop - Admin',
    description: 'Yumy Shop Management Dashboard'
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <StyledComponentsRegistry>
            <ConfigProvider theme={theme}>
                <App>
                    <DashboardLayout>{children}</DashboardLayout>
                </App>
            </ConfigProvider>
        </StyledComponentsRegistry>
    )
}

export default AdminLayout
