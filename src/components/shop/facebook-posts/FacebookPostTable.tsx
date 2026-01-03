'use client'

import { useEffect, useState } from 'react'
import { DeleteTwoTone, EditTwoTone, CalendarOutlined, LinkOutlined } from '@ant-design/icons'
import { Button, List, Tag, Popconfirm, Avatar, Space, Table, Divider, Modal, Image } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { isMobile } from 'react-device-detect'
import { FacebookPost } from '@/models/FacebookPost'
import FacebookPostModal from './FacebookPostModal'
import { deleteCloudinaryImages } from '@/actions/cloudinary'
import { deleteVideoFromMinIO } from '@/utils/minioUpload'

const initialPost: Partial<FacebookPost> = {
    content: '',
    status: 'scheduled'
}

const FacebookPostTable = () => {
    const [posts, setPosts] = useState<FacebookPost[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingPost, setEditingPost] = useState<Partial<FacebookPost>>(initialPost)
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
    const [imageGallery, setImageGallery] = useState<string[]>([])
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)

    const loadPosts = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/facebook-posts')
            const result = await res.json()
            if (result.success) {
                setPosts(result.data)
            }
        } catch (error) {
            console.error('Failed to load posts:', error)
        }
        setLoading(false)
    }

    useEffect(() => {
        loadPosts()
    }, [])

    const handleDelete = async (id: string) => {
        try {
            // Find the post to get its media files
            const post = posts.find(p => p._id === id)

            if (post && post.mediaFiles && post.mediaFiles.length > 0) {
                // Delete media files from storage based on post type
                if (post.postType === 'reel') {
                    // Delete video from MinIO
                    for (const file of post.mediaFiles) {
                        if (file.type === 'video' && file.publicId) {
                            await deleteVideoFromMinIO(file.publicId)
                        }
                    }
                } else {
                    // Delete images from Cloudinary
                    const imagePublicIds = post.mediaFiles
                        .filter(file => file.type === 'image' && file.publicId)
                        .map(file => file.publicId!)

                    if (imagePublicIds.length > 0) {
                        await deleteCloudinaryImages(imagePublicIds)
                    }
                }
            }

            // Delete post from database
            const res = await fetch(`/api/facebook-posts?id=${id}`, { method: 'DELETE' })
            const result = await res.json()
            if (result.success) {
                loadPosts()
            }
        } catch (error) {
            console.error('Failed to delete post:', error)
        }
    }

    const handleEdit = (post: FacebookPost) => {
        setEditingPost(post)
        setIsModalOpen(true)
    }

    const statusConfig: Record<string, { color: string; label: string }> = {
        draft: { color: 'default', label: 'Nháp' },
        scheduled: { color: 'blue', label: 'Đã lên lịch' },
        published: { color: 'green', label: 'Đã đăng' },
        failed: { color: 'red', label: 'Thất bại' }
    }

    // Table columns for desktop
    const columns: ColumnsType<FacebookPost> = [
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 140,
            filters: [
                { text: 'Nháp', value: 'draft' },
                { text: 'Đã lên lịch', value: 'scheduled' },
                { text: 'Đã đăng', value: 'published' },
                { text: 'Thất bại', value: 'failed' }
            ],
            onFilter: (value, record) => record.status === value,
            render: (status: string) => (
                <Tag color={statusConfig[status]?.color || 'default'}>
                    {statusConfig[status]?.label || status}
                </Tag>
            )
        },
        {
            title: 'Loại',
            dataIndex: 'postType',
            key: 'postType',
            align: 'center',
            width: 110,
            filters: [
                { text: 'Post', value: 'post' },
                { text: 'Reel', value: 'reel' }
            ],
            onFilter: (value, record) => record.postType === value,
            render: (postType: string) => (
                <Tag color={postType === 'reel' ? 'purple' : 'default'}>
                    {postType === 'reel' ? 'Reel' : 'Post'}
                </Tag>
            )
        },
        {
            title: 'Nội dung',
            dataIndex: 'content',
            key: 'content',
            render: (text: string) => (
                <div className="max-w-md">
                    {text.length > 100 ? `${text.substring(0, 100)}...` : text}
                </div>
            )
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'mediaFiles',
            key: 'mediaFiles',
            align: 'center',
            width: 120,
            render: (files: any[]) => {
                if (!files || files.length === 0) return '-'

                return (
                    <div className="flex items-center justify-center gap-1">
                        {files.slice(0, 3).map((file, index) => (
                            <div
                                key={index}
                                className="relative w-10 h-10 rounded overflow-hidden border border-gray-300 cursor-pointer hover:opacity-80 transition"
                                style={{ marginLeft: index > 0 ? '-8px' : '0' }}
                                onClick={() => {
                                    if (file.type === 'video') {
                                        setVideoPreviewUrl(file.url)
                                        setIsVideoModalOpen(true)
                                    } else {
                                        // Show all images from this post
                                        const imageUrls = files
                                            .filter(f => f.type === 'image')
                                            .map(f => f.url)
                                        setImageGallery(imageUrls)
                                        setIsImageModalOpen(true)
                                    }
                                }}
                            >
                                {file.type === 'image' ? (
                                    <img
                                        src={file.url}
                                        alt={`Media ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs hover:bg-gray-300">
                                        📹
                                    </div>
                                )}
                            </div>
                        ))}
                        {files.length > 3 && (
                            <span className="text-xs text-gray-500 ml-1">+{files.length - 3}</span>
                        )}
                    </div>
                )
            }
        },
        {
            title: 'Ngày',
            dataIndex: 'scheduledAt',
            key: 'scheduledDate',
            width: 120,
            align: 'center',
            render: (scheduledAt: string, record) => {
                if (!scheduledAt) return '-'

                const isOverdue = dayjs(scheduledAt).isBefore(dayjs()) &&
                    ['draft', 'scheduled'].includes(record.status)

                return (
                    <span className={isOverdue ? 'text-red-500 font-semibold' : ''}>
                        {dayjs(scheduledAt).format('DD/MM/YYYY')}
                    </span>
                )
            }
        },
        {
            title: 'Giờ',
            dataIndex: 'scheduledAt',
            key: 'scheduledTime',
            width: 100,
            align: 'center',
            render: (scheduledAt: string, record) => {
                if (!scheduledAt) return '-'

                const isOverdue = dayjs(scheduledAt).isBefore(dayjs()) &&
                    ['draft', 'scheduled'].includes(record.status)

                return (
                    <span className={isOverdue ? 'text-red-500 font-semibold' : ''}>
                        {dayjs(scheduledAt).format('HH:mm')}
                        {isOverdue && ' ⚠️'}
                    </span>
                )
            }
        },
        {
            title: 'Link',
            dataIndex: 'postUrl',
            key: 'postUrl',
            width: 100,
            render: (url: string) => {
                if (!url) return '-'

                const absoluteUrl = url.startsWith('http') ? url : `https://${url}`

                return (
                    <a
                        href={absoluteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                    >
                        Xem
                    </a>
                )
            }
        },
        {
            title: 'Sửa/xoá',
            key: 'actions',
            align: 'center',
            width: 100,
            render: (_, record) => (
                <>
                    <EditTwoTone
                        className="cursor-pointer"
                        onClick={() => handleEdit(record)}
                    />
                    <Divider type="vertical" />
                    <Popconfirm
                        title="Xóa bài viết?"
                        description="Bạn có chắc chắn muốn xóa bài viết này?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <DeleteTwoTone className="cursor-pointer" twoToneColor="#ff4d4f" />
                    </Popconfirm>
                </>
            )
        }
    ]

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Bài viết Facebook ({posts.length})</h2>
                <Button
                    type="primary"
                    onClick={() => {
                        setEditingPost(initialPost)
                        setIsModalOpen(true)
                    }}
                >
                    Tạo bài viết mới
                </Button>
            </div>

            {/* Mobile: List View */}
            {isMobile ? (
                <List
                    loading={loading}
                    dataSource={posts}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} bài viết`
                    }}
                    renderItem={(post) => (
                        <List.Item
                            key={post._id}
                            actions={[
                                <Button
                                    key="edit"
                                    type="link"
                                    icon={<EditTwoTone />}
                                    onClick={() => handleEdit(post)}
                                >
                                    Sửa
                                </Button>,
                                <Popconfirm
                                    key="delete"
                                    title="Xóa bài viết"
                                    description="Bạn có chắc muốn xóa bài viết này?"
                                    onConfirm={() => handleDelete(post._id!)}
                                    okText="Xóa"
                                    cancelText="Hủy"
                                >
                                    <Button type="link" danger icon={<DeleteTwoTone twoToneColor="#ff4d4f" />}>
                                        Xóa
                                    </Button>
                                </Popconfirm>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    post.mediaFiles && post.mediaFiles.length > 0 ? (
                                        <Avatar
                                            shape="square"
                                            size={64}
                                            src={
                                                post.mediaFiles[0].type === 'image'
                                                    ? post.mediaFiles[0].url
                                                    : undefined
                                            }
                                            icon={post.mediaFiles[0].type === 'video' ? '📹' : undefined}
                                        />
                                    ) : (
                                        <Avatar shape="square" size={64} icon="📝" style={{ backgroundColor: '#f0f0f0' }} />
                                    )
                                }
                                title={
                                    <div className="flex flex-col gap-2">
                                        <div className="text-sm font-normal text-gray-800 line-clamp-2">
                                            {post.content}
                                        </div>
                                        <Space size="small" wrap>
                                            <Tag color={statusConfig[post.status]?.color || 'default'}>
                                                {statusConfig[post.status]?.label || post.status}
                                            </Tag>
                                            {post.mediaFiles && post.mediaFiles.length > 1 && (
                                                <Tag color="purple">
                                                    {post.mediaFiles.length} file
                                                </Tag>
                                            )}
                                        </Space>
                                    </div>
                                }
                                description={
                                    <Space direction="vertical" size="small" className="text-xs">
                                        {post.scheduledAt && (
                                            <div className={`flex items-center gap-1 ${dayjs(post.scheduledAt).isBefore(dayjs()) &&
                                                ['draft', 'scheduled'].includes(post.status)
                                                ? 'text-red-500 font-semibold'
                                                : 'text-gray-500'
                                                }`}>
                                                <CalendarOutlined />
                                                <span>
                                                    Hẹn đăng: {dayjs(post.scheduledAt).format('DD/MM/YYYY HH:mm')}
                                                    {dayjs(post.scheduledAt).isBefore(dayjs()) &&
                                                        ['draft', 'scheduled'].includes(post.status) && (
                                                            <span className="ml-1">⚠️ Quá hạn</span>
                                                        )}
                                                </span>
                                            </div>
                                        )}
                                        {post.postUrl && (
                                            <div className="flex items-center gap-1">
                                                <LinkOutlined />
                                                <a
                                                    href={post.postUrl.startsWith('http') ? post.postUrl : `https://${post.postUrl}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    Xem bài
                                                </a>
                                            </div>
                                        )}
                                        {post.createdAt && (
                                            <div className="text-gray-400">
                                                Tạo lúc: {dayjs(post.createdAt).format('DD/MM/YYYY HH:mm')}
                                            </div>
                                        )}
                                    </Space>
                                }
                            />
                        </List.Item>
                    )}
                />
            ) : (
                /* Desktop: Table View */
                <Table
                    rowKey="_id"
                    loading={loading}
                    bordered
                    columns={columns}
                    dataSource={posts}
                    scroll={{ x: 1200, y: 600 }}
                    pagination={{
                        pageSize: 20,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} bài viết`
                    }}
                />
            )}

            <FacebookPostModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                editingPost={editingPost}
                setEditingPost={setEditingPost}
                onRefresh={loadPosts}
            />

            {/* Video Preview Modal */}
            <Modal
                title="Video Preview"
                open={isVideoModalOpen}
                onCancel={() => {
                    setIsVideoModalOpen(false)
                    setVideoPreviewUrl(null)
                }}
                footer={null}
                width={800}
                centered
            >
                {videoPreviewUrl && (
                    <video
                        src={videoPreviewUrl}
                        controls
                        autoPlay
                        className="w-full rounded"
                        style={{ maxHeight: '70vh' }}
                    >
                        Your browser does not support the video tag.
                    </video>
                )}
            </Modal>

            {/* Image Gallery Modal */}
            <Modal
                title={`Image Gallery (${imageGallery.length} images)`}
                open={isImageModalOpen}
                onCancel={() => {
                    setIsImageModalOpen(false)
                    setImageGallery([])
                }}
                footer={null}
                width={900}
                centered
            >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Image.PreviewGroup>
                        {imageGallery.map((url, index) => (
                            <Image
                                key={index}
                                src={url}
                                alt={`Image ${index + 1}`}
                                className="rounded cursor-pointer"
                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                            />
                        ))}
                    </Image.PreviewGroup>
                </div>
            </Modal>
        </div>
    )
}

export default FacebookPostTable
