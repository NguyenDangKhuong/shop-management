import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import NextAuthProvider from '@/components/providers/NextAuthProvider'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yumy Shop',
  description: 'Yumy Shop, Cu Chi, TPHCM, Viet Nam'
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextAuthProvider>
          {children}
          <SpeedInsights />
          <Analytics />
        </NextAuthProvider>
      </body>
      <Script src='https://widget.cloudinary.com/v2.0/global/all.js'></Script>
    </html>
  )
}

export default RootLayout
