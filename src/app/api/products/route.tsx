
import ProductModel from '@/models/Product'
import connectDb from '@/utils/connectDb'
import { LIMIT_PAGE_NUMBER } from '@/utils/constants'
import { NextRequest, NextResponse } from 'next/server'

connectDb()

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    // Convert querystring values to number
    const pageNum = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get('size')) || LIMIT_PAGE_NUMBER
    const name = searchParams.get('name') || ''
    // const isPublic = searchParams.get('isPublic') || false

    const totalDocs = await ProductModel.countDocuments()
    const totalPages = Math.ceil(totalDocs / pageSize)
    if (name) {
      const products = await ProductModel.find({
        name: { $regex: name, $options: 'i' }
      })
        .sort({ createdAt: -1 })
        .lean()
      return NextResponse.json({ products, totalPages, totalDocs }, { status: 200 })
    }
    if (pageNum === 1) {
      const products = await ProductModel.find({
        // isPublic
      })
        .limit(pageSize)
        .sort({ createdAt: -1 })
        .lean()
      return NextResponse.json({ products, totalPages, totalDocs }, { status: 200 })
    }
    const skip = pageSize * (pageNum - 1)
    const products = await ProductModel.find()
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({ products, totalPages, totalDocs, success: true }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({
      message: `Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`,
      success: false
    }, {
      status: 500,
    })
  }
}


