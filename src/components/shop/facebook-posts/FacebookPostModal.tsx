'use client'

import { useEffect, useState } from 'react'
import { DatePicker, Form, Input, Modal, Select, message, TimePicker, Button, Image } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload'
import { FacebookPost, MediaFile } from '@/models/FacebookPost'
import { facebookPostUploadConfig } from '@/utils/cloudinaryConfig'

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
                postUrl: editingPost.postUrl || '',
                scheduledDate,
                scheduledTime
            })
        }
    }, [editingPost, isOpen, form])



    const handleRemoveMedia = (publicId: string) => {
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

                <Form.Item label="Hình ảnh/Video">
                    <Button
                        icon={<UploadOutlined />}
                        onClick={openWidget}
                        loading={isUploading}
                        className="mb-3"
                    >
                        Tải lên hình/video
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
