import { BlogPost } from '../types'
import { CodeBlock, Heading2, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'
import { TopicModal } from '../components/TopicModal'
import { enContent } from './seo-optimization-en'

const viContent = (
    <>
        <Paragraph>
            <Highlight>SEO (Search Engine Optimization)</Highlight> là cách cải thiện thứ hạng website trên
            các công cụ tìm kiếm như Google. Với frontend developer, hiểu SEO rất quan trọng —
            vì code hay đến mấy mà không ai tìm thấy thì cũng vô nghĩa.
        </Paragraph>

        <Callout type="info">
            Guide này cover cả <Highlight>technical SEO</Highlight> (thứ bạn implement trong code) và
            <Highlight>content SEO</Highlight> (cách tổ chức nội dung cho search engines). Tập trung Next.js / React
            nhưng áp dụng được cho mọi framework.
        </Callout>

        {/* ===== META TAGS ===== */}
        <Heading2>🏷️ Meta Tags & Head Optimization</Heading2>

        <Paragraph>
            Meta tags là <Highlight>thứ đầu tiên</Highlight> search engines đọc. Làm đúng chúng là
            nền tảng của mọi công việc SEO.
        </Paragraph>

        <div className="my-4 space-y-2">
            <TopicModal title="Essential Meta Tags" emoji="🏷️" color="#f59e0b" summary="title, description, canonical, robots — tags bắt buộc cho mọi trang">
                <Paragraph>Mỗi trang cần các <Highlight>meta tags cốt lõi</Highlight> này:</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">📌 Title Tag</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Yếu tố SEO on-page quan trọng nhất<br />
                            • Giữ dưới <strong>60 ký tự</strong> (Google cắt phần còn lại)<br />
                            • Format: <InlineCode>Keyword chính — Keyword phụ | Thương hiệu</InlineCode><br />
                            • Mỗi trang phải có title <strong>duy nhất</strong><br />
                            • Đặt keyword quan trọng ở đầu
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📝 Meta Description</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Hiện trong kết quả tìm kiếm bên dưới title<br />
                            • Giữ dưới <strong>155 ký tự</strong><br />
                            • Bao gồm keyword chính một cách tự nhiên<br />
                            • Viết như CTA (call-to-action) hấp dẫn<br />
                            • Mỗi trang phải có description <strong>duy nhất</strong>
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🔗 Canonical URL</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Cho search engines biết URL &quot;chính thức&quot; của trang<br />
                            • Tránh vấn đề <strong>duplicate content</strong><br />
                            • Quan trọng khi cùng content ở <InlineCode>/blog/post</InlineCode> và <InlineCode>/blog/post?ref=twitter</InlineCode><br />
                            • Luôn dùng absolute URLs
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🤖 Robots Meta</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>index, follow</InlineCode> (mặc định) — crawl và index trang này<br />
                            • <InlineCode>noindex, follow</InlineCode> — không index nhưng follow links<br />
                            • <InlineCode>noindex, nofollow</InlineCode> — bỏ qua hoàn toàn trang này<br />
                            • Dùng <InlineCode>noindex</InlineCode> cho admin pages, login, search results
                        </div>
                    </div>
                </div>

                <CodeBlock title="next.js-metadata.tsx">{`// Next.js App Router — static metadata
export const metadata: Metadata = {
  title: {
    default: 'My Blog — Frontend Knowledge',
    template: '%s | My Blog',  // trang con kế thừa template này
  },
  description: 'Học frontend development với guide chuyên sâu...',
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

// Dynamic metadata cho blog posts
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  return {
    title: post.title,  // thành "Post Title | My Blog"
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
                <Callout type="tip">Trong Next.js, dùng <Highlight>title.template</Highlight> ở root layout — trang con chỉ cần set <InlineCode>title: &apos;Tên Trang&apos;</InlineCode> và tự động thêm <InlineCode>| Thương hiệu</InlineCode>.</Callout>
            </TopicModal>

            <TopicModal title="Open Graph & Twitter Cards" emoji="🌐" color="#3b82f6" summary="Kiểm soát cách trang hiện khi share trên mạng xã hội">
                <Paragraph>Khi ai đó share link của bạn trên Facebook, Twitter, LinkedIn, <Highlight>OG tags</Highlight> kiểm soát preview:</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📘 Open Graph (Facebook, LinkedIn)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>og:title</InlineCode> — title hiện trong preview<br />
                            • <InlineCode>og:description</InlineCode> — mô tả bên dưới title<br />
                            • <InlineCode>og:image</InlineCode> — ảnh preview (<strong>1200×630px</strong> khuyến nghị)<br />
                            • <InlineCode>og:url</InlineCode> — canonical URL<br />
                            • <InlineCode>og:type</InlineCode> — &quot;website&quot; cho homepage, &quot;article&quot; cho blog posts<br />
                            • <InlineCode>og:locale</InlineCode> — ngôn ngữ (vd: &quot;vi_VN&quot;, &quot;en_US&quot;)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="text-cyan-400 font-bold text-sm">🐦 Twitter Cards</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>twitter:card</InlineCode> — &quot;summary_large_image&quot; (ảnh lớn) hoặc &quot;summary&quot; (nhỏ)<br />
                            • <InlineCode>twitter:title</InlineCode> — title cho Twitter preview<br />
                            • <InlineCode>twitter:description</InlineCode> — mô tả cho Twitter<br />
                            • <InlineCode>twitter:image</InlineCode> — ảnh preview (dùng chung với OG được)
                        </div>
                    </div>
                </div>

                <Callout type="warning"><Highlight>OG image</Highlight> là yếu tố ảnh hưởng lớn nhất đến click-through rate từ social media. Links có ảnh được click <strong>3-5x nhiều hơn</strong> links không có ảnh.</Callout>
            </TopicModal>
        </div>

        {/* ===== STRUCTURED DATA ===== */}
        <Heading2>📊 Structured Data (JSON-LD)</Heading2>

        <Paragraph>
            <Highlight>JSON-LD</Highlight> cho search engines biết chính xác nội dung của bạn là gì — cho phép rich snippets
            (sao, FAQ, breadcrumbs) xuất hiện trong kết quả tìm kiếm.
        </Paragraph>

        <div className="my-4 space-y-2">
            <TopicModal title="Các Schema Quan Trọng" emoji="📊" color="#8b5cf6" summary="BlogPosting, BreadcrumbList, FAQPage — schemas tăng visibility trên search">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">📝 BlogPosting / Article</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Cho Google biết đây là bài blog/article<br />
                            • Bao gồm: headline, description, author, datePublished, dateModified<br />
                            • Cho phép hiện &quot;Published on&quot; và author info trong search results<br />
                            • <strong>Phải khớp</strong> với nội dung visible trên trang
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">🍞 BreadcrumbList</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Hiện navigation path trong search results: Home › Blog › Post Title<br />
                            • Tăng click-through rate bằng cách hiện context<br />
                            • Giúp Google hiểu cấu trúc site<br />
                            • Mỗi item có: position, name, item (URL)
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">❓ FAQPage</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Hiện Q&A trực tiếp trong Google search results<br />
                            • Tăng đáng kể diện tích trang trên SERPs<br />
                            • Tuyệt vời cho blog posts có phần Q&A<br />
                            • Mỗi câu hỏi cần: name (question), acceptedAnswer (text)
                        </div>
                    </div>
                </div>

                <CodeBlock title="json-ld-examples.tsx">{`// BlogPosting schema
const blogPostLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Tiêu đề bài viết',
  description: 'Mô tả cho search engines',
  datePublished: '2025-01-15',
  dateModified: '2025-01-20',
  author: {
    '@type': 'Person',
    name: 'Tên tác giả',
    url: 'https://example.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Tên site',
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
    { '@type': 'ListItem', position: 3, name: 'Tiêu đề bài', item: 'https://example.com/blog/post' },
  ],
}

// FAQPage schema — tuyệt vời cho bài Q&A
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'SEO là gì?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SEO (Search Engine Optimization) là cách cải thiện...',
      },
    },
  ],
}

