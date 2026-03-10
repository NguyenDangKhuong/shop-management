import { MetadataRoute } from 'next'
import { SITE_URL } from '@/utils/constants'


export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: ['/', '/blogs', '/blogs/*', '/leetcode'],
                disallow: ['/api/', '/login', '/register', '/forgot-password', '/reset-password'],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    }
}
