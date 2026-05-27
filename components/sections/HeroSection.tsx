'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Home, Building, Key, Play, ArrowRight, MapPin, X } from 'lucide-react'
import InteractiveBackground from '@/components/ui/InteractiveBackground'

export default function HeroSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const categories = [
    { id: 'residential', label: 'Residential', href: '/projects?category=residential' },
    { id: 'commercial', label: 'Commercial', href: '/projects?category=commercial' },
    { id: 'leasing', label: 'Leasing', href: '/projects?category=leasing' },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Canvas Particle & Glow Animation */}
      <InteractiveBackground />

      {/* BACKGROUND LAYER: Dynamic Zoom & Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-[url('/real.webp')] bg-cover bg-center"
        />
        {/* Modern Multi-Layer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-900/20 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-60" />
      </div>

      {/* CONTENT GRID */}
      <div className="relative z-10 container mx-auto px-6 pt-32 lg:pt-20 pb-12 flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT: MINIMALIST BRANDING & TYPOGRAPHY (ABBEY STYLE) */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <h1 className="text-white text-6xl md:text-8xl lg:text-9xl font-light font-[family-name:var(--font-playfair)] tracking-tight leading-none">
              Prestige
            </h1>
            <p className="text-slate-350 text-lg md:text-xl lg:text-2xl font-light tracking-[0.2em] font-[family-name:var(--font-outfit)] uppercase max-w-xl mx-auto lg:mx-0">
              Curated Residences For Refined Living
            </p>
            
            <div className="pt-6">
              <Link 
                href="/projects" 
                className="group inline-flex items-center gap-3 text-white hover:text-amber-300 font-bold tracking-[0.2em] uppercase text-xs border-b border-white/20 hover:border-amber-300/50 pb-2 transition-all duration-300 no-underline"
              >
                Explore Collection
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300 text-amber-300" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: THE VERTICAL CATEGORY NAV MENU (ABBEY STYLE) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full lg:w-[480px] relative z-10"
        >
          <nav className="w-full">
            <ul className="flex flex-col space-y-6 md:space-y-8">
              {categories.map((cat, index) => {
                const isHovered = hoveredIndex === index
                const isDimmed = hoveredIndex !== null && hoveredIndex !== index
                
                return (
                  <li
                    key={cat.id}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative group border-b border-white/10 pb-6 md:pb-8 last:border-0 transition-all duration-500"
                  >
                    <Link
                      href={cat.href}
                      className="flex items-center justify-between no-underline w-full py-2"
                    >
                      <span
                        className={`text-4xl md:text-5xl lg:text-6xl font-light font-[family-name:var(--font-playfair)] tracking-tight transition-all duration-500 ${
                          isHovered 
                            ? 'text-amber-300 pl-4' 
                            : isDimmed 
                              ? 'text-white/20' 
                              : 'text-white'
                        }`}
                      >
                        {cat.label}
                      </span>
                      
                      <div 
                        className={`transition-all duration-500 transform ${
                          isHovered 
                            ? 'opacity-100 translate-x-0 scale-100' 
                            : 'opacity-0 -translate-x-4 scale-75'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 9 16" fill="none" className="text-amber-300 stroke-current">
                          <path d="M1 1L8 8L1 15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </Link>

                    {/* Animated bottom border glow */}
                    <div 
                      className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-400 to-amber-300 transition-all duration-500 ${
                        isHovered ? 'w-full' : 'w-0'
                      }`}
                    />
                  </li>
                )
              })}
            </ul>
          </nav>
        </motion.div>
      </div>

      {/* FLOATING DECOR */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Scroll Down Animation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer opacity-50 hover:opacity-90 transition-opacity">
        <span className="text-[9px] uppercase tracking-[0.3em] text-slate-400 font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-9 rounded-full border border-slate-400 flex justify-center p-1"
        >
          <div className="w-1 h-2 bg-amber-400 rounded-full" />
        </motion.div>
      </div>


      {/* VIDEO MODAL */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
              onClick={() => setIsVideoOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-colors"
                aria-label="Close video"
              >
                <X size={24} />
              </button>

              <iframe
                src="https://www.youtube.com/embed/9No-FiE9ywg?autoplay=1"
                title="Cinematic Property Tour"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}