'use client'

import { apiDelete, apiGet, apiPost, apiPut } from '@/utils/internalApi'
import { CopyOutlined, DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons'
import { App, Button, Form, Input, Modal, Popconfirm, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

interface Veo3Token {
    _id: string
    value: string
    tokenCheckStatus?: string
    createdAt?: string
    updatedAt?: string
}

const Veo3TokenTable = () => {
    const { message } = App.useApp()
    const [tokens, setTokens] = useState<Veo3Token[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingToken, setEditingToken] = useState<Veo3Token | null>(null)
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
        } catch {
            message.error('Không thể copy')
        }
    }

    const handleEdit = (token: Veo3Token) => {
        setEditingToken(token)
        form.setFieldsValue({ value: token.value, tokenCheckStatus: token.tokenCheckStatus || '' })
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

            const result = editingToken
                ? await apiPut('/api/veo3-tokens', { id: editingToken._id, value: values.value, tokenCheckStatus: values.tokenCheckStatus || '' })
                : await apiPost('/api/veo3-tokens', { value: values.value, tokenCheckStatus: values.tokenCheckStatus || '' })

            if (result.success) {
                message.success(editingToken ? 'Đã cập nhật token!' : 'Đã thêm token!')
                setIsModalOpen(false)
                form.resetFields()
                loadTokens()
            } else {
                message.error(result.error || 'Lưu token thất bại')
            }
        } catch {
            // Form validation error
        }
    }

    const apiUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/api/veo3-tokens`
        : '/api/veo3-tokens'

    const columns: ColumnsType<Veo3Token> = [
        {
            title: 'Token',
            dataIndex: 'value',
            key: 'value',
            ellipsis: true,
            render: (value: string) => (
                <div className="flex items-center gap-2">
                    <CopyOutlined
                        className="cursor-pointer text-gray-500 hover:text-blue-500 flex-shrink-0"
                        onClick={() => handleCopy(value)}
                    />
                    <span className="font-mono text-xs">
                        {value.length > 80 ? `${value.substring(0, 80)}...` : value}
                    </span>
                </div>
            )
        },
        {
            title: 'Token Check Status',
            dataIndex: 'tokenCheckStatus',
            key: 'tokenCheckStatus',
            ellipsis: true,
            width: 200,
            render: (value: string) => value ? (
                <div className="flex items-center gap-2">
                    <CopyOutlined
                        className="cursor-pointer text-gray-500 hover:text-blue-500 flex-shrink-0"
                        onClick={() => handleCopy(value)}
                    />
                    <span className="font-mono text-xs">
                        {value.length > 40 ? `${value.substring(0, 40)}...` : value}
                    </span>
                </div>
            ) : <span className="text-gray-400 text-xs">—</span>
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
                    Body: <code className="bg-gray-100 px-1 rounded">{'{ "value": "your_token_here" }'}</code>
                </div>
            </div>

            {isMobile ? (
                <div className="flex flex-col gap-3">
                    {tokens.map((token) => (
                        <div
                            key={token._id}
                            className="border rounded-lg p-3 bg-white shadow-sm"
                        >
                            <div className="flex justify-end items-start mb-2">
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
                            {token.tokenCheckStatus && (
                                <div className="mt-2">
                                    <span className="text-xs font-semibold text-purple-600">Check Status:</span>
                                    <div className="font-mono text-xs text-purple-700 break-all bg-purple-50 p-2 rounded mt-1">
                                        {token.tokenCheckStatus}
                                    </div>
                                </div>
                            )}
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
                        name="value"
                        label="Token"
                        rules={[{ required: true, message: 'Vui lòng nhập token' }]}
                    >
                        <Input.TextArea
                            placeholder="Nhập giá trị token..."
                            rows={4}
                            className="font-mono text-xs"
                        />
                    </Form.Item>
                    <Form.Item
                        name="tokenCheckStatus"
                        label="Token Check Status"
                    >
                        <Input.TextArea
                            placeholder="Nhập token check status..."
                            rows={3}
                            className="font-mono text-xs"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Veo3TokenTable
