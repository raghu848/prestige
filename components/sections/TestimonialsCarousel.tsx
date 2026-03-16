'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

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

  if (testimonials.length === 0) return null

  return (
    <section className="section-padding bg-prestige-navy text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300">
            Trusted by thousands of satisfied customers
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12"
            >
              <Quote className="text-prestige-gold mb-4" size={40} />
              <p className="text-xl md:text-2xl mb-6 text-gray-100">
                "{testimonials[currentIndex]?.testimonial_text}"
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {testimonials[currentIndex]?.client_photo_url && (
                    <Image
                      src={testimonials[currentIndex].client_photo_url}
                      alt={testimonials[currentIndex].client_name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-lg">{testimonials[currentIndex]?.client_name}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(testimonials[currentIndex]?.rating || 5)].map((_, i) => (
                        <Star key={i} size={16} className="fill-prestige-gold text-prestige-gold" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-prestige-gold w-8' : 'bg-white/30'
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}





