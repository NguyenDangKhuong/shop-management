import type { Metadata } from 'next'
import ClarityClient from './ClarityClient'

export const metadata: Metadata = {
    title: 'Clarity Month Plan | Lập kế hoạch tháng',
    description: 'Lập kế hoạch tháng cá nhân: mục tiêu, thói quen, task hằng ngày và reflection. Personal monthly planner.',
}

export default function ClarityPage() {
    return <ClarityClient />
}
