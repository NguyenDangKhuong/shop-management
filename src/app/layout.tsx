import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import NextAuthProvider from '@/components/providers/NextAuthProvider'
import AntdProvider from '@/components/providers/AntdProvider'
import { LanguageProvider } from '@/i18n'

import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'TheTapHoa',
  description: 'TheTapHoa, TPHCM, Viet Nam',
  manifest: '/favicon_io/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon_io/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/favicon_io/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'android-chrome-192x192', url: '/favicon_io/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/favicon_io/android-chrome-512x512.png' }
    ]
  }
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextAuthProvider>
          <LanguageProvider>
            <AntdProvider>
              {children}
            </AntdProvider>
          </LanguageProvider>
          <SpeedInsights />
          <Analytics />
        </NextAuthProvider>
      </body>
      <Script
        src='https://widget.cloudinary.com/v2.0/global/all.js'
        strategy="lazyOnload"
      />
    </html>
  )
}

export default RootLayout
