import { MetadataRoute } from 'next'
import { blogPosts } from './blogs/blogData'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://shop.thetaphoa.store'

export default function sitemap(): MetadataRoute.Sitemap {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${SITE_URL}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/leetcode`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]

    // Blog post pages
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${SITE_URL}/blogs/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [...staticPages, ...blogPages]
}
