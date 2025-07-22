import DashboardTitle from '@/components/dashboard/DashboardTitle'
import DebugLog from '@/components/dashboard/DebugLog'
import ProductTable from '@/components/dashboard/products/ProductTable'
import { get } from '@/utils/api'
import { LIMIT_PAGE_NUMBER } from '@/utils/constants'

export const dynamic = 'force-dynamic'

const ProductPage = async ({ searchParams, params }: any) => {
  const { page, size, name, isPublic } = await searchParams
  //fetch product data following search param
  const { totalDocs, products } = await get(
    `api/products`,
    {
      page: Number(page) ?? 1,
      size: Number(size) ?? LIMIT_PAGE_NUMBER,
      name: name ?? '',
      isPublic: isPublic ?? false
    },
    ['products']
  )
  const { categories } = await get(`api/categories`, {}, ['categories'])
  return (
    <>
      <DashboardTitle pageName='sản phẩm' totalDocs={totalDocs} />
      <ProductTable totalDocs={totalDocs} products={products} categories={categories} />
      <DebugLog products={products} categories={categories} />
    </>
  )
}

export default ProductPage

// export async function generateStaticParams() {
//   const { totalDocs, products } = await get(
//     `api/products`,
//     {
//       page: 1,
//       size: LIMIT_PAGE_NUMBER,
//       name: '',
//       isPublic: false
//     },
//     ['products']
//   )
//   return { ...products, ...totalDocs }
// }
