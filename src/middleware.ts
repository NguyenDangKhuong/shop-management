import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { auth } from '../auth.edge'
import { SITE_DOMAIN } from '@/utils/constants'

/**
 * ========================================================================
 * MIDDLEWARE — Next.js Edge Middleware
 * ========================================================================
 *
 * Middleware là gì?
 * - Code chạy TRƯỚC khi page/API render, ngay trên Edge server (CDN gần user)
 * - Flow: User Request → Middleware → Page/API → Response
 * - Dùng để: redirect, rewrite URL, check auth, block routes
 *
 * Tại sao check auth ở Middleware thay vì Frontend?
 * - FE (useEffect): Page render trước → user thấy content 1 giây → redirect → FLICKER!
 * - Middleware: Chặn TRƯỚC khi render → user KHÔNG BAO GIỜ thấy content → không flicker
 * - Middleware cũng ngăn leak HTML/data về browser trước khi auth
 *
 * Fast Origin Transfer (Vercel billing):
 * - Mỗi lần middleware chạy = tốn transfer (incoming + outgoing bytes)
 * - Vì vậy matcher CHỈ match routes CẦN middleware, không match ALL routes
 * - Public pages (blogs, landing) KHÔNG qua middleware → 0 transfer cost
 *
 * ⚠️ Khi thêm route admin mới:
 *    1. Thêm path vào PRIVATE_PATHS
 *    2. Thêm pattern vào matcher config bên dưới
 * ========================================================================
 */

/**
 * Domain bị chặn không cho truy cập /tweets.
 * User vào các domain này/tweets → rewrite /not-found
 * Default: SITE_DOMAIN. Override bằng env BLOCKED_DOMAINS_FOR_TWEETS (comma-separated).
 */
const BLOCKED_DOMAINS_FOR_TWEETS = (process.env.BLOCKED_DOMAINS_FOR_TWEETS || SITE_DOMAIN || '').split(',').map(d => d.trim()).filter(Boolean)

/**
 * Domain CHỈ cho phép truy cập /tweets.
 * Vào TWEETS_ONLY_DOMAIN/ hoặc bất kỳ path nào khác → redirect 302 về /tweets
 * Set bằng env TWEETS_ONLY_DOMAIN (comma-separated).
 */
const TWEETS_ONLY_DOMAINS = (process.env.TWEETS_ONLY_DOMAIN || '').split(',').map(d => d.trim()).filter(Boolean)

/**
 * Các path cần auth (admin dashboard).
 * User chưa login vào các path này → redirect /login (không flicker).
 */
const PRIVATE_PATHS = ['/carts', '/categories', '/facebook-posts', '/orders', '/products', '/prompts', '/tiktok-accounts', '/tiktok-music', '/veo3-tokens']

/**
 * Middleware xử lý 3 việc theo thứ tự:
 * 1. TWEETS_ONLY_DOMAINS → redirect mọi thứ về /tweets
 * 2. BLOCKED_DOMAINS → chặn /tweets trên domain chính
 * 3. PRIVATE_PATHS → check auth, redirect /login nếu chưa đăng nhập
 */
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')?.split(':')[0] || ''
  const pathname = request.nextUrl.pathname

  // 1. Domain chỉ cho phép /tweets (TWEETS_ONLY_DOMAIN)
  //    Vào root hoặc bất kỳ path khác → redirect về /tweets
  //    Nhưng cho phép /api/ (cần cho tweets API) và /sw.js (service worker)
  if (TWEETS_ONLY_DOMAINS.includes(hostname)) {
    if (pathname.startsWith('/api/') || pathname === '/sw.js') {
      return NextResponse.next()
    }
    if (!pathname.startsWith('/tweets')) {
      return NextResponse.redirect(new URL('/tweets', request.url))
    }
    return NextResponse.next()
  }

  // 2. Chặn /tweets trên domain chính (SITE_DOMAIN)
  //    Tweets chỉ truy cập được qua TWEETS_ONLY_DOMAIN
  if (
    pathname.startsWith('/tweets') &&
    BLOCKED_DOMAINS_FOR_TWEETS.includes(hostname)
  ) {
    return NextResponse.rewrite(new URL('/not-found', request.url))
  }

  // 3. Admin API routes → check session OR API key
  //    n8n và automation gọi bằng x-api-key header
  //    Browser admin dùng session auth
  const ADMIN_API_PATHS = ['/api/product', '/api/products', '/api/categories', '/api/category',
    '/api/orders', '/api/order', '/api/facebook-posts', '/api/tiktok', '/api/tiktok-accounts',
    '/api/tiktok-music', '/api/tiktok-products', '/api/tiktok-scheduled-posts',
    '/api/prompts', '/api/autoflows', '/api/r2-video', '/api/veo3-media', '/api/check-connection']
  if (ADMIN_API_PATHS.some(p => pathname.startsWith(p))) {
    const apiKey = request.headers.get('x-api-key')
    const validApiKey = process.env.ADMIN_API_KEY

    // Option 1: Valid API key → allow (n8n, automation)
    if (validApiKey && apiKey === validApiKey) {
      return NextResponse.next()
    }

    // Option 2: Valid session → allow (browser admin)
    // auth() returns redirect response if no session, or next() if authenticated
    return (auth as any)(request)
  }

  // 4. Private pages (admin dashboard) → check session auth
  //    Chưa login → redirect /login (không flicker, không leak data)
  if (PRIVATE_PATHS.some(p => pathname.startsWith(p))) {
    return (auth as any)(request)
  }

  // Tất cả route còn lại → public, không cần xử lý
  return NextResponse.next()
}

/**
 * Matcher: catch-all cho mọi page routes (trừ static assets).
 *
 * Tại sao catch-all thay vì list từng route?
 * → Cần chặn TWEETS_ONLY_DOMAIN truy cập BẤT KỲ page nào ngoài /tweets
 * → Nếu chỉ list cụ thể, route mới (blogs, projects) sẽ bị miss
 *
 * Pattern loại trừ: _next (static files), favicon, files có extension (.css, .js, .ico...)
 */
export const config = {
  matcher: [
    // Catch-all: chặn mọi route trên tweets-only domains (trừ static assets)
    // Cũng dùng cho admin auth + domain-based routing
    '/((?!_next|favicon|.*\\..*).*)',
  ]
}
