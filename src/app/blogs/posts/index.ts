import { BlogPost } from '../types'
import callbackPromiseAsyncAwait from './callback-promise-async-await'
import coreWebVitals from './core-web-vitals'
import csrSsrSsgIsr from './csr-ssr-ssg-isr'
import dataTypesStructures from './data-types-structures'
import ecmascriptFeatures from './ecmascript-features'
import eventLoop from './event-loop'
import frontendInterviewRoadmap from './frontend-interview-roadmap'
import monorepoMicroFe from './monorepo-micro-frontend'
import nextjsFeatures from './nextjs-features'
import nextjsKhaiNiemMoi from './nextjs-khai-niem-moi'
import reactFeatures from './react-features'
import reactHooks from './react-hooks-chi-tiet'
import reactPerformance from './react-performance'
import unitTestingGuide from './unit-testing-guide'

// Thêm bài viết mới: import rồi thêm vào mảng bên dưới
export const blogPosts: BlogPost[] = [
    ecmascriptFeatures,
    reactFeatures,
    nextjsFeatures,
    dataTypesStructures,
    unitTestingGuide,
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


