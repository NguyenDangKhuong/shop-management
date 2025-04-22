// /middleware.ts
import { NextResponse } from "next/server"
import { auth } from "@/auth/auth" // Thực hiện auth
import { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const session = await auth()

  // Kiểm tra nếu người dùng vào trang admin và chưa đăng nhập hoặc không phải admin
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!session || session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  return NextResponse.next()
}

// Áp dụng middleware cho tất cả các route bắt đầu với '/admin'
export const config = {
  matcher: ["/admin/:path*"],
}
