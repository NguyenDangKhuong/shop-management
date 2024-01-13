import DashboardTitle from '@/components/dashboard/DashboardTitle'
import ProductTable from '@/components/dashboard/products/ProductTable'
import { get } from '@/utils/api'
import { LIMIT_PAGE_NUMBER } from '@/utils/constants'

const ProductPage = async (props: any) => {
  //fetch product data following search param
  const { totalDocs, products } = await get(
    `api/products`,
    {
      page: props?.searchParams?.page ?? 1,
      size: props?.searchParams?.size ?? LIMIT_PAGE_NUMBER,
      name: props?.searchParams?.name ?? '',
      isPublic: props?.searchParams?.isPublic ?? false
    },
    ['products']
  )
  const { categories } = await get(`api/categories`)
  return (
    <>
      <DashboardTitle pageName='sản phẩm' totalDocs={totalDocs} />
      <ProductTable totalDocs={totalDocs} products={products} categories={categories} />
    </>
  )
}

export default ProductPage
