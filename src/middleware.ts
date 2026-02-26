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

  // /tweets không cần auth — cho qua luôn sau khi check domain
  if (request.nextUrl.pathname.startsWith('/tweets')) {
    return NextResponse.next()
  }

  // Chạy auth middleware cho các route cần bảo vệ
  return (auth as any)(request)
}

/**
 * Matcher config — 2 patterns hoạt động cùng nhau:
 *
 * Pattern 1: Match TẤT CẢ routes NGOẠI TRỪ danh sách public (api, _next, login, blogs, tweets, shopee-links, ...)
 *   → Các route match pattern này sẽ chạy auth middleware (bắt đăng nhập)
 *   → tweets & shopee-links được exclude nên KHÔNG bị auth
 *
 * Pattern 2: Match riêng /tweets/*
 *   → Vì Pattern 1 đã exclude tweets, middleware sẽ không chạy cho /tweets
 *   → Pattern 2 "kéo" /tweets trở lại middleware CHỈ ĐỂ check domain blocking
 *   → Trong middleware code: nếu domain OK → NextResponse.next() (bỏ qua auth)
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|register|image|blogs|tweets|shopee-links).*)', '/(tweets.*)']
}
