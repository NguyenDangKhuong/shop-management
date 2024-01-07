import { NextRequest, NextResponse } from 'next/server'

import ProductModel from '@/models/Product'
import connectDb from '@/utils/connectDb'

connectDb()

export const GET = async (req: NextRequest, { params }: { params: { sku: string } }) => {
  try {
    await connectDb()
    const sku = params.sku
    const product = await ProductModel.findOne({ sku }).lean()
    if (!product) {
      return NextResponse.json(
        { message: 'Không tìm thấy sản phẩm', success: false, product: [] },
        { status: 404 }
      )
    }
    return NextResponse.json({ product, success: true }, { status: 200 })
  } catch (err) {
    console.error(err)
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
