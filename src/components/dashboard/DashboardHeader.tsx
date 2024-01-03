import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, theme } from 'antd'

const { Header } = Layout

const DashboardHeader = ({ collapsed, setCollapsed }: any) => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
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
    </Header>
  )
}

export default DashboardHeader
