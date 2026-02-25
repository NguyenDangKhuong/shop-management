import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '../auth.edge'

/**
 * Danh sách domain bị chặn không cho truy cập page /tweets.
 * Thêm domain vào mảng này để chặn thêm.
 */
const BLOCKED_DOMAINS_FOR_TWEETS = ['shop.thetaphoa.store']

/**
 * Middleware xử lý 2 việc:
 * 1. Chặn truy cập /tweets cho các domain trong BLOCKED_DOMAINS_FOR_TWEETS (rewrite sang /not-found)
 * 2. Xác thực auth cho các route được bảo vệ
 */
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')?.split(':')[0] || ''

  // Chặn /tweets page cho các domain cụ thể
  if (
    request.nextUrl.pathname.startsWith('/tweets') &&
    BLOCKED_DOMAINS_FOR_TWEETS.includes(hostname)
  ) {
    return NextResponse.rewrite(new URL('/not-found', request.url))
  }

  // Chạy auth middleware cho các route cần bảo vệ
  return (auth as any)(request)
}

/**
 * Matcher config:
 * - Pattern 1: Tất cả route TRỪ api, _next, favicon, login, register, image, blogs, tweets → cần auth
 * - Pattern 2: /tweets → cần chạy middleware để check domain blocking
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|register|image|blogs|tweets).*)', '/(tweets.*)']
}
