'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { LockIcon, EyeIcon, EyeOffIcon } from '@/components/icons'
import { Button, Input } from '@/components/ui'
import { useTranslation } from '@/i18n'

const ResetPasswordForm = () => {
    const { t } = useTranslation()
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(e.currentTarget)
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (password.length < 6) {
            setError(t('reset.passwordTooShort'))
            setLoading(false)
            return
        }

        if (password !== confirmPassword) {
            setError(t('reset.passwordMismatch'))
            setLoading(false)
            return
        }

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, token, password })
            })

            const data = await response.json()

            if (data.success) {
                setSuccess(true)
                setTimeout(() => router.push('/login'), 3000)
            } else {
                setError(data.error || 'Something went wrong')
            }
        } catch {
            setError(t('reset.networkError'))
        } finally {
            setLoading(false)
        }
    }

    // Invalid link — missing token or email
    if (!token || !email) {
        return (
            <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center relative overflow-hidden p-4">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#00e5ff] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-[float_6s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#b927fc] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-[float_6s_ease-in-out_3s_infinite]"></div>

                <div className="relative w-full max-w-md bg-[rgba(255,255,255,0.03)] backdrop-blur-2xl border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 md:p-10 shadow-2xl z-10 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">{t('reset.invalidLink')}</h2>
                    <p className="text-gray-400 text-sm mb-6">
                        {t('reset.invalidLinkText')}
                    </p>
                    <Link
                        href="/forgot-password"
                        className="font-bold bg-gradient-to-r from-[#00e5ff] to-[#b927fc] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                    >
                        {t('reset.requestNew')}
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center relative overflow-hidden p-4">
            {/* Animated Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#00e5ff] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-[float_6s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#b927fc] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-[float_6s_ease-in-out_3s_infinite]"></div>

            {/* Card */}
            <div className="relative w-full max-w-md bg-[rgba(255,255,255,0.03)] backdrop-blur-2xl border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 md:p-10 shadow-2xl z-10">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">{t('reset.title')}</h2>
                    <p className="text-gray-400 text-sm">{t('reset.subtitle')}</p>
                </div>

                {success ? (
                    <div className="text-center">
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm">
                            ✅ {t('reset.success')}
                        </div>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder={t('reset.newPassword')}
                                leftIcon={<LockIcon />}
                                rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                onRightIconClick={() => setShowPassword(!showPassword)}
                                required
                            />

                            <Input
                                type={showConfirm ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder={t('reset.confirmPassword')}
                                leftIcon={<LockIcon />}
                                rightIcon={showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                                onRightIconClick={() => setShowConfirm(!showConfirm)}
                                required
                            />

                            <Button type="submit" loading={loading} fullWidth>
                                {loading ? t('reset.loading') : t('reset.submit')}
                            </Button>
                        </form>

                        <p className="text-center text-gray-500 mt-8 text-sm">
                            <Link
                                href="/login"
                                className="font-bold bg-gradient-to-r from-[#00e5ff] to-[#b927fc] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                            >
                                {t('reset.backToLogin')}
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

export default ResetPasswordForm
