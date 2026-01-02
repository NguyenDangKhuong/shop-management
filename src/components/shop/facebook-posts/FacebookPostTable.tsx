'use client'

import { useEffect, useState } from 'react'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import { Button, Divider, Flex, Popconfirm, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { FacebookPost } from '@/models/FacebookPost'
import FacebookPostModal from './FacebookPostModal'

const initialPost: Partial<FacebookPost> = {
    content: '',
    status: 'draft'
}

const FacebookPostTable = () => {
    const [posts, setPosts] = useState<FacebookPost[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingPost, setEditingPost] = useState<Partial<FacebookPost>>(initialPost)

    const loadPosts = async () => {
        setLoading(true)
        try {
            const res = await fetch('/admin/api/facebook-posts')
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
            const res = await fetch(`/admin/api/facebook-posts?id=${id}`, { method: 'DELETE' })
            const result = await res.json()
            if (result.success) {
                loadPosts()
            }
        } catch (error) {
            console.error('Failed to delete post:', error)
        }
    }

    const statusColors: Record<string, string> = {
        draft: 'default',
        scheduled: 'blue',
        published: 'green',
        failed: 'red'
    }

    const columns: ColumnsType<FacebookPost> = [
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            render: (text: string) => (
                <div className="max-w-md">
                    {text.length > 100 ? `${text.substring(0, 100)}...` : text}
                </div>
            )
        },
        {
            title: 'Media',
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
                                className="relative w-10 h-10 rounded overflow-hidden border border-gray-300"
                                style={{ marginLeft: index > 0 ? '-8px' : '0' }}
                            >
                                {file.type === 'image' ? (
                                    <img
                                        src={file.url}
                                        alt={`Media ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 120,
            render: (status: string) => (
                <Tag color={statusColors[status] || 'default'}>
                    {status?.toUpperCase()}
                </Tag>
            )
        },
        {
            title: 'Ngày hẹn đăng',
            dataIndex: 'scheduledDate',
            key: 'scheduledDate',
            width: 120,
            align: 'center',
            render: (date: string) => date || '-'
        },
        {
            title: 'Giờ hẹn đăng',
            dataIndex: 'scheduledTime',
            key: 'scheduledTime',
            width: 100,
            align: 'center',
            render: (time: string) => time || '-'
        },
        {
            title: 'Post URL',
            dataIndex: 'postUrl',
            key: 'postUrl',
            width: 150,
            render: (url: string) => url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    View Post
                </a>
            ) : '-'
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'center',
            width: 120,
            render: (_, record) => (
                <>
                    <EditTwoTone
                        className="cursor-pointer"
                        onClick={() => {
                            setEditingPost(record)
                            setIsModalOpen(true)
                        }}
                    />
                    <Divider type="vertical" />
                    <Popconfirm
                        title="Delete post?"
                        description="Are you sure you want to delete this post?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteTwoTone className="cursor-pointer" twoToneColor="#ff4d4f" />
                    </Popconfirm>
                </>
            )
        }
    ]

    return (
        <>
            <Flex className="mb-5" justify="space-between" align="center">
                <div className="text-sm text-gray-600">
                    Total: {posts.length} posts
                </div>
                <Button
                    type="primary"
                    onClick={() => {
                        setEditingPost(initialPost)
                        setIsModalOpen(true)
                    }}
                >
                    Create New Post
                </Button>
            </Flex>

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
                    showTotal: (total) => `Total ${total} posts`
                }}
            />

            <FacebookPostModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                editingPost={editingPost}
                setEditingPost={setEditingPost}
                onRefresh={loadPosts}
            />
        </>
    )
}

export default FacebookPostTable
