import type { Metadata } from 'next'

import AntdProvider from '@/components/providers/AntdProvider'

export const metadata: Metadata = {
    title: 'Login - TheTapHoa',
    description: 'Login to TheTapHoa'
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <AntdProvider>{children}</AntdProvider>
}
