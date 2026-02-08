'use client'

import { apiPost, apiPut } from '@/utils/internalApi'
import { App, Button, Form, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'

interface WorkflowModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    accountId: string
    prompts?: any[]
    editingWorkflow?: any
    onRefresh: () => void
}

const statusOptions = [
    { value: 'active', label: '🟢 Active' },
    { value: 'inactive', label: '⚪ Inactive' },
    { value: 'running', label: '🔵 Running' },
    { value: 'completed', label: '✅ Completed' },
    { value: 'failed', label: '🔴 Failed' }
]

const WorkflowModal = ({
    isOpen,
    setIsOpen,
    accountId,
    prompts = [],
    editingWorkflow,
    onRefresh
}: WorkflowModalProps) => {
    const { message } = App.useApp()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isOpen) {
            if (editingWorkflow) {
                form.setFieldsValue({
                    promptId: editingWorkflow.promptId || '',
                    status: editingWorkflow.status || 'inactive'
                })
            } else {
                form.resetFields()
                form.setFieldsValue({ status: 'inactive' })
            }
        }
    }, [isOpen, editingWorkflow, form])

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()

            const workflowData = {
                accountId,
                promptId: values.promptId,
                status: values.status
            }

            if (editingWorkflow?._id) {
                await apiPut('/api/workflows', { id: editingWorkflow._id, ...workflowData })
                message.success('Đã cập nhật workflow!')
            } else {
                await apiPost('/api/workflows', workflowData)
                message.success('Đã tạo workflow mới!')
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
            title={editingWorkflow ? 'Chỉnh sửa Workflow' : 'Thêm Workflow mới'}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={[
                <Button key="cancel" onClick={() => setIsOpen(false)}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
                    {editingWorkflow ? 'Cập nhật' : 'Tạo'}
                </Button>
            ]}
            width={500}
        >
            <Form form={form} layout="vertical" className="mt-4">
                <Form.Item
                    label="Prompt"
                    name="promptId"
                    rules={[{ required: true, message: 'Vui lòng chọn prompt' }]}
                >
                    <Select
                        placeholder="Chọn prompt..."
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={prompts.map(prompt => ({
                            value: prompt._id,
                            label: `${prompt.title}${prompt.productTitle ? ` — ${prompt.productTitle}` : ''}`
                        }))}
                    />
                </Form.Item>

                <Form.Item
                    label="Trạng thái"
                    name="status"
                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                >
                    <Select
                        placeholder="Chọn trạng thái..."
                        options={statusOptions}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default WorkflowModal
