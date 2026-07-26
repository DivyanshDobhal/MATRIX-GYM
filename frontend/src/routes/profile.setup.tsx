import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, ChevronRight, Loader2, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/profile/setup')({
  component: ProfileSetup,
})

function ProfileSetup() {
  const { updateProfile } = useAuth()
  const navigate = useNavigate()
  
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    profileImage: '',
    fitnessGoal: '',
    weight: '',
    targetWeight: '',
    experienceLevel: '',
    preferredWorkout: '',
    dietPreference: ''
  })

  const nextStep = () => setStep(s => Math.min(s + 1, 7))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      await updateProfile({
        ...formData,
        profileCompleted: true
      })
      navigate({ to: '/dashboard' })
    } catch (error) {
      console.error('Failed to setup profile', error)
      setIsLoading(false)
    }
  }

  const stepContent = () => {
    switch(step) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col items-center">
            <h2 className="text-3xl font-bold font-space text-white mb-2">Profile Photo</h2>
            <p className="text-white/50 mb-8 text-center">Add a photo so we can recognize you.</p>
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-white/50 hover:text-[#39FF14] hover:border-[#39FF14] transition-colors cursor-pointer mb-8 relative group bg-white/5">
              <Camera className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold uppercase">Upload</span>
            </div>
            <button onClick={nextStep} className="w-full bg-[#39FF14] text-black font-bold py-4 rounded-2xl hover:bg-[#39FF14]/90 transition-all flex items-center justify-center gap-2">
              Continue <ChevronRight className="w-5 h-5" />
            </button>
            <button onClick={nextStep} className="mt-4 text-sm text-white/40 hover:text-white transition-colors">Skip for now</button>
          </motion.div>
        )
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-3xl font-bold font-space text-white mb-2">Fitness Goal</h2>
            <p className="text-white/50 mb-8">What is your primary objective?</p>
            <div className="grid gap-3 mb-8">
              {['Muscle Gain', 'Weight Loss', 'Strength', 'Athletic Performance'].map(goal => (
                <button
                  key={goal}
                  onClick={() => setFormData(p => ({ ...p, fitnessGoal: goal }))}
                  className={`w-full text-left px-6 py-4 rounded-2xl border transition-all ${formData.fitnessGoal === goal ? 'bg-[#39FF14]/10 border-[#39FF14] text-[#39FF14]' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                >
                  <span className="font-semibold">{goal}</span>
                </button>
              ))}
            </div>
            <button onClick={nextStep} disabled={!formData.fitnessGoal} className="w-full bg-[#39FF14] text-black font-bold py-4 rounded-2xl disabled:opacity-50 flex items-center justify-center gap-2">
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-3xl font-bold font-space text-white mb-2">Current Weight</h2>
            <p className="text-white/50 mb-8">Let's set a baseline to track your progress.</p>
            <div className="flex justify-center items-center gap-2 mb-8 relative group">
              <input 
                type="number" 
                value={formData.weight}
                onChange={e => setFormData(p => ({ ...p, weight: e.target.value }))}
                className="w-32 text-center bg-transparent border-b-2 border-white/20 focus:border-[#39FF14] text-5xl font-bold text-white py-2 focus:outline-none transition-colors"
                autoFocus
              />
              <span className="text-2xl text-white/40 font-bold self-end pb-2">kg</span>
            </div>
            <button onClick={nextStep} disabled={!formData.weight} className="w-full bg-[#39FF14] text-black font-bold py-4 rounded-2xl disabled:opacity-50 flex items-center justify-center gap-2">
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )
      case 4:
        return (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-3xl font-bold font-space text-white mb-2">Target Weight</h2>
            <p className="text-white/50 mb-8">What's your goal weight?</p>
            <div className="flex justify-center items-center gap-2 mb-8">
              <input 
                type="number" 
                value={formData.targetWeight}
                onChange={e => setFormData(p => ({ ...p, targetWeight: e.target.value }))}
                className="w-32 text-center bg-transparent border-b-2 border-white/20 focus:border-[#39FF14] text-5xl font-bold text-white py-2 focus:outline-none transition-colors"
                autoFocus
              />
              <span className="text-2xl text-white/40 font-bold self-end pb-2">kg</span>
            </div>
            <button onClick={nextStep} disabled={!formData.targetWeight} className="w-full bg-[#39FF14] text-black font-bold py-4 rounded-2xl disabled:opacity-50 flex items-center justify-center gap-2">
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )
      case 5:
        return (
          <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-3xl font-bold font-space text-white mb-2">Experience Level</h2>
            <p className="text-white/50 mb-8">How familiar are you with training?</p>
            <div className="grid gap-3 mb-8">
              {['Beginner', 'Intermediate', 'Advanced'].map(exp => (
                <button
                  key={exp}
                  onClick={() => setFormData(p => ({ ...p, experienceLevel: exp }))}
                  className={`w-full text-left px-6 py-4 rounded-2xl border transition-all ${formData.experienceLevel === exp ? 'bg-[#39FF14]/10 border-[#39FF14] text-[#39FF14]' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                >
                  <span className="font-semibold">{exp}</span>
                </button>
              ))}
            </div>
            <button onClick={nextStep} disabled={!formData.experienceLevel} className="w-full bg-[#39FF14] text-black font-bold py-4 rounded-2xl disabled:opacity-50 flex items-center justify-center gap-2">
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )
      case 6:
        return (
          <motion.div key="step6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-3xl font-bold font-space text-white mb-2">Preferred Workout</h2>
            <p className="text-white/50 mb-8">Where and how do you like to train?</p>
            <div className="grid gap-3 mb-8 grid-cols-2">
              {['Gym', 'Home', 'CrossFit', 'Yoga'].map(workout => (
                <button
                  key={workout}
                  onClick={() => setFormData(p => ({ ...p, preferredWorkout: workout }))}
                  className={`w-full text-center px-6 py-4 rounded-2xl border transition-all ${formData.preferredWorkout === workout ? 'bg-[#39FF14]/10 border-[#39FF14] text-[#39FF14]' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                >
                  <span className="font-semibold">{workout}</span>
                </button>
              ))}
            </div>
            <button onClick={nextStep} disabled={!formData.preferredWorkout} className="w-full bg-[#39FF14] text-black font-bold py-4 rounded-2xl disabled:opacity-50 flex items-center justify-center gap-2">
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )
      case 7:
        return (
          <motion.div key="step7" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2 className="text-3xl font-bold font-space text-white mb-2">Diet Preference</h2>
            <p className="text-white/50 mb-8">We'll tailor your nutrition plan to this.</p>
            <div className="grid gap-3 mb-8">
              {['Veg', 'Non-Veg', 'Vegan', 'No Preference'].map(diet => (
                <button
                  key={diet}
                  onClick={() => setFormData(p => ({ ...p, dietPreference: diet }))}
                  className={`w-full text-left px-6 py-4 rounded-2xl border transition-all ${formData.dietPreference === diet ? 'bg-[#39FF14]/10 border-[#39FF14] text-[#39FF14]' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
                >
                  <span className="font-semibold">{diet}</span>
                </button>
              ))}
            </div>
            <button onClick={handleComplete} disabled={!formData.dietPreference || isLoading} className="w-full bg-[#39FF14] text-black font-bold py-4 rounded-2xl disabled:opacity-50 flex items-center justify-center gap-2 hover:bg-[#39FF14]/90 hover:shadow-[0_0_20px_rgba(57,255,20,0.3)] transition-all">
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Setup'}
            </button>
          </motion.div>
        )
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#39FF14] to-emerald-900 rounded-full blur-[120px] animate-pulse-slow"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 sm:p-10 rounded-[32px] bg-white/[0.03] backdrop-blur-[40px] border border-white/10 shadow-2xl relative z-10"
      >
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={prevStep}
            disabled={step === 1 || isLoading}
            className="text-white/40 hover:text-white disabled:opacity-0 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5, 6, 7].map(s => (
              <div key={s} className={`h-1.5 rounded-full transition-all duration-300 ${step >= s ? 'w-4 bg-[#39FF14]' : 'w-1.5 bg-white/20'}`} />
            ))}
          </div>
          <div className="w-5" /> {/* Spacer */}
        </div>

        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {stepContent()}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
