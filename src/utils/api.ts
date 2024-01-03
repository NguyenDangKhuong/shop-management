'use server'
import { revalidateTag } from 'next/cache'
import { BACKEND_HOST } from './constants'

export interface PostResponse {
  data?: any,
  message: string,
  status: number
}

export const get = async (url: string, params?: object, tags?: string[], revalidate?: number) => {
  try {
    const res = await fetch(
      `${BACKEND_HOST}/${url}?${new URLSearchParams({
        ...params
      })}`,
      {
        method: 'GET',
        next: { tags, revalidate }
      }
    )
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}

export const post = async (url: string, bodyParam?: object, revalidateName = '') => {
  try {
    const res = await fetch(
      `${BACKEND_HOST}/${url}`,
      {
        method: 'POST',
        body: JSON.stringify(bodyParam),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
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
    const res = await fetch(
      `${BACKEND_HOST}/${url}`,
      {
        method: 'PUT',
        body: JSON.stringify(bodyParam),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
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
    const res = await fetch(
      `${BACKEND_HOST}/${url}`,
      {
        method: 'DELETE',
        body: JSON.stringify(bodyParam),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
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
