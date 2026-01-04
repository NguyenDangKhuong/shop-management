'use client'

import { useState } from 'react'

import { Drawer, Layout, theme } from 'antd'
import { isMobile } from 'react-device-detect'

import DashboardFooter from './DashboardFooter'
import DashboardHeader from './DashboardHeader'
import DashboardSider from './DashboardSider'

const { Content } = Layout

const DashboardLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(isMobile)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout className='h-full' style={{ minHeight: '100vh' }}>
      {/* Desktop Sidebar - Always visible */}
      {!isMobile && <DashboardSider collapsed={collapsed} />}

      {/* Mobile Drawer - Overlay on top */}
      {isMobile && (
        <Drawer
          placement='left'
          onClose={() => setCollapsed(true)}
          open={!collapsed}
          closable={false}
          width={200}
          styles={{ body: { padding: 0, background: '#001529' } }}
        >
          <DashboardSider collapsed={false} onItemClick={() => setCollapsed(true)} />
        </Drawer>
      )}

      <Layout>
        <DashboardHeader collapsed={collapsed} setCollapsed={() => setCollapsed(!collapsed)} />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
          }}>
          {children}
        </Content>
        <DashboardFooter />
      </Layout>
    </Layout>
  )
}

export default DashboardLayout
