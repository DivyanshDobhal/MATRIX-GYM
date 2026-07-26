import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface PasswordStrengthMeterProps {
  password?: string;
}

export function PasswordStrengthMeter({ password = '' }: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0)

  const checks = [
    { label: 'Uppercase', regex: /[A-Z]/ },
    { label: 'Lowercase', regex: /[a-z]/ },
    { label: 'Number', regex: /[0-9]/ },
    { label: 'Special Character', regex: /[^A-Za-z0-9]/ },
    { label: '8+ Characters', regex: /.{8,}/ },
  ]

  const meetsCriteria = checks.map((c) => c.regex.test(password))
  const passedCount = meetsCriteria.filter(Boolean).length

  useEffect(() => {
    setStrength(passedCount)
  }, [passedCount])

  const getStrengthLabel = () => {
    if (strength === 0) return 'Weak'
    if (strength < 3) return 'Weak'
    if (strength < 5) return 'Medium'
    return 'Strong'
  }

  const getStrengthColor = () => {
    if (strength === 0) return 'bg-gray-700'
    if (strength < 3) return 'bg-red-500'
    if (strength < 5) return 'bg-yellow-500'
    return 'bg-[#39FF14]'
  }

  return (
    <div className="w-full mt-4 bg-background/50 p-4 rounded-xl border border-white/10 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Password Strength
        </span>
        <span className={`text-xs font-bold uppercase tracking-widest ${
          strength === 5 ? 'text-[#39FF14]' : strength >= 3 ? 'text-yellow-500' : 'text-red-500'
        }`}>
          {getStrengthLabel()}
        </span>
      </div>
      
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((level) => (
          <motion.div
            key={level}
            initial={{ opacity: 0.3 }}
            animate={{ 
              opacity: strength >= level ? 1 : 0.2,
              backgroundColor: strength >= level ? (strength === 5 ? '#39FF14' : strength >= 3 ? '#eab308' : '#ef4444') : '#374151'
            }}
            transition={{ duration: 0.3 }}
            className="h-1.5 flex-1 rounded-full"
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        {checks.map((check, idx) => (
          <div key={check.label} className="flex items-center gap-1.5 text-muted-foreground">
            {meetsCriteria[idx] ? (
              <Check className="w-3.5 h-3.5 text-[#39FF14]" />
            ) : (
              <X className="w-3.5 h-3.5 text-white/30" />
            )}
            <span className={meetsCriteria[idx] ? 'text-white' : 'text-white/50'}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
