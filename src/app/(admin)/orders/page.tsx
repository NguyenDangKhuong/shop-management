import DashboardTitle from '@/components/dashboard/DashboardTitle'
import OrderTable from '@/components/dashboard/orders/OrderTable'
import { get } from '@/utils/api'

const OrderPage = async ({ searchParams }: any) => {
  const { date, isMonth } = await searchParams
  const { totalDocs, orders } = await get(
    `api/orders`,
    {
      date: date ?? new Date(),
      isMonth: isMonth ?? ''
    },
    ['orders']
  )
  return (
    <>
      <DashboardTitle
        pageName='Thống kê'
        totalDocs={totalDocs || 'Xin vui lòng chọn ngày hoặc tháng thống kê trước'}
      />
      <OrderTable totalDocs={totalDocs} orders={orders} />
    </>
  )
}

export default OrderPage
