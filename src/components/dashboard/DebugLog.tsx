'use client'

import { useEffect } from 'react'

export default function DebugLog({ products, categories }: any) {
  useEffect(() => {
    console.log('products:', products)
    console.log('categories:', categories)
  }, [products, categories])
  return null
}
