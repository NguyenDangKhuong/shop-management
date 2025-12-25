import { NextRequest } from 'next/server'

import ProductModel, { Product } from '@/models/Product'
import { errorResponse, successResponse } from '@/utils/apiResponse'
import connectDb from '@/utils/connectDb'
import removeImage from '@/utils/removeImage'

export const POST = async (req: NextRequest) => {
  try {
    await connectDb()
    const body = await req.json()
    const { name, price, storage } = body
    if (!name || !price || !storage) {
      return errorResponse('Không thấy giá, tên và số lượng, vui lòng thêm đủ', 422)
    }

    if (price < 1000) {
      return errorResponse('Giá sản phẩm không thể dưới 1000', 422)
    }

    if (storage < 1) {
      return errorResponse('Số lượng sản phẩm không thể dưới 1', 422)
    }

    const existedName = await ProductModel.findOne({ name }).lean()
    if (existedName) {
      return errorResponse('Đã có sản phẩm tên này rồi, vui lòng đặt tên khác', 422)
    }

    const product: Product = await new ProductModel({ ...body }).save()
    return successResponse('Sản phẩm đã được thêm!', 201, product)
  } catch (err) {
    console.error(err)
    return errorResponse(err)
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    await connectDb()
    const body = await req.json()
    const { _id, name, price, storage, imagePublicId } = body
    if (!name || !price || !storage) {
      return errorResponse('Sản phẩm thiếu một hay nhiều mục', 422)
    }

    if (price < 1000) {
      return errorResponse('Giá sản phẩm không thể dưới 1000', 422)
    }

    await ProductModel.findByIdAndUpdate(_id, { ...body }, { new: true })

    //remove unessesary image
    const currentProduct: Product | null = await ProductModel.findById({ _id })
    const currentImagePublicId = currentProduct?.imagePublicId
    currentImagePublicId !== imagePublicId && removeImage(String(currentImagePublicId))

    return successResponse(`Sản phẩm đã được cập nhật!`)
  } catch (err) {
    console.error(err)
    return errorResponse(err)
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    await connectDb()
    const body = await req.json()
    const { _id } = body
    if (!_id) return
    const deletedProduct = await ProductModel.findOneAndDelete({
      _id
    })
    deletedProduct && removeImage(String(deletedProduct?.imagePublicId))

    return successResponse(`Sản phẩm đã được xóa`)
  } catch (err) {
    console.error(err)
    return errorResponse(err)
  }
}
