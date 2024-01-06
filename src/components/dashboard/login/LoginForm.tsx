'use client'
import { authenticate } from '@/app/lib/actions';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Flex, Form, Input, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import Link from 'next/link';

const LoginForm = () => {
    return (
        <Row>
            <Col span={8} offset={8}>
                <Flex justify='center'>
                    <Title level={3} className='uppercase'>Đăng nhập</Title>
                </Flex>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={(values: any) => {
                        console.log('Received values of form: ', values);
                        authenticate(values)
                    }}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>
                    <Flex justify='center' vertical={true} align='center'>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                        or <Link href="/register">Register now!</Link>
                    </Flex>
                </Form>
            </Col>
        </Row>
    )
}

export default LoginForm