import type { Metadata } from 'next'

import AntdProvider from '@/components/providers/AntdProvider'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export const metadata: Metadata = {
    title: 'Yumy Shop - Admin',
    description: 'Yumy Shop Management Dashboard'
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AntdProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </AntdProvider>
    )
}

export default AdminLayout
