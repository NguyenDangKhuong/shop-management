import OrderModel from '@/models/Order'
import connectDb from '@/utils/connectDb'
import { endOfDay, endOfMonth, startOfDay, startOfMonth, subHours } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'

connectDb()

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const date = searchParams.get('date')
    const isMonth = Boolean(searchParams.get('isMonth')) ?? false
    const orders = isMonth
      ? await OrderModel.find({
        createdAt: {
          $gte: startOfMonth(new Date(String(date))),
          $lte: endOfMonth(new Date(String(date)))
        }
      }).lean()
      : await OrderModel.find({
        createdAt: {
          $gte: startOfDay(subHours(new Date(String(date)), 7)),
          $lte: endOfDay(subHours(new Date(String(date)), 7))
        }
      }).lean()
    return NextResponse.json({ orders, success: true }, { status: 200 })
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