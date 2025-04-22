import { NextResponse } from 'next/server'

import CategoryModel from '@/models/Category'
import connectDb from '@/lib/connectDb'

export const GET = async () => {
  try {
    await connectDb()
    return NextResponse.json({ connected: true, success: true }, { status: 200 })
  } catch (err) {
    console.error('err ahihi', err)
    return NextResponse.json(
      {
        message: `Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`,
        success: false
      },
      {
        status: 500,
        statusText: String(err)
      }
    )
  }
}
