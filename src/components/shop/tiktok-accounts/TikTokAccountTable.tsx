'use client'

import { useState, useEffect } from 'react'
import { Table, Button, Popconfirm, App, Image, Tag } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined, UserOutlined, CopyOutlined } from '@ant-design/icons'
import TikTokAccountModal from './TikTokAccountModal'
import { TikTokAccount } from '@/models/TikTokAccount'
import { apiDelete } from '@/utils/internalApi'
import { deleteCloudinaryImage } from '@/actions/cloudinary'

const TikTokAccountTable = () => {
    const { message } = App.useApp()
    const [accounts, setAccounts] = useState<TikTokAccount[]>([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingAccount, setEditingAccount] = useState<Partial<TikTokAccount>>({})

    const fetchAccounts = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/tiktok-accounts')
            const data = await response.json()
            if (data.success) {
                setAccounts(data.data)
            }
        } catch (error: any) {
            message.error('Lỗi khi tải danh sách: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAccounts()
    }, [])

    const handleAdd = () => {
        setEditingAccount({})
        setIsModalOpen(true)
    }

    const handleEdit = (record: TikTokAccount) => {
        setEditingAccount(record)
        setIsModalOpen(true)
    }

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text)
        message.success(`Đã copy ${label}!`)
    }

    const handleDelete = async (record: TikTokAccount) => {
        try {
            // Delete avatar from Cloudinary if exists
            if (record.avatar?.publicId) {
                await deleteCloudinaryImage(record.avatar.publicId)
            }

            const result = await apiDelete(`/api/tiktok-accounts?id=${record._id}`)
            if (result.success) {
                message.success('Đã xóa account!')
                fetchAccounts()
            } else {
                message.error(result.error || 'Xóa thất bại')
            }
        } catch (error: any) {
            message.error('Lỗi khi xóa: ' + error.message)
        }
    }

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 80,
            render: (avatar: any) => (
                avatar?.url ? (
                    <Image
                        src={avatar.url}
                        alt="Avatar"
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <UserOutlined className="text-gray-400" />
                    </div>
                )
            )
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            width: 180,
            render: (username: string) => (
                <div className="flex items-center gap-2">
                    <CopyOutlined
                        className="cursor-pointer text-gray-400 hover:text-blue-500"
                        onClick={() => handleCopy(username, 'username')}
                    />
                    <span className="font-mono text-sm text-blue-600">@{username}</span>
                </div>
            ),
            sorter: (a: TikTokAccount, b: TikTokAccount) => a.username.localeCompare(b.username)
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'displayName',
            key: 'displayName',
            width: 180,
            render: (displayName: string) => (
                <div className="flex items-center gap-2">
                    <CopyOutlined
                        className="cursor-pointer text-gray-400 hover:text-blue-500"
                        onClick={() => handleCopy(displayName, 'tên hiển thị')}
                    />
                    <span className="truncate">{displayName}</span>
                </div>
            ),
            sorter: (a: TikTokAccount, b: TikTokAccount) => a.displayName.localeCompare(b.displayName)
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 280,
            render: (email: string) => (
                <div className="flex items-center gap-2">
                    <CopyOutlined
                        className="cursor-pointer text-gray-400 hover:text-blue-500"
                        onClick={() => handleCopy(email, 'email')}
                    />
                    <span className="truncate">{email}</span>
                </div>
            ),
            sorter: (a: TikTokAccount, b: TikTokAccount) => a.email.localeCompare(b.email)
        },
        {
            title: 'Cookie',
            dataIndex: 'cookie',
            key: 'cookie',
            width: 200,
            render: (cookie: string) => (
                <div className="flex items-center gap-2">
                    <CopyOutlined
                        className="cursor-pointer text-gray-400 hover:text-blue-500"
                        onClick={() => handleCopy(cookie, 'cookie')}
                    />
                    <span className="text-xs font-mono text-gray-600 truncate">
                        {cookie.substring(0, 30)}...
                    </span>
                </div>
            )
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 150,
            render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
            sorter: (a: TikTokAccount, b: TikTokAccount) =>
                new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 120,
            render: (_: any, record: TikTokAccount) => (
                <div className="flex gap-2">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xóa account này?"
                        description="Bạn có chắc chắn muốn xóa account này?"
                        onConfirm={() => handleDelete(record)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Button
                            type="link"
                            danger
                            icon={<DeleteOutlined />}
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </div>
            )
        }
    ]

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">TikTok Accounts</h1>
                    <p className="text-gray-600 mt-1">Quản lý tài khoản TikTok</p>
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                    size="large"
                    className="md:text-base text-sm md:h-10 h-8"
                >
                    <span className="hidden md:inline">Thêm Account</span>
                    <span className="md:hidden">Thêm</span>
                </Button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
                <Table
                    columns={columns}
                    dataSource={accounts}
                    rowKey="_id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Tổng ${total} accounts`
                    }}
                />
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
                {loading ? (
                    <div className="text-center py-8">Đang tải...</div>
                ) : accounts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">Chưa có account nào</div>
                ) : (
                    accounts.map(account => (
                        <div key={account._id?.toString()} className="bg-white border rounded-lg p-4 shadow-sm">
                            {/* Avatar & Name */}
                            <div className="flex items-center gap-3 mb-3">
                                {account.avatar?.url ? (
                                    <img
                                        src={account.avatar.url}
                                        alt="Avatar"
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                        <UserOutlined className="text-gray-400" />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="font-semibold">{account.displayName}</div>
                                    <div className="flex items-center gap-2">
                                        <CopyOutlined
                                            className="cursor-pointer text-gray-400 hover:text-blue-500 text-xs"
                                            onClick={() => handleCopy(account.username, 'username')}
                                        />
                                        <span className="text-xs text-blue-600 font-mono">@{account.username}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-2">
                                <div className="text-xs text-gray-500 mb-1">Email</div>
                                <div className="flex items-center gap-2">
                                    <CopyOutlined
                                        className="cursor-pointer text-gray-400 hover:text-blue-500 flex-shrink-0"
                                        onClick={() => handleCopy(account.email, 'email')}
                                    />
                                    <span className="text-sm truncate">{account.email}</span>
                                </div>
                            </div>

                            {/* Cookie */}
                            <div className="mb-3">
                                <div className="text-xs text-gray-500 mb-1">Cookie</div>
                                <div className="flex items-center gap-2">
                                    <CopyOutlined
                                        className="cursor-pointer text-gray-400 hover:text-blue-500 flex-shrink-0"
                                        onClick={() => handleCopy(account.cookie, 'cookie')}
                                    />
                                    <span className="text-xs font-mono text-gray-600 truncate">
                                        {account.cookie.substring(0, 30)}...
                                    </span>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="text-xs text-gray-400 mb-3">
                                {new Date(account.createdAt!).toLocaleDateString('vi-VN')}
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-3 border-t">
                                <Button
                                    type="default"
                                    icon={<EditOutlined />}
                                    onClick={() => handleEdit(account)}
                                    size="small"
                                    className="flex-1"
                                >
                                    Sửa
                                </Button>
                                <Popconfirm
                                    title="Xóa account này?"
                                    description="Bạn có chắc chắn muốn xóa account này?"
                                    onConfirm={() => handleDelete(account)}
                                    okText="Xóa"
                                    cancelText="Hủy"
                                    okButtonProps={{ danger: true }}
                                >
                                    <Button
                                        danger
                                        icon={<DeleteOutlined />}
                                        size="small"
                                        className="flex-1"
                                    >
                                        Xóa
                                    </Button>
                                </Popconfirm>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <TikTokAccountModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                editingAccount={editingAccount}
                setEditingAccount={setEditingAccount}
                onRefresh={fetchAccounts}
            />
        </div>
    )
}

export default TikTokAccountTable
