import CategoryModel from '@/models/Category'
import connectDb from '@/utils/connectDb'
import { NextResponse } from 'next/server'

export const dynamic = "force-dynamic"
export const GET = async () => {
  try {
    await connectDb()
    const categories = await CategoryModel.find().sort().lean()
    const totalDocs = await CategoryModel.countDocuments()
    console.log('categories api a', CategoryModel, categories)
    return NextResponse.json({ categories, totalDocs, success: true }, { status: 200 })
  } catch (err) {
    console.error('err ahihi', err)
    return NextResponse.json({
      message: `Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`,
      success: false
    }, {
      status: 500,
      statusText: String(err)
    })
  }
}