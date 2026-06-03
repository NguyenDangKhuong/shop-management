'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ExternalLink, Cpu, Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { useSoundContext } from '@/contexts/SoundContext'
import SiteHeader from '@/components/ui/SiteHeader'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { DecryptText } from '@/components/ui/DecryptText'

interface TechSection {
    id: string
    titleVi: string
    titleEn: string
    codename: string
    coordinate: string
    emoji: string
    color: string
    glowClass: string
    imagePath: string
    uxVi: string[]
    uxEn: string[]
    techVi: string[]
    techEn: string[]
    techBadges: string[]
    terminalLogs: string[]
}

const sections: TechSection[] = [
    {
        id: 'shop',
        titleVi: 'Hệ thống Shop & POS',
        titleEn: 'Shop & POS Platform',
        codename: 'SECTOR_CORE_POS',
        coordinate: 'SYS-X.104',
        emoji: '🛍️',
        color: '#00f0ff', // Cyan
        glowClass: 'shadow-[0_0_15px_#00f0ff]',
        imagePath: '/image/projects/pos_preview.png',
        uxVi: [
            'Dashboard thống kê doanh thu, tồn kho và mặt hàng trực quan.',
            'Màn hình POS checkout tính tiền thừa tự động cho khách hàng.',
            'Hỗ trợ in hóa đơn trực tiếp ra máy in nhiệt (thermal printer) không qua hộp thoại trình duyệt.',
            'Tích hợp quét mã vạch (Barcode/QR Code) trực quan qua camera điện thoại/laptop.'
        ],
        uxEn: [
            'Interactive dashboard for sales analytics, stock levels, and items tracking.',
            'POS checkout interface with auto-calculate exchange calculations.',
            'Direct thermal receipt printing bypassing standard browser print dialogs.',
            'Camera-based instant QR Code and Barcode scanning integration.'
        ],
        techVi: [
            'Next.js 15 App Router làm nền tảng kết xuất phía máy chủ (SSR).',
            'Mongoose ODM kết nối và quản lý dữ liệu MongoDB ổn định.',
            'Thư viện html5-qrcode phục vụ xử lý giải mã camera tức thì, tối ưu bằng dynamic imports.',
            'Dùng react-to-print tạo bản in hóa đơn rõ nét, loại bỏ header/footer mặc định của trình duyệt.',
            'Tích hợp Upstash Redis làm caching layer cho danh mục sản phẩm, giảm thời gian tải API dưới 50ms.'
        ],
        techEn: [
            'Next.js 15 App Router for high-performance Server-Side Rendering.',
            'Mongoose ODM for structuring and querying MongoDB database.',
            'html5-qrcode library for real-time camera decoding, client-side optimized via dynamic imports.',
            'react-to-print to compile clean print templates, stripping browser metadata.',
            'Upstash Redis caching layer for catalog API endpoints, reducing response times below 50ms.'
        ],
        techBadges: ['Next.js 15', 'TypeScript', 'MongoDB', 'Redis', 'html5-qrcode', 'react-to-print', 'Ant Design'],
        terminalLogs: [
            '> CONNECTING TO SECTOR_CORE_POS...',
            '> RETRIEVING MONGOOSE MODEL: Product... OK',
            '> RETRIEVING MONGOOSE MODEL: Order... OK',
            '> MOUNTING BARCODE SCANNER CAMERA DRIVERS... SUCCESS',
            '> PRODUCT CATALOG CACHED ON UPSTASH REDIS... OK',
            '> 12 ITEMS LOADED INTO MEMORY IN 43ms.',
            '> POS PRINTER SERVICE INITIALIZED [STATUS: STANDBY].'
        ]
    },
    {
        id: 'veo3',
        titleVi: 'AI AutoFlow Video (Veo3)',
        titleEn: 'AI AutoFlow Video (Veo3)',
        codename: 'SECTOR_AI_VEO3',
        coordinate: 'SYS-V.309',
        emoji: '🎬',
        color: '#39ff14', // Green
        glowClass: 'shadow-[0_0_15px_#39ff14]',
        imagePath: '/image/projects/veo3_preview.png',
        uxVi: [
            'Công cụ thu giữ Google OAuth token (ya29) thông minh.',
            'Thư viện mẫu prompt video quảng cáo sản phẩm đa dạng.',
            'Tính năng AutoFlow: click chuột tạo video quảng cáo tự động từ thông tin shop.'
        ],
        uxEn: [
            'Secure Google OAuth (ya29) token capture assistant.',
            'Diverse prompt templates library for custom product videos.',
            'AutoFlow: single-click video ad generation from products metadata.'
        ],
        techVi: [
            'Thiết kế kiến trúc Bridge Architecture kết nối Chrome Extension và VPS.',
            'Chrome Extension tự động thu token đã xác thực rồi gửi trực tiếp về API Node.js.',
            'N8n tự động kéo dữ liệu sản phẩm, kết xuất prompt quảng cáo thời trang tối ưu dưới 90 từ.',
            'Gọi API Google Veo3 để sinh video chất lượng cao dài 5-6 giây từ prompt mô tả.',
            'Sử dụng MinIO (Object Storage) tự lưu trữ trên VPS để lưu trữ video và quản lý CDN.'
        ],
        techEn: [
            'Designed a custom Bridge Architecture linking Chrome Extension and VPS.',
            'Chrome Extension captures authenticated OAuth tokens and transmits them to Node.js APIs.',
            'n8n automation pulls product details and builds garment-focused templates under 90 words.',
            'Integrates Google Veo3 API to generate high-fidelity 5-6s product showcase videos.',
            'Uses self-hosted MinIO object storage on VPS for media backup and distribution.'
        ],
        techBadges: ['Google Veo3', 'Chrome Extension', 'n8n Webhook', 'MinIO (S3)', 'Node.js API', 'Cloudinary'],
        terminalLogs: [
            '> CONNECTING TO SECTOR_AI_VEO3...',
            '> CHECKING OAUTH YA29 CAPTURE UPLINK... ONLINE',
            '> PARSING PRODUCT METADATA FOR AD GENERATOR...',
            '> GENERATING GARMENT-SPECIFIC PROMPT... DONE [Word Count: 76]',
            '> ESTABLISHING CHROME EXTENSION <-> VPS SECURE BRIDGE...',
            '> MINIO ADAPTER STORAGE OK // BUCKET: veo3-media // STATUS: READY'
        ]
    },
    {
        id: 'social',
        titleVi: 'Tự động hóa Mạng xã hội',
        titleEn: 'Social Media Automation',
        codename: 'SECTOR_SOCIAL_AUTO',
        coordinate: 'SYS-S.772',
        emoji: '🎵',
        color: '#f97316', // Orange
        glowClass: 'shadow-[0_0_15px_#f97316]',
        imagePath: '/image/projects/social_preview.png',
        uxVi: [
            'Lên lịch đăng bài TikTok hàng loạt với thời gian tự chọn.',
            'Cấu hình khoảng giãn cách (Hour Gap) từ 1h đến 6h giữa các bài.',
            'Tự động cộng thêm độ trễ ngẫu nhiên (Jitter) tránh spam bộ lọc.',
            'Hỗ trợ đăng đa định dạng Facebook Reels (Standard, Reel-Video, Reel-Link).'
        ],
        uxEn: [
            'Batch schedule TikTok videos publishing with custom dates.',
            'Configurable hour gaps (1h-6h) interval between posts.',
            'Random minutes Jitter addition to bypass anti-spam algorithms.',
            'Supports publishing multi-format Facebook Reels (Standard, Video, Link).'
        ],
        techVi: [
            'Tích hợp TikTok Content API với luồng OAuth2 tự động làm mới access token mỗi 9 tiếng.',
            'Sử dụng Mongoose pre-save hooks để tính toán và chia giờ đăng bài ngẫu nhiên vào DB.',
            'Facebook Graph API xử lý đăng Reels qua các page tự động.',
            'Tích hợp Cloudflare R2 và Cloudinary để lưu trữ và nén video dung lượng lớn sang định dạng H.264/MP4 tối ưu trước khi upload.'
        ],
        techEn: [
            'Connected TikTok Content API with OAuth2 automatic refresh flow (9-hour lifecycle).',
            'Used Mongoose database hooks to calculate dynamic queue times on insert.',
            'Orchestrated Facebook Graph API to publish Reels to multiple pages automatically.',
            'Leveraged Cloudflare R2 and Cloudinary to host, compress, and transcode raw videos to H.264/MP4.'
        ],
        techBadges: ['TikTok API', 'Facebook API', 'Cloudflare R2', 'Mongoose Hooks', 'n8n Automate'],
        terminalLogs: [
            '> CONNECTING TO SECTOR_SOCIAL_AUTO...',
            '> DECRYPITING TIKTOK OAUTH CREDENTIALS... REFRESH_TOKEN: VALID',
            '> DATABASE INQUIRY: PENDING POSTS... 14 ENTRIES FOUND',
            '> CALCUATING POST TIMES WITH HOUR_GAP=2h AND JITTER=0-59m...',
            '> GENERATING UPLINK CHUNKS TO CLOUDFLARE R2 BUCKET... SUCCESS',
            '> FB PAGES METRIC SYSTEM ONLINE // ACCESS_TOKENS: OK'
        ]
    },
    {
        id: 'productivity',
        titleVi: 'Học tập & Đời sống',
        titleEn: 'Productivity & Learn Hub',
        codename: 'SECTOR_PLAN_LEARN',
        coordinate: 'SYS-P.991',
        emoji: '🎯',
        color: '#00f0ff', // Cyan
        glowClass: 'shadow-[0_0_15px_#00f0ff]',
        imagePath: '/image/projects/productivity_preview.png',
        uxVi: [
            'Bảng kế hoạch tuần Clarity (Goals, Habits, Reflection, Tasks).',
            'Ôn tập thuật toán & từ vựng qua thẻ Spaced Repetition Flashcards.',
            'Nhận thông báo nhắc nhở học từ vựng mỗi giờ trên trình duyệt.'
        ],
        uxEn: [
            'Clarity weekly planning suite (Goals, Habits, Reflection, Tasks).',
            'Algorithmic pattern & vocabulary learning via Spaced Repetition flashcards.',
            'Hourly browser Web Push reminder notifications for vocabulary learning.'
        ],
        techVi: [
            'Clarity Planner hoạt động 100% offline bằng LocalStorage, đảm bảo độ trễ phản hồi 0ms.',
            'Flashcards thuật toán ứng dụng giải thuật SuperMemo SM-2 tính toán ngày ôn tập khoa học dựa trên điểm số người dùng đánh giá.',
            'Hệ thống thông báo đẩy Web Push sử dụng VAPID keys tương thích đa trình duyệt.',
            'Sử dụng script Python kết hợp systemd timer trên VPS để tự động đẩy bài học từ vựng mỗi giờ.'
        ],
        techEn: [
            'Clarity state managed 100% offline via LocalStorage for 0ms interaction latency.',
            'Flashcards app implements SuperMemo SM-2 algorithm to dynamically compute optimal review intervals.',
            'Web Push notifications using VAPID keys for cross-browser push delivery.',
            'VPS systemd timer triggers Python script hourly to send push-reminder payloads.'
        ],
        techBadges: ['SuperMemo SM-2', 'LocalStorage API', 'Web Push API', 'VAPID', 'systemd timer', 'Python'],
        terminalLogs: [
            '> CONNECTING TO SECTOR_PLAN_LEARN...',
            '> READING LOCALSTORAGE CACHE... OK // LATENCY: 0.1ms',
            '> RECALCULATING SUPERMEMO INTERVALS FOR 48 CARDS...',
            '> STANDBY FOR HOURLY VPS SYSTEMD TIMER PAYLOAD...',
            '> WEBPUSH ENVELOPE ENCRYPTED WITH VAPID KEYS... SIGNED'
        ]
    },
    {
        id: 'devops',
        titleVi: 'Hạ tầng & DevOps',
        titleEn: 'DevOps & Infrastructure',
        codename: 'SECTOR_DEVOPS_INFRA',
        coordinate: 'SYS-D.001',
        emoji: '⚙️',
        color: '#39ff14', // Green
        glowClass: 'shadow-[0_0_15px_#39ff14]',
        imagePath: '/image/projects/devops_preview.png',
        uxVi: [
            'Hạ tầng tự vận hành (Self-hosted) toàn bộ dịch vụ trên hệ thống VPS cá nhân, kiểm soát 100% dữ liệu.',
            'Thiết lập HA (High Availability) dự phòng cho các API service quan trọng nhằm đảm bảo uptime tối đa 99.9%.',
            'Kiến trúc phân tán an toàn, bảo mật dữ liệu tuyệt đối.',
            'Môi trường CI/CD tự động kiểm soát lỗi chất lượng code trước khi deploy.'
        ],
        uxEn: [
            'Self-hosted entire application suite on private VPS instances, retaining 100% data ownership.',
            'High Availability (HA) redundancy for critical API services to guarantee maximum 99.9% uptime.',
            'Highly secure distributed environment protecting database connections.',
            'Automated CI/CD checkpoints to validate code quality before deployment.'
        ],
        techVi: [
            'Kiến trúc VPS Multi-node dự phòng (Failover), chạy Docker Compose & Nginx Reverse Proxy cân bằng tải.',
            'Máy chủ Oracle Cloud VPS ARM64 (4 vCPU, 24GB RAM) chạy mượt mà hơn 15 container Docker tự khôi phục.',
            'Kết nối Cloudflare Tunnel chuyển hướng truy cập trực tiếp từ VPS không cần mở port mạng công cộng.',
            'Tailscale VPN bảo mật đường truyền kết nối SSH nội bộ.',
            'Hệ thống Git pre-push hook tự động chạy kiểm tra linter (ESLint), 26+ bài test Jest, và chạy thử production build trước khi cho phép đẩy code lên GitHub/Vercel.'
        ],
        techEn: [
            'Redundant Multi-node VPS configuration (Failover) orchestrating Docker Compose & Nginx load balancing.',
            'Oracle Cloud ARM64 VPS (4 vCPU, 24GB RAM) running 15+ Dockerized containers with automatic restart recovery.',
            'Cloudflare Tunnel exposes services directly, closing all public-facing incoming ports.',
            'Tailscale private mesh VPN used for secure SSH administration.',
            'Git pre-push hook scripts enforce linter, 26+ Jest Tests execution, and Next.js prod build validation prior to pushing code to GitHub/Vercel.'
        ],
        techBadges: ['Oracle Cloud', 'Docker Compose', 'HA Failover', 'Self-Hosted VPS', 'Nginx Load Balancer', 'Cloudflare Tunnel', 'Tailscale', 'Git Hooks', 'Jest', 'CI/CD'],
        terminalLogs: [
            '> CONNECTING TO SECTOR_DEVOPS_INFRA...',
            '> HOST: ORACLE_ARM64 // UPTIME: 142d 12h 4m',
            '> CHECKING REPLICA NODE STATUS... ACTIVE [2/2 NODES ONLINE]',
            '> DEPLOYMENT ARCHITECTURE: HIGH AVAILABILITY MULTI-CONTAINER',
            '> VPS INSTANCE LOAD BALANCER... HEALTHY',
            '> CPU UTILIZATION: 14% // MEMORY: 12.8GB / 24GB',
            '> CONTAINER STATUS: 15 ONLINE // 0 RESTARTING',
            '> CLOUDFLARE SECURE TUNNEL... ACTIVE [STATUS: HEALTHY]',
            '> RUNNING JEST TESTING PIPELINE... PASS (26/26 TESTS)',
            '> GIT HOOKS INTEGRITY CHECK: SECURE'
        ]
    }
]

