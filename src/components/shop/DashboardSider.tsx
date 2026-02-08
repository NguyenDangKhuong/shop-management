'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
    BarChartOutlined,
    BookOutlined,
    FacebookOutlined,
    KeyOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    SoundOutlined,
    TableOutlined,
    TikTokOutlined,
    UserOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'

const { Sider } = Layout

interface TikTokAccount {
  _id: string
  username: string
  displayName: string
  avatar?: {
    url: string
  }
}

const DashboardSider = ({ collapsed, onItemClick }: any) => {
  const pathname = usePathname()
  const [accounts, setAccounts] = useState<TikTokAccount[]>([])

  useEffect(() => {
    // Fetch TikTok accounts
    fetch('/api/tiktok-accounts')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAccounts(data.data)
        }
      })
      .catch(err => console.error('Failed to load TikTok accounts:', err))
  }, [])

  // Build TikTok Accounts submenu
  const tiktokAccountsChildren = accounts.map(account => ({
    key: `/tiktok-accounts/@${account.username}`,
    icon: account.avatar?.url ? (
      <img
        src={account.avatar.url}
        alt={account.displayName}
        className="w-5 h-5 rounded-full object-cover"
      />
    ) : (
      <UserOutlined />
    ),
    label: <Link href={`/tiktok-accounts/@${account.username}`}>{account.displayName}</Link>
  }))

  return (
    <Sider trigger={null} collapsedWidth='0' breakpoint='lg' collapsible collapsed={collapsed}>
      <Link href='/'>
        <img className='bg-white mb-5 w-full h-[65px] m-auto' src='/image/logo.png' alt='logo' />
      </Link>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[pathname]}
        onClick={onItemClick}
        items={[
          {
            key: '/tiktok-accounts',
            icon: <TikTokOutlined />,
            label: <Link href='/tiktok-accounts'>TikTok Accounts</Link>,
            children: tiktokAccountsChildren.length > 0 ? tiktokAccountsChildren : undefined
          },
          {
            key: '/shopee-links',
            icon: <ShoppingOutlined />,
            label: <Link href='/shopee-links'>Shopee Links</Link>
          },
          {
            key: '/facebook-posts',
            icon: <FacebookOutlined />,
            label: <Link href='/facebook-posts'>Facebook Posts</Link>
          },
          {
            key: '/veo3-tokens',
            icon: <KeyOutlined />,
            label: <Link href='/veo3-tokens'>Veo3 Tokens</Link>
          },
          {
            key: '/tiktok-music',
            icon: <SoundOutlined />,
            label: <Link href='/tiktok-music'>TikTok Music</Link>
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
