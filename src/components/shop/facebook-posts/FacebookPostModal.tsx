'use client'

import { useEffect, useState, useRef } from 'react'
import { DatePicker, Form, Input, Modal, Select, message, TimePicker, Button, Image } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload'
import { FacebookPost, MediaFile } from '@/models/FacebookPost'
import { facebookPostUploadConfig } from '@/utils/cloudinaryConfig'
import { uploadVideoToMinIO, deleteVideoFromMinIO } from '@/utils/minioUpload'
import { deleteCloudinaryImage } from '@/actions/cloudinary'

dayjs.extend(customParseFormat)

const { TextArea } = Input

interface FacebookPostModalProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    editingPost: Partial<FacebookPost>
    setEditingPost: (value: Partial<FacebookPost>) => void
    onRefresh: () => void
}

const FacebookPostModal = ({
    isOpen,
    setIsOpen,
    editingPost,
    onRefresh
}: FacebookPostModalProps) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
    const [postType, setPostType] = useState<string>('post')
    const [videoUploading, setVideoUploading] = useState(false)
    const videoInputRef = useRef<HTMLInputElement>(null)

    // Cloudinary upload hook
    const { openWidget, isUploading, progress } = useCloudinaryUpload(
        facebookPostUploadConfig,
        (result) => {
            const newFile: MediaFile = {
                url: result.url,
                type: result.resourceType,
                publicId: result.publicId
            }
            setMediaFiles(prev => [...prev, newFile])
            message.success(`${result.resourceType} uploaded successfully!`)
        },
        (error) => {
            message.error('Upload failed: ' + (error?.message || 'Unknown error'))
        }
    )

    // Load existing media files when editing
    useEffect(() => {
        if (editingPost._id && editingPost.mediaFiles && editingPost.mediaFiles.length > 0) {
            setMediaFiles(editingPost.mediaFiles)
        } else {
            setMediaFiles([])
        }

        // Set form values including parsed dates
        if (isOpen) {
            const scheduledDate = editingPost.scheduledDate
                ? dayjs(editingPost.scheduledDate, 'DD/MM/YYYY')
                : null
            const scheduledTime = editingPost.scheduledTime
                ? dayjs(editingPost.scheduledTime, 'HH:mm')
                : null

            form.setFieldsValue({
                content: editingPost.content || '',
                status: editingPost.status || 'draft',
                postType: editingPost.postType || 'post',
                postUrl: editingPost.postUrl || '',
                scheduledDate,
                scheduledTime
            })
            setPostType(editingPost.postType || 'post')
        }
    }, [editingPost, isOpen, form])

    const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('video/')) {
            message.error('Vui lòng chọn file video!')
            return
        }

        setVideoUploading(true)
        try {
            const result = await uploadVideoToMinIO(file)
            if (result.success) {
                const newFile: MediaFile = {
                    url: result.url,
                    type: 'video',
                    publicId: result.fileName || file.name // Use fileName from response as publicId
                }
                setMediaFiles([newFile]) // Reels chỉ 1 video
                message.success('Video uploaded successfully!')
            } else {
                message.error('Upload failed: ' + result.message)
            }
        } catch (error: any) {
            message.error('Upload error: ' + error.message)
        } finally {
            setVideoUploading(false)
            if (videoInputRef.current) {
                videoInputRef.current.value = ''
            }
        }
    }

    const handleRemoveMedia = async (publicId: string) => {
        const mediaFile = mediaFiles.find(file => file.publicId === publicId)

        if (!mediaFile) return

        // For reels (MinIO videos), delete from S3
        if (postType === 'reel' && mediaFile.type === 'video') {
            try {
                const result = await deleteVideoFromMinIO(mediaFile.publicId!)
                if (result.success) {
                    message.success('Video deleted from storage')
                } else {
                    message.warning('Could not delete video from storage: ' + result.message)
                }
            } catch (error: any) {
                message.error('Delete error: ' + error.message)
            }
        }

        // For regular posts (Cloudinary images/videos), delete from Cloudinary
        if (postType === 'post' && mediaFile.type === 'image' && mediaFile.publicId) {
            try {
                const result = await deleteCloudinaryImage(mediaFile.publicId)
                if (result.success) {
                    message.success('Image deleted from Cloudinary')
                } else {
                    message.warning('Could not delete image from Cloudinary: ' + result.message)
                }
            } catch (error: any) {
                message.error('Delete error: ' + error.message)
            }
        }

        // Remove from UI state
        setMediaFiles(prev => prev.filter(file => file.publicId !== publicId))
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()

            // Combine date and time
            let scheduledAt = null
            let scheduledDate = null
            let scheduledTime = null

            if (values.scheduledDate && values.scheduledTime) {
                const date = dayjs(values.scheduledDate)
                const time = dayjs(values.scheduledTime)

                scheduledAt = date
                    .hour(time.hour())
                    .minute(time.minute())
                    .second(0)
                    .toISOString()

                scheduledDate = date.format('DD/MM/YYYY')
                scheduledTime = time.format('HH:mm')
            }

            const postData = {
                ...editingPost,
                content: values.content,
                status: editingPost._id ? values.status : 'scheduled', // Mặc định "scheduled" khi tạo mới
                postType: values.postType,
                scheduledAt,
                scheduledDate,
                scheduledTime,
                postUrl: values.postUrl,
                mediaFiles
            }

            const url = '/api/facebook-posts'
            const method = editingPost._id ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingPost._id ? { id: editingPost._id, ...postData } : postData)
            })

            const result = await res.json()

            if (result.success) {
                message.success(editingPost._id ? 'Post updated!' : 'Post created!')
                setIsOpen(false)
                form.resetFields()
                setMediaFiles([])
                onRefresh()
            } else {
                message.error(result.error || 'Failed to save post')
            }
        } catch (error: any) {
            message.error(error.message || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setIsOpen(false)
        form.resetFields()
        setMediaFiles([])
    }

    return (
        <Modal
            title={editingPost._id ? 'Sửa bài viết Facebook' : 'Tạo bài viết Facebook mới'}
            open={isOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
            confirmLoading={loading}
            width={700}
            okText={editingPost._id ? 'Cập nhật' : 'Tạo'}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Ngày hẹn đăng" name="scheduledDate">
                        <DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item label="Giờ hẹn đăng" name="scheduledTime">
                        <TimePicker format="HH:mm" placeholder="Chọn giờ" style={{ width: '100%' }} />
                    </Form.Item>
                </div>
                <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[{ required: true, message: 'Vui lòng nhập nội dung bài viết' }]}
                >
                    <TextArea
                        rows={6}
                        placeholder="Bạn đang nghĩ gì?"
                        showCount
                        maxLength={5000}
                    />
                </Form.Item>

                <Form.Item label="Loại bài đăng" name="postType" initialValue="post">
                    <Select onChange={(value) => {
                        setPostType(value)
                        setMediaFiles([]) // Clear media khi đổi type
                    }}>
                        <Select.Option value="post">Post thường</Select.Option>
                        <Select.Option value="reel">Reel</Select.Option>
                    </Select>
                </Form.Item>

                {/* Conditional Upload UI */}
                {postType === 'post' ? (
                    <Form.Item label="Hình ảnh/Video">
                        <Button
                            icon={<UploadOutlined />}
                            onClick={openWidget}
                            loading={isUploading}
                            className="mb-3"
                        >
                            Tải lên hình/video (Cloudinary)
                        </Button>
                        {isUploading && progress > 0 && (
                            <div className="text-blue-500 text-sm mt-1">Uploading: {progress}%</div>
                        )}

                        {mediaFiles.length > 0 && (
                            <div className="grid grid-cols-4 gap-2 mt-2">
                                {mediaFiles.map((file, index) => (
                                    <div key={index} className="relative border rounded p-1">
                                        {file.type === 'image' ? (
                                            <Image
                                                src={file.url}
                                                alt={`Media ${index + 1}`}
                                                className="w-full h-24 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-full h-24 bg-gray-200 flex items-center justify-center rounded">
                                                <span className="text-2xl">📹</span>
                                            </div>
                                        )}
                                        <Button
                                            size="small"
                                            danger
                                            icon={<DeleteOutlined />}
                                            className="absolute top-1 right-1"
                                            onClick={() => handleRemoveMedia(file.publicId!)}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="text-xs text-gray-500 mt-2">
                            Đã tải lên {mediaFiles.length} file
                        </div>
                    </Form.Item>
                ) : (
                    <Form.Item label="Upload Video Reel">
                        <input
                            ref={videoInputRef}
                            type="file"
                            accept="video/*"
                            onChange={handleVideoUpload}
                            style={{ display: 'none' }}
                        />
                        <Button
                            icon={<UploadOutlined />}
                            onClick={() => videoInputRef.current?.click()}
                            loading={videoUploading}
                            className="mb-3"
                        >
                            Tải lên video (MinIO S3)
                        </Button>
                        {videoUploading && (
                            <div className="text-blue-500 text-sm mt-1">Uploading video...</div>
                        )}

                        {mediaFiles.length > 0 && (
                            <div className="mt-2">
                                <div className="border rounded p-2">
                                    <video
                                        src={mediaFiles[0].url}
                                        controls
                                        className="w-full max-h-64 rounded mb-2"
                                        preload="metadata"
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="text-sm font-medium">{mediaFiles[0].publicId}</div>
                                            <a
                                                href={mediaFiles[0].url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-500 hover:underline"
                                            >
                                                Open in new tab
                                            </a>
                                        </div>
                                        <Button
                                            size="small"
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => handleRemoveMedia(mediaFiles[0].publicId!)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="text-xs text-gray-500 mt-2">
                            Video sẽ được lưu tại: s3.thetaphoa.store
                        </div>
                    </Form.Item>
                )}

                <Form.Item label="Trạng thái" name="status">
                    <Select>
                        <Select.Option value="draft">Nháp</Select.Option>
                        <Select.Option value="scheduled">Đã lên lịch</Select.Option>
                        <Select.Option value="published">Đã đăng</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Link bài đăng (sau khi đăng)" name="postUrl">
                    <Input placeholder="https://facebook.com/..." />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default FacebookPostModal
