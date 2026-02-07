'use client'

import { useState, useEffect } from 'react'
import { Form, Input, Modal, Button, App } from 'antd'
import { apiPost, apiPut } from '@/utils/internalApi'

interface PromptModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    accountId: string
    editingPrompt?: any
    onRefresh: () => void
}

const PromptModal = ({
    isOpen,
    setIsOpen,
    accountId,
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
                    content: editingPrompt.content || ''
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
                accountId,
                title: values.title,
                content: values.content
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
