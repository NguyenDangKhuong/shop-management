'use client'

/**
 * Internal API utility for Next.js API routes
 * Prevents code duplication and ensures consistent error handling
 */

export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

/**
 * GET request to internal API route
 * @param url - API route path (e.g., '/api/shopee-links')
 * @param options - Additional fetch options
 */
export async function apiGet<T = any>(
    url: string,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(url, {
            method: 'GET',
            cache: 'no-store', // Always fetch fresh data
            ...options
        })

        const result = await res.json()
        return result
    } catch (error: any) {
        console.error(`API GET ${url} failed:`, error)
        return {
            success: false,
            error: error.message || 'Failed to fetch data'
        }
    }
}

/**
 * POST request to internal API route
 * @param url - API route path
 * @param body - Request body
 * @param options - Additional fetch options
 */
export async function apiPost<T = any>(
    url: string,
    body?: any,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            body: JSON.stringify(body),
            cache: 'no-store',
            ...options
        })

        const result = await res.json()
        return result
    } catch (error: any) {
        console.error(`API POST ${url} failed:`, error)
        return {
            success: false,
            error: error.message || 'Failed to create data'
        }
    }
}

/**
 * PUT request to internal API route
 * @param url - API route path
 * @param body - Request body
 * @param options - Additional fetch options
 */
export async function apiPut<T = any>(
    url: string,
    body?: any,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            },
            body: JSON.stringify(body),
            cache: 'no-store',
            ...options
        })

        const result = await res.json()
        return result
    } catch (error: any) {
        console.error(`API PUT ${url} failed:`, error)
        return {
            success: false,
            error: error.message || 'Failed to update data'
        }
    }
}

/**
 * DELETE request to internal API route
 * @param url - API route path (with query params if needed)
 * @param options - Additional fetch options
 */
export async function apiDelete<T = any>(
    url: string,
    options?: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(url, {
            method: 'DELETE',
            cache: 'no-store',
            ...options
        })

        const result = await res.json()
        return result
    } catch (error: any) {
        console.error(`API DELETE ${url} failed:`, error)
        return {
            success: false,
            error: error.message || 'Failed to delete data'
        }
    }
}
