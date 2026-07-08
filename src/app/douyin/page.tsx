import type { Metadata } from 'next'
import { PUBLIC_SITE_NAME, AUTHOR_NAME } from '@/utils/constants'
import DouyinClient from './DouyinClient'

const PAGE_TITLE = 'Tải Video Douyin Không Watermark Miễn Phí | Douyin Downloader'
const PAGE_DESCRIPTION = 'Công cụ tải video Douyin (TikTok Trung Quốc) không watermark chất lượng cao, miễn phí 100%. Hỗ trợ trích xuất nhạc nền MP3, ảnh bìa HD, lưu trực tiếp vào Camera Roll iPhone. Không cần cài app, không cần đăng nhập.'
const PAGE_URL = 'https://shop.thetaphoa.store/douyin'

export const metadata: Metadata = {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    keywords: [
        'tải video douyin', 'douyin downloader', 'tải video douyin không watermark',
        'download douyin video', 'douyin no watermark', 'tải video tiktok trung quốc',
        'douyin video downloader online', 'tải nhạc douyin', 'douyin mp3 download',
        'save douyin video', 'douyin hd download', 'tải video douyin miễn phí',
        'douyin watermark remover', 'tải video douyin về điện thoại',
        'douyin video download without watermark', 'công cụ tải video douyin',
        'tiktok china downloader', 'douyin converter', 'douyin to mp4',
    ],
    authors: [{ name: AUTHOR_NAME }],
    creator: AUTHOR_NAME,
    publisher: PUBLIC_SITE_NAME,
    openGraph: {
        type: 'website',
        locale: 'vi_VN',
        alternateLocale: 'en_US',
        url: PAGE_URL,
        siteName: PUBLIC_SITE_NAME,
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
    },
    twitter: {
        card: 'summary_large_image',
        title: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
    },
    alternates: {
        canonical: PAGE_URL,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
        },
    },
}

// JSON-LD structured data for rich search results
const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Douyin Video Downloader',
    alternateName: ['Tải Video Douyin', 'Douyin Downloader', 'TikTok China Downloader'],
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'All',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'VND',
    },
    featureList: [
        'Tải video Douyin không watermark',
        'Trích xuất nhạc nền MP3',
        'Tải ảnh bìa chất lượng cao',
        'Lưu video vào Camera Roll iPhone',
        'Hỗ trợ Chrome, Safari, Firefox',
        'Không cần cài đặt ứng dụng',
        'Miễn phí 100%',
    ],
    author: {
        '@type': 'Person',
        name: AUTHOR_NAME,
    },
}

export default function DouyinPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <DouyinClient />
        </>
    )
}
