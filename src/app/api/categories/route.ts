import { NextResponse } from 'next/server'

import CategoryModel from '@/models/Category'
import connectDb from '@/utils/connectDb'

export const GET = async () => {
  try {
    await connectDb()
    const categories = await CategoryModel.find().sort().lean()
    const totalDocs = await CategoryModel.countDocuments()
    return NextResponse.json({ categories, totalDocs, success: true }, { status: 200 })
  } catch (err) {
    console.error('err', err)
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
