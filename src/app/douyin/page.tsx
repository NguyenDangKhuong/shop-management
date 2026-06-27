import type { Metadata } from 'next'
import DouyinClient from './DouyinClient'

export const metadata: Metadata = {
    title: 'Douyin Downloader | Tải Video Douyin Không Watermark',
    description: 'Công cụ tải video Douyin không watermark chất lượng cao miễn phí, trích xuất nhạc nền và ảnh bìa trực tiếp từ Douyin.',
}

export default function DouyinPage() {
    return <DouyinClient />
}
