import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Flex, Layout, MenuProps, theme } from 'antd'

import { logout } from '@/actions/auth'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

const { Header } = Layout

const DashboardHeader = ({ collapsed, setCollapsed }: any) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

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
            await logout()
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
        <Flex align='center' gap={16} className="mr-4">
          <LanguageSwitcher />
          <Dropdown menu={{ items }}>
            <Avatar size={40} icon={<UserOutlined />} className="cursor-pointer" />
          </Dropdown>
        </Flex>
      </Flex>
    </Header>
  )
}

export default DashboardHeader
