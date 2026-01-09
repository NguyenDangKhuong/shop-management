'use client'

import { useEffect, useState, useRef } from 'react'
import { DatePicker, Form, Input, Modal, Select, App, TimePicker, Button, Image } from 'antd'
import { UploadOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload'
import { FacebookPost, MediaFile } from '@/models/FacebookPost'
import { facebookPostUploadConfig } from '@/utils/cloudinaryConfig'
import { uploadVideoToMinIO, deleteVideoFromMinIO } from '@/utils/minioUpload'
import { deleteCloudinaryImage } from '@/actions/cloudinary'
import { apiPost, apiPut } from '@/utils/internalApi'
import { MINIO_FACEBOOK_BUCKET } from '@/utils/constants'

dayjs.extend(customParseFormat)

// Constants
const CONTENT_MAX_LENGTH = 5000
const CONTENT_ROWS = 6
const MODAL_WIDTH = 700
const DATE_FORMAT = 'DD/MM/YYYY'
const TIME_FORMAT = 'HH:mm'
const DEFAULT_POST_TYPE = 'reel-link'
const DEFAULT_STATUS = 'scheduled'

const { TextArea } = Input

// Configuration objects
const statusOptions = [
    { value: 'draft', label: 'Nháp' },
    { value: 'scheduled', label: 'Lên lịch' },
    { value: 'published', label: 'Đã đăng' },
    { value: 'failed', label: 'Thất bại' }
]

const postTypeOptions = [
    { value: 'reel-link', label: 'Reel Link' },
    { value: 'post', label: 'Post thường' },
    { value: 'reel-video', label: 'Reel Video' }
]

// Helper Functions
const combineDateAndTime = (date: any, time: any) => {
    if (!date || !time) {
        return { scheduledAt: null, scheduledDate: null, scheduledTime: null }
    }

    const dateObj = dayjs(date)
    const timeObj = dayjs(time)
    const combined = dateObj.hour(timeObj.hour()).minute(timeObj.minute()).second(0)

    return {
        scheduledAt: combined.toISOString(),
        scheduledDate: dateObj.format(DATE_FORMAT),
        scheduledTime: timeObj.format(TIME_FORMAT)
    }
}

const prepareMediaFiles = (postType: string, videoLink: string | undefined, currentMediaFiles: MediaFile[]): MediaFile[] => {
    if (postType === 'reel-link' && videoLink) {
        return [{
            url: videoLink,
            type: 'link',
            publicId: ''
        }]
    }
    return currentMediaFiles
}

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
    const { message } = App.useApp()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
    const [postType, setPostType] = useState<string>('reel-link')
    const [videoUploading, setVideoUploading] = useState(false)
    const videoInputRef = useRef<HTMLInputElement>(null)

    // Track newly uploaded media this session (not existing media from editing)
    // Store full MediaFile info so cleanup doesn't depend on state
    const uploadedThisSessionRef = useRef<MediaFile[]>([])

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
            // Track new upload for cleanup
            uploadedThisSessionRef.current.push(newFile)
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

        if (isOpen) {
            // Clear tracker when modal opens - don't track existing media as "new"
            uploadedThisSessionRef.current = []

            const scheduledDate = editingPost.scheduledDate
                ? dayjs(editingPost.scheduledDate, DATE_FORMAT)
                : null
            const scheduledTime = editingPost.scheduledTime
                ? dayjs(editingPost.scheduledTime, TIME_FORMAT)
                : null

            // For reel-link, populate videoLink from mediaFiles[0].url
            const videoLink = (editingPost.postType === 'reel-link' && editingPost.mediaFiles?.[0]?.url)
                ? editingPost.mediaFiles[0].url
                : undefined

            form.setFieldsValue({
                content: editingPost.content || '',
                status: editingPost.status || 'draft',
                postType: editingPost.postType || DEFAULT_POST_TYPE,
                postUrl: editingPost.postUrl || '',
                scheduledDate,
                scheduledTime,
                videoLink
            })
            setPostType(editingPost.postType || DEFAULT_POST_TYPE)
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
            const result = await uploadVideoToMinIO(file, MINIO_FACEBOOK_BUCKET)
            if (result.success) {
                const newFile: MediaFile = {
                    url: result.url,
                    type: 'video',
                    publicId: result.fileName || file.name
                }
                setMediaFiles([newFile])
                uploadedThisSessionRef.current.push(newFile)
                setPostType('reel-video')
                form.setFieldsValue({ postType: 'reel-video' })
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
        if (postType === 'reel-video' && mediaFile.type === 'video') {
            try {
                const result = await deleteVideoFromMinIO(mediaFile.publicId!, MINIO_FACEBOOK_BUCKET)
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

        // Remove from tracking (already deleted)
        uploadedThisSessionRef.current = uploadedThisSessionRef.current.filter(
            file => file.publicId !== publicId
        )

        // Remove from UI state
        setMediaFiles(prev => prev.filter(file => file.publicId !== publicId))
    }

    // Cleanup unsubmitted uploads when modal is closed without saving
    const cleanupUnsubmittedUploads = async () => {
        if (uploadedThisSessionRef.current.length === 0) return

        const cleanupPromises: Promise<void>[] = []

        // Use the tracked files (not state) to ensure we have the data even after state is cleared
        for (const mediaFile of uploadedThisSessionRef.current) {
            if (!mediaFile.publicId) continue

            // Cleanup based on file type
            if (mediaFile.type === 'video') {
                // MinIO cleanup for reel-video
                cleanupPromises.push(
                    deleteVideoFromMinIO(mediaFile.publicId, MINIO_FACEBOOK_BUCKET)
                        .then(() => { /* void */ })
                        .catch(err => console.error('Cleanup error (MinIO):', err))
                )
            } else if (mediaFile.type === 'image' && mediaFile.publicId) {
                // Cloudinary cleanup for post images
                cleanupPromises.push(
                    deleteCloudinaryImage(mediaFile.publicId)
                        .then(() => { /* void */ })
                        .catch(err => console.error('Cleanup error (Cloudinary):', err))
                )
            }
        }

        // Wait for all cleanups to complete
        await Promise.all(cleanupPromises)
        uploadedThisSessionRef.current = []
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()

            // Auto-set schedule if not provided (current time + 5 minutes)
            let scheduleDate = values.scheduledDate
            let scheduleTime = values.scheduledTime

            if (!scheduleDate || !scheduleTime) {
                const now = dayjs().add(5, 'minute')
                scheduleDate = scheduleDate || now
                scheduleTime = scheduleTime || now
            }

            // Use helper function for date/time combination
            const scheduleData = combineDateAndTime(scheduleDate, scheduleTime)

            // Use helper function for media files preparation
            const finalMediaFiles = prepareMediaFiles(values.postType, values.videoLink, mediaFiles)

            const postData = {
                ...editingPost,
                content: values.content,
                status: editingPost._id ? values.status : DEFAULT_STATUS,
                postType: values.postType,
                ...scheduleData,
                postUrl: values.postUrl,
                mediaFiles: finalMediaFiles
            }

            const result = editingPost._id
                ? await apiPut('/api/facebook-posts', { id: editingPost._id, ...postData })
                : await apiPost('/api/facebook-posts', postData)

            if (result.success) {
                // Clear tracker on successful submit (media is now saved)
                uploadedThisSessionRef.current = []
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

    const handleCancel = async () => {
        // Prevent modal from closing immediately - we'll close it manually after cleanup
        setLoading(true)

        // Cleanup any uploaded media that wasn't submitted
        await cleanupUnsubmittedUploads()

        setLoading(false)
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
            width={MODAL_WIDTH}
            okText={editingPost._id ? 'Cập nhật' : 'Tạo'}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item label="Ngày hẹn đăng" name="scheduledDate">
                        <DatePicker format={DATE_FORMAT} placeholder="Chọn ngày" style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item label="Giờ hẹn đăng" name="scheduledTime">
                        <TimePicker format={TIME_FORMAT} placeholder="Chọn giờ" style={{ width: '100%' }} />
                    </Form.Item>
                </div>
                <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[{ required: true, message: 'Vui lòng nhập nội dung bài viết' }]}
                >
                    <TextArea
                        rows={CONTENT_ROWS}
                        placeholder="Bạn đang nghĩ gì?"
                        showCount
                        maxLength={CONTENT_MAX_LENGTH}
                    />
                </Form.Item>

                <Form.Item label="Loại bài đăng" name="postType" initialValue={DEFAULT_POST_TYPE}>
                    <Select onChange={(value) => {
                        setPostType(value)
                        setMediaFiles([]) // Clear media khi đổi type
                    }}>
                        {postTypeOptions.map(option => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
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
                    </Form.Item>
                ) : postType === 'reel-video' ? (
                    <div>
                        <Form.Item label="Video Reel">
                            <input
                                ref={videoInputRef}
                                type="file"
                                accept="video/*"
                                onChange={handleVideoUpload}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                disabled={videoUploading}
                            />
                            {videoUploading && (
                                <div className="text-blue-500 text-sm mt-2">Uploading video...</div>
                            )}
                        </Form.Item>

                        {/* Show uploaded video preview */}
                        {mediaFiles.length > 0 && mediaFiles[0].type === 'video' && (
                            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                                <div className="flex flex-col gap-3">
                                    <video
                                        controls
                                        src={mediaFiles[0].url}
                                        className="w-full max-h-64 rounded-lg"
                                        style={{ maxHeight: '256px' }}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-700 mb-1">
                                                {mediaFiles[0].publicId}
                                            </div>
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
                    </div>
                ) : (postType === 'reel-link') && (
                    <Form.Item
                        label="Link Video Reel"
                        name="videoLink"
                        rules={[
                            { type: 'url', message: 'Vui lòng nhập URL hợp lệ' },
                            { required: true, message: 'Vui lòng nhập link video' }
                        ]}
                    >
                        <Input
                            placeholder="https://example.com/video.mp4"
                            prefix={<LinkOutlined />}
                        />
                    </Form.Item>
                )

                /* Form items for scheduling and post URL */}
                <Form.Item label="Trạng thái" name="status">
                    <Select>
                        {statusOptions.map(option => (
                            <Select.Option key={option.value} value={option.value}>
                                {option.label}
                            </Select.Option>
                        ))}
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
