'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react'
import SafeImage from '@/components/ui/SafeImage'

interface Testimonial {
  id: string
  client_name: string
  client_photo_url?: string
  rating: number
  testimonial_text: string
  project_id?: string
}

const FALLBACK_TESTIMONIALS = [
  {
    id: '1',
    client_name: 'Sarah Mitchell',
    client_photo_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop',
    rating: 5,
    testimonial_text: 'The experience with Prestige was beyond expectations. They found us our dream penthouse in record time. Professionalism at its finest.',
  },
  {
    id: '2',
    client_name: 'David Chen',
    client_photo_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop',
    rating: 5,
    testimonial_text: 'Searching for a luxury villa in Palm Jumeirah seemed daunting until I met the Prestige team. Their local knowledge is unmatched.',
  },
  {
    id: '3',
    client_name: 'Aisha Rahman',
    client_photo_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop',
    rating: 5,
    testimonial_text: 'Investing in real estate has never been smoother. The ROI on the property they recommended has already exceeded my targets.',
  }
];

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (testimonials.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  if (testimonials.length === 0) return null

  const active = testimonials[currentIndex]

  return (
    <section className="py-24 bg-gradient-to-b from-[#020617] to-slate-950 overflow-hidden relative z-10">
      {/* Decorative backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none z-0" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
            What Our Clients Say
          </h2>
          <p className="text-xl text-slate-400">
            Real experiences from real clients
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Main Card Container */}
          <div className="relative bg-slate-900/30 backdrop-blur-md border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl hover:border-amber-500/20 transition-all duration-500">
            <Quote className="absolute top-6 right-8 text-amber-500/5" size={60} />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Testimonial Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-6 text-amber-400">
                    {[...Array(active.rating)].map((_, i) => (
                      <Star key={i} size={18} fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-xl md:text-2xl text-slate-100 font-display italic leading-relaxed mb-8">
                    "{active.testimonial_text}"
                  </p>

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      {active.client_photo_url && (
                        <SafeImage
                          src={active.client_photo_url}
                          alt={active.client_name}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <h4 className="font-bold text-white text-lg">{active.client_name}</h4>
                      </div>
                    </div>

                    {/* Navigation controls */}
                    <div className="flex items-center gap-8">
                      {/* Dots */}
                      <div className="flex gap-2">
                        {testimonials.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index
                              ? 'bg-gradient-to-r from-amber-400 to-amber-500 w-8'
                              : 'bg-white/10 hover:bg-white/20'
                              }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={prevSlide}
                          className="p-3 rounded-full border border-white/10 text-white bg-white/5 hover:border-amber-500/30 hover:text-amber-300 transition-all"
                          aria-label="Previous testimonial"
                        >
                          <ArrowLeft size={16} />
                        </button>
                        <button
                          onClick={nextSlide}
                          className="p-3 rounded-full border border-white/10 text-white bg-white/5 hover:border-amber-500/30 hover:text-amber-300 transition-all"
                          aria-label="Next testimonial"
                        >
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}






