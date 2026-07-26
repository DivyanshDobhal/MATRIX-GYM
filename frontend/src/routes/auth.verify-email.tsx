import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/auth/verify-email')({
  component: VerifyEmail,
})

function VerifyEmail() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
      className="w-full max-w-md p-8 sm:p-10 rounded-[32px] bg-white/[0.03] backdrop-blur-[40px] border border-white/10 shadow-[0_0_80px_rgba(57,255,20,0.05)] text-center relative overflow-hidden"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
        className="w-20 h-20 bg-[#39FF14]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#39FF14]/20"
      >
        <Mail className="w-10 h-10 text-[#39FF14]" />
      </motion.div>

      <h2 className="text-3xl font-bold font-space text-white mb-4 tracking-tight">Verify Your Email</h2>
      <p className="text-white/60 mb-8 leading-relaxed text-sm">
        We sent a verification link to your inbox. Please check your email and click the link to activate your account.
      </p>

      <Link
        to="/profile/setup"
        className="inline-flex items-center justify-center w-full bg-[#39FF14] text-black font-bold py-4 rounded-2xl hover:bg-[#39FF14]/90 hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all gap-2"
      >
        Continue to Setup <ArrowRight className="w-5 h-5" />
      </Link>

      <div className="mt-8">
        <button className="text-sm text-white/40 hover:text-white transition-colors">
          Didn't receive an email? <span className="text-[#39FF14]">Resend</span>
        </button>
      </div>
    </motion.div>
  )
}
