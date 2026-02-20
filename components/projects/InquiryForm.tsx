'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Send } from 'lucide-react'

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  message: z.string().optional(),
  inquiry_type: z.enum(['general', 'brochure', 'visit', 'callback', 'consultation']),
})

type InquiryFormData = z.infer<typeof inquirySchema>

interface InquiryFormProps {
  projectId: string
}

export default function InquiryForm({ projectId }: InquiryFormProps) {
  const [submitting, setSubmitting] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      inquiry_type: 'general',
    },
  })

  const onSubmit = async (data: InquiryFormData) => {
    setSubmitting(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          project_id: projectId,
        }),
      })

      if (res.ok) {
        toast.success('Inquiry submitted successfully! We will contact you soon.')
        reset()
      } else {
        throw new Error('Failed to submit inquiry')
      }
    } catch (error) {
      toast.error('Failed to submit inquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-prestige-navy mb-4">Get More Information</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <div>
          <select
            {...register('inquiry_type')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prestige-gold"
          >
            <option value="general">General Inquiry</option>
            <option value="brochure">Download Brochure</option>
            <option value="visit">Schedule Visit</option>
            <option value="callback">Request Callback</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>

        <div>
          <textarea
            {...register('message')}
            placeholder="Your Message (Optional)"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prestige-gold"
          />
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
              Submit Inquiry
            </>
          )}
        </button>
      </form>
    </div>
  )
}





