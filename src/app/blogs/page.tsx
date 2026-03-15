import { Metadata } from 'next'
import { blogPosts } from './blogData'
import { LangProvider } from './components/LangContext'
import { BlogListContent } from './components/BlogListContent'
import { SITE_URL, PUBLIC_SITE_NAME, AUTHOR_NAME } from '@/utils/constants'

export const metadata: Metadata = {
    title: `Blog - Frontend Knowledge | ${AUTHOR_NAME}`,
    description:
        'Chia sẻ kiến thức Frontend chuyên sâu: JavaScript, React, Next.js, TypeScript — bao gồm các bài viết về ECMAScript features, React Hooks, Event Loop, Data Structures, Unit Testing và nhiều hơn nữa.',
    keywords: [
        'Frontend',
        'JavaScript',
        'React',
        'Next.js',
        'TypeScript',
        'React Hooks',
        'Event Loop',
        'ECMAScript',
        'Web Development',
        'Unit Testing',
        'Data Structures',
        AUTHOR_NAME,
    ],
    authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
    creator: AUTHOR_NAME,
    openGraph: {
        type: 'website',
        locale: 'vi_VN',
        alternateLocale: 'en_US',
        url: `${SITE_URL}/blogs`,
        title: `Blog - Frontend Knowledge | ${AUTHOR_NAME}`,
        description:
            'Chia sẻ kiến thức Frontend chuyên sâu: JavaScript, React, Next.js, TypeScript và nhiều hơn nữa.',
        siteName: PUBLIC_SITE_NAME,
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog - Frontend Knowledge | Nguyen Dang Khuong',
        description:
            'Chia sẻ kiến thức Frontend chuyên sâu: JavaScript, React, Next.js, TypeScript và nhiều hơn nữa.',
    },
    alternates: {
        canonical: `${SITE_URL}/blogs`,
        languages: {
            'vi': `${SITE_URL}/blogs?lang=vi`,
            'en': `${SITE_URL}/blogs?lang=en`,
            'x-default': `${SITE_URL}/blogs`,
        },
        types: {
            'application/rss+xml': `${SITE_URL}/feed.xml`,
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

export default function BlogsPage() {
    return (
        <LangProvider>
            <BlogListContent posts={blogPosts} />
        </LangProvider>
    )
}
