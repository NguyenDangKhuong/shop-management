'use client'

import { deleteCloudinaryImage } from '@/actions/cloudinary'
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload'
import { veo3MediaUploadConfig } from '@/utils/cloudinaryConfig'
import {
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons'
import { App, Button, Input, Popconfirm, Spin } from 'antd'
import { useCallback, useRef, useState } from 'react'

interface Veo3MediaSectionProps {
    accountId: string
    veo3Media: any[]
    veo3MediaLoading: boolean
    onRefresh: () => void
}

export default function Veo3MediaSection({
    accountId,
    veo3Media,
    veo3MediaLoading,
    onRefresh
}: Veo3MediaSectionProps) {
    const { message } = App.useApp()

    // State for adding new media
    const [newMediaId, setNewMediaId] = useState('')
    const [newMediaFile, setNewMediaFile] = useState<{ url: string; type: string; publicId?: string } | null>(null)

    // State for inline editing
    const [editingMediaId, setEditingMediaId] = useState<string | null>(null)
    const [editingMediaValue, setEditingMediaValue] = useState('')

    // Ref for tracking upload target
    const uploadTargetIdRef = useRef<string | null>(null)

    // --- Handlers ---

    const handleAddVeo3Media = async () => {
        if (!newMediaId.trim()) return
        try {
            const body: any = {
                accountId,
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
                onRefresh()
            } else {
                message.error('Thêm thất bại: ' + data.error)
            }
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        }
    }

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
                onRefresh()
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
                onRefresh()
            }
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        }
    }

    const handleEditVeo3MediaId = async (mediaDocId: string) => {
        if (!editingMediaValue.trim()) return
        try {
            const response = await fetch('/api/veo3-media', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: mediaDocId,
                    mediaId: editingMediaValue.trim()
                })
            })
            const data = await response.json()
            if (data.success) {
                message.success('Đã cập nhật Media ID!')
                setEditingMediaId(null)
                setEditingMediaValue('')
                onRefresh()
            } else {
                message.error('Cập nhật thất bại: ' + data.error)
            }
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        }
    }

    // --- Upload hooks ---

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

    // Upload for existing media items
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
                onRefresh()
            }
        } catch (error: any) {
            message.error('Lỗi khi lưu: ' + error.message)
        }
        uploadTargetIdRef.current = null
    }, [onRefresh, message])

    const { openWidget } = useCloudinaryUpload(
        veo3MediaUploadConfig,
        onUploadSuccess,
        (err) => message.error('Upload thất bại: ' + err?.message)
    )

    const handleUploadVeo3Media = (mediaDocId: string) => {
        uploadTargetIdRef.current = mediaDocId
        openWidget()
    }

    // --- Render ---

    return (
        <>
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
                                {editingMediaId === media._id ? (
                                    <div className="flex items-center gap-2">
                                        <Input
                                            size="small"
                                            value={editingMediaValue}
                                            onChange={(e) => setEditingMediaValue(e.target.value)}
                                            onPressEnter={() => handleEditVeo3MediaId(media._id)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Escape') {
                                                    setEditingMediaId(null)
                                                    setEditingMediaValue('')
                                                }
                                            }}
                                            autoFocus
                                            className="font-mono text-sm"
                                        />
                                        <Button
                                            type="text"
                                            size="small"
                                            onClick={() => handleEditVeo3MediaId(media._id)}
                                            disabled={!editingMediaValue.trim()}
                                            title="Lưu"
                                        >
                                            ✓
                                        </Button>
                                        <Button
                                            type="text"
                                            size="small"
                                            onClick={() => {
                                                setEditingMediaId(null)
                                                setEditingMediaValue('')
                                            }}
                                            title="Hủy"
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                ) : (
                                    <>
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
                                    </>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-1 flex-shrink-0">
                                <Button
                                    type="text"
                                    size="small"
                                    icon={<EditOutlined />}
                                    onClick={() => {
                                        setEditingMediaId(media._id)
                                        setEditingMediaValue(media.mediaId)
                                    }}
                                    title="Sửa Media ID"
                                />
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
        </>
    )
}
