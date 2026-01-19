'use client'

import { useEffect, useState } from 'react'
import { DeleteTwoTone, EditTwoTone, CopyOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Table, Image, App, Card, Row, Col, Input } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { isMobile } from 'react-device-detect'
import { ShopeeLink } from '@/models/ShopeeLink'
import ShopeeLinksModal from './ShopeeLinksModal'
import { apiGet, apiDelete } from '@/utils/internalApi'
import useDebounce from '@/hooks/useDebounce'

const initialLink: Partial<ShopeeLink> = {
    mediaFile: { url: '', type: 'image' as const },
    productUrl: ''
}

const ShopeeLinksTable = () => {
    const { message } = App.useApp()
    const [links, setLinks] = useState<ShopeeLink[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingLink, setEditingLink] = useState<Partial<ShopeeLink>>(initialLink)
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedSearchTerm = useDebounce(searchTerm, 300)

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

    const columns: ColumnsType<ShopeeLink> = [
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

            {/* Filter links based on search term */}
            {(() => {
                const filteredLinks = links.filter(link =>
                    link.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                )

                return isMobile ? (
                    <Row gutter={[16, 16]}>
                        {filteredLinks.map((link) => (
                            <Col key={link._id.toString()} xs={12} sm={12}>
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
                                        <CopyOutlined
                                            key="copy"
                                            onClick={() => handleCopy(link.description || '', 'description')}
                                            className="text-lg"
                                        />,
                                        <EditTwoTone
                                            key="edit"
                                            onClick={() => handleEdit(link)}
                                            className="text-lg"
                                        />,
                                        <Popconfirm
                                            key="delete"
                                            title="Xóa link?"
                                            description="Bạn có chắc muốn xóa?"
                                            onConfirm={() => handleDelete(link._id.toString())}
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
                                                    onClick={() => handleCopy(link.name, 'name')}
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
                                                        onClick={() => handleCopy(link.productUrl, 'link')}
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
                    />
                )
            })()}

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
