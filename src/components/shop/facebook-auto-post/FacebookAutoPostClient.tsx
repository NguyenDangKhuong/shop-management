'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button, Input, Table, Tag, Modal, Space, message, Popconfirm, Select, Tooltip, Typography } from 'antd'
import {
    PlusOutlined, SendOutlined, DeleteOutlined,
    ReloadOutlined, RobotOutlined,
    EditOutlined, EyeOutlined, FacebookOutlined,
    CheckCircleOutlined, CloseCircleOutlined,
    ClockCircleOutlined, FileTextOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

const { TextArea } = Input
const { Text } = Typography

interface AutoPost {
    _id: string
    content: string
    status: 'draft' | 'scheduled' | 'published' | 'failed'
    targetType: string
    targetName: string
    douyinUrl: string
    douyinDesc: string
    aiCaption: string
    videoR2Url: string
    facebookPostId?: string
    publishedAt?: string
    scheduledDate?: string
    scheduledTime?: string
    errorMessage?: string
    createdAt: string
}

export default function FacebookAutoPostClient() {
    const [posts, setPosts] = useState<AutoPost[]>([])
    const [loading, setLoading] = useState(false)
    const [createModalOpen, setCreateModalOpen] = useState(false)

    // Create form state
    const [douyinUrl, setDouyinUrl] = useState('')
    const [caption, setCaption] = useState('')
    const [captionStyle, setCaptionStyle] = useState('entertaining')
    const [creating, setCreating] = useState(false)
    const [generatingCaption, setGeneratingCaption] = useState(false)
    const [douyinDesc, setDouyinDesc] = useState('')

    // Edit caption modal
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editingPost, setEditingPost] = useState<AutoPost | null>(null)
    const [editCaption, setEditCaption] = useState('')

    // Preview modal
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const fetchPosts = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/facebook-auto-post')
            const data = await res.json()
            if (data.success) setPosts(data.data)
        } catch {
            message.error('Lỗi tải danh sách bài đăng')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => { fetchPosts() }, [fetchPosts])

    // Fetch Douyin description for AI caption
    const fetchDouyinDesc = async (url: string) => {
        try {
            const res = await fetch(`/api/douyin?url=${encodeURIComponent(url)}`)
            if (!res.ok) return ''
            const data = await res.json()
            return data?.data?.desc || ''
        } catch {
            return ''
        }
    }

    const generateCaption = async (description: string) => {
        if (!description) {
            message.warning('Không có mô tả video để tạo caption')
            return
        }
        setGeneratingCaption(true)
        try {
            const res = await fetch('/api/facebook-auto-post/ai-caption', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description, style: captionStyle }),
            })
            const data = await res.json()
            if (data.success) {
                setCaption(data.caption)
                message.success('Đã tạo caption AI')
            } else {
                message.error(data.error || 'Lỗi tạo caption')
            }
        } catch {
            message.error('Lỗi kết nối AI')
        } finally {
            setGeneratingCaption(false)
        }
    }

    const handleCreate = async () => {
        if (!douyinUrl.trim()) {
            message.warning('Vui lòng nhập link Douyin')
            return
        }
        setCreating(true)
        try {
            const res = await fetch('/api/facebook-auto-post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    douyinUrl: douyinUrl.trim(),
                    caption: caption.trim(),
                }),
            })
            const data = await res.json()
            if (data.success) {
                message.success('Đã tạo bài đăng + tải video thành công!')
                setCreateModalOpen(false)
                setDouyinUrl('')
                setCaption('')
                setDouyinDesc('')
                fetchPosts()
            } else {
                message.error(data.error || 'Lỗi tạo bài đăng')
            }
        } catch {
            message.error('Lỗi kết nối server')
        } finally {
            setCreating(false)
        }
    }

    const handlePublish = async (id: string) => {
        try {
            const res = await fetch('/api/facebook-auto-post/publish', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            })
            const data = await res.json()
            if (data.success) {
                message.success('🎉 Đã đăng lên Facebook Page thành công!')
                fetchPosts()
            } else {
                message.error(data.error || 'Lỗi đăng bài')
            }
        } catch {
            message.error('Lỗi kết nối server')
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/facebook-auto-post?id=${id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                message.success('Đã xóa')
                fetchPosts()
            }
        } catch {
            message.error('Lỗi xóa bài')
        }
    }

    const handleEditCaption = async () => {
        if (!editingPost) return
        try {
            const res = await fetch('/api/facebook-auto-post', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editingPost._id, aiCaption: editCaption }),
            })
            const data = await res.json()
            if (data.success) {
                message.success('Đã cập nhật caption')
                setEditModalOpen(false)
                fetchPosts()
            }
        } catch {
            message.error('Lỗi cập nhật')
        }
    }

    const statusColors: Record<string, string> = {
        draft: 'default',
        scheduled: 'processing',
        published: 'success',
        failed: 'error',
    }

    const statusIcons: Record<string, React.ReactNode> = {
        draft: <FileTextOutlined />,
        scheduled: <ClockCircleOutlined />,
        published: <CheckCircleOutlined />,
        failed: <CloseCircleOutlined />,
    }

    const columns: ColumnsType<AutoPost> = [
        {
            title: 'Video',
            dataIndex: 'videoR2Url',
            width: 80,
            render: (url: string) => url ? (
                <Button
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={() => setPreviewUrl(url)}
                >
                    Xem
                </Button>
            ) : '—',
        },
        {
            title: 'Caption',
            dataIndex: 'aiCaption',
            ellipsis: true,
            render: (text: string, record) => (
                <Tooltip title={text || record.content}>
                    <Text ellipsis style={{ maxWidth: 300 }}>
                        {text || record.content || '—'}
                    </Text>
                </Tooltip>
            ),
        },
        {
            title: 'Target',
            dataIndex: 'targetName',
            width: 120,
            render: (name: string, record) => (
                <Space>
                    <FacebookOutlined style={{ color: '#1877F2' }} />
                    <span>{name || record.targetType}</span>
                </Space>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: 110,
            render: (status: string, record) => (
                <Tooltip title={record.errorMessage}>
                    <Tag
                        color={statusColors[status]}
                        icon={statusIcons[status]}
                    >
                        {status.toUpperCase()}
                    </Tag>
                </Tooltip>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            width: 140,
            render: (date: string) => dayjs(date).format('DD/MM/YY HH:mm'),
        },
        {
            title: 'Actions',
            width: 200,
            render: (_, record) => (
                <Space size="small">
                    {record.status !== 'published' && (
                        <Popconfirm
                            title="Đăng lên Facebook Page ngay?"
                            onConfirm={() => handlePublish(record._id)}
                        >
                            <Button type="primary" size="small" icon={<SendOutlined />}>
                                Đăng
                            </Button>
                        </Popconfirm>
                    )}
                    <Button
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setEditingPost(record)
                            setEditCaption(record.aiCaption || record.content)
                            setEditModalOpen(true)
                        }}
                    />
                    <Popconfirm title="Xóa bài này?" onConfirm={() => handleDelete(record._id)}>
                        <Button size="small" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <>
            {/* Action Bar */}
            <Space className="mb-4">
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setCreateModalOpen(true)}
                >
                    Tạo bài mới
                </Button>
                <Button icon={<ReloadOutlined />} onClick={fetchPosts} loading={loading}>
                    Refresh
                </Button>
                <Text type="secondary">{posts.length} bài</Text>
            </Space>

            {/* Posts Table */}
            <Table
                columns={columns}
                dataSource={posts}
                rowKey="_id"
                loading={loading}
                pagination={{ pageSize: 10 }}
                size="middle"
            />

            {/* Create Modal */}
            <Modal
                title="📤 Tạo bài đăng Facebook từ Douyin"
                open={createModalOpen}
                onCancel={() => setCreateModalOpen(false)}
                footer={null}
                width={600}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Link Douyin</label>
                        <Input.Search
                            placeholder="Dán link video Douyin..."
                            value={douyinUrl}
                            onChange={e => setDouyinUrl(e.target.value)}
                            enterButton="Lấy mô tả"
                            loading={generatingCaption}
                            onSearch={async () => {
                                if (!douyinUrl.trim()) return
                                const desc = await fetchDouyinDesc(douyinUrl.trim())
                                setDouyinDesc(desc)
                                if (desc) {
                                    message.success('Đã lấy mô tả video')
                                    generateCaption(desc)
                                } else {
                                    message.warning('Không tìm thấy mô tả')
                                }
                            }}
                        />
                    </div>

                    {douyinDesc && (
                        <div className="p-3 bg-gray-50 rounded-lg">
                            <Text type="secondary" className="text-xs">Mô tả gốc từ Douyin:</Text>
                            <p className="text-sm mt-1">{douyinDesc}</p>
                        </div>
                    )}

                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <label className="text-sm font-medium">Caption Facebook</label>
                            <Space>
                                <Select
                                    size="small"
                                    value={captionStyle}
                                    onChange={setCaptionStyle}
                                    options={[
                                        { value: 'entertaining', label: '🎭 Giải trí' },
                                        { value: 'engagement', label: '💬 Tương tác' },
                                        { value: 'informative', label: '📚 Thông tin' },
                                    ]}
                                    style={{ width: 130 }}
                                />
                                <Button
                                    size="small"
                                    icon={<RobotOutlined />}
                                    loading={generatingCaption}
                                    onClick={() => generateCaption(douyinDesc || douyinUrl)}
                                    disabled={!douyinDesc && !douyinUrl}
                                >
                                    AI Caption
                                </Button>
                            </Space>
                        </div>
                        <TextArea
                            rows={6}
                            value={caption}
                            onChange={e => setCaption(e.target.value)}
                            placeholder="Caption sẽ được AI tạo tự động, hoặc bạn có thể tự nhập..."
                        />
                    </div>

                    <Button
                        type="primary"
                        block
                        size="large"
                        loading={creating}
                        onClick={handleCreate}
                        icon={<PlusOutlined />}
                    >
                        {creating ? 'Đang tải video + tạo bài...' : 'Tạo bài đăng'}
                    </Button>
                    {creating && (
                        <Text type="secondary" className="text-xs">
                            ⏳ Video đang được tải từ Douyin CDN → lưu vào R2. Quá trình này mất 10-30 giây.
                        </Text>
                    )}
                </div>
            </Modal>

            {/* Edit Caption Modal */}
            <Modal
                title="✏️ Sửa Caption"
                open={editModalOpen}
                onCancel={() => setEditModalOpen(false)}
                onOk={handleEditCaption}
                okText="Lưu"
            >
                <TextArea
                    rows={8}
                    value={editCaption}
                    onChange={e => setEditCaption(e.target.value)}
                />
            </Modal>

            {/* Video Preview Modal */}
            <Modal
                title="🎬 Xem trước Video"
                open={!!previewUrl}
                onCancel={() => setPreviewUrl(null)}
                footer={null}
                width={400}
            >
                {previewUrl && (
                    <video
                        src={previewUrl}
                        controls
                        autoPlay
                        playsInline
                        style={{ width: '100%', maxHeight: 500, borderRadius: 8 }}
                    />
                )}
            </Modal>
        </>
    )
}
