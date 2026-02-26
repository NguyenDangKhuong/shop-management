import { BlogPost } from '../types'
import callbackPromiseAsyncAwait from './callback-promise-async-await'
import coreWebVitals from './core-web-vitals'
import csrSsrSsgIsr from './csr-ssr-ssg-isr'
import eventLoop from './event-loop'
import frontendInterviewRoadmap from './frontend-interview-roadmap'
import monorepoMicroFe from './monorepo-micro-frontend'
import nextjsKhaiNiemMoi from './nextjs-khai-niem-moi'
import reactHooks from './react-hooks-chi-tiet'
import reactPerformance from './react-performance'

// Thêm bài viết mới: import rồi thêm vào mảng bên dưới
export const blogPosts: BlogPost[] = [
    monorepoMicroFe,
    csrSsrSsgIsr,
    eventLoop,
    callbackPromiseAsyncAwait,
    nextjsKhaiNiemMoi,
    frontendInterviewRoadmap,
    reactHooks,
    reactPerformance,
    coreWebVitals,
]


