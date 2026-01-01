import { Suspense } from 'react'
import ProductTableSkeleton from '@/components/shop/products/ProductTableSkeleton'
import ProductDataLoader from '@/components/shop/products/ProductDataLoader'

export const dynamic = 'force-dynamic'

const ProductPage = async ({ searchParams }: any) => {
  return (
    <>
      {/* Streamed content with title - shows skeleton while loading */}
      <Suspense fallback={<ProductTableSkeleton />}>
        <ProductDataLoader searchParams={searchParams} />
      </Suspense>
    </>
  )
}

export default ProductPage
