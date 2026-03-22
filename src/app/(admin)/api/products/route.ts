import { NextRequest, NextResponse } from 'next/server'

import ProductModel from '@/models/Product'
import connectDb from '@/utils/connectDb'
import { LIMIT_PAGE_NUMBER } from '@/utils/constants'
import { errorResponse } from '@/utils/apiResponse'
import { withCache } from '@/lib/cache'


export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams
    const pageNum = Number(searchParams.get('page')) || 1
    const pageSize = Number(searchParams.get('size')) || LIMIT_PAGE_NUMBER
    const name = searchParams.get('name') || ''
    const isPublic = searchParams.get('isPublic') === 'true'

    const cacheKey = `admin:products:p${pageNum}:s${pageSize}:n${name}:pub${isPublic}`

    const data = await withCache(cacheKey, 60, async () => {
      await connectDb()
      const totalDocs = await ProductModel.countDocuments()
      const totalPages = Math.ceil(totalDocs / pageSize)

      if (name) {
        const safeName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const products = await ProductModel.find({
          name: { $regex: safeName, $options: 'i' }
        }).sort({ createdAt: 1 }).lean()
        const totalDocsSearched = products.length
        return {
          products,
          totalPages: Math.ceil(totalDocsSearched / pageSize),
          totalDocs: totalDocsSearched
        }
      }

      if (isPublic) {
        const products = await ProductModel.find({ isPublic })
          .limit(pageSize).sort({ createdAt: 1 }).lean()
        const totalDocsSearched = products.length
        return {
          products,
          totalPages: Math.ceil(totalDocsSearched / pageSize),
          totalDocs: totalDocsSearched
        }
      }

      if (pageNum === 1) {
        const products = await ProductModel.find({}).limit(pageSize).sort({ createdAt: 1 }).lean()
        return { products, totalPages, totalDocs }
      }

      const skip = pageSize * (pageNum - 1)
      const products = await ProductModel.find({})
        .skip(skip).limit(pageSize).sort({ createdAt: 1 }).lean()
      return { products, totalPages, totalDocs, success: true }
    })

    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    console.error(err)
    return errorResponse(err)
  }
}
