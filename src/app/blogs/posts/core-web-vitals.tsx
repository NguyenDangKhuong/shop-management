import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, InlineCode, Callout } from '../components/BlogComponents'

const coreWebVitals: BlogPost = {
    slug: 'core-web-vitals',
    title: {
        vi: 'Core Web Vitals — Cách đo và tối ưu từng chỉ số',
        en: 'Core Web Vitals — How to Measure & Optimize Each Metric',
    },
    description: {
        vi: 'Tìm hiểu chi tiết Core Web Vitals: LCP, INP, CLS, FCP, TTFB — cách đo bằng Lighthouse, PageSpeed Insights, Web Vitals library và các kỹ thuật cải thiện từng chỉ số.',
        en: 'Deep dive into Core Web Vitals: LCP, INP, CLS, FCP, TTFB — how to measure with Lighthouse, PageSpeed Insights, Web Vitals library and techniques to improve each metric.',
    },
    date: '2026-02-26',
    tags: ['Performance', 'Web Vitals', 'SEO'],
    emoji: '📊',
    color: '#10b981',
    content: {
        vi: (
            <>
                <Paragraph>
                    <Highlight>Core Web Vitals</Highlight> là bộ chỉ số của Google đo trải nghiệm thực tế của user trên website.
                    Chúng ảnh hưởng trực tiếp đến <Highlight>SEO ranking</Highlight> — Google ưu tiên xếp hạng các trang có Web Vitals tốt.
                </Paragraph>

                <Callout type="info">
                    Từ tháng 3/2024, Google thay thế <strong>FID</strong> (First Input Delay) bằng <strong>INP</strong> (Interaction to Next Paint)
                    làm Core Web Vital chính thức. Bài viết này cập nhật theo tiêu chuẩn mới nhất.
                </Callout>

                {/* ===== Tổng quan ===== */}
                <Heading2>🎯 Tổng quan 3 Core Web Vitals chính</Heading2>

                <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-5">
                        <div className="text-3xl mb-2">🖼️</div>
                        <div className="text-green-400 font-bold text-sm mb-1">LCP</div>
                        <div className="text-gray-800 dark:text-slate-300 text-sm">Largest Contentful Paint</div>
                        <div className="text-gray-600 dark:text-slate-400 text-xs mt-1">Tốc độ load nội dung chính</div>
                        <div className="mt-3 text-green-400 font-mono text-lg">≤ 2.5s</div>
                    </div>
                    <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-5">
                        <div className="text-3xl mb-2">👆</div>
                        <div className="text-blue-400 font-bold text-sm mb-1">INP</div>
                        <div className="text-gray-800 dark:text-slate-300 text-sm">Interaction to Next Paint</div>
                        <div className="text-gray-600 dark:text-slate-400 text-xs mt-1">Phản hồi khi user tương tác</div>
                        <div className="mt-3 text-blue-400 font-mono text-lg">≤ 200ms</div>
                    </div>
                    <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-5">
                        <div className="text-3xl mb-2">📐</div>
                        <div className="text-purple-400 font-bold text-sm mb-1">CLS</div>
                        <div className="text-gray-800 dark:text-slate-300 text-sm">Cumulative Layout Shift</div>
                        <div className="text-gray-600 dark:text-slate-400 text-xs mt-1">Độ ổn định bố cục trang</div>
                        <div className="mt-3 text-purple-400 font-mono text-lg">≤ 0.1</div>
                    </div>
                </div>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-gray-300 dark:border-white/10">
                                <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Chỉ số</th>
                                <th className="text-left p-3 text-green-500 dark:text-green-400 font-medium">Tốt</th>
                                <th className="text-left p-3 text-yellow-500 dark:text-yellow-400 font-medium">Cần cải thiện</th>
                                <th className="text-left p-3 text-red-500 dark:text-red-400 font-medium">Kém</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 dark:text-slate-300">
                            <tr className="border-b border-gray-200 dark:border-white/5">
                                <td className="p-3 font-medium">LCP</td>
                                <td className="p-3">≤ 2.5s</td>
                                <td className="p-3">2.5s – 4.0s</td>
                                <td className="p-3">&gt; 4.0s</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-white/5">
                                <td className="p-3 font-medium">INP</td>
                                <td className="p-3">≤ 200ms</td>
                                <td className="p-3">200ms – 500ms</td>
                                <td className="p-3">&gt; 500ms</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium">CLS</td>
                                <td className="p-3">≤ 0.1</td>
                                <td className="p-3">0.1 – 0.25</td>
                                <td className="p-3">&gt; 0.25</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ===== Cách đo ===== */}
                <Heading2>🔬 Cách đo Core Web Vitals</Heading2>

                <Heading3>1. Google PageSpeed Insights (Online)</Heading3>
                <Paragraph>
                    Truy cập <Highlight>pagespeed.web.dev</Highlight> → nhập URL → nhận báo cáo chi tiết.
                    Dữ liệu từ <Highlight>CrUX</Highlight> (Chrome User Experience Report) — đo từ user thật trên Chrome.
                </Paragraph>

                <Heading3>2. Lighthouse (Chrome DevTools)</Heading3>
                <CodeBlock title="lighthouse-cli.sh">{`# Chạy trong Chrome DevTools:
# F12 → Tab "Lighthouse" → Analyze page load

# Hoặc dùng CLI:
npx lighthouse https://yoursite.com --view

# CI/CD integration:
npx lighthouse https://yoursite.com \\
  --output=json \\
  --output-path=./lighthouse-report.json \\
  --chrome-flags="--headless"

# Kiểm tra trong script:
# LCP < 2.5s ✅
# INP < 200ms ✅
# CLS < 0.1 ✅`}</CodeBlock>

                <Heading3>3. Web Vitals Library (Đo trong code)</Heading3>
                <CodeBlock title="web-vitals.tsx">{`// npm install web-vitals
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals'

// Đo và gửi về analytics
function reportWebVitals() {
    onLCP((metric) => {
        console.log('LCP:', metric.value, 'ms')
        // Gửi về analytics server
        sendToAnalytics({ name: 'LCP', value: metric.value, rating: metric.rating })
    })

    onINP((metric) => {
        console.log('INP:', metric.value, 'ms')
        sendToAnalytics({ name: 'INP', value: metric.value, rating: metric.rating })
    })

    onCLS((metric) => {
        console.log('CLS:', metric.value)
        sendToAnalytics({ name: 'CLS', value: metric.value, rating: metric.rating })
    })

    onFCP((metric) => console.log('FCP:', metric.value, 'ms'))
    onTTFB((metric) => console.log('TTFB:', metric.value, 'ms'))
}

// Next.js — tích hợp sẵn trong app/layout.tsx
// hoặc pages/_app.tsx:
export function reportWebVitals(metric) {
    switch (metric.name) {
        case 'LCP': case 'INP': case 'CLS':
            // Core Web Vitals
            analytics.track(metric.name, { value: metric.value })
            break
        case 'FCP': case 'TTFB':
            // Các chỉ số phụ
            analytics.track(metric.name, { value: metric.value })
            break
    }
}`}</CodeBlock>

                <Heading3>4. Chrome DevTools — Performance Tab</Heading3>
                <CodeBlock title="performance-tab.sh">{`# Bước 1: F12 → Tab "Performance"
# Bước 2: Click Record (⏺️) → Thao tác trên trang → Stop
# Bước 3: Xem timeline:
#   - Main thread: JavaScript execution time
#   - Layout shifts: CLS events (khung đỏ)
#   - Long tasks: > 50ms blocks (gây INP kém)

# Bước 4: Tab "Performance Insights" (mới)
#   → Tự động highlight các vấn đề LCP, CLS, Long Tasks

# Web Vitals Extension (Chrome):
# → Cài extension "Web Vitals"
# → Hiển thị LCP, INP, CLS realtime trên mọi trang`}</CodeBlock>

                <Callout type="tip">
                    <strong>Lab data</strong> (Lighthouse) vs <strong>Field data</strong> (CrUX): Lab data đo trong môi trường mô phỏng,
                    field data đo từ user thật. Google dùng <strong>field data</strong> để xếp hạng SEO.
                </Callout>

                {/* ===== LCP ===== */}
                <Heading2>🖼️ LCP — Largest Contentful Paint</Heading2>

                <Paragraph>
                    LCP đo <Highlight>thời gian render element lớn nhất</Highlight> trong viewport (ảnh hero, heading lớn, video poster).
                    Mục tiêu: <Highlight>≤ 2.5 giây</Highlight>.
                </Paragraph>

                <Heading3>Nguyên nhân LCP kém</Heading3>
                <div className="my-4 space-y-2">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-gray-800 dark:text-slate-300">Server response chậm (TTFB cao)</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-gray-800 dark:text-slate-300">CSS/JS render-blocking (chặn paint)</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-gray-800 dark:text-slate-300">Ảnh hero quá lớn, không optimize</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-gray-800 dark:text-slate-300">Client-side rendering (CSR) — phải đợi JS load xong</span>
                    </div>
                </div>

                <Heading3>Cách cải thiện LCP</Heading3>
                <CodeBlock title="improve-lcp.tsx">{`// ✅ 1. Preload LCP image (ảnh hero)
// Trong <head> hoặc Next.js metadata:
<link rel="preload" as="image" href="/hero-banner.webp" />

// Next.js Image với priority (preload tự động)
import Image from 'next/image'
<Image
    src="/hero.webp"
    alt="Hero"
    width={1200}
    height={600}
    priority  // ← Preload! Không lazy load
    sizes="100vw"
/>

// ✅ 2. Dùng format ảnh hiện đại
// WebP: nhẹ hơn JPEG 25-35%
// AVIF: nhẹ hơn JPEG 50%+ (nhưng encode chậm hơn)
<picture>
    <source srcSet="/hero.avif" type="image/avif" />
    <source srcSet="/hero.webp" type="image/webp" />
    <img src="/hero.jpg" alt="Hero" />
</picture>

// ✅ 3. SSR/SSG thay vì CSR
// Next.js App Router: Server Component mặc định → HTML gửi ngay
// Không cần đợi JS hydrate mới thấy nội dung

// ✅ 4. Inline critical CSS
// next.config.js
module.exports = {
    experimental: {
        optimizeCss: true, // Tự extract inline critical CSS
    },
}

// ✅ 5. Reduce server response time (TTFB)
// - Dùng CDN (Vercel Edge, CloudFlare)
// - Cache database queries
// - Dùng ISR (Incremental Static Regeneration)
export const revalidate = 3600 // Cache 1 giờ

// ✅ 6. Tránh lazy load LCP element
// ❌ <img loading="lazy" /> cho ảnh hero (chậm hơn!)
// ✅ <img fetchpriority="high" /> cho ảnh hero`}</CodeBlock>

                {/* ===== INP ===== */}
                <Heading2>👆 INP — Interaction to Next Paint</Heading2>

                <Paragraph>
                    INP đo <Highlight>thời gian từ khi user tương tác (click, tap, keypress) đến khi UI cập nhật</Highlight>.
                    Thay thế FID từ 3/2024. Mục tiêu: <Highlight>≤ 200ms</Highlight>.
                </Paragraph>

                <Callout type="warning">
                    INP khác FID: <strong>FID</strong> chỉ đo delay của interaction ĐẦU TIÊN.{' '}
                    <strong>INP</strong> đo TOÀN BỘ interactions trong suốt session — lấy giá trị xấu nhất (p98).
                </Callout>

                <Heading3>Nguyên nhân INP kém</Heading3>
                <div className="my-4 space-y-2">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-gray-800 dark:text-slate-300">Long tasks (&gt;50ms) trên main thread</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-gray-800 dark:text-slate-300">Re-render quá nhiều components khi click</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-gray-800 dark:text-slate-300">Third-party scripts nặng (analytics, ads, chat widgets)</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-gray-800 dark:text-slate-300">DOM quá lớn (&gt;1,500 nodes)</span>
                    </div>
                </div>

                <Heading3>Cách cải thiện INP</Heading3>
                <CodeBlock title="improve-inp.tsx">{`// ✅ 1. Break long tasks — dùng scheduler
// Chia task dài thành nhiều chunk nhỏ

// Cách 1: setTimeout (cũ nhưng hiệu quả)
function processLargeArray(items) {
    const CHUNK_SIZE = 100
    let index = 0

    function processChunk() {
        const end = Math.min(index + CHUNK_SIZE, items.length)
        for (let i = index; i < end; i++) {
            processItem(items[i]) // Xử lý từng item
        }
        index = end
        if (index < items.length) {
            setTimeout(processChunk, 0) // Yield cho browser paint
        }
    }
    processChunk()
}

// Cách 2: scheduler.yield() (mới, tốt hơn)
async function processItems(items) {
    for (const item of items) {
        processItem(item)
        // Yield để browser xử lý user input
        if ('scheduler' in globalThis) {
            await scheduler.yield()
        }
    }
}

// ✅ 2. useTransition — không block UI khi update state
import { useTransition } from 'react'

function FilterPanel({ onFilter }) {
    const [isPending, startTransition] = useTransition()

    const handleFilter = (value) => {
        startTransition(() => {
            onFilter(value) // Non-blocking update
        })
    }

    return (
        <div style={{ opacity: isPending ? 0.6 : 1 }}>
            <select onChange={e => handleFilter(e.target.value)}>
                {/* options */}
            </select>
        </div>
    )
}

// ✅ 3. Debounce input handlers
const handleSearch = useMemo(
    () => debounce((value) => {
        setFilteredResults(filterData(value))
    }, 150),
    []
)

// ✅ 4. Giảm DOM size
// ❌ Render 10,000 items cùng lúc
// ✅ Dùng virtualization (react-virtual)
// ✅ Dùng pagination hoặc infinite scroll

// ✅ 5. Defer third-party scripts
<script src="https://analytics.com/script.js" defer />
// hoặc load sau khi page interactive:
useEffect(() => {
    const timer = setTimeout(() => {
        const script = document.createElement('script')
        script.src = 'https://chat-widget.com/widget.js'
        document.body.appendChild(script)
    }, 3000) // Load sau 3 giây
    return () => clearTimeout(timer)
}, [])`}</CodeBlock>

                {/* ===== CLS ===== */}
                <Heading2>📐 CLS — Cumulative Layout Shift</Heading2>

                <Paragraph>
                    CLS đo <Highlight>mức độ dịch chuyển bất ngờ</Highlight> của nội dung trang. Ví dụ: đang đọc thì quảng cáo load
                    xong đẩy text xuống → user click nhầm. Mục tiêu: <Highlight>≤ 0.1</Highlight>.
                </Paragraph>

                <Heading3>Nguyên nhân CLS kém</Heading3>
                <div className="my-4 space-y-2">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-gray-800 dark:text-slate-300">Ảnh/video không có width/height → load xong mới biết kích thước</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-gray-800 dark:text-slate-300">Font web load xong thay thế fallback font (FOUT)</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-gray-800 dark:text-slate-300">Dynamic content inject (ads, banners, popups)</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <span className="text-red-400 mt-0.5">❌</span>
                        <span className="text-gray-800 dark:text-slate-300">Skeleton/placeholder kích thước khác content thật</span>
                    </div>
                </div>

                <Heading3>Cách cải thiện CLS</Heading3>
                <CodeBlock title="improve-cls.tsx">{`// ✅ 1. LUÔN set width/height cho ảnh
// ❌ Không có dimensions → layout shift khi ảnh load
<img src="/product.jpg" alt="Product" />

// ✅ Có dimensions → browser reserve space trước
<img src="/product.jpg" alt="Product" width={400} height={300} />

// Next.js Image tự động handle
<Image src="/product.jpg" alt="Product" width={400} height={300} />

// ✅ 2. CSS aspect-ratio cho responsive images
.image-container {
    aspect-ratio: 16 / 9; /* Browser tự tính height */
    width: 100%;
}
.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

// ✅ 3. Font loading strategy
// Preload font quan trọng nhất
<link
    rel="preload"
    href="/fonts/Inter-Regular.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
/>

// CSS: dùng font-display
@font-face {
    font-family: 'Inter';
    src: url('/fonts/Inter-Regular.woff2') format('woff2');
    font-display: swap;    /* Hiện fallback ngay, swap khi font load */
    /* font-display: optional;  Tốt hơn cho CLS — nếu chậm thì bỏ qua */
}

// Next.js: tự động optimize fonts
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] }) // Zero layout shift!

// ✅ 4. Reserve space cho dynamic content
// Ads, banners, embeds — set min-height trước khi load
.ad-container {
    min-height: 250px; /* Giữ chỗ cho ad */
    contain: layout;   /* CSS Containment — isolate layout shifts */
}

// ✅ 5. Dùng CSS transform thay vì thay đổi position
// ❌ Thay đổi top/left → gây layout shift
.notification { top: 100px; } /* Layout shift! */

// ✅ Dùng transform → không gây layout shift
.notification { transform: translateY(100px); } /* Smooth! */

// ✅ 6. Content-visibility: auto (cho nội dung dài)
.below-fold {
    content-visibility: auto;   /* Browser skip render khi off-screen */
    contain-intrinsic-size: 500px; /* Ước tính height */
}`}</CodeBlock>

                {/* ===== FCP ===== */}
                <Heading2>🎨 FCP — First Contentful Paint (Chỉ số phụ)</Heading2>

                <Paragraph>
                    FCP đo <Highlight>thời gian render pixel đầu tiên</Highlight> (text, image, SVG, canvas).
                    Là ấn tượng đầu tiên — user biết trang đang load. Mục tiêu: <Highlight>≤ 1.8s</Highlight>.
                </Paragraph>

                <Heading3>Cách cải thiện FCP</Heading3>
                <CodeBlock title="improve-fcp.tsx">{`// ✅ 1. Loại bỏ render-blocking CSS/JS
// CSS: inline critical CSS, defer non-critical
<style>{/* inline critical CSS here */}</style>
<link rel="preload" href="/styles.css" as="style" onLoad="this.rel='stylesheet'" />

// JS: defer hoặc async
<script src="/app.js" defer />  // Load song song, chạy sau HTML parse
<script src="/analytics.js" async />  // Load song song, chạy ngay khi sẵn

// ✅ 2. SSR — gửi HTML có nội dung ngay
// Next.js App Router: mặc định là Server Component
// → HTML có nội dung ngay, không cần đợi JS

// ✅ 3. Preconnect tới external origins
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://cdn.yourapi.com" crossOrigin="anonymous" />
<link rel="dns-prefetch" href="https://analytics.google.com" />

// ✅ 4. Dùng CDN — edge server gần user hơn
// Vercel, CloudFlare Pages, Netlify — tự động deploy lên edge

// ✅ 5. Compression: Brotli > Gzip
// next.config.js — Next.js tự enable Gzip
// Vercel/CloudFlare tự enable Brotli (nhỏ hơn Gzip 15-25%)`}</CodeBlock>

                {/* ===== TTFB ===== */}
                <Heading2>⏱️ TTFB — Time to First Byte (Chỉ số phụ)</Heading2>

                <Paragraph>
                    TTFB đo <Highlight>thời gian từ request đến khi nhận byte đầu tiên</Highlight> từ server.
                    Nếu TTFB chậm, tất cả chỉ số khác đều chậm theo. Mục tiêu: <Highlight>≤ 800ms</Highlight>.
                </Paragraph>

                <Heading3>Cách cải thiện TTFB</Heading3>
                <CodeBlock title="improve-ttfb.tsx">{`// ✅ 1. Dùng CDN — server gần user nhất
// Vercel Edge Functions, CloudFlare Workers
// → Response time: 50-100ms (thay vì 500ms+ từ origin)

// ✅ 2. Cache responses
// Next.js ISR — static page + background revalidation
export const revalidate = 3600 // Revalidate mỗi 1 giờ

// API Route caching
export async function GET() {
    const data = await db.products.findMany()
    return Response.json(data, {
        headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
            // Cache 60s, serve stale up to 5 phút trong khi revalidate
        },
    })
}

// ✅ 3. Database optimization
// - Thêm INDEX cho columns hay query
// - Dùng connection pooling (Prisma, pg-pool)
// - Cache heavy queries với Redis

// ✅ 4. Streaming SSR (React 18+)
// Next.js App Router tự động stream
// → Gửi HTML từng phần → TTFB cực nhanh
import { Suspense } from 'react'

async function Page() {
    return (
        <>
            <Header />  {/* Gửi ngay */}
            <Suspense fallback={<Loading />}>
                <SlowDataSection />  {/* Stream khi data sẵn sàng */}
            </Suspense>
        </>
    )
}

// ✅ 5. HTTP/2 hoặc HTTP/3
// → Multiplexing: nhiều request cùng lúc trên 1 connection
// → Header compression: giảm overhead
// Vercel, CloudFlare tự dùng HTTP/2+`}</CodeBlock>

                {/* ===== Monitoring ===== */}
                <Heading2>📈 Monitoring liên tục</Heading2>

                <CodeBlock title="monitoring.tsx">{`// ✅ Real-time monitoring với web-vitals + analytics
import { onLCP, onINP, onCLS } from 'web-vitals'

function initWebVitalsMonitoring() {
    const vitals = ['LCP', 'INP', 'CLS']

    onLCP(sendToAnalytics)
    onINP(sendToAnalytics)
    onCLS(sendToAnalytics)
}

function sendToAnalytics(metric) {
    const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,  // "good" | "needs-improvement" | "poor"
        delta: metric.delta,
        id: metric.id,
        url: window.location.href,
        // Thêm context
        connection: navigator.connection?.effectiveType, // "4g", "3g"
        deviceMemory: navigator.deviceMemory,
    })

    // Dùng sendBeacon để không block unload
    if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics', body)
    } else {
        fetch('/api/analytics', { body, method: 'POST', keepalive: true })
    }
}

// ✅ Performance Observer — detect long tasks
const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
            console.warn('Long Task detected:', entry.duration, 'ms')
        }
    }
})
observer.observe({ type: 'longtask', buffered: true })

// ✅ Các tool monitoring có dashboard:
// - Google Search Console (free) — Core Web Vitals report
// - PageSpeed Insights API (free) — batch test
// - WebPageTest.org (free) — waterfall analysis chi tiết
// - Vercel Analytics (nếu dùng Vercel)
// - Sentry Performance (paid)`}</CodeBlock>

                {/* ===== Quick Reference ===== */}
                <Heading2>📋 Quick Reference — Improve Checklist</Heading2>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-gray-300 dark:border-white/10">
                                <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Chỉ số</th>
                                <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Top 3 cách cải thiện</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 dark:text-slate-300">
                            <tr className="border-b border-gray-200 dark:border-white/5">
                                <td className="p-3 font-medium text-green-500 dark:text-green-400">LCP</td>
                                <td className="p-3">1. Preload LCP image &nbsp;2. SSR/SSG &nbsp;3. CDN + optimize images</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-white/5">
                                <td className="p-3 font-medium text-blue-500 dark:text-blue-400">INP</td>
                                <td className="p-3">1. Break long tasks &nbsp;2. useTransition &nbsp;3. Reduce DOM size</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-white/5">
                                <td className="p-3 font-medium text-purple-500 dark:text-purple-400">CLS</td>
                                <td className="p-3">1. Set image dimensions &nbsp;2. Font-display: optional &nbsp;3. Reserve ad space</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-white/5">
                                <td className="p-3 font-medium text-orange-500 dark:text-orange-400">FCP</td>
                                <td className="p-3">1. Inline critical CSS &nbsp;2. SSR &nbsp;3. Preconnect</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium text-red-500 dark:text-red-400">TTFB</td>
                                <td className="p-3">1. CDN &nbsp;2. Cache responses &nbsp;3. Streaming SSR</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Callout type="tip">
                    Quy trình tối ưu: <strong>Đo → Xác định bottleneck → Fix → Đo lại → Lặp lại</strong>.
                    Dùng PageSpeed Insights cho field data, Lighthouse cho lab data. Theo dõi qua Google Search Console hàng tuần.
                </Callout>
            </>
        ),
        en: (
            <>
                <Paragraph>
                    <Highlight>Core Web Vitals</Highlight> are Google&apos;s metrics for measuring real user experience on websites.
                    They directly impact <Highlight>SEO ranking</Highlight> — Google prioritizes pages with good Web Vitals.
                </Paragraph>

                <Callout type="info">
                    Since March 2024, Google replaced <strong>FID</strong> with <strong>INP</strong> (Interaction to Next Paint) as an official Core Web Vital.
                </Callout>

                <Heading2>The 3 Core Web Vitals</Heading2>
                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-gray-300 dark:border-white/10">
                                <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Metric</th>
                                <th className="text-left p-3 text-gray-500 dark:text-slate-400 font-medium">Measures</th>
                                <th className="text-left p-3 text-green-500 dark:text-green-400 font-medium">Good</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700 dark:text-slate-300">
                            <tr className="border-b border-gray-200 dark:border-white/5">
                                <td className="p-3 font-medium">LCP</td>
                                <td className="p-3">Loading — time to render largest element</td>
                                <td className="p-3">≤ 2.5s</td>
                            </tr>
                            <tr className="border-b border-gray-200 dark:border-white/5">
                                <td className="p-3 font-medium">INP</td>
                                <td className="p-3">Interactivity — response to user input</td>
                                <td className="p-3">≤ 200ms</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium">CLS</td>
                                <td className="p-3">Visual stability — unexpected layout shifts</td>
                                <td className="p-3">≤ 0.1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Heading2>How to Measure</Heading2>
                <Paragraph>
                    <strong>1. PageSpeed Insights</strong> — pagespeed.web.dev (field + lab data).{' '}
                    <strong>2. Lighthouse</strong> — Chrome DevTools or CLI (lab data).{' '}
                    <strong>3. web-vitals library</strong> — measure in code and send to analytics.{' '}
                    <strong>4. Chrome Web Vitals Extension</strong> — real-time overlay.
                </Paragraph>

                <Heading2>LCP — Largest Contentful Paint</Heading2>
                <Paragraph>
                    Measures time to render the largest element in viewport. Improve by: preloading hero images with <InlineCode>priority</InlineCode>,
                    using SSR/SSG, serving optimized WebP/AVIF images, using CDN, and inlining critical CSS.
                </Paragraph>

                <Heading2>INP — Interaction to Next Paint</Heading2>
                <Paragraph>
                    Measures responsiveness to ALL user interactions (replaced FID). Improve by: breaking long tasks with <InlineCode>scheduler.yield()</InlineCode>,
                    using <InlineCode>useTransition</InlineCode>, debouncing inputs, reducing DOM size, and deferring third-party scripts.
                </Paragraph>

                <Heading2>CLS — Cumulative Layout Shift</Heading2>
                <Paragraph>
                    Measures unexpected layout shifts. Improve by: always setting <InlineCode>width/height</InlineCode> on images,
                    using <InlineCode>font-display: optional</InlineCode>, reserving space for dynamic content,
                    and using CSS <InlineCode>transform</InlineCode> instead of position changes.
                </Paragraph>

                <Heading2>FCP — First Contentful Paint</Heading2>
                <Paragraph>
                    Time to render first pixel of content. Improve by: eliminating render-blocking resources,
                    using SSR, preconnecting to external origins, and using CDN with Brotli compression.
                </Paragraph>

                <Heading2>TTFB — Time to First Byte</Heading2>
                <Paragraph>
                    Time from request to first byte. Improve by: using CDN, caching responses with ISR,
                    streaming SSR with <InlineCode>Suspense</InlineCode>, and optimizing database queries.
                </Paragraph>

                <Heading2>Monitoring</Heading2>
                <Paragraph>
                    Use <InlineCode>web-vitals</InlineCode> library to track real user metrics. Monitor via Google Search Console (free),
                    PageSpeed Insights API, or Vercel/Sentry Analytics. Use <InlineCode>PerformanceObserver</InlineCode> to detect long tasks.
                </Paragraph>

                <Callout type="tip">
                    Optimization cycle: <strong>Measure → Identify bottleneck → Fix → Re-measure → Repeat</strong>.
                    Use field data (CrUX) for SEO, lab data (Lighthouse) for debugging.
                </Callout>
            </>
        ),
    },
}

export default coreWebVitals
