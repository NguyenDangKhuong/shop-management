'use client'

import {
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined
} from '@ant-design/icons'
import { App, Button, Input, Modal, Popconfirm, Select, Spin } from 'antd'
import { useCallback, useEffect, useState } from 'react'

const { TextArea } = Input

interface PromptItem {
    _id: string
    title: string
    content: string
    subPrompt?: string
    type?: 'hook' | 'describe'
    order?: number
    createdAt?: string
    updatedAt?: string
}

export default function PromptsManager() {
    const { message } = App.useApp()
    const [prompts, setPrompts] = useState<PromptItem[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editing, setEditing] = useState<PromptItem | null>(null)
    const [form, setForm] = useState({
        title: '',
        content: '',
        subPrompt: '',
        type: 'describe' as 'hook' | 'describe',
        order: 0
    })

    const fetchPrompts = useCallback(async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/prompts')
            const data = await res.json()
            if (data.success) setPrompts(data.data)
        } catch (err: any) {
            message.error('Lỗi tải prompts: ' + err.message)
        } finally {
            setLoading(false)
        }
    }, [message])

    useEffect(() => { fetchPrompts() }, [fetchPrompts])

    const handleAdd = () => {
        setEditing(null)
        setForm({ title: '', content: '', subPrompt: '', type: 'describe', order: 0 })
        setIsModalOpen(true)
    }

    const handleEdit = (prompt: PromptItem) => {
        setEditing(prompt)
        setForm({
            title: prompt.title,
            content: prompt.content,
            subPrompt: prompt.subPrompt || '',
            type: prompt.type || 'describe',
            order: prompt.order || 0
        })
        setIsModalOpen(true)
    }

    const handleDuplicate = async (prompt: PromptItem) => {
        try {
            const res = await fetch('/api/prompts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: `${prompt.title} (Copy)`,
                    content: prompt.content,
                    subPrompt: prompt.subPrompt || '',
                    type: prompt.type || 'describe',
                    order: (prompt.order ?? 0) + 1
                })
            })
            const data = await res.json()
            if (data.success) {
                message.success('Đã nhân bản!')
                fetchPrompts()
            } else {
                message.error('Lỗi: ' + data.error)
            }
        } catch (err: any) {
            message.error('Lỗi: ' + err.message)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/prompts?id=${id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                message.success('Đã xóa!')
                fetchPrompts()
            } else {
                message.error('Xóa thất bại')
            }
        } catch (err: any) {
            message.error('Lỗi: ' + err.message)
        }
    }

    const handleSave = async () => {
        if (!form.title.trim() || !form.content.trim()) {
            message.warning('Vui lòng nhập tiêu đề và nội dung')
            return
        }
        try {
            const method = editing ? 'PUT' : 'POST'
            const body = editing
                ? { id: editing._id, ...form }
                : form
            const res = await fetch('/api/prompts', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            const data = await res.json()
            if (data.success) {
                message.success(editing ? 'Đã cập nhật!' : 'Đã tạo mới!')
                setIsModalOpen(false)
                fetchPrompts()
            } else {
                message.error('Lỗi: ' + data.error)
            }
        } catch (err: any) {
            message.error('Lỗi: ' + err.message)
        }
    }

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content)
        message.success('Đã copy!')
    }

    const filtered = prompts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold">📝 Quản lý Prompt ({prompts.length})</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                    Thêm Prompt
                </Button>
            </div>

            {/* Search */}
            <Input
                placeholder="Tìm kiếm prompt..."
                prefix={<SearchOutlined />}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="mb-4"
                allowClear
            />

            {/* List */}
            {loading ? (
                <div className="text-center py-8"><Spin /></div>
            ) : filtered.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                    {search ? 'Không tìm thấy prompt nào' : 'Chưa có prompt nào'}
                </p>
            ) : (
                <div className="space-y-3">
                    {filtered.map(prompt => (
                        <div key={prompt._id} className="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
                            <div className="flex items-start gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-sm font-semibold text-gray-800 truncate">
                                            {prompt.title}
                                        </h3>
                                        {prompt.type && (
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${
                                                prompt.type === 'hook'
                                                    ? 'bg-blue-100 text-blue-700'
                                                    : 'bg-purple-100 text-purple-700'
                                            }`}>
                                                {prompt.type === 'hook' ? '🪝 Hook' : '📝 Describe'}
                                            </span>
                                        )}
                                        {prompt.order !== undefined && (
                                            <span className="text-[10px] text-gray-400 flex-shrink-0">
                                                #{prompt.order}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 line-clamp-3 whitespace-pre-wrap">
                                        {prompt.content}
                                    </p>
                                    {prompt.subPrompt && (
                                        <p className="text-xs text-purple-600 mt-1 line-clamp-2 whitespace-pre-wrap italic">
                                            📝 Sub: {prompt.subPrompt}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-1 flex-shrink-0">
                                    <Button
                                        type="text" size="small"
                                        icon={<CopyOutlined />}
                                        onClick={() => handleCopy(prompt.content)}
                                        title="Copy nội dung"
                                    />
                                    <Button
                                        type="text" size="small"
                                        onClick={() => handleDuplicate(prompt)}
                                        title="Nhân bản"
                                    >📋</Button>
                                    <Button
                                        type="text" size="small"
                                        icon={<EditOutlined />}
                                        onClick={() => handleEdit(prompt)}
                                        title="Sửa"
                                    />
                                    <Popconfirm
                                        title="Xóa prompt?"
                                        description="Bạn có chắc muốn xóa?"
                                        onConfirm={() => handleDelete(prompt._id)}
                                        okText="Xóa" cancelText="Hủy"
                                        okButtonProps={{ danger: true }}
                                    >
                                        <Button
                                            type="text" size="small" danger
                                            icon={<DeleteOutlined />}
                                            title="Xóa"
                                        />
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <Modal
                title={editing ? 'Sửa Prompt' : 'Thêm Prompt'}
                open={isModalOpen}
                onOk={handleSave}
                onCancel={() => setIsModalOpen(false)}
                okText={editing ? 'Cập nhật' : 'Tạo'}
                cancelText="Hủy"
                width={700}
            >
                <div className="space-y-3 mt-4">
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Tiêu đề</label>
                        <Input
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            placeholder="VD: Prompt 1 — Mirror selfie cam gần xa"
                        />
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="text-xs font-medium text-gray-600 mb-1 block">Loại</label>
                            <Select
                                value={form.type}
                                onChange={v => setForm({ ...form, type: v })}
                                className="w-full"
                                options={[
                                    { value: 'describe', label: '📝 Describe' },
                                    { value: 'hook', label: '🪝 Hook' }
                                ]}
                            />
                        </div>
                        <div className="w-24">
                            <label className="text-xs font-medium text-gray-600 mb-1 block">Thứ tự</label>
                            <Input
                                type="number"
                                value={form.order}
                                onChange={e => setForm({ ...form, order: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Nội dung prompt</label>
                        <TextArea
                            value={form.content}
                            onChange={e => setForm({ ...form, content: e.target.value })}
                            rows={8}
                            placeholder="Nội dung prompt..."
                        />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-600 mb-1 block">Sub Prompt (tùy chọn)</label>
                        <TextArea
                            value={form.subPrompt}
                            onChange={e => setForm({ ...form, subPrompt: e.target.value })}
                            rows={4}
                            placeholder="Sub prompt..."
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}
