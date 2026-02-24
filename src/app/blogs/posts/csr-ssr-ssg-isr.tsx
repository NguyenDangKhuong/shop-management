import { BlogPost } from '../types'
import { CodeBlock, Heading2, Paragraph, Highlight, Callout } from '../components/BlogComponents'

const viContent = (
    <>
        <Paragraph>
            Khi xây dựng một ứng dụng web, một trong những quyết định quan trọng nhất là chọn <Highlight>chiến lược render</Highlight>.
            Mỗi cách tiếp cận có ưu/nhược điểm riêng, ảnh hưởng trực tiếp đến <Highlight>performance</Highlight>,{' '}
            <Highlight>SEO</Highlight> và <Highlight>trải nghiệm người dùng</Highlight>.
        </Paragraph>

        <Callout type="info">
            Bài viết này giải thích 4 chiến lược render phổ biến: CSR, SSR, SSG và ISR —
            kèm so sánh trực quan để giúp bạn chọn đúng cho dự án của mình.
        </Callout>

        {/* ===== CSR ===== */}
        <Heading2>1. CSR — Client-Side Rendering</Heading2>

        <Paragraph>
            Đây là cách render mặc định của hầu hết các framework như <Highlight>React</Highlight>, <Highlight>Angular</Highlight>, <Highlight>Vue</Highlight>.
            Server chỉ gửi về một file HTML trống + bundle JavaScript. Trình duyệt tải JS, rồi render toàn bộ UI.
        </Paragraph>

        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="text-center text-sm text-slate-400 mb-3 font-medium">🖥️ CSR Flow</div>
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit">1. Browser gửi request</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit">2. Server trả về HTML trống + JS bundle</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">3. Browser tải & thực thi JavaScript</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit">4. JS render UI + fetch data từ API</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-slate-500/20 text-slate-300 border border-slate-500/30 w-fit">5. Trang hoàn chỉnh hiển thị</div>
            </div>
        </div>

        <CodeBlock title="index.html (CSR)">{`<!DOCTYPE html>
<html>
<body>
    <div id="root"></div> <!-- HTML trống! -->
    <script src="/bundle.js"></script> <!-- JS render mọi thứ -->
</body>
</html>`}</CodeBlock>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">✅ Ưu điểm</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• Tương tác mượt mà sau khi load xong</li>
                    <li>• Hosting đơn giản (static files)</li>
                    <li>• Hoàn hảo cho SPA, dashboard, chat app</li>
                    <li>• Server load thấp</li>
                </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-red-400 font-bold text-sm mb-2">❌ Nhược điểm</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• SEO kém (HTML trống ban đầu)</li>
                    <li>• First load chậm (tải JS lớn)</li>
                    <li>• Blank screen khi đang tải</li>
                    <li>• Phụ thuộc vào thiết bị client</li>
                </ul>
            </div>
        </div>

        <Callout type="tip">
            Dùng CSR khi: ứng dụng cần <Highlight>nhiều tương tác</Highlight> (game, chat, dashboard nội bộ),
            không cần SEO, hoặc là SPA thuần.
        </Callout>

        {/* ===== SSR ===== */}
        <Heading2>2. SSR — Server-Side Rendering</Heading2>

        <Paragraph>
            Với <Highlight>SSR</Highlight>, server render HTML đầy đủ cho <Highlight>mỗi request</Highlight> rồi gửi về browser.
            Browser nhận được HTML có nội dung ngay — không cần chờ JS. Sau đó JS &quot;hydrate&quot; để thêm interactivity.
        </Paragraph>

        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="text-center text-sm text-slate-400 mb-3 font-medium">🖥️ SSR Flow</div>
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit">1. Browser gửi request</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">2. Server fetch data + render HTML</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit">3. Server trả về HTML đầy đủ nội dung</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit">4. Browser hiển thị ngay + tải JS</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-slate-500/20 text-slate-300 border border-slate-500/30 w-fit">5. JS hydrate → trang interactive</div>
            </div>
        </div>

        <CodeBlock title="page.tsx (SSR trong Next.js)">{`// Next.js App Router — mặc định là Server Component
export default async function ProductPage() {
    // Fetch data MỖI request — luôn fresh
    const products = await fetch('https://api.example.com/products', {
        cache: 'no-store' // Tắt cache → SSR mỗi request
    })
    const data = await products.json()

    return (
        <div>
            <h1>Sản phẩm ({data.length})</h1>
            {data.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
    )
}`}</CodeBlock>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">✅ Ưu điểm</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• SEO tuyệt vời (HTML đầy đủ)</li>
                    <li>• First Contentful Paint nhanh</li>
                    <li>• Data luôn fresh (render mỗi request)</li>
                    <li>• Hỗ trợ social media preview</li>
                </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-red-400 font-bold text-sm mb-2">❌ Nhược điểm</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• TTFB chậm hơn (server phải render)</li>
                    <li>• Server load cao hơn CSR</li>
                    <li>• Cần Node.js server</li>
                    <li>• Full page reload khi navigate</li>
                </ul>
            </div>
        </div>

        <Callout type="tip">
            Dùng SSR khi: nội dung <Highlight>thay đổi thường xuyên</Highlight> và cần SEO tốt —
            ví dụ: trang e-commerce, newsfeed, dashboard real-time.
        </Callout>

        {/* ===== SSG ===== */}
        <Heading2>3. SSG — Static Site Generation</Heading2>

        <Paragraph>
            <Highlight>SSG</Highlight> render HTML tại <Highlight>build time</Highlight> — tức là lúc deploy, không phải lúc user request.
            HTML đã được tạo sẵn, served trực tiếp từ CDN. Nhanh nhất trong 4 cách!
        </Paragraph>

        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="text-center text-sm text-slate-400 mb-3 font-medium">🖥️ SSG Flow</div>
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">1. Build time: fetch data + render HTML</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit">2. HTML tĩnh được deploy lên CDN</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit">3. Browser request → CDN trả HTML ngay</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-slate-500/20 text-slate-300 border border-slate-500/30 w-fit">4. Cực nhanh — không cần server xử lý!</div>
            </div>
        </div>

        <CodeBlock title="page.tsx (SSG trong Next.js)">{`// generateStaticParams → build time rendering
export async function generateStaticParams() {
    const posts = await fetch('https://api.example.com/posts').then(r => r.json())
    return posts.map(post => ({ slug: post.slug }))
}

export default async function BlogPost({ params }) {
    const { slug } = await params
    // Fetch tại BUILD TIME — HTML được tạo sẵn
    const post = await fetch(\`https://api.example.com/posts/\${slug}\`)
    const data = await post.json()

    return (
        <article>
            <h1>{data.title}</h1>
            <div>{data.content}</div>
        </article>
    )
}`}</CodeBlock>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">✅ Ưu điểm</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• Nhanh nhất (served từ CDN)</li>
                    <li>• SEO tuyệt vời</li>
                    <li>• Chi phí hosting rẻ</li>
                    <li>• Bảo mật cao (không có server runtime)</li>
                </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-red-400 font-bold text-sm mb-2">❌ Nhược điểm</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• Data có thể bị stale (cũ)</li>
                    <li>• Build time lâu nếu nhiều page</li>
                    <li>• Phải rebuild khi data thay đổi</li>
                    <li>• Không phù hợp cho dynamic content</li>
                </ul>
            </div>
        </div>

        <Callout type="tip">
            Dùng SSG khi: nội dung <Highlight>ít thay đổi</Highlight> — ví dụ: blog, documentation,
            landing page, marketing website.
        </Callout>

        {/* ===== ISR ===== */}
        <Heading2>4. ISR — Incremental Static Regeneration</Heading2>

        <Paragraph>
            <Highlight>ISR</Highlight> là sự kết hợp hoàn hảo giữa SSG và SSR. Trang được build tĩnh như SSG,
            nhưng có thể <Highlight>tự động regenerate</Highlight> sau một khoảng thời gian nhất định —
            không cần rebuild toàn bộ site!
        </Paragraph>

        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="text-center text-sm text-slate-400 mb-3 font-medium">🖥️ ISR Flow</div>
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">1. Build time: tạo HTML tĩnh (như SSG)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit">2. Request → CDN trả HTML cached (nhanh!)</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit">3. Sau N giây, request tiếp → trigger regenerate</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit">4. Server re-render ngầm, update cache</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-slate-500/20 text-slate-300 border border-slate-500/30 w-fit">5. Request sau nhận HTML mới!</div>
            </div>
        </div>

        <CodeBlock title="page.tsx (ISR trong Next.js)">{`// Cách 1: Time-based revalidation
export const revalidate = 60 // Regenerate mỗi 60 giây

export default async function ProductsPage() {
    const products = await fetch('https://api.example.com/products')
    const data = await products.json()

    return (
        <div>
            <h1>Sản phẩm</h1>
            {data.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
    )
}

// Cách 2: On-demand revalidation (trong API route hoặc Server Action)
import { revalidatePath, revalidateTag } from 'next/cache'

export async function updateProduct() {
    'use server'
    await db.product.update(...)
    revalidatePath('/products')    // Regenerate page cụ thể
    revalidateTag('products')      // Regenerate theo tag
}`}</CodeBlock>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">✅ Ưu điểm</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• Nhanh như SSG (cached)</li>
                    <li>• Data được cập nhật định kỳ</li>
                    <li>• Không cần rebuild toàn bộ</li>
                    <li>• SEO tuyệt vời</li>
                </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-red-400 font-bold text-sm mb-2">❌ Nhược điểm</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• Data có thể stale trong window revalidate</li>
                    <li>• Phức tạp hơn SSG thuần</li>
                    <li>• Cần Node.js server</li>
                    <li>• Khó debug cache issues</li>
                </ul>
            </div>
        </div>

        <Callout type="tip">
            Dùng ISR khi: cần <Highlight>performance của SSG</Highlight> nhưng data thay đổi đều đặn —
            ví dụ: e-commerce product listing, blog với comments, news site.
        </Callout>

        {/* ===== So sánh ===== */}
        <Heading2>5. So sánh tổng quan</Heading2>

        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-slate-400 font-medium">Tiêu chí</th>
                        <th className="text-left p-3 text-yellow-400 font-medium">CSR</th>
                        <th className="text-left p-3 text-blue-400 font-medium">SSR</th>
                        <th className="text-left p-3 text-green-400 font-medium">SSG</th>
                        <th className="text-left p-3 text-purple-400 font-medium">ISR</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Render ở đâu</td>
                        <td className="p-3">Browser</td>
                        <td className="p-3">Server (mỗi request)</td>
                        <td className="p-3">Server (build time)</td>
                        <td className="p-3">Server (build + revalidate)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">SEO</td>
                        <td className="p-3">❌ Kém</td>
                        <td className="p-3">✅ Tốt</td>
                        <td className="p-3">✅ Tốt nhất</td>
                        <td className="p-3">✅ Tốt</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Performance</td>
                        <td className="p-3">⚡ Sau load</td>
                        <td className="p-3">⚡⚡</td>
                        <td className="p-3">⚡⚡⚡</td>
                        <td className="p-3">⚡⚡⚡</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Data freshness</td>
                        <td className="p-3">Real-time</td>
                        <td className="p-3">Real-time</td>
                        <td className="p-3">Build time only</td>
                        <td className="p-3">Revalidate window</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Server cần</td>
                        <td className="p-3">Không</td>
                        <td className="p-3">Có</td>
                        <td className="p-3">Không</td>
                        <td className="p-3">Có</td>
                    </tr>
                    <tr>
                        <td className="p-3 text-slate-400">Use case</td>
                        <td className="p-3">SPA, Dashboard</td>
                        <td className="p-3">E-commerce, News</td>
                        <td className="p-3">Blog, Docs</td>
                        <td className="p-3">Best of both</td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* ===== Khi nào dùng gì ===== */}
        <Heading2>6. Khi nào dùng gì?</Heading2>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <span className="text-2xl">🎮</span>
                <div>
                    <div className="text-yellow-400 font-bold text-sm">CSR</div>
                    <div className="text-slate-300 text-sm mt-1">Dashboard nội bộ, chat app, game, SPA không cần SEO</div>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <span className="text-2xl">🛒</span>
                <div>
                    <div className="text-blue-400 font-bold text-sm">SSR</div>
                    <div className="text-slate-300 text-sm mt-1">E-commerce (giá thay đổi), social media feed, personalized content</div>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <span className="text-2xl">📝</span>
                <div>
                    <div className="text-green-400 font-bold text-sm">SSG</div>
                    <div className="text-slate-300 text-sm mt-1">Blog, documentation, landing page, portfolio, marketing site</div>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <span className="text-2xl">🔄</span>
                <div>
                    <div className="text-purple-400 font-bold text-sm">ISR</div>
                    <div className="text-slate-300 text-sm mt-1">Product listing, blog + comments, news (cập nhật mỗi vài phút)</div>
                </div>
            </div>
        </div>

        {/* ===== Next.js ===== */}
        <Heading2>7. Trong Next.js — Dùng thế nào?</Heading2>

        <Paragraph>
            Next.js (App Router) cho phép bạn <Highlight>mix các chiến lược</Highlight> trong cùng một ứng dụng.
            Mỗi page/component có thể chọn cách render riêng:
        </Paragraph>

        <CodeBlock title="rendering-strategies.tsx">{`// 🟡 CSR — dùng 'use client' + useEffect
'use client'
import { useEffect, useState } from 'react'
export default function LiveChat() {
    const [messages, setMessages] = useState([])
    useEffect(() => { /* WebSocket connection */ }, [])
    return <ChatUI messages={messages} />
}

// 🔵 SSR — cache: 'no-store'
export default async function Dashboard() {
    const data = await fetch('/api/stats', { cache: 'no-store' })
    return <StatsGrid data={await data.json()} />
}

// 🟢 SSG — mặc định (static)
export default async function AboutPage() {
    return <div>About us — rendered at build time</div>
}

// 🟣 ISR — revalidate
export const revalidate = 3600 // 1 hour
export default async function BlogPage() {
    const posts = await fetch('/api/posts')
    return <PostList posts={await posts.json()} />
}`}</CodeBlock>

        <Heading2>📌 Tóm tắt</Heading2>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-yellow-400 mt-0.5">🟡</span>
                <span className="text-slate-300"><Highlight>CSR</Highlight> — render trên browser, tốt cho SPA/dashboard, SEO kém</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-blue-400 mt-0.5">🔵</span>
                <span className="text-slate-300"><Highlight>SSR</Highlight> — render mỗi request, data luôn fresh, SEO tốt</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-green-400 mt-0.5">🟢</span>
                <span className="text-slate-300"><Highlight>SSG</Highlight> — render lúc build, nhanh nhất, tốt cho static content</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-purple-400 mt-0.5">🟣</span>
                <span className="text-slate-300"><Highlight>ISR</Highlight> — kết hợp SSG + SSR, tự revalidate, best of both worlds</span>
            </div>
        </div>

        <Callout type="tip">
            Trong Next.js App Router, bạn có thể <Highlight>mix tất cả 4 chiến lược</Highlight> trong cùng một app.
            Hãy chọn đúng cho từng page/component — không cần dùng chung một cách cho toàn bộ ứng dụng!
        </Callout>
    </>
)

