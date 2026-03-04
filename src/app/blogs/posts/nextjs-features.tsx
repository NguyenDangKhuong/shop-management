import { Callout, CodeBlock, Heading2, Highlight, InlineCode, Paragraph } from '../components/BlogComponents'
import { BlogPost } from '../types'

const nextjsFeatures: BlogPost = {
    slug: 'nextjs-features',
    title: {
        vi: 'Next.js qua các phiên bản — Tính năng từ v12 đến v15',
        en: 'Next.js Through the Versions — Features from v12 to v15',
    },
    description: {
        vi: 'Tổng hợp tính năng quan trọng của Next.js: Middleware, App Router, Server Components, Server Actions, Turbopack, PPR và nhiều hơn.',
        en: 'Key Next.js features: Middleware, App Router, Server Components, Server Actions, Turbopack, PPR and more.',
    },
    date: '2026-02-26',
    tags: ['Next.js', 'React', 'Server Components', 'Full-stack'],
    emoji: '▲',
    color: '#000000',
    content: {
        vi: (
            <>
                <Paragraph>
                    Next.js là framework React phổ biến nhất, phát triển từ SSR framework đơn giản thành{' '}
                    <Highlight>full-stack platform</Highlight>. Bài viết tổng hợp các tính năng quan trọng từ v12 đến v15.
                </Paragraph>

                {/* ===== Next.js 12 ===== */}
                <Heading2>⚡ Next.js 12 (2021) — Middleware & SWC Compiler</Heading2>

                <CodeBlock title="middleware.ts">{`// Middleware — chạy trước mọi request (Edge Runtime)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Auth check
    const token = request.cookies.get('token')
    if (!token && request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Geolocation-based redirect
    const country = request.geo?.country || 'US'
    if (country === 'VN') {
        return NextResponse.rewrite(new URL('/vi' + request.nextUrl.pathname, request.url))
    }

    // Add headers
    const response = NextResponse.next()
    response.headers.set('X-Frame-Options', 'DENY')
    return response
}

export const config = {
    matcher: ['/admin/:path*', '/api/:path*']
}`}</CodeBlock>

                <CodeBlock title="nextjs12-features.ts">{`// SWC Compiler — thay Babel, nhanh hơn ~17x
// Tự động enabled, không cần config

// React Server Components (experimental)
// Đánh dấu .server.js và .client.js

// ES Modules support
// next.config.mjs thay next.config.js

// URL Imports (experimental)
// import confetti from 'https://cdn.skypack.dev/canvas-confetti'

// Bot-aware ISR
// Bots (Googlebot) luôn nhận static HTML, users nhận cached version

// AVIF Image support
// next/image hỗ trợ format AVIF (nhỏ hơn WebP ~20%)`}</CodeBlock>

                {/* ===== Next.js 13 ===== */}
                <Heading2>🏗️ Next.js 13 (2022) — App Router Revolution</Heading2>

                <Paragraph>
                    Next.js 13 giới thiệu <Highlight>App Router</Highlight> — thay đổi lớn nhất trong lịch sử Next.js. Chuyển từ{' '}
                    <InlineCode>pages/</InlineCode> sang <InlineCode>app/</InlineCode> directory.
                </Paragraph>

                <CodeBlock title="app-router.tsx">{`// App Router — cấu trúc mới
// app/
// ├── layout.tsx        ← Root layout (thay _app.tsx)
// ├── page.tsx          ← Home page (/)
// ├── loading.tsx       ← Loading UI (auto Suspense)
// ├── error.tsx         ← Error UI (auto Error Boundary)
// ├── not-found.tsx     ← 404 page
// ├── products/
// │   ├── page.tsx      ← /products
// │   ├── [id]/
// │   │   └── page.tsx  ← /products/:id
// │   └── layout.tsx    ← Nested layout cho /products/*
// └── (admin)/          ← Route Group (không ảnh hưởng URL)
//     ├── layout.tsx    ← Admin layout
//     └── dashboard/
//         └── page.tsx  ← /dashboard

// Layout — persist across navigations
export default function RootLayout({ children }) {
    return (
        <html lang="vi">
            <body>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    )
}

// Loading UI — tự động wrap trong Suspense
// app/products/loading.tsx
export default function Loading() {
    return <ProductSkeleton />
}

// Error UI — tự động wrap trong Error Boundary
// app/products/error.tsx
'use client'
export default function Error({ error, reset }) {
    return (
        <div>
            <h2>Something went wrong!</h2>
            <button onClick={reset}>Try again</button>
        </div>
    )
}`}</CodeBlock>

                <CodeBlock title="server-components-next13.tsx">{`// Server Components — mặc định trong App Router
// Không cần 'use client' → Server Component

// ✅ Server Component — fetch data trực tiếp, no useState/useEffect
async function ProductList() {
    const products = await fetch('https://api.example.com/products', {
        next: { revalidate: 60 } // ISR: revalidate mỗi 60s
    }).then(r => r.json())

    return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}

// Data Fetching với caching
// 1. Static (default) — cache forever
const data = await fetch('https://api.example.com/data')

// 2. ISR — revalidate sau n giây
const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // 1 hour
})

// 3. Dynamic — không cache
const data = await fetch('https://api.example.com/data', {
    cache: 'no-store'
})

// Route Segment Config
export const dynamic = 'force-dynamic' // hoặc 'auto', 'force-static'
export const revalidate = 60

// Parallel Routes — render nhiều pages cùng lúc
// app/@modal/login/page.tsx
// app/@sidebar/page.tsx
// app/layout.tsx sẽ nhận { modal, sidebar, children }

// Intercepting Routes — modal patterns
// app/feed/@modal/(.)photo/[id]/page.tsx
// (.) = same level, (..) = one level up`}</CodeBlock>

                <CodeBlock title="next-image-font.tsx">{`// next/image improvements
import Image from 'next/image'

// Automatic sizing — không cần width/height cho static imports
import heroImage from './hero.png'
<Image src={heroImage} alt="Hero" /> // auto width/height

// Remote images — cần config
// next.config.js
module.exports = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: '**.example.com' }
        ]
    }
}

// next/font — zero layout shift, tự host font
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto_Mono({ subsets: ['latin'], weight: ['400', '700'] })

export default function Layout({ children }) {
    return <body className={inter.className}>{children}</body>
}

// Turbopack (alpha) — thay Webpack, nhanh hơn ~700x HMR
// next dev --turbo`}</CodeBlock>

                {/* ===== Next.js 14 ===== */}
                <Heading2>🚀 Next.js 14 (2023) — Server Actions Stable</Heading2>

                <Paragraph>
                    Next.js 14 ổn định <Highlight>Server Actions</Highlight>, biến Next.js thành true full-stack framework.
                </Paragraph>

                <CodeBlock title="server-actions.tsx">{`// Server Actions — gọi server function từ client component
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string
    const price = Number(formData.get('price'))

    // Validation
    if (!name || !price) {
        return { error: 'Name and price required' }
    }

    // Database operation
    await db.insert(products).values({ name, price })

    // Revalidate cache
    revalidatePath('/products')

    // Redirect
    redirect('/products')
}

export async function deleteProduct(id: string) {
    await db.delete(products).where(eq(products.id, id))
    revalidatePath('/products')
}

// Dùng trong form (Server Component)
import { createProduct } from './actions'

export default function NewProductPage() {
    return (
        <form action={createProduct}>
            <input name="name" required />
            <input name="price" type="number" required />
            <button type="submit">Create</button>
        </form>
    )
}

// Dùng trong Client Component
'use client'
import { deleteProduct } from './actions'

export function DeleteButton({ id }) {
    return (
        <button onClick={() => deleteProduct(id)}>
            Delete
        </button>
    )
}

// Với useFormState cho error handling
'use client'
import { useFormState } from 'react-dom'
import { createProduct } from './actions'

export function ProductForm() {
    const [state, formAction] = useFormState(createProduct, { error: null })

    return (
        <form action={formAction}>
            <input name="name" />
            {state?.error && <p className="error">{state.error}</p>}
            <SubmitButton />
        </form>
    )
}`}</CodeBlock>

                <CodeBlock title="nextjs14-features.tsx">{`// Metadata API — SEO tốt hơn
import { Metadata } from 'next'

// Static metadata
export const metadata: Metadata = {
    title: 'My Shop',
    description: 'Best products online',
    openGraph: {
        title: 'My Shop',
        images: ['/og-image.png'],
    },
}

// Dynamic metadata
export async function generateMetadata({ params }) {
    const product = await getProduct(params.id)
    return {
        title: product.name,
        description: product.description,
    }
}

// Partial Prerendering (experimental) — PPR
// Static shell + dynamic holes
// Trang load nhanh (static), rồi dynamic parts stream vào
export const experimental_ppr = true

export default async function Page() {
    return (
        <div>
            <h1>Products</h1>           {/* Static */}
            <Suspense fallback={<Skeleton />}>
                <ProductList />          {/* Dynamic — streams in */}
            </Suspense>
        </div>
    )
}

// Turbopack improvements — nhanh hơn, ổn định hơn
// next dev --turbo (recommended cho dev)`}</CodeBlock>

                {/* ===== Next.js 15 ===== */}
                <Heading2>✨ Next.js 15 (2024) — React 19 & Turbopack Stable</Heading2>

                <Paragraph>
                    Next.js 15 tích hợp <Highlight>React 19</Highlight>, Turbopack stable cho dev, và nhiều breaking changes quan trọng.
                </Paragraph>

                <CodeBlock title="nextjs15.tsx">{`// React 19 Support — tất cả React 19 features
// useActionState, useOptimistic, use(), Server Components improvements

// Turbopack Dev — STABLE
// next dev --turbo (mặc định trong tương lai)
// HMR nhanh hơn ~76% so với Webpack

// Caching thay đổi — BREAKING CHANGE ⚠️
// Next.js 14: fetch() cache mặc định = 'force-cache' (cached)
// Next.js 15: fetch() cache mặc định = 'no-store' (dynamic)

// Trước (Next 14):
const data = await fetch('/api/data') // cached by default

// Sau (Next 15):
const data = await fetch('/api/data') // NOT cached by default
const data = await fetch('/api/data', { cache: 'force-cache' }) // opt-in cache

// Dynamic APIs giờ là async — BREAKING CHANGE ⚠️
// cookies(), headers(), params, searchParams giờ là async

// Next.js 14:
import { cookies } from 'next/headers'
const cookieStore = cookies()

// Next.js 15:
import { cookies } from 'next/headers'
const cookieStore = await cookies()

// params & searchParams cũng async
export default async function Page({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ q?: string }>
}) {
    const { id } = await params
    const { q } = await searchParams
    // ...
}

// next/form — enhanced form với client-side navigation
import Form from 'next/form'

export default function SearchForm() {
    return (
        <Form action="/search">
            <input name="q" placeholder="Search..." />
            <button type="submit">Search</button>
        </Form>
    )
    // Submit → navigate to /search?q=... with client-side navigation
    // Prefetch + no full page reload
}

// Instrumentation — hook vào server lifecycle
// instrumentation.ts (root)
export async function register() {
    // Called once when server starts
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        // Setup monitoring, DB connections, etc.
    }
}

// unstable_after — chạy code sau khi response đã gửi
import { unstable_after as after } from 'next/server'

export default async function Page() {
    const data = await fetchData()

    after(() => {
        // Chạy sau khi response đã gửi đến user
        // Analytics, logging, cleanup
        logPageView('/products')
    })

    return <div>{data}</div>
}

// Enhanced Security — Server Actions có encryption
// Unused Server Actions tự pruned khỏi JS bundle`}</CodeBlock>

                <Heading2>📋 Tóm tắt nhanh</Heading2>

                <CodeBlock title="cheat-sheet.js">{`// Next.js 12: Middleware, SWC compiler, Edge Runtime, URL imports
// Next.js 13: App Router, layouts, loading/error UI,
//             Server Components (default), Turbopack alpha, next/font
// Next.js 14: Server Actions (stable), Metadata API,
//             Partial Prerendering (experimental)
// Next.js 15: React 19, Turbopack stable, fetch no-cache default,
//             async cookies/headers/params, next/form, unstable_after`}</CodeBlock>

                <Callout type="warning">
                    <strong>Breaking Changes khi upgrade lên Next.js 15:</strong><br />
                    1. <InlineCode>fetch()</InlineCode> không cache mặc định nữa<br />
                    2. <InlineCode>cookies()</InlineCode>, <InlineCode>headers()</InlineCode> giờ là async<br />
                    3. <InlineCode>params</InlineCode> và <InlineCode>searchParams</InlineCode> là Promise
                </Callout>

                <Callout type="tip">
                    Cách nhớ: <strong>12</strong> = Middleware + SWC, <strong>13</strong> = App Router + RSC,
                    {' '}<strong>14</strong> = Server Actions, <strong>15</strong> = React 19 + async APIs.
                </Callout>
            </>
        ),
        en: (
            <>
                <Paragraph>
                    Next.js is the most popular React framework, evolving from a simple SSR framework into a{' '}
                    <Highlight>full-stack platform</Highlight>. This article covers key features from v12 to v15.
                </Paragraph>

                {/* ===== Next.js 12 ===== */}
                <Heading2>⚡ Next.js 12 (2021) — Middleware &amp; SWC Compiler</Heading2>

                <CodeBlock title="middleware.ts">{`// Middleware — runs before every request (Edge Runtime)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Auth check
    const token = request.cookies.get('token')
    if (!token && request.nextUrl.pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Geolocation-based redirect
    const country = request.geo?.country || 'US'
    if (country === 'VN') {
        return NextResponse.rewrite(new URL('/vi' + request.nextUrl.pathname, request.url))
    }

    // Add headers
    const response = NextResponse.next()
    response.headers.set('X-Frame-Options', 'DENY')
    return response
}

export const config = {
    matcher: ['/admin/:path*', '/api/:path*']
}`}</CodeBlock>

                <CodeBlock title="nextjs12-features.ts">{`// SWC Compiler — replaces Babel, ~17x faster
// Automatically enabled, no config needed

// React Server Components (experimental)
// .server.js and .client.js file markers

// ES Modules support
// next.config.mjs replaces next.config.js

// URL Imports (experimental)
// import confetti from 'https://cdn.skypack.dev/canvas-confetti'

// Bot-aware ISR
// Bots (Googlebot) always receive static HTML, users get cached version

// AVIF Image support
// next/image supports AVIF format (~20% smaller than WebP)`}</CodeBlock>

                {/* ===== Next.js 13 ===== */}
                <Heading2>🏗️ Next.js 13 (2022) — App Router Revolution</Heading2>

                <Paragraph>
                    Next.js 13 introduced the <Highlight>App Router</Highlight> — the biggest change in Next.js history.
                    Migrating from <InlineCode>pages/</InlineCode> to <InlineCode>app/</InlineCode> directory.
                </Paragraph>

                <CodeBlock title="app-router.tsx">{`// App Router — new file structure
// app/
// ├── layout.tsx        ← Root layout (replaces _app.tsx)
// ├── page.tsx          ← Home page (/)
// ├── loading.tsx       ← Loading UI (auto Suspense)
// ├── error.tsx         ← Error UI (auto Error Boundary)
// ├── not-found.tsx     ← 404 page
// ├── products/
// │   ├── page.tsx      ← /products
// │   ├── [id]/
// │   │   └── page.tsx  ← /products/:id
// │   └── layout.tsx    ← Nested layout for /products/*
// └── (admin)/          ← Route Group (doesn't affect URL)
//     ├── layout.tsx    ← Admin layout
//     └── dashboard/
//         └── page.tsx  ← /dashboard

// Layout — persists across navigations
export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    )
}

// Loading UI — automatically wrapped in Suspense
// app/products/loading.tsx
export default function Loading() {
    return <ProductSkeleton />
}

// Error UI — automatically wrapped in Error Boundary
// app/products/error.tsx
'use client'
export default function Error({ error, reset }) {
    return (
        <div>
            <h2>Something went wrong!</h2>
            <button onClick={reset}>Try again</button>
        </div>
    )
}`}</CodeBlock>

                <CodeBlock title="server-components-next13.tsx">{`// Server Components — default in App Router
// No 'use client' needed → Server Component

// ✅ Server Component — fetch data directly, no useState/useEffect
async function ProductList() {
    const products = await fetch('https://api.example.com/products', {
        next: { revalidate: 60 } // ISR: revalidate every 60s
    }).then(r => r.json())

    return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}

// Data Fetching with caching
// 1. Static (default) — cache forever
const data = await fetch('https://api.example.com/data')

// 2. ISR — revalidate after n seconds
const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 3600 } // 1 hour
})

// 3. Dynamic — no cache
const data = await fetch('https://api.example.com/data', {
    cache: 'no-store'
})

// Route Segment Config
export const dynamic = 'force-dynamic' // or 'auto', 'force-static'
export const revalidate = 60

// Parallel Routes — render multiple pages simultaneously
// app/@modal/login/page.tsx
// app/@sidebar/page.tsx
// app/layout.tsx receives { modal, sidebar, children }

// Intercepting Routes — modal patterns
// app/feed/@modal/(.)photo/[id]/page.tsx
// (.) = same level, (..) = one level up`}</CodeBlock>

                <CodeBlock title="next-image-font.tsx">{`// next/image improvements
import Image from 'next/image'

// Automatic sizing — no width/height needed for static imports
import heroImage from './hero.png'
<Image src={heroImage} alt="Hero" /> // auto width/height

// Remote images — need config
// next.config.js
module.exports = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: '**.example.com' }
        ]
    }
}

// next/font — zero layout shift, self-hosted fonts
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto_Mono({ subsets: ['latin'], weight: ['400', '700'] })

export default function Layout({ children }) {
    return <body className={inter.className}>{children}</body>
}

// Turbopack (alpha) — replaces Webpack, ~700x faster HMR
// next dev --turbo`}</CodeBlock>

                {/* ===== Next.js 14 ===== */}
                <Heading2>🚀 Next.js 14 (2023) — Server Actions Stable</Heading2>

                <Paragraph>
                    Next.js 14 stabilizes <Highlight>Server Actions</Highlight>, making Next.js a true full-stack framework.
                </Paragraph>

                <CodeBlock title="server-actions.tsx">{`// Server Actions — call server functions from client components
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string
    const price = Number(formData.get('price'))

    // Validation
    if (!name || !price) {
        return { error: 'Name and price required' }
    }

    // Database operation
    await db.insert(products).values({ name, price })

    // Revalidate cache
    revalidatePath('/products')

    // Redirect
    redirect('/products')
}

export async function deleteProduct(id: string) {
    await db.delete(products).where(eq(products.id, id))
    revalidatePath('/products')
}

// Use in form (Server Component)
import { createProduct } from './actions'

export default function NewProductPage() {
    return (
        <form action={createProduct}>
            <input name="name" required />
            <input name="price" type="number" required />
            <button type="submit">Create</button>
        </form>
    )
}

// Use in Client Component
'use client'
import { deleteProduct } from './actions'

export function DeleteButton({ id }) {
    return (
        <button onClick={() => deleteProduct(id)}>
            Delete
        </button>
    )
}

// With useFormState for error handling
'use client'
import { useFormState } from 'react-dom'
import { createProduct } from './actions'

export function ProductForm() {
    const [state, formAction] = useFormState(createProduct, { error: null })

    return (
        <form action={formAction}>
            <input name="name" />
            {state?.error && <p className="error">{state.error}</p>}
            <SubmitButton />
        </form>
    )
}`}</CodeBlock>

                <CodeBlock title="nextjs14-features.tsx">{`// Metadata API — better SEO
import { Metadata } from 'next'

// Static metadata
export const metadata: Metadata = {
    title: 'My Shop',
    description: 'Best products online',
    openGraph: {
        title: 'My Shop',
        images: ['/og-image.png'],
    },
}

// Dynamic metadata
export async function generateMetadata({ params }) {
    const product = await getProduct(params.id)
    return {
        title: product.name,
        description: product.description,
    }
}

// Partial Prerendering (experimental) — PPR
// Static shell + dynamic holes
// Page loads fast (static), then dynamic parts stream in
export const experimental_ppr = true

export default async function Page() {
    return (
        <div>
            <h1>Products</h1>           {/* Static */}
            <Suspense fallback={<Skeleton />}>
                <ProductList />          {/* Dynamic — streams in */}
            </Suspense>
        </div>
    )
}

// Turbopack improvements — faster, more stable
// next dev --turbo (recommended for dev)`}</CodeBlock>

                {/* ===== Next.js 15 ===== */}
                <Heading2>✨ Next.js 15 (2024) — React 19 &amp; Turbopack Stable</Heading2>

                <Paragraph>
                    Next.js 15 integrates <Highlight>React 19</Highlight>, makes Turbopack stable, and introduces important breaking changes.
                </Paragraph>

                <CodeBlock title="nextjs15.tsx">{`// React 19 Support — all React 19 features available
// useActionState, useOptimistic, use(), Server Components improvements

// Turbopack Dev — STABLE
// next dev --turbo (will become default in future)
// HMR ~76% faster than Webpack

// Caching changes — BREAKING CHANGE ⚠️
// Next.js 14: fetch() defaults to 'force-cache' (cached)
// Next.js 15: fetch() defaults to 'no-store' (dynamic)

// Before (Next 14):
const data = await fetch('/api/data') // cached by default

// After (Next 15):
const data = await fetch('/api/data') // NOT cached by default
const data = await fetch('/api/data', { cache: 'force-cache' }) // opt-in cache

// Dynamic APIs are now async — BREAKING CHANGE ⚠️
// cookies(), headers(), params, searchParams are now async

// Next.js 14:
import { cookies } from 'next/headers'
const cookieStore = cookies()

// Next.js 15:
import { cookies } from 'next/headers'
const cookieStore = await cookies()

// params & searchParams also async
export default async function Page({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ q?: string }>
}) {
    const { id } = await params
    const { q } = await searchParams
    // ...
}

// next/form — enhanced form with client-side navigation
import Form from 'next/form'

export default function SearchForm() {
    return (
        <Form action="/search">
            <input name="q" placeholder="Search..." />
            <button type="submit">Search</button>
        </Form>
    )
    // Submit → navigate to /search?q=... with client-side navigation
    // Prefetch + no full page reload
}

// Instrumentation — hook into server lifecycle
// instrumentation.ts (root)
export async function register() {
    // Called once when server starts
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        // Setup monitoring, DB connections, etc.
    }
}

// unstable_after — run code after response has been sent
import { unstable_after as after } from 'next/server'

export default async function Page() {
    const data = await fetchData()

    after(() => {
        // Runs after response has been sent to user
        // Analytics, logging, cleanup
        logPageView('/products')
    })

    return <div>{data}</div>
}

// Enhanced Security — Server Actions have encryption
// Unused Server Actions are auto-pruned from JS bundle`}</CodeBlock>

                <Heading2>📋 Quick Reference</Heading2>

                <CodeBlock title="cheat-sheet.js">{`// Next.js 12: Middleware, SWC compiler, Edge Runtime, URL imports
// Next.js 13: App Router, layouts, loading/error UI,
//             Server Components (default), Turbopack alpha, next/font
// Next.js 14: Server Actions (stable), Metadata API,
//             Partial Prerendering (experimental)
// Next.js 15: React 19, Turbopack stable, fetch no-cache default,
//             async cookies/headers/params, next/form, unstable_after`}</CodeBlock>

                <Callout type="warning">
                    <strong>Breaking Changes when upgrading to Next.js 15:</strong><br />
                    1. <InlineCode>fetch()</InlineCode> no longer caches by default<br />
                    2. <InlineCode>cookies()</InlineCode>, <InlineCode>headers()</InlineCode> are now async<br />
                    3. <InlineCode>params</InlineCode> and <InlineCode>searchParams</InlineCode> are Promises
                </Callout>

                <Callout type="tip">
                    Memory trick: <strong>12</strong> = Middleware + SWC, <strong>13</strong> = App Router + RSC,
                    {' '}<strong>14</strong> = Server Actions, <strong>15</strong> = React 19 + async APIs.
                </Callout>
            </>
        ),
    },
}

export default nextjsFeatures
