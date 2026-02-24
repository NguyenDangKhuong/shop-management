import React from 'react'

export interface BlogPost {
    slug: string
    title: string
    description: string
    date: string
    tags: string[]
    emoji: string
    color: string
    content: React.ReactNode
}

const CodeBlock = ({ children, title }: { children: string; title?: string }) => (
    <div className="my-6 rounded-xl overflow-hidden border border-white/10">
        {title && (
            <div className="bg-slate-800/80 px-4 py-2 text-xs text-slate-400 border-b border-white/10 font-mono">
                {title}
            </div>
        )}
        <pre className="bg-slate-900/80 p-4 overflow-x-auto text-sm leading-relaxed">
            <code className="text-slate-300 font-mono">{children}</code>
        </pre>
    </div>
)

const Heading2 = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-bold text-white mt-10 mb-4 flex items-center gap-2">
        {children}
    </h2>
)

const Heading3 = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-[#c084fc] mt-8 mb-3">
        {children}
    </h3>
)

const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-slate-300 leading-relaxed mb-4">{children}</p>
)

const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[#38bdf8] font-semibold">{children}</span>
)

const InlineCode = ({ children }: { children: React.ReactNode }) => (
    <code className="bg-slate-800/80 text-[#fbbf24] px-1.5 py-0.5 rounded text-sm font-mono border border-white/10">
        {children}
    </code>
)

const Callout = ({ type, children }: { type: 'tip' | 'warning' | 'info'; children: React.ReactNode }) => {
    const styles = {
        tip: 'border-green-500/30 bg-green-500/5 text-green-400',
        warning: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-400',
        info: 'border-blue-500/30 bg-blue-500/5 text-blue-400',
    }
    const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️' }
    return (
        <div className={`my-6 p-4 rounded-xl border ${styles[type]}`}>
            <span className="mr-2">{icons[type]}</span>
            <span className="text-slate-300">{children}</span>
        </div>
    )
}

