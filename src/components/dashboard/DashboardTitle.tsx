'use client'

import { Typography, Flex, Divider } from 'antd'

const { Title, Text } = Typography

const DashboardTitle = ({ pageName, totalDocs }: { pageName: string; totalDocs?: string }) => {
  return (
    <div className='mb-6'>
      <Title level={2} className='uppercase mb-2' style={{ fontWeight: 700, letterSpacing: '0.5px' }}>
        {pageName}
      </Title>
      {totalDocs && (
        <Text type='secondary' style={{ fontSize: '15px' }}>
          Tổng số {pageName}: <strong>{totalDocs}</strong>
        </Text>
      )}
      <Divider className='mt-4' />
    </div>
  )
}

export default DashboardTitle
