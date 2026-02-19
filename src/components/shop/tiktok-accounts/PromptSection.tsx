'use client'

import PromptModal from '@/components/shop/tiktok-accounts/PromptModal'
import {
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    PlusOutlined
} from '@ant-design/icons'
import { App, Button, Popconfirm, Spin } from 'antd'
import { useState } from 'react'

interface PromptSectionProps {
    allPrompts: any[]
    promptsLoading: boolean
    onRefresh: () => void          // fetchPrompts
    onAutoFlowRefresh: () => void  // fetchAutoFlows
}

export default function PromptSection({
    allPrompts,
    promptsLoading,
    onRefresh,
    onAutoFlowRefresh
}: PromptSectionProps) {
    const { message } = App.useApp()

    // Modal state
    const [isPromptModalOpen, setIsPromptModalOpen] = useState(false)
    const [editingPrompt, setEditingPrompt] = useState<any>(null)

    // --- Handlers ---

    const handleAddPrompt = () => {
        setEditingPrompt(null)
        setIsPromptModalOpen(true)
    }

    const handleEditPrompt = (prompt: any) => {
        setEditingPrompt(prompt)
        setIsPromptModalOpen(true)
    }

    const handleDeletePrompt = async (promptId: string) => {
        try {
            const response = await fetch(`/api/prompts?id=${promptId}`, {
                method: 'DELETE'
            })
            const data = await response.json()

            if (data.success) {
                message.success('Đã xóa prompt!')
                onRefresh()
                onAutoFlowRefresh()
            } else {
                message.error('Xóa thất bại')
            }
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        }
    }

    const handleDuplicatePrompt = async (prompt: any) => {
        try {
            const response = await fetch('/api/prompts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: `${prompt.title} (Copy)`,
                    content: prompt.content,
                    type: prompt.type || 'describe',
                    subPrompt: prompt.subPrompt || '',
                    order: (prompt.order ?? 0) + 1
                })
            })
            const data = await response.json()
            if (data.success) {
                message.success('Đã nhân bản prompt!')
                onRefresh()
            } else {
                message.error('Nhân bản thất bại: ' + data.error)
            }
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        }
    }

    const handleCopyPromptContent = (content: string) => {
        navigator.clipboard.writeText(content)
        message.success('Đã copy nội dung prompt!')
    }

    // --- Render ---

    return (
        <>
            {/* Header with Add button */}
            <div className="flex items-center justify-between mb-3">
                <span />
                <Button
                    type="primary"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={handleAddPrompt}
                >
                    Thêm
                </Button>
            </div>

            {/* Prompt list */}
            {promptsLoading ? (
                <div className="text-center py-4">
                    <Spin size="small" />
                </div>
            ) : allPrompts.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                    Chưa có prompt nào
                </p>
            ) : (
                <div className="space-y-2">
                    {allPrompts.map((prompt: any) => (
                        <div key={prompt._id} className="border rounded-lg p-3">
                            <div className="flex items-start gap-2">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-sm font-semibold text-gray-800">
                                            {prompt.title}
                                        </h3>
                                        {prompt.type && (
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${prompt.type === 'hook' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                                {prompt.type === 'hook' ? '🪝 Hook' : '📝 Describe'}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-600 line-clamp-2 whitespace-pre-wrap">
                                        {prompt.content}
                                    </p>
                                    {prompt.subPrompt && (
                                        <p className="text-xs text-purple-600 mt-1 line-clamp-2 whitespace-pre-wrap italic">
                                            📝 {prompt.subPrompt}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-1 flex-shrink-0">
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<CopyOutlined />}
                                        onClick={() => handleCopyPromptContent(prompt.content)}
                                        title="Copy nội dung"
                                    />
                                    <Button
                                        type="text"
                                        size="small"
                                        onClick={() => handleDuplicatePrompt(prompt)}
                                        title="Nhân bản"
                                    >
                                        📋
                                    </Button>
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<EditOutlined />}
                                        onClick={() => handleEditPrompt(prompt)}
                                        title="Sửa"
                                    />
                                    <Popconfirm
                                        title="Xóa prompt?"
                                        description="Bạn có chắc muốn xóa prompt này?"
                                        onConfirm={() => handleDeletePrompt(prompt._id)}
                                        okText="Xóa"
                                        cancelText="Hủy"
                                        okButtonProps={{ danger: true }}
                                    >
                                        <Button
                                            type="text"
                                            size="small"
                                            danger
                                            icon={<DeleteOutlined />}
                                            title="Xóa"
                                        />
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Prompt Modal */}
            <PromptModal
                isOpen={isPromptModalOpen}
                setIsOpen={setIsPromptModalOpen}
                editingPrompt={editingPrompt}
                onRefresh={() => {
                    onRefresh()
                    onAutoFlowRefresh()
                }}
            />
        </>
    )
}
