import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, DownOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Flex, Layout, MenuProps, Space, theme } from 'antd'
import { useRef } from 'react'

// import { signOut } from '@/auth/auth'

const { Header } = Layout

const DashboardHeader = ({ collapsed, setCollapsed }: any) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const dropdownRef = useRef(null)

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
          Profile
        </a>
      )
    },
    {
      key: 'signOut',
      danger: true,
      label: (
        <span
          onClick={async () => {
            // await signOut()
          }}>
          Sign out
        </span>
      )
    }
  ]

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Flex align='center' justify='space-between'>
        <Button
          type='text'
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed()}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64
          }}
        />
        <Dropdown menu={{ items }}>
          <span className='mr-4'>
            <Avatar size={40} icon={<UserOutlined />} />
          </span>
        </Dropdown>
      </Flex>
    </Header>
  )
}

export default DashboardHeader
