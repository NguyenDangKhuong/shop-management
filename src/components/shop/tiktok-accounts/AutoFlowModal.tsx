'use client'

import { deleteCloudinaryImage } from '@/actions/cloudinary'
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload'
import { autoFlowVideoUploadConfig } from '@/utils/cloudinaryConfig'
import { apiPost, apiPut } from '@/utils/internalApi'
import { DeleteOutlined } from '@ant-design/icons'
import { App, Button, Form, Input, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'

interface AutoFlowModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    accountId: string
    products?: any[]
    autoflows?: any[]
    editingAutoFlow?: any
    onRefresh: () => void
    shopeeLinks?: any[]
    allPrompts?: any[]
}

const AutoFlowModal = ({
    isOpen,
    setIsOpen,
    accountId,
    products = [],
    autoflows = [],
    editingAutoFlow,
    onRefresh,
    shopeeLinks = [],
    allPrompts = []
}: AutoFlowModalProps) => {
    const { message } = App.useApp()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [videoFile, setVideoFile] = useState<any>(null)

    const { openWidget: openVideoWidget, isUploading: isVideoUploading } = useCloudinaryUpload(
        autoFlowVideoUploadConfig,
        async (result) => {
            setVideoFile({
                url: result.url,
                publicId: result.publicId,
                type: 'video'
            })
            message.success('Upload video thành công!')
        },
        (error) => {
            message.error('Lỗi upload video: ' + error.message)
        }
    )

    useEffect(() => {
        if (isOpen) {
            if (editingAutoFlow) {
                form.setFieldsValue({
                    productId: editingAutoFlow.productId || '',
                    n8nUrl: editingAutoFlow.n8nUrl || '',
                    shopeeLinkId: editingAutoFlow.shopeeLinkId || undefined,
                    promptIds: editingAutoFlow.promptIds || []
                })
                setVideoFile(editingAutoFlow.videoFile || null)
            } else {
                form.resetFields()
                setVideoFile(null)
            }
        }
    }, [isOpen, editingAutoFlow, form])

    const handleRemoveVideo = async () => {
        if (videoFile?.publicId) {
            try {
                await deleteCloudinaryImage(videoFile.publicId)
            } catch (e) {
                // Ignore delete error
            }
        }
        setVideoFile(null)
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()

            const selectedProduct = products.find(p => p.product_id === values.productId)
            const selectedShopeeLink = shopeeLinks.find(l => l._id === values.shopeeLinkId)

            const autoFlowData: any = {
                accountId,
                productId: values.productId,
                productTitle: selectedProduct?.title || editingAutoFlow?.productTitle || '',
                productImage: selectedProduct?.images?.[0]?.url_list?.[0] || editingAutoFlow?.productImage || '',
                autoFlowUrl: `${window.location.origin}/api/autoflows?accountId=${accountId}&productId=${values.productId}`,
                n8nUrl: values.n8nUrl || '',
                description: selectedShopeeLink?.description || editingAutoFlow?.description || '',
                enabled: editingAutoFlow?.enabled || false,
                promptIds: values.promptIds || []
            }

            if (videoFile) {
                autoFlowData.videoFile = videoFile
            } else {
                autoFlowData.videoFile = null
            }

            if (editingAutoFlow?._id) {
                await apiPut('/api/autoflows', { id: editingAutoFlow._id, ...autoFlowData })
                message.success('Đã cập nhật AutoFlow!')
            } else {
                await apiPost('/api/autoflows', autoFlowData)
                message.success('Đã tạo AutoFlow mới!')
            }

            setIsOpen(false)
            onRefresh()
        } catch (error: any) {
            if (error?.message) {
                message.error('Lỗi: ' + error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title={editingAutoFlow ? 'Chỉnh sửa AutoFlow' : 'Thêm AutoFlow mới'}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={[
                <Button key="cancel" onClick={() => setIsOpen(false)}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
                    {editingAutoFlow ? 'Cập nhật' : 'Tạo'}
                </Button>
            ]}
            width={500}
        >
            <Form form={form} layout="vertical" className="mt-4">
                <Form.Item
                    label="Sản phẩm"
                    name="productId"
                    rules={[{ required: true, message: 'Vui lòng chọn sản phẩm' }]}
                >
                    <Select
                        placeholder="Chọn sản phẩm..."
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={products
                            .filter(product => {
                                if (editingAutoFlow?.productId === product.product_id) return true
                                return !autoflows.some(a => a.productId === product.product_id)
                            })
                            .map(product => ({
                                value: product.product_id,
                                label: product.title
                            }))
                        }
                    />
                </Form.Item>

                <Form.Item
                    label="Shopee Link"
                    name="shopeeLinkId"
                >
                    <Select
                        placeholder="Chọn Shopee Link để lấy description..."
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        options={shopeeLinks.map((link: any) => ({
                            value: link._id,
                            label: link.name
                        }))}
                        onChange={(value) => {
                            const selectedLink = shopeeLinks.find(l => l._id === value)
                            if (selectedLink?.description) {
                                message.info(`Description: ${selectedLink.description.substring(0, 50)}...`)
                            }
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label="n8n URL"
                    name="n8nUrl"
                >
                    <Input placeholder="Nhập n8n webhook URL (optional)..." />
                </Form.Item>

                <Form.Item
                    label="Chọn Prompts"
                    name="promptIds"
                >
                    <Select
                        mode="multiple"
                        placeholder="Chọn prompts từ Prompt Library..."
                        allowClear
                        showSearch
                        optionFilterProp="label"
                        options={allPrompts.map((prompt: any) => ({
                            value: prompt._id,
                            label: prompt.title
                        }))}
                        optionRender={(option) => {
                            const prompt = allPrompts.find((p: any) => p._id === option.value)
                            return (
                                <div className="py-1">
                                    <div className="text-sm font-medium">{prompt?.title}</div>
                                    <div className="text-xs text-gray-400 line-clamp-1">{prompt?.content}</div>
                                </div>
                            )
                        }}
                    />
                </Form.Item>

                {/* Video Upload */}
                <Form.Item label="Video">
                    {videoFile ? (
                        <div className="flex items-center gap-3 p-2 border rounded-lg bg-gray-50">
                            <video
                                src={videoFile.url}
                                className="w-24 h-16 rounded object-cover bg-black"
                                muted
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-600 truncate">{videoFile.url}</p>
                            </div>
                            <Button
                                type="text"
                                danger
                                size="small"
                                icon={<DeleteOutlined />}
                                onClick={handleRemoveVideo}
                                title="Xóa video"
                            />
                        </div>
                    ) : (
                        <Button
                            onClick={() => openVideoWidget()}
                            loading={isVideoUploading}
                            block
                        >
                            🎬 Upload Video
                        </Button>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AutoFlowModal
