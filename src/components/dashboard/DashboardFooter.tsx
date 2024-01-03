import { Footer } from 'antd/es/layout/layout'
import { format } from 'date-fns'

const DashboardFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Copyright © {format(new Date(), 'yyyy')} <a href='#'>Vợ Thê của NDK</a>
    </Footer>
  )
}

export default DashboardFooter
