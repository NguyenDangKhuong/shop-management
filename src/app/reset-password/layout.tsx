import type { Metadata } from 'next'
import { SITE_NAME } from '@/utils/constants'

import AntdProvider from '@/components/providers/AntdProvider'

export const metadata: Metadata = {
    title: `Reset Password - ${SITE_NAME}`,
    description: `Set your new ${SITE_NAME} password`
}

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
    return <AntdProvider>{children}</AntdProvider>
}
