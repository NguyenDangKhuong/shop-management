import { NextResponse } from 'next/server'

import CategoryModel from '@/models/Category'
import { errorResponse } from '@/utils/apiResponse'
import connectDb from '@/utils/connectDb'
import { withCache } from '@/lib/cache'


export const GET = async () => {
  try {
    const data = await withCache('admin:categories', 300, async () => {
      await connectDb()
      const categories = await CategoryModel.find().sort().lean()
      const totalDocs = await CategoryModel.countDocuments()
      return { categories, totalDocs }
    })
    return NextResponse.json({ ...data, success: true }, { status: 200 })
  } catch (err) {
    console.error('errR', err)
    return errorResponse(err)
  }
}
