import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogBySlug, getAllSlugs } from '../blogData'
import { LangProvider } from '../components/LangContext'
import { BlogDetailContent } from '../components/BlogDetailContent'

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

    return {
        title: `${post.title.vi} | Blog - Nguyen Dang Khuong`,
        description: post.description.vi,
    }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const { slug } = await params
    const post = getBlogBySlug(slug)

    if (!post) {
        notFound()
    }

    const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)

    return (
        <LangProvider>
            <BlogDetailContent post={post} relatedPosts={relatedPosts} />
        </LangProvider>
    )
}
