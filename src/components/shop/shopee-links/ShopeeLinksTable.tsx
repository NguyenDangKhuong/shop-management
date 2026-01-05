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
    imageUrl: '',
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

    const handleCopy = async (url: string) => {
        try {
            await navigator.clipboard.writeText(url)
            message.success('Đã copy link!')
        } catch (error) {
            console.error('Failed to copy:', error)
            message.error('Không thể copy link')
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
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            align: 'center',
            width: 150,
            render: (url: string) => (
                <Image
                    src={url}
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
                            onClick={() => handleCopy(url)}
                            title="Copy link"
                        />
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {url.length > 50 ? `${url.substring(0, 50)}...` : url}
                        </a>
                    </div>
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
                                        <Image
                                            src={link.imageUrl}
                                            alt={link.name}
                                            style={{ height: 100, objectFit: 'cover' }}
                                            preview={true}
                                        />
                                    }
                                    actions={[
                                        <CopyOutlined
                                            key="copy"
                                            onClick={() => handleCopy(link.productUrl)}
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
                                >
                                    <Card.Meta
                                        title={<div className="font-medium text-sm">{link.name}</div>}
                                        description={
                                            <a
                                                href={link.productUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 text-xs block truncate"
                                            >
                                                {link.productUrl.replace('https://', '')}
                                            </a>
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
