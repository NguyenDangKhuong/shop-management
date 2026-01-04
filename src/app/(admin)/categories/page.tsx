import DashboardTitle from '@/components/shop/DashboardTitle'
import CategoryTable from '@/components/shop/categories/CategoryTable'
import { get } from '@/utils/api'
import { LIMIT_PAGE_NUMBER } from '@/utils/constants'

export const revalidate = 60 // Revalidate every 60 seconds

const CategoryPage = async ({ searchParams }: any) => {
  const { page } = await searchParams
  const { totalDocs, categories } = await get(
    `api/categories`,
    {
      page: Number(page) ?? 1,
      size: LIMIT_PAGE_NUMBER
    },
    ['categories']
  )
  return (
    <>
      <DashboardTitle pageName='danh mục' totalDocs={totalDocs} />
      <CategoryTable totalDocs={totalDocs} categories={categories} />
    </>
  )
}

export default CategoryPage
