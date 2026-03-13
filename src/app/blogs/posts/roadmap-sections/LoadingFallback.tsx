'use client'

export function LoadingFallback() {
    return (
        <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
                <span className="text-[var(--text-secondary)] text-sm">Đang tải...</span>
            </div>
        </div>
    )
}
