'use client'

import { useEffect, useState } from 'react'
import { DeleteTwoTone, EditTwoTone, CopyOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Table, App, Input, Modal, Form } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { isMobile } from 'react-device-detect'
import { apiGet, apiPost, apiDelete } from '@/utils/internalApi'

interface Veo3Token {
    _id: string
    key: string
    value: string
    createdAt?: string
    updatedAt?: string
}

const Veo3TokenTable = () => {
    const { message } = App.useApp()
    const [tokens, setTokens] = useState<Veo3Token[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingToken, setEditingToken] = useState<Partial<Veo3Token> | null>(null)
    const [form] = Form.useForm()

    const loadTokens = async () => {
        setLoading(true)
        const result = await apiGet<Veo3Token[]>('/api/veo3-tokens')

        if (result.success && result.data) {
            setTokens(result.data)
        } else {
            message.error(result.error || 'Không thể tải danh sách tokens')
        }
        setLoading(false)
    }

    useEffect(() => {
        loadTokens()
    }, [])

    const handleDelete = async (id: string) => {
        const result = await apiDelete(`/api/veo3-tokens?id=${id}`)

        if (result.success) {
            message.success('Đã xóa token!')
            loadTokens()
        } else {
            message.error(result.error || 'Xóa token thất bại')
        }
    }

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            message.success('Đã copy!')
        } catch (error) {
            console.error('Failed to copy:', error)
            message.error('Không thể copy')
        }
    }

    const handleEdit = (token: Veo3Token) => {
        setEditingToken(token)
        form.setFieldsValue({ key: token.key, value: token.value })
        setIsModalOpen(true)
    }

    const handleAdd = () => {
        setEditingToken(null)
        form.resetFields()
        setIsModalOpen(true)
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()
            const result = await apiPost('/api/veo3-tokens', values)

            if (result.success) {
                message.success(editingToken ? 'Đã cập nhật token!' : 'Đã thêm token!')
                setIsModalOpen(false)
                form.resetFields()
                loadTokens()
            } else {
                message.error(result.error || 'Lưu token thất bại')
            }
        } catch (error) {
            // Form validation error
        }
    }

    const columns: ColumnsType<Veo3Token> = [
        {
            title: 'Key',
            dataIndex: 'key',
            key: 'key',
            width: 200,
            render: (key: string) => (
                <div className="flex items-center gap-2">
                    <CopyOutlined
                        className="cursor-pointer text-gray-500 hover:text-blue-500"
                        onClick={() => handleCopy(key)}
                    />
                    <span className="font-medium">{key}</span>
                </div>
            )
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            ellipsis: true,
            render: (value: string) => (
                <div className="flex items-center gap-2">
                    <CopyOutlined
                        className="cursor-pointer text-gray-500 hover:text-blue-500"
                        onClick={() => handleCopy(value)}
                    />
                    <span className="font-mono text-xs">
                        {value.length > 50 ? `${value.substring(0, 50)}...` : value}
                    </span>
                </div>
            )
        },
        {
            title: 'Cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            width: 180,
            render: (date: string) => date ? new Date(date).toLocaleString('vi-VN') : '-'
        },
        {
            title: 'Hành động',
            key: 'actions',
            align: 'center',
            width: 120,
            render: (_, record) => (
                <div className="flex gap-2 justify-center">
                    <EditTwoTone
                        className="cursor-pointer text-lg"
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Xóa token?"
                        description="Bạn có chắc muốn xóa token này?"
                        onConfirm={() => handleDelete(record._id.toString())}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <DeleteTwoTone className="cursor-pointer text-lg" twoToneColor="#ff4d4f" />
                    </Popconfirm>
                </div>
            )
        }
    ]

    const apiUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/api/veo3-tokens`
        : '/api/veo3-tokens'

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Veo3 Tokens ({tokens.length})</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Thêm Token
                </Button>
            </div>

            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">POST</span>
                    <span className="font-mono text-sm text-blue-800">{apiUrl}</span>
                    <CopyOutlined
                        className="cursor-pointer text-blue-500 hover:text-blue-700"
                        onClick={() => handleCopy(apiUrl)}
                    />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    Body: <code className="bg-gray-100 px-1 rounded">{'{ "key": "token_name", "value": "token_value" }'}</code>
                </div>
            </div>

            {isMobile ? (
                <div className="flex flex-col gap-3">
                    {tokens.map((token) => (
                        <div
                            key={token._id}
                            className="border rounded-lg p-3 bg-white shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-semibold text-blue-600">{token.key}</span>
                                <div className="flex gap-2">
                                    <CopyOutlined
                                        className="cursor-pointer text-gray-500"
                                        onClick={() => handleCopy(token.value)}
                                    />
                                    <EditTwoTone
                                        className="cursor-pointer"
                                        onClick={() => handleEdit(token)}
                                    />
                                    <Popconfirm
                                        title="Xóa token?"
                                        onConfirm={() => handleDelete(token._id)}
                                        okText="Xóa"
                                        cancelText="Hủy"
                                    >
                                        <DeleteTwoTone twoToneColor="#ff4d4f" className="cursor-pointer" />
                                    </Popconfirm>
                                </div>
                            </div>
                            <div className="font-mono text-xs text-gray-600 break-all bg-gray-50 p-2 rounded">
                                {token.value}
                            </div>
                            {token.updatedAt && (
                                <div className="text-xs text-gray-400 mt-2">
                                    {new Date(token.updatedAt).toLocaleString('vi-VN')}
                                </div>
                            )}
                        </div>
                    ))}
                    {tokens.length === 0 && !loading && (
                        <div className="text-center text-gray-400 py-8">Chưa có token nào</div>
                    )}
                </div>
            ) : (
                <Table
                    rowKey="_id"
                    loading={loading}
                    bordered
                    columns={columns}
                    dataSource={tokens}
                    pagination={{ pageSize: 20, showTotal: (total) => `Tổng ${total} tokens` }}
                />
            )}

            <Modal
                title={editingToken ? 'Cập nhật Token' : 'Thêm Token Mới'}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={() => {
                    setIsModalOpen(false)
                    form.resetFields()
                }}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical" className="mt-4">
                    <Form.Item
                        name="key"
                        label="Key"
                        rules={[{ required: true, message: 'Vui lòng nhập key' }]}
                    >
                        <Input placeholder="Ví dụ: access_token, refresh_token..." />
                    </Form.Item>
                    <Form.Item
                        name="value"
                        label="Value"
                        rules={[{ required: true, message: 'Vui lòng nhập value' }]}
                    >
                        <Input.TextArea
                            placeholder="Nhập giá trị token..."
                            rows={4}
                            className="font-mono text-xs"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Veo3TokenTable
