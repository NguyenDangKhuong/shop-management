import OrderModel from '@/models/Order'
import ProductModel from '@/models/Product'
import connectDb from '@/utils/connectDb'
import removeImage from '@/utils/removeImage'
import { NextRequest, NextResponse } from 'next/server'

connectDb()

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { products } = body
    if (products.length === 0) {
      return NextResponse.json({
        message: 'Không có sản phẩm',
        success: false
      }, {
        status: 422,
      })
    }

    await Promise.all(
      products.map(async (item: any) => {
        if (item.product.storage - item.quantity === 0) {
          const deletedProduct = await ProductModel.findByIdAndDelete(item.product._id)
          console.log('deletedProduct', deletedProduct)
          deletedProduct && removeImage(String(deletedProduct?.imagePublicId))
        } else {
          console.log('item', item)
          const minusQuantityProduct = {
            ...item.product,
            storage: item.product.storage - item.quantity
          }
          const newProduct = await ProductModel.findByIdAndUpdate(item.product._id, {
            ...minusQuantityProduct
          })
          console.log('minusQuantityProduct', newProduct)
        }
      })
    )
    await new OrderModel({ ...body }).save()
    return NextResponse.json({
      message: 'Đã thêm đơn vào hệ thống!',
      success: true
    }, {
      status: 201,
    })
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