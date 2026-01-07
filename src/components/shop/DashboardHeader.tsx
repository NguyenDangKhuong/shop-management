import { UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Flex, Layout, MenuProps, theme } from 'antd'

import { logout } from '@/actions/auth'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

const { Header } = Layout

const DashboardHeader = ({ collapsed, setCollapsed }: any) => {
  const {
    token: { colorBgContainer: _colorBgContainer }
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
    <Header
      style={{
        padding: '0 24px',
        background: 'linear-gradient(135deg, #0a1929 0%, #001e3c 50%, #0d47a1 100%)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        height: '64px',
        lineHeight: 'normal',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Flex align='center' justify='space-between' style={{ width: '100%', height: '100%' }}>
        {/* Custom Animated Hamburger */}
        <button
          onClick={() => setCollapsed()}
          className="hamburger-menu"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            height: '48px',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '8px',
            transition: 'background 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{
            width: '24px',
            height: '2px',
            background: '#fff',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            transform: collapsed ? 'rotate(0deg)' : 'rotate(45deg) translateY(10px)'
          }} />
          <span style={{
            width: '24px',
            height: '2px',
            background: '#fff',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            opacity: collapsed ? 1 : 0
          }} />
          <span style={{
            width: '24px',
            height: '2px',
            background: '#fff',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            transform: collapsed ? 'rotate(0deg)' : 'rotate(-45deg) translateY(-10px)'
          }} />
        </button>
        <Flex align='center' gap={16}>
          <LanguageSwitcher />
          <Dropdown menu={{ items }}>
            <Avatar
              size={40}
              icon={<UserOutlined />}
              className="cursor-pointer hover:scale-110 transition-transform"
              style={{
                background: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
                border: '2px solid rgba(255,255,255,0.3)'
              }}
            />
          </Dropdown>
        </Flex>
      </Flex>
    </Header>
  )
}

export default DashboardHeader
