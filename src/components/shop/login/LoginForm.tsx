'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { authenticate } from '@/actions/auth'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from '@/components/icons'
import { Button, Input } from '@/components/ui'

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await authenticate(email, password)

      if (result.success) {
        // Redirect based on role
        if (result.role === 0) {
          router.push('/products')
        } else {
          router.push('/')
        }
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (error) {
      setError('An error occurred during login')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-[float_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-[float_6s_ease-in-out_3s_infinite]"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-glass-bg backdrop-blur-2xl border border-glass-border rounded-3xl p-8 md:p-10 shadow-2xl z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Please enter your details to sign in</p>
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
            placeholder="Email Address"
            leftIcon={<MailIcon />}
            required
          />

          {/* Password Input */}
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            leftIcon={<LockIcon />}
            rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
            onRightIconClick={() => setShowPassword(!showPassword)}
            required
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-400 cursor-pointer hover:text-white transition-colors">
              <input type="checkbox" className="mr-2 w-4 h-4 accent-primary rounded bg-white/5 border-white/10 cursor-pointer" />
              Remember me
            </label>
            <Link href="#" className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <Button type="submit" loading={loading} fullWidth>
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </Button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginForm
