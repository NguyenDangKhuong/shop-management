import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import NextAuthProvider from '@/components/providers/NextAuthProvider'
import AntdProvider from '@/components/providers/AntdProvider'
import { LanguageProvider } from '@/i18n'

import { ThemeProvider } from '@/contexts/ThemeContext'

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
  // PWA meta tags
  themeColor: '#1677ff',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'TheTapHoa',
  },
  formatDetection: {
    telephone: false,
  },
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover' as const,
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextAuthProvider>
          <LanguageProvider>
            <ThemeProvider>
              <AntdProvider>
                {children}
              </AntdProvider>
            </ThemeProvider>
          </LanguageProvider>
          <SpeedInsights />
          <Analytics />
        </NextAuthProvider>
      </body>
      <Script
        src='https://widget.cloudinary.com/v2.0/global/all.js'
        strategy="lazyOnload"
      />
      {/* Register PWA Service Worker */}
      <Script id="sw-register" strategy="afterInteractive">
        {`
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
              .then(reg => console.log('✅ SW registered:', reg.scope))
              .catch(err => console.error('❌ SW failed:', err))
          }
        `}
      </Script>
    </html>
  )
}

export default RootLayout
