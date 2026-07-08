import { Metadata } from 'next'
import FacebookAutoPostClient from '@/components/shop/facebook-auto-post/FacebookAutoPostClient'

export const metadata: Metadata = {
    title: 'Facebook Auto Post',
    description: 'Tự động đăng video Douyin lên Facebook Page'
}

export default function FacebookAutoPostPage() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">📤 Facebook Auto Post</h1>
                <p className="text-gray-500 mt-1">Tải video Douyin → AI Caption → Đăng lên Facebook Page</p>
            </div>
            <FacebookAutoPostClient />
        </div>
    )
}
