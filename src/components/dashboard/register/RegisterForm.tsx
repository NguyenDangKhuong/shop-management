'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { register } from '@/actions/auth'

const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
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
      setError('Passwords do not match!')
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
      setError('An error occurred during registration')
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
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400 text-sm">Sign up to get started</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="group relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00e5ff] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full bg-transparent border border-[rgba(255,255,255,0.08)] rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:border-[#00e5ff] focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300"
              required
              minLength={2}
            />
          </div>

          {/* Email Input */}
          <div className="group relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00e5ff] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full bg-transparent border border-[rgba(255,255,255,0.08)] rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:border-[#00e5ff] focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300"
              required
            />
          </div>

          {/* Password Input */}
          <div className="group relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00e5ff] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-transparent border border-[rgba(255,255,255,0.08)] rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:border-[#00e5ff] focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300"
              required
              minLength={6}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="group relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00e5ff] transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full bg-transparent border border-[rgba(255,255,255,0.08)] rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:border-[#00e5ff] focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all duration-300"
              required
              minLength={6}
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#b927fc] text-white font-bold text-lg shadow-lg shadow-[#00e5ff]/30 hover:scale-[1.02] hover:shadow-[#b927fc]/50 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'CREATING ACCOUNT...' : 'SIGN UP'}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-500 mt-8 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="font-bold bg-gradient-to-r from-[#00e5ff] to-[#b927fc] bg-clip-text text-transparent hover:opacity-80 transition-opacity ml-1">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterForm
