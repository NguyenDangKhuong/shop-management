export const __prod__ = process.env.NODE_ENV === 'production'

export const BACKEND_HOST = __prod__
  ? process.env.NEXT_PUBLIC_BACK_END_HOST_PROD
  : process.env.NEXT_PUBLIC_BACK_END_HOST_DEV

export const MONGO_USER_NAME = __prod__
  ? process.env.MONGO_USER_NAME_PROD
  : process.env.MONGO_USER_NAME_DEV
export const MONGO_PASSWORD = __prod__
  ? process.env.MONGO_PASSWORD_PROD
  : process.env.MONGO_PASSWORD_DEV

export const MONGO_CLUSTER_URL = process.env.MONGO_CLUSTER_URL
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME

export const CLOUD_NAME_CLOUDINARY = process.env.NEXT_PUBLIC_CLOUD_NAME_CLOUDINARY
export const API_KEY_CLOUDINARY = process.env.NEXT_PUBLIC_API_KEY_CLOUDINARY
export const API_SECRET_CLOUDINARY = process.env.CLOUDINARY_API_SECRET
export const CLOUDINARY_UPLOAD_PRODUCT_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRODUCT_PRESET
export const CLOUDINARY_UPLOAD_FACEBOOK_POST_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FACEBOOK_POST_PRESET
export const CLOUDINARY_UPLOAD_SHOPEE_LINK_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_SHOPEE_LINK_PRESET
export const CLOUDINARY_UPLOAD_TIKTOK_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_TIKTOK_PRESET
export const NEXT_AUTH_SECRET = process.env.AUTH_SECRET

// Cloudflare R2 (S3-compatible)
export const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID
export const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID
export const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY
export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'tiktok-videos'
export const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL

export const NOTION_API_KEY = process.env.NOTION_API_KEY

export const LIMIT_PAGE_NUMBER = 20

// TikTok scheduling
export const TIKTOK_DEFAULT_HOUR_GAP = 1 // Khoảng cách mặc định giữa các bài đăng (giờ)

// Site domain (đổi domain ở đây khi migrate)
export const SITE_DOMAIN = 'shop.thetaphoa.store'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE_DOMAIN}`
export const SITE_NAME = 'TheTapHoa'

// Admin domain (for login/dashboard when accessing from proxy domains like khuong.theworkpc.com)
export const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || 'https://thetaphoa.vercel.app'
