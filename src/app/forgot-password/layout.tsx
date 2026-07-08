import type { Metadata } from 'next'
import { SITE_NAME } from '@/utils/constants'

import AntdProvider from '@/components/providers/AntdProvider'

export const metadata: Metadata = {
    title: `Forgot Password - ${SITE_NAME}`,
    description: `Reset your ${SITE_NAME} password`
}

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
    return <AntdProvider>{children}</AntdProvider>
}
