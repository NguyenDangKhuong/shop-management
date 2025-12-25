import { NextResponse } from 'next/server'

import connectDb from '@/utils/connectDb'
import { errorResponse } from '@/utils/apiResponse'

export const GET = async () => {
  try {
    await connectDb()
    return NextResponse.json({ connected: true, success: true }, { status: 200 })
  } catch (err) {
    console.error('err ahihi', err)
    return errorResponse(err)
  }
}
