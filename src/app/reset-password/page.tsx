'use client'

import { Suspense } from 'react'
import ResetPasswordForm from '@/components/shop/login/ResetPasswordForm'

const ResetPasswordPage = () => {
    return (
        <Suspense fallback={
            <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    )
}

export default ResetPasswordPage
