import type { Metadata } from 'next'

import AntdProvider from '@/components/providers/AntdProvider'
import DashboardLayout from '@/components/shop/DashboardLayout'
import '../globals.css'

export const metadata: Metadata = {
    title: 'TheTapHoa - Admin',
    description: 'TheTapHoa Management Dashboard'
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AntdProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </AntdProvider>
    )
}

export default AdminLayout