const SpaceshipIcon = ({ direction, color }: { direction: 'up' | 'down'; color: string }) => {
    let rotation = 0 // default pointing up
    if (direction === 'down') {
        rotation = 180
    }
    
    return (
        <motion.div
            animate={{ 
                y: [0, -4, 0],
                rotate: rotation
            }}
            transition={{ 
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                rotate: { type: 'spring', stiffness: 100, damping: 15 }
            }}
            className="w-8 h-8 flex items-center justify-center relative"
            style={{ color }}
        >
            {/* Engine Glow Tail */}
            <div 
                className="absolute w-1.5 h-4 blur-[3px] opacity-80 bottom-[-8px] left-1/2 -translate-x-1/2 rounded-full animate-pulse"
                style={{ 
                    backgroundColor: color,
                    boxShadow: `0 0 8px ${color}`
                }}
            />
            {/* Sleek SVG Spaceship */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current drop-shadow-[0_0_6px_currentColor]">
                <path d="M12 2 L3 20 L8 17 L12 14 L16 17 L21 20 Z" />
            </svg>
        </motion.div>
    )
}

export default function JourneyClient() {
    const { language } = useTranslation()
    const { playClick, playHover } = useSoundContext()
    const [selectedPlanetId, setSelectedPlanetId] = useState<string | null>(null)
    const [activeHoverPlanet, setActiveHoverPlanet] = useState<string | null>(null)
    const [activePlanetId, setActivePlanetId] = useState<string>('shop')
    
    const [prevIndex, setPrevIndex] = useState(0)
    const [direction, setDirection] = useState<'up' | 'down'>('down')
    
    const [terminalHistory, setTerminalHistory] = useState<{ text: string; type: 'in' | 'out' }[]>([])
    const [terminalInput, setTerminalInput] = useState('')
    
    const terminalContainerRef = useRef<HTMLDivElement>(null)

    const currentShipPlanetId = activeHoverPlanet || selectedPlanetId || activePlanetId
    const currentIndex = sections.findIndex(s => s.id === currentShipPlanetId)

    useEffect(() => {
        if (currentIndex !== -1 && currentIndex !== prevIndex) {
            setDirection(currentIndex > prevIndex ? 'down' : 'up')
            setPrevIndex(currentIndex)
        }
    }, [currentIndex, prevIndex])

    const activePlanetIndex = sections.findIndex(s => s.id === (selectedPlanetId || activePlanetId))
    const activeSection = sections[activePlanetIndex] || sections[0]

    // Sound Helpers
    const triggerClick = () => {
        if (playClick) playClick()
    }
    const triggerHover = () => {
        if (playHover) playHover()
    }

    // Set terminal logs when selected planet changes inside modal
    useEffect(() => {
        if (!selectedPlanetId) return
        const activeSect = sections.find(s => s.id === selectedPlanetId)
        if (!activeSect) return

        const welcomeLogs = [
            { text: `> WARP DRIVE ENGAGED to ${activeSect.coordinate}`, type: 'out' as const },
            { text: `> ACCESSING SYSTEM: ${activeSect.codename}`, type: 'out' as const },
            ...activeSect.terminalLogs.map(log => ({ text: log, type: 'out' as const })),
            { text: '> TYPE "warp" TO QUERY NEXT DESTINATION SYSTEM STATUS.', type: 'out' as const }
        ]
        setTerminalHistory(welcomeLogs)
    }, [selectedPlanetId])

    useEffect(() => {
        if (terminalContainerRef.current) {
            terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight
        }
    }, [terminalHistory])

    // Key Escape to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                triggerClick()
                setSelectedPlanetId(null)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [playClick])

    const handleWarp = (direction: 'next' | 'prev') => {
        triggerClick()
        let nextIdx = activePlanetIndex + (direction === 'next' ? 1 : -1)
        if (nextIdx >= sections.length) nextIdx = 0
        if (nextIdx < 0) nextIdx = sections.length - 1
        const nextId = sections[nextIdx].id
        setSelectedPlanetId(nextId)
        setActivePlanetId(nextId)
    }

    const runTerminalCommand = (cmdText: string) => {
        const cmd = cmdText.trim().toLowerCase()
        const newHistory = [...terminalHistory, { text: `> ${cmdText}`, type: 'in' as const }]

        switch (cmd) {
            case 'help':
                newHistory.push({ text: 'AVAILABLE COMMANDS:', type: 'out' })
                newHistory.push({ text: '  warp     : ENGAGE JUMP TO NEXT ORBITAL SYSTEM', type: 'out' })
                newHistory.push({ text: '  scan     : ANALYZE PLANET COMPONENT TELEMETRY', type: 'out' })
                newHistory.push({ text: '  clear    : WIPE CONSOLE LOG BUFFER', type: 'out' })
                break
            case 'warp':
                newHistory.push({ text: 'WARP JUMP SEQUENCE INITIATED...', type: 'out' })
                handleWarp('next')
                return
            case 'scan':
                newHistory.push({ text: `--- SPECS LOG: ${activeSection.codename} ---`, type: 'out' })
                newHistory.push({ text: `SECTOR COORDINATE : ${activeSection.coordinate}`, type: 'out' })
                newHistory.push({ text: `CORE STACK        : ${activeSection.techBadges.join(', ')}`, type: 'out' })
                newHistory.push({ text: `SECURITY PROTOCOL : SECURE (JWT/Pre-push hook)`, type: 'out' })
                newHistory.push({ text: `NETWORK LINK      : ONLINE (Cloudflare Tunnel)`, type: 'out' })
                break
            case 'clear':
                setTerminalHistory([])
                return
            default:
                newHistory.push({ text: `COMMAND UNRECOGNIZED: "${cmd}". Enter "help" for controls.`, type: 'out' })
        }
        setTerminalHistory(newHistory)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!terminalInput.trim()) return
        runTerminalCommand(terminalInput)
        setTerminalInput('')
    }

    return (
        <div className="font-sans min-h-screen flex flex-col items-center p-4 md:p-8 relative overflow-x-hidden bg-[var(--space-bg)] transition-colors duration-300">
            {/* Ambient Background Trajectory Grid */}
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-15" style={{ backgroundImage: 'linear-gradient(var(--border-primary) 1px, transparent 1px), linear-gradient(90deg, var(--border-primary) 1px, transparent 1px)', backgroundSize: '45px 45px' }} />
            
            {/* Global floating neon glow based on active hover or selected system */}
            <div 
                className="fixed top-[20%] left-[25%] w-[50%] h-[50%] rounded-full opacity-[0.04] blur-[150px] pointer-events-none transition-all duration-1000 z-[-1]" 
                style={{ backgroundColor: activeHoverPlanet ? sections.find(s => s.id === activeHoverPlanet)?.color : (selectedPlanetId ? activeSection.color : '#00f0ff') }} 
            />

            <SiteHeader maxWidth="max-w-5xl" />

            {/* Title HUD Header */}
            <div className="w-full max-w-5xl mx-auto mt-10 mb-14 z-10">
                <ScrollReveal direction="up" duration={0.6}>
                    <div className="flex items-center gap-3 mb-2">
                        <Link href="/" className="p-1.5 rounded-[2px] border border-border-primary hover:border-text-primary text-text-secondary hover:text-text-primary transition-all cursor-pointer">
                            <ArrowLeft className="w-4 h-4" />
                        </Link>
                        <span className="text-[10px] font-mono tracking-widest text-text-muted px-2 py-0.5 border border-border-primary rounded-[2px] uppercase">
                            {language === 'vi' ? 'LỘ TRÌNH BAY' : 'FLIGHT PLAN'}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight">
                        <DecryptText text={language === 'vi' ? 'Hành Trình Vũ Trụ' : 'Space Journey Map'} delay={0.1} />
                    </h1>
                    <p className="text-text-secondary mt-3 max-w-3xl leading-relaxed text-sm md:text-base">
                        {language === 'vi' 
                            ? 'Lái phi thuyền đi qua các hành tinh (phân khu chức năng) của hệ sinh thái TheTapHoa. Nhấp vào mỗi hành tinh để mở bảng thông số kỹ thuật (telemetry HUD).'
                            : 'Navigate the spaceship along the flight trajectory past functional planets. Click on any planet node to access its HUD system telemetry.'}
                    </p>
                </ScrollReveal>
            </div>

            {/* Spaceship Flight Trajectory Vertical Map */}
            <div className="w-full max-w-3xl mx-auto py-12 relative z-10 min-h-[600px] flex items-center justify-center">
                
                {/* Vertical flight trajectory laser line */}
                <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-cyan-500/20 via-green-500/50 to-orange-500/20 z-0 shadow-[0_0_10px_rgba(0,240,255,0.2)]" />
                
                {/* Orbit Path Circles behind planets */}
                <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] border border-white/5 rounded-full pointer-events-none hidden md:block" />
                <div className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-white/5 rounded-full pointer-events-none hidden md:block" />

                {/* Vertical nodes timeline */}
                <div className="w-full relative space-y-24 z-10 pl-6 md:pl-0">
                    {sections.map((sec, index) => {
                        const isHovered = activeHoverPlanet === sec.id
                        
                        return (
                            <div 
                                key={sec.id}
                                className={`flex flex-col md:flex-row items-start md:items-center relative w-full ${
                                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                            >
                                {/* Center Trajectory Planet Sphere Node */}
                                <div 
                                    className="absolute left-[8px] md:left-1/2 top-1.5 md:top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 cursor-pointer"
                                    onClick={() => { triggerClick(); setSelectedPlanetId(sec.id); setActivePlanetId(sec.id); }}
                                    onMouseEnter={() => { triggerHover(); setActiveHoverPlanet(sec.id) }}
                                    onMouseLeave={() => setActiveHoverPlanet(null)}
                                >
                                    {/* Persistent Spaceship Floating Above Active/Selected Planet */}
                                    <AnimatePresence initial={false}>
                                        {sec.id === currentShipPlanetId && (
                                            <motion.div
                                                layoutId="spaceship"
                                                transition={{ type: 'spring', stiffness: 90, damping: 15 }}
                                                className="absolute left-1/2 -translate-x-1/2 top-[-36px] z-30 pointer-events-none"
                                            >
                                                <SpaceshipIcon direction={direction} color={sec.color} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Planet Outer Pulse/Atmosphere Ring */}
                                    <div 
                                        className={`w-11 h-11 rounded-full border border-dashed flex items-center justify-center transition-all duration-500 ${
                                            isHovered ? 'scale-125 rotate-45' : 'scale-100 rotate-0'
                                        }`}
                                        style={{ 
                                            borderColor: `${sec.color}40`,
                                            boxShadow: isHovered ? `0 0 15px ${sec.color}33` : 'none'
                                        }}
                                    >
                                        {/* Inner glowing planet body */}
                                        <div 
                                            className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${sec.glowClass}`}
                                            style={{ 
                                                backgroundColor: isHovered ? sec.color : 'rgba(10, 15, 30, 0.8)',
                                                border: `2px solid ${sec.color}`,
                                                color: isHovered ? '#000' : sec.color
                                            }}
                                        >
                                            <span className="scale-75 select-none">{sec.emoji}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Pulse ring for radar sweep effect */}
                                    <div 
                                        className="absolute inset-0 rounded-full animate-ping opacity-10 pointer-events-none"
                                        style={{ backgroundColor: sec.color }}
                                    />
                                </div>

                                {/* Content Box Left/Right of Timeline */}
                                <div className={`w-full md:w-[42%] pl-10 md:pl-0 ${
                                    index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                                }`}>
                                    <div 
                                        className={`p-5 bg-slate-900/10 border border-white/5 hover:border-white/10 hover:bg-slate-900/20 rounded-[2px] transition-all cursor-pointer group ${
                                            isHovered ? 'scale-[1.02] shadow-[0_4px_20px_rgba(0,0,0,0.4)]' : ''
                                        }`}
                                        style={{
                                            borderLeft: index % 2 !== 0 ? `3px solid ${sec.color}50` : undefined,
                                            borderRight: index % 2 === 0 ? `3px solid ${sec.color}50` : undefined,
                                            borderLeftColor: index % 2 !== 0 && isHovered ? sec.color : undefined,
                                            borderRightColor: index % 2 === 0 && isHovered ? sec.color : undefined,
                                        }}
                                        onClick={() => { triggerClick(); setSelectedPlanetId(sec.id); setActivePlanetId(sec.id); }}
                                        onMouseEnter={() => setActiveHoverPlanet(sec.id)}
                                        onMouseLeave={() => setActiveHoverPlanet(null)}
                                    >
                                        <span className="font-mono text-[9px] text-text-muted tracking-widest uppercase block mb-1">
                                            {sec.coordinate} :: {sec.codename}
                                        </span>
                                        <h3 
                                            className="text-base font-bold text-white uppercase tracking-wide group-hover:text-shadow-glow transition-all"
                                            style={{ color: isHovered ? sec.color : '#fff' }}
                                        >
                                            {language === 'vi' ? sec.titleVi : sec.titleEn}
                                        </h3>
                                        
                                        {/* Technology Tags Preview */}
                                        <div className={`flex flex-wrap gap-1.5 mt-3 ${
                                            index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                                        }`}>
                                            {sec.techBadges.slice(0, 3).map(badge => (
                                                <span 
                                                    key={badge}
                                                    className="px-1.5 py-0.5 rounded-[2px] text-[8px] uppercase tracking-wider font-mono border bg-black/30 border-white/5 text-slate-400"
                                                >
                                                    {badge}
                                                </span>
                                            ))}
                                            {sec.techBadges.length > 3 && (
                                                <span className="text-[8px] font-mono text-slate-500 pt-0.5">
                                                    +{sec.techBadges.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Placeholder to maintain balance in flex timeline */}
                                <div className="hidden md:block w-[42%]" />
                            </div>
                        )
                    })}
                </div>

            </div>

            {/* FULL IMMERSIVE TELEMETRY HUD MODAL */}
            <AnimatePresence>
                {selectedPlanetId && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        {/* Dim Backdrop Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { triggerClick(); setSelectedPlanetId(null) }}
                            className="absolute inset-0 bg-black/70 backdrop-blur-[2px] cursor-pointer"
                        />

                        {/* Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 30 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-4xl bg-[#09090c] border text-white rounded-[2px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.85)] flex flex-col max-h-[85vh] z-10"
                            style={{ 
                                borderColor: `${activeSection.color}40`,
                                boxShadow: `0 0 60px ${activeSection.color}15`
                            }}
                        >
                            {/* Digital HUD Corner ticks */}
                            <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2" style={{ borderColor: activeSection.color }} />
                            <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2" style={{ borderColor: activeSection.color }} />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2" style={{ borderColor: activeSection.color }} />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2" style={{ borderColor: activeSection.color }} />

                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between shrink-0 bg-slate-900/40 relative">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl drop-shadow-sm">{activeSection.emoji}</span>
                                    <div>
                                        <span className="text-[8px] font-mono tracking-widest text-slate-500 uppercase block">
                                            {activeSection.coordinate} :: {activeSection.codename}
                                        </span>
                                        <h3 className="text-lg md:text-xl font-bold tracking-tight text-white m-0">
                                            {language === 'vi' ? activeSection.titleVi : activeSection.titleEn}
                                        </h3>
                                    </div>
                                </div>
                                
                                {/* Telemetry control shortcuts */}
                                <div className="flex items-center gap-2">
                                    {/* Warp Navigation Controls */}
                                    <div className="flex items-center border border-white/10 rounded-[2px] overflow-hidden bg-black/40 mr-2">
                                        <button 
                                            onClick={() => handleWarp('prev')}
                                            className="px-2.5 py-1.5 hover:bg-white/5 text-slate-400 hover:text-white transition cursor-pointer border-r border-white/10"
                                            title="Warp to previous planet"
                                        >
                                            <ChevronLeft className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="px-3 text-[9px] font-mono tracking-widest text-[var(--neon-cyan)] select-none uppercase" style={{ color: activeSection.color }}>
                                            WARP
                                        </span>
                                        <button 
                                            onClick={() => handleWarp('next')}
                                            className="px-2.5 py-1.5 hover:bg-white/5 text-slate-400 hover:text-white transition cursor-pointer border-l border-white/10"
                                            title="Warp to next planet"
                                        >
                                            <ChevronRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Exit button */}
                                    <button
                                        onClick={() => { triggerClick(); setSelectedPlanetId(null) }}
                                        className="w-8 h-8 rounded-[2px] bg-slate-800/40 hover:bg-red-500/20 text-slate-400 hover:text-red-500 border border-white/10 flex items-center justify-center transition cursor-pointer"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Dynamic scanning indicator strip */}
                            <div className="h-0.5 w-full shrink-0 relative overflow-hidden bg-white/5">
                                <motion.div 
                                    animate={{ left: ['-100%', '100%'] }}
                                    transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                                    className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-current to-transparent"
                                    style={{ color: activeSection.color }}
                                />
                            </div>

                            {/* Modal Body (Scrollable) */}
                            <div className="overflow-y-auto p-6 md:p-8 space-y-6 grow bg-[#070709] scrollbar-thin">
                                
                                {/* Futuristic System Telemetry Preview Mockup */}
                                {activeSection.imagePath && (
                                    <div className="w-full relative aspect-[16/9] md:aspect-[21/9] bg-[#0d0d12] border border-white/5 overflow-hidden rounded-[2px] mb-6 group/img shadow-inner">
                                        <img 
                                            src={activeSection.imagePath} 
                                            alt={language === 'vi' ? activeSection.titleVi : activeSection.titleEn}
                                            className="w-full h-full object-cover object-center opacity-85 group-hover/img:opacity-100 transition-opacity duration-300"
                                        />
                                        
                                        {/* Scanner Overlay Line */}
                                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent_45%,rgba(255,255,255,0.06)_50%,transparent_55%)] bg-[length:100%_200%] animate-scan" style={{ color: activeSection.color }} />
                                        
                                        {/* Tech Overlay HUD Info */}
                                        <div className="absolute bottom-2 right-3 px-2 py-0.5 bg-black/75 border border-white/10 rounded-[2px] font-mono text-[9px] text-slate-400 tracking-wide flex items-center gap-1.5 backdrop-blur-sm select-none">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            {language === 'vi' ? 'HÌNH ẢNH TRỰC QUAN' : 'HUD VISUAL PREVIEW'}
                                        </div>
                                    </div>
                                )}

                                {/* UX/UI & Tech Columns */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                                    {/* UX column */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 border-b border-white/5 pb-2">
                                            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                                            {language === 'vi' ? 'Tính Năng & Trải Nghiệm (UX)' : 'UX & Features'}
                                        </h4>
                                        <ul className="space-y-3">
                                            {(language === 'vi' ? activeSection.uxVi : activeSection.uxEn).map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-text-secondary leading-relaxed">
                                                    <span className="mt-1 flex-shrink-0 text-[10px]" style={{ color: activeSection.color }}>▪</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Technical Specs column */}
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 border-b border-white/5 pb-2">
                                            <Cpu className="w-3.5 h-3.5" style={{ color: activeSection.color }} />
                                            {language === 'vi' ? 'Giải Pháp Kỹ Thuật (Tech Specs)' : 'Technical Architecture'}
                                        </h4>
                                        <ul className="space-y-3">
                                            {(language === 'vi' ? activeSection.techVi : activeSection.techEn).map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-text-secondary leading-relaxed">
                                                    <span className="mt-1 flex-shrink-0 text-xs" style={{ color: activeSection.color }}>▸</span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Tech Badges */}
                                <div className="border-t border-white/5 pt-4">
                                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block mb-2.5">
                                        {language === 'vi' ? 'CÔNG NGHỆ CỐT LÕI' : 'CORE TECHNOLOGIES'}
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {activeSection.techBadges.map(badge => (
                                            <span 
                                                key={badge}
                                                className="px-2.5 py-1 text-[9px] font-bold rounded-[2px] border text-text-secondary bg-black/40 font-mono"
                                                style={{ 
                                                    borderColor: `${activeSection.color}33`,
                                                    color: activeSection.color
                                                }}
                                            >
                                                {badge}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Simulated Telemetry Terminal inside Modal */}
                                <div className="border-t border-white/5 pt-4">
                                    <span className="text-[9px] font-mono font-bold text-slate-500 tracking-widest uppercase block mb-2">
                                        {language === 'vi' ? 'BẢNG ĐIỀU KHIỂN CHẨN ĐOÁN HỆ THỐNG' : 'SYSTEM DIAGNOSTIC TELEMETRY'}
                                    </span>
                                    
                                    <div className="w-full h-44 bg-[#040406] border border-white/5 p-4 font-mono text-[11px] md:text-xs overflow-hidden relative rounded-[2px]">
                                        {/* CRT Overlay Scanlines */}
                                        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-20" />
                                        
                                        <div 
                                            ref={terminalContainerRef}
                                            className="h-full overflow-y-auto space-y-1.5 scrollbar-thin text-shadow-glow scroll-smooth"
                                            style={{ color: activeSection.color }}
                                        >
                                            {terminalHistory.map((line, i) => (
                                                <div key={i} className={`${line.type === 'in' ? 'opacity-40' : 'opacity-100'} break-all`}>
                                                    {line.text}
                                                </div>
                                            ))}
                                            <form onSubmit={handleSubmit} className="flex items-center gap-1.5 mt-1.5">
                                                <span className="font-bold">{'>'}</span>
                                                <input 
                                                    type="text" 
                                                    value={terminalInput}
                                                    onChange={(e) => setTerminalInput(e.target.value)}
                                                    className="flex-1 bg-transparent outline-none border-none focus:ring-0 p-0 text-[11px] md:text-xs"
                                                    style={{ color: activeSection.color }}
                                                    spellCheck="false"
                                                    autoComplete="off"
                                                    placeholder={language === 'vi' ? 'Nhập lệnh (ví dụ: help, stats, scan)...' : 'Type command (e.g. help, stats, scan)...'}
                                                />
                                            </form>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-end mt-2">
                                        <button 
                                            onClick={() => runTerminalCommand('scan')}
                                            className="px-3 py-1 bg-slate-900 border border-white/5 hover:border-white/10 text-[9px] font-mono uppercase text-slate-400 hover:text-white rounded-[2px] transition cursor-pointer"
                                        >
                                            🔍 Run System Scan
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Trajectory Footer button */}
            <div className="mt-16 text-center z-10">
                <Link 
                    href="/projects" 
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-white border border-border-primary hover:border-white px-5 py-2.5 transition-all rounded-[2px] cursor-pointer"
                >
                    {language === 'vi' ? 'Xem các Project của mình' : 'View Full Projects List'}
                    <ExternalLink className="w-3.5 h-3.5" />
                </Link>
            </div>
            
            {/* Global style overrides for text shadow glows */}
            <style jsx global>{`
                .text-shadow-glow {
                    text-shadow: 0 0 6px rgba(0, 240, 255, 0.15);
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.05);
                }
                .scrollbar-thin:hover::-webkit-scrollbar-thumb {
                    background-color: rgba(255, 255, 255, 0.12);
                }
                @keyframes scan {
                    0% {
                        background-position: 0% 0%;
                    }
                    100% {
                        background-position: 0% 100%;
                    }
                }
                .animate-scan {
                    background-size: 100% 200%;
                    animation: scan 8s linear infinite;
                }
            `}</style>
        </div>
    )
}
