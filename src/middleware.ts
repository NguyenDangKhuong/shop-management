import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
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
 * Các path public không cần auth (dùng startsWith để check).
 */
const PUBLIC_PATHS = ['/login', '/register', '/blogs', '/tweets', '/shopee-links', '/image', '/cv', '/privacy', '/terms', '/projects']

/**
 * Middleware xử lý 3 việc:
 * 1. Domain trong TWEETS_ONLY_DOMAINS → chỉ cho vào /tweets, còn lại rewrite /not-found
 * 2. Chặn /tweets cho domain trong BLOCKED_DOMAINS_FOR_TWEETS
 * 3. Xác thực auth cho các route còn lại (trừ PUBLIC_PATHS)
 */
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')?.split(':')[0] || ''
  const pathname = request.nextUrl.pathname

  // 1. Domain chỉ cho phép /tweets — chặn tất cả page khác
  if (TWEETS_ONLY_DOMAINS.includes(hostname)) {
    if (!pathname.startsWith('/tweets')) {
      return NextResponse.rewrite(new URL('/not-found', request.url))
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

  // 3. Public paths — không cần auth
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p)) || pathname === '/') {
    return NextResponse.next()
  }

  // 4. Các route còn lại — chạy auth
  return (auth as any)(request)
}

/**
 * Matcher: match TẤT CẢ routes trừ static assets.
 * Logic phân quyền (auth vs public vs domain blocking) xử lý trong middleware code.
 */
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}

