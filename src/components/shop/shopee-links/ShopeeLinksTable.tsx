'use client'

import React, { useEffect, useState } from 'react'
import { DeleteTwoTone, EditTwoTone, CopyOutlined, HolderOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Table, Image, App, Card, Row, Col, Input } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { isMobile } from 'react-device-detect'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ShopeeLink } from '@/models/ShopeeLink'
import ShopeeLinksModal from './ShopeeLinksModal'
import { apiGet, apiDelete, apiPost } from '@/utils/internalApi'
import useDebounce from '@/hooks/useDebounce'

const initialLink: Partial<ShopeeLink> = {
    mediaFile: { url: '', type: 'image' as const },
    productUrl: ''
}

// Sortable Row Component for Table
interface SortableRowProps {
    children: React.ReactNode
    'data-row-key': string
}

const SortableRow = ({ children, 'data-row-key': dataRowKey, ...props }: SortableRowProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: dataRowKey })

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        ...(props as any).style
    }

    return (
        <tr ref={setNodeRef} style={style} {...props} {...attributes}>
            {Array.isArray(children)
                ? children.map((child: any) => {
                    if (child?.key === 'drag') {
                        return React.cloneElement(child, {
                            children: (
                                <div {...listeners} className="cursor-move" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    {child.props.children}
                                </div>
                            )
                        })
                    }
                    return child
                })
                : children
            }
        </tr>
    )
}

// Sortable Card Component for Mobile
interface SortableCardProps {
    link: ShopeeLink
    onEdit: (link: ShopeeLink) => void
    onDelete: (id: string) => void
    onCopy: (text: string, type: 'link' | 'description' | 'name') => void
    loading: boolean
}

