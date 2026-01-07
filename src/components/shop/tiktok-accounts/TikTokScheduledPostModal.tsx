'use client'

import { useState, useEffect, useRef } from 'react'
import { Form, Input, Modal, Button, App, DatePicker, Select, Upload, TimePicker } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { apiPost, apiPut } from '@/utils/internalApi'
import { deleteVideoFromMinIO } from '@/utils/minioUpload'
import dayjs from 'dayjs'

interface ScheduledPostModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    accountId: string
    products: any[]
    editingPost?: any
    onRefresh: () => void
}

const TikTokScheduledPostModal = ({
    isOpen,
    setIsOpen,
    accountId,
    products,
    editingPost,
    onRefresh
}: ScheduledPostModalProps) => {
    const { message } = App.useApp()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [video, setVideo] = useState<any>(null)
    const [uploading, setUploading] = useState(false)
    const [shopeeLinks, setShopeeLinks] = useState<any[]>([])

    // Track newly uploaded video this session (not existing from editing)
    const uploadedThisSessionRef = useRef<{ url: string; type: string; publicId?: string } | null>(null)

    // Fetch Shopee Links
    useEffect(() => {
        const fetchShopeeLinks = async () => {
            try {
                const response = await fetch('/api/shopee-links')
                const data = await response.json()
                if (data.success) {
                    setShopeeLinks(data.data)
                }
            } catch (error) {
                console.error('Failed to fetch shopee links:', error)
            }
        }
        fetchShopeeLinks()
    }, [])

    useEffect(() => {
        if (isOpen) {
            // Clear tracker when modal opens - don't track existing video as "new"
            uploadedThisSessionRef.current = null

            if (editingPost) {
                form.setFieldsValue({
                    scheduledDate: editingPost.scheduledDate ? dayjs(editingPost.scheduledDate) : null,
                    scheduledTime: editingPost.scheduledTime ? dayjs(editingPost.scheduledTime, 'HH:mm') : null,
                    productId: editingPost.productId || '',
                    description: editingPost.description || '',
                    status: editingPost.status || 'scheduled'
                })
                setVideo(editingPost.video || null)
            } else {
                form.resetFields()
                form.setFieldsValue({ status: 'scheduled' }) // Default to scheduled
                setVideo(null)
            }
        } else {
            // Reset when closing
            setVideo(null)
        }
    }, [isOpen, editingPost, form])

    const handleShopeeSelect = (shopeeId: string) => {
        if (!shopeeId) {
            // Clear description when deselecting
            form.setFieldsValue({ description: '' })
            return
        }

        const selected = shopeeLinks.find(link => link._id === shopeeId)
        console.log('Selected Shopee Link:', selected)

        if (selected) {
            // Use description if available, otherwise use name as fallback
            const descriptionText = selected.description || selected.name
            form.setFieldsValue({ description: descriptionText })

            if (!selected.description) {
                message.info('Shopee Link chưa có mô tả, đã điền tên sản phẩm', 3)
            }
        }
    }

    const handleVideoUpload = async (file: File) => {
        try {
            setUploading(true)

            // Sanitize filename client-side to avoid "The string did not match the expected pattern" error
            // which occurs in some browsers (like Safari) when filenames contain special characters
            const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
            const renamedFile = new File([file], sanitizedName, { type: file.type })

            const formData = new FormData()
            formData.append('video', renamedFile)

            const response = await fetch('/api/minio-video', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()

            if (data.success) {
                const newVideo = {
                    url: data.url,
                    type: 'video',
                    publicId: data.fileName
                }
                setVideo(newVideo)
                // Track new upload for cleanup
                uploadedThisSessionRef.current = newVideo
                message.success('Đã upload video!')
            } else {
                message.error('Upload thất bại: ' + (data.message || 'Lỗi không xác định'))
            }
        } catch (error: any) {
            message.error('Lỗi upload: ' + error.message)
        } finally {
            setUploading(false)
        }
        return false // Prevent auto upload
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()

            if (!video) {
                message.error('Vui lòng upload video!')
                return
            }

            const selectedProduct = products.find(p => p.product_id === values.productId)

            const postData = {
                accountId,
                scheduledDate: values.scheduledDate?.toISOString(),
                scheduledTime: values.scheduledTime?.format('HH:mm'),
                productId: values.productId || null,
                productTitle: selectedProduct?.title || null,
                description: values.description,
                video: video,
                status: values.status || 'scheduled'
            }

            if (editingPost?._id) {
                const result = await apiPut('/api/tiktok-scheduled-posts', { id: editingPost._id, ...postData })
                console.log('✏️ Update result:', result)
                message.success('Đã cập nhật bài đăng!')
            } else {
                const result = await apiPost('/api/tiktok-scheduled-posts', postData)
                console.log('✅ Create result:', result)
                message.success('Đã tạo bài đăng mới!')
            }

            // Clear tracker on successful submit (video is now saved)
            uploadedThisSessionRef.current = null
            setIsOpen(false)
            console.log('🔄 Calling onRefresh...')
            onRefresh()
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = async () => {
        // Delete uploaded video if it wasn't saved
        if (uploadedThisSessionRef.current?.publicId) {
            try {
                const result = await deleteVideoFromMinIO(uploadedThisSessionRef.current.publicId)
                if (result.success) {
                    console.log('🗑️ Cleaned up unsaved video:', uploadedThisSessionRef.current.publicId)
                } else {
                    console.error('Failed to cleanup video:', result.message)
                }
            } catch (error) {
                console.error('Failed to cleanup video:', error)
            }
            uploadedThisSessionRef.current = null
        }
        setIsOpen(false)
    }

    return (
        <Modal
            title={editingPost ? 'Chỉnh sửa bài đăng' : 'Thêm bài đăng mới'}
            open={isOpen}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
                    {editingPost ? 'Cập nhật' : 'Tạo'}
                </Button>
            ]}
            width={400}
        >
            <Form form={form} layout="vertical" className="mt-4">
                <div className="flex gap-2">
                    <Form.Item
                        label="Ngày đăng"
                        name="scheduledDate"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
                        className="flex-1"
                    >
                        <DatePicker className="w-full" format="DD/MM/YYYY" />
                    </Form.Item>

                    <Form.Item
                        label="Giờ đăng"
                        name="scheduledTime"
                        rules={[{ required: true, message: 'Vui lòng chọn giờ' }]}
                        className="flex-1"
                    >
                        <TimePicker className="w-full" format="HH:mm" />
                    </Form.Item>
                </div>

                <Form.Item
                    label="Sản phẩm"
                    name="productId"
                    rules={[{ required: true, message: 'Vui lòng chọn sản phẩm' }]}
                >
                    <Select
                        placeholder="Chọn sản phẩm"
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {products.map((product: any) => (
                            <Select.Option
                                key={product.product_id}
                                value={product.product_id}
                                label={product.title}
                            >
                                <div className="flex items-center gap-2">
                                    {product.images?.[0]?.url_list?.[0] && (
                                        <img
                                            src={product.images[0].url_list[0]}
                                            alt={product.title}
                                            className="w-8 h-8 rounded object-cover"
                                        />
                                    )}
                                    <span className="truncate text-xs">{product.title}</span>
                                </div>
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Shopee Link (tùy chọn)" name="shopeeLink">
                    <Select
                        placeholder="Chọn Shopee Link để lấy mô tả"
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        onChange={handleShopeeSelect}
                    >
                        {shopeeLinks.map((link: any) => (
                            <Select.Option
                                key={link._id}
                                value={link._id}
                                label={link.name}
                            >
                                <div className="flex items-center gap-2">
                                    {link.mediaFile?.url && (
                                        <img
                                            src={link.mediaFile.url}
                                            alt={link.name}
                                            className="w-8 h-8 rounded object-cover"
                                        />
                                    )}
                                    <span className="truncate text-xs">{link.name}</span>
                                </div>
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Mô tả bài viết (tự động điền từ Shopee Link hoặc nhập thủ công)..."
                    />
                </Form.Item>

                <Form.Item label="Video" required>
                    <Upload
                        beforeUpload={handleVideoUpload}
                        maxCount={1}
                        accept="video/*"
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />} loading={uploading}>
                            {uploading ? 'Đang upload...' : video ? 'Đổi video' : 'Upload video'}
                        </Button>
                    </Upload>
                    {video && (
                        <div className="mt-2">
                            <video src={video.url} className="w-full h-32 object-cover rounded" controls />
                        </div>
                    )}
                </Form.Item>

                <Form.Item
                    label="Trạng thái"
                    name="status"
                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                    initialValue="scheduled"
                >
                    <Select placeholder="Chọn trạng thái">
                        <Select.Option value="draft">Nháp</Select.Option>
                        <Select.Option value="scheduled">Lên bài</Select.Option>
                        <Select.Option value="posted">Đã đăng</Select.Option>
                        <Select.Option value="failed">Thất bại</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default TikTokScheduledPostModal
