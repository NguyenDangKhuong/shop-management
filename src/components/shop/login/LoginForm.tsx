'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { authenticate } from '@/actions/auth'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '@/components/icons'
import { Button, Input } from '@/components/ui'
import { useTranslation } from '@/i18n'

const REMEMBER_KEY = 'login_remember'

const LoginForm = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [savedEmail, setSavedEmail] = useState('')
  const [savedPassword, setSavedPassword] = useState('')
  const router = useRouter()

  // Load saved credentials on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(REMEMBER_KEY)
      if (saved) {
        const { email, password } = JSON.parse(saved)
        setSavedEmail(email || '')
        setSavedPassword(password || '')
        setRememberMe(true)
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      // Save or clear credentials based on rememberMe
      if (rememberMe) {
        localStorage.setItem(REMEMBER_KEY, JSON.stringify({ email, password }))
      } else {
        localStorage.removeItem(REMEMBER_KEY)
      }

      const result = await authenticate(email, password)

      if (result.success) {
        // Redirect based on role
        if (result.role === 0) {
          router.push('/tiktok-accounts')
        } else {
          router.push('/')
        }
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (error) {
      setError(t('login.networkError'))
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

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-[rgba(255,255,255,0.03)] backdrop-blur-2xl border border-[rgba(255,255,255,0.08)] rounded-3xl p-8 md:p-10 shadow-2xl z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{t('login.title')}</h2>
          <p className="text-gray-400 text-sm">{t('login.subtitle')}</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <Input
            type="email"
            name="email"
            placeholder={t('login.email')}
            leftIcon={<MailIcon />}
            defaultValue={savedEmail}
            required
          />

          {/* Password Input */}
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder={t('login.password')}
            leftIcon={<LockIcon />}
            rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
            onRightIconClick={() => setShowPassword(!showPassword)}
            defaultValue={savedPassword}
            required
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-400 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => {
                  setRememberMe(e.target.checked)
                  if (!e.target.checked) {
                    localStorage.removeItem(REMEMBER_KEY)
                  }
                }}
                className="mr-2 w-4 h-4 accent-[#00e5ff] rounded bg-white/5 border-white/10 cursor-pointer"
              />
              {t('login.rememberMe')}
            </label>
            <Link href="/forgot-password" className="font-semibold bg-gradient-to-r from-[#00e5ff] to-[#b927fc] bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              {t('login.forgotPassword')}
            </Link>
          </div>

          {/* Login Button */}
          <Button type="submit" loading={loading} fullWidth>
            {loading ? t('login.loading') : t('login.submit')}
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          {t('login.noAccount')}{' '}
          <Link href="/register" className="font-bold bg-gradient-to-r from-[#00e5ff] to-[#b927fc] bg-clip-text text-transparent hover:opacity-80 transition-opacity ml-1">
            {t('login.signUp')}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
