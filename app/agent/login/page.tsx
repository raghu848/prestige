'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Mail, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { login } from './actions'

const loginSchema = z.object({
  email: z.string().email('Enter a valid institutional email'),
  password: z.string().min(6, 'Authentication requires at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setSubmitting(true)
    setError(null)
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)

    try {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
        toast.error(result.error)
        setSubmitting(false)
      }
    } catch (e) {
      toast.error('Connection failed')
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-[#f8f9fb] flex items-center justify-center p-6 z-[999]">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-prestige-gold via-prestige-navy to-prestige-gold opacity-50" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[440px]"
      >
        <div className="bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 p-10 md:p-12 relative overflow-hidden">
          {/* Subtle Logo/Identity */}
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="w-16 h-16 bg-prestige-navy rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-prestige-navy/20">
              <ShieldCheck className="text-prestige-gold" size={32} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-prestige-navy tracking-tight">
              Prestige Gateway
            </h1>
            <p className="text-gray-400 text-sm font-medium mt-2 uppercase tracking-[0.2em]">Authorized Personnel Only</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="group">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1 transition-colors group-focus-within:text-prestige-gold">
                <Mail size={12} /> Email Identifier
              </label>
              <div className="relative group/input">
                <input
                  {...register('email')}
                  type="email"
                  placeholder="name@prestige.com"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-prestige-gold/5 focus:border-prestige-gold outline-none transition-all duration-300 font-[family-name:var(--font-outfit)] text-prestige-navy placeholder-gray-300"
                />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-500 text-[10px] font-bold uppercase mt-2 ml-1 tracking-wider"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="group">
              <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1 transition-colors group-focus-within:text-prestige-gold">
                <Lock size={12} /> Security Key
              </label>
              <div className="relative group/input">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-prestige-gold/5 focus:border-prestige-gold outline-none transition-all duration-300 font-[family-name:var(--font-outfit)] text-prestige-navy placeholder-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-prestige-gold transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <AnimatePresence>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-500 text-[10px] font-bold uppercase mt-2 ml-1 tracking-wider"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-5 bg-prestige-navy text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#0a1529] hover:shadow-2xl hover:shadow-prestige-navy/20 active:scale-[0.98] transition-all duration-300 disabled:opacity-50 group"
              >
                {submitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Validating Credentials...
                  </>
                ) : (
                  <>
                    Login to Dashboard
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <Lock size={18} className="text-prestige-gold" />
                    </motion.div>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Minimalist Footer */}
          <div className="mt-10 pt-8 border-t border-gray-50 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] opacity-50">
              &copy; 2024 Prestige Realty Private Limited
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}





