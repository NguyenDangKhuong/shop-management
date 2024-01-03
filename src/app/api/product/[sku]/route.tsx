import ProductModel from '@/models/Product'
import connectDb from '@/utils/connectDb'
import { NextRequest, NextResponse } from 'next/server'

connectDb()

export const GET = async (req: NextRequest, { params }: { params: { sku: string } }) => {
  try {
    const sku = params.sku
    const product = await ProductModel.findOne({ sku }).lean()
    return NextResponse.json({ product, success: true }, { status: 200 })
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