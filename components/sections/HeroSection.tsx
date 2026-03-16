'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Home, Building, Key, Play, ArrowRight, MapPin, X } from 'lucide-react'

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('residential')
  const [mounted, setMounted] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#020617]">
      {/* BACKGROUND LAYER: Dynamic Zoom & Parallax */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-[url('/hero.jpg')] bg-cover bg-center"
        />
        {/* Modern Multi-Layer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/40 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-70" />
      </div>

      {/* CONTENT GRID */}
      <div className="relative z-10 container mx-auto px-6 pt-32 lg:pt-20 pb-12 flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT: EMOTIONAL HOOK & TYPOGRAPHY */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-amber-200/80">
              Tricity's Premium Property Curator
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.05] mb-6 tracking-tight"
          >
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">Excellence</span> <br />
            In Every Square Foot.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light mx-auto lg:mx-0"
          >
            Beyond real estate, we curate lifestyles. Discover a portfolio of <em>hand-picked</em> residences that redefine modern luxury.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-5"
          >
            <Link href="/projects" className="group flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all hover:bg-amber-400 hover:scale-105 no-underline">
              Explore Portfolio
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-bold text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              <Play size={16} fill="currentColor" />
              Watch Film
            </button>
          </motion.div>
        </div>

        {/* RIGHT: THE MODERN SEARCH GLASS-CARD */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full max-w-[480px] relative group"
        >
          {/* Glowing Aura behind card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-blue-500/20 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity" />

          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] p-8 shadow-2xl overflow-hidden">

            {/* Tab Selector */}
            <div className="flex bg-black/20 p-1 rounded-2xl mb-8">
              {['residential', 'commercial', 'leasing'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-white text-slate-900 shadow-lg' : 'text-white/40 hover:text-white'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="group/input relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400" size={20} />
                <input
                  type="text"
                  placeholder="Where would you like to live?"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="block text-[10px] uppercase text-slate-500 font-bold mb-1">Type</span>
                  <select className="bg-transparent text-white text-sm w-full focus:outline-none cursor-pointer">
                    <option className="bg-slate-900">Apartment</option>
                    <option className="bg-slate-900">Penthouse</option>
                    <option className="bg-slate-900">Villa</option>
                  </select>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="block text-[10px] uppercase text-slate-500 font-bold mb-1">Budget</span>
                  <select className="bg-transparent text-white text-sm w-full focus:outline-none cursor-pointer">
                    <option className="bg-slate-900">₹2Cr - ₹5Cr</option>
                    <option className="bg-slate-900">₹5Cr - ₹10Cr</option>
                    <option className="bg-slate-900">₹10Cr+</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-amber-400 to-amber-600 py-5 rounded-2xl text-slate-950 font-black uppercase tracking-[0.2em] text-xs shadow-[0_20px_40px_-10px_rgba(251,191,36,0.3)] hover:shadow-amber-500/40 hover:-translate-y-1 transition-all">
                Search Properties
              </button>
            </div>

            {/* Bottom Proof */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <div>
                <p className="text-white text-xl font-bold">2.5k+</p>
                <p className="text-[10px] uppercase text-slate-500">Global Clients</p>
              </div>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FLOATING DECOR */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

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