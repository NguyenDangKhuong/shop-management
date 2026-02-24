import { Metadata } from 'next'
import { blogPosts } from './blogData'
import { LangProvider } from './components/LangContext'
import { BlogListContent } from './components/BlogListContent'

export const metadata: Metadata = {
    title: 'Blog - Frontend Knowledge | Nguyen Dang Khuong',
    description: 'Chia sẻ kiến thức Frontend: JavaScript, React, TypeScript, và nhiều hơn nữa.',
}

export default function BlogsPage() {
    return (
        <LangProvider>
            <BlogListContent posts={blogPosts} />
        </LangProvider>
    )
}
