'use client'

import { Typography, Divider } from 'antd'

const { Title, Text } = Typography

const DashboardTitle = ({
  pageName,
  totalDocs,
  loading = false
}: {
  pageName: string
  totalDocs?: string | number
  loading?: boolean
}) => {
  return (
    <div className='mb-6'>
      <Title level={2} className='uppercase mb-2' style={{ fontWeight: 700, letterSpacing: '0.5px' }}>
        {pageName}
      </Title>
      {loading ? (
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
      ) : (
        totalDocs && (
          <Text type='secondary' style={{ fontSize: '15px' }}>
            Tổng số {pageName}: <strong>{totalDocs}</strong>
          </Text>
        )
      )}
      <Divider className='mt-4' />
    </div>
  )
}

export default DashboardTitle
