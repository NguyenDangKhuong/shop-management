import DashboardTitle from '@/components/dashboard/DashboardTitle'
import OrderTable from '@/components/dashboard/orders/OrderTable'
import { get } from '@/utils/api'

const OrderPage = async (props: any) => {
  const date = props?.searchParams?.date ?? new Date()
  const isMonth = props?.searchParams?.isMonth ?? ''
  const { totalDocs, orders } = await get(`api/orders`, {
    date,
    isMonth,
  }, ['orders'])
  return (
    <>
      <DashboardTitle pageName='Thống kê' totalDocs={totalDocs || 'Xin vui lòng chọn ngày hoặc tháng thống kê trước'} />
      <OrderTable
        totalDocs={totalDocs}
        orders={orders}
      />
    </>
  )
}

export default OrderPage
