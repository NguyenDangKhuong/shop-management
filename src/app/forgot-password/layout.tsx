import type { Metadata } from 'next'

import AntdProvider from '@/components/providers/AntdProvider'

export const metadata: Metadata = {
    title: 'Forgot Password - TheTapHoa',
    description: 'Reset your TheTapHoa password'
}

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
    return <AntdProvider>{children}</AntdProvider>
}
