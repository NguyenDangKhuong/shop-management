'use client'

import { Typography } from 'antd'

const { Title } = Typography
const DashboardTitle = ({ pageName, totalDocs }: { pageName: string, totalDocs?: string }) => {
  return <>
    <Title level={4} className='uppercase'>{pageName}</Title>
    {totalDocs && <Title level={5}>Số lượng {pageName}: {totalDocs}</Title>}
  </>
}

export default DashboardTitle
