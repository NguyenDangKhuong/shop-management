// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from './auth/auth' // Đảm bảo đường dẫn đúng đến file auth.ts của bạn

export async function middleware(req: NextRequest) {
  const session = await auth()

  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Kiểm tra quyền truy cập nếu cần
  if (req.nextUrl.pathname.startsWith('/admin') && session.user.role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'], // Chỉ áp dụng cho route /admin
}