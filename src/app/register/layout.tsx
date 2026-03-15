import type { Metadata } from 'next'
import { SITE_NAME } from '@/utils/constants'

import AntdProvider from '@/components/providers/AntdProvider'

export const metadata: Metadata = {
    title: `Register - ${SITE_NAME}`,
    description: `Register for ${SITE_NAME}`
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return <AntdProvider>{children}</AntdProvider>
}
