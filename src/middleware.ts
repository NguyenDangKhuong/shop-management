import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { auth } from '../auth.edge'

/**
 * Danh sách domain bị chặn không cho truy cập page /tweets.
 */
const BLOCKED_DOMAINS_FOR_TWEETS = ['shop.thetaphoa.store']

/**
 * Danh sách domain CHỈ cho phép truy cập /tweets.
 * Tất cả page khác sẽ bị rewrite sang /not-found.
 */
const TWEETS_ONLY_DOMAINS = ['xvn.vercel.app']

/**
 * Các path cần auth (admin dashboard) — tất cả route khác là public.
 */
const PRIVATE_PATHS = ['/carts', '/categories', '/facebook-posts', '/orders', '/products', '/prompts', '/tiktok-accounts', '/tiktok-music', '/veo3-tokens']

/**
 * Middleware xử lý 3 việc:
 * 1. Domain trong TWEETS_ONLY_DOMAINS → chỉ cho vào /tweets, còn lại rewrite /not-found
 * 2. Chặn /tweets cho domain trong BLOCKED_DOMAINS_FOR_TWEETS
 * 3. Xác thực auth cho PRIVATE_PATHS (admin dashboard), còn lại public
 */
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')?.split(':')[0] || ''
  const pathname = request.nextUrl.pathname

  // 1. Domain chỉ cho phép /tweets — redirect về /tweets
  if (TWEETS_ONLY_DOMAINS.includes(hostname)) {
    if (!pathname.startsWith('/tweets')) {
      return NextResponse.redirect(new URL('/tweets', request.url))
    }
    return NextResponse.next()
  }

  // 2. Chặn /tweets cho domain cụ thể
  if (
    pathname.startsWith('/tweets') &&
    BLOCKED_DOMAINS_FOR_TWEETS.includes(hostname)
  ) {
    return NextResponse.rewrite(new URL('/not-found', request.url))
  }

  // 3. Private paths — cần auth
  if (PRIVATE_PATHS.some(p => pathname.startsWith(p))) {
    return (auth as any)(request)
  }

  // 4. Tất cả route còn lại — public
  return NextResponse.next()
}

/**
 * Matcher: CHỈ match routes CẦN middleware để giảm Fast Origin Transfer.
 * - Private paths (admin) → auth check
 * - /tweets → domain blocking/routing
 * - Public pages (blogs, landing, etc.) → KHÔNG chạy middleware
 */
export const config = {
  matcher: [
    '/carts/:path*',
    '/categories/:path*',
    '/facebook-posts/:path*',
    '/orders/:path*',
    '/products/:path*',
    '/prompts/:path*',
    '/tiktok-accounts/:path*',
    '/tiktok-music/:path*',
    '/veo3-tokens/:path*',
    '/tweets/:path*',
    '/shopee-links/:path*',
    '/',
  ]
}
