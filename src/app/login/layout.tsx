import type { Metadata } from 'next'
import { SITE_NAME } from '@/utils/constants'

import AntdProvider from '@/components/providers/AntdProvider'

export const metadata: Metadata = {
    title: `Login - ${SITE_NAME}`,
    description: `Login to ${SITE_NAME}`
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <AntdProvider>{children}</AntdProvider>
}
