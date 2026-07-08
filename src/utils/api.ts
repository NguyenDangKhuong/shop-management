'use server'

import { revalidateTag } from 'next/cache'

import { BACKEND_HOST } from './constants'

export interface ApiResponse {
  data?: Record<string, unknown>
  message: string
  status: number
  success: boolean
  [key: string]: any
}

export const get = async (
  url: string,
  params: Record<string, string | number | boolean> = {},
  tags?: string[],
  revalidate?: number
): Promise<ApiResponse> => {
  const queryString = new URLSearchParams(
    Object.entries(params).reduce((acc, [k, v]) => ({ ...acc, [k]: String(v) }), {} as Record<string, string>)
  ).toString()
  const fullUrl = `${BACKEND_HOST}/${url}?${queryString}`

  const cacheKey = [`${url}?${queryString}`, ...(tags || [])]
  const res = await fetch(fullUrl, {
    method: 'GET',
    next: revalidate === 0 ? { revalidate: 0 } : { tags: cacheKey, revalidate },
    cache: revalidate === 0 ? 'no-store' : undefined
  })

  const data = await res.json()
  return {
    ...data,
    success: data.success,
    message: data.message,
    status: res.status
  }
}

export const post = async (url: string, bodyParam?: object, revalidateName = ''): Promise<ApiResponse> => {
  const res = await fetch(`${BACKEND_HOST}/${url}`, {
    method: 'POST',
    body: JSON.stringify(bodyParam),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  revalidateName && revalidateTag(revalidateName)
  const data = await res.json()
  return {
    data,
    success: data.success,
    message: data.message,
    status: res.status
  }
}

export const put = async (url: string, bodyParam?: object, revalidateName = ''): Promise<ApiResponse> => {
  const res = await fetch(`${BACKEND_HOST}/${url}`, {
    method: 'PUT',
    body: JSON.stringify(bodyParam),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  revalidateName && revalidateTag(revalidateName)
  const data = await res.json()
  return {
    data,
    success: data.success,
    message: data.message,
    status: res.status
  }
}

export const remove = async (url: string, bodyParam?: object, revalidateName = ''): Promise<ApiResponse> => {
  const res = await fetch(`${BACKEND_HOST}/${url}`, {
    method: 'DELETE',
    body: JSON.stringify(bodyParam),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  revalidateName && revalidateTag(revalidateName)
  const data = await res.json()
  return {
    data,
    success: data.success,
    message: data.message,
    status: res.status
  }
}
