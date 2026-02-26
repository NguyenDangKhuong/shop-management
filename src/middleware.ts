import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { auth } from '../auth.edge'

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
 * User vào shop.thetaphoa.store/tweets → rewrite /not-found
 */
const BLOCKED_DOMAINS_FOR_TWEETS = ['shop.thetaphoa.store']

/**
 * Domain CHỈ cho phép truy cập /tweets.
 * Vào xvn.vercel.app/ hoặc bất kỳ path nào khác → redirect 302 về /tweets
 */
const TWEETS_ONLY_DOMAINS = ['xvn.vercel.app']

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

  // 1. Domain chỉ cho phép /tweets (xvn.vercel.app)
  //    Vào root hoặc bất kỳ path khác → redirect về /tweets
  if (TWEETS_ONLY_DOMAINS.includes(hostname)) {
    if (!pathname.startsWith('/tweets')) {
      return NextResponse.redirect(new URL('/tweets', request.url))
    }
    return NextResponse.next()
  }

  // 2. Chặn /tweets trên domain chính (shop.thetaphoa.store)
  //    Tweets chỉ truy cập được qua xvn.vercel.app
  if (
    pathname.startsWith('/tweets') &&
    BLOCKED_DOMAINS_FOR_TWEETS.includes(hostname)
  ) {
    return NextResponse.rewrite(new URL('/not-found', request.url))
  }

  // 3. Private paths (admin) → check auth
  //    Chưa login → redirect /login (không flicker, không leak data)
  if (PRIVATE_PATHS.some(p => pathname.startsWith(p))) {
    return (auth as any)(request)
  }

  // Tất cả route còn lại → public, không cần xử lý
  return NextResponse.next()
}

/**
 * Matcher: CHỈ match routes CẦN middleware.
 *
 * Tại sao không match ALL routes?
 * → Mỗi middleware invocation tốn Vercel Fast Origin Transfer
 * → Public pages (blogs, landing) không cần middleware → bỏ qua để tiết kiệm
 *
 * ⚠️ Thêm route admin mới → thêm vào đây!
 */
export const config = {
  matcher: [
    // Admin routes (cần auth)
    '/carts/:path*',
    '/categories/:path*',
    '/facebook-posts/:path*',
    '/orders/:path*',
    '/products/:path*',
    '/prompts/:path*',
    '/tiktok-accounts/:path*',
    '/tiktok-music/:path*',
    '/veo3-tokens/:path*',
    '/shopee-links/:path*',
    // Tweets (domain blocking/routing)
    '/tweets/:path*',
    // Root (xvn.vercel.app redirect)
    '/',
  ]
}
