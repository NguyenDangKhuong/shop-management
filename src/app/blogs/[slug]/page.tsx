import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogBySlug, getAllSlugs } from '../blogData'
import { LangProvider } from '../components/LangContext'
import { BlogDetailContent } from '../components/BlogDetailContent'
import { SITE_URL, PUBLIC_SITE_NAME, AUTHOR_NAME } from '@/utils/constants'

interface BlogDetailPageProps {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = getBlogBySlug(slug)
    if (!post) return { title: 'Not Found' }

    const title = `${post.title.vi} | Blog - ${AUTHOR_NAME}`
    const description = post.description.vi
    const url = `${SITE_URL}/blogs/${slug}`

    return {
        title,
        description,
        keywords: [...post.tags, 'Frontend', 'JavaScript', AUTHOR_NAME],
        authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
        creator: AUTHOR_NAME,
        openGraph: {
            type: 'article',
            locale: 'vi_VN',
            alternateLocale: 'en_US',
            url,
            title: post.title.vi,
            description,
            siteName: PUBLIC_SITE_NAME,
            publishedTime: post.date,
            authors: [AUTHOR_NAME],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title.vi,
            description,
        },
        alternates: {
            canonical: url,
            languages: {
                'vi': `${url}?lang=vi`,
                'en': `${url}?lang=en`,
                'x-default': url,
            },
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const { slug } = await params
    const post = getBlogBySlug(slug)

    if (!post) {
        notFound()
    }

    const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)

    // JSON-LD Structured Data for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title.vi,
        description: post.description.vi,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            '@type': 'Person',
            name: AUTHOR_NAME,
            url: SITE_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: PUBLIC_SITE_NAME,
            url: SITE_URL,
        },
        url: `${SITE_URL}/blogs/${slug}`,
        inLanguage: ['vi', 'en'],
        keywords: post.tags.join(', '),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/blogs/${slug}`,
        },
    }

    // BreadcrumbList JSON-LD for navigation
    const breadcrumbLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: SITE_URL,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${SITE_URL}/blogs`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title.vi,
                item: `${SITE_URL}/blogs/${slug}`,
            },
        ],
    }

    return (
        <LangProvider>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />
            <BlogDetailContent post={post} relatedPosts={relatedPosts} />
        </LangProvider>
    )
}

