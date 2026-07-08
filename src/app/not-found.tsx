import Link from 'next/link'
import { Metadata } from 'next'

import { Button, Result } from 'antd'

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'Page not found',
  icons: [],
}

const NotFoundPage = () => {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Link href='/'>
          <Button type='primary'>Back to Home</Button>
        </Link>
      }
    />
  )
}

export default NotFoundPage
