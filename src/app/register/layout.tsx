import type { Metadata } from 'next'

import AntdProvider from '@/components/providers/AntdProvider'

export const metadata: Metadata = {
    title: 'Register - Yumy Shop',
    description: 'Register for Yumy Shop'
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return <AntdProvider>{children}</AntdProvider>
}
