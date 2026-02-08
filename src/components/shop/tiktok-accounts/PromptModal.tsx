'use client'

import { apiPost, apiPut } from '@/utils/internalApi'
import { App, Button, Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'

interface PromptModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    productId: string
    editingPrompt?: any
    onRefresh: () => void
}

const PromptModal = ({
    isOpen,
    setIsOpen,
    productId,
    editingPrompt,
    onRefresh
}: PromptModalProps) => {
    const { message } = App.useApp()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isOpen) {
            if (editingPrompt) {
                form.setFieldsValue({
                    title: editingPrompt.title || '',
                    content: editingPrompt.content || '',
                    mediaId: editingPrompt.mediaId || ''
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

            const promptData = {
                productId,
                title: values.title,
                content: values.content,
                mediaId: values.mediaId || ''
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
            message.error('Lỗi: ' + error.message)
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
                    label="Media ID"
                    name="mediaId"
                >
                    <Input placeholder="Nhập Media ID (optional)..." />
                </Form.Item>

                <Form.Item
                    label="Nội dung"
                    name="content"
                    rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
                >
                    <Input.TextArea
                        rows={6}
                        placeholder="Nhập nội dung prompt..."
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default PromptModal
