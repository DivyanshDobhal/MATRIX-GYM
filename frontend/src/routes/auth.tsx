import { createFileRoute, Outlet, Link, redirect } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ParticleBackground } from '../components/auth/ParticleBackground'
import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/auth')({
  beforeLoad: ({ location }) => {
    if (location.pathname === '/auth' || location.pathname === '/auth/') {
      throw redirect({
        to: '/auth/login',
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen w-full flex bg-[#050505] text-white overflow-hidden relative">
      {/* 3D Background - shared across both panels but pinned behind everything */}
      <ParticleBackground />

      {/* Main Container - Split Screen */}
      <div className="relative z-10 flex w-full h-full min-h-screen">
        
        {/* LEFT PANEL (45%) */}
        <div className="hidden lg:flex w-[45%] flex-col justify-between p-12 border-r border-white/10 bg-black/40 backdrop-blur-3xl relative overflow-hidden">
          {/* Animated Mesh Gradient inside Left Panel */}
          <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#39FF14] to-emerald-900 rounded-full blur-[120px] animate-pulse-slow"></div>
          </div>

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 group inline-block">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#39FF14] text-black font-black text-2xl shadow-[0_0_30px_rgba(57,255,20,0.4)] group-hover:shadow-[0_0_50px_rgba(57,255,20,0.6)] transition-all duration-500">
                M
              </span>
              <span className="font-display text-2xl font-black tracking-tight text-white group-hover:text-[#39FF14] transition-colors">
                MATRIX AI
              </span>
            </Link>

            {mounted ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mt-24 space-y-6"
              >
                <h1 className="text-5xl md:text-6xl font-black font-space uppercase leading-tight tracking-tighter">
                  Train Smarter.<br />
                  <span className="text-[#39FF14]">Eat Better.</span><br />
                  Transform Faster.
                </h1>
                <p className="text-lg text-white/60 max-w-md">
                  Enter the world's most advanced AI-powered fitness ecosystem and unlock your strongest self.
                </p>
              </motion.div>
            ) : (
              <div className="mt-24 space-y-6 opacity-0">
                <h1 className="text-5xl md:text-6xl font-black font-space uppercase leading-tight tracking-tighter">
                  Train Smarter.<br />
                  <span>Eat Better.</span><br />
                  Transform Faster.
                </h1>
                <p className="text-lg text-white/60 max-w-md">
                  Enter the world's most advanced AI-powered fitness ecosystem and unlock your strongest self.
                </p>
              </div>
            )}
          </div>

          {/* Stats and Sidebar Features */}
          {mounted ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="relative z-10 space-y-8"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="text-3xl font-black text-[#39FF14]">250K+</div>
                  <div className="text-xs font-semibold text-white/50 uppercase tracking-widest">Workouts Completed</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-black text-[#39FF14]">50K</div>
                  <div className="text-xs font-semibold text-white/50 uppercase tracking-widest">Active Members</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-black text-[#39FF14]">8M</div>
                  <div className="text-xs font-semibold text-white/50 uppercase tracking-widest">Calories Burned</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-black text-[#39FF14]">4.9</div>
                  <div className="text-xs font-semibold text-white/50 uppercase tracking-widest">App Rating</div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/10">
                {['AI Workout Coach', 'Personalized Nutrition', 'Progress Tracking', 'Premium Community'].map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm font-medium text-white/70">
                    <CheckCircle2 className="w-5 h-5 text-[#39FF14]" />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="relative z-10 space-y-8 opacity-0" />
          )}
        </div>

        {/* RIGHT PANEL (55%) */}
        <div className="w-full lg:w-[55%] flex items-center justify-center p-6 lg:p-12 relative">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
