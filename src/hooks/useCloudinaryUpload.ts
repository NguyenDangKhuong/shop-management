import { useCallback, useEffect, useRef, useState } from 'react'

import {
    CloudinaryUploadResult,
    CloudinaryWidgetOptions,
    createUploadWidget,
    UploadErrorCallback,
    UploadSuccessCallback
} from '@/utils/cloudinaryConfig'

interface UseCloudinaryUploadReturn {
    openWidget: () => void
    isUploading: boolean
    progress: number
    error: string | null
    clearError: () => void
}

export const useCloudinaryUpload = (
    config: CloudinaryWidgetOptions,
    onSuccess: UploadSuccessCallback,
    onError?: UploadErrorCallback
): UseCloudinaryUploadReturn => {
    const [isUploading, setIsUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const widgetRef = useRef<any>(null)

    // Cleanup widget on unmount
    useEffect(() => {
        return () => {
            if (widgetRef.current) {
                widgetRef.current.close()
                widgetRef.current = null
            }
        }
    }, [])

    const handleSuccess = useCallback(
        (result: CloudinaryUploadResult) => {
            setIsUploading(false)
            setProgress(100)
            setError(null)
            onSuccess(result)

            // Reset progress after a short delay
            setTimeout(() => setProgress(0), 1000)
        },
        [onSuccess]
    )

    const handleError = useCallback(
        (err: any) => {
            setIsUploading(false)
            setProgress(0)
            const errorMessage = err?.message || 'Upload failed. Please try again.'
            setError(errorMessage)

            if (onError) {
                onError(err)
            }
        },
        [onError]
    )

    const handleProgress = useCallback((progressValue: number) => {
        setProgress(progressValue)
    }, [])

    const openWidget = useCallback(() => {
        setError(null)
        setIsUploading(true)
        setProgress(0)

        // Create widget if not exists
        if (!widgetRef.current) {
            widgetRef.current = createUploadWidget(
                config,
                handleSuccess,
                handleError,
                handleProgress
            )
        }

        // Open widget
        if (widgetRef.current) {
            widgetRef.current.open()
        } else {
            handleError(new Error('Failed to initialize upload widget'))
        }
    }, [config, handleSuccess, handleError, handleProgress])

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return {
        openWidget,
        isUploading,
        progress,
        error,
        clearError
    }
}
