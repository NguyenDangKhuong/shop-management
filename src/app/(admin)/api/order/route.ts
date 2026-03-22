import { NextRequest, NextResponse } from 'next/server'

import OrderModel from '@/models/Order'
import ProductModel from '@/models/Product'
import connectDb from '@/utils/connectDb'
import removeImage from '@/utils/removeImage'
import { errorResponse } from '@/utils/apiResponse'
import { getRedis } from '@/lib/redis'

export const POST = async (req: NextRequest) => {
  try {
    await connectDb()
    const body = await req.json()
    const { products } = body
    if (products.length === 0) {
      return NextResponse.json(
        {
          message: 'Không có sản phẩm',
          success: false
        },
        {
          status: 422
        }
      )
    }

    await Promise.all(
      products.map(async (item: any) => {
        if (item.product.storage - item.quantity === 0) {
          const deletedProduct: any = await ProductModel.findByIdAndDelete(item.product._id)
          deletedProduct && removeImage(String(deletedProduct?.imagePublicId))
        } else {
          const minusQuantityProduct = {
            ...item.product,
            storage: item.product.storage - item.quantity
          }
          const _newProduct = await ProductModel.findByIdAndUpdate(item.product._id, {
            ...minusQuantityProduct
          })
        }
      })
    )
    await new OrderModel({ ...body }).save()
    // Invalidate orders + products cache (stock changed)
    try {
      const redis = getRedis()
      const oKeys = await redis.keys('admin:orders:*')
      const pKeys = await redis.keys('admin:products:*')
      const allKeys = [...oKeys, ...pKeys]
      if (allKeys.length > 0) await redis.del(...allKeys)
    } catch { /* fail-open */ }
    return NextResponse.json(
      {
        message: 'Đã thêm đơn vào hệ thống!',
        success: true
      },
      {
        status: 201
      }
    )
  } catch (err) {
    console.error(err)
    return errorResponse(err)
  }
}