// Trong page component:
<script type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostLd) }}
/>`}</CodeBlock>
            </TopicModal>
        </div>

        {/* ===== TECHNICAL SEO ===== */}
        <Heading2>⚙️ Technical SEO</Heading2>

        <Paragraph>
            Technical SEO đảm bảo search engines có thể <Highlight>crawl, index, và render</Highlight> trang của bạn đúng cách.
        </Paragraph>

        <div className="my-4 space-y-2">
            <TopicModal title="Sitemap & Robots.txt" emoji="🗺️" color="#10b981" summary="Cho search engines biết crawl gì và tìm content ở đâu">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🗺️ Sitemap.xml</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Liệt kê tất cả URLs có thể index trên site<br />
                            • Bao gồm <InlineCode>lastmod</InlineCode>, <InlineCode>changefreq</InlineCode>, <InlineCode>priority</InlineCode><br />
                            • Auto-generate trong Next.js với <InlineCode>sitemap.ts</InlineCode><br />
                            • Submit lên Google Search Console để index nhanh hơn<br />
                            • Chỉ cập nhật <InlineCode>lastmod</InlineCode> khi content thực sự thay đổi
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">🤖 Robots.txt</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • File đầu tiên mà search engines check<br />
                            • <InlineCode>Allow</InlineCode>: trang để crawl (/, /blogs, /blogs/*)<br />
                            • <InlineCode>Disallow</InlineCode>: trang bỏ qua (/api/, /login, /admin)<br />
                            • Bao gồm sitemap URL reference<br />
                            • <strong>Đừng bao giờ</strong> block CSS/JS files — Google cần chúng để render
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

            <TopicModal title="Performance & Core Web Vitals" emoji="⚡" color="#ef4444" summary="Tốc độ trang ảnh hưởng trực tiếp đến ranking — LCP, INP, CLS">
                <Paragraph>Google dùng <Highlight>Core Web Vitals</Highlight> làm yếu tố xếp hạng từ 2021:</Paragraph>

                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🖼️ LCP (Largest Contentful Paint) — dưới 2.5s</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Thời gian render phần tử lớn nhất visible<br />
                            • Fix: optimize images (WebP, lazy loading), preload fonts<br />
                            • Fix: giảm server response time (SSG/ISR)<br />
                            • Fix: loại bỏ resources chặn render
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm">👆 INP (Interaction to Next Paint) — dưới 200ms</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Thời gian từ tương tác đến phản hồi visual<br />
                            • Fix: chia nhỏ long tasks (code splitting)<br />
                            • Fix: defer non-critical JavaScript<br />
                            • Fix: dùng <InlineCode>startTransition</InlineCode> cho updates không urgent
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">📐 CLS (Cumulative Layout Shift) — dưới 0.1</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Đo độ ổn định visual (layout nhảy)<br />
                            • Fix: luôn set <InlineCode>width</InlineCode> và <InlineCode>height</InlineCode> cho images/videos<br />
                            • Fix: reserve space cho dynamic content<br />
                            • Fix: tránh insert content phía trên content có sẵn
                        </div>
                    </div>
                </div>

                <CodeBlock title="performance-optimizations.tsx">{`// 1. Next.js Image — tự optimize cho LCP
