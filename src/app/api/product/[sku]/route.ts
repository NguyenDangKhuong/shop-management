import { NextRequest, NextResponse } from 'next/server'

import ProductModel from '@/models/Product'
import { errorResponse } from '@/utils/apiResponse'
import connectDb from '@/utils/connectDb'

connectDb()

export const GET = async (req: NextRequest, { params }: { params: Promise<{ sku: string }> }) => {
  try {
    await connectDb()
    const { sku } = await params
    const product = await ProductModel.findOne({ sku }).lean()
    if (!product) {
      return errorResponse('Không tìm thấy sản phẩm', 404)
    }
    return NextResponse.json({ product, success: true }, { status: 200 })
  } catch (err) {
    console.error(err)
    return errorResponse(err)
  }
}
