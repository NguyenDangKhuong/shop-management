'use client'

import { apiDelete, apiGet, apiPost, apiPut } from '@/utils/internalApi'
import { CopyOutlined, DeleteTwoTone, EditTwoTone, PlusOutlined, ReloadOutlined } from '@ant-design/icons'
import { App, Button, Form, Input, Modal, Popconfirm, Spin, Tag } from 'antd'
import { useEffect, useState } from 'react'

interface Veo3Token {
    _id: string
    value: string
    projectId?: string
    sessionId?: string
    siteKey?: string
    apiKeyNanoAI?: string
    createdAt?: string
    updatedAt?: string
}

const FIELDS: { key: keyof Veo3Token; label: string; icon: string; color: string }[] = [
    { key: 'value', label: 'Token (ya29)', icon: '🔑', color: '#e94560' },
    { key: 'projectId', label: 'Project ID', icon: '📁', color: '#4caf50' },
    { key: 'sessionId', label: 'Session ID', icon: '📋', color: '#FF9800' },
    { key: 'siteKey', label: 'SiteKey (reCAPTCHA)', icon: '🛡️', color: '#9c27b0' },
    { key: 'apiKeyNanoAI', label: 'API Key NanoAI', icon: '🤖', color: '#00bcd4' },
]

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
        form.setFieldsValue({
            value: token.value,
            projectId: token.projectId || '',
            sessionId: token.sessionId || '',
            siteKey: token.siteKey || '',
            apiKeyNanoAI: token.apiKeyNanoAI || ''
        })
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
            const payload = {
                value: values.value,
                projectId: values.projectId || '',
                sessionId: values.sessionId || '',
                siteKey: values.siteKey || '',
                apiKeyNanoAI: values.apiKeyNanoAI || ''
            }

            const result = editingToken
                ? await apiPut('/api/veo3-tokens', { id: editingToken._id, ...payload })
                : await apiPost('/api/veo3-tokens', payload)

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

    const token = tokens[0]

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Veo3 Token</h2>
                <div className="flex gap-2">
                    <Button
                        icon={<ReloadOutlined />}
                        onClick={loadTokens}
                        loading={loading}
                    />
                    {!token && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAdd}
                        >
                            Thêm Token
                        </Button>
                    )}
                </div>
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

            {loading ? (
                <div className="flex justify-center py-16">
                    <Spin size="large" />
                </div>
            ) : !token ? (
                <div className="text-center py-16 text-gray-400">
                    <div className="text-4xl mb-4">🔍</div>
                    <p>Chưa có token nào</p>
                    <p className="text-sm mt-1">Bấm &quot;Thêm Token&quot; hoặc gửi từ extension</p>
                </div>
            ) : (
                <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b">
                        <div className="flex items-center gap-2">
                            <Tag color="green">Active</Tag>
                            {token.updatedAt && (
                                <span className="text-xs text-gray-400">
                                    Cập nhật: {new Date(token.updatedAt).toLocaleString('vi-VN')}
                                </span>
                            )}
                        </div>
                        <div className="flex gap-3">
                            <EditTwoTone
                                className="cursor-pointer text-lg"
                                onClick={() => handleEdit(token)}
                            />
                            <Popconfirm
                                title="Xóa token?"
                                description="Bạn có chắc muốn xóa token này?"
                                onConfirm={() => handleDelete(token._id.toString())}
                                okText="Xóa"
                                cancelText="Hủy"
                            >
                                <DeleteTwoTone className="cursor-pointer text-lg" twoToneColor="#ff4d4f" />
                            </Popconfirm>
                        </div>
                    </div>

                    {/* Fields */}
                    <div className="divide-y">
                        {FIELDS.map(({ key, label, icon, color }) => {
                            const value = token[key] as string | undefined
                            return (
                                <div key={key} className="px-4 py-3 flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                                    <div className="flex items-center gap-2 sm:w-48 flex-shrink-0">
                                        <span>{icon}</span>
                                        <span className="text-sm font-medium" style={{ color }}>{label}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        {value ? (
                                            <div className="flex items-start gap-2 group">
                                                <span className="font-mono text-xs break-all leading-relaxed bg-gray-50 px-2 py-1 rounded flex-1">
                                                    {value}
                                                </span>
                                                <CopyOutlined
                                                    className="cursor-pointer text-gray-400 hover:text-blue-500 flex-shrink-0 mt-1 opacity-60 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => handleCopy(value)}
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-gray-300 text-sm">—</span>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
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
                    <Form.Item name="projectId" label="Project ID">
                        <Input placeholder="Nhập project ID..." className="font-mono text-xs" />
                    </Form.Item>
                    <Form.Item name="sessionId" label="Session ID">
                        <Input placeholder="Nhập session ID..." className="font-mono text-xs" />
                    </Form.Item>
                    <Form.Item name="siteKey" label="SiteKey">
                        <Input placeholder="reCAPTCHA Enterprise site key..." className="font-mono text-xs" />
                    </Form.Item>
                    <Form.Item name="apiKeyNanoAI" label="API Key NanoAI">
                        <Input placeholder="Nhập API Key NanoAI..." className="font-mono text-xs" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Veo3TokenTable