import Image from 'next/image'
<Image
  src="/hero.jpg"
  width={1200} height={630}
  alt="Hero image"
  priority  // preload cho LCP
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// 2. Font optimization — chống CLS
import { Inter } from 'next/font/google'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',    // hiện fallback font khi đang load
  preload: true,
  variable: '--font-inter',
})

// 3. Lazy loading — cải thiện initial load
import dynamic from 'next/dynamic'
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false,  // chỉ client nếu không cần cho SEO
})

// 4. Preload critical resources
<link rel="preload" href="/critical.css" as="style" />
<link rel="preconnect" href="https://fonts.googleapis.com" />`}</CodeBlock>
                <Callout type="tip">Kiểm tra scores: <Highlight>PageSpeed Insights</Highlight> (pagespeed.web.dev), <Highlight>Lighthouse</Highlight> (Chrome DevTools), <Highlight>Web Vitals Extension</Highlight> (dữ liệu real-user).</Callout>
            </TopicModal>

            <TopicModal title="SSR, SSG & ISR cho SEO" emoji="🏗️" color="#8b5cf6" summary="Chiến lược pre-rendering và ảnh hưởng đến SEO">
                <Paragraph>Cách bạn render trang <Highlight>ảnh hưởng trực tiếp đến SEO</Highlight>:</Paragraph>

                <div className="my-3 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead><tr className="border-b border-border-primary">
                            <th className="text-left p-2 text-slate-400">Chiến lược</th>
                            <th className="text-left p-2 text-slate-400">SEO Impact</th>
                            <th className="text-left p-2 text-slate-400">Khi nào dùng</th>
                        </tr></thead>
                        <tbody className="text-text-secondary">
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">SSG (Static)</td><td className="p-2">⭐⭐⭐ Tốt nhất — HTML sẵn khi deploy</td><td className="p-2">Blog posts, docs, landing pages</td></tr>
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">ISR (Incremental)</td><td className="p-2">⭐⭐⭐ Rất tốt — static + revalidation</td><td className="p-2">E-commerce, content update thường xuyên</td></tr>
                            <tr className="border-b border-gray-800"><td className="p-2 font-bold">SSR (Server)</td><td className="p-2">⭐⭐ Tốt — HTML mỗi request</td><td className="p-2">Content cá nhân hóa, data real-time</td></tr>
                            <tr><td className="p-2 font-bold">CSR (Client)</td><td className="p-2">⭐ Kém — JS phải chạy trước</td><td className="p-2">Dashboards, admin, behind-login</td></tr>
                        </tbody>
                    </table>
                </div>

                <Callout type="warning"><Highlight>CSR (Client-Side Rendering)</Highlight> là tệ nhất cho SEO. Google có thể render JS, nhưng chậm và không đáng tin cậy. Luôn ưu tiên SSG/ISR cho public-facing content.</Callout>
            </TopicModal>
        </div>

        {/* ===== CONTENT SEO ===== */}
        <Heading2>📝 Content SEO</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="Cấu trúc URL & Heading Hierarchy" emoji="🔗" color="#f97316" summary="URL sạch và cấu trúc heading đúng cho ranking tốt hơn">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="text-orange-400 font-bold text-sm">🔗 URL Best Practices</div>
                        <div className="text-slate-300 text-sm mt-1">
                            ✅ <InlineCode>/blogs/seo-optimization-guide</InlineCode> — ngắn, mô tả, có keyword<br />
                            ❌ <InlineCode>/blogs/post?id=123</InlineCode> — không keyword, query parameters<br />
                            ❌ <InlineCode>/blogs/2025/03/13/bai-viet-ve-seo</InlineCode> — quá dài, ngày không cần<br /><br />
                            • Dùng dấu gạch (-) không phải gạch dưới (_)<br />
                            • Giữ dưới 75 ký tự<br />
                            • Chỉ dùng lowercase<br />
                            • Bao gồm keyword chính
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">📑 Heading Hierarchy</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Chỉ <strong>MỘT</strong> <InlineCode>&lt;h1&gt;</InlineCode> mỗi trang (title chính)<br />
                            • <InlineCode>&lt;h2&gt;</InlineCode> cho các section lớn<br />
                            • <InlineCode>&lt;h3&gt;</InlineCode> cho sub-sections<br />
                            • Đừng skip levels (h1 → h3 mà không có h2)<br />
                            • Bao gồm keywords tự nhiên trong headings
                        </div>
                    </div>
                </div>
            </TopicModal>

            <TopicModal title="Internal Linking & Semantic HTML" emoji="🕸️" color="#10b981" summary="Link giữa các trang và dùng HTML elements đúng cho SEO">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">🕸️ Internal Linking</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Link các bài blog liên quan với nhau<br />
                            • Dùng anchor text mô tả (không phải &quot;click here&quot;)<br />
                            • Trang quan trọng nên có nhiều internal links hơn<br />
                            • Thêm &quot;Bài viết liên quan&quot; ở cuối<br />
                            • Breadcrumbs cũng tính là internal links
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">🏗️ Semantic HTML</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • <InlineCode>&lt;article&gt;</InlineCode> cho blog posts<br />
                            • <InlineCode>&lt;nav&gt;</InlineCode> cho navigation<br />
                            • <InlineCode>&lt;main&gt;</InlineCode> cho vùng content chính<br />
                            • <InlineCode>&lt;header&gt;</InlineCode> / <InlineCode>&lt;footer&gt;</InlineCode> cho page và section headers/footers<br />
                            • <InlineCode>&lt;time datetime=&quot;...&quot;&gt;</InlineCode> cho ngày tháng<br />
                            • <InlineCode>&lt;figure&gt;</InlineCode> + <InlineCode>&lt;figcaption&gt;</InlineCode> cho ảnh có caption
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>

        {/* ===== INTERNATIONALIZATION ===== */}
        <Heading2>🌐 International SEO (i18n)</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="hreflang & Multi-language SEO" emoji="🌐" color="#6366f1" summary="Hiện đúng ngôn ngữ cho đúng users — hreflang, locale, alternates">
                <Paragraph>Nếu site có nhiều ngôn ngữ, <Highlight>hreflang</Highlight> cho Google biết hiện phiên bản nào cho users nào:</Paragraph>

                <CodeBlock title="hreflang-setup.tsx">{`// Next.js — trong generateMetadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const url = \`https://example.com/blogs/\${params.slug}\`
  return {
    alternates: {
      canonical: url,
      languages: {
        'vi': \`\${url}?lang=vi\`,      // Phiên bản tiếng Việt
        'en': \`\${url}?lang=en\`,      // Phiên bản tiếng Anh
        'x-default': url,             // fallback
      },
    },
    openGraph: {
      locale: 'vi_VN',
      alternateLocale: 'en_US',
    },
  }
}

// Kết quả generate:
// <link rel="alternate" hreflang="vi" href="...?lang=vi" />
// <link rel="alternate" hreflang="en" href="...?lang=en" />
// <link rel="alternate" hreflang="x-default" href="..." />`}</CodeBlock>

                <Callout type="tip"><Highlight>x-default</Highlight> là fallback — hiện khi ngôn ngữ user không khớp bất kỳ hreflang nào.</Callout>
            </TopicModal>
        </div>

        {/* ===== MONITORING ===== */}
        <Heading2>📈 SEO Monitoring & Tools</Heading2>

        <div className="my-4 space-y-2">
            <TopicModal title="Công cụ SEO Cần Thiết" emoji="🛠️" color="#ec4899" summary="Google Search Console, PageSpeed Insights, và nhiều hơn">
                <div className="my-3 space-y-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm">🔍 Google Search Console (MIỄN PHÍ)</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Submit sitemap để index nhanh hơn<br />
                            • Theo dõi queries nào mang traffic<br />
                            • Kiểm tra crawl errors và indexing issues<br />
                            • Xem Core Web Vitals từ real-world data<br />
                            • Yêu cầu re-index sau updates lớn
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm">⚡ PageSpeed Insights</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Test Core Web Vitals (LCP, INP, CLS)<br />
                            • Gợi ý optimization cụ thể<br />
                            • Scores cho cả mobile và desktop<br />
                            • URL: pagespeed.web.dev
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm">🧪 Rich Results Test</div>
                        <div className="text-slate-300 text-sm mt-1">
                            • Validate JSON-LD structured data<br />
                            • Preview rich snippets trên search results<br />
                            • URL: search.google.com/test/rich-results<br />
                            • Test sau khi thêm schema mới
                        </div>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm">📋 SEO Checklist mỗi Trang</div>
                        <div className="text-slate-300 text-sm mt-1">
                            ☐ Title tag duy nhất (dưới 60 ký tự)<br />
                            ☐ Meta description duy nhất (dưới 155 ký tự)<br />
                            ☐ Canonical URL đã set<br />
                            ☐ Một h1 mỗi trang<br />
                            ☐ Heading hierarchy đúng (h1→h2→h3)<br />
                            ☐ OG + Twitter Card tags<br />
                            ☐ JSON-LD structured data<br />
                            ☐ Tất cả images có alt text mô tả<br />
                            ☐ Internal links đến content liên quan<br />
                            ☐ Mobile responsive<br />
                            ☐ Trang load dưới 3 giây
                        </div>
                    </div>
                </div>
            </TopicModal>
        </div>
    </>
)

const seoOptimization: BlogPost = {
    slug: 'seo-optimization',
    title: {
        vi: 'SEO cho Frontend Developer — Từ cơ bản đến nâng cao',
        en: 'SEO for Frontend Developers — From Basics to Advanced',
    },
    description: {
        vi: 'Hướng dẫn toàn diện cải thiện SEO: meta tags, JSON-LD, Core Web Vitals, SSG/ISR, internal linking, i18n — dành cho frontend developer.',
        en: 'Comprehensive SEO guide: meta tags, JSON-LD, Core Web Vitals, SSG/ISR, internal linking, i18n — for frontend developers.',
    },
    date: '2025-10-20',
    tags: ['SEO', 'Performance', 'Next.js'],
    emoji: '🔍',
    color: '#10b981',
    content: { vi: viContent, en: enContent },
}

export default seoOptimization
