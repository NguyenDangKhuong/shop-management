import DashboardTitle from '@/components/dashboard/DashboardTitle'
import { get } from '@/utils/api'
import { LIMIT_PAGE_NUMBER } from '@/utils/constants'

const LoginPage = async (props: any) => {
//   const page = props?.searchParams?.page ?? 1
//   const { totalDocs, categories } = await get(`api/categories`, {
//     page,
//     size: LIMIT_PAGE_NUMBER,
//   }, ['categories'])
  return (
    <>
      {/* <DashboardTitle pageName='danh mục' totalDocs={totalDocs} /> */}
    </>
  )
}

export default LoginPage
