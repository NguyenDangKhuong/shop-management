'use client'

import { useState } from 'react'
import { Form, Input, Modal, Button, message } from 'antd'
import { UploadOutlined, LinkOutlined } from '@ant-design/icons'
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload'
import { ShopeeLink } from '@/models/ShopeeLink'
import { shopeeLinkUploadConfig } from '@/utils/cloudinaryConfig'

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
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('')

    // Cloudinary upload hook
    const { openWidget, isUploading } = useCloudinaryUpload(
        shopeeLinkUploadConfig,
        (result) => {
            setImageUrl(result.url)
            form.setFieldsValue({ imageUrl: result.url })
            message.success('Upload ảnh thành công!')
        },
        (error) => {
            message.error('Upload thất bại: ' + (error?.message || 'Unknown error'))
        }
    )

    // Set form values when modal opens
    useState(() => {
        if (isOpen) {
            form.setFieldsValue({
                imageUrl: editingLink.imageUrl || '',
                productUrl: editingLink.productUrl || ''
            })
            setImageUrl(editingLink.imageUrl || '')
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()

            const url = '/api/shopee-links'
            const method = editingLink._id ? 'PUT' : 'POST'

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingLink._id ? { id: editingLink._id, ...values } : values)
            })

            const result = await res.json()

            if (result.success) {
                message.success(editingLink._id ? 'Đã cập nhật!' : 'Đã thêm link mới!')
                setIsOpen(false)
                form.resetFields()
                setImageUrl('')
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

    const handleCancel = () => {
        setIsOpen(false)
        form.resetFields()
        setImageUrl('')
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
                    label="Hình ảnh sản phẩm"
                    name="imageUrl"
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
                        {imageUrl && (
                            <div className="mt-2 border rounded p-2">
                                <img
                                    src={imageUrl}
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
            </Form>
        </Modal>
    )
}

export default ShopeeLinksModal