const enContent = (
    <>
        <Paragraph>
            When building a web application, one of the most important decisions is choosing the <Highlight>rendering strategy</Highlight>.
            Each approach has its own trade-offs, directly affecting <Highlight>performance</Highlight>,{' '}
            <Highlight>SEO</Highlight>, and <Highlight>user experience</Highlight>.
        </Paragraph>

        <Callout type="info">
            This article explains 4 popular rendering strategies: CSR, SSR, SSG, and ISR —
            with visual comparisons to help you choose the right one for your project.
        </Callout>

        {/* ===== CSR ===== */}
        <Heading2>1. CSR — Client-Side Rendering</Heading2>

        <Paragraph>
            This is the default rendering approach for most frameworks like <Highlight>React</Highlight>, <Highlight>Angular</Highlight>, <Highlight>Vue</Highlight>.
            The server sends an empty HTML file + a JavaScript bundle. The browser downloads JS, then renders the entire UI.
        </Paragraph>

        <div className="my-6 p-4 rounded-xl bg-slate-800/50 border border-white/10">
            <div className="text-center text-sm text-slate-400 mb-3 font-medium">🖥️ CSR Flow</div>
            <div className="flex flex-col items-center gap-2 text-sm">
                <div className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 w-fit">1. Browser sends request</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 w-fit">2. Server returns empty HTML + JS bundle</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 w-fit">3. Browser downloads & executes JavaScript</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 w-fit">4. JS renders UI + fetches data from API</div>
                <div className="text-slate-600">↓</div>
                <div className="px-4 py-2 rounded-lg bg-slate-500/20 text-slate-300 border border-slate-500/30 w-fit">5. Complete page is displayed</div>
            </div>
        </div>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">✅ Pros</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• Smooth interactions after loading</li>
                    <li>• Simple hosting (static files)</li>
                    <li>• Perfect for SPAs, dashboards, chat apps</li>
                    <li>• Low server load</li>
                </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-red-400 font-bold text-sm mb-2">❌ Cons</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• Poor SEO (initial empty HTML)</li>
                    <li>• Slow first load (large JS bundle)</li>
                    <li>• Blank screen while loading</li>
                    <li>• Depends on client device</li>
                </ul>
            </div>
        </div>

        <Callout type="tip">
            Use CSR when: your app needs <Highlight>heavy interactivity</Highlight> (games, chat, internal dashboards),
            doesn&apos;t need SEO, or is a pure SPA.
        </Callout>

        {/* ===== SSR ===== */}
        <Heading2>2. SSR — Server-Side Rendering</Heading2>

        <Paragraph>
            With <Highlight>SSR</Highlight>, the server renders full HTML for <Highlight>every request</Highlight> and sends it to the browser.
            The browser receives content-rich HTML immediately — no waiting for JS. Then JS &quot;hydrates&quot; to add interactivity.
        </Paragraph>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">✅ Pros</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• Excellent SEO (full HTML)</li>
                    <li>• Fast First Contentful Paint</li>
                    <li>• Always fresh data</li>
                    <li>• Social media preview support</li>
                </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-red-400 font-bold text-sm mb-2">❌ Cons</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• Slower TTFB (server must render)</li>
                    <li>• Higher server load than CSR</li>
                    <li>• Requires Node.js server</li>
                    <li>• Full page reload on navigation</li>
                </ul>
            </div>
        </div>

        <Callout type="tip">
            Use SSR when: content <Highlight>changes frequently</Highlight> and needs good SEO —
            e.g., e-commerce, newsfeed, real-time dashboards.
        </Callout>

        {/* ===== SSG ===== */}
        <Heading2>3. SSG — Static Site Generation</Heading2>

        <Paragraph>
            <Highlight>SSG</Highlight> renders HTML at <Highlight>build time</Highlight> — during deployment, not user requests.
            Pre-built HTML is served directly from CDN. The fastest of all 4 approaches!
        </Paragraph>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">✅ Pros</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• Fastest (served from CDN)</li>
                    <li>• Excellent SEO</li>
                    <li>• Cheap hosting</li>
                    <li>• High security (no server runtime)</li>
                </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-red-400 font-bold text-sm mb-2">❌ Cons</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• Data can be stale</li>
                    <li>• Long build times for many pages</li>
                    <li>• Must rebuild when data changes</li>
                    <li>• Not suitable for dynamic content</li>
                </ul>
            </div>
        </div>

        <Callout type="tip">
            Use SSG when: content <Highlight>rarely changes</Highlight> — e.g., blogs, documentation,
            landing pages, marketing websites.
        </Callout>

        {/* ===== ISR ===== */}
        <Heading2>4. ISR — Incremental Static Regeneration</Heading2>

        <Paragraph>
            <Highlight>ISR</Highlight> is the perfect combination of SSG and SSR. Pages are statically built like SSG,
            but can <Highlight>automatically regenerate</Highlight> after a certain time interval —
            without rebuilding the entire site!
        </Paragraph>

        <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
                <div className="text-green-400 font-bold text-sm mb-2">✅ Pros</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• Fast like SSG (cached)</li>
                    <li>• Data updates periodically</li>
                    <li>• No full site rebuilds needed</li>
                    <li>• Excellent SEO</li>
                </ul>
            </div>
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4">
                <div className="text-red-400 font-bold text-sm mb-2">❌ Cons</div>
                <ul className="text-slate-300 text-sm space-y-1.5">
                    <li>• Data can be stale during revalidation window</li>
                    <li>• More complex than pure SSG</li>
                    <li>• Requires Node.js server</li>
                    <li>• Cache debugging can be tricky</li>
                </ul>
            </div>
        </div>

        <Callout type="tip">
            Use ISR when: you need <Highlight>SSG performance</Highlight> but data changes regularly —
            e.g., product listings, blog with comments, news sites.
        </Callout>

        {/* ===== Comparison ===== */}
        <Heading2>5. Comparison Overview</Heading2>

        <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="border-b border-white/10">
                        <th className="text-left p-3 text-slate-400 font-medium">Criteria</th>
                        <th className="text-left p-3 text-yellow-400 font-medium">CSR</th>
                        <th className="text-left p-3 text-blue-400 font-medium">SSR</th>
                        <th className="text-left p-3 text-green-400 font-medium">SSG</th>
                        <th className="text-left p-3 text-purple-400 font-medium">ISR</th>
                    </tr>
                </thead>
                <tbody className="text-slate-300">
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Renders at</td>
                        <td className="p-3">Browser</td>
                        <td className="p-3">Server (per request)</td>
                        <td className="p-3">Server (build time)</td>
                        <td className="p-3">Server (build + revalidate)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">SEO</td>
                        <td className="p-3">❌ Poor</td>
                        <td className="p-3">✅ Good</td>
                        <td className="p-3">✅ Best</td>
                        <td className="p-3">✅ Good</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Performance</td>
                        <td className="p-3">⚡ After load</td>
                        <td className="p-3">⚡⚡</td>
                        <td className="p-3">⚡⚡⚡</td>
                        <td className="p-3">⚡⚡⚡</td>
                    </tr>
                    <tr className="border-b border-white/5">
                        <td className="p-3 text-slate-400">Data freshness</td>
                        <td className="p-3">Real-time</td>
                        <td className="p-3">Real-time</td>
                        <td className="p-3">Build time only</td>
                        <td className="p-3">Revalidation window</td>
                    </tr>
                    <tr>
                        <td className="p-3 text-slate-400">Use case</td>
                        <td className="p-3">SPA, Dashboard</td>
                        <td className="p-3">E-commerce, News</td>
                        <td className="p-3">Blog, Docs</td>
                        <td className="p-3">Best of both</td>
                    </tr>
                </tbody>
            </table>
        </div>

        {/* ===== When to use ===== */}
        <Heading2>6. When to Use What?</Heading2>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <span className="text-2xl">🎮</span>
                <div>
                    <div className="text-yellow-400 font-bold text-sm">CSR</div>
                    <div className="text-slate-300 text-sm mt-1">Internal dashboards, chat apps, games, SPAs without SEO needs</div>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <span className="text-2xl">🛒</span>
                <div>
                    <div className="text-blue-400 font-bold text-sm">SSR</div>
                    <div className="text-slate-300 text-sm mt-1">E-commerce (dynamic prices), social feeds, personalized content</div>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <span className="text-2xl">📝</span>
                <div>
                    <div className="text-green-400 font-bold text-sm">SSG</div>
                    <div className="text-slate-300 text-sm mt-1">Blog, documentation, landing pages, portfolio, marketing sites</div>
                </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <span className="text-2xl">🔄</span>
                <div>
                    <div className="text-purple-400 font-bold text-sm">ISR</div>
                    <div className="text-slate-300 text-sm mt-1">Product listings, blog + comments, news (updates every few minutes)</div>
                </div>
            </div>
        </div>

        <Heading2>7. In Next.js — How to Use?</Heading2>

        <Paragraph>
            Next.js (App Router) lets you <Highlight>mix all strategies</Highlight> in a single app.
            Each page/component can choose its own rendering strategy:
        </Paragraph>

        <CodeBlock title="rendering-strategies.tsx">{`// 🟡 CSR — use 'use client' + useEffect
'use client'
import { useEffect, useState } from 'react'
export default function LiveChat() {
    const [messages, setMessages] = useState([])
    useEffect(() => { /* WebSocket connection */ }, [])
    return <ChatUI messages={messages} />
}

// 🔵 SSR — cache: 'no-store'
export default async function Dashboard() {
    const data = await fetch('/api/stats', { cache: 'no-store' })
    return <StatsGrid data={await data.json()} />
}

// 🟢 SSG — default (static)
export default async function AboutPage() {
    return <div>About us — rendered at build time</div>
}

// 🟣 ISR — revalidate
export const revalidate = 3600 // 1 hour
export default async function BlogPage() {
    const posts = await fetch('/api/posts')
    return <PostList posts={await posts.json()} />
}`}</CodeBlock>

        <Heading2>📌 Summary</Heading2>

        <div className="my-6 space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-yellow-400 mt-0.5">🟡</span>
                <span className="text-slate-300"><Highlight>CSR</Highlight> — renders in browser, great for SPAs/dashboards, poor SEO</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-blue-400 mt-0.5">🔵</span>
                <span className="text-slate-300"><Highlight>SSR</Highlight> — renders per request, always fresh data, good SEO</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-green-400 mt-0.5">🟢</span>
                <span className="text-slate-300"><Highlight>SSG</Highlight> — renders at build time, fastest, best for static content</span>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                <span className="text-purple-400 mt-0.5">🟣</span>
                <span className="text-slate-300"><Highlight>ISR</Highlight> — combines SSG + SSR, auto-revalidates, best of both worlds</span>
            </div>
        </div>

        <Callout type="tip">
            In Next.js App Router, you can <Highlight>mix all 4 strategies</Highlight> in a single app.
            Choose the right one for each page/component — no need to use the same strategy for the entire application!
        </Callout>
    </>
)

const csrSsrSsgIsr: BlogPost = {
    slug: 'csr-ssr-ssg-isr',
    title: {
        vi: 'CSR, SSR, SSG và ISR — 4 chiến lược render web',
        en: 'CSR, SSR, SSG & ISR — 4 Web Rendering Strategies',
    },
    description: {
        vi: 'So sánh 4 chiến lược render: Client-Side, Server-Side, Static Site Generation và Incremental Static Regeneration. Khi nào dùng gì?',
        en: 'Comparing 4 rendering strategies: Client-Side, Server-Side, Static Site Generation, and Incremental Static Regeneration. When to use what?',
    },
    date: '2026-01-15',
    tags: ['Next.js', 'Performance', 'Fundamentals'],
    emoji: '🖥️',
    color: '#a78bfa',
    content: { vi: viContent, en: enContent },
}

export default csrSsrSsgIsr
