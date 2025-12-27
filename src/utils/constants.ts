export const __prod__ = process.env.NODE_ENV === 'production'

export const BACKEND_HOST = __prod__
  ? process.env.NEXT_PUBLIC_BACK_END_HOST_PROD
  : process.env.NEXT_PUBLIC_BACK_END_HOST_DEV

export const MONGO_USER_NAME = __prod__
  ? process.env.NEXT_PUBLIC_MONGO_USER_NAME_PROD
  : process.env.NEXT_PUBLIC_MONGO_USER_NAME_DEV
export const MONGO_PASSWORD = __prod__
  ? process.env.NEXT_PUBLIC_MONGO_PASSWORD_PROD
  : process.env.NEXT_PUBLIC_MONGO_PASSWORD_DEV

export const MONGO_CLUSTER_URL = process.env.NEXT_PUBLIC_MONGO_CLUSTER_URL
export const MONGO_DB_NAME = process.env.NEXT_PUBLIC_MONGO_DB_NAME

export const CLOUD_NAME_CLOUDINARY = process.env.NEXT_PUBLIC_CLOUD_NAME_CLOUDINARY
export const API_KEY_CLOUDINARY = process.env.NEXT_PUBLIC_API_KEY_CLOUDINARY
export const API_SECRET_CLOUDINARY = process.env.NEXT_PUBLIC_API_SECRET_CLOUDINARY
export const NEXT_AUTH_SECRET = process.env.NEXT_PUBLIC_AUTH_SECRET

export const LIMIT_PAGE_NUMBER = 20
