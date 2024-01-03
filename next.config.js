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
  i18n,
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
          }
          // { key: "Authorization", value: `Bearer ${userToken()}`}
        ]
      }
    ]
  }
}

module.exports = withBundleAnalyzer({ ...nextConfig })
// todo: if you have 2 plugin an more, use next-compose-plugins
// Ex: module.exports = withPlugins([...plugins, withBundleAnalyzer], nextConfiguration);
