'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Phone, Mail, MapPin, Send, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'

const GoogleMap = dynamic(() => import('@/components/ui/GoogleMap'), { ssr: false })

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  inquiry_type: z.enum(['general', 'consultation', 'agent']),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [formType, setFormType] = useState<'general' | 'consultation' | 'agent'>('general')
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiry_type: 'general',
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true)
    try {
      // In a real app, this would submit to your API
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Thank you for your inquiry! We will contact you soon.')
      reset()
    } catch (error) {
      toast.error('Failed to submit. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-r from-prestige-navy to-prestige-dark">
        <div className="container-custom text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl"
          >
            Get in touch with our team
          </motion.p>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Forms */}
          <div>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setFormType('general')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${formType === 'general'
                    ? 'bg-prestige-gold text-prestige-navy'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                General Inquiry
              </button>
              <button
                onClick={() => setFormType('consultation')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${formType === 'consultation'
                    ? 'bg-prestige-gold text-prestige-navy'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Project Consultation
              </button>
              <button
                onClick={() => setFormType('agent')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${formType === 'agent'
                    ? 'bg-prestige-gold text-prestige-navy'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                Agent Signup
              </button>
            </div>

            <motion.div
              key={formType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-prestige-navy mb-6">
                {formType === 'general' && 'General Inquiry'}
                {formType === 'consultation' && 'Project Consultation'}
                {formType === 'agent' && 'Agent Signup'}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" {...register('inquiry_type')} value={formType} />

                <div>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prestige-gold"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prestige-gold"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prestige-gold"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {formType === 'consultation' && (
                  <div>
                    <input
                      type="number"
                      placeholder="Budget Range"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prestige-gold"
                    />
                  </div>
                )}

                <div>
                  <textarea
                    {...register('message')}
                    placeholder="Your Message"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prestige-gold"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full button-89 flex items-center justify-center"
                >
                  {submitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Submit
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-prestige-navy mb-6">Office Details</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-prestige-gold mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-prestige-navy">Head Office</p>
                    <p className="text-gray-600">
                      Sector 5, Chandigarh<br />
                      Punjab 160005, India
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-prestige-gold" size={24} />
                  <a href="tel:+919876543210" className="text-gray-600 hover:text-prestige-gold">
                    +91 98765 43210
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-prestige-gold" size={24} />
                  <a href="mailto:info@prestigerealty.com" className="text-gray-600 hover:text-prestige-gold">
                    info@prestigerealty.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-96">
              <GoogleMap
                center={{ lat: 30.7333, lng: 76.7794 }}
                zoom={15}
              />
            </div>

            <div className="bg-prestige-cream rounded-xl p-6">
              <h3 className="text-xl font-bold text-prestige-navy mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <MessageSquare className="text-green-500" size={24} />
                  <span className="font-semibold">WhatsApp Us</span>
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <Phone className="text-prestige-gold" size={24} />
                  <span className="font-semibold">Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}





