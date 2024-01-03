'use client'

import { useState } from 'react'

import { Layout, theme } from 'antd'

import DashboardFooter from './DashboardFooter'
import DashboardHeader from './DashboardHeader'
import DashboardSider from './DashboardSider'

const { Content } = Layout

const DashboardLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  return (
    <Layout>
      <DashboardSider collapsed={collapsed} />
      <Layout>
        <DashboardHeader
          collapsed={collapsed}
          setCollapsed={() => setCollapsed(!collapsed)}
        />
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
