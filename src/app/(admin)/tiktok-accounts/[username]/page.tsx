'use client'

import AutoFlowModal from '@/components/shop/tiktok-accounts/AutoFlowModal'
import PromptSection from '@/components/shop/tiktok-accounts/PromptSection'
import TikTokScheduledPostModal from '@/components/shop/tiktok-accounts/TikTokScheduledPostModal'
import Veo3MediaSection from '@/components/shop/tiktok-accounts/Veo3MediaSection'
import {
    CopyOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    PlusOutlined,
    RightOutlined,
    UserOutlined
} from '@ant-design/icons'
import { App, Button, Popconfirm, Spin, Switch } from 'antd'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

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
    const [autoflows, setAutoflows] = useState<any[]>([])
    const [promptsCollapsed, setPromptsCollapsed] = useState(true)
    const [veo3MediaCollapsed, setVeo3MediaCollapsed] = useState(true)
    const [productsCollapsed, setProductsCollapsed] = useState(true)
    const promptsLoadedRef = useRef(false)
    const veo3MediaLoadedRef = useRef(false)
    const [autoflowsLoading, setAutoflowsLoading] = useState(false)
    const [isAutoFlowModalOpen, setIsAutoFlowModalOpen] = useState(false)
    const [editingAutoFlow, setEditingAutoFlow] = useState<any>(null)
    const [allPrompts, setAllPrompts] = useState<any[]>([])
    const [promptsLoading, setPromptsLoading] = useState(false)

    const [veo3Media, setVeo3Media] = useState<any[]>([])
    const [veo3MediaLoading, setVeo3MediaLoading] = useState(false)

    const [shopeeLinks, setShopeeLinks] = useState<any[]>([])

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
                        // Fetch products, scheduled posts, autoflows, prompts, etc.
                        fetchProducts(foundAccount.cookie)
                        fetchScheduledPosts(foundAccount._id)
                        fetchAutoFlows(foundAccount._id)
                        fetchShopeeLinks()
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

    // Shopee Links
    const fetchShopeeLinks = async () => {
        try {
            const response = await fetch('/api/shopee-links')
            const data = await response.json()
            if (data.success) {
                setShopeeLinks(data.data)
            }
        } catch (error: any) {
            console.error('❌ ShopeeLinks Error:', error)
        }
    }

    // AutoFlow handlers
    const fetchAutoFlows = async (accountId: string) => {
        try {
            setAutoflowsLoading(true)
            const response = await fetch(`/api/autoflows?accountId=${accountId}`)
            const data = await response.json()

            if (data.success) {
                setAutoflows(data.data)
            } else {
                console.error('❌ Failed to fetch autoflows:', data.error)
            }
        } catch (error: any) {
            console.error('❌ AutoFlows Error:', error)
        } finally {
            setAutoflowsLoading(false)
        }
    }

    const handleAddAutoFlow = () => {
        setEditingAutoFlow(null)
        setIsAutoFlowModalOpen(true)
        if (!promptsLoadedRef.current) fetchPrompts()
        if (!veo3MediaLoadedRef.current && account) fetchVeo3Media(account._id)
    }

    const handleEditAutoFlow = (autoflow: any) => {
        setEditingAutoFlow(autoflow)
        setIsAutoFlowModalOpen(true)
        if (!promptsLoadedRef.current) fetchPrompts()
        if (!veo3MediaLoadedRef.current && account) fetchVeo3Media(account._id)
    }

    const handleDeleteAutoFlow = async (autoflowId: string) => {
        try {
            const response = await fetch(`/api/autoflows?id=${autoflowId}`, {
                method: 'DELETE'
            })
            const data = await response.json()

            if (data.success) {
                message.success('Đã xóa AutoFlow!')
                if (account) fetchAutoFlows(account._id)
            } else {
                message.error('Xóa thất bại')
            }
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        }
    }

    const handleToggleAutoFlow = async (autoflow: any, enabled: boolean) => {
        try {
            const response = await fetch('/api/autoflows', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: autoflow._id, enabled })
            })
            const data = await response.json()

            if (data.success) {
                message.success(enabled ? 'Đã bật AutoFlow!' : 'Đã tắt AutoFlow!')
                if (account) fetchAutoFlows(account._id)
            } else {
                message.error('Cập nhật thất bại')
            }
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        }
    }

    // Prompt Library
    const fetchPrompts = async () => {
        try {
            setPromptsLoading(true)
            const response = await fetch('/api/prompts')
            const data = await response.json()
            if (data.success) {
                setAllPrompts(data.data)
                promptsLoadedRef.current = true
            }
        } catch (error: any) {
            console.error('❌ Prompts Error:', error)
        } finally {
            setPromptsLoading(false)
        }
    }

    const handleTogglePrompts = () => {
        const willExpand = promptsCollapsed
        setPromptsCollapsed(!promptsCollapsed)
        if (willExpand && !promptsLoadedRef.current) {
            fetchPrompts()
        }
    }

    // Veo3 Media
    const fetchVeo3Media = async (accountId: string) => {
        try {
            setVeo3MediaLoading(true)
            const response = await fetch(`/api/veo3-media?accountId=${accountId}`)
            const data = await response.json()
            if (data.success) {
                setVeo3Media(data.data)
                veo3MediaLoadedRef.current = true
            }
        } catch (error: any) {
            console.error('❌ Veo3 Media Error:', error)
        } finally {
            setVeo3MediaLoading(false)
        }
    }

    const handleToggleVeo3Media = () => {
        const willExpand = veo3MediaCollapsed
        setVeo3MediaCollapsed(!veo3MediaCollapsed)
        if (willExpand && !veo3MediaLoadedRef.current && account) {
            fetchVeo3Media(account._id)
        }
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
                    <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-400">Account không tồn tại</h1>
                    <p className="text-gray-400 dark:text-gray-500 mt-2">Username: @{username}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="">
            {/* Account Header */}
            <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center gap-4">
                    {/* Avatar */}
                    {account.avatar?.url ? (
                        <img
                            src={account.avatar.url}
                            alt={account.displayName}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 dark:border-gray-700"
                        />
                    ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-100 dark:border-gray-600">
                            <UserOutlined className="text-2xl text-gray-400 dark:text-gray-500" />
                        </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-1 truncate">
                            {account.displayName}
                        </h1>
                        <p className="text-sm text-blue-600 font-mono mb-1">
                            @{account.username}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-1">
                            {account.email}
                        </p>
                        <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400 dark:text-gray-500 font-mono truncate">
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
            <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
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
                {(() => {
                    const apiUrl = `${window.location.origin}/api/tiktok-scheduled-posts?accountId=${account._id}`
                    return (
                        <div className="flex items-center gap-2 mb-3 bg-gray-50 dark:bg-black/30 px-2 py-1 rounded">
                            <a href={apiUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 dark:text-blue-400 font-mono truncate flex-1 hover:underline">
                                {apiUrl}
                            </a>
                            <Button
                                type="text"
                                size="small"
                                icon={<CopyOutlined />}
                                onClick={() => {
                                    navigator.clipboard.writeText(apiUrl)
                                    message.success('Đã copy API URL!')
                                }}
                                className="!p-0 !h-5 !w-5 !min-w-0 text-blue-700 dark:text-blue-400"
                            />
                        </div>
                    )
                })()}

                {postsLoading ? (
                    <div className="text-center py-4">
                        <Spin size="small" />
                    </div>
                ) : scheduledPosts.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                        Chưa có lịch đăng bài
                    </p>
                ) : (
                    <div className="space-y-3">
                        {scheduledPosts.map((post: any) => (
                            <div
                                key={post._id}
                                className="border dark:border-gray-700 rounded-lg p-3 flex gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => handleEditPost(post)}
                            >
                                {/* Video Thumbnail */}
                                {post.video?.url && (
                                    <div className="w-20 h-20 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden">
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
                                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
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
                                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                                            {post.scheduledTime}
                                        </span>
                                    </div>

                                    {/* Product */}
                                    {post.productTitle && (
                                        <div className="text-xs text-gray-700 dark:text-gray-300 mb-1 truncate">
                                            📦 {post.productTitle}
                                        </div>
                                    )}

                                    {/* Description */}
                                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-1">
                                        {post.description}
                                    </p>

                                    {/* Status */}
                                    <div className="flex items-center justify-between mt-2">
                                        <span className={`text-xs px-2 py-0.5 rounded ${post.status === 'draft' ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300' :
                                            post.status === 'scheduled' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                                                post.status === 'posted' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                                                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
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


            {/* AutoFlow Section */}
            <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
                        ⚡ AutoFlow ({autoflows.length})
                    </h2>
                    <Button
                        type="primary"
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={handleAddAutoFlow}
                        disabled={products.length === 0}
                    >
                        Thêm
                    </Button>
                </div>

                {autoflowsLoading ? (
                    <div className="text-center py-4">
                        <Spin size="small" />
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                        Cần có sản phẩm trước khi tạo AutoFlow
                    </p>
                ) : autoflows.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                        Chưa có AutoFlow nào
                    </p>
                ) : (
                    <div className="space-y-4">
                        {autoflows.map((autoflow: any) => (
                            <div key={autoflow._id} className="border dark:border-gray-700 rounded-lg overflow-hidden">
                                {/* AutoFlow Header */}
                                <div className={`bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 px-3 py-2 border-b dark:border-gray-700 ${!autoflow.enabled ? 'opacity-60' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        <Switch
                                            checked={autoflow.enabled}
                                            onChange={(checked) => handleToggleAutoFlow(autoflow, checked)}
                                            size="small"
                                        />

                                        {autoflow.productImage && (
                                            <img
                                                src={autoflow.productImage}
                                                alt={autoflow.productTitle}
                                                className="w-8 h-8 rounded object-cover flex-shrink-0"
                                            />
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <span className="text-sm font-semibold text-blue-900 dark:text-blue-200 truncate block">
                                                📦 {autoflow.productTitle || 'Sản phẩm không xác định'}
                                            </span>
                                            {autoflow.description && (
                                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate mt-0.5">
                                                    📝 {autoflow.description}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-blue-700 dark:text-blue-300">
                                                    {autoflow.prompts?.length || 0} prompt{(autoflow.prompts?.length || 0) !== 1 ? 's' : ''}
                                                </span>
                                                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${autoflow.status === 'running' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                                    autoflow.status === 'done' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                                                        autoflow.status === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                                                            'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                                    }`}>
                                                    {autoflow.status === 'running' ? '🔄 Running' :
                                                        autoflow.status === 'done' ? '✅ Done' :
                                                            autoflow.status === 'error' ? '❌ Error' :
                                                                '⏳ Pending'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex gap-1 flex-shrink-0">
                                            <Button
                                                type="text"
                                                size="small"
                                                icon={<EditOutlined />}
                                                onClick={() => handleEditAutoFlow(autoflow)}
                                                title="Sửa AutoFlow"
                                                className="text-blue-700"
                                            />
                                            <Popconfirm
                                                title="Xóa AutoFlow?"
                                                description="AutoFlow sẽ bị xóa. Prompts vẫn được giữ lại."
                                                onConfirm={() => handleDeleteAutoFlow(autoflow._id)}
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

                                    {/* API Endpoint */}
                                    {(() => {
                                        const fullUrl = autoflow.autoFlowUrl || `${window.location.origin}/api/autoflows?accountId=${autoflow.accountId}&productId=${autoflow.productId}`
                                        return (
                                            <div className="flex items-center gap-2 mt-1.5 bg-white/50 dark:bg-black/30 px-2 py-1 rounded">
                                                <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 dark:text-blue-400 font-mono truncate flex-1 hover:underline">
                                                    {fullUrl}
                                                </a>
                                                <Button
                                                    type="text"
                                                    size="small"
                                                    icon={<CopyOutlined />}
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(fullUrl)
                                                        message.success('Đã copy API URL!')
                                                    }}
                                                    className="!p-0 !h-5 !w-5 !min-w-0 text-blue-700"
                                                />
                                            </div>
                                        )
                                    })()}

                                    {/* n8n URL */}
                                    {autoflow.n8nUrl && (
                                        <div className="flex items-center gap-2 mt-1 bg-white/50 dark:bg-black/30 px-2 py-1 rounded">
                                            <a href={autoflow.n8nUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-green-700 dark:text-green-400 font-mono truncate flex-1 hover:underline">
                                                🔗 {autoflow.n8nUrl}
                                            </a>
                                            <Button
                                                type="text"
                                                size="small"
                                                icon={<CopyOutlined />}
                                                onClick={() => {
                                                    navigator.clipboard.writeText(autoflow.n8nUrl)
                                                    message.success('Đã copy n8n URL!')
                                                }}
                                                className="!p-0 !h-5 !w-5 !min-w-0 text-green-700"
                                            />
                                        </div>
                                    )}

                                    {/* Reference Images on AutoFlow */}
                                    {autoflow.referenceImages?.length > 0 && (
                                        <div className="flex flex-wrap items-center gap-1.5 mt-1 bg-white/50 dark:bg-black/30 px-2 py-1 rounded">
                                            <span className="text-[10px] text-gray-500 dark:text-gray-400 mr-1">🖼️ Ref:</span>
                                            {autoflow.referenceImages.map((ref: any, idx: number) => {
                                                const media = veo3Media.find((m: any) => m.mediaId === ref.mediaId)
                                                return (
                                                    <div key={idx} className="flex items-center gap-1">
                                                        {media?.mediaFile?.url ? (
                                                            <img
                                                                src={media.mediaFile.url}
                                                                alt={ref.mediaId}
                                                                className="w-6 h-6 rounded object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                                <span className="text-[8px] text-gray-400">🎬</span>
                                                            </div>
                                                        )}
                                                        <span className="text-xs text-blue-600 dark:text-blue-400 font-mono truncate max-w-[120px]">
                                                            {ref.mediaId}
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Selected Prompts (read-only) */}
                                <div className="divide-y dark:divide-gray-700">
                                    {(autoflow.prompts || []).length === 0 ? (
                                        <p className="text-xs text-gray-400 dark:text-gray-500 text-center py-3">
                                            Chưa chọn prompt nào — nhấn ✏️ để chọn từ Prompt Library
                                        </p>
                                    ) : (
                                        autoflow.prompts.map((prompt: any) => (
                                            <div key={prompt._id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                <div className="flex items-start gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                                                            {prompt.title}
                                                        </h3>
                                                        {prompt.type && (
                                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium mb-1 inline-block ${prompt.type === 'hook' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'}`}>
                                                                {prompt.type === 'hook' ? '🪝 Hook' : '📝 Describe'}
                                                            </span>
                                                        )}

                                                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 whitespace-pre-wrap">
                                                            {prompt.content}
                                                        </p>
                                                        {prompt.subPrompt && (
                                                            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 line-clamp-2 whitespace-pre-wrap italic">
                                                                📝 {prompt.subPrompt}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <Button
                                                        type="text"
                                                        size="small"
                                                        icon={<CopyOutlined />}
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(prompt.content)
                                                            message.success('Đã copy nội dung prompt!')
                                                        }}
                                                        title="Copy nội dung"
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Videos — only show if first prompt is not describe type */}
                                {(() => {
                                    const firstPromptType = autoflow.prompts?.[0]?.type
                                    if (firstPromptType === 'describe') return null
                                    const videos = autoflow.videoFiles?.length
                                        ? autoflow.videoFiles
                                        : autoflow.videoFile?.url
                                            ? [autoflow.videoFile]
                                            : []
                                    return videos.length > 0 && (
                                        <div className="px-3 py-2 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1.5">🎬 Videos ({videos.length})</p>
                                            <div className="space-y-2">
                                                {videos.map((video: any, idx: number) => (
                                                    <video
                                                        key={video.publicId || idx}
                                                        src={video.url}
                                                        controls
                                                        className="w-full max-h-40 rounded-lg bg-black"
                                                        preload="metadata"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )
                                })()}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Prompt Library Section */}
            <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between cursor-pointer select-none" onClick={handleTogglePrompts}>
                    <h2 className="text-base font-semibold flex items-center gap-2">
                        {promptsCollapsed ? <RightOutlined className="text-xs text-gray-400" /> : <DownOutlined className="text-xs text-gray-400" />}
                        📝 Prompt Library ({allPrompts.length})
                    </h2>
                </div>

                {!promptsCollapsed && (
                    <div className="mt-3">
                        <PromptSection
                            allPrompts={allPrompts}
                            promptsLoading={promptsLoading}
                            onRefresh={fetchPrompts}
                            onAutoFlowRefresh={() => account && fetchAutoFlows(account._id)}
                        />
                    </div>
                )}
            </div>

            {/* Veo3 Media Section */}
            <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between cursor-pointer select-none" onClick={handleToggleVeo3Media}>
                    <h2 className="text-base font-semibold flex items-center gap-2">
                        {veo3MediaCollapsed ? <RightOutlined className="text-xs text-gray-400" /> : <DownOutlined className="text-xs text-gray-400" />}
                        🎬 Veo3 Media ({veo3Media.length})
                    </h2>
                </div>

                {!veo3MediaCollapsed && account && (
                    <div className="mt-3">
                        <Veo3MediaSection
                            accountId={account._id}
                            veo3Media={veo3Media}
                            veo3MediaLoading={veo3MediaLoading}
                            onRefresh={() => fetchVeo3Media(account._id)}
                        />
                    </div>
                )}
            </div>
            {/* Content Area - Products */}
            <div className="bg-white dark:bg-[#1f1f1f] rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => setProductsCollapsed(!productsCollapsed)}>
                    <h2 className="text-base font-semibold flex items-center gap-2">
                        {productsCollapsed ? <RightOutlined className="text-xs text-gray-400" /> : <DownOutlined className="text-xs text-gray-400" />}
                        📦 Danh sách sản phẩm ({products.length})
                    </h2>
                </div>

                {!productsCollapsed && (
                    <div className="mt-3">
                        {productsLoading ? (
                            <div className="text-center py-8">
                                <Spin />
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Đang tải sản phẩm...</p>
                            </div>
                        ) : products.length === 0 ? (
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                                Chưa có sản phẩm nào
                            </p>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                {products.map((product: any, index: number) => (
                                    <div key={index} className="border dark:border-gray-700 rounded-lg p-2 hover:shadow-md transition-shadow">
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
                                            <h3 className="text-sm font-medium line-clamp-2 flex-1 text-gray-800 dark:text-gray-200">
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
                                            <span className="text-xs text-red-600 dark:text-red-400 font-semibold">
                                                {product.affiliate_info.commission_with_currency}
                                            </span>
                                            {product.stock_num && (
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    còn {product.stock_num}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
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
                <AutoFlowModal
                    isOpen={isAutoFlowModalOpen}
                    setIsOpen={setIsAutoFlowModalOpen}
                    accountId={account._id}
                    products={products}
                    autoflows={autoflows}
                    editingAutoFlow={editingAutoFlow}
                    onRefresh={() => fetchAutoFlows(account._id)}
                    shopeeLinks={shopeeLinks}
                    allPrompts={allPrompts}
                    veo3Media={veo3Media}
                />
            )}

        </div>
    )
}
