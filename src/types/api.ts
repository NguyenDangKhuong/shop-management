export type ApiResponse<T = unknown> =
  | {
      message?: string
      success: true
      data?: T
    }
  | {
      success: false
      message: string
      error?: unknown
    }

export type PaginatedResponse<T> = {
  products: T[]
  totalPages: number
  totalDocs: number
  success: boolean
}
