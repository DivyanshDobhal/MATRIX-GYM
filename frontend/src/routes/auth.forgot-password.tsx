import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { KeyRound, ArrowLeft, Loader2, MailCheck } from 'lucide-react'

export const Route = createFileRoute('/auth/forgot-password')({
  component: ForgotPassword,
})

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulated API call
    setTimeout(() => {
      setIsLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 sm:p-10 rounded-[32px] bg-white/[0.03] backdrop-blur-[40px] border border-white/10 shadow-[0_0_80px_rgba(57,255,20,0.05)] text-center relative overflow-hidden"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
          className="w-20 h-20 bg-[#39FF14]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#39FF14]/20"
        >
          <MailCheck className="w-10 h-10 text-[#39FF14]" />
        </motion.div>
        <h2 className="text-3xl font-bold font-space text-white mb-4">Check your email</h2>
        <p className="text-white/60 mb-8 leading-relaxed">
          We have sent password reset instructions to <br/><span className="text-white font-semibold">{email}</span>
        </p>
        <Link
          to="/auth/login"
          className="inline-flex items-center justify-center w-full bg-white/10 text-white font-bold py-4 rounded-2xl hover:bg-white/20 transition-all border border-white/10"
        >
          Return to Login
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      className="w-full max-w-md p-8 sm:p-10 rounded-[32px] bg-white/[0.03] backdrop-blur-[40px] border border-white/10 shadow-[0_0_80px_rgba(57,255,20,0.05)] relative overflow-hidden"
    >
      <Link to="/auth/login" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 text-sm font-semibold">
        <ArrowLeft className="w-4 h-4" />
        Back to login
      </Link>

      <div className="mb-8">
        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 border border-white/10">
          <KeyRound className="w-6 h-6 text-[#39FF14]" />
        </div>
        <h1 className="text-3xl font-bold font-space text-white tracking-tight">
          Forgot Password
        </h1>
        <p className="text-white/50 mt-2 text-sm leading-relaxed">
          Enter the email address associated with your account and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <input
            type="email"
            id="reset-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#39FF14]/50 focus:bg-white/10 transition-all peer placeholder-transparent"
            required
            placeholder="Email Address"
          />
          <label 
            htmlFor="reset-email"
            className="absolute left-5 -top-2.5 text-xs font-semibold text-[#39FF14] bg-[#0A0A0A] px-2 transition-all peer-placeholder-shown:text-white/50 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#39FF14] peer-focus:bg-[#0A0A0A] rounded pointer-events-none"
          >
            Email Address
          </label>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !email}
          className="w-full bg-[#39FF14] text-black font-bold py-4 rounded-2xl hover:bg-[#39FF14]/90 hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
        </button>
      </form>
    </motion.div>
  )
}