export const blogPosts: BlogPost[] = [
    {
        slug: 'callback-promise-async-await',
        title: 'Callback, Promise và Async/Await trong JavaScript',
        description:
            'Hiểu rõ 3 cách xử lý bất đồng bộ trong JavaScript: từ Callback Hell đến Promise chain và cú pháp Async/Await hiện đại.',
        date: '2026-02-24',
        tags: ['JavaScript', 'Async', 'Fundamentals'],
        emoji: '⚡',
        color: '#fbbf24',
        content: (
            <>
                <Paragraph>
                    JavaScript là ngôn ngữ <Highlight>single-threaded</Highlight>, nghĩa là chỉ thực thi một tác vụ tại một thời điểm.
                    Nhưng trong thực tế, ta cần gọi API, đọc file, query database... — những việc cần thời gian chờ đợi.
                    Đó là lúc cơ chế <Highlight>bất đồng bộ (asynchronous)</Highlight> phát huy tác dụng.
                </Paragraph>

                <Callout type="info">
                    Bài viết này sẽ đi từ cách tiếp cận cổ điển nhất (Callback) đến hiện đại nhất (Async/Await),
                    giúp bạn hiểu bản chất và biết khi nào nên dùng cách nào.
                </Callout>

                <Heading2>1. Callback — Cách tiếp cận đầu tiên</Heading2>

                <Paragraph>
                    <Highlight>Callback</Highlight> là một function được truyền vào function khác như một argument,
                    và sẽ được gọi lại (call back) khi tác vụ bất đồng bộ hoàn thành.
                </Paragraph>

                <Heading3>Ví dụ cơ bản</Heading3>

                <CodeBlock title="callback-basic.js">{`function fetchUser(userId, callback) {
    setTimeout(() => {
        const user = { id: userId, name: 'Khuong' }
        callback(user)
    }, 1000)
}

fetchUser(1, (user) => {
    console.log('User:', user.name) // "Khuong" sau 1 giây
})`}</CodeBlock>

                <Heading3>🔥 Callback Hell</Heading3>

                <Paragraph>
                    Vấn đề xảy ra khi ta cần thực hiện nhiều tác vụ bất đồng bộ <Highlight>tuần tự</Highlight> —
                    code bắt đầu lồng sâu vào nhau, rất khó đọc và maintain:
                </Paragraph>

                <CodeBlock title="callback-hell.js">{`getUser(userId, (user) => {
    getOrders(user.id, (orders) => {
        getOrderDetails(orders[0].id, (details) => {
            getShippingStatus(details.trackingId, (status) => {
                console.log('Shipping:', status)
                // 🔥 Pyramid of Doom!
            })
        })
    })
})`}</CodeBlock>

                <Callout type="warning">
                    Callback Hell (hay còn gọi là Pyramid of Doom) làm code khó đọc, khó debug,
                    và gần như không thể xử lý lỗi (error handling) một cách sạch sẽ.
                </Callout>

                <Heading2>2. Promise — Giải pháp cho Callback Hell</Heading2>

                <Paragraph>
                    <Highlight>Promise</Highlight> ra đời từ ES6 (2015) để giải quyết vấn đề Callback Hell.
                    Một Promise đại diện cho một giá trị <Highlight>có thể có trong tương lai</Highlight> —
                    nó có 3 trạng thái:
                </Paragraph>

                <div className="my-6 grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/20 p-3 text-center">
                        <div className="text-yellow-400 font-bold text-sm">⏳ Pending</div>
                        <div className="text-slate-400 text-xs mt-1">Đang chờ kết quả</div>
                    </div>
                    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-center">
                        <div className="text-green-400 font-bold text-sm">✅ Fulfilled</div>
                        <div className="text-slate-400 text-xs mt-1">Thành công</div>
                    </div>
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-center">
                        <div className="text-red-400 font-bold text-sm">❌ Rejected</div>
                        <div className="text-slate-400 text-xs mt-1">Thất bại</div>
                    </div>
                </div>

                <Heading3>Tạo một Promise</Heading3>

                <CodeBlock title="promise-basic.js">{`function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = { id: userId, name: 'Khuong' }
            if (user) {
                resolve(user)    // ✅ Thành công
            } else {
                reject('User not found') // ❌ Thất bại
            }
        }, 1000)
    })
}`}</CodeBlock>

                <Heading3>Promise Chaining — Chuỗi Promise</Heading3>

                <Paragraph>
                    Thay vì lồng callback, ta <Highlight>nối chuỗi</Highlight> các <InlineCode>.then()</InlineCode> lại với nhau.
                    Code phẳng hơn, dễ đọc hơn nhiều:
                </Paragraph>

                <CodeBlock title="promise-chain.js">{`getUser(userId)
    .then(user => getOrders(user.id))
    .then(orders => getOrderDetails(orders[0].id))
    .then(details => getShippingStatus(details.trackingId))
    .then(status => console.log('Shipping:', status))
    .catch(error => console.error('Lỗi:', error))
    // 🎉 Phẳng, sạch, dễ đọc!`}</CodeBlock>

                <Heading3>Promise.all — Chạy song song</Heading3>

                <Paragraph>
                    Khi cần chạy nhiều tác vụ <Highlight>đồng thời</Highlight> và đợi tất cả hoàn thành:
                </Paragraph>

                <CodeBlock title="promise-all.js">{`const [users, products, orders] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
    fetchOrders()
])
// Cả 3 chạy cùng lúc, nhanh hơn chạy tuần tự!`}</CodeBlock>

                <Heading2>3. Async/Await — Cú pháp hiện đại nhất</Heading2>

                <Paragraph>
                    <Highlight>Async/Await</Highlight> ra đời từ ES2017, là <Highlight>syntactic sugar</Highlight> trên Promise.
                    Nó cho phép viết code bất đồng bộ <Highlight>trông như đồng bộ</Highlight> — dễ đọc nhất trong 3 cách.
                </Paragraph>

                <Heading3>Cú pháp cơ bản</Heading3>

                <CodeBlock title="async-await-basic.js">{`async function getShippingInfo(userId) {
    try {
        const user = await getUser(userId)
        const orders = await getOrders(user.id)
        const details = await getOrderDetails(orders[0].id)
        const status = await getShippingStatus(details.trackingId)

        console.log('Shipping:', status)
        // 🚀 Đọc từ trên xuống như code đồng bộ!
    } catch (error) {
        console.error('Lỗi:', error)
    }
}`}</CodeBlock>

                <Callout type="tip">
                    <InlineCode>await</InlineCode> chỉ dùng được bên trong function có keyword <InlineCode>async</InlineCode>.
                    Nó sẽ &quot;tạm dừng&quot; function cho đến khi Promise resolve hoặc reject.
                </Callout>

                <Heading3>Xử lý lỗi với try/catch</Heading3>

                <Paragraph>
                    Thay vì <InlineCode>.catch()</InlineCode> của Promise, ta dùng <InlineCode>try/catch</InlineCode> quen thuộc:
                </Paragraph>

                <CodeBlock title="error-handling.js">{`async function fetchData() {
    try {
        const response = await fetch('/api/data')

        if (!response.ok) {
            throw new Error(\`HTTP \${response.status}\`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error('Fetch failed:', error.message)
        // Có thể retry, show notification, etc.
        throw error // Re-throw nếu cần
    } finally {
        // Luôn chạy (dù success hay error)
        setLoading(false)
    }
}`}</CodeBlock>

                <Heading2>4. So sánh 3 cách tiếp cận</Heading2>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Tiêu chí</th>
                                <th className="text-left p-3 text-yellow-400 font-medium">Callback</th>
                                <th className="text-left p-3 text-blue-400 font-medium">Promise</th>
                                <th className="text-left p-3 text-green-400 font-medium">Async/Await</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Dễ đọc</td>
                                <td className="p-3">⭐</td>
                                <td className="p-3">⭐⭐⭐</td>
                                <td className="p-3">⭐⭐⭐⭐⭐</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Error handling</td>
                                <td className="p-3">Khó</td>
                                <td className="p-3"><InlineCode>.catch()</InlineCode></td>
                                <td className="p-3"><InlineCode>try/catch</InlineCode></td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Chạy song song</td>
                                <td className="p-3">Thủ công</td>
                                <td className="p-3"><InlineCode>Promise.all</InlineCode></td>
                                <td className="p-3"><InlineCode>Promise.all</InlineCode></td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3 text-slate-400">Debugging</td>
                                <td className="p-3">Rất khó</td>
                                <td className="p-3">Trung bình</td>
                                <td className="p-3">Dễ (stack trace rõ)</td>
                            </tr>
                            <tr>
                                <td className="p-3 text-slate-400">Khi nào dùng</td>
                                <td className="p-3">Event listeners, legacy</td>
                                <td className="p-3">Library APIs</td>
                                <td className="p-3">Mọi nơi (khuyên dùng)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Heading2>5. Ví dụ thực tế trong React</Heading2>

                <CodeBlock title="useEffect-async.tsx">{`// ❌ SAI - không dùng async trực tiếp trong useEffect
useEffect(async () => {
    const data = await fetchData()
    setData(data)
}, [])

// ✅ ĐÚNG - tạo async function bên trong
useEffect(() => {
    const loadData = async () => {
        try {
            setLoading(true)
            const data = await fetchData()
            setData(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    loadData()
}, [])`}</CodeBlock>

                <Heading2>📌 Tóm tắt</Heading2>

                <div className="my-6 space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-yellow-400 mt-0.5">1.</span>
                        <span className="text-slate-300"><Highlight>Callback</Highlight> — cách cổ điển, chỉ dùng cho event listeners hoặc legacy code</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">2.</span>
                        <span className="text-slate-300"><Highlight>Promise</Highlight> — nền tảng của async JS, cần hiểu để dùng Async/Await</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-green-400 mt-0.5">3.</span>
                        <span className="text-slate-300"><Highlight>Async/Await</Highlight> — khuyên dùng cho hầu hết mọi trường hợp, code sạch nhất</span>
                    </div>
                </div>

                <Callout type="tip">
                    Trong dự án thực tế, hãy luôn dùng <InlineCode>async/await</InlineCode> kết hợp với <InlineCode>try/catch</InlineCode>.
                    Khi cần chạy song song, dùng <InlineCode>Promise.all()</InlineCode>.
                    Callback chỉ cần khi làm việc với event-based APIs hoặc thư viện legacy.
                </Callout>
            </>
        ),
    },
    {
        slug: 'nextjs-khai-niem-moi',
        title: 'Next.js — Tổng quan các khái niệm mới nhất',
        description:
            'Khám phá App Router, Server Components, Server Actions, Streaming, Parallel Routes và nhiều khái niệm hiện đại trong Next.js.',
        date: '2026-02-24',
        tags: ['Next.js', 'React', 'Full-stack'],
        emoji: '▲',
        color: '#38bdf8',
        content: (
            <>
                <Paragraph>
                    <Highlight>Next.js</Highlight> là framework React phổ biến nhất hiện nay, được phát triển bởi Vercel.
                    Từ phiên bản 13 trở đi, Next.js giới thiệu hàng loạt khái niệm mới mang tính cách mạng
                    — thay đổi cách chúng ta xây dựng ứng dụng web từ gốc rễ.
                </Paragraph>

                <Callout type="info">
                    Bài viết này tổng hợp các khái niệm mới nhất của Next.js, giúp bạn nắm bắt nhanh
                    và áp dụng vào dự án thực tế.
                </Callout>

                <Heading2>1. App Router vs Pages Router</Heading2>

                <Paragraph>
                    Next.js hiện có 2 hệ thống routing: <Highlight>Pages Router</Highlight> (cũ) và{' '}
                    <Highlight>App Router</Highlight> (mới, khuyên dùng). App Router sử dụng thư mục{' '}
                    <InlineCode>app/</InlineCode> thay vì <InlineCode>pages/</InlineCode>.
                </Paragraph>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-slate-800/40 border border-white/10 p-4">
                        <div className="text-yellow-400 font-bold text-sm mb-3">📁 Pages Router (cũ)</div>
                        <CodeBlock title="pages/">{`pages/
├── index.tsx        → /
├── about.tsx        → /about
├── blog/
│   ├── index.tsx    → /blog
│   └── [slug].tsx   → /blog/:slug
└── api/
    └── hello.ts     → /api/hello`}</CodeBlock>
                    </div>
                    <div className="rounded-xl bg-slate-800/40 border border-white/10 p-4">
                        <div className="text-green-400 font-bold text-sm mb-3">📁 App Router (mới)</div>
                        <CodeBlock title="app/">{`app/
├── page.tsx         → /
├── layout.tsx       → Shared layout
├── about/
│   └── page.tsx     → /about
├── blog/
│   ├── page.tsx     → /blog
│   └── [slug]/
│       └── page.tsx → /blog/:slug
└── api/
    └── hello/
        └── route.ts → /api/hello`}</CodeBlock>
                    </div>
                </div>

                <Callout type="tip">
                    App Router hỗ trợ <InlineCode>layout.tsx</InlineCode>, <InlineCode>loading.tsx</InlineCode>,{' '}
                    <InlineCode>error.tsx</InlineCode>, <InlineCode>not-found.tsx</InlineCode> — mỗi file là một
                    &quot;convention&quot; tự động được Next.js xử lý.
                </Callout>

                <Heading2>2. Server Components vs Client Components</Heading2>

                <Paragraph>
                    Đây là thay đổi <Highlight>lớn nhất</Highlight> của Next.js. Mặc định, mọi component trong
                    App Router đều là <Highlight>Server Component</Highlight> — chạy trên server, không gửi JS xuống client.
                </Paragraph>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                        <div className="text-blue-400 font-bold text-sm mb-2">🖥️ Server Component</div>
                        <ul className="text-slate-300 text-sm space-y-1.5">
                            <li>✅ Fetch data trực tiếp (async/await)</li>
                            <li>✅ Truy cập database, file system</li>
                            <li>✅ Giữ secret keys an toàn</li>
                            <li>✅ Bundle size nhỏ (0 KB JS)</li>
                            <li>❌ Không dùng useState, useEffect</li>
                            <li>❌ Không dùng event handlers</li>
                        </ul>
                    </div>
                    <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                        <div className="text-purple-400 font-bold text-sm mb-2">🌐 Client Component</div>
                        <ul className="text-slate-300 text-sm space-y-1.5">
                            <li>✅ useState, useEffect, hooks</li>
                            <li>✅ onClick, onChange, events</li>
                            <li>✅ Browser APIs (localStorage...)</li>
                            <li>✅ Third-party libraries (Ant Design...)</li>
                            <li>❌ Không truy cập trực tiếp DB</li>
                            <li>❌ Tăng bundle size</li>
                        </ul>
                    </div>
                </div>

                <CodeBlock title="server-component.tsx">{`// Server Component (mặc định - KHÔNG cần directive)
// ✅ Có thể async, fetch data trực tiếp
export default async function ProductPage() {
    const products = await db.product.findMany() // Query DB trực tiếp!

    return (
        <div>
            {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
    )
}`}</CodeBlock>

                <CodeBlock title="client-component.tsx">{`'use client' // ⬅️ Directive bắt buộc cho Client Component

import { useState } from 'react'

export default function AddToCartButton({ productId }) {
    const [count, setCount] = useState(0)

    return (
        <button onClick={() => setCount(c => c + 1)}>
            Thêm vào giỏ ({count})
        </button>
    )
}`}</CodeBlock>

                <Callout type="warning">
                    Chỉ thêm <InlineCode>&apos;use client&apos;</InlineCode> khi component thực sự cần interactivity.
                    Giữ càng nhiều Server Component càng tốt để giảm bundle size và tăng performance.
                </Callout>

                <Heading2>3. Server Actions</Heading2>

                <Paragraph>
                    <Highlight>Server Actions</Highlight> cho phép gọi function chạy trên server trực tiếp từ client
                    — không cần tạo API route riêng. Đây là cách Next.js xử lý mutations (tạo, sửa, xóa data).
                </Paragraph>

                <CodeBlock title="actions.ts">{`'use server'

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string
    const price = Number(formData.get('price'))

    // Validate
    if (!name || !price) {
        return { error: 'Thiếu thông tin' }
    }

    // Insert vào DB — chạy trên server, an toàn!
    await db.product.create({
        data: { name, price }
    })

    // Revalidate cache
    revalidatePath('/products')
    return { success: true }
}`}</CodeBlock>

                <CodeBlock title="form.tsx">{`// Dùng trong form — không cần API route!
import { createProduct } from './actions'

export default function ProductForm() {
    return (
        <form action={createProduct}>
            <input name="name" placeholder="Tên sản phẩm" />
            <input name="price" type="number" placeholder="Giá" />
            <button type="submit">Tạo sản phẩm</button>
        </form>
    )
}`}</CodeBlock>

                <Callout type="tip">
                    Server Actions hoạt động cả khi JavaScript bị tắt (Progressive Enhancement).
                    Dùng <InlineCode>useFormStatus</InlineCode> để show loading state
                    và <InlineCode>useActionState</InlineCode> để handle kết quả.
                </Callout>

                <Heading2>4. Streaming & Suspense</Heading2>

                <Paragraph>
                    <Highlight>Streaming</Highlight> cho phép server gửi HTML từng phần xuống client
                    — thay vì đợi toàn bộ page render xong mới gửi. Kết hợp với React{' '}
                    <InlineCode>Suspense</InlineCode> để show loading UI cho từng section.
                </Paragraph>

                <CodeBlock title="page.tsx">{`import { Suspense } from 'react'

export default function DashboardPage() {
    return (
        <div>
            <h1>Dashboard</h1>

            {/* Header render ngay lập tức */}
            <Suspense fallback={<OrdersSkeleton />}>
                {/* Orders load async, stream khi xong */}
                <RecentOrders />
            </Suspense>

            <Suspense fallback={<StatsSkeleton />}>
                {/* Stats load song song, không block Orders */}
                <SalesStats />
            </Suspense>
        </div>
    )
}

// Server Component — async fetch
async function RecentOrders() {
    const orders = await fetchOrders() // Có thể mất 2s
    return <OrderList orders={orders} />
}

async function SalesStats() {
    const stats = await fetchStats() // Có thể mất 3s
    return <StatsGrid stats={stats} />
}`}</CodeBlock>

                <div className="my-6 rounded-xl bg-slate-800/40 border border-white/10 p-4">
                    <div className="text-[#38bdf8] font-bold text-sm mb-3">⚡ Streaming Flow</div>
                    <div className="flex flex-col gap-2 text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                            <span className="text-green-400">0ms</span>
                            <span>→ Header + Skeletons gửi xuống client ngay</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-400">2s</span>
                            <span>→ Orders data stream xuống, thay thế OrdersSkeleton</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-blue-400">3s</span>
                            <span>→ Stats data stream xuống, thay thế StatsSkeleton</span>
                        </div>
                    </div>
                </div>

                <Heading3>loading.tsx — Convention tự động</Heading3>

                <Paragraph>
                    Thay vì tự wrap Suspense, bạn có thể tạo file <InlineCode>loading.tsx</InlineCode> cạnh{' '}
                    <InlineCode>page.tsx</InlineCode> — Next.js tự động wrap Suspense cho bạn:
                </Paragraph>

                <CodeBlock title="app/dashboard/loading.tsx">{`export default function Loading() {
    return (
        <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-64 bg-gray-200 rounded" />
        </div>
    )
}`}</CodeBlock>

                <Heading2>5. Parallel Routes & Intercepting Routes</Heading2>

                <Heading3>Parallel Routes (@folder)</Heading3>

                <Paragraph>
                    Hiển thị nhiều page <Highlight>cùng lúc</Highlight> trong cùng một layout.
                    Dùng cho dashboard có nhiều panel, hoặc modal + page phía sau.
                </Paragraph>

                <CodeBlock title="folder-structure">{`app/dashboard/
├── layout.tsx        → Nhận @analytics và @team như props
├── page.tsx          → Nội dung chính
├── @analytics/
│   └── page.tsx      → Panel analytics (render song song)
└── @team/
    └── page.tsx      → Panel team (render song song)`}</CodeBlock>

                <CodeBlock title="layout.tsx">{`// Parallel routes được inject như props
export default function DashboardLayout({
    children,     // page.tsx
    analytics,    // @analytics/page.tsx
    team,         // @team/page.tsx
}: {
    children: React.ReactNode
    analytics: React.ReactNode
    team: React.ReactNode
}) {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">{children}</div>
            <div>{analytics}</div>
            <div>{team}</div>
        </div>
    )
}`}</CodeBlock>

                <Heading3>Intercepting Routes (.)</Heading3>

                <Paragraph>
                    &quot;Chặn&quot; navigation để show content trong context hiện tại (ví dụ: modal).
                    Khi refresh page thì hiển thị full page bình thường.
                </Paragraph>

                <CodeBlock title="intercepting-routes">{`app/
├── feed/
│   └── page.tsx           → Feed page
│   └── (..)photo/[id]/    → Intercept: show photo as modal
│       └── page.tsx         trên feed page
└── photo/
    └── [id]/
        └── page.tsx       → Full photo page (khi truy cập trực tiếp)`}</CodeBlock>

                <Callout type="info">
                    Pattern này phổ biến trong Instagram, Twitter — click ảnh thì mở modal,
                    nhưng mở trực tiếp URL thì hiển thị full page.
                </Callout>

                <Heading2>6. Caching & Revalidation</Heading2>

                <Paragraph>
                    Next.js có hệ thống <Highlight>caching đa tầng</Highlight> mạnh mẽ:
                </Paragraph>

                <div className="my-6 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left p-3 text-slate-400 font-medium">Cache</th>
                                <th className="text-left p-3 text-slate-400 font-medium">Mô tả</th>
                                <th className="text-left p-3 text-slate-400 font-medium">Nơi lưu</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-300">
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>Request Memoization</InlineCode></td>
                                <td className="p-3">Deduplicate cùng URL trong 1 render</td>
                                <td className="p-3">Server</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>Data Cache</InlineCode></td>
                                <td className="p-3">Cache kết quả fetch API</td>
                                <td className="p-3">Server</td>
                            </tr>
                            <tr className="border-b border-white/5">
                                <td className="p-3"><InlineCode>Full Route Cache</InlineCode></td>
                                <td className="p-3">Cache toàn bộ HTML + RSC payload</td>
                                <td className="p-3">Server</td>
                            </tr>
                            <tr>
                                <td className="p-3"><InlineCode>Router Cache</InlineCode></td>
                                <td className="p-3">Cache RSC payload trên browser</td>
                                <td className="p-3">Client</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Heading3>Revalidation Strategies</Heading3>

                <CodeBlock title="revalidation.ts">{`// 1. Time-based: revalidate mỗi 60 giây
fetch('/api/data', { next: { revalidate: 60 } })

// 2. On-demand: revalidate khi có thay đổi
import { revalidatePath, revalidateTag } from 'next/cache'

// Trong Server Action:
async function updateProduct() {
    'use server'
    await db.product.update(...)

    revalidatePath('/products')          // Revalidate theo path
    revalidateTag('products')            // Revalidate theo tag
}

// 3. Tag-based fetch
fetch('/api/products', { next: { tags: ['products'] } })`}</CodeBlock>

                <Heading2>7. Middleware</Heading2>

                <Paragraph>
                    <Highlight>Middleware</Highlight> chạy <Highlight>trước mọi request</Highlight> — dùng cho authentication,
                    redirect, rewrite URL, thêm headers, A/B testing, i18n...
                </Paragraph>

                <CodeBlock title="middleware.ts">{`import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('session')?.value

    // Chưa login → redirect về /login
    if (!token && request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Thêm custom header
    const response = NextResponse.next()
    response.headers.set('x-custom-header', 'hello')

    return response
}

// Chỉ chạy cho các paths matching pattern
export const config = {
    matcher: ['/admin/:path*', '/api/:path*']
}`}</CodeBlock>

                <Heading2>8. Image & Font Optimization</Heading2>

                <Heading3>next/image</Heading3>

                <Paragraph>
                    Component <InlineCode>Image</InlineCode> tự động optimize: lazy loading, responsive sizes,
                    format WebP/AVIF, prevent layout shift (CLS).
                </Paragraph>

                <CodeBlock title="optimized-image.tsx">{`import Image from 'next/image'

// Tự động optimize kích thước, format, lazy load
<Image
    src="/product.jpg"
    alt="Product"
    width={800}
    height={600}
    quality={80}
    placeholder="blur"    // Blur placeholder khi loading
    priority              // Preload cho LCP images
    sizes="(max-width: 768px) 100vw, 50vw"
/>`}</CodeBlock>

                <Heading3>next/font</Heading3>

                <Paragraph>
                    Tự động host font locally — không gọi Google Fonts từ client, cải thiện privacy và performance:
                </Paragraph>

                <CodeBlock title="font-setup.tsx">{`import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',   // Hiển thị text ngay, swap font khi load xong
    variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
    subsets: ['latin'],
    variable: '--font-roboto-mono',
})

// Dùng trong layout
export default function RootLayout({ children }) {
    return (
        <html className={\`\${inter.variable} \${robotoMono.variable}\`}>
            <body className={inter.className}>{children}</body>
        </html>
    )
}`}</CodeBlock>

                <Heading2>📌 Tóm tắt</Heading2>

                <div className="my-6 space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">▲</span>
                        <span className="text-slate-300"><Highlight>App Router</Highlight> — hệ thống routing mới với layout, loading, error conventions</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">🖥️</span>
                        <span className="text-slate-300"><Highlight>Server Components</Highlight> — mặc định, 0 KB JS, fetch data trực tiếp</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">⚡</span>
                        <span className="text-slate-300"><Highlight>Server Actions</Highlight> — mutations không cần API route</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">🌊</span>
                        <span className="text-slate-300"><Highlight>Streaming</Highlight> — gửi HTML từng phần, UX mượt mà</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">🔄</span>
                        <span className="text-slate-300"><Highlight>Caching</Highlight> — đa tầng, revalidation linh hoạt</span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/40 border border-white/5">
                        <span className="text-blue-400 mt-0.5">🛡️</span>
                        <span className="text-slate-300"><Highlight>Middleware</Highlight> — auth, redirect, headers trước mọi request</span>
                    </div>
                </div>

                <Callout type="tip">
                    Khi bắt đầu dự án mới, luôn dùng App Router. Giữ component ở Server mặc định,
                    chỉ thêm <InlineCode>&apos;use client&apos;</InlineCode> khi cần interactivity.
                    Dùng Server Actions cho mutations và <InlineCode>Suspense</InlineCode> để streaming UI.
                </Callout>
            </>
        ),
    },
]

export function getBlogBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug)
}

export function getAllSlugs(): string[] {
    return blogPosts.map((post) => post.slug)
}
