import DashboardTitle from '@/components/dashboard/DashboardTitle'
import ProductTable from '@/components/dashboard/products/ProductTable'
import { get } from '@/utils/api'
import { LIMIT_PAGE_NUMBER } from '@/utils/constants'

const ProductPage = async ({ searchParams, params }: any) => {
  //fetch product data following search param
  const { totalDocs, products } = await get(
    `api/products`,
    {
      page: searchParams?.page ?? 1,
      size: searchParams?.size ?? LIMIT_PAGE_NUMBER,
      name: searchParams?.name ?? '',
      isPublic: searchParams?.isPublic ?? false
    },
    ['products']
  )
  console.log('params', params)
  const { categories } = await get(`api/categories`)
  return (
    <>
      <DashboardTitle pageName='sản phẩm' totalDocs={totalDocs} />
      <ProductTable totalDocs={totalDocs} products={products} categories={categories} />
    </>
  )
}

export default ProductPage

export async function generateStaticParams() {
  const { totalDocs, products } = await get(
    `api/products`,
    {
      page: 1,
      size: LIMIT_PAGE_NUMBER,
      name: '',
      isPublic: false
    },
    ['products']
  )
  console.log('products', products)
  return { ...products, ...totalDocs }
}