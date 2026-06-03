import { Metadata } from 'next'
import JourneyClient from './JourneyClient'

export const metadata: Metadata = {
    title: 'Hành trình phát triển - TheTapHoa',
    description: 'Khám phá hành trình xây dựng hệ thống TheTapHoa, từ quản lý bán hàng (POS), tích hợp tự động hóa video AI (Veo3), đến lập lịch mạng xã hội và vận hành hạ tầng VPS.',
}

export default function JourneyPage() {
    return <JourneyClient />
}
