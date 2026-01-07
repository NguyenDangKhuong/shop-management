'use client'

import { useState, useEffect, useRef } from 'react'
import { Form, Input, Modal, Button, App } from 'antd'
import { UploadOutlined, UserOutlined, MailOutlined } from '@ant-design/icons'
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload'
import { TikTokAccount } from '@/models/TikTokAccount'
import { tiktokAccountUploadConfig } from '@/utils/cloudinaryConfig'
import { apiPost, apiPut } from '@/utils/internalApi'
import { deleteCloudinaryImage } from '@/actions/cloudinary'

interface TikTokAccountModalProps {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
    editingAccount: Partial<TikTokAccount>
    setEditingAccount: (value: Partial<TikTokAccount>) => void
    onRefresh: () => void
}

const TikTokAccountModal = ({
    isOpen,
    setIsOpen,
    editingAccount,
    onRefresh
}: TikTokAccountModalProps) => {
    const { message } = App.useApp()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState<{ url: string; type: string; publicId?: string } | null>(null)

    // Track newly uploaded avatar this session
    const uploadedThisSessionRef = useRef<{ url: string; type: string; publicId?: string } | null>(null)

    // Cloudinary upload hook
    const { openWidget, isUploading } = useCloudinaryUpload(
        tiktokAccountUploadConfig,
        (result) => {
            const newAvatar = {
                url: result.url,
                type: 'image',
                publicId: result.publicId
            }
            setAvatar(newAvatar)
            uploadedThisSessionRef.current = newAvatar
            form.setFieldsValue({ avatarUrl: result.url })
            message.success('Upload avatar thành công!')
        },
        (error) => {
            message.error('Upload thất bại: ' + (error?.message || 'Unknown error'))
        }
    )

    // Set form values when modal opens
    useEffect(() => {
        if (isOpen) {
            uploadedThisSessionRef.current = null

            form.setFieldsValue({
                username: editingAccount.username || '',
                displayName: editingAccount.displayName || '',
                email: editingAccount.email || '',
                cookie: editingAccount.cookie || '',
                avatarUrl: editingAccount.avatar?.url || ''
            })
            setAvatar(editingAccount.avatar || null)
        } else {
            setAvatar(null)
        }
    }, [isOpen, editingAccount, form])

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()

            const submitData: any = {
                username: values.username,
                displayName: values.displayName,
                email: values.email,
                cookie: values.cookie,
                avatar: avatar
            }

            const result = editingAccount._id
                ? await apiPut('/api/tiktok-accounts', { id: editingAccount._id, ...submitData })
                : await apiPost('/api/tiktok-accounts', submitData)

            if (result.success) {
                uploadedThisSessionRef.current = null
                message.success(editingAccount._id ? 'Đã cập nhật!' : 'Đã thêm account mới!')
                setIsOpen(false)
                form.resetFields()
                setAvatar(null)
                onRefresh()
            } else {
                message.error(result.error || 'Lưu account thất bại')
            }
        } catch (error: any) {
            message.error(error.message || 'Có lỗi xảy ra')
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = async () => {
        setLoading(true)

        if (uploadedThisSessionRef.current?.publicId) {
            try {
                const result = await deleteCloudinaryImage(uploadedThisSessionRef.current.publicId)
                if (result.success) {
                    console.log('Cleanup: Deleted unused avatar')
                }
            } catch (error) {
                console.error('Cleanup error:', error)
            }
        }

        uploadedThisSessionRef.current = null
        setLoading(false)
        setIsOpen(false)
        form.resetFields()
        setAvatar(null)
    }

    return (
        <Modal
            title={editingAccount._id ? 'Sửa TikTok Account' : 'Thêm TikTok Account Mới'}
            open={isOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
            confirmLoading={loading}
            width={600}
            okText={editingAccount._id ? 'Cập nhật' : 'Thêm'}
        >
            <Form form={form} layout="vertical" className="mt-4">
                <Form.Item
                    label="Username (Account ID)"
                    name="username"
                    rules={[{ required: true, message: 'Vui lòng nhập username' }]}
                >
                    <Input placeholder="@username hoặc account ID" prefix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                    label="Tên hiển thị"
                    name="displayName"
                    rules={[{ required: true, message: 'Vui lòng nhập tên hiển thị' }]}
                >
                    <Input placeholder="VD: My TikTok Shop" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email' },
                        { type: 'email', message: 'Email không hợp lệ' }
                    ]}
                >
                    <Input placeholder="example@email.com" prefix={<MailOutlined />} />
                </Form.Item>

                <Form.Item
                    label="Cookie"
                    name="cookie"
                    rules={[{ required: true, message: 'Vui lòng nhập cookie' }]}
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="sessionid=...; sid_tt=...; ..."
                    />
                </Form.Item>

                <Form.Item
                    label="Avatar"
                    name="avatarUrl"
                >
                    <div>
                        <Button
                            icon={<UploadOutlined />}
                            onClick={openWidget}
                            loading={isUploading}
                            className="mb-3"
                        >
                            Upload Avatar
                        </Button>
                        {avatar?.url && (
                            <div className="mt-2 border rounded p-2">
                                <img
                                    src={avatar.url}
                                    alt="Avatar"
                                    className="w-32 h-32 object-cover rounded-full"
                                />
                            </div>
                        )}
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default TikTokAccountModal
