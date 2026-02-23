import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogBySlug, getAllSlugs } from '../blogData'

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
        title: `${post.title} | Blog - Nguyen Dang Khuong`,
        description: post.description,
    }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const { slug } = await params
    const post = getBlogBySlug(slug)

    if (!post) {
        notFound()
    }

    // Find related posts (exclude current)
    const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2)

    return (
        <div className="bg-[#0a0a0a] text-slate-200 font-sans min-h-screen flex flex-col items-center p-4 md:p-8 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-[#0a0a0a] relative">
            {/* Header */}
            <header className="w-full max-w-3xl mx-auto flex justify-between items-center mb-12 z-20">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#c084fc] flex items-center justify-center font-bold text-white shadow-lg">
                        Y
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">
                        The<span className="text-[#38bdf8]">TapHoa</span>
                    </span>
                </Link>

                <Link
                    href="/blogs"
                    className="text-sm text-slate-400 hover:text-white transition flex items-center gap-1"
                >
                    ← Tất cả bài viết
                </Link>
            </header>

            {/* Article */}
            <article className="w-full max-w-3xl mx-auto z-10">
                {/* Article Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-4xl">{post.emoji}</span>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2.5 py-1 text-xs rounded-full border border-white/10 text-slate-300"
                                    style={{ backgroundColor: `${post.color}15` }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
                        {post.title}
                    </h1>

                    <p className="text-slate-400 text-lg leading-relaxed mb-4">
                        {post.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span>📅 {post.date}</span>
                        <span>·</span>
                        <span>☕ ~10 phút đọc</span>
                    </div>

                    {/* Gradient Divider */}
                    <div
                        className="h-0.5 w-full mt-6 rounded-full opacity-50"
                        style={{ background: `linear-gradient(to right, ${post.color}, transparent)` }}
                    />
                </div>

                {/* Article Content */}
                <div className="prose-custom">
                    {post.content}
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="w-full max-w-3xl mx-auto mt-16 z-10">
                    <div
                        className="h-px w-full mb-8 opacity-30"
                        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)' }}
                    />
                    <h3 className="text-xl font-bold text-white mb-6">Bài viết khác</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {relatedPosts.map((related) => (
                            <Link
                                key={related.slug}
                                href={`/blogs/${related.slug}`}
                                className="group rounded-xl bg-slate-800/40 border border-white/10 p-5 hover:border-white/20 hover:bg-slate-800/60 transition-all duration-300 no-underline"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <span>{related.emoji}</span>
                                    <span className="text-sm font-semibold text-white group-hover:text-[#38bdf8] transition">
                                        {related.title}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 line-clamp-2">{related.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="w-full max-w-3xl mx-auto mt-16 pt-8 pb-6 border-t border-slate-700/50 z-20 text-center">
                <p className="text-sm text-slate-500">
                    Built with Next.js, TypeScript & MongoDB
                </p>
            </footer>

            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>
        </div>
    )
}
