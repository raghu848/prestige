'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useSpring, useMotionValue } from 'framer-motion'
import { Award, Users, TrendingUp, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const stats = [
  { label: 'Years of Dedicated Excellence', value: '20+', icon: Award },
  { label: 'Premium Projects Delivered', value: '1,000+', icon: TrendingUp },
  { label: 'Happy Families & Clients', value: '10k+', icon: Users },
]

const values = [
  {
    title: 'Excellence',
    chapter: 'Chapter III',
    description: 'We strive for perfection in every detail. Every line we draw, every structure we build, is guided by an uncompromising commitment to quality and architectural grace.',
  },
  {
    title: 'Integrity',
    chapter: 'Chapter IV',
    description: 'Honest, transparent, and ethical dealings define our business. We believe in building trust that stands the test of time, ensuring our word remains our ultimate bond.',
  },
  {
    title: 'Innovation',
    chapter: 'Chapter V',
    description: 'Embracing forward-thinking technologies, modern designs, and sustainable practices. We build not just for the present, but to inspire generations to come.',
  },
]

export default function AboutPageClient() {
  const containerRef = useRef<HTMLDivElement>(null)
  const starsContainerRef = useRef<HTMLDivElement>(null)
  
  // Custom cursor movement tracking
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  const cursorX = useSpring(mouseX, { stiffness: 400, damping: 40 })
  const cursorY = useSpring(mouseY, { stiffness: 400, damping: 40 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 6)
      mouseY.set(e.clientY - 6)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  // Scroll tracking for the SVG path
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Smooth out the scroll path drawing
  const pathLength = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 })

  // Parallax Star Layers generation
  useEffect(() => {
    if (!starsContainerRef.current) return

    const generateStars = (n: number, size: number, duration: number) => {
      const shadows = []
      for (let i = 0; i < n; i++) {
        const x = Math.floor(Math.random() * 2000)
        const y = Math.floor(Math.random() * 2000)
        shadows.push(`${x}px ${y}px #FFFFFF`)
      }

      const style = document.createElement('style')
      const className = `stars-dynamic-${size}`

      style.innerHTML = `
        .${className} {
          width: ${size}px;
          height: ${size}px;
          box-shadow: ${shadows.join(',')};
          animation: animStar ${duration}s linear infinite;
        }
        .${className}::after {
          content: '';
          position: absolute;
          top: 2000px;
          width: ${size}px;
          height: ${size}px;
          box-shadow: ${shadows.join(',')};
        }
      `
      document.head.appendChild(style)

      const div = document.createElement('div')
      div.className = `stars-layer ${className}`
      starsContainerRef.current?.appendChild(div)
    }

    generateStars(350, 1, 60)   // Small stars, 60s
    generateStars(100, 2, 120)  // Medium stars, 120s
    generateStars(50, 3, 180)   // Large stars, 180s
  }, [])

  // Reveal motion variants for sections
  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }
    }
  }

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-[3200px] w-full bg-[#020617] text-white overflow-x-hidden select-none font-outfit"
    >
      {/* Dangerously inject the star animations styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes animStar {
          from { transform: translateY(0px); }
          to { transform: translateY(-2000px); }
        }
        .stars-layer {
          position: absolute;
          left: 0;
          top: 0;
          background: transparent;
        }
        .text-gradient-clip {
          background: linear-gradient(to bottom, #ffffff 0%, #a1a1aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}} />

      {/* Floating Parallax Stars Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Radial space gradient backdrop using brand colors */}
        <div 
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at center, #0a122c 0%, #020617 100%)' }}
        />
        <div ref={starsContainerRef} className="absolute inset-0"></div>
      </div>

      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-white border border-black rounded-full pointer-events-none z-[999] mix-blend-difference hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-center px-4 z-10">
        <div className="max-w-4xl z-10">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="inline-block mb-6 text-[11px] uppercase tracking-[0.45em] font-bold text-white"
          >
            The Narrative Journey
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-6xl md:text-[110px] font-light leading-[0.95] mb-12 font-cormorant-garamond tracking-tight"
          >
            <span className="text-gradient-clip">Trace the</span> <br className="hidden md:block" />
            <span className="italic font-normal text-gradient-clip">Essence of Space.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            className="text-lg md:text-xl font-light max-w-xl mx-auto leading-relaxed text-zinc-400"
          >
            An interactive exploration of form and movement, defined only by the progress of your scroll.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-white">Scroll to Begin</span>
            <div className="w-[1px] h-12 bg-white/30 relative overflow-hidden">
              <motion.div 
                animate={{ y: [0, 48, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute top-0 left-0 w-full h-4 bg-white"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SVG Path drawing layer - Desktop */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none select-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 3200" fill="none" preserveAspectRatio="none">
          {/* Base shadow path for guide */}
          <path 
            d="M720 600 V800 C720 1012 360 1012 360 1225 C360 1450 1080 1450 1080 1675 C1080 1900 360 1900 360 2125 C360 2350 1080 2350 1080 2575 C1080 2787 720 2787 720 3000 V3200" 
            stroke="rgba(255, 255, 255, 0.07)" 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
          {/* Animated active path */}
          <motion.path 
            d="M720 600 V800 C720 1012 360 1012 360 1225 C360 1450 1080 1450 1080 1675 C1080 1900 360 1900 360 2125 C360 2350 1080 2350 1080 2575 C1080 2787 720 2787 720 3000 V3200" 
            stroke="#ffffff" 
            strokeWidth="1.5" 
            strokeLinecap="round"
            style={{ pathLength }}
          />

          {/* Dot Markers */}
          <motion.circle cx="720" cy="800" r="5" fill="#ffffff" 
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} 
            viewport={{ once: false, margin: '-20% 0px -20% 0px' }} 
            transition={{ type: 'spring', stiffness: 300, damping: 15 }} 
          />
          <motion.circle cx="360" cy="1225" r="5" fill="#ffffff" 
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} 
            viewport={{ once: false, margin: '-20% 0px -20% 0px' }} 
            transition={{ type: 'spring', stiffness: 300, damping: 15 }} 
          />
          <motion.circle cx="1080" cy="1675" r="5" fill="#ffffff" 
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} 
            viewport={{ once: false, margin: '-20% 0px -20% 0px' }} 
            transition={{ type: 'spring', stiffness: 300, damping: 15 }} 
          />
          <motion.circle cx="360" cy="2125" r="5" fill="#ffffff" 
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} 
            viewport={{ once: false, margin: '-20% 0px -20% 0px' }} 
            transition={{ type: 'spring', stiffness: 300, damping: 15 }} 
          />
          <motion.circle cx="1080" cy="2575" r="5" fill="#ffffff" 
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} 
            viewport={{ once: false, margin: '-20% 0px -20% 0px' }} 
            transition={{ type: 'spring', stiffness: 300, damping: 15 }} 
          />
        </svg>
      </div>

      {/* SVG Path drawing layer - Mobile */}
      <div className="block md:hidden absolute top-0 left-0 w-full h-full pointer-events-none select-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1440 3200" fill="none" preserveAspectRatio="none">
          <path 
            d="M720 600 V3200" 
            stroke="rgba(255, 255, 255, 0.07)" 
            strokeWidth="2" 
            strokeLinecap="round"
          />
          <motion.path 
            d="M720 600 V3200" 
            stroke="#ffffff" 
            strokeWidth="2" 
            strokeLinecap="round"
            style={{ pathLength }}
          />

          {/* Dot Markers */}
          <motion.circle cx="720" cy="800" r="6" fill="#ffffff" 
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} 
            viewport={{ once: false, margin: '-25% 0px -25% 0px' }} 
            transition={{ type: 'spring', stiffness: 300, damping: 15 }} 
          />
          <motion.circle cx="720" cy="1225" r="6" fill="#ffffff" 
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} 
            viewport={{ once: false, margin: '-25% 0px -25% 0px' }} 
            transition={{ type: 'spring', stiffness: 300, damping: 15 }} 
          />
          <motion.circle cx="720" cy="1675" r="6" fill="#ffffff" 
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} 
            viewport={{ once: false, margin: '-25% 0px -25% 0px' }} 
            transition={{ type: 'spring', stiffness: 300, damping: 15 }} 
          />
          <motion.circle cx="720" cy="2125" r="6" fill="#ffffff" 
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} 
            viewport={{ once: false, margin: '-25% 0px -25% 0px' }} 
            transition={{ type: 'spring', stiffness: 300, damping: 15 }} 
          />
          <motion.circle cx="720" cy="2575" r="6" fill="#ffffff" 
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} 
            viewport={{ once: false, margin: '-25% 0px -25% 0px' }} 
            transition={{ type: 'spring', stiffness: 300, damping: 15 }} 
          />
        </svg>
      </div>

      {/* Content Sections */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pointer-events-none">
        
        {/* Chapter I: The Genesis */}
        <section className="h-[400px] flex items-center justify-center md:justify-start">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
            variants={revealVariants}
            className="max-w-md pointer-events-auto p-6 rounded-2xl md:p-0"
          >
            <span className="text-[10px] tracking-[0.3em] font-bold text-amber-500/60 block mb-3 uppercase">Chapter I</span>
            <h2 className="text-4xl md:text-5xl font-light font-cormorant-garamond mb-6 tracking-tight text-white">The Genesis</h2>
            <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              Founded with a vision to redefine luxury living, Prestige Realty has spent over two decades crafting spaces that transcend standard architecture. Every design begins with a single point in space, carrying the weight of all possibilities yet to be realized.
            </p>
          </motion.div>
        </section>

        {/* Chapter II: Rhythmic Growth */}
        <section className="h-[450px] flex items-center justify-center md:justify-end">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
            variants={revealVariants}
            className="max-w-md text-center md:text-right pointer-events-auto p-6 rounded-2xl md:p-0"
          >
            <span className="text-[10px] tracking-[0.3em] font-bold text-amber-500/60 block mb-3 uppercase">Chapter II</span>
            <h2 className="text-4xl md:text-5xl font-light font-cormorant-garamond mb-8 tracking-tight text-white">Rhythmic Growth</h2>
            
            <div className="flex flex-col gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="border-b border-white/10 pb-4 last:border-0">
                  <h3 className="text-3xl md:text-4xl font-normal font-cormorant-garamond text-white">{stat.value}</h3>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Chapter III: Excellence */}
        <section className="h-[450px] flex items-center justify-center md:justify-start">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
            variants={revealVariants}
            className="max-w-md pointer-events-auto p-6 rounded-2xl md:p-0"
          >
            <span className="text-[10px] tracking-[0.3em] font-bold text-amber-500/60 block mb-3 uppercase">{values[0].chapter}</span>
            <h2 className="text-4xl md:text-5xl font-light font-cormorant-garamond mb-6 tracking-tight text-white">{values[0].title}</h2>
            <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              {values[0].description}
            </p>
          </motion.div>
        </section>

        {/* Chapter IV: Integrity */}
        <section className="h-[450px] flex items-center justify-center md:justify-end">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
            variants={revealVariants}
            className="max-w-md text-center md:text-right pointer-events-auto p-6 rounded-2xl md:p-0"
          >
            <span className="text-[10px] tracking-[0.3em] font-bold text-amber-500/60 block mb-3 uppercase">{values[1].chapter}</span>
            <h2 className="text-4xl md:text-5xl font-light font-cormorant-garamond mb-6 tracking-tight text-white">{values[1].title}</h2>
            <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              {values[1].description}
            </p>
          </motion.div>
        </section>

        {/* Chapter V: Innovation */}
        <section className="h-[450px] flex items-center justify-center md:justify-start">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
            variants={revealVariants}
            className="max-w-md pointer-events-auto p-6 rounded-2xl md:p-0"
          >
            <span className="text-[10px] tracking-[0.3em] font-bold text-amber-500/60 block mb-3 uppercase">{values[2].chapter}</span>
            <h2 className="text-4xl md:text-5xl font-light font-cormorant-garamond mb-6 tracking-tight text-white">{values[2].title}</h2>
            <p className="text-zinc-400 font-light leading-relaxed text-sm md:text-base">
              {values[2].description}
            </p>
          </motion.div>
        </section>

        {/* Concluding CTA */}
        <section className="h-[400px] flex flex-col items-center justify-center text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-10% 0px -10% 0px' }}
            variants={revealVariants}
            className="max-w-2xl pointer-events-auto"
          >
            <h2 className="text-5xl md:text-7xl font-light font-cormorant-garamond mb-8 tracking-tight text-white">The Journey Continues.</h2>
            <p className="text-zinc-500 font-light mb-12 uppercase tracking-[0.25em] text-xs">
              Let us shape your landscape.
            </p>
            <div className="inline-block group relative">
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 px-10 py-5 border border-white/20 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black hover:border-white transition-all duration-500 no-underline text-white"
              >
                <span>Partner With Us</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </section>

      </main>
    </div>
  )
}
