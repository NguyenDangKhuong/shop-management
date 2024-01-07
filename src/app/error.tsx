'use client'

import Link from 'next/link'

import { Button, Result } from 'antd'

const ErrorPage = () => {
  return (
    <Result
      status='500'
      title='500'
      subTitle='Sorry, something went wrong.'
      extra={
        <Link href='/'>
          <Button type='primary'>Back Home</Button>
        </Link>
      }
    />
  )
}

export default ErrorPage
