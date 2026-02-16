'use client'

import { useEffect, useState } from 'react'

import {
    CheckOutlined,
    CopyOutlined,
    SearchOutlined
} from '@ant-design/icons'
import { Button, Card, Input, message, Space, Spin, Tag, Typography } from 'antd'

const { Title, Text, Paragraph } = Typography

interface Prompt {
    _id: string
    accountId: string
    title: string
    content: string
    subPrompt?: string
    type?: 'hook' | 'describe'
    order?: number
}

const PromptLibrary = () => {
    const [prompts, setPrompts] = useState<Prompt[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [copiedId, setCopiedId] = useState<string | null>(null)
    const [filterType, setFilterType] = useState<'all' | 'hook' | 'describe'>('all')

    useEffect(() => {
        fetchPrompts()
    }, [])

    const fetchPrompts = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/prompts')
            const data = await res.json()
            if (data.success) {
                setPrompts(data.data)
            }
        } catch {
            message.error('Không thể tải prompts')
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopiedId(id)
            message.success('Đã copy!')
            setTimeout(() => setCopiedId(null), 2000)
        } catch {
            message.error('Copy thất bại')
        }
    }

    const filteredPrompts = prompts.filter(p => {
        const matchSearch = !searchTerm ||
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.content.toLowerCase().includes(searchTerm.toLowerCase())
        const matchType = filterType === 'all' || p.type === filterType
        return matchSearch && matchType
    })

    const hookPrompts = filteredPrompts.filter(p => p.type === 'hook')
    const describePrompts = filteredPrompts.filter(p => p.type !== 'hook')

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Spin size="large" />
            </div>
        )
    }

    const PromptCard = ({ prompt }: { prompt: Prompt }) => (
        <Card
            size="small"
            className="mb-3 hover:shadow-md transition-shadow"
            title={
                <div className="flex items-center justify-between">
                    <Space>
                        <Tag color={prompt.type === 'hook' ? 'volcano' : 'blue'}>
                            {prompt.type === 'hook' ? '🎣 Hook' : '📝 Describe'}
                        </Tag>
                        <Text strong className="text-sm">{prompt.title}</Text>
                    </Space>
                    <Button
                        type="text"
                        size="small"
                        icon={copiedId === prompt._id ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined />}
                        onClick={() => handleCopy(prompt.content, prompt._id)}
                        title="Copy prompt content"
                    />
                </div>
            }
        >
            <Paragraph
                className="text-sm mb-2 whitespace-pre-wrap"
                style={{ marginBottom: prompt.subPrompt ? 8 : 0 }}
            >
                {prompt.content}
            </Paragraph>
            {prompt.subPrompt && (
                <div className="border-t pt-2 mt-2">
                    <div className="flex items-center justify-between mb-1">
                        <Text type="secondary" className="text-xs font-medium">Sub-prompt</Text>
                        <Button
                            type="text"
                            size="small"
                            icon={copiedId === `${prompt._id}-sub` ? <CheckOutlined style={{ color: '#52c41a' }} /> : <CopyOutlined />}
                            onClick={() => handleCopy(prompt.subPrompt!, `${prompt._id}-sub`)}
                            title="Copy sub-prompt"
                        />
                    </div>
                    <Text type="secondary" className="text-xs whitespace-pre-wrap">{prompt.subPrompt}</Text>
                </div>
            )}
        </Card>
    )

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <Title level={3} style={{ margin: 0 }}>
                    📋 Prompt Library ({prompts.length})
                </Title>
            </div>

            {/* Search & Filters */}
            <div className="flex items-center gap-3 mb-6 flex-wrap">
                <Input
                    placeholder="Tìm kiếm prompt..."
                    prefix={<SearchOutlined />}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    allowClear
                    style={{ maxWidth: 400 }}
                />
                <Space>
                    <Tag.CheckableTag
                        checked={filterType === 'all'}
                        onChange={() => setFilterType('all')}
                    >
                        Tất cả ({prompts.length})
                    </Tag.CheckableTag>
                    <Tag.CheckableTag
                        checked={filterType === 'hook'}
                        onChange={() => setFilterType('hook')}
                    >
                        🎣 Hook ({prompts.filter(p => p.type === 'hook').length})
                    </Tag.CheckableTag>
                    <Tag.CheckableTag
                        checked={filterType === 'describe'}
                        onChange={() => setFilterType('describe')}
                    >
                        📝 Describe ({prompts.filter(p => p.type !== 'hook').length})
                    </Tag.CheckableTag>
                </Space>
            </div>

            {filteredPrompts.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    {searchTerm ? 'Không tìm thấy prompt nào' : 'Chưa có prompt nào'}
                </div>
            ) : (
                <div>
                    {/* Hook prompts */}
                    {hookPrompts.length > 0 && filterType !== 'describe' && (
                        <div className="mb-6">
                            <Title level={5} className="mb-3">🎣 Hook Prompts ({hookPrompts.length})</Title>
                            {hookPrompts.map(p => <PromptCard key={p._id} prompt={p} />)}
                        </div>
                    )}

                    {/* Describe prompts */}
                    {describePrompts.length > 0 && filterType !== 'hook' && (
                        <div className="mb-6">
                            <Title level={5} className="mb-3">📝 Describe Prompts ({describePrompts.length})</Title>
                            {describePrompts.map(p => <PromptCard key={p._id} prompt={p} />)}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default PromptLibrary
