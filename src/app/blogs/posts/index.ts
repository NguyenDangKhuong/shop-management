import { BlogPost } from '../types'
import callbackPromiseAsyncAwait from './callback-promise-async-await'
import nextjsKhaiNiemMoi from './nextjs-khai-niem-moi'
import reactHooks from './react-hooks-chi-tiet'

// Thêm bài viết mới: import rồi thêm vào mảng bên dưới
export const blogPosts: BlogPost[] = [
    callbackPromiseAsyncAwait,
    nextjsKhaiNiemMoi,
    reactHooks,
]
