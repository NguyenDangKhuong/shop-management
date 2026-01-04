import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  BarChartOutlined,
  BookOutlined,
  FacebookOutlined,
  ShoppingCartOutlined,
  TableOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'

const { Sider } = Layout

const DashboardSider = ({ collapsed }: any) => {
  const pathname = usePathname()
  return (
    <Sider trigger={null} collapsedWidth='0' breakpoint='lg' collapsible collapsed={collapsed}>
      <Link href='/'>
        <img className='bg-white mb-5 w-full h-[65px] m-auto' src='/image/logo.png' alt='logo' />
      </Link>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[pathname]}
        items={[
          {
            key: '/facebook-posts',
            icon: <FacebookOutlined />,
            label: <Link href='/facebook-posts'>Facebook Posts</Link>
          },
          {
            key: '/carts',
            icon: <ShoppingCartOutlined />,
            label: <Link href='/carts'>Thanh toán</Link>
          },
          {
            key: '/products',
            icon: <TableOutlined />,
            label: <Link href='/products'>Sản phẩm</Link>
          },
          {
            key: '/categories',
            icon: <BookOutlined />,
            label: <Link href='/categories'>Danh mục</Link>
          },
          {
            key: '/orders',
            icon: <BarChartOutlined />,
            label: <Link href='/orders'>Thống kê</Link>
          }
        ]}
      />
    </Sider>
  )
}

export default DashboardSider
