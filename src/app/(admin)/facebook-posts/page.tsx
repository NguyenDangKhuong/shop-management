import { Metadata } from 'next'
import FacebookPostTable from '@/components/shop/facebook-posts/FacebookPostTable'

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Facebook Posts Management',
    description: 'Manage your Facebook posts'
}

export default function FacebookPostsPage() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Facebook Posts</h1>
                <p className="text-gray-600 mt-1">Manage your scheduled and published Facebook posts</p>
            </div>

            <FacebookPostTable />
        </div>
    )
}
