import { NextResponse } from 'next/server'

import CategoryModel from '@/models/Category'
import connectDb from '@/utils/connectDb'
import { errorResponse } from '@/utils/apiResponse'

export const GET = async () => {
  try {
    await connectDb()
    const categories = await CategoryModel.find().sort().lean()
    const totalDocs = await CategoryModel.countDocuments()
    return NextResponse.json({ categories, totalDocs, success: true }, { status: 200 })
  } catch (err) {
    console.error('err', err)
    return errorResponse(err)
  }
}
