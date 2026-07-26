import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Check, X, Loader2 } from 'lucide-react'
import { useGoogleLogin } from '@react-oauth/google'

export const Route = createFileRoute('/auth/login')({
  component: Login,
})

function Login() {
  const { login, googleSignIn } = useAuth()
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      await login({ email, password })
      navigate({ to: '/dashboard' })
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true)
      setError('')
      try {
        await googleSignIn(tokenResponse.access_token)
        navigate({ to: '/dashboard' })
      } catch (err) {
        setError('Google sign-in failed')
      } finally {
        setIsGoogleLoading(false)
      }
    },
    onError: () => {
      setError('Google sign-in failed')
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      className="w-full max-w-md p-8 sm:p-10 rounded-[32px] bg-white/[0.03] backdrop-blur-[40px] border border-white/10 shadow-[0_0_80px_rgba(57,255,20,0.05)] relative overflow-hidden"
    >
      {/* Top Tabs */}
      <div className="flex w-full mb-10 bg-white/5 rounded-full p-1 relative border border-white/5">
        <div className="flex-1 text-center py-2 text-sm font-semibold text-white bg-white/10 rounded-full shadow-sm relative z-10">
          Sign In
        </div>
        <Link 
          to="/auth/register"
          className="flex-1 text-center py-2 text-sm font-semibold text-white/50 hover:text-white transition-colors relative z-10"
        >
          Create Account
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold font-space text-white tracking-tight">Welcome back</h2>
        <p className="text-white/50 mt-2 text-sm">Enter your details to access your dashboard.</p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm flex items-center gap-2"
          >
            <X className="w-4 h-4 shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleLogin} className="space-y-5">
        <div className="relative group">
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#39FF14]/50 focus:bg-white/10 transition-all peer placeholder-transparent"
            placeholder="Email"
          />
          <label 
            htmlFor="email"
            className="absolute left-5 -top-2.5 text-xs font-semibold text-[#39FF14] bg-[#0A0A0A] px-2 transition-all peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#39FF14] peer-focus:bg-[#0A0A0A] rounded pointer-events-none"
          >
            Email Address
          </label>
        </div>

        <div className="relative group">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#39FF14]/50 focus:bg-white/10 transition-all peer placeholder-transparent"
            placeholder="Password"
          />
          <label 
            htmlFor="password"
            className="absolute left-5 -top-2.5 text-xs font-semibold text-[#39FF14] bg-[#0A0A0A] px-2 transition-all peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#39FF14] peer-focus:bg-[#0A0A0A] rounded pointer-events-none"
          >
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-4 text-white/40 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-white/5 group-hover:border-[#39FF14]/50 transition-colors">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
              {rememberMe && <Check className="w-3 h-3 text-[#39FF14]" />}
            </div>
            <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors">Remember me</span>
          </label>

          <Link to="/auth/forgot-password" className="text-sm text-[#39FF14] hover:text-[#39FF14]/80 transition-colors font-medium">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#39FF14] text-black font-bold py-4 rounded-2xl hover:bg-[#39FF14]/90 hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 flex items-center gap-4">
        <div className="h-px bg-white/10 flex-1"></div>
        <span className="text-xs text-white/40 font-semibold uppercase tracking-widest">OR CONTINUE WITH</span>
        <div className="h-px bg-white/10 flex-1"></div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
        type="button"
        className="mt-8 w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white font-semibold py-4 rounded-2xl hover:bg-white/10 transition-all disabled:opacity-50"
      >
        {isGoogleLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24">
               <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </>
        )}
      </button>
    </motion.div>
  )
}
