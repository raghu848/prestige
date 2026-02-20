'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Home, Building, Key, Play } from 'lucide-react'

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('residential')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex flex-col justify-center lg:justify-end overflow-hidden bg-[#060b14] pt-32 pb-16 lg:pb-0">
      {/* Background with Zoom Animation */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transform scale-105 animate-[slowZoom_14s_ease-out_forwards]"
        style={{ backgroundImage: 'url("/hero.jpg")' }}
      />

      {/* Overlays */}
      <div className="hero-overlay-gradient absolute inset-0 z-[1]" />
      <div className="hero-stripe absolute z-[2] top-0 right-[18%] w-[0.5px] lg:w-[1px] h-full hidden sm:block" />
      <div className="hero-stripe-2 absolute z-[2] top-0 right-[calc(18%+12px)] w-[0.5px] lg:w-[1px] h-full hidden sm:block" />

      {/* Main Content Grid */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pb-8 md:pb-12 lg:pb-[72px] grid grid-cols-1 lg:grid-cols-[1fr_420px] items-center lg:items-end gap-12 lg:gap-0">

        {/* Left Column */}
        <div className="lg:mb-0">
          {/* Label Pill */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="inline-flex items-center gap-[10px] mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3C3] label-dot" />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.3em] uppercase text-[#4FC3C3] font-[family-name:var(--font-outfit)]">
              New Delhi's #1 Real Estate
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-bebas)] text-[clamp(3.5rem,8vw,8rem)] leading-[0.85] sm:leading-[0.9] text-white tracking-[0.02em] mb-4"
          >
            Find Your<br />
            <span className="text-[#E8C97A]">Dream</span><br />
            <span className="hero-title-outline">Property</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="font-[family-name:var(--font-dm-serif)] italic text-[clamp(1.1rem,3vw,1.9rem)] text-[rgba(255,255,255,0.55)] mb-10 tracking-[0.01em] max-w-xl"
          >
            Where vision meets <em>extraordinary</em> spaces
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mb-12"
          >
            <Link
              href="/projects"
              className="btn-hero-primary px-8 lg:px-9 py-4 sm:py-[15px] bg-[#E8C97A] text-[#0a0c10] font-[family-name:var(--font-outfit)] font-semibold text-[12px] sm:text-[13px] tracking-[0.18em] uppercase transition-all duration-280 no-underline inline-block text-center"
            >
              Explore Projects
            </Link>
            <Link
              href="/about"
              className="px-6 lg:px-7 py-4 sm:py-[14px] bg-transparent text-[rgba(255,255,255,0.75)] font-[family-name:var(--font-outfit)] font-normal text-[12px] sm:text-[13px] tracking-[0.15em] uppercase border border-[rgba(255,255,255,0.2)] inline-flex items-center justify-center gap-2 transition-all duration-250 hover:border-[rgba(255,255,255,0.6)] hover:text-white hover:bg-[rgba(255,255,255,0.06)] no-underline"
            >
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[rgba(255,255,255,0.15)] flex items-center justify-center shrink-0">
                <Play size={10} fill="white" className="ml-0.5" />
              </span>
              Watch Story
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="flex flex-wrap items-center gap-y-6"
          >
            {[
              { num: '500', suffix: '+', label: 'Properties Sold' },
              { num: '25', suffix: '+', label: 'Years Experience' },
              { num: '12', suffix: '', label: 'Cities' },
              { num: '98', suffix: '%', label: 'Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className={`pr-6 mr-6 border-r border-[rgba(255,255,255,0.12)] last:border-0 last:mr-0 last:pr-0`}>
                <div className="font-[family-name:var(--font-bebas)] text-[2rem] sm:text-[2.4rem] leading-none text-white tracking-[0.03em]">
                  {stat.num}<span className="text-[#E8C97A] text-[1.4rem] sm:text-[1.6rem]">{stat.suffix}</span>
                </div>
                <div className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-[rgba(255,255,255,0.38)] mt-1 font-[family-name:var(--font-outfit)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Column - Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="search-card-blur p-6 sm:p-8 pt-8 pb-7 relative overflow-hidden"
        >
          {/* Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4FC3C3] via-[#E8C97A] to-[#4FC3C3]" />

          <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[rgba(255,255,255,0.4)] mb-5 flex items-center gap-3 font-[family-name:var(--font-outfit)]">
            Find Property
            <div className="flex-1 h-[0.5px] bg-[rgba(255,255,255,0.08)]" />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-0 mb-5 border border-[rgba(255,255,255,0.1)]">
            {[
              { id: 'residential', icon: Home, label: 'Residential' },
              { id: 'commercial', icon: Building, label: 'Commercial' },
              { id: 'leasing', icon: Key, label: 'Leasing' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 p-2 sm:p-[10px_8px] flex flex-col items-center gap-1.5 text-[9px] sm:text-[10px] font-medium tracking-[0.15em] uppercase transition-all duration-220 font-[family-name:var(--font-outfit)] ${activeTab === tab.id
                  ? 'text-[#0a0c10] bg-[#E8C97A] font-semibold search-tab-active'
                  : 'text-[rgba(255,255,255,0.38)] hover:text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.04)] bg-transparent'
                  }`}
              >
                <tab.icon size={14} className={`sm:w-4 sm:h-4 transition-opacity duration-220 ${activeTab === tab.id ? 'opacity-100' : 'opacity-40'}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-2.5 mb-5">
            <div className="relative group">
              <input
                type="text"
                placeholder="Location or project name..."
                className="w-full py-3.5 pl-11 pr-4 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.88)] font-[family-name:var(--font-outfit)] text-sm tracking-[0.03em] outline-none transition-all duration-220 placeholder-[rgba(255,255,255,0.25)] search-input"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.28)] group-focus-within:text-[#E8C97A] transition-colors duration-200" size={16} />
            </div>

            <div className="relative group">
              <input
                type="text"
                placeholder="Property type (Apartment, Villa...)"
                className="w-full py-3.5 pl-11 pr-4 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.88)] font-[family-name:var(--font-outfit)] text-sm tracking-[0.03em] outline-none transition-all duration-220 placeholder-[rgba(255,255,255,0.25)] search-input"
              />
              <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.28)] group-focus-within:text-[#E8C97A] transition-colors duration-200" size={16} />
            </div>

            <div className="flex gap-2.5">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Min (₹ Cr)"
                  className="w-full py-3.5 px-4 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.88)] font-[family-name:var(--font-outfit)] text-sm tracking-[0.03em] outline-none transition-all duration-220 placeholder-[rgba(255,255,255,0.25)] search-input"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Max (₹ Cr)"
                  className="w-full py-3.5 px-4 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-[rgba(255,255,255,0.88)] font-[family-name:var(--font-outfit)] text-sm tracking-[0.03em] outline-none transition-all duration-220 placeholder-[rgba(255,255,255,0.25)] search-input"
                />
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-gradient-to-br from-[#4FC3C3] to-[#2ea8a8] text-[#060b14] font-[family-name:var(--font-outfit)] font-semibold text-[13px] tracking-[0.2em] uppercase border-none cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-280 shadow-[0_8px_28px_rgba(79,195,195,0.3)] hover:bg-gradient-to-br hover:from-[#5dd4d4] hover:to-[#3bbcbc] hover:shadow-[0_12px_40px_rgba(79,195,195,0.5)] hover:-translate-y-px">
            <Search size={16} className="stroke-[2.5]" />
            Search Properties
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-[32px] left-[28px] md:left-[64px] flex items-center gap-[14px] z-10"
      >
        <span className="font-[family-name:var(--font-bebas)] text-[0.9rem] text-[rgba(255,255,255,0.2)] tracking-[0.1em]">01</span>
        <div className="w-[40px] h-[1px] bg-[rgba(255,255,255,0.2)] relative overflow-hidden">
          <div className="absolute top-0 bottom-0 w-full bg-[#E8C97A] animate-[scanLine_2s_1.5s_ease_infinite]" />
        </div>
        <span className="text-[10px] font-medium tracking-[0.35em] uppercase text-[rgba(255,255,255,0.3)] font-[family-name:var(--font-outfit)]">
          Scroll to explore
        </span>
      </motion.div>
    </section>
  )
}
