import CategoryModel, { Category } from "@/models/Category"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { name } = body
    if (!name) {
      return NextResponse.json({ message: 'Danh mục thiếu tên', success: false }, {
        status: 422,
      })
    }

    const existedName = await CategoryModel.findOne({ name }).lean()
    if (existedName) {
      return NextResponse.json({
        message: `Đã có danh mục tên này rồi, vui lòng đặt tên khác`,
        success: false
      }, {
        status: 422,
      })
    }

    const category: Category = await new CategoryModel({
      ...body
    }).save()
    return NextResponse.json({
      category,
      message: 'Danh mục đã được thêm!',
      success: true
    }, {
      status: 201,
    })
  } catch (err) {
    return NextResponse.json({
      message: `Xin vui lòng thử lại hoặc báo Khương lỗi là ${err}`,
      success: false
    }, {
      status: 500,
    })
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { _id, name } = body
    if (!name) {
      return NextResponse.json({
        message: 'Danh mục thiếu tên',
        success: false
      }, {
        status: 422,
      })
    }
    await CategoryModel.findByIdAndUpdate(_id, { ...body }, { new: true, runValidators: true })
    return NextResponse.json({
      message: `Danh mục đã được cập nhật!`,
      success: true
    }, {
      status: 200,
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

export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json()
    const { _id } = body
    if (!_id) return NextResponse.json({
      message: `Không có _id của danh mục được chọn`,
      success: false
    }, {
      status: 422,
    })
    const deletedCategory: Category | null =
      await CategoryModel.findOneAndDelete({
        _id
      }).lean()
    return NextResponse.json({
      message: `Danh mục đã được xóa`,
      success: true
    }, {
      status: 200,
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