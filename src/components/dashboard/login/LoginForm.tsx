// /app/login/page.tsx
'use client'

import { useState } from "react"
import { Button, Form, Input, notification } from "antd"
import { useRouter } from "next/navigation"
// import { auth, signIn } from "@/auth/auth"

export default function LoginForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Handle login submit
  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true)
    console.log('check', values)
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      body: JSON.stringify(values),
    })

    if (res.ok) {
      router.push('/admin') // Redirect to admin page if login is successful
    } else {
      alert('Login failed')
      notification.error({
        message: "Đăng nhập thất bại",
        description: String(res),
      })
    }

    setLoading(false)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Đăng nhập</h2>

        <Form onFinish={onFinish} layout="vertical" initialValues={{ email: "", password: "" }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email của bạn!" }]}
          >
            <Input type="email" className="ant-input" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu của bạn!" }]}
          >
            <Input.Password className="ant-input" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
