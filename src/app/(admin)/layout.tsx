import type { Metadata } from 'next'
import { SITE_NAME } from '@/utils/constants'

import AntdProvider from '@/components/providers/AntdProvider'
import DashboardLayout from '@/components/shop/DashboardLayout'
import '../globals.css'

export const metadata: Metadata = {
    title: `${SITE_NAME} - Admin`,
    description: `${SITE_NAME} Management Dashboard`
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AntdProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </AntdProvider>
    )
}

export default AdminLayout
