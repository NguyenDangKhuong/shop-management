'use client'

import { useState, useEffect, useRef } from 'react'
import { Form, Input, Modal, Button, App } from 'antd'
import { UploadOutlined, LinkOutlined } from '@ant-design/icons'
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload'
import { ShopeeLink } from '@/models/ShopeeLink'
import { shopeeLinkUploadConfig } from '@/utils/cloudinaryConfig'
import { apiPost, apiPut } from '@/utils/internalApi'

import { deleteCloudinaryImage } from '@/actions/cloudinary'

interface ShopeeLinksModalProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    editingLink: Partial<ShopeeLink>
    setEditingLink: (value: Partial<ShopeeLink>) => void
    onRefresh: () => void
}

const ShopeeLinksModal = ({
    isOpen,
    setIsOpen,
    editingLink,
    onRefresh
}: ShopeeLinksModalProps) => {
    const { message } = App.useApp()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [mediaFile, setMediaFile] = useState<{ url: string; type: string; publicId?: string } | null>(null)

    // Track newly uploaded image this session (not existing from editing)
    const uploadedThisSessionRef = useRef<{ url: string; type: string; publicId?: string } | null>(null)

    // Cloudinary upload hook
    const { openWidget, isUploading } = useCloudinaryUpload(
        shopeeLinkUploadConfig,
        (result) => {
            const newMediaFile = {
                url: result.url,
                type: 'image',
                publicId: result.publicId
            }
            setMediaFile(newMediaFile)
            // Track new upload for cleanup
            uploadedThisSessionRef.current = newMediaFile
            form.setFieldsValue({ mediaUrl: result.url })
            message.success('Upload ảnh thành công!')
        },
        (error) => {
            message.error('Upload thất bại: ' + (error?.message || 'Unknown error'))
        }
    )

    // Set form values when modal opens
    useEffect(() => {
        if (isOpen) {
            // Clear tracker when modal opens - don't track existing media as "new"
            uploadedThisSessionRef.current = null

            form.setFieldsValue({
                name: editingLink.name || '',
                mediaUrl: editingLink.mediaFile?.url || '',
                productUrl: editingLink.productUrl || '',
                description: editingLink.description || ''
            })
            setMediaFile(editingLink.mediaFile || null)
        } else {
            // Reset when closing
            setMediaFile(null)
        }
    }, [isOpen, editingLink, form])

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()

            // Prepare data with mediaFile structure
            const submitData: any = {
                name: values.name,
                productUrl: values.productUrl,
                description: values.description || '',
                mediaFile: mediaFile
            }

            const result = editingLink._id
                ? await apiPut('/api/shopee-links', { id: editingLink._id, ...submitData })
                : await apiPost('/api/shopee-links', submitData)

            if (result.success) {
                // Clear tracker on successful submit (image is now saved)
                uploadedThisSessionRef.current = null
                message.success(editingLink._id ? 'Đã cập nhật!' : 'Đã thêm link mới!')
                setIsOpen(false)
                form.resetFields()
                setMediaFile(null)
                onRefresh()
            } else {
                message.error(result.error || 'Lưu link thất bại')
            }
        } catch (error: any) {
            message.error(error.message || 'Có lỗi xảy ra')
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = async () => {
        // Show loading to ensure cleanup completes before modal closes
        setLoading(true)

        // Delete newly uploaded image if user cancels without saving
        // Use ref instead of state to ensure we have data even after state clears
        if (uploadedThisSessionRef.current?.publicId) {
            try {
                const result = await deleteCloudinaryImage(uploadedThisSessionRef.current.publicId)
                if (result.success) {
                    console.log('Cleanup: Deleted unused image')
                }
            } catch (error) {
                console.error('Cleanup error:', error)
            }
        }

        uploadedThisSessionRef.current = null
        setLoading(false)
        setIsOpen(false)
        form.resetFields()
        setMediaFile(null)
    }

    return (
        <Modal
            title={editingLink._id ? 'Sửa Shopee Link' : 'Thêm Shopee Link Mới'}
            open={isOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
            confirmLoading={loading}
            width={600}
            okText={editingLink._id ? 'Cập nhật' : 'Thêm'}
        >
            <Form form={form} layout="vertical" className="mt-4">
                <Form.Item
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                >
                    <Input placeholder="VD: Áo thun nam cotton..." />
                </Form.Item>


                <Form.Item
                    label="Hình ảnh sản phẩm"
                    name="mediaUrl"
                    rules={[{ required: true, message: 'Vui lòng upload hình ảnh' }]}
                >
                    <div>
                        <Button
                            icon={<UploadOutlined />}
                            onClick={openWidget}
                            loading={isUploading}
                            className="mb-3"
                        >
                            Upload Hình Ảnh
                        </Button>
                        {mediaFile?.url && (
                            <div className="mt-2 border rounded p-2">
                                <img
                                    src={mediaFile.url}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded"
                                />
                            </div>
                        )}
                    </div>
                </Form.Item>

                <Form.Item
                    label="Link sản phẩm Shopee"
                    name="productUrl"
                    rules={[
                        { required: true, message: 'Vui lòng nhập link sản phẩm' },
                        { type: 'url', message: 'Vui lòng nhập URL hợp lệ' }
                    ]}
                >
                    <Input
                        placeholder="https://shopee.vn/product/..."
                        prefix={<LinkOutlined />}
                    />
                </Form.Item>

                <Form.Item
                    label="Mô tả"
                    name="description"
                >
                    <Input.TextArea
                        rows={3}
                        placeholder="Mô tả sản phẩm (tùy chọn)..."
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ShopeeLinksModal
