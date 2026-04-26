import { CodeBlock, Heading2, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'
import { TopicModal } from '../components/TopicModal'

export const enContent = (
    <>
        <Paragraph>
            <Highlight>SEO (Search Engine Optimization)</Highlight> is the practice of improving your website&apos;s
            visibility on search engines like Google. For frontend developers, understanding SEO is crucial
            — because the best code in the world means nothing if nobody can find it.
        </Paragraph>

        <Callout type="info">
            This guide covers both <Highlight>technical SEO</Highlight> (what you can implement in code) and
            <Highlight>content SEO</Highlight> (how to structure content for search engines). Focus on Next.js / React
            but applicable to any framework.
        </Callout>

        {/* ===== META TAGS ===== */}
        <Heading2>🏷️ Meta Tags & Head Optimization</Heading2>

        <Paragraph>
            Meta tags are the <Highlight>first thing</Highlight> search engines read. Getting them right is the
            foundation of all SEO work.
        </Paragraph>

        <div className="my-4 space-y-2">
            <TopicModal title="Essential Meta Tags" emoji="🏷️" color="#f59e0b" summary="title, description, canonical, robots — the must-have tags for every page">
                <Paragraph>Every page needs these <Highlight>core meta tags</Highlight>:</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">📌 Title Tag</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Most important on-page SEO element<br />
                            • Keep under <strong>60 characters</strong> (Google truncates after that)<br />
                            • Format: <InlineCode>Primary Keyword — Secondary Keyword | Brand</InlineCode><br />
                            • Every page must have a <strong>unique</strong> title<br />
                            • Place important keywords at the beginning
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📝 Meta Description</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Shown in search results below the title<br />
                            • Keep under <strong>155 characters</strong><br />
                            • Include primary keyword naturally<br />
                            • Write as a compelling CTA (call-to-action)<br />
                            • Each page must have a <strong>unique</strong> description
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🔗 Canonical URL</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Tells search engines the &quot;official&quot; URL for the page<br />
                            • Prevents <strong>duplicate content</strong> issues<br />
                            • Critical when same content at <InlineCode>/blog/post</InlineCode> and <InlineCode>/blog/post?ref=twitter</InlineCode><br />
                            • Always use absolute URLs
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🤖 Robots Meta</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>index, follow</InlineCode> (default) — crawl and index this page<br />
                            • <InlineCode>noindex, follow</InlineCode> — don&apos;t index but follow links<br />
                            • <InlineCode>noindex, nofollow</InlineCode> — completely ignore this page<br />
                            • Use <InlineCode>noindex</InlineCode> for admin pages, login, search results
                        </div>
                    </div>
                </div>

                <CodeBlock title="next.js-metadata.tsx">{`// Next.js App Router — static metadata
export const metadata: Metadata = {
  title: {
    default: 'My Blog — Frontend Knowledge',
    template: '%s | My Blog',  // child pages inherit this
  },
  description: 'Learn frontend development with in-depth guides...',
  metadataBase: new URL('https://example.com'),
  alternates: {
    canonical: 'https://example.com',
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

// Dynamic metadata for blog posts
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  return {
    title: post.title,  // becomes "Post Title | My Blog"
    description: post.description,
    alternates: { canonical: \`/blogs/\${params.slug}\` },
    openGraph: {
      type: 'article',
      publishedTime: post.date,
      authors: ['Author Name'],
      tags: post.tags,
    },
  }
}`}</CodeBlock>
                <Callout type="tip">In Next.js, use <Highlight>title.template</Highlight> in the root layout — child pages only need to set <InlineCode>title: &apos;Page Name&apos;</InlineCode> and it auto-appends <InlineCode>| Brand</InlineCode>.</Callout>
            </TopicModal>

            <TopicModal title="Open Graph & Twitter Cards" emoji="🌐" color="#3b82f6" summary="Control how your pages look when shared on social media">
                <Paragraph>When someone shares your link on Facebook, Twitter, or LinkedIn, <Highlight>OG tags</Highlight> control the preview:</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📘 Open Graph (Facebook, LinkedIn)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>og:title</InlineCode> — title shown in preview<br />
                            • <InlineCode>og:description</InlineCode> — description below title<br />
                            • <InlineCode>og:image</InlineCode> — preview image (<strong>1200×630px</strong> recommended)<br />
                            • <InlineCode>og:url</InlineCode> — canonical URL<br />
                            • <InlineCode>og:type</InlineCode> — &quot;website&quot; for homepage, &quot;article&quot; for blog posts<br />
                            • <InlineCode>og:locale</InlineCode> — language (e.g., &quot;vi_VN&quot;, &quot;en_US&quot;)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="text-cyan-400 font-bold text-sm">🐦 Twitter Cards</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>twitter:card</InlineCode> — &quot;summary_large_image&quot; (big image) or &quot;summary&quot; (small)<br />
                            • <InlineCode>twitter:title</InlineCode> — title for Twitter preview<br />
                            • <InlineCode>twitter:description</InlineCode> — description for Twitter<br />
                            • <InlineCode>twitter:image</InlineCode> — preview image (same as OG is fine)
                        </div>
                    </div>
                </div>

                <Callout type="warning">An <Highlight>OG image</Highlight> is the single biggest visual impact on click-through rate from social media. Links with images get <strong>3-5x more clicks</strong> than links without.</Callout>
            </TopicModal>
        </div>

        {/* ===== STRUCTURED DATA ===== */}
        <Heading2>📊 Structured Data (JSON-LD)</Heading2>

        <Paragraph>
            <Highlight>JSON-LD</Highlight> tells search engines exactly what your content is — enabling rich snippets
            (stars, FAQ, breadcrumbs) in search results.
        </Paragraph>

        <div className="my-4 space-y-2">
            <TopicModal title="Essential Schemas" emoji="📊" color="#8b5cf6" summary="BlogPosting, BreadcrumbList, FAQPage — schemas that boost search visibility">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">📝 BlogPosting / Article</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Tells Google this is a blog post/article<br />
                            • Includes: headline, description, author, datePublished, dateModified<br />
                            • Enables &quot;Published on&quot; and author info in search results<br />
                            • <strong>Must match</strong> visible content on the page
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🍞 BreadcrumbList</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Shows navigation path in search results: Home › Blog › Post Title<br />
                            • Improves click-through rate by showing context<br />
                            • Helps Google understand site structure<br />
                            • Each item has: position, name, item (URL)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">❓ FAQPage</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Shows Q&A directly in Google search results<br />
                            • Dramatically increases page real estate in SERPs<br />
                            • Great for blog posts with Q&A sections<br />
                            • Each question needs: name (question), acceptedAnswer (text)
                        </div>
                    </div>
                </div>

                <CodeBlock title="json-ld-examples.tsx">{`// BlogPosting schema
const blogPostLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Your Post Title',
  description: 'Post description for search engines',
  datePublished: '2025-01-15',
  dateModified: '2025-01-20',
  author: {
    '@type': 'Person',
    name: 'Author Name',
    url: 'https://example.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Site Name',
    logo: { '@type': 'ImageObject', url: 'https://example.com/logo.png' },
  },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://example.com/blog/post' },
}

// BreadcrumbList schema
const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://example.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://example.com/blog' },
    { '@type': 'ListItem', position: 3, name: 'Post Title', item: 'https://example.com/blog/post' },
  ],
}

// FAQPage schema — great for Q&A posts
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is SEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SEO (Search Engine Optimization) is the practice of improving...',
      },
    },
    {
      '@type': 'Question',
      name: 'How to improve page speed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use code splitting, lazy loading, image optimization...',
      },
    },
  ],
}

// In your page component:
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostLd) }}
/>`}</CodeBlock>
            </TopicModal>
        </div>

        {/* ===== TECHNICAL SEO ===== */}
        <Heading2>⚙️ Technical SEO</Heading2>

        <Paragraph>
            Technical SEO ensures search engines can <Highlight>crawl, index, and render</Highlight> your pages correctly.
        </Paragraph>

        <div className="my-4 space-y-2">
            <TopicModal title="Sitemap & Robots.txt" emoji="🗺️" color="#10b981" summary="Tell search engines what to crawl and how to find your content">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🗺️ Sitemap.xml</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Lists all indexable URLs on your site<br />
                            • Includes <InlineCode>lastmod</InlineCode>, <InlineCode>changefreq</InlineCode>, <InlineCode>priority</InlineCode><br />
                            • Auto-generated in Next.js with <InlineCode>sitemap.ts</InlineCode><br />
                            • Submit to Google Search Console for faster indexing<br />
                            • Update <InlineCode>lastmod</InlineCode> only when content actually changes
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">🤖 Robots.txt</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • First file search engines check<br />
                            • <InlineCode>Allow</InlineCode>: pages to crawl (/, /blogs, /blogs/*)<br />
                            • <InlineCode>Disallow</InlineCode>: pages to skip (/api/, /login, /admin)<br />
                            • Include sitemap URL reference<br />
                            • <strong>Never</strong> block CSS/JS files — Google needs them to render
                        </div>
                    </div>
                </div>

                <CodeBlock title="sitemap-and-robots.ts">{`// src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: 'https://example.com', lastModified: new Date(), priority: 1 },
    { url: 'https://example.com/blogs', lastModified: new Date(), priority: 0.9 },
  ]

  // Auto-generate from blog posts
  const blogPages = blogPosts.map((post) => ({
    url: \`https://example.com/blogs/\${post.slug}\`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...blogPages]
}

// src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{
      userAgent: '*',
      allow: ['/', '/blogs', '/blogs/*'],
      disallow: ['/api/', '/login', '/admin'],
    }],
    sitemap: 'https://example.com/sitemap.xml',
  }
}`}</CodeBlock>
            </TopicModal>

            <TopicModal title="Performance & Core Web Vitals" emoji="⚡" color="#ef4444" summary="Page speed directly impacts rankings — LCP, FID, CLS">
                <Paragraph>Google uses <Highlight>Core Web Vitals</Highlight> as a ranking factor since 2021:</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🖼️ LCP (Largest Contentful Paint) — under 2.5s</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Time for largest visible element to render<br />
                            • Fix: optimize images (WebP, lazy loading), preload fonts<br />
                            • Fix: reduce server response time (SSG/ISR)<br />
                            • Fix: remove render-blocking resources
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">👆 INP (Interaction to Next Paint) — under 200ms</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Time from user interaction to visual response<br />
                            • Fix: break up long tasks (code splitting)<br />
                            • Fix: defer non-critical JavaScript<br />
                            • Fix: use <InlineCode>startTransition</InlineCode> for non-urgent updates
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">📐 CLS (Cumulative Layout Shift) — under 0.1</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Measures visual stability (layout jumping)<br />
                            • Fix: always set <InlineCode>width</InlineCode> and <InlineCode>height</InlineCode> on images/videos<br />
                            • Fix: reserve space for dynamic content<br />
                            • Fix: avoid inserting content above existing content
                        </div>
                    </div>
                </div>

                <CodeBlock title="performance-optimizations.tsx">{`// 1. Next.js Image — auto-optimizes for LCP
import Image from 'next/image'
<Image
  src="/hero.jpg"
  width={1200} height={630}
  alt="Hero image"
  priority  // preloads for LCP
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// 2. Font optimization — prevent CLS
import { Inter } from 'next/font/google'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',    // show fallback font while loading
  preload: true,
  variable: '--font-inter',
})

// 3. Lazy loading — improve initial load
import dynamic from 'next/dynamic'
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,  // client-only if not needed for SEO
})

// 4. Preload critical resources
<link rel="preload" href="/critical.css" as="style" />
<link rel="preconnect" href="https://fonts.googleapis.com" />`}</CodeBlock>
                <Callout type="tip">Check your scores: <Highlight>PageSpeed Insights</Highlight> (pagespeed.web.dev), <Highlight>Lighthouse</Highlight> (Chrome DevTools), <Highlight>Web Vitals Extension</Highlight> (real-user data).</Callout>
            </TopicModal>

            <TopicModal title="SSR, SSG & ISR for SEO" emoji="🏗️" color="#8b5cf6" summary="Pre-rendering strategies and their SEO impact">
                <Paragraph>How you render pages <Highlight>directly impacts SEO</Highlight>:</Paragraph>

                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-border-primary">
                            <th className="text-left p-2 text-slate-400">Strategy</th>
                            <th className="text-left p-2 text-slate-400">SEO Impact</th>
                            <th className="text-left p-2 text-slate-400">When to Use</th>
                        </tr></thead>
                        <tbody className="text-text-secondary">
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">SSG (Static)</td><td className="p-2">⭐⭐⭐ Best — HTML ready at deploy</td><td className="p-2">Blog posts, docs, landing pages</td></tr>
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">ISR (Incremental)</td><td className="p-2">⭐⭐⭐ Great — static + revalidation</td><td className="p-2">e-commerce, frequently updated content</td></tr>
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">SSR (Server)</td><td className="p-2">⭐⭐ Good — HTML on each request</td><td className="p-2">Personalized content, real-time data</td></tr>
                            <tr><td className="p-2 font-bold">CSR (Client)</td><td className="p-2">⭐ Poor — JS must execute first</td><td className="p-2">Dashboards, admin, behind-login pages</td></tr>
                        </tbody>
                    </table>
                </div>

                <Callout type="warning"><Highlight>CSR (Client-Side Rendering)</Highlight> is the worst for SEO. Google can render JS, but it&apos;s slower and less reliable. Always prefer SSG/ISR for public-facing content.</Callout>
            </TopicModal>
        </div>

        {/* ===== CONTENT SEO ===== */}
        <Heading2>📝 Content SEO</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="URL Structure & Heading Hierarchy" emoji="🔗" color="#f97316" summary="Clean URLs and proper heading structure for better rankings">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-orange-400 font-bold text-sm">🔗 URL Best Practices</div>
                        <div className="text-slate-300 text-sm mt-1">
                            ✅ <InlineCode>/blogs/seo-optimization-guide</InlineCode> — short, descriptive, keyword-rich<br />
                            ❌ <InlineCode>/blogs/post?id=123</InlineCode> — no keywords, query parameters<br />
                            ❌ <InlineCode>/blogs/2025/03/13/my-blog-post-about-seo</InlineCode> — too long, date unnecessary<br /><br />
                            • Use hyphens (-) not underscores (_)<br />
                            • Keep under 75 characters<br />
                            • Use lowercase only<br />
                            • Include primary keyword
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📑 Heading Hierarchy</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Only <strong>ONE</strong> <InlineCode>&lt;h1&gt;</InlineCode> per page (the main title)<br />
                            • <InlineCode>&lt;h2&gt;</InlineCode> for major sections<br />
                            • <InlineCode>&lt;h3&gt;</InlineCode> for sub-sections<br />
                            • Never skip levels (h1 → h3 without h2)<br />
                            • Include keywords naturally in headings
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Internal Linking & Semantic HTML" emoji="🕸️" color="#10b981" summary="Link between pages and use proper HTML elements for SEO">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🕸️ Internal Linking</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Link related blog posts to each other<br />
                            • Use descriptive anchor text (not &quot;click here&quot;)<br />
                            • Important pages should have more internal links<br />
                            • Add &quot;Related Posts&quot; section at the bottom<br />
                            • Breadcrumbs count as internal links too
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🏗️ Semantic HTML</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>&lt;article&gt;</InlineCode> for blog posts<br />
                            • <InlineCode>&lt;nav&gt;</InlineCode> for navigation<br />
                            • <InlineCode>&lt;main&gt;</InlineCode> for main content area<br />
                            • <InlineCode>&lt;header&gt;</InlineCode> / <InlineCode>&lt;footer&gt;</InlineCode> for page and section headers/footers<br />
                            • <InlineCode>&lt;time datetime=&quot;...&quot;&gt;</InlineCode> for dates<br />
                            • <InlineCode>&lt;figure&gt;</InlineCode> + <InlineCode>&lt;figcaption&gt;</InlineCode> for images with captions
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        {/* ===== INTERNATIONALIZATION ===== */}
        <Heading2>🌐 International SEO (i18n)</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="hreflang & Multi-language SEO" emoji="🌐" color="#6366f1" summary="Serve the right language to the right users — hreflang, locale, alternates">
                <Paragraph>If your site has multiple languages, <Highlight>hreflang</Highlight> tells Google which version to show to which users:</Paragraph>

                <CodeBlock title="hreflang-setup.tsx">{`// Next.js — in generateMetadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const url = \`https://example.com/blogs/\${params.slug}\`
  return {
    alternates: {
      canonical: url,
      languages: {
        'vi': \`\${url}?lang=vi\`,      // Vietnamese version
        'en': \`\${url}?lang=en\`,      // English version
        'x-default': url,             // fallback
      },
    },
    openGraph: {
      locale: 'vi_VN',
      alternateLocale: 'en_US',
    },
  }
}

// This generates:
// <link rel="alternate" hreflang="vi" href="...?lang=vi" />
// <link rel="alternate" hreflang="en" href="...?lang=en" />
// <link rel="alternate" hreflang="x-default" href="..." />`}</CodeBlock>

                <Callout type="tip"><Highlight>x-default</Highlight> is the fallback — shown when user&apos;s language doesn&apos;t match any specified hreflang.</Callout>
            </TopicModal>
        </div>

        {/* ===== MONITORING ===== */}
        <Heading2>📈 SEO Monitoring & Tools</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="Essential SEO Tools" emoji="🛠️" color="#ec4899" summary="Google Search Console, PageSpeed Insights, and more">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">🔍 Google Search Console (FREE)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Submit sitemap for faster indexing<br />
                            • Monitor which queries bring traffic<br />
                            • Check for crawl errors and indexing issues<br />
                            • See Core Web Vitals real-world data<br />
                            • Request re-indexing after major updates
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">⚡ PageSpeed Insights</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Test Core Web Vitals (LCP, INP, CLS)<br />
                            • Get specific optimization suggestions<br />
                            • Both mobile and desktop scores<br />
                            • URL: pagespeed.web.dev
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🧪 Rich Results Test</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Validate JSON-LD structured data<br />
                            • Preview how rich snippets look in search results<br />
                            • URL: search.google.com/test/rich-results<br />
                            • Test after adding any new schema
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">📋 SEO Checklist per Page</div>
                        <div className="text-slate-300 text-sm mt-1">
                            ☐ Unique title tag (under 60 chars)<br />
                            ☐ Unique meta description (under 155 chars)<br />
                            ☐ Canonical URL set<br />
                            ☐ One h1 per page<br />
                            ☐ Proper heading hierarchy (h1→h2→h3)<br />
                            ☐ OG + Twitter Card tags<br />
                            ☐ JSON-LD structured data<br />
                            ☐ All images have descriptive alt text<br />
                            ☐ Internal links to related content<br />
                            ☐ Mobile responsive<br />
                            ☐ Page loads under 3 seconds
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>
    </>
)
