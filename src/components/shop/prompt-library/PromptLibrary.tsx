'use client'

import { useEffect, useState } from 'react'

import {
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons'
import { Button, Card, Form, Input, message, Modal, Select, Space, Spin, Tag, Typography } from 'antd'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

interface PromptTemplate {
    _id: string
    title: string
    content: string
    subPrompt?: string
    group: string
    order: number
}

const PromptLibrary = () => {
    const [templates, setTemplates] = useState<PromptTemplate[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [copiedId, setCopiedId] = useState<string | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [editingTemplate, setEditingTemplate] = useState<PromptTemplate | null>(null)
    const [form] = Form.useForm()

    useEffect(() => {
        fetchTemplates()
    }, [])

    const fetchTemplates = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/prompt-templates')
            const data = await res.json()
            if (data.success) {
                setTemplates(data.data)
            }
        } catch {
            message.error('Không thể tải prompt templates')
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedId(id)
            message.success('Đã copy!')
            setTimeout(() => setCopiedId(null), 2000)
        } catch {
            message.error('Copy thất bại')
        }
    }

    const handleSave = async (values: any) => {
        try {
            const method = editingTemplate ? 'PUT' : 'POST'
            const body = editingTemplate ? { id: editingTemplate._id, ...values } : values
            const res = await fetch('/api/prompt-templates', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if (data.success) {
                message.success(editingTemplate ? 'Đã cập nhật!' : 'Đã tạo!')
                setModalOpen(false)
                setEditingTemplate(null)
                form.resetFields()
                fetchTemplates()
            }
        } catch {
            message.error('Lưu thất bại')
        }
    }

    const handleDelete = async (id: string) => {
        Modal.confirm({
            title: 'Xóa template này?',
            onOk: async () => {
                try {
                    const res = await fetch(`/api/prompt-templates?id=${id}`, { method: 'DELETE' })
                    const data = await res.json()
                    if (data.success) {
                        message.success('Đã xóa!')
                        fetchTemplates()
                    }
                } catch {
                    message.error('Xóa thất bại')
                }
            }
        })
    }

    const openEdit = (t: PromptTemplate) => {
        setEditingTemplate(t)
        form.setFieldsValue(t)
        setModalOpen(true)
    }

    const openCreate = () => {
        setEditingTemplate(null)
        form.resetFields()
        setModalOpen(true)
    }

    const filtered = templates.filter(p =>
        !searchTerm ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.content.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const groups = [...new Set(templates.map(t => t.group))]

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Spin size="large" />
            </div>
        )
    }

    const CopyBtn = ({ text, id }: { text: string; id: string }) => (
        <Button
            type="text"
            size="small"
            icon={copiedId === id ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined />}
            onClick={() => handleCopy(text, id)}
            title="Copy"
        />
    )

    const PromptCard = ({ template }: { template: PromptTemplate }) => (
        <Card
            size="small"
            className="mb-3 hover:shadow-md transition-shadow"
            title={
                <div className="flex items-center justify-between">
                    <Text strong className="text-sm">{template.title}</Text>
                    <Space size="small">
                        <CopyBtn text={template.content} id={template._id} />
                        <Button type="text" size="small" icon={<EditOutlined />} onClick={() => openEdit(template)} />
                        <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(template._id)} />
                    </Space>
                </div>
            }
        >
            <Paragraph className="text-xs whitespace-pre-wrap" style={{ marginBottom: template.subPrompt ? 8 : 0 }}>
                {template.content}
            </Paragraph>
            {template.subPrompt && (
                <div className="border-t pt-2 mt-2">
                    <div className="flex items-center justify-between mb-1">
                        <Text type="secondary" className="text-xs font-medium">Sub-prompt</Text>
                        <CopyBtn text={template.subPrompt} id={`${template._id}-sub`} />
                    </div>
                    <Paragraph type="secondary" className="text-xs whitespace-pre-wrap" style={{ marginBottom: 0 }}>
                        {template.subPrompt}
                    </Paragraph>
                </div>
            )}
        </Card>
    )

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <Title level={3} style={{ margin: 0 }}>
                    📋 Prompt Templates ({templates.length})
                </Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
                    Thêm Template
                </Button>
            </div>

            <Input
                placeholder="Tìm kiếm prompt..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
                style={{ maxWidth: 400, marginBottom: 24 }}
            />

            {groups.map(group => {
                const groupTemplates = filtered.filter(t => t.group === group)
                if (groupTemplates.length === 0) return null
                const isVoice = group === 'có thoại'
                return (
                    <div key={group} className="mb-6">
                        <Title level={5} className="mb-3">
                            <Tag color={isVoice ? 'blue' : 'purple'}>
                                {isVoice ? '🗣️' : '🤫'}
                            </Tag>
                            {' '}{group} ({groupTemplates.length})
                        </Title>
                        {groupTemplates.map(t => <PromptCard key={t._id} template={t} />)}
                    </div>
                )
            })}

            {filtered.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                    {searchTerm ? 'Không tìm thấy template nào' : 'Chưa có template nào. Nhấn "Thêm Template" để bắt đầu.'}
                </div>
            )}

            {/* Create/Edit Modal */}
            <Modal
                title={editingTemplate ? 'Sửa Template' : 'Thêm Template'}
                open={modalOpen}
                onCancel={() => { setModalOpen(false); setEditingTemplate(null); form.resetFields() }}
                onOk={() => form.submit()}
                width={700}
            >
                <Form form={form} layout="vertical" onFinish={handleSave}>
                    <Form.Item name="title" label="Tiêu đề" rules={[{ required: true }]}>
                        <Input placeholder="VD: Prompt 1 — Mirror selfie cam gần xa" />
                    </Form.Item>
                    <Form.Item name="group" label="Nhóm" rules={[{ required: true }]}>
                        <Select placeholder="Chọn nhóm">
                            <Select.Option value="có thoại">🗣️ Có thoại</Select.Option>
                            <Select.Option value="che mặt + silent">🤫 Che mặt + Silent</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="order" label="Thứ tự">
                        <Input type="number" placeholder="1, 2, 3..." />
                    </Form.Item>
                    <Form.Item name="content" label="Nội dung Prompt" rules={[{ required: true }]}>
                        <TextArea rows={6} placeholder="Nội dung prompt..." />
                    </Form.Item>
                    <Form.Item name="subPrompt" label="Sub Prompt">
                        <TextArea rows={4} placeholder="Sub prompt (optional)..." />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default PromptLibrary
