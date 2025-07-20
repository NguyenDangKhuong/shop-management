import { NextResponse } from 'next/server'

import { ApiResponse } from '@/types/api'

export function successResponse<T>(
  message: string = 'Request was successful',
  status: number = 200,
  data: T = {} as T
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data
    },
    {
      status
    }
  )
}
export function errorResponse(error: unknown, status: number = 500): NextResponse<ApiResponse> {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
      ? error
      : `Lỗi không xác định, Xin vui lòng thử lại hoặc báo Khương lỗi là ${error}`

  return NextResponse.json(
    {
      success: false,
      message,
      error: `Xin vui lòng thử lại hoặc báo Khương lỗi là ${error}`
    },
    {
      status
    }
  )
}
