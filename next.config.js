/** @type {import('next').NextConfig} */

const path = require('path')
const { i18n } = require('./next-i18next.config')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  },
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb'
    }
  },
  // i18n config không được hỗ trợ trong App Router
  // i18n,

  // TWEETS_ONLY_DOMAIN: chỉ cho phép /tweets, redirect tất cả path khác về /tweets
  // Chạy ở CDN level → không tốn Vercel Function transfer
  async redirects() {
    const tweetsOnlyDomain = process.env.TWEETS_ONLY_DOMAIN || ''
    if (!tweetsOnlyDomain) return []
    return tweetsOnlyDomain.split(',').map(domain => ({
      source: '/:path((?!tweets|_next|api|favicon|sw\\.js|manifest\\.json|workbox-.*).*)',
      has: [{ type: 'host', value: domain.trim() }],
      destination: '/tweets',
      permanent: false
    }))
  }
}

module.exports = withBundleAnalyzer({ ...nextConfig })
// todo: if you have 2 plugin an more, use next-compose-plugins
// Ex: module.exports = withPlugins([...plugins, withBundleAnalyzer], nextConfiguration);

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'ndk-jr',
  project: 'shop-management',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true
    }
  }
})
