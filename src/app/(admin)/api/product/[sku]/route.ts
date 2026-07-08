import { NextRequest, NextResponse } from 'next/server'

import ProductModel from '@/models/Product'
import { errorResponse } from '@/utils/apiResponse'
import connectDb from '@/utils/connectDb'
import { withCache } from '@/lib/cache'

export const GET = async (req: NextRequest, { params }: { params: Promise<{ sku: string }> }) => {
  try {
    const { sku } = await params
    const data = await withCache(`product:sku:${sku}`, 120, async () => {
      await connectDb()
      return await ProductModel.findOne({ sku }).lean()
    })
    if (!data) {
      return errorResponse('Không tìm thấy sản phẩm', 404)
    }
    return NextResponse.json({ product: data, success: true }, { status: 200 })
  } catch (err) {
    console.error(err)
    return errorResponse(err)
  }
}
