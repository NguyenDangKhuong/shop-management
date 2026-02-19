import type { Metadata } from 'next'

import AntdProvider from '@/components/providers/AntdProvider'

export const metadata: Metadata = {
    title: 'Reset Password - TheTapHoa',
    description: 'Set your new TheTapHoa password'
}

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
    return <AntdProvider>{children}</AntdProvider>
}
