'use client'

import { useState, useEffect, useRef } from 'react'
import { Form, Input, Modal, Button, App, DatePicker, Select, Upload, TimePicker, Progress, Collapse, Switch } from 'antd'
import { UploadOutlined, DeleteOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { apiPost, apiPut } from '@/utils/internalApi'
import { uploadVideoToR2, deleteVideoFromR2 } from '@/utils/r2Upload'

const R2_TIKTOK_BUCKET = 'tiktok-videos'
import dayjs from 'dayjs'

interface ScheduledPostModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    accountId: string
    products: any[]
    editingPost?: any
    onRefresh: () => void
}

const TikTokScheduledPostModal = ({
    isOpen,
    setIsOpen,
    accountId,
    products,
    editingPost,
    onRefresh
}: ScheduledPostModalProps) => {
    const { message } = App.useApp()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [video, setVideo] = useState<any>(null) // Single video for edit mode
    const [videos, setVideos] = useState<any[]>([]) // Multiple videos for create mode
    const [uploading, setUploading] = useState(false)
    const [uploadQueue, setUploadQueue] = useState<{ name: string; progress: number; status: 'uploading' | 'done' | 'error' }[]>([])
    const [shopeeLinks, setShopeeLinks] = useState<any[]>([])
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null)

    const uploadAbortRef = useRef<(() => void) | null>(null)

    // Track newly uploaded videos this session
    const uploadedThisSessionRef = useRef<{ url: string; type: string; publicId?: string }[]>([])

    const isEditMode = !!editingPost

    // Fetch Shopee Links
    useEffect(() => {
        const fetchShopeeLinks = async () => {
            try {
                const response = await fetch('/api/shopee-links')
                const data = await response.json()
                if (data.success) {
                    setShopeeLinks(data.data)
                }
            } catch (error) {
                console.error('Failed to fetch shopee links:', error)
            }
        }
        fetchShopeeLinks()
    }, [])

    useEffect(() => {
        if (isOpen) {
            uploadedThisSessionRef.current = []

            if (editingPost) {
                form.setFieldsValue({
                    scheduledDate: editingPost.scheduledDate ? dayjs(editingPost.scheduledDate, 'DD/MM/YYYY') : null,
                    scheduledTime: editingPost.scheduledTime ? dayjs(editingPost.scheduledTime, 'HH:mm') : null,
                    productId: editingPost.productId || '',
                    description: editingPost.description || '',
                    status: editingPost.status || 'scheduled',
                    hasMusic: editingPost.hasMusic ?? false
                })
                setVideo(editingPost.video || null)
                setVideos([])
            } else {
                form.resetFields()
                form.setFieldsValue({ status: 'scheduled', hasMusic: false })
                setVideo(null)
                setVideos([])
            }
        } else {
            setVideo(null)
            setVideos([])
        }
    }, [isOpen, editingPost, form])

    const handleShopeeSelect = (shopeeId: string) => {
        if (!shopeeId) {
            form.setFieldsValue({ description: '' })
            return
        }

        const selected = shopeeLinks.find(link => link._id === shopeeId)

        if (selected) {
            const descriptionText = selected.description || selected.name
            form.setFieldsValue({ description: descriptionText })

            if (!selected.description) {
                message.info('Shopee Link chưa có mô tả, đã điền tên sản phẩm', 3)
            }
        }
    }

    const handleVideoUpload = async (file: File) => {
        try {
            setUploading(true)
            const queueItem = { name: file.name, progress: 0, status: 'uploading' as const }
            setUploadQueue(prev => [...prev, queueItem])

            let cancelled = false
            uploadAbortRef.current = () => { cancelled = true }

            const result = await uploadVideoToR2(file, R2_TIKTOK_BUCKET, (percent) => {
                if (!cancelled) {
                    setUploadQueue(prev => prev.map(item =>
                        item.name === file.name && item.status === 'uploading'
                            ? { ...item, progress: percent }
                            : item
                    ))
                }
            })

            uploadAbortRef.current = null
            if (cancelled) {
                if (result.fileName) {
                    await deleteVideoFromR2(result.fileName, R2_TIKTOK_BUCKET)
                }
                setUploadQueue(prev => prev.filter(item => !(item.name === file.name && item.status === 'uploading')))
                return false
            }

            if (result.success) {
                const newVideo = {
                    url: result.url,
                    type: 'video',
                    publicId: result.fileName || file.name
                }

                if (isEditMode) {
                    setVideo(newVideo)
                    uploadedThisSessionRef.current = [newVideo]
                } else {
                    setVideos(prev => [...prev, newVideo])
                    uploadedThisSessionRef.current.push(newVideo)
                }

                setUploadQueue(prev => prev.map(item =>
                    item.name === file.name && item.status === 'uploading'
                        ? { ...item, progress: 100, status: 'done' }
                        : item
                ))
                // Remove done items after 1s
                setTimeout(() => {
                    setUploadQueue(prev => prev.filter(item => item.status !== 'done'))
                }, 1000)
            } else {
                setUploadQueue(prev => prev.map(item =>
                    item.name === file.name && item.status === 'uploading'
                        ? { ...item, status: 'error' }
                        : item
                ))
                message.error('Upload failed: ' + result.message)
            }
        } catch (error: any) {
            console.error('Upload error:', error)
            message.error('Lỗi upload: ' + error.message)
        } finally {
            setUploading(false)
        }
        return false
    }

    const handleRemoveVideo = async (index: number) => {
        const vid = videos[index]
        if (vid?.publicId) {
            await deleteVideoFromR2(vid.publicId, R2_TIKTOK_BUCKET)
        }
        setVideos(prev => prev.filter((_, i) => i !== index))
        uploadedThisSessionRef.current = uploadedThisSessionRef.current.filter(v => v.publicId !== vid?.publicId)
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            const values = await form.validateFields()

            const selectedProduct = products.find(p => p.product_id === values.productId)

            if (isEditMode) {
                // Edit mode: single post
                if (!video) {
                    message.error('Vui lòng upload video!')
                    return
                }

                // Calculate Unix timestamp from scheduledDate + scheduledTime
                let scheduledUnixTime: number | null = null
                const randomMinutes = Math.floor(Math.random() * 60)

                if (values.scheduledDate && values.scheduledTime) {
                    const dateStr = values.scheduledDate.format('DD/MM/YYYY')
                    const hours = values.scheduledTime.format('HH')
                    const [day, month, year] = dateStr.split('/')
                    const combinedDate = new Date(
                        parseInt(year),
                        parseInt(month) - 1,
                        parseInt(day),
                        parseInt(hours),
                        randomMinutes
                    )
                    scheduledUnixTime = Math.floor(combinedDate.getTime() / 1000)
                }

                const formattedTime = values.scheduledTime ? `${values.scheduledTime.format('HH')}:${String(randomMinutes).padStart(2, '0')}` : null

                const postData = {
                    accountId,
                    scheduledDate: values.scheduledDate?.format('DD/MM/YYYY'),
                    scheduledTime: formattedTime,
                    scheduledUnixTime,
                    productId: values.productId || null,
                    productTitle: selectedProduct?.title || null,
                    description: values.description,
                    video: video,
                    hasMusic: values.hasMusic ?? false,
                    status: values.status || 'scheduled'
                }

                const result = await apiPut('/api/tiktok-scheduled-posts', { id: editingPost._id, ...postData })
                console.log('✏️ Update result:', result)
                message.success('Đã cập nhật bài đăng!')
            } else {
                // Create mode: one post per video
                if (videos.length === 0) {
                    message.error('Vui lòng upload ít nhất 1 video!')
                    return
                }

                // ===== LOGIC TÍNH GIỜ SCHEDULE =====
                // Ưu tiên 1: User chọn ngày + giờ cụ thể → dùng luôn
                // Ưu tiên 2: Không chọn → lấy bài gần nhất của account + 2h
                // Ưu tiên 3: Không có bài nào → dùng giờ hiện tại (NOW)
                // Mỗi video tiếp theo trong batch: +Nh + random 0-59 phút
                // =====================================
                const hourGap = values.hourGap || 2
                const now = dayjs()
                let baseTime: ReturnType<typeof dayjs>

                if (values.scheduledDate && values.scheduledTime) {
                    // Ưu tiên 1: User đã chọn giờ → dùng giờ đó
                    baseTime = values.scheduledDate
                        .hour(values.scheduledTime.hour())
                        .minute(values.scheduledTime.minute())
                        .second(0)
                } else {
                    // Ưu tiên 2 & 3: Auto-tính từ bài gần nhất hoặc NOW
                    try {
                        const res = await fetch(`/api/tiktok-scheduled-posts?accountId=${accountId}`)
                        const data = await res.json()
                        if (data.success && data.data?.length > 0) {
                            // Tìm bài có giờ schedule trễ nhất (so sánh dayjs, không phải string sort)
                            const latest = data.data.reduce((max: any, post: any) => {
                                const postTime = dayjs(`${post.scheduledDate} ${post.scheduledTime}`, 'DD/MM/YYYY HH:mm')
                                const maxTime = dayjs(`${max.scheduledDate} ${max.scheduledTime}`, 'DD/MM/YYYY HH:mm')
                                return postTime.isAfter(maxTime) ? post : max
                            })
                            // Base = bài trễ nhất + 2 tiếng
                            baseTime = dayjs(`${latest.scheduledDate} ${latest.scheduledTime}`, 'DD/MM/YYYY HH:mm').add(hourGap, 'hour')
                            console.log(`📅 Base from latest post: ${latest.scheduledDate} ${latest.scheduledTime} → +${hourGap}h = ${baseTime.format('HH:mm')}`)
                        } else {
                            // Không có bài nào → dùng NOW
                            baseTime = now
                        }
                    } catch {
                        baseTime = now
                    }
                }

                // Tạo bài cho từng video, cách nhau Nh + random 0-59 phút
                // VD: hourGap=2, baseTime = 10:00 → video 1: 10:XX, video 2: 12:XX, video 3: 14:XX
                let created = 0
                for (const vid of videos) {
                    const postTime = baseTime.add(created * hourGap, 'hour') // +0h, +Nh, +2Nh, ...
                    const randomMinutes = Math.floor(Math.random() * 60)     // random 0-59 phút
                    const finalTime = postTime.add(randomMinutes, 'minute')   // giờ cuối cùng

                    const postData = {
                        accountId,
                        scheduledDate: finalTime.format('DD/MM/YYYY'),
                        scheduledTime: finalTime.format('HH:mm'),
                        scheduledUnixTime: finalTime.unix(),
                        productId: values.productId || null,
                        productTitle: selectedProduct?.title || null,
                        description: values.description || selectedProduct?.title || '', // fallback: description → productTitle → empty
                        status: values.status || 'scheduled',
                        hasMusic: values.hasMusic ?? false,
                        video: vid,
                    }

                    const result = await apiPost('/api/tiktok-scheduled-posts', postData)
                    console.log(`✅ Created post ${created + 1}: ${finalTime.format('DD/MM/YYYY HH:mm')}`, result)
                    created++
                }

                message.success(`Đã tạo ${created} bài đăng mới!`)
            }

            uploadedThisSessionRef.current = []
            setIsOpen(false)
            onRefresh()
        } catch (error: any) {
            message.error('Lỗi: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = async () => {
        // Delete all uploaded videos that weren't saved
        for (const vid of uploadedThisSessionRef.current) {
            if (vid.publicId) {
                try {
                    await deleteVideoFromR2(vid.publicId, R2_TIKTOK_BUCKET)
                    console.log('🗑️ Cleaned up:', vid.publicId)
                } catch (error) {
                    console.error('Failed to cleanup video:', error)
                }
            }
        }
        uploadedThisSessionRef.current = []
        setIsOpen(false)
    }

    return (
        <Modal
            title={editingPost ? 'Chỉnh sửa bài đăng' : `Thêm bài đăng mới${videos.length > 0 ? ` (${videos.length} video)` : ''}`}
            open={isOpen}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={handleSubmit}>
                    {editingPost ? 'Cập nhật' : videos.length > 1 ? `Tạo ${videos.length} bài` : 'Tạo'}
                </Button>
            ]}
            width={400}
        >
            <Form form={form} layout="vertical" className="mt-4">
                <Collapse
                    size="small"
                    className="mb-4"
                    items={[{
                        key: 'schedule',
                        label: '⏰ Ngày giờ đăng & Trạng thái',
                        forceRender: true,
                        children: (
                            <>
                                <div className="flex gap-2">
                                    <Form.Item
                                        label="Ngày đăng"
                                        name="scheduledDate"
                                        className="flex-1"
                                    >
                                        <DatePicker
                                            className="w-full"
                                            format="DD/MM/YYYY"
                                            disabledDate={(current) => current && current < dayjs().startOf('day')}
                                            onChange={(date) => {
                                                setSelectedDate(date)
                                                if (date && date.isSame(dayjs(), 'day')) {
                                                    const currentTime = form.getFieldValue('scheduledTime')
                                                    if (currentTime && currentTime.hour() <= dayjs().hour()) {
                                                        form.setFieldValue('scheduledTime', null)
                                                    }
                                                }
                                            }}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label="Giờ đăng"
                                        name="scheduledTime"
                                        className="flex-1"
                                    >
                                        <TimePicker
                                            className="w-full"
                                            format="HH"
                                            showMinute={false}
                                            showSecond={false}
                                            defaultOpenValue={dayjs()}
                                            disabledTime={() => {
                                                const isToday = selectedDate && selectedDate.isSame(dayjs(), 'day')
                                                if (isToday) {
                                                    const currentHour = dayjs().hour()
                                                    return {
                                                        disabledHours: () => Array.from({ length: currentHour + 1 }, (_, i) => i)
                                                    }
                                                }
                                                return {}
                                            }}
                                        />
                                    </Form.Item>
                                </div>
                                {!isEditMode && (
                                    <>
                                        <p className="text-xs text-gray-400 -mt-4 mb-1">
                                            💡 Bỏ trống = tự tính từ bài gần nhất + khoảng cách giờ + random phút
                                        </p>
                                        <Form.Item
                                            label="Khoảng cách giờ giữa các bài"
                                            name="hourGap"
                                            initialValue={2}
                                            className="mb-2"
                                        >
                                            <Select>
                                                {[1, 2, 3, 4, 5, 6].map(h => (
                                                    <Select.Option key={h} value={h}>{h} giờ</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </>
                                )}
                                <Form.Item
                                    label="Trạng thái"
                                    name="status"
                                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                                    initialValue="scheduled"
                                    className="mb-0"
                                >
                                    <Select placeholder="Chọn trạng thái">
                                        <Select.Option value="draft">Nháp</Select.Option>
                                        <Select.Option value="scheduled">Lên bài</Select.Option>
                                        <Select.Option value="posted">Đã đăng</Select.Option>
                                        <Select.Option value="failed">Thất bại</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Có nhạc"
                                    name="hasMusic"
                                    valuePropName="checked"
                                    className="mb-0"
                                >
                                    <Switch checkedChildren="Có" unCheckedChildren="Không" />
                                </Form.Item>
                                <Form.Item
                                    label="Mô tả"
                                    name="description"
                                    rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                                    className="mb-0"
                                >
                                    <Input.TextArea
                                        rows={4}
                                        placeholder="Mô tả bài viết (tự động điền từ Shopee Link hoặc nhập thủ công)..."
                                    />
                                </Form.Item>
                            </>
                        )
                    }]}
                />

                <Form.Item
                    label="Sản phẩm"
                    name="productId"
                    rules={[{ required: true, message: 'Vui lòng chọn sản phẩm' }]}
                >
                    <Select
                        placeholder="Chọn sản phẩm"
                        allowClear
                        showSearch
                        size="large"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {products.map((product: any) => (
                            <Select.Option
                                key={product.product_id}
                                value={product.product_id}
                                label={product.title}
                            >
                                <div className="flex items-center gap-2 py-1">
                                    {product.images?.[0]?.url_list?.[0] && (
                                        <img
                                            src={product.images[0].url_list[0]}
                                            alt={product.title}
                                            className="w-10 h-10 rounded object-cover"
                                        />
                                    )}
                                    <span className="truncate text-sm">{product.title}</span>
                                </div>
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Shopee Link (tùy chọn)" name="shopeeLink">
                    <Select
                        placeholder="Chọn Shopee Link để lấy mô tả"
                        allowClear
                        showSearch
                        size="large"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            String(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        onChange={handleShopeeSelect}
                    >
                        {shopeeLinks.map((link: any) => (
                            <Select.Option
                                key={link._id}
                                value={link._id}
                                label={link.name}
                            >
                                <div className="flex items-center gap-2 py-1">
                                    {link.mediaFile?.url && (
                                        <img
                                            src={link.mediaFile.url}
                                            alt={link.name}
                                            className="w-10 h-10 rounded object-cover"
                                        />
                                    )}
                                    <span className="truncate text-sm">{link.name}</span>
                                </div>
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>



                <Form.Item label={isEditMode ? 'Video' : `Video${videos.length > 0 ? ` (${videos.length})` : ''}`} required>
                    <Upload
                        beforeUpload={handleVideoUpload}
                        maxCount={isEditMode ? 1 : undefined}
                        multiple={!isEditMode}
                        accept="video/*"
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />} loading={uploading}>
                            {uploading ? 'Đang upload...' : isEditMode
                                ? (video ? 'Đổi video' : 'Upload video')
                                : 'Upload video (chọn nhiều)'}
                        </Button>
                    </Upload>

                    {/* Upload progress queue */}
                    {uploadQueue.length > 0 && (
                        <div className="mt-2 space-y-1.5 max-h-40 overflow-y-auto">
                            {uploadQueue.map((item, idx) => (
                                <div key={`${item.name}-${idx}`} className="flex items-center gap-2">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-500 truncate">{item.name}</p>
                                        <Progress
                                            percent={item.progress}
                                            size="small"
                                            status={item.status === 'error' ? 'exception' : item.status === 'done' ? 'success' : 'active'}
                                        />
                                    </div>
                                    {item.status === 'uploading' && (
                                        <Button
                                            type="text"
                                            size="small"
                                            danger
                                            icon={<CloseCircleOutlined />}
                                            onClick={() => {
                                                uploadAbortRef.current?.()
                                                message.info('Đã huỷ upload')
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Edit mode: single video */}
                    {isEditMode && video && (
                        <div className="mt-2">
                            <video src={video.url} className="w-full h-32 object-cover rounded" controls />
                        </div>
                    )}

                    {/* Create mode: multiple videos */}
                    {!isEditMode && videos.length > 0 && (
                        <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                            {videos.map((vid, index) => (
                                <div key={index} className="flex items-center gap-2 p-1.5 rounded border border-gray-200 dark:border-gray-700">
                                    <video src={vid.url} className="w-16 h-12 object-cover rounded" />
                                    <span className="text-xs truncate flex-1 text-gray-500">{vid.publicId}</span>
                                    <Button
                                        type="text"
                                        size="small"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() => handleRemoveVideo(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </Form.Item>


            </Form>
        </Modal>
    )
}

export default TikTokScheduledPostModal
