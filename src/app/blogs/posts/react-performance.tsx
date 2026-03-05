import { Callout, CodeBlock, Heading2, Highlight, InlineCode, Paragraph } from '../components/BlogComponents'
import { BlogPost } from '../types'

const reactPerformance: BlogPost = {
    slug: 'react-performance',
    title: {
        vi: 'Tối ưu Performance trong React — Tổng hợp các kỹ thuật',
        en: 'React Performance Optimization — Comprehensive Techniques',
    },
    description: {
        vi: 'Tổng hợp 15+ kỹ thuật tối ưu hiệu suất React: React.memo, useMemo, useCallback, code splitting, lazy loading, virtualization, debounce, Web Workers và nhiều hơn nữa.',
        en: 'A comprehensive guide to 15+ React performance techniques: React.memo, useMemo, useCallback, code splitting, lazy loading, virtualization, debounce, Web Workers and more.',
    },
    date: '2026-02-26',
    tags: ['React', 'Performance', 'Advanced'],
    emoji: '⚡',
    color: '#f59e0b',
    content: {
        vi: (
            <>
                <Paragraph>
                    Performance là yếu tố quyết định trải nghiệm người dùng. Một app React chậm sẽ khiến user rời đi ngay lập tức.
                    Bài viết này tổng hợp <Highlight>15+ kỹ thuật tối ưu</Highlight> từ cơ bản đến nâng cao, mỗi kỹ thuật đều có code example thực tế.
                </Paragraph>

                <Callout type="info">
                    Nguyên tắc vàng: <strong>Đo trước, tối ưu sau</strong>. Dùng React DevTools Profiler để xác định bottleneck
                    trước khi áp dụng bất kỳ kỹ thuật nào.
                </Callout>

                {/* ===== 1. React.memo ===== */}
                <Heading2>1. React.memo — Tránh re-render không cần thiết</Heading2>

                <Paragraph>
                    <InlineCode>React.memo</InlineCode> là Higher-Order Component wrap quanh function component. Nó sẽ{' '}
                    <Highlight>skip re-render</Highlight> nếu props không thay đổi (shallow comparison).
                </Paragraph>

                <CodeBlock title="react-memo.tsx">{`import { memo } from 'react'

// ❌ Re-render mỗi khi parent render, dù props không đổi
function ProductCard({ name, price }) {
    console.log('ProductCard rendered:', name)
    return (
        <div className="card">
            <h3>{name}</h3>
            <p>{price.toLocaleString()}đ</p>
        </div>
    )
}

// ✅ Chỉ re-render khi name hoặc price thực sự thay đổi
const ProductCard = memo(function ProductCard({ name, price }) {
    console.log('ProductCard rendered:', name)
    return (
        <div className="card">
            <h3>{name}</h3>
            <p>{price.toLocaleString()}đ</p>
        </div>
    )
})

// Custom comparison (khi cần so sánh sâu hơn shallow)
const ProductCard = memo(ProductCardInner, (prevProps, nextProps) => {
    return prevProps.id === nextProps.id && prevProps.price === nextProps.price
})`}</CodeBlock>

                <Callout type="warning">
                    <InlineCode>React.memo</InlineCode> chỉ hiệu quả khi component render tốn kém.
                    Đừng memo mọi thứ — overhead của comparison đôi khi còn tốn hơn re-render!
                </Callout>

                {/* ===== 2. useMemo ===== */}
                <Heading2>2. useMemo — Cache kết quả tính toán nặng</Heading2>

                <Paragraph>
                    <InlineCode>useMemo</InlineCode> lưu cache kết quả computation và chỉ tính lại khi dependencies thay đổi.
                    Dùng cho <Highlight>expensive calculations</Highlight>.
                </Paragraph>

                <CodeBlock title="useMemo.tsx">{`function Dashboard({ transactions }) {
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')

    // ❌ Tính lại mỗi render (kể cả khi chỉ search thay đổi)
    const stats = calculateStats(transactions) // O(n) mỗi render

    // ✅ Chỉ tính lại khi transactions thay đổi
    const stats = useMemo(() => {
        console.log('Calculating stats...')
        return {
            total: transactions.reduce((sum, t) => sum + t.amount, 0),
            average: transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length,
            max: Math.max(...transactions.map(t => t.amount)),
            byCategory: Object.groupBy(transactions, t => t.category),
        }
    }, [transactions])

    // ✅ Filter cũng nên memo nếu list lớn
    const filtered = useMemo(() =>
        transactions.filter(t =>
            (filter === 'all' || t.category === filter) &&
            t.name.toLowerCase().includes(search.toLowerCase())
        ),
        [transactions, filter, search]
    )

    return <TransactionList items={filtered} stats={stats} />
}`}</CodeBlock>

                {/* ===== 3. useCallback ===== */}
                <Heading2>3. useCallback — Ổn định tham chiếu function</Heading2>

                <Paragraph>
                    Mỗi lần render, function được tạo mới → reference thay đổi → child component bị re-render
                    (dù đã memo). <InlineCode>useCallback</InlineCode> giữ <Highlight>cùng reference</Highlight> giữa các render.
                </Paragraph>

                <CodeBlock title="useCallback.tsx">{`const Parent = () => {
    const [count, setCount] = useState(0)
    const [text, setText] = useState('')

    // ❌ Tạo function mới mỗi render → HeavyChild re-render khi text đổi
    const handleIncrement = () => setCount(c => c + 1)

    // ✅ Function được memo → HeavyChild KHÔNG re-render khi text đổi
    const handleIncrement = useCallback(() => {
        setCount(c => c + 1)
    }, [])

    // ✅ Kết hợp useCallback + memo = tối ưu hoàn hảo
    return (
        <>
            <input value={text} onChange={e => setText(e.target.value)} />
            <HeavyChild onIncrement={handleIncrement} count={count} />
        </>
    )
}

const HeavyChild = memo(({ onIncrement, count }) => {
    console.log('HeavyChild rendered')
    return <button onClick={onIncrement}>Count: {count}</button>
})`}</CodeBlock>

                <Callout type="tip">
                    <strong>Quy tắc kết hợp:</strong> <InlineCode>useCallback</InlineCode> cho function props +{' '}
                    <InlineCode>React.memo</InlineCode> cho child component. Dùng một mình sẽ không có tác dụng!
                </Callout>

                {/* ===== 4. Code Splitting ===== */}
                <Heading2>4. Code Splitting — Tách bundle nhỏ hơn</Heading2>

                <Paragraph>
                    Thay vì load toàn bộ app cùng lúc, <Highlight>code splitting</Highlight> chia code thành các chunk nhỏ
                    và chỉ load khi cần. Giảm <Highlight>initial bundle size</Highlight> đáng kể.
                </Paragraph>

                <CodeBlock title="code-splitting.tsx">{`import { lazy, Suspense } from 'react'

// ❌ Import thường — load ngay dù user chưa vào trang
import AdminDashboard from './AdminDashboard'
import Analytics from './Analytics'
import Settings from './Settings'

// ✅ Lazy import — chỉ load khi component được render
const AdminDashboard = lazy(() => import('./AdminDashboard'))
const Analytics = lazy(() => import('./Analytics'))
const Settings = lazy(() => import('./Settings'))

function App() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Suspense>
    )
}

// Next.js: dùng dynamic import
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('./Chart'), {
    loading: () => <p>Loading chart...</p>,
    ssr: false, // Không render trên server (nếu component cần browser API)
})`}</CodeBlock>

                {/* ===== 5. React.lazy + Suspense ===== */}
                <Heading2>5. Lazy Loading Components + Named Exports</Heading2>

                <CodeBlock title="lazy-named-export.tsx">{`// Khi component dùng named export (không phải default)
const MyComponent = lazy(() =>
    import('./MyComponent').then(module => ({
        default: module.MyComponent // ← chuyển named thành default
    }))
)

// Hoặc tạo re-export file
// MyComponentLazy.ts
export { MyComponent as default } from './MyComponent'

// Nested Suspense — skeleton loading chi tiết hơn
function ProductPage() {
    return (
        <Suspense fallback={<HeaderSkeleton />}>
            <Header />
            <Suspense fallback={<ProductGridSkeleton />}>
                <ProductGrid />
                <Suspense fallback={<ReviewsSkeleton />}>
                    <Reviews />
                </Suspense>
            </Suspense>
        </Suspense>
    )
}`}</CodeBlock>

                {/* ===== 6. Virtualization ===== */}
                <Heading2>6. Virtualization — Render danh sách lớn hiệu quả</Heading2>

                <Paragraph>
                    Render 10,000 items cùng lúc sẽ kill performance. <Highlight>Virtualization</Highlight> chỉ render
                    những items đang hiển thị trên màn hình (visible viewport).
                </Paragraph>

                <CodeBlock title="virtualization.tsx">{`// Dùng @tanstack/react-virtual (thay thế react-window)
import { useVirtualizer } from '@tanstack/react-virtual'

function VirtualList({ items }) {
    const parentRef = useRef(null)

    const virtualizer = useVirtualizer({
        count: items.length, // 10,000+ items
        getScrollElement: () => parentRef.current,
        estimateSize: () => 60, // Chiều cao ước tính mỗi item (px)
        overscan: 5, // Render thêm 5 items ở mỗi đầu (smoother scroll)
    })

    return (
        <div ref={parentRef} style={{ height: '500px', overflow: 'auto' }}>
            <div style={{ height: virtualizer.getTotalSize() }}>
                {virtualizer.getVirtualItems().map(virtualItem => (
                    <div
                        key={virtualItem.key}
                        style={{
                            position: 'absolute',
                            top: virtualItem.start,
                            height: virtualItem.size,
                            width: '100%',
                        }}
                    >
                        <ProductRow item={items[virtualItem.index]} />
                    </div>
                ))}
            </div>
        </div>
    )
}

// Kết quả: thay vì 10,000 DOM nodes → chỉ ~20 DOM nodes!`}</CodeBlock>

                {/* ===== 7. Debounce & Throttle ===== */}
                <Heading2>7. Debounce &amp; Throttle — Giảm tần suất xử lý</Heading2>

                <Paragraph>
                    <Highlight>Debounce</Highlight>: chờ user ngừng gõ rồi mới xử lý.{' '}
                    <Highlight>Throttle</Highlight>: xử lý tối đa 1 lần mỗi N ms. Cả hai giảm số lần gọi API hoặc re-render.
                </Paragraph>

                <CodeBlock title="debounce.tsx">{`import { useState, useEffect, useMemo } from 'react'

// Custom hook: useDebounce
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timer) // Cleanup nếu value đổi trước khi hết delay
    }, [value, delay])

    return debouncedValue
}

// Sử dụng
function SearchBar() {
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 300) // Chờ 300ms

    useEffect(() => {
        if (debouncedQuery) {
            // Gọi API search — chỉ gọi khi user ngừng gõ 300ms
            fetch(\`/api/search?q=\${debouncedQuery}\`)
                .then(res => res.json())
                .then(setResults)
        }
    }, [debouncedQuery])

    return <input value={query} onChange={e => setQuery(e.target.value)} />
}

// useThrottle — tối đa 1 lần mỗi N ms (cho scroll, resize)
function useThrottle<T>(value: T, interval: number): T {
    const [throttledValue, setThrottledValue] = useState(value)
    const lastExecuted = useRef(Date.now())

    useEffect(() => {
        const now = Date.now()
        const elapsed = now - lastExecuted.current

        if (elapsed >= interval) {
            setThrottledValue(value)
            lastExecuted.current = now
        } else {
            const timer = setTimeout(() => {
                setThrottledValue(value)
                lastExecuted.current = Date.now()
            }, interval - elapsed)
            return () => clearTimeout(timer)
        }
    }, [value, interval])

    return throttledValue
}`}</CodeBlock>

                {/* ===== 8. useTransition ===== */}
                <Heading2>8. useTransition — Ưu tiên render quan trọng</Heading2>

                <Paragraph>
                    React 18 cho phép đánh dấu state update là <Highlight>non-urgent</Highlight>.
                    UI input luôn responsive, còn heavy computation chạy background.
                </Paragraph>

                <CodeBlock title="useTransition.tsx">{`import { useTransition, useDeferredValue, useState } from 'react'

function ProductSearch({ products }) {
    const [query, setQuery] = useState('')
    const [isPending, startTransition] = useTransition()

    const handleSearch = (e) => {
        const value = e.target.value
        setQuery(value) // ⚡ Urgent: update input ngay lập tức

        startTransition(() => {
            // 🐢 Non-urgent: filter 50,000 products có thể chậm
            setFilteredProducts(
                products.filter(p =>
                    p.name.toLowerCase().includes(value.toLowerCase())
                )
            )
        })
    }

    return (
        <>
            <input value={query} onChange={handleSearch} />
            {isPending && <div className="opacity-50">Đang tìm...</div>}
            <ProductGrid items={filteredProducts} />
        </>
    )
}

// useDeferredValue — cách khác để defer value
function SearchResults({ query }) {
    const deferredQuery = useDeferredValue(query)
    const isStale = query !== deferredQuery

    // deferredQuery cập nhật sau query → UI không bị block
    const results = useMemo(
        () => heavyFilter(deferredQuery),
        [deferredQuery]
    )

    return (
        <div style={{ opacity: isStale ? 0.5 : 1 }}>
            {results.map(r => <Item key={r.id} {...r} />)}
        </div>
    )
}`}</CodeBlock>

                {/* ===== 9. Image Optimization ===== */}
                <Heading2>9. Image Optimization — Lazy load &amp; format</Heading2>

                <CodeBlock title="image-optimization.tsx">{`// Next.js Image — tự động optimize
import Image from 'next/image'

// ✅ Tự động: lazy load, WebP/AVIF, responsive sizes, blur placeholder
<Image
    src="/product.jpg"
    alt="Product"
    width={400}
    height={300}
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQ..." // Tiny base64
    sizes="(max-width: 768px) 100vw, 400px" // Responsive
    priority={false} // true cho above-the-fold images
/>

// Vanilla React — dùng Intersection Observer
function LazyImage({ src, alt, ...props }) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '200px' } // Preload 200px trước khi visible
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={ref}>
            {isVisible ? (
                <img src={src} alt={alt} loading="lazy" {...props} />
            ) : (
                <div className="skeleton" style={{ width: props.width, height: props.height }} />
            )}
        </div>
    )
}`}</CodeBlock>

                {/* ===== 10. Avoid Re-renders ===== */}
                <Heading2>10. Tránh re-render bằng cấu trúc State đúng</Heading2>

                <Paragraph>
                    Đặt state ở <Highlight>đúng vị trí</Highlight> là kỹ thuật tối ưu mạnh nhất — không cần thêm bất kỳ thư viện nào.
                </Paragraph>

                <CodeBlock title="state-structure.tsx">{`// ❌ State ở quá cao → toàn bộ page re-render khi hover
function Page() {
    const [hoveredId, setHoveredId] = useState(null) // State dùng cho 1 component
    return (
        <>
            <Header />  {/* Re-render vô ích */}
            <Sidebar /> {/* Re-render vô ích */}
            <ProductList hoveredId={hoveredId} onHover={setHoveredId} />
        </>
    )
}

// ✅ Đẩy state xuống component cần dùng
function Page() {
    return (
        <>
            <Header />  {/* Không bị ảnh hưởng */}
            <Sidebar /> {/* Không bị ảnh hưởng */}
            <ProductList /> {/* Tự quản lý hoveredId */}
        </>
    )
}

function ProductList() {
    const [hoveredId, setHoveredId] = useState(null) // ← State ở đúng chỗ
    return items.map(item => (
        <ProductCard
            key={item.id}
            isHovered={item.id === hoveredId}
            onHover={() => setHoveredId(item.id)}
        />
    ))
}

// ✅ Pattern: Tách phần thay đổi thành component riêng
function ExpensivePage() {
    return (
        <>
            <AnimatedClock />  {/* Tick mỗi giây — isolated! */}
            <ExpensiveTree />  {/* Không re-render khi clock tick */}
        </>
    )
}

function AnimatedClock() {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(id)
    }, [])
    return <span>{time.toLocaleTimeString()}</span>
}`}</CodeBlock>

                {/* ===== 11. Keys ===== */}
                <Heading2>11. Sử dụng Key đúng cách trong List</Heading2>

                <CodeBlock title="keys.tsx">{`// ❌ Dùng index làm key — React không nhận ra item thay đổi vị trí
{items.map((item, index) => (
    <TodoItem key={index} item={item} /> // Thêm/xóa → mọi item dưới re-render
))}

// ✅ Dùng unique ID — React biết chính xác item nào thay đổi
{items.map(item => (
    <TodoItem key={item.id} item={item} /> // Chỉ item thực sự đổi mới re-render
))}

// ❌ TUYỆT ĐỐI không dùng random key
{items.map(item => (
    <Item key={Math.random()} /> // Unmount + remount mỗi render! 💀
))}

// Khi nào dùng index OK?
// - List tĩnh, không thay đổi thứ tự
// - Không có state bên trong item
// - Items không bị thêm/xóa ở giữa list`}</CodeBlock>

                {/* ===== 12. Web Workers ===== */}
                <Heading2>12. Web Workers — Chạy tính toán nặng off main thread</Heading2>

                <Paragraph>
                    JavaScript chạy trên <Highlight>single thread</Highlight>. Tính toán nặng sẽ block UI → jank, freeze.
                    Web Workers chạy code trên <Highlight>background thread</Highlight> riêng biệt.
                </Paragraph>

                <CodeBlock title="web-worker.tsx">{`// worker.ts — chạy trên thread riêng
self.onmessage = (e: MessageEvent) => {
    const { data, type } = e.data

    switch (type) {
        case 'SORT':
            // Sắp xếp 100,000 items — không block UI!
            const sorted = data.sort((a, b) => a.price - b.price)
            self.postMessage({ type: 'SORT_RESULT', data: sorted })
            break
        case 'AGGREGATE':
            const result = data.reduce((acc, item) => {
                acc[item.category] = (acc[item.category] || 0) + item.amount
                return acc
            }, {})
            self.postMessage({ type: 'AGGREGATE_RESULT', data: result })
            break
    }
}

// useWorker.ts — custom hook
function useWorker() {
    const workerRef = useRef<Worker | null>(null)
    const [result, setResult] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        workerRef.current = new Worker(
            new URL('./worker.ts', import.meta.url)
        )
        workerRef.current.onmessage = (e) => {
            setResult(e.data)
            setIsProcessing(false)
        }
        return () => workerRef.current?.terminate()
    }, [])

    const postMessage = useCallback((message) => {
        setIsProcessing(true)
        workerRef.current?.postMessage(message)
    }, [])

    return { result, isProcessing, postMessage }
}`}</CodeBlock>

                {/* ===== 13. Bundle Analysis ===== */}
                <Heading2>13. Bundle Analysis — Tìm thư viện nặng</Heading2>

                <CodeBlock title="bundle-analysis.tsx">{`// Cài đặt
// npm install @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)

// Chạy: ANALYZE=true npm run build

// 📦 Các thư viện hay gây nặng bundle:
// moment.js (330KB) → dùng date-fns (tree-shakable) hoặc dayjs (2KB)
// lodash (70KB)    → import { debounce } from 'lodash/debounce' (4KB)
// chart.js (200KB) → dùng dynamic import + lazy load

// ✅ Import riêng từng function (tree-shaking)
import debounce from 'lodash/debounce' // 4KB
// ❌ Import toàn bộ
import { debounce } from 'lodash' // 70KB+`}</CodeBlock>

                {/* ===== 14. Avoid Unnecessary Object/Array Creation ===== */}
                <Heading2>14. Tránh tạo Object/Array mới trong render</Heading2>

                <CodeBlock title="avoid-new-objects.tsx">{`// ❌ Object mới mỗi render → child luôn re-render
function Parent() {
    return (
        <Child
            style={{ color: 'red', fontSize: 16 }}  // Mới mỗi render!
            config={{ theme: 'dark', lang: 'vi' }}  // Mới mỗi render!
            items={data.filter(d => d.active)}       // Mới mỗi render!
        />
    )
}

// ✅ Move ra ngoài component hoặc useMemo
const STYLE = { color: 'red', fontSize: 16 }  // Constant — tạo 1 lần
const CONFIG = { theme: 'dark', lang: 'vi' }

function Parent() {
    const activeItems = useMemo(
        () => data.filter(d => d.active),
        [data]
    )

    return <Child style={STYLE} config={CONFIG} items={activeItems} />
}

// ❌ Inline function trong JSX (tạo closure mới mỗi render)
<button onClick={() => handleClick(id)}>Click</button>

// ✅ useCallback hoặc tách component để tránh
const handleItemClick = useCallback((id) => {
    // ... xử lý
}, [])

// Hoặc dùng data attribute
<button data-id={id} onClick={handleClick}>Click</button>
function handleClick(e) {
    const id = e.currentTarget.dataset.id
}`}</CodeBlock>

                {/* ===== 15. Profiling ===== */}
                <Heading2>15. React DevTools Profiler — Đo performance</Heading2>

                <Paragraph>
                    <Highlight>React DevTools Profiler</Highlight> giúp bạn biết chính xác component nào render chậm,
                    renders bao nhiêu lần, và tại sao nó re-render.
                </Paragraph>

                <CodeBlock title="profiling.tsx">{`// Bước 1: Cài React DevTools extension
// Bước 2: Mở tab Profiler → Click Record → Thao tác → Stop
// Bước 3: Xem Flamegraph — component nào tốn thời gian nhất

// Dùng Profiler component để đo trong code
import { Profiler } from 'react'

function onRender(id, phase, actualDuration, baseDuration) {
    console.log(\`\${id} [\${phase}]: \${actualDuration.toFixed(1)}ms (base: \${baseDuration.toFixed(1)}ms)\`)
    // id: tên profiler
    // phase: "mount" hoặc "update"
    // actualDuration: thời gian render thực tế
    // baseDuration: thời gian render nếu không có memo
}

<Profiler id="ProductList" onRender={onRender}>
    <ProductList items={items} />
</Profiler>

// ✅ Highlight renders — bật trong DevTools Settings
// → "Highlight updates when components render"
// → Viền xanh = render bình thường, viền vàng/đỏ = render nhiều

// ✅ why-did-you-render — library debug re-render
// npm install @welldone-software/why-did-you-render
import whyDidYouRender from '@welldone-software/why-did-you-render'
whyDidYouRender(React, { trackAllPureComponents: true })`}</CodeBlock>

                {/* ===== 16. Server Components ===== */}
                <Heading2>16. React Server Components (Next.js 13+)</Heading2>

                <Paragraph>
                    Server Components render trên server → gửi HTML → <Highlight>zero JavaScript</Highlight> cho component đó.
                    Giảm bundle size cực kỳ lớn cho các component không cần interactivity.
                </Paragraph>

                <CodeBlock title="server-components.tsx">{`// ✅ Server Component (default trong Next.js App Router)
// Không gửi JS xuống client — chỉ gửi HTML
async function ProductPage({ params }) {
    const product = await db.product.findUnique({ // Truy cập DB trực tiếp!
        where: { id: params.id }
    })

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <ProductPrice price={product.price} />  {/* Server Component */}
            <AddToCartButton productId={product.id} /> {/* Client Component */}
        </div>
    )
}

// 'use client' — chỉ dùng khi CẦN interactivity
'use client'
function AddToCartButton({ productId }) {
    const [loading, setLoading] = useState(false)

    return (
        <button onClick={() => addToCart(productId)}>
            {loading ? 'Adding...' : 'Add to Cart'}
        </button>
    )
}

// Quy tắc: để mặc định là Server Component
// Chỉ thêm 'use client' khi component cần:
// - useState, useEffect, useContext
// - Event handlers (onClick, onChange...)
// - Browser APIs (localStorage, window...)
// - Custom hooks dùng state/effects`}</CodeBlock>

                {/* ===== 17. Checklist ===== */}
                <Heading2>📋 Performance Checklist</Heading2>

                <div className="my-6 space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Đo performance trước bằng <InlineCode>React DevTools Profiler</InlineCode></span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Đặt state ở vị trí thấp nhất có thể (colocate state)</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]"><InlineCode>React.memo</InlineCode> + <InlineCode>useCallback</InlineCode> cho expensive children</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]"><InlineCode>useMemo</InlineCode> cho expensive calculations</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Code splitting với <InlineCode>React.lazy</InlineCode> / <InlineCode>dynamic import</InlineCode></span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Virtualize danh sách lớn ({'>'}100 items)</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Debounce search inputs, throttle scroll handlers</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Optimize images: lazy load, WebP/AVIF, responsive sizes</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Dùng unique keys (không dùng index) cho dynamic lists</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Analyze bundle size, loại bỏ thư viện nặng không cần thiết</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Ưu tiên Server Components cho content không interactive</span>
                    </div>
                </div>

                {/* ===== REAL-WORLD EXAMPLES ===== */}
                <Heading2>🏭 Ví dụ thực tế từ dự án này</Heading2>

                <Paragraph>
                    Các kỹ thuật tối ưu trên được áp dụng <Highlight>thực tế</Highlight> trong component <InlineCode>ProductTable</InlineCode> của dự án này:
                </Paragraph>

                <CodeBlock title="ProductTable.tsx — Tổng hợp các kỹ thuật">{`// 📁 src/components/shop/products/ProductTable.tsx
// Component này áp dụng 4 kỹ thuật optimization cùng lúc:

// 1️⃣ useMemo + Map — O(1) lookup thay vì O(n) find()
const categoryMap = useMemo(() => {
    const map = new Map<string, string>()
    categories?.forEach((cat) => {
        if (cat._id) map.set(String(cat._id), cat.name)
    })
    return map
}, [categories])
// Render column: categoryMap.get(categoryId) // O(1)!

// 2️⃣ useCallback — 6 stable callbacks, không re-create mỗi render
const handleEditProduct = useCallback((product: Product) => {
    setEditingProduct(product)
    setIsOpen(true)
}, [])

const handleDeleteProduct = useCallback(async (record: Product) => {
    const { message, success } = await remove('api/product', record, 'products')
    push(message, success)
}, [push])

// 3️⃣ useMemo — Memoize columns definition
const columns = useMemo(
    () => [/* ...column configs... */],
    [categoryMap, handleEditProduct, handleDeleteProduct, ...]
)

// 4️⃣ useDebounce — Debounce search input
const debouncedSearch = useDebounce(searchValue, 100)
useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('name', String(debouncedSearch))
    replace(pathname + '?' + params.toString())
}, [debouncedSearch])

// Kết quả: Component với 270 dòng code,
// nhưng mượt và không re-render thừa!`}</CodeBlock>

                <Callout type="tip">
                    Performance optimization là một quá trình liên tục. Đừng cố optimize mọi thứ cùng lúc —
                    hãy bắt đầu từ những bottleneck lớn nhất, đo lại, rồi tiếp tục cải thiện.
                </Callout>
            </>
        ),
        en: (
            <>
                <Paragraph>
                    Performance is critical for user experience. A slow React app drives users away instantly.
                    This article covers <Highlight>15+ optimization techniques</Highlight> from basic to advanced, each with practical code examples.
                </Paragraph>

                <Callout type="info">
                    Golden rule: <strong>Measure first, optimize later</strong>. Use React DevTools Profiler to identify bottlenecks
                    before applying any technique.
                </Callout>

                {/* ===== 1. React.memo ===== */}
                <Heading2>1. React.memo — Prevent Unnecessary Re-renders</Heading2>

                <Paragraph>
                    <InlineCode>React.memo</InlineCode> is a Higher-Order Component that wraps a function component. It will{' '}
                    <Highlight>skip re-rendering</Highlight> if props haven&apos;t changed (shallow comparison).
                </Paragraph>

                <CodeBlock title="react-memo.tsx">{`import { memo } from 'react'

// ❌ Re-renders every time parent renders, even if props unchanged
function ProductCard({ name, price }) {
    console.log('ProductCard rendered:', name)
    return (
        <div className="card">
            <h3>{name}</h3>
            <p>\${price.toLocaleString()}</p>
        </div>
    )
}

// ✅ Only re-renders when name or price actually changes
const ProductCard = memo(function ProductCard({ name, price }) {
    console.log('ProductCard rendered:', name)
    return (
        <div className="card">
            <h3>{name}</h3>
            <p>\${price.toLocaleString()}</p>
        </div>
    )
})

// Custom comparison (when you need deeper than shallow)
const ProductCard = memo(ProductCardInner, (prevProps, nextProps) => {
    return prevProps.id === nextProps.id && prevProps.price === nextProps.price
})`}</CodeBlock>

                <Callout type="warning">
                    <InlineCode>React.memo</InlineCode> is only effective when the component is expensive to render.
                    Don&apos;t memo everything — the comparison overhead can sometimes cost more than re-rendering!
                </Callout>

                {/* ===== 2. useMemo ===== */}
                <Heading2>2. useMemo — Cache Expensive Computations</Heading2>

                <Paragraph>
                    <InlineCode>useMemo</InlineCode> caches computation results and only recalculates when dependencies change.
                    Use for <Highlight>expensive calculations</Highlight>.
                </Paragraph>

                <CodeBlock title="useMemo.tsx">{`function Dashboard({ transactions }) {
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')

    // ❌ Recalculates every render (even when only search changes)
    const stats = calculateStats(transactions) // O(n) every render

    // ✅ Only recalculates when transactions change
    const stats = useMemo(() => {
        console.log('Calculating stats...')
        return {
            total: transactions.reduce((sum, t) => sum + t.amount, 0),
            average: transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length,
            max: Math.max(...transactions.map(t => t.amount)),
            byCategory: Object.groupBy(transactions, t => t.category),
        }
    }, [transactions])

    // ✅ Filter should also be memoized for large lists
    const filtered = useMemo(() =>
        transactions.filter(t =>
            (filter === 'all' || t.category === filter) &&
            t.name.toLowerCase().includes(search.toLowerCase())
        ),
        [transactions, filter, search]
    )

    return <TransactionList items={filtered} stats={stats} />
}`}</CodeBlock>

                {/* ===== 3. useCallback ===== */}
                <Heading2>3. useCallback — Stabilize Function References</Heading2>

                <Paragraph>
                    Every render creates a new function → reference changes → child component re-renders
                    (even if memoized). <InlineCode>useCallback</InlineCode> keeps the <Highlight>same reference</Highlight> across renders.
                </Paragraph>

                <CodeBlock title="useCallback.tsx">{`const Parent = () => {
    const [count, setCount] = useState(0)
    const [text, setText] = useState('')

    // ❌ New function every render → HeavyChild re-renders when text changes
    const handleIncrement = () => setCount(c => c + 1)

    // ✅ Memoized function → HeavyChild does NOT re-render when text changes
    const handleIncrement = useCallback(() => {
        setCount(c => c + 1)
    }, [])

    // ✅ useCallback + memo = perfect optimization
    return (
        <>
            <input value={text} onChange={e => setText(e.target.value)} />
            <HeavyChild onIncrement={handleIncrement} count={count} />
        </>
    )
}

const HeavyChild = memo(({ onIncrement, count }) => {
    console.log('HeavyChild rendered')
    return <button onClick={onIncrement}>Count: {count}</button>
})`}</CodeBlock>

                <Callout type="tip">
                    <strong>Combination rule:</strong> <InlineCode>useCallback</InlineCode> for function props +{' '}
                    <InlineCode>React.memo</InlineCode> for child components. Using either alone has no effect!
                </Callout>

                {/* ===== 4. Code Splitting ===== */}
                <Heading2>4. Code Splitting — Smaller Bundles</Heading2>

                <Paragraph>
                    Instead of loading the entire app at once, <Highlight>code splitting</Highlight> divides code into smaller chunks
                    loaded on demand. Significantly reduces <Highlight>initial bundle size</Highlight>.
                </Paragraph>

                <CodeBlock title="code-splitting.tsx">{`import { lazy, Suspense } from 'react'

// ❌ Regular import — loaded immediately even if user never visits the page
import AdminDashboard from './AdminDashboard'
import Analytics from './Analytics'
import Settings from './Settings'

// ✅ Lazy import — only loaded when component is rendered
const AdminDashboard = lazy(() => import('./AdminDashboard'))
const Analytics = lazy(() => import('./Analytics'))
const Settings = lazy(() => import('./Settings'))

function App() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Suspense>
    )
}

// Next.js: use dynamic import
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('./Chart'), {
    loading: () => <p>Loading chart...</p>,
    ssr: false, // Don't render on server (if component needs browser APIs)
})`}</CodeBlock>

                {/* ===== 5. React.lazy + Suspense ===== */}
                <Heading2>5. Lazy Loading Components + Named Exports</Heading2>

                <CodeBlock title="lazy-named-export.tsx">{`// When component uses named export (not default)
const MyComponent = lazy(() =>
    import('./MyComponent').then(module => ({
        default: module.MyComponent // ← convert named to default
    }))
)

// Or create a re-export file
// MyComponentLazy.ts
export { MyComponent as default } from './MyComponent'

// Nested Suspense — more granular skeleton loading
function ProductPage() {
    return (
        <Suspense fallback={<HeaderSkeleton />}>
            <Header />
            <Suspense fallback={<ProductGridSkeleton />}>
                <ProductGrid />
                <Suspense fallback={<ReviewsSkeleton />}>
                    <Reviews />
                </Suspense>
            </Suspense>
        </Suspense>
    )
}`}</CodeBlock>

                {/* ===== 6. Virtualization ===== */}
                <Heading2>6. Virtualization — Efficiently Render Large Lists</Heading2>

                <Paragraph>
                    Rendering 10,000 items at once will kill performance. <Highlight>Virtualization</Highlight> only renders
                    items currently visible in the viewport.
                </Paragraph>

                <CodeBlock title="virtualization.tsx">{`// Using @tanstack/react-virtual (replaces react-window)
import { useVirtualizer } from '@tanstack/react-virtual'

function VirtualList({ items }) {
    const parentRef = useRef(null)

    const virtualizer = useVirtualizer({
        count: items.length, // 10,000+ items
        getScrollElement: () => parentRef.current,
        estimateSize: () => 60, // Estimated height per item (px)
        overscan: 5, // Render 5 extra items on each end (smoother scroll)
    })

    return (
        <div ref={parentRef} style={{ height: '500px', overflow: 'auto' }}>
            <div style={{ height: virtualizer.getTotalSize() }}>
                {virtualizer.getVirtualItems().map(virtualItem => (
                    <div
                        key={virtualItem.key}
                        style={{
                            position: 'absolute',
                            top: virtualItem.start,
                            height: virtualItem.size,
                            width: '100%',
                        }}
                    >
                        <ProductRow item={items[virtualItem.index]} />
                    </div>
                ))}
            </div>
        </div>
    )
}

// Result: instead of 10,000 DOM nodes → only ~20 DOM nodes!`}</CodeBlock>

                {/* ===== 7. Debounce & Throttle ===== */}
                <Heading2>7. Debounce &amp; Throttle — Reduce Processing Frequency</Heading2>

                <Paragraph>
                    <Highlight>Debounce</Highlight>: wait until user stops typing before processing.{' '}
                    <Highlight>Throttle</Highlight>: process at most once per N ms. Both reduce API calls and re-renders.
                </Paragraph>

                <CodeBlock title="debounce.tsx">{`import { useState, useEffect, useMemo } from 'react'

// Custom hook: useDebounce
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timer) // Cleanup if value changes before delay
    }, [value, delay])

    return debouncedValue
}

// Usage
function SearchBar() {
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 300) // Wait 300ms

    useEffect(() => {
        if (debouncedQuery) {
            // API call — only fires when user stops typing for 300ms
            fetch(\`/api/search?q=\${debouncedQuery}\`)
                .then(res => res.json())
                .then(setResults)
        }
    }, [debouncedQuery])

    return <input value={query} onChange={e => setQuery(e.target.value)} />
}

// useThrottle — max once per N ms (for scroll, resize)
function useThrottle<T>(value: T, interval: number): T {
    const [throttledValue, setThrottledValue] = useState(value)
    const lastExecuted = useRef(Date.now())

    useEffect(() => {
        const now = Date.now()
        const elapsed = now - lastExecuted.current

        if (elapsed >= interval) {
            setThrottledValue(value)
            lastExecuted.current = now
        } else {
            const timer = setTimeout(() => {
                setThrottledValue(value)
                lastExecuted.current = Date.now()
            }, interval - elapsed)
            return () => clearTimeout(timer)
        }
    }, [value, interval])

    return throttledValue
}`}</CodeBlock>

                {/* ===== 8. useTransition ===== */}
                <Heading2>8. useTransition — Prioritize Important Renders</Heading2>

                <Paragraph>
                    React 18 lets you mark state updates as <Highlight>non-urgent</Highlight>.
                    UI input stays responsive while heavy computation runs in the background.
                </Paragraph>

                <CodeBlock title="useTransition.tsx">{`import { useTransition, useDeferredValue, useState } from 'react'

function ProductSearch({ products }) {
    const [query, setQuery] = useState('')
    const [isPending, startTransition] = useTransition()

    const handleSearch = (e) => {
        const value = e.target.value
        setQuery(value) // ⚡ Urgent: update input immediately

        startTransition(() => {
            // 🐢 Non-urgent: filtering 50,000 products can be slow
            setFilteredProducts(
                products.filter(p =>
                    p.name.toLowerCase().includes(value.toLowerCase())
                )
            )
        })
    }

    return (
        <>
            <input value={query} onChange={handleSearch} />
            {isPending && <div className="opacity-50">Searching...</div>}
            <ProductGrid items={filteredProducts} />
        </>
    )
}

// useDeferredValue — alternative way to defer values
function SearchResults({ query }) {
    const deferredQuery = useDeferredValue(query)
    const isStale = query !== deferredQuery

    // deferredQuery updates after query → UI not blocked
    const results = useMemo(
        () => heavyFilter(deferredQuery),
        [deferredQuery]
    )

    return (
        <div style={{ opacity: isStale ? 0.5 : 1 }}>
            {results.map(r => <Item key={r.id} {...r} />)}
        </div>
    )
}`}</CodeBlock>

                {/* ===== 9. Image Optimization ===== */}
                <Heading2>9. Image Optimization — Lazy Load &amp; Format</Heading2>

                <CodeBlock title="image-optimization.tsx">{`// Next.js Image — automatic optimization
import Image from 'next/image'

// ✅ Automatic: lazy load, WebP/AVIF, responsive sizes, blur placeholder
<Image
    src="/product.jpg"
    alt="Product"
    width={400}
    height={300}
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,/9j/4AAQ..." // Tiny base64
    sizes="(max-width: 768px) 100vw, 400px" // Responsive
    priority={false} // true for above-the-fold images
/>

// Vanilla React — using Intersection Observer
function LazyImage({ src, alt, ...props }) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '200px' } // Preload 200px before visible
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={ref}>
            {isVisible ? (
                <img src={src} alt={alt} loading="lazy" {...props} />
            ) : (
                <div className="skeleton" style={{ width: props.width, height: props.height }} />
            )}
        </div>
    )
}`}</CodeBlock>

                {/* ===== 10. Avoid Re-renders ===== */}
                <Heading2>10. Avoid Re-renders with Proper State Structure</Heading2>

                <Paragraph>
                    Placing state at the <Highlight>right level</Highlight> is the most powerful optimization — no extra libraries needed.
                </Paragraph>

                <CodeBlock title="state-structure.tsx">{`// ❌ State too high → entire page re-renders on hover
function Page() {
    const [hoveredId, setHoveredId] = useState(null) // State used by 1 component
    return (
        <>
            <Header />  {/* Unnecessary re-render */}
            <Sidebar /> {/* Unnecessary re-render */}
            <ProductList hoveredId={hoveredId} onHover={setHoveredId} />
        </>
    )
}

// ✅ Push state down to the component that needs it
function Page() {
    return (
        <>
            <Header />  {/* Not affected */}
            <Sidebar /> {/* Not affected */}
            <ProductList /> {/* Manages its own hoveredId */}
        </>
    )
}

function ProductList() {
    const [hoveredId, setHoveredId] = useState(null) // ← State in the right place
    return items.map(item => (
        <ProductCard
            key={item.id}
            isHovered={item.id === hoveredId}
            onHover={() => setHoveredId(item.id)}
        />
    ))
}

// ✅ Pattern: Extract changing parts into separate components
function ExpensivePage() {
    return (
        <>
            <AnimatedClock />  {/* Ticks every second — isolated! */}
            <ExpensiveTree />  {/* Doesn't re-render when clock ticks */}
        </>
    )
}

function AnimatedClock() {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const id = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(id)
    }, [])
    return <span>{time.toLocaleTimeString()}</span>
}`}</CodeBlock>

                {/* ===== 11. Keys ===== */}
                <Heading2>11. Proper Keys in Lists</Heading2>

                <CodeBlock title="keys.tsx">{`// ❌ Using index as key — React can't detect item reordering
{items.map((item, index) => (
    <TodoItem key={index} item={item} /> // Add/remove → all items below re-render
))}

// ✅ Using unique ID — React knows exactly which item changed
{items.map(item => (
    <TodoItem key={item.id} item={item} /> // Only actually changed items re-render
))}

// ❌ NEVER use random key
{items.map(item => (
    <Item key={Math.random()} /> // Unmount + remount every render! 💀
))}

// When is index OK?
// - Static list, order never changes
// - No state inside items
// - Items are never added/removed in the middle`}</CodeBlock>

                {/* ===== 12. Web Workers ===== */}
                <Heading2>12. Web Workers — Heavy Computation Off Main Thread</Heading2>

                <Paragraph>
                    JavaScript runs on a <Highlight>single thread</Highlight>. Heavy computation blocks the UI → jank, freezing.
                    Web Workers run code on a separate <Highlight>background thread</Highlight>.
                </Paragraph>

                <CodeBlock title="web-worker.tsx">{`// worker.ts — runs on separate thread
self.onmessage = (e: MessageEvent) => {
    const { data, type } = e.data

    switch (type) {
        case 'SORT':
            // Sorting 100,000 items — doesn't block UI!
            const sorted = data.sort((a, b) => a.price - b.price)
            self.postMessage({ type: 'SORT_RESULT', data: sorted })
            break
        case 'AGGREGATE':
            const result = data.reduce((acc, item) => {
                acc[item.category] = (acc[item.category] || 0) + item.amount
                return acc
            }, {})
            self.postMessage({ type: 'AGGREGATE_RESULT', data: result })
            break
    }
}

// useWorker.ts — custom hook
function useWorker() {
    const workerRef = useRef<Worker | null>(null)
    const [result, setResult] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        workerRef.current = new Worker(
            new URL('./worker.ts', import.meta.url)
        )
        workerRef.current.onmessage = (e) => {
            setResult(e.data)
            setIsProcessing(false)
        }
        return () => workerRef.current?.terminate()
    }, [])

    const postMessage = useCallback((message) => {
        setIsProcessing(true)
        workerRef.current?.postMessage(message)
    }, [])

    return { result, isProcessing, postMessage }
}`}</CodeBlock>

                {/* ===== 13. Bundle Analysis ===== */}
                <Heading2>13. Bundle Analysis — Find Heavy Libraries</Heading2>

                <CodeBlock title="bundle-analysis.tsx">{`// Installation
// npm install @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer(nextConfig)

// Run: ANALYZE=true npm run build

// 📦 Common bundle-heavy libraries:
// moment.js (330KB) → use date-fns (tree-shakable) or dayjs (2KB)
// lodash (70KB)    → import { debounce } from 'lodash/debounce' (4KB)
// chart.js (200KB) → use dynamic import + lazy load

// ✅ Import individual functions (tree-shaking)
import debounce from 'lodash/debounce' // 4KB
// ❌ Import entire library
import { debounce } from 'lodash' // 70KB+`}</CodeBlock>

                {/* ===== 14. Avoid Unnecessary Object/Array Creation ===== */}
                <Heading2>14. Avoid Creating New Objects/Arrays in Render</Heading2>

                <CodeBlock title="avoid-new-objects.tsx">{`// ❌ New object every render → child always re-renders
function Parent() {
    return (
        <Child
            style={{ color: 'red', fontSize: 16 }}  // New every render!
            config={{ theme: 'dark', lang: 'en' }}  // New every render!
            items={data.filter(d => d.active)}       // New every render!
        />
    )
}

// ✅ Move outside component or useMemo
const STYLE = { color: 'red', fontSize: 16 }  // Constant — created once
const CONFIG = { theme: 'dark', lang: 'en' }

function Parent() {
    const activeItems = useMemo(
        () => data.filter(d => d.active),
        [data]
    )

    return <Child style={STYLE} config={CONFIG} items={activeItems} />
}

// ❌ Inline function in JSX (creates new closure every render)
<button onClick={() => handleClick(id)}>Click</button>

// ✅ useCallback or extract component to avoid
const handleItemClick = useCallback((id) => {
    // ... handle
}, [])

// Or use data attributes
<button data-id={id} onClick={handleClick}>Click</button>
function handleClick(e) {
    const id = e.currentTarget.dataset.id
}`}</CodeBlock>

                {/* ===== 15. Profiling ===== */}
                <Heading2>15. React DevTools Profiler — Measure Performance</Heading2>

                <Paragraph>
                    <Highlight>React DevTools Profiler</Highlight> tells you exactly which components render slowly,
                    how many times they render, and why they re-render.
                </Paragraph>

                <CodeBlock title="profiling.tsx">{`// Step 1: Install React DevTools extension
// Step 2: Open Profiler tab → Click Record → Interact → Stop
// Step 3: View Flamegraph — which component takes the most time

// Use Profiler component to measure in code
import { Profiler } from 'react'

function onRender(id, phase, actualDuration, baseDuration) {
    console.log(\`\${id} [\${phase}]: \${actualDuration.toFixed(1)}ms (base: \${baseDuration.toFixed(1)}ms)\`)
    // id: profiler name
    // phase: "mount" or "update"
    // actualDuration: actual render time
    // baseDuration: render time without any memoization
}

<Profiler id="ProductList" onRender={onRender}>
    <ProductList items={items} />
</Profiler>

// ✅ Highlight renders — enable in DevTools Settings
// → "Highlight updates when components render"
// → Blue border = normal render, yellow/red border = too many renders

// ✅ why-did-you-render — library for debugging re-renders
// npm install @welldone-software/why-did-you-render
import whyDidYouRender from '@welldone-software/why-did-you-render'
whyDidYouRender(React, { trackAllPureComponents: true })`}</CodeBlock>

                {/* ===== 16. Server Components ===== */}
                <Heading2>16. React Server Components (Next.js 13+)</Heading2>

                <Paragraph>
                    Server Components render on the server → send HTML → <Highlight>zero JavaScript</Highlight> for that component.
                    Massively reduces bundle size for non-interactive components.
                </Paragraph>

                <CodeBlock title="server-components.tsx">{`// ✅ Server Component (default in Next.js App Router)
// No JS sent to client — only HTML
async function ProductPage({ params }) {
    const product = await db.product.findUnique({ // Direct DB access!
        where: { id: params.id }
    })

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <ProductPrice price={product.price} />  {/* Server Component */}
            <AddToCartButton productId={product.id} /> {/* Client Component */}
        </div>
    )
}

// 'use client' — only use when you NEED interactivity
'use client'
function AddToCartButton({ productId }) {
    const [loading, setLoading] = useState(false)

    return (
        <button onClick={() => addToCart(productId)}>
            {loading ? 'Adding...' : 'Add to Cart'}
        </button>
    )
}

// Rule: keep Server Component as default
// Only add 'use client' when component needs:
// - useState, useEffect, useContext
// - Event handlers (onClick, onChange...)
// - Browser APIs (localStorage, window...)
// - Custom hooks using state/effects`}</CodeBlock>

                {/* ===== 17. Checklist ===== */}
                <Heading2>📋 Performance Checklist</Heading2>

                <div className="my-6 space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Measure performance first with <InlineCode>React DevTools Profiler</InlineCode></span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Place state at the lowest possible level (colocate state)</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]"><InlineCode>React.memo</InlineCode> + <InlineCode>useCallback</InlineCode> for expensive children</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]"><InlineCode>useMemo</InlineCode> for expensive calculations</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Code splitting with <InlineCode>React.lazy</InlineCode> / <InlineCode>dynamic import</InlineCode></span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Virtualize large lists ({'>'}100 items)</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Debounce search inputs, throttle scroll handlers</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Optimize images: lazy load, WebP/AVIF, responsive sizes</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Use unique keys (not index) for dynamic lists</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Analyze bundle size, remove unnecessary heavy libraries</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                        <span className="text-green-400 mt-0.5">✅</span>
                        <span className="text-[var(--text-primary)]">Prefer Server Components for non-interactive content</span>
                    </div>
                </div>

                {/* ===== REAL-WORLD EXAMPLES ===== */}
                <Heading2>🏭 Real-World Examples from This Project</Heading2>

                <Paragraph>
                    The optimization techniques above are applied <Highlight>in practice</Highlight> in the <InlineCode>ProductTable</InlineCode> component of this project:
                </Paragraph>

                <CodeBlock title="ProductTable.tsx — Combined Techniques">{`// 📁 src/components/shop/products/ProductTable.tsx
// This component applies 4 optimization techniques simultaneously:

// 1️⃣ useMemo + Map — O(1) lookup instead of O(n) find()
const categoryMap = useMemo(() => {
    const map = new Map<string, string>()
    categories?.forEach((cat) => {
        if (cat._id) map.set(String(cat._id), cat.name)
    })
    return map
}, [categories])
// Column render: categoryMap.get(categoryId) // O(1)!

// 2️⃣ useCallback — 6 stable callbacks, not recreated every render
const handleEditProduct = useCallback((product: Product) => {
    setEditingProduct(product)
    setIsOpen(true)
}, [])

const handleDeleteProduct = useCallback(async (record: Product) => {
    const { message, success } = await remove('api/product', record, 'products')
    push(message, success)
}, [push])

// 3️⃣ useMemo — Memoize columns definition
const columns = useMemo(
    () => [/* ...column configs... */],
    [categoryMap, handleEditProduct, handleDeleteProduct, ...]
)

// 4️⃣ useDebounce — Debounce search input
const debouncedSearch = useDebounce(searchValue, 100)
useEffect(() => {
    const params = new URLSearchParams(searchParams)
    params.set('name', String(debouncedSearch))
    replace(pathname + '?' + params.toString())
}, [debouncedSearch])

// Result: 270-line component that stays smooth
// and never re-renders unnecessarily!`}</CodeBlock>

                <Callout type="tip">
                    Performance optimization is an ongoing process. Don&apos;t try to optimize everything at once —
                    start with the biggest bottlenecks, measure again, then keep improving.
                </Callout>
            </>
        ),
    },
}

export default reactPerformance
