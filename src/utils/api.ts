'use server'

import { revalidateTag } from 'next/cache'

import { BACKEND_HOST } from './constants'

export interface PostResponse {
  data?: any
  message: string
  status: number
}

export const get = async (
  url: string,
  params: Record<string, any> = {},
  tags?: string[],
  revalidate?: number
) => {
  try {
    const queryString = new URLSearchParams(params).toString()
    const fullUrl = `${BACKEND_HOST}/${url}?${queryString}`

    // Tạo cache key phân biệt bằng cách gộp url + query
    const cacheKey = [`${url}?${queryString}`, ...(tags || [])]
    const res = await fetch(fullUrl, {
      method: 'GET',
      cache: 'no-store'
      // next: { tags: cacheKey, revalidate }
    })

    // Mẹo thêm (nếu cần invalidate):
    // Sau này, khi gọi revalidate:
    // invalidate cache theo tag:
    // await revalidateTag('products?page=1&name=abc')
    // Hoặc bạn có thể dùng slugify(url + query) để ngắn gọn hơn nếu muốn.
    const data = await res.json()
    return {
      ...data,
      success: data.success,
      message: data.message,
      status: await res.status
    }
  } catch (err) {
    console.error(err)
  }
}

export const post = async (url: string, bodyParam?: object, revalidateName = '') => {
  try {
    const res = await fetch(`${BACKEND_HOST}/${url}`, {
      method: 'POST',
      body: JSON.stringify(bodyParam),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    revalidateName && revalidateTag(revalidateName)
    const data: any = await res.json()
    return {
      data,
      success: data.success,
      message: data.message,
      status: await res.status
    }
  } catch (err) {
    console.error(err)
  }
}

export const put = async (url: string, bodyParam?: object, revalidateName = '') => {
  try {
    const res = await fetch(`${BACKEND_HOST}/${url}`, {
      method: 'PUT',
      body: JSON.stringify(bodyParam),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    revalidateName && revalidateTag(revalidateName)
    const data: any = await res.json()
    return {
      data,
      success: data.success,
      message: data.message,
      status: await res.status
    }
  } catch (err) {
    console.error(err)
  }
}

export const remove = async (url: string, bodyParam?: object, revalidateName = '') => {
  try {
    const res = await fetch(`${BACKEND_HOST}/${url}`, {
      method: 'DELETE',
      body: JSON.stringify(bodyParam),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    revalidateName && revalidateTag(revalidateName)
    const data: any = await res.json()
    return {
      data,
      success: data.success,
      message: data.message,
      status: await res.status
    }
  } catch (err) {
    console.error(err)
  }
}
