'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { register } from '@/actions/auth'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon, UserIcon } from '@/components/icons'
import { Button, Input } from '@/components/ui'
import { useTranslation } from '@/i18n'

const RegisterForm = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    // Validate password match
    if (password !== confirmPassword) {
      setError(t('register.passwordMismatch'))
      setLoading(false)
      return
    }

    try {
      const result = await register(name, email, password)

      if (result.success) {
        router.push('/login')
      } else {
        setError(result.error || 'Registration failed')
      }
    } catch (error) {
      setError(t('register.networkError'))
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#00e5ff] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-[float_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#b927fc] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-[float_6s_ease-in-out_3s_infinite]"></div>

      {/* Register Card */}
      <div className="relative w-full max-w-md bg-[rgba(255,255,255,0.03)] backdrop-blur-2xl border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 md:p-10 shadow-2xl z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{t('register.title')}</h2>
          <p className="text-gray-400 text-sm">{t('register.subtitle')}</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <Input
            type="text"
            name="name"
            placeholder={t('register.name')}
            leftIcon={<UserIcon />}
            required
            minLength={2}
          />

          {/* Email Input */}
          <Input
            type="email"
            name="email"
            placeholder={t('register.email')}
            leftIcon={<MailIcon />}
            required
          />

          {/* Password Input */}
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder={t('register.password')}
            leftIcon={<LockIcon />}
            rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
            onRightIconClick={() => setShowPassword(!showPassword)}
            required
            minLength={6}
          />

          {/* Confirm Password Input */}
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder={t('register.confirmPassword')}
            leftIcon={<LockIcon />}
            rightIcon={showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
            required
            minLength={6}
          />

          {/* Register Button */}
          <Button type="submit" loading={loading} fullWidth>
            {loading ? t('register.loading') : t('register.submit')}
          </Button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          {t('register.hasAccount')}{' '}
          <Link href="/login" className="font-bold bg-gradient-to-r from-[#00e5ff] to-[#b927fc] bg-clip-text text-transparent hover:opacity-80 transition-opacity ml-1">
            {t('register.login')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
