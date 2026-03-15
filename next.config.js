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
      bodySizeLimit: '100mb',
    },
  },
  // i18n config không được hỗ trợ trong App Router
  // i18n,

  // TWEETS_ONLY_DOMAIN: chỉ cho phép /tweets, redirect tất cả path khác về /tweets
  // Chạy ở CDN level → không tốn Vercel Function transfer
  async redirects() {
    const tweetsOnlyDomain = process.env.TWEETS_ONLY_DOMAIN || ''
    if (!tweetsOnlyDomain) return []
    return tweetsOnlyDomain.split(',').map(domain => ({
      source: '/:path((?!tweets|_next|api|favicon).*)',
      has: [{ type: 'host', value: domain.trim() }],
      destination: '/tweets',
      permanent: false,
    }))
  },
}

module.exports = withBundleAnalyzer({ ...nextConfig })
// todo: if you have 2 plugin an more, use next-compose-plugins
// Ex: module.exports = withPlugins([...plugins, withBundleAnalyzer], nextConfiguration);
