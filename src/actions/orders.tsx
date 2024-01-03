'use server'

import { revalidateTag } from 'next/cache'

export const handleGetOrderAction = async (data: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/users`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  revalidateTag('list-users')
  return await res.json()
}