import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  BarChartOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  TableOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'

const { Sider } = Layout

const DashboardSider = ({ collapsed }: any) => {
  const pathname = usePathname()
  return (
    <Sider trigger={null} collapsedWidth='0' breakpoint='lg' collapsible collapsed={collapsed}>
      <Link href='/admin'>
        <img className='bg-white mb-5 w-full h-[65px] m-auto' src='/image/logo.png' alt='logo' />
      </Link>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[pathname]}
        items={[
          {
            key: '/admin/carts',
            icon: <ShoppingCartOutlined />,
            label: <Link href='/admin/carts'>Thanh toán</Link>
          },
          {
            key: '/admin/products',
            icon: <TableOutlined />,
            label: <Link href='/admin/products'>Sản phẩm</Link>
          },
          {
            key: '/admin/categories',
            icon: <BookOutlined />,
            label: <Link href='/admin/categories'>Danh mục</Link>
          },
          {
            key: '/admin/orders',
            icon: <BarChartOutlined />,
            label: <Link href='/admin/orders'>Thống kê</Link>
          }
        ]}
      />
    </Sider>
  )
}

export default DashboardSider
