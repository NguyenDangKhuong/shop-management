import ProductModel, { Product } from '@/models/Product'
import connectDb from '@/utils/connectDb'
import removeImage from '@/utils/removeImage'
import { NextRequest, NextResponse } from 'next/server'

connectDb()

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { name, price, storage } = body
    if (!name || !price || !storage) {
      return NextResponse.json({ message: 'Giá sản phẩm không thể dưới 1000', success: false }, {
        status: 422,
      })
    }

    if (price < 1000) {
      return NextResponse.json({ message: 'Giá sản phẩm không thể dưới 1000', success: false }, {
        status: 422,
      })
    }

    if (storage < 1) {
      return NextResponse.json({ message: 'Số lượng sản phẩm không thể dưới 1', success: false }, {
        status: 422,
      })
    }

    const existedName = await ProductModel.findOne({ name }).lean()
    if (existedName) {
      return NextResponse.json({ message: 'Đã có sản phẩm tên này rồi, vui lòng đặt tên khác', success: false }, {
        status: 422,
      })
    }

    const product: Product = await new ProductModel({ ...body }).save()
    return NextResponse.json({ message: 'Sản phẩm đã được thêm!', success: true }, {
      status: 201,
    })
  } catch (err) {
    return NextResponse.json({ message: `Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`, success: false }, {
      status: 500,
    })
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { _id, name, price, storage, imagePublicId } = body
    if (!name || !price || !storage) {
      return NextResponse.json({ message: 'Sản phẩm thiếu một hay nhiều mục', success: false }, {
        status: 422,
      })
    }

    if (price < 1000) {
      return NextResponse.json({ message: 'Giá sản phẩm không thể dưới 1000', success: false }, {
        status: 422,
      })
    }

    await ProductModel.findByIdAndUpdate(_id, { ...body }, { new: true })

    //remove unessesary image
    const currentProduct: Product | null = await ProductModel.findById({ _id })
    const currentImagePublicId = currentProduct?.imagePublicId
    currentImagePublicId !== imagePublicId &&
      removeImage(String(currentImagePublicId))

    return NextResponse.json({ message: `Sản phẩm đã được cập nhật!`, success: true }, {
      status: 200,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: `Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`, success: false }, {
      status: 500,
    })
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { _id } = body
    if (!_id) return
    const deletedProduct: Product | null = await ProductModel.findOneAndDelete({
      _id
    }).lean()
    deletedProduct && removeImage(String(deletedProduct?.imagePublicId))

    return NextResponse.json({ message: `Sản phẩm đã được xóa`, success: true }, {
      status: 200,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: `Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`, success: false }, {
      status: 500,
    })
  }
}