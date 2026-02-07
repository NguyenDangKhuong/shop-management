'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { App, Spin, Button, Popconfirm } from 'antd'
import {
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'
import TikTokScheduledPostModal from '@/components/shop/tiktok-accounts/TikTokScheduledPostModal'
import PromptModal from '@/components/shop/tiktok-accounts/PromptModal'

interface TikTokAccount {
    _id: string
    username: string
    displayName: string
    email: string
    cookie: string
    avatar?: {
        url: string
        type: string
        publicId?: string
    }
    createdAt: string
    updatedAt: string
}

export default function TikTokAccountPage() {
    const params = useParams()
    const { message } = App.useApp()
    const [account, setAccount] = useState<TikTokAccount | null>(null)
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<any[]>([])
    const [productsLoading, setProductsLoading] = useState(false)
    const [scheduledPosts, setScheduledPosts] = useState<any[]>([])
    const [postsLoading, setPostsLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingPost, setEditingPost] = useState<any>(null)
    const [prompts, setPrompts] = useState<any[]>([])
    const [promptsLoading, setPromptsLoading] = useState(false)
    const [isPromptModalOpen, setIsPromptModalOpen] = useState(false)
    const [editingPrompt, setEditingPrompt] = useState<any>(null)

    // Extract username from params (decode URI and remove @ prefix if exists)
    const username = params.username
        ? decodeURIComponent(String(params.username)).replace(/^@/, '')
        : ''

    useEffect(() => {
        if (!username) return

        const fetchAccount = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/tiktok-accounts')
                const data = await response.json()

                if (data.success) {
                    const foundAccount = data.data.find(
                        (acc: TikTokAccount) => acc.username === username
                    )

                    if (foundAccount) {
                        setAccount(foundAccount)
                        // Fetch products, scheduled posts, and prompts after account is loaded
                        fetchProducts(foundAccount.cookie)
                        fetchScheduledPosts(foundAccount._id)
                        fetchPrompts(foundAccount._id)
                    } else {
                        message.error('Không tìm thấy account này')
                    }
                }
            } catch (error: any) {
                console.error('❌ Error:', error)
                message.error('Lỗi khi tải thông tin account: ' + error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchAccount()
    }, [username, message])

    const handleEditPost = (post: any) => {
        setEditingPost(post)
        setIsModalOpen(true)
    }

    const handleDeletePost = async (postId: string) => {
        try {
            const response = await fetch(`/api/tiktok-scheduled-posts?id=${postId}`, {
                method: 'DELETE'
            })
            const data = await response.json()

            if (data.success) {
                message.success('Đã xóa bài đăng!')
                if (account) fetchScheduledPosts(account._id)
            } else {
                message.error('Xóa thất bại')
            }
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        }
    }

    const handleAddNew = () => {
        setEditingPost(null)
        setIsModalOpen(true)
    }

    // Prompt handlers
    const fetchPrompts = async (accountId: string) => {
        try {
            setPromptsLoading(true)
            const response = await fetch(`/api/prompts?accountId=${accountId}`)
            const data = await response.json()

            if (data.success) {
                setPrompts(data.data)
            } else {
                console.error('❌ Failed to fetch prompts:', data.error)
            }
        } catch (error: any) {
            console.error('❌ Prompts Error:', error)
        } finally {
            setPromptsLoading(false)
        }
    }

    const handleAddPrompt = () => {
        setEditingPrompt(null)
        setIsPromptModalOpen(true)
    }

    const handleEditPrompt = (prompt: any) => {
        setEditingPrompt(prompt)
        setIsPromptModalOpen(true)
    }

    const handleDeletePrompt = async (promptId: string) => {
        try {
            const response = await fetch(`/api/prompts?id=${promptId}`, {
                method: 'DELETE'
            })
            const data = await response.json()

            if (data.success) {
                message.success('Đã xóa prompt!')
                if (account) fetchPrompts(account._id)
            } else {
                message.error('Xóa thất bại')
            }
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        }
    }

    const handleCopyPromptContent = (content: string) => {
        navigator.clipboard.writeText(content)
        message.success('Đã copy nội dung prompt!')
    }

    const fetchScheduledPosts = async (accountId: string) => {
        try {
            setPostsLoading(true)
            const response = await fetch(`/api/tiktok-scheduled-posts?accountId=${accountId}`)
            const data = await response.json()

            if (data.success) {
                setScheduledPosts(data.data)
            } else {
                console.error('❌ Failed to fetch posts:', data.error)
            }
        } catch (error: any) {
            console.error('❌ Posts Error:', error)
        } finally {
            setPostsLoading(false)
        }
    }

    const fetchProducts = async (cookie: string) => {
        try {
            setProductsLoading(true)
            const response = await fetch('/api/tiktok/showcase-products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cookie: cookie,
                    offset: 0,
                    count: 100
                })
            })

            const data = await response.json()

            if (data.success && data?.data?.data?.products) {
                setProducts(data.data.data.products)
            } else {
                message.error('Không thể tải danh sách sản phẩm')
            }
        } catch (error: any) {
            message.error('Lỗi khi tải sản phẩm: ' + error.message)
        } finally {
            setProductsLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spin size="large" />
            </div>
        )
    }

    if (!account) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-600">Account không tồn tại</h1>
                    <p className="text-gray-400 mt-2">Username: @{username}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="">
            {/* Account Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    {account.avatar?.url ? (
                        <img
                            src={account.avatar.url}
                            alt={account.displayName}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-100">
                            <UserOutlined className="text-2xl text-gray-400" />
                        </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg font-bold text-gray-800 mb-1 truncate">
                            {account.displayName}
                        </h1>
                        <p className="text-sm text-blue-600 font-mono mb-1">
                            @{account.username}
                        </p>
                        <p className="text-xs text-gray-500 truncate mb-1">
                            {account.email}
                        </p>
                        <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400 font-mono truncate">
                                ID: {account._id}
                            </span>
                            <Button
                                type="text"
                                size="small"
                                icon={<CopyOutlined />}
                                onClick={() => {
                                    navigator.clipboard.writeText(account._id)
                                    message.success('Đã copy Account ID!')
                                }}
                                className="!p-0 !h-5 !w-5 !min-w-0"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scheduled Posts */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold">
                        Lịch đăng bài ({scheduledPosts.length})
                    </h2>
                    <Button
                        type="primary"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={handleAddNew}
                    >
                        Thêm
                    </Button>
                </div>

                {postsLoading ? (
                    <div className="text-center py-4">
                        <Spin size="small" />
                    </div>
                ) : scheduledPosts.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                        Chưa có lịch đăng bài
                    </p>
                ) : (
                    <div className="space-y-3">
                        {scheduledPosts.map((post: any) => (
                            <div
                                key={post._id}
                                className="border rounded-lg p-3 flex gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => handleEditPost(post)}
                            >
                                {/* Video Thumbnail */}
                                {post.video?.url && (
                                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                                        <video
                                            src={post.video.url}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Post Info */}
                                <div className="flex-1 min-w-0">
                                    {/* Schedule Time */}
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-semibold text-blue-600">
                                            {(() => {
                                                const date = dayjs(post.scheduledDate, 'DD/MM/YYYY')
                                                const today = dayjs()
                                                const tomorrow = dayjs().add(1, 'day')

                                                if (date.isSame(today, 'day')) {
                                                    return `(Hôm nay) - ${post.scheduledDate}`
                                                }
                                                if (date.isSame(tomorrow, 'day')) {
                                                    return `(Ngày mai) - ${post.scheduledDate}`
                                                }
                                                return post.scheduledDate
                                            })()}
                                        </span>
                                        <span className="text-xs font-semibold text-blue-600">
                                            {post.scheduledTime}
                                        </span>
                                    </div>

                                    {/* Product */}
                                    {post.productTitle && (
                                        <div className="text-xs text-gray-700 mb-1 truncate">
                                            📦 {post.productTitle}
                                        </div>
                                    )}

                                    {/* Description */}
                                    <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                                        {post.description}
                                    </p>

                                    {/* Status */}
                                    <div className="flex items-center justify-between mt-2">
                                        <span className={`text-xs px-2 py-0.5 rounded ${post.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                                            post.status === 'scheduled' ? 'bg-yellow-100 text-yellow-700' :
                                                post.status === 'posted' ? 'bg-green-100 text-green-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {post.status === 'draft' ? 'Nháp' :
                                                post.status === 'scheduled' ? 'Chờ đăng' :
                                                    post.status === 'posted' ? 'Đã đăng' : 'Thất bại'}
                                        </span>

                                        {/* Action Buttons */}
                                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                                            <Popconfirm
                                                title="Xóa bài đăng?"
                                                description="Bạn có chắc muốn xóa bài này?"
                                                onConfirm={() => handleDeletePost(post._id)}
                                                okText="Xóa"
                                                cancelText="Hủy"
                                                okButtonProps={{ danger: true }}
                                            >
                                                <Button
                                                    type="text"
                                                    size="small"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                />
                                            </Popconfirm>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Prompts Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold">
                        Prompt ({prompts.length})
                    </h2>
                    <Button
                        type="primary"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={handleAddPrompt}
                    >
                        Thêm
                    </Button>
                </div>

                {promptsLoading ? (
                    <div className="text-center py-4">
                        <Spin size="small" />
                    </div>
                ) : prompts.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                        Chưa có prompt nào
                    </p>
                ) : (
                    <div className="space-y-3">
                        {prompts.map((prompt: any) => (
                            <div
                                key={prompt._id}
                                className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-gray-800 mb-1">
                                            {prompt.title}
                                        </h3>
                                        <p className="text-xs text-gray-600 line-clamp-3 whitespace-pre-wrap">
                                            {prompt.content}
                                        </p>
                                    </div>
                                    <div className="flex gap-1 flex-shrink-0">
                                        <Button
                                            type="text"
                                            size="small"
                                            icon={<CopyOutlined />}
                                            onClick={() => handleCopyPromptContent(prompt.content)}
                                            title="Copy nội dung"
                                        />
                                        <Button
                                            type="text"
                                            size="small"
                                            icon={<EditOutlined />}
                                            onClick={() => handleEditPrompt(prompt)}
                                            title="Sửa"
                                        />
                                        <Popconfirm
                                            title="Xóa prompt?"
                                            description="Bạn có chắc muốn xóa prompt này?"
                                            onConfirm={() => handleDeletePrompt(prompt._id)}
                                            okText="Xóa"
                                            cancelText="Hủy"
                                            okButtonProps={{ danger: true }}
                                        >
                                            <Button
                                                type="text"
                                                size="small"
                                                danger
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
            </div>

            {/* Content Area - Products */}
            <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-base font-semibold mb-3">
                    Danh sách sản phẩm ({products.length})
                </h2>

                {productsLoading ? (
                    <div className="text-center py-8">
                        <Spin />
                        <p className="text-sm text-gray-500 mt-2">Đang tải sản phẩm...</p>
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-8">
                        Chưa có sản phẩm nào
                    </p>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {products.map((product: any, index: number) => (
                            <div key={index} className="border rounded-lg p-2 hover:shadow-md transition-shadow">
                                {/* Product Image */}
                                {product.images[0].url_list[0] && (
                                    <img
                                        src={product.images[0].url_list[0]}
                                        alt={product.title}
                                        className="w-full h-32 object-cover rounded mb-2"
                                    />
                                )}

                                {/* Product Info */}
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <h3 className="text-sm font-medium line-clamp-2 flex-1">
                                        {product.title}
                                    </h3>
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<CopyOutlined />}
                                        onClick={() => {
                                            navigator.clipboard.writeText(product.title)
                                            message.success('Đã copy tên sản phẩm!')
                                        }}
                                        className="flex-shrink-0"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-red-600 font-semibold">
                                        {product.affiliate_info.commission_with_currency}
                                    </span>
                                    {product.stock_num && (
                                        <span className="text-xs text-gray-500">
                                            còn {product.stock_num}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {account && (
                <TikTokScheduledPostModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    accountId={account._id}
                    products={products}
                    editingPost={editingPost}
                    onRefresh={() => fetchScheduledPosts(account._id)}
                />
            )}

            {account && (
                <PromptModal
                    isOpen={isPromptModalOpen}
                    setIsOpen={setIsPromptModalOpen}
                    accountId={account._id}
                    editingPrompt={editingPrompt}
                    onRefresh={() => fetchPrompts(account._id)}
                />
            )}
        </div>
    )
}
