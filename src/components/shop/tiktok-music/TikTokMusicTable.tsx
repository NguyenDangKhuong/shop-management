'use client'

import { deleteCloudinaryImage } from '@/actions/cloudinary'
import { useCloudinaryUpload } from '@/hooks/useCloudinaryUpload'
import { CloudinaryUploadResult, createUploadWidget, tiktokMusicUploadConfig } from '@/utils/cloudinaryConfig'
import { apiDelete, apiGet, apiPost, apiPut } from '@/utils/internalApi'
import { CopyOutlined, DeleteTwoTone, EditTwoTone, PlusOutlined, SoundOutlined, UploadOutlined } from '@ant-design/icons'
import { App, Button, Form, Input, Modal, Popconfirm, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useCallback, useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

interface MusicFile {
    url: string
    type: string
    publicId?: string
}

interface TikTokMusic {
    _id: string
    name: string
    music?: MusicFile
    createdAt?: string
    updatedAt?: string
}

const TikTokMusicTable = () => {
    const { message } = App.useApp()
    const [musicList, setMusicList] = useState<TikTokMusic[]>([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingMusic, setEditingMusic] = useState<TikTokMusic | null>(null)
    const [form] = Form.useForm()
    const [modalMusic, setModalMusic] = useState<MusicFile | null>(null)
    const uploadedThisSessionRef = useRef<MusicFile | null>(null)

    const loadMusic = async () => {
        setLoading(true)
        const result = await apiGet<TikTokMusic[]>('/api/tiktok-music')

        if (result.success && result.data) {
            setMusicList(result.data)
        } else {
            message.error(result.error || 'Không thể tải danh sách nhạc')
        }
        setLoading(false)
    }

    useEffect(() => {
        loadMusic()
    }, [])

    const handleDelete = async (id: string) => {
        const result = await apiDelete(`/api/tiktok-music?id=${id}`)

        if (result.success) {
            message.success('Đã xóa nhạc!')
            loadMusic()
        } else {
            message.error(result.error || 'Xóa nhạc thất bại')
        }
    }

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            message.success('Đã copy!')
        } catch {
            message.error('Không thể copy')
        }
    }

    const handleEdit = (music: TikTokMusic) => {
        setEditingMusic(music)
        form.setFieldsValue({ name: music.name })
        setModalMusic(music.music || null)
        uploadedThisSessionRef.current = null
        setIsModalOpen(true)
    }

    const handleAdd = () => {
        setEditingMusic(null)
        form.resetFields()
        setModalMusic(null)
        uploadedThisSessionRef.current = null
        setIsModalOpen(true)
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields()

            const submitData: any = { name: values.name }
            if (modalMusic !== undefined) {
                submitData.music = modalMusic
            }

            const result = editingMusic
                ? await apiPut('/api/tiktok-music', { id: editingMusic._id, ...submitData })
                : await apiPost('/api/tiktok-music', submitData)

            if (result.success) {
                message.success(editingMusic ? 'Đã cập nhật!' : 'Đã thêm nhạc!')
                uploadedThisSessionRef.current = null
                setIsModalOpen(false)
                form.resetFields()
                setModalMusic(null)
                loadMusic()
            } else {
                message.error(result.error || 'Lưu nhạc thất bại')
            }
        } catch {
            // Form validation error
        }
    }

    // Cloudinary upload for modal
    const onModalUploadSuccess = useCallback((result: CloudinaryUploadResult) => {
        const musicFile: MusicFile = {
            url: result.url,
            type: 'audio',
            publicId: result.publicId
        }
        setModalMusic(musicFile)
        uploadedThisSessionRef.current = musicFile
        message.success('Upload nhạc thành công!')
    }, [message])

    const { openWidget: openModalUploadWidget, isUploading: isModalUploading } = useCloudinaryUpload(
        tiktokMusicUploadConfig,
        onModalUploadSuccess,
        (err) => message.error('Upload thất bại: ' + (err?.message || 'Unknown error'))
    )

    const handleModalCancel = async () => {
        // Clean up uploaded file if user cancels without saving
        if (uploadedThisSessionRef.current?.publicId) {
            try {
                await deleteCloudinaryImage(uploadedThisSessionRef.current.publicId)
            } catch (error) {
                console.error('Cleanup error:', error)
            }
        }
        uploadedThisSessionRef.current = null
        setIsModalOpen(false)
        form.resetFields()
        setModalMusic(null)
    }

    const handleUploadMusic = (musicItem: TikTokMusic) => {
        const widget = createUploadWidget(
            tiktokMusicUploadConfig,
            async (result: CloudinaryUploadResult) => {
                const musicFile = {
                    url: result.url,
                    type: 'audio' as const,
                    publicId: result.publicId
                }
                const updateResult = await apiPut('/api/tiktok-music', {
                    id: musicItem._id,
                    music: musicFile
                })
                if (updateResult.success) {
                    message.success('Upload nhạc thành công!')
                    loadMusic()
                } else {
                    message.error('Lưu file nhạc thất bại')
                }
            },
            () => {
                message.error('Upload thất bại')
            }
        )
        widget?.open()
    }

    const handleDeleteMusic = async (musicItem: TikTokMusic) => {
        const updateResult = await apiPut('/api/tiktok-music', {
            id: musicItem._id,
            music: null
        })
        if (updateResult.success) {
            message.success('Đã xóa file nhạc!')
            loadMusic()
        } else {
            message.error('Xóa file nhạc thất bại')
        }
    }

    const columns: ColumnsType<TikTokMusic> = [
        {
            title: 'Tên bài hát',
            dataIndex: 'name',
            key: 'name',
            render: (name: string) => (
                <div className="flex items-center gap-2">
                    <SoundOutlined className="text-purple-500" />
                    <span className="font-medium">{name}</span>
                </div>
            )
        },
        {
            title: 'File nhạc',
            dataIndex: 'music',
            key: 'music',
            width: 300,
            render: (_: any, record: TikTokMusic) => (
                <div className="flex items-center gap-2">
                    {record.music?.url ? (
                        <>
                            <audio controls preload="none" className="h-8" style={{ maxWidth: 200 }}>
                                <source src={record.music.url} />
                            </audio>
                            <CopyOutlined
                                className="cursor-pointer text-gray-400 hover:text-blue-500"
                                onClick={() => handleCopy(record.music!.url)}
                                title="Copy URL"
                            />
                            <Popconfirm
                                title="Xóa file nhạc?"
                                description="Chỉ xóa file, giữ lại tên bài hát"
                                onConfirm={() => handleDeleteMusic(record)}
                                okText="Xóa"
                                cancelText="Hủy"
                            >
                                <DeleteTwoTone className="cursor-pointer" twoToneColor="#ff4d4f" title="Xóa file" />
                            </Popconfirm>
                        </>
                    ) : (
                        <Button
                            size="small"
                            icon={<UploadOutlined />}
                            onClick={() => handleUploadMusic(record)}
                        >
                            Upload
                        </Button>
                    )}
                </div>
            )
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 180,
            render: (date: string) => date ? new Date(date).toLocaleString('vi-VN') : '-'
        },
        {
            title: 'Hành động',
            key: 'actions',
            align: 'center',
            width: 120,
            render: (_, record) => (
                <div className="flex gap-2 justify-center">
                    {!record.music?.url && (
                        <UploadOutlined
                            className="cursor-pointer text-lg text-blue-500 hover:text-blue-700"
                            onClick={() => handleUploadMusic(record)}
                            title="Upload nhạc"
                        />
                    )}
                    <EditTwoTone
                        className="cursor-pointer text-lg"
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Xóa bài hát?"
                        description="Bạn có chắc muốn xóa bài hát này?"
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
                <h2 className="text-xl font-semibold">🎵 TikTok Music ({musicList.length})</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                >
                    Thêm nhạc
                </Button>
            </div>

            {isMobile ? (
                <div className="flex flex-col gap-3">
                    {musicList.map((item) => (
                        <div
                            key={item._id}
                            className="border rounded-lg p-3 bg-white shadow-sm"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <SoundOutlined className="text-purple-500" />
                                    <span className="font-medium">{item.name}</span>
                                </div>
                                <div className="flex gap-2">
                                    {!item.music?.url && (
                                        <UploadOutlined
                                            className="cursor-pointer text-blue-500"
                                            onClick={() => handleUploadMusic(item)}
                                        />
                                    )}
                                    <EditTwoTone
                                        className="cursor-pointer"
                                        onClick={() => handleEdit(item)}
                                    />
                                    <Popconfirm
                                        title="Xóa bài hát?"
                                        onConfirm={() => handleDelete(item._id)}
                                        okText="Xóa"
                                        cancelText="Hủy"
                                    >
                                        <DeleteTwoTone twoToneColor="#ff4d4f" className="cursor-pointer" />
                                    </Popconfirm>
                                </div>
                            </div>
                            {item.music?.url ? (
                                <div className="flex items-center gap-2 mt-2">
                                    <audio controls preload="none" className="w-full h-8">
                                        <source src={item.music.url} />
                                    </audio>
                                    <CopyOutlined
                                        className="cursor-pointer text-gray-400 flex-shrink-0"
                                        onClick={() => handleCopy(item.music!.url)}
                                    />
                                    <Popconfirm
                                        title="Xóa file nhạc?"
                                        onConfirm={() => handleDeleteMusic(item)}
                                        okText="Xóa"
                                        cancelText="Hủy"
                                    >
                                        <DeleteTwoTone twoToneColor="#ff4d4f" className="cursor-pointer flex-shrink-0" />
                                    </Popconfirm>
                                </div>
                            ) : (
                                <Button
                                    size="small"
                                    icon={<UploadOutlined />}
                                    onClick={() => handleUploadMusic(item)}
                                    className="mt-2"
                                >
                                    Upload nhạc
                                </Button>
                            )}
                            {item.createdAt && (
                                <div className="text-xs text-gray-400 mt-2">
                                    {new Date(item.createdAt).toLocaleString('vi-VN')}
                                </div>
                            )}
                        </div>
                    ))}
                    {musicList.length === 0 && !loading && (
                        <div className="text-center text-gray-400 py-8">Chưa có bài hát nào</div>
                    )}
                </div>
            ) : (
                <Table
                    rowKey="_id"
                    loading={loading}
                    bordered
                    columns={columns}
                    dataSource={musicList}
                    pagination={{ pageSize: 20, showTotal: (total) => `Tổng ${total} bài hát` }}
                />
            )}

            <Modal
                title={editingMusic ? 'Cập nhật bài hát' : 'Thêm bài hát mới'}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={handleModalCancel}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form form={form} layout="vertical" className="mt-4">
                    <Form.Item
                        name="name"
                        label="Tên bài hát"
                        rules={[{ required: true, message: 'Vui lòng nhập tên bài hát' }]}
                    >
                        <Input placeholder="Nhập tên bài hát..." />
                    </Form.Item>

                    <Form.Item label="File nhạc">
                        <div>
                            <Button
                                icon={<UploadOutlined />}
                                onClick={openModalUploadWidget}
                                loading={isModalUploading}
                                className="mb-2"
                            >
                                Upload nhạc
                            </Button>
                            {modalMusic?.url && (
                                <div className="mt-2 p-2 bg-gray-50 border rounded flex items-center gap-2">
                                    <audio controls preload="none" className="h-8 flex-1" style={{ maxWidth: 280 }}>
                                        <source src={modalMusic.url} />
                                    </audio>
                                    <Button
                                        type="text"
                                        size="small"
                                        danger
                                        onClick={() => {
                                            setModalMusic(null)
                                        }}
                                    >
                                        ✕
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default TikTokMusicTable
