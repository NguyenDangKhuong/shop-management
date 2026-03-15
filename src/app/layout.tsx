import type { Metadata } from 'next'
import { PUBLIC_SITE_NAME, AUTHOR_NAME } from '@/utils/constants'
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
  metadataBase: new URL('https://thetaphoa.com'),
  title: {
    default: `${PUBLIC_SITE_NAME} — Frontend Knowledge Blog | ${AUTHOR_NAME}`,
    template: `%s | ${PUBLIC_SITE_NAME}`,
  },
  description: 'Chia sẻ kiến thức Frontend chuyên sâu: JavaScript, React, Next.js, TypeScript, System Design, Algorithm Patterns — dành cho developer Việt Nam muốn phỏng vấn Big Tech.',
  keywords: [
    'Frontend', 'JavaScript', 'React', 'Next.js', 'TypeScript',
    'System Design', 'Algorithm', 'LeetCode', 'Interview',
    AUTHOR_NAME, PUBLIC_SITE_NAME, 'Web Development',
  ],
  authors: [{ name: AUTHOR_NAME, url: 'https://thetaphoa.com' }],
  creator: AUTHOR_NAME,
  publisher: PUBLIC_SITE_NAME,
  manifest: '/favicon_io/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    alternateLocale: 'en_US',
    url: 'https://thetaphoa.com',
    siteName: PUBLIC_SITE_NAME,
    title: `${PUBLIC_SITE_NAME} — Frontend Knowledge Blog`,
    description: 'Chia sẻ kiến thức Frontend chuyên sâu: JavaScript, React, Next.js, TypeScript, System Design.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PUBLIC_SITE_NAME} — Frontend Knowledge Blog`,
    description: 'Chia sẻ kiến thức Frontend chuyên sâu cho developer Việt Nam.',
  },
  alternates: {
    canonical: 'https://thetaphoa.com',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  // PWA meta tags
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: PUBLIC_SITE_NAME,
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
  themeColor: '#0a0a0a',
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
