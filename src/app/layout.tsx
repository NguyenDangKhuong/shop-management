import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { App, ConfigProvider } from 'antd'

import './globals.css'

import DashboardLayout from '@/components/dashboard/DashboardLayout'
import StyledComponentsRegistry from '@/lib/antdRegistry'
import theme from '@/theme/themeConfig'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yumy Shop',
  description: 'Yumy Shop, Cu Chi, TPHCM, Viet Nam'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>
            <App>
              <DashboardLayout>{children}</DashboardLayout>
            </App>
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
      <Script src='https://widget.cloudinary.com/v2.0/global/all.js'></Script>
    </html>
  )
}
