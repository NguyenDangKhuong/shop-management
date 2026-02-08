'use client'

import { deleteCloudinaryImage } from '@/actions/cloudinary'
import AutoFlowModal from '@/components/shop/tiktok-accounts/AutoFlowModal'
import PromptModal from '@/components/shop/tiktok-accounts/PromptModal'
import TikTokScheduledPostModal from '@/components/shop/tiktok-accounts/TikTokScheduledPostModal'
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload'
import { veo3MediaUploadConfig } from '@/utils/cloudinaryConfig'
import { apiPost } from '@/utils/internalApi'
import {
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    HolderOutlined,
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons'
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { App, Button, Input, Popconfirm, Spin, Switch } from 'antd'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

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

// Sortable Prompt Item for drag-and-drop reordering
const SortablePromptItem = ({
    prompt,
    onCopy,
    onEdit,
    onDelete,
    veo3Media = []
}: {
    prompt: any
    onCopy: (content: string) => void
    onEdit: (prompt: any) => void
    onDelete: (id: string) => void
    veo3Media?: any[]
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: prompt._id })

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="p-3 hover:bg-gray-50 transition-colors"
        >
            <div className="flex items-start gap-2">
                <div
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing pt-0.5 text-gray-400 hover:text-gray-600"
                >
                    <HolderOutlined />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">
                        {prompt.title}
                    </h3>
                    {prompt.mediaId && (() => {
                        const media = veo3Media.find((m: any) => m.mediaId === prompt.mediaId)
                        return (
                            <div className="flex items-center gap-1.5 mb-1">
                                {media?.mediaFile?.url ? (
                                    <img
                                        src={media.mediaFile.url}
                                        alt={prompt.mediaId}
                                        className="w-6 h-6 rounded object-cover"
                                    />
                                ) : (
                                    <div className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center">
                                        <span className="text-[8px] text-gray-400">🎬</span>
                                    </div>
                                )}
                                <span className="text-xs text-blue-600 font-mono truncate max-w-[120px]">
                                    {prompt.mediaId}
                                </span>
                            </div>
                        )
                    })()}
                    <p className="text-xs text-gray-600 line-clamp-3 whitespace-pre-wrap">
                        {prompt.content}
                    </p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                    <Button
                        type="text"
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={() => onCopy(prompt.content)}
                        title="Copy nội dung"
                    />
                    <Button
                        type="text"
                        size="small"
                        icon={<EditOutlined />}
                        onClick={() => onEdit(prompt)}
                        title="Sửa"
                    />
                    <Popconfirm
                        title="Xóa prompt?"
                        description="Bạn có chắc muốn xóa prompt này?"
                        onConfirm={() => onDelete(prompt._id)}
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
    )
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
    const [autoflowsLoading, setAutoflowsLoading] = useState(false)
    const [isAutoFlowModalOpen, setIsAutoFlowModalOpen] = useState(false)
    const [editingAutoFlow, setEditingAutoFlow] = useState<any>(null)
    const [isPromptModalOpen, setIsPromptModalOpen] = useState(false)
    const [editingPrompt, setEditingPrompt] = useState<any>(null)
    const [promptProductId, setPromptProductId] = useState<string>('')
    const [veo3Media, setVeo3Media] = useState<any[]>([])
    const [veo3MediaLoading, setVeo3MediaLoading] = useState(false)
    const [newMediaId, setNewMediaId] = useState('')
    const [newMediaFile, setNewMediaFile] = useState<{ url: string; type: string; publicId?: string } | null>(null)
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
                        // Fetch products, scheduled posts, and autoflows after account is loaded
                        fetchProducts(foundAccount.cookie)
                        fetchScheduledPosts(foundAccount._id)
                        fetchAutoFlows(foundAccount._id)
                        fetchVeo3Media(foundAccount._id)
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
    }

    const handleEditAutoFlow = (autoflow: any) => {
        setEditingAutoFlow(autoflow)
        setIsAutoFlowModalOpen(true)
    }

    const handleDeleteAutoFlow = async (autoflowId: string) => {
        try {
            const response = await fetch(`/api/autoflows?id=${autoflowId}`, {
                method: 'DELETE'
            })
            const data = await response.json()

            if (data.success) {
                message.success('Đã xóa AutoFlow và tất cả prompts!')
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

    // Prompt handlers (within an autoflow)
    const handleAddPrompt = (productId: string) => {
        setPromptProductId(productId)
        setEditingPrompt(null)
        setIsPromptModalOpen(true)
    }

    const handleEditPrompt = (prompt: any) => {
        setPromptProductId(prompt.productId)
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
                if (account) fetchAutoFlows(account._id)
            } else {
                message.error('Xóa thất bại')
            }
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        }
    }

    // Drag-and-drop prompt reorder
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 }
        })
    )

    const handlePromptDragEnd = async (event: DragEndEvent, autoflow: any) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const prompts = autoflow.prompts || []
        const oldIndex = prompts.findIndex((p: any) => p._id === active.id)
        const newIndex = prompts.findIndex((p: any) => p._id === over.id)

        const newPrompts = arrayMove(prompts, oldIndex, newIndex)

        // Optimistically update UI
        setAutoflows(prev =>
            prev.map((af: any) =>
                af._id === autoflow._id
                    ? { ...af, prompts: newPrompts }
                    : af
            )
        )

        // Save new order to DB
        const items = newPrompts.map((p: any, index: number) => ({
            id: p._id,
            order: index
        }))

        const result = await apiPost('/api/prompts/reorder', { items })
        if (!result.success) {
            message.error('Không thể cập nhật thứ tự')
            if (account) fetchAutoFlows(account._id)
        }
    }

    const handleCopyPromptContent = (content: string) => {
        navigator.clipboard.writeText(content)
        message.success('Đã copy nội dung prompt!')
    }

    // Veo3 Media handlers
    const uploadTargetIdRef = useRef<string | null>(null)

    const fetchVeo3Media = async (accountId: string) => {
        try {
            setVeo3MediaLoading(true)
            const response = await fetch(`/api/veo3-media?accountId=${accountId}`)
            const data = await response.json()
            if (data.success) {
                setVeo3Media(data.data)
            }
        } catch (error: any) {
            console.error('❌ Veo3 Media Error:', error)
        } finally {
            setVeo3MediaLoading(false)
        }
    }

    const handleAddVeo3Media = async () => {
        if (!newMediaId.trim() || !account) return
        try {
            const body: any = {
                accountId: account._id,
                mediaId: newMediaId.trim()
            }
            if (newMediaFile) {
                body.mediaFile = newMediaFile
            }
            const response = await fetch('/api/veo3-media', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            const data = await response.json()
            if (data.success) {
                message.success('Đã thêm media!')
                setNewMediaId('')
                setNewMediaFile(null)
                fetchVeo3Media(account._id)
            } else {
                message.error('Thêm thất bại: ' + data.error)
            }
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        }
    }

    // Upload for new media (in the add section)
    const onNewMediaUploadSuccess = useCallback((result: any) => {
        setNewMediaFile({
            url: result.url,
            type: result.resourceType === 'video' ? 'video' : 'image',
            publicId: result.publicId
        })
        message.success('Upload thành công!')
    }, [message])

    const { openWidget: openNewMediaWidget } = useCloudinaryUpload(
        veo3MediaUploadConfig,
        onNewMediaUploadSuccess,
        (err) => message.error('Upload thất bại: ' + err?.message)
    )

    const handleDeleteVeo3Media = async (mediaId: string, publicId?: string) => {
        try {
            if (publicId) {
                await deleteCloudinaryImage(publicId)
            }
            const response = await fetch(`/api/veo3-media?id=${mediaId}`, {
                method: 'DELETE'
            })
            const data = await response.json()
            if (data.success) {
                message.success('Đã xóa media!')
                if (account) fetchVeo3Media(account._id)
            } else {
                message.error('Xóa thất bại')
            }
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        }
    }

    const handleRemoveVeo3MediaImage = async (mediaDocId: string, publicId: string) => {
        try {
            await deleteCloudinaryImage(publicId)
            const response = await fetch('/api/veo3-media', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: mediaDocId,
                    mediaFile: null
                })
            })
            const data = await response.json()
            if (data.success) {
                message.success('Đã xóa hình!')
                if (account) fetchVeo3Media(account._id)
            }
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        }
    }

    const onUploadSuccess = useCallback(async (result: any) => {
        const targetId = uploadTargetIdRef.current
        if (!targetId) return
        try {
            const response = await fetch('/api/veo3-media', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: targetId,
                    mediaFile: {
                        url: result.url,
                        type: result.resourceType === 'video' ? 'video' : 'image',
                        publicId: result.publicId
                    }
                })
            })
            const data = await response.json()
            if (data.success) {
                message.success('Upload thành công!')
                if (account) fetchVeo3Media(account._id)
            }
        } catch (error: any) {
            message.error('Lỗi khi lưu: ' + error.message)
        }
        uploadTargetIdRef.current = null
    }, [account, message])

    const { openWidget } = useCloudinaryUpload(
        veo3MediaUploadConfig,
        onUploadSuccess,
        (err) => message.error('Upload thất bại: ' + err?.message)
    )

    const handleUploadVeo3Media = (mediaDocId: string) => {
        uploadTargetIdRef.current = mediaDocId
        openWidget()
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


            {/* AutoFlow Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold">
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
                    <p className="text-sm text-gray-500 text-center py-4">
                        Cần có sản phẩm trước khi tạo AutoFlow
                    </p>
                ) : autoflows.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                        Chưa có AutoFlow nào
                    </p>
                ) : (
                    <div className="space-y-4">
                        {autoflows.map((autoflow: any) => (
                            <div key={autoflow._id} className="border rounded-lg overflow-hidden">
                                {/* AutoFlow Header */}
                                <div className={`bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-2 border-b ${!autoflow.enabled ? 'opacity-60' : ''}`}>
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
                                            <span className="text-sm font-semibold text-blue-900 truncate block">
                                                📦 {autoflow.productTitle || 'Sản phẩm không xác định'}
                                            </span>
                                            {autoflow.description && (
                                                <p className="text-xs text-gray-600 truncate mt-0.5">
                                                    📝 {autoflow.description}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-blue-700">
                                                    {autoflow.prompts?.length || 0} prompt{(autoflow.prompts?.length || 0) !== 1 ? 's' : ''}
                                                </span>
                                                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${autoflow.status === 'running' ? 'bg-blue-100 text-blue-700' :
                                                        autoflow.status === 'done' ? 'bg-green-100 text-green-700' :
                                                            autoflow.status === 'error' ? 'bg-red-100 text-red-700' :
                                                                'bg-gray-100 text-gray-600'
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
                                                icon={<PlusOutlined />}
                                                onClick={() => handleAddPrompt(autoflow.productId)}
                                                title="Thêm prompt"
                                                className="text-blue-700"
                                            />
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
                                                description="Sẽ xóa tất cả prompts của AutoFlow này!"
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
                                    <div className="flex items-center gap-2 mt-1.5 bg-white/50 px-2 py-1 rounded">
                                        <a href={autoflow.autoFlowUrl || `${window.location.origin}/api/autoflows?accountId=${autoflow.accountId}&productId=${autoflow.productId}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-700 font-mono truncate flex-1 hover:underline">
                                            {autoflow.autoFlowUrl || `${window.location.origin}/api/autoflows?accountId=${autoflow.accountId}&productId=${autoflow.productId}`}
                                        </a>
                                        <Button
                                            type="text"
                                            size="small"
                                            icon={<CopyOutlined />}
                                            onClick={() => {
                                                const url = autoflow.autoFlowUrl || `${window.location.origin}/api/autoflows?accountId=${autoflow.accountId}&productId=${autoflow.productId}`
                                                navigator.clipboard.writeText(url)
                                                message.success('Đã copy API URL!')
                                            }}
                                            className="!p-0 !h-5 !w-5 !min-w-0 text-blue-700"
                                        />
                                    </div>

                                    {/* n8n URL */}
                                    {autoflow.n8nUrl && (
                                        <div className="flex items-center gap-2 mt-1 bg-white/50 px-2 py-1 rounded">
                                            <a href={autoflow.n8nUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-green-700 font-mono truncate flex-1 hover:underline">
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
                                </div>

                                {/* Child Prompts */}
                                <div className="divide-y">
                                    {(autoflow.prompts || []).length === 0 ? (
                                        <p className="text-xs text-gray-400 text-center py-3">
                                            Chưa có prompt nào — nhấn + để thêm
                                        </p>
                                    ) : (
                                        <DndContext
                                            sensors={sensors}
                                            collisionDetection={closestCenter}
                                            onDragEnd={(event) => handlePromptDragEnd(event, autoflow)}
                                        >
                                            <SortableContext
                                                items={autoflow.prompts.map((p: any) => p._id)}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                {autoflow.prompts.map((prompt: any) => (
                                                    <SortablePromptItem
                                                        key={prompt._id}
                                                        prompt={prompt}
                                                        onCopy={handleCopyPromptContent}
                                                        onEdit={handleEditPrompt}
                                                        onDelete={handleDeletePrompt}
                                                        veo3Media={veo3Media}
                                                    />
                                                ))}
                                            </SortableContext>
                                        </DndContext>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Veo3 Media Section */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base font-semibold">
                        🎬 Veo3 Media ({veo3Media.length})
                    </h2>
                </div>

                {/* Add new media */}
                <div className="mb-3">
                    <div className="flex gap-2 mb-2">
                        <Input
                            placeholder="Nhập Media ID..."
                            value={newMediaId}
                            onChange={(e) => setNewMediaId(e.target.value)}
                            size="small"
                            onPressEnter={handleAddVeo3Media}
                        />
                        <Button
                            size="small"
                            onClick={() => openNewMediaWidget()}
                            title="Upload hình"
                        >
                            📷 Upload
                        </Button>
                        <Button
                            type="primary"
                            size="small"
                            icon={<PlusOutlined />}
                            onClick={handleAddVeo3Media}
                            disabled={!newMediaId.trim()}
                        >
                            Thêm
                        </Button>
                    </div>
                    {newMediaFile && (
                        <div className="flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
                            <img
                                src={newMediaFile.url}
                                alt="Preview"
                                className="w-12 h-12 object-cover rounded"
                            />
                            <span className="text-xs text-green-700 truncate flex-1">
                                {newMediaFile.url}
                            </span>
                            <Button
                                type="text"
                                size="small"
                                danger
                                onClick={() => setNewMediaFile(null)}
                            >
                                ✕
                            </Button>
                        </div>
                    )}
                </div>

                {veo3MediaLoading ? (
                    <div className="text-center py-4">
                        <Spin size="small" />
                    </div>
                ) : veo3Media.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                        Chưa có media nào
                    </p>
                ) : (
                    <div className="space-y-2">
                        {veo3Media.map((media: any) => (
                            <div key={media._id} className="border rounded-lg p-3 flex items-center gap-3">
                                {/* Thumbnail */}
                                <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                                    {media.mediaFile?.url ? (
                                        <img
                                            src={media.mediaFile.url}
                                            alt={media.mediaId}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-xs">No image</span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-mono font-semibold text-gray-800 truncate">
                                            {media.mediaId}
                                        </span>
                                        <Button
                                            type="text"
                                            size="small"
                                            icon={<CopyOutlined />}
                                            onClick={() => {
                                                navigator.clipboard.writeText(media.mediaId)
                                                message.success('Đã copy Media ID!')
                                            }}
                                        />
                                    </div>
                                    {media.mediaFile?.url && (
                                        <p className="text-xs text-gray-500 truncate">
                                            {media.mediaFile.url}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-1 flex-shrink-0">
                                    <Button
                                        type="text"
                                        size="small"
                                        onClick={() => handleUploadVeo3Media(media._id)}
                                        title="Upload hình"
                                    >
                                        📷
                                    </Button>
                                    {media.mediaFile?.publicId && (
                                        <Button
                                            type="text"
                                            size="small"
                                            danger
                                            onClick={() => handleRemoveVeo3MediaImage(media._id, media.mediaFile.publicId)}
                                            title="Xóa hình"
                                        >
                                            🗑️
                                        </Button>
                                    )}
                                    <Popconfirm
                                        title="Xóa media?"
                                        description="Bạn có chắc muốn xóa media này?"
                                        onConfirm={() => handleDeleteVeo3Media(media._id, media.mediaFile?.publicId)}
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
                <AutoFlowModal
                    isOpen={isAutoFlowModalOpen}
                    setIsOpen={setIsAutoFlowModalOpen}
                    accountId={account._id}
                    products={products}
                    autoflows={autoflows}
                    editingAutoFlow={editingAutoFlow}
                    onRefresh={() => fetchAutoFlows(account._id)}
                    shopeeLinks={shopeeLinks}
                />
            )}

            <PromptModal
                isOpen={isPromptModalOpen}
                setIsOpen={setIsPromptModalOpen}
                productId={promptProductId}
                editingPrompt={editingPrompt}
                onRefresh={() => { if (account) fetchAutoFlows(account._id) }}
                veo3Media={veo3Media}
            />
        </div>
    )
}
