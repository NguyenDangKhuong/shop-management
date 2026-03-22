import { NextRequest, NextResponse } from 'next/server'

import { endOfDay, endOfMonth, startOfDay, startOfMonth, subHours } from 'date-fns'

import OrderModel from '@/models/Order'
import connectDb from '@/utils/connectDb'
import { errorResponse } from '@/utils/apiResponse'
import { withCache } from '@/lib/cache'

export const dynamic = 'force-dynamic'

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const date = searchParams.get('date')
    const isMonth = Boolean(searchParams.get('isMonth')) ?? false
    const cacheKey = `admin:orders:${date}:${isMonth}`

    const data = await withCache(cacheKey, 60, async () => {
      await connectDb()
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
      return { orders }
    })

    return NextResponse.json({ ...data, success: true }, { status: 200 })
  } catch (err) {
    console.error(err)
    return errorResponse(err)
  }
}
