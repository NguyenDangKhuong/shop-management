'use client'

import { apiPost, apiPut } from '@/utils/internalApi'
import { App, Button, Form, Input, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'

interface PromptModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    accountId: string
    editingPrompt?: any
    onRefresh: () => void
    veo3Media?: any[]
}

const PromptModal = ({
    isOpen,
    setIsOpen,
    accountId,
    editingPrompt,
    onRefresh,
    veo3Media = []
}: PromptModalProps) => {
    const { message } = App.useApp()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const promptType = Form.useWatch('type', form)

    useEffect(() => {
        if (isOpen) {
            if (editingPrompt) {
                form.setFieldsValue({
                    title: editingPrompt.title || '',
                    type: editingPrompt.type || 'describe',
                    content: editingPrompt.content || '',
                    subPrompt: editingPrompt.subPrompt || '',
                    referenceImages: editingPrompt.referenceImages?.map((r: any) => r.mediaId) || []
                })
            } else {
                form.resetFields()
            }
        }
    }, [isOpen, editingPrompt, form])

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()

            const promptData: any = {
                accountId,
                title: values.title,
                type: values.type || 'describe',
                content: values.content,
                subPrompt: values.subPrompt || '',
                referenceImages: (values.referenceImages || []).map((mid: string) => ({
                    imageUsageType: 'IMAGE_USAGE_TYPE_ASSET',
                    mediaId: mid
                }))
            }

            if (editingPrompt?._id) {
                await apiPut('/api/prompts', { id: editingPrompt._id, ...promptData })
                message.success('Đã cập nhật prompt!')
            } else {
                await apiPost('/api/prompts', promptData)
                message.success('Đã tạo prompt mới!')
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
            title={editingPrompt ? 'Chỉnh sửa Prompt' : 'Thêm Prompt mới'}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={[
                <Button key="cancel" onClick={() => setIsOpen(false)}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
                    {editingPrompt ? 'Cập nhật' : 'Tạo'}
                </Button>
            ]}
            width={500}
        >
            <Form form={form} layout="vertical" className="mt-4">
                <Form.Item
                    label="Tiêu đề"
                    name="title"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                >
                    <Input placeholder="Nhập tiêu đề prompt..." />
                </Form.Item>

                <Form.Item
                    label="Loại prompt"
                    name="type"
                    initialValue="describe"
                >
                    <Select
                        options={[
                            { value: 'hook', label: '🪝 Hook' },
                            { value: 'describe', label: '📝 Describe' }
                        ]}
                    />
                </Form.Item>

                {(promptType || 'describe') === 'describe' && (
                    <Form.Item
                        label="Reference Images"
                        name="referenceImages"
                    >
                        <Select
                            mode="multiple"
                            placeholder="Chọn Media IDs (optional)..."
                            allowClear
                            showSearch
                            optionFilterProp="label"
                            options={veo3Media.map((m: any) => ({
                                value: m.mediaId,
                                label: m.mediaId,
                            }))}
                            optionRender={(option) => {
                                const media = veo3Media.find((m: any) => m.mediaId === option.value)
                                return (
                                    <div className="flex items-center gap-2 py-1">
                                        {media?.mediaFile?.url ? (
                                            <img
                                                src={media.mediaFile.url}
                                                alt={String(option.value)}
                                                className="w-8 h-8 rounded object-cover flex-shrink-0"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded bg-gray-200 flex-shrink-0" />
                                        )}
                                        <span className="font-mono text-sm">{option.label}</span>
                                    </div>
                                )
                            }}
                        />
                    </Form.Item>
                )}

                <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[
                        { required: true, message: 'Vui lòng nhập nội dung' }
                    ]}
                >
                    <Input.TextArea
                        rows={6}
                        placeholder="Nhập nội dung prompt..."
                    />
                </Form.Item>

                <Form.Item
                    label="Sub Prompt"
                    name="subPrompt"
                >
                    <Input.TextArea
                        rows={3}
                        placeholder="Nhập sub prompt..."
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default PromptModal