const SortableCard = ({ link, onEdit, onDelete, onCopy, loading }: SortableCardProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: link._id.toString() })

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1
    }

    return (
        <Col key={link._id.toString()} xs={12} sm={12} ref={setNodeRef} style={style}>
            <Card
                loading={loading}
                cover={
                    <div style={{ width: '100%', height: '100px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                        <Image
                            src={link.mediaFile?.url}
                            alt={link.name}
                            width="100%"
                            height={100}
                            style={{ height: '100%', objectFit: 'cover', width: '100%', display: 'block' }}
                            preview={true}
                            placeholder={
                                <div style={{ width: '100%', height: '100px', backgroundColor: '#f0f0f0' }} />
                            }
                        />
                    </div>
                }
                actions={[
                    <div key="drag" {...attributes} {...listeners} className="cursor-move">
                        <HolderOutlined className="text-lg" />
                    </div>,
                    <CopyOutlined
                        key="copy"
                        onClick={() => onCopy(link.description || '', 'description')}
                        className="text-lg"
                    />,
                    <EditTwoTone
                        key="edit"
                        onClick={() => onEdit(link)}
                        className="text-lg"
                    />,
                    <Popconfirm
                        key="delete"
                        title="Xóa link?"
                        description="Bạn có chắc muốn xóa?"
                        onConfirm={() => onDelete(link._id.toString())}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <DeleteTwoTone
                            twoToneColor="#ff4d4f"
                            className="text-lg"
                        />
                    </Popconfirm>
                ]}
                bodyStyle={{ padding: '12px' }}
            >
                <Card.Meta
                    title={
                        <div className="flex items-center gap-1">
                            <CopyOutlined
                                className="text-gray-400 hover:text-blue-500 cursor-pointer text-xs"
                                onClick={() => onCopy(link.name, 'name')}
                                title="Copy tên sản phẩm"
                            />
                            <span className="font-medium text-sm">{link.name}</span>
                        </div>
                    }
                    description={
                        <div className="flex flex-col gap-1 mt-1">
                            <div className="flex items-center gap-1">
                                <CopyOutlined
                                    className="text-gray-400 hover:text-blue-500 cursor-pointer text-xs"
                                    onClick={() => onCopy(link.productUrl, 'link')}
                                    title="Copy link"
                                />
                                <a
                                    href={link.productUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 text-xs block truncate flex-1"
                                >
                                    {link.productUrl.replace('https://', '')}
                                </a>
                            </div>
                            {link.description && (
                                <div className="text-gray-500 bg-gray-50 p-1 rounded">
                                    <span className="text-xs line-clamp-2">{link.description}</span>
                                </div>
                            )}
                        </div>
                    }
                />
            </Card>
        </Col>
    )
}

const ShopeeLinksTable = () => {
    const { message } = App.useApp()
    const [links, setLinks] = useState<ShopeeLink[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingLink, setEditingLink] = useState<Partial<ShopeeLink>>(initialLink)
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 300)

    // Drag and drop sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    const loadLinks = async () => {
        setLoading(true)
        const result = await apiGet<ShopeeLink[]>('/api/shopee-links')

        if (result.success && result.data) {
            setLinks(result.data)
        } else {
            message.error(result.error || 'Không thể tải danh sách links')
        }
        setLoading(false)
    }

    useEffect(() => {
        loadLinks()
    }, [])

    const handleDelete = async (id: string) => {
        const result = await apiDelete(`/api/shopee-links?id=${id}`)

        if (result.success) {
            message.success('Đã xóa link!')
            loadLinks()
        } else {
            message.error(result.error || 'Xóa link thất bại')
        }
    }

    const handleCopy = async (text: string, type: 'link' | 'description' | 'name' = 'link') => {
        try {
            await navigator.clipboard.writeText(text)
            const messages = {
                link: 'Đã copy link!',
                description: 'Đã copy mô tả!',
                name: 'Đã copy tên!'
            }
            message.success(messages[type])
        } catch (error) {
            console.error('Failed to copy:', error)
            message.error('Không thể copy')
        }
    }

    const handleEdit = (link: ShopeeLink) => {
        setEditingLink(link)
        setIsModalOpen(true)
    }

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event

        if (!over || active.id === over.id) {
            return
        }

        const oldIndex = links.findIndex((link) => link._id.toString() === active.id)
        const newIndex = links.findIndex((link) => link._id.toString() === over.id)

        // Optimistically update UI
        const newLinks = arrayMove(links, oldIndex, newIndex)
        setLinks(newLinks)

        // Update order in database
        const items = newLinks.map((link, index) => ({
            id: link._id.toString(),
            order: index
        }))

        const result = await apiPost('/api/shopee-links/reorder', { items })

        if (!result.success) {
            message.error('Không thể cập nhật thứ tự')
            // Revert on error
            loadLinks()
        }
    }

    const columns: ColumnsType<ShopeeLink> = [
        {
            title: '',
            key: 'drag',
            width: 40,
            align: 'center',
            render: () => <HolderOutlined className="cursor-move" />
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            ellipsis: true
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'mediaFile',
            key: 'mediaFile',
            align: 'center',
            width: 150,
            render: (mediaFile: { url: string; type: string }) => (
                <Image
                    src={mediaFile?.url}
                    alt="Product"
                    width={100}
                    height={100}
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
            )
        },
        {
            title: 'Link sản phẩm',
            dataIndex: 'productUrl',
            key: 'productUrl',
            render: (url: string) => {
                if (!url) return null
                return (
                    <div className="flex items-center gap-2">
                        <CopyOutlined
                            className="cursor-pointer text-gray-500 hover:text-blue-500"
                            onClick={() => handleCopy(url, 'link')}
                            title="Copy link"
                        />
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {url.length > 30 ? `${url.substring(0, 30)}...` : url}
                        </a>
                    </div>
                )
            }
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 250,
            render: (desc: string) => {
                if (!desc) return <span className="text-gray-400 italic">Không có mô tả</span>
                return (
                    <span className="line-clamp-2" title={desc}>
                        {desc}
                    </span>
                )
            }
        },
        {
            title: 'Hành động',
            key: 'actions',
            align: 'center',
            width: 120,
            render: (_, record) => (
                <div className="flex gap-2 justify-center">
                    <EditTwoTone
                        className="cursor-pointer text-lg"
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Xóa link?"
                        description="Bạn có chắc muốn xóa link này?"
                        onConfirm={() => handleDelete(record._id.toString())}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <DeleteTwoTone className="cursor-pointer text-lg" twoToneColor="#ff4d4f" />
                    </Popconfirm>
                </div>
            )
        }
    ]

    // Filter links based on search term
    const filteredLinks = links.filter(link =>
        link.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Shopee Links ({links.length})</h2>
                <Button
                    type="primary"
                    onClick={() => {
                        setEditingLink(initialLink)
                        setIsModalOpen(true)
                    }}
                >
                    Thêm Link Mới
                </Button>
            </div>

            <div className="mb-4">
                <Input.Search
                    placeholder="Tìm kiếm theo tên sản phẩm..."
                    allowClear
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: 400 }}
                />
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={filteredLinks.map(link => link._id.toString())}
                    strategy={verticalListSortingStrategy}
                >
                    {isMobile ? (
                        <Row gutter={[16, 16]}>
                            {filteredLinks.map((link) => (
                                <SortableCard
                                    key={link._id.toString()}
                                    link={link}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onCopy={handleCopy}
                                    loading={loading}
                                />
                            ))}
                        </Row>
                    ) : (
                        <Table
                            rowKey="_id"
                            loading={loading}
                            bordered
                            columns={columns}
                            dataSource={filteredLinks}
                            pagination={{ pageSize: 20, showTotal: (total) => `Tổng ${total} links` }}
                            components={{
                                body: {
                                    row: SortableRow
                                }
                            }}
                        />
                    )}
                </SortableContext>
            </DndContext>

            <ShopeeLinksModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                editingLink={editingLink}
                setEditingLink={setEditingLink}
                onRefresh={loadLinks}
            />
        </div>
    )
}

export default ShopeeLinksTable
