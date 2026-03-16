'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'

const inquirySchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Valid phone number is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
})

type InquiryFormData = z.infer<typeof inquirySchema>

export default function InquiryForm({ propertyId }: { propertyId?: string }) {
    const [submitting, setSubmitting] = useState(false)
    const supabase = createClient()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InquiryFormData>({
        resolver: zodResolver(inquirySchema),
    })

    const onSubmit = async (data: InquiryFormData) => {
        if (!supabase) {
            toast.success('Demo Mode: Inquiry received! In a live site, this would be sent to Supabase.');
            console.log('Demo Form Submission:', data);
            reset();
            return;
        }

        setSubmitting(true)
        try {
            const { error } = await supabase
                .from('inquiries')
                .insert([
                    {
                        ...data,
                        property_id: propertyId,
                    },
                ])

            if (error) throw error

            toast.success('Inquiry submitted successfully! We will contact you soon.')
            reset()
        } catch (error: any) {
            toast.error('Error: ' + error.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <input
                    {...register('name')}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-prestige-gold focus:bg-white/10 transition-all"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-prestige-gold focus:bg-white/10 transition-all"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <input
                        {...register('phone')}
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-prestige-gold focus:bg-white/10 transition-all"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                </div>
            </div>

            <div>
                <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="I'm interested in this property..."
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-prestige-gold focus:bg-white/10 transition-all resize-none"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-prestige-gold text-prestige-navy font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-all transform active:scale-95 disabled:opacity-50"
            >
                {submitting ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Submitting...
                    </>
                ) : (
                    <>
                        <Send size={20} />
                        Send Inquiry
                    </>
                )}
            </button>

            <p className="text-[10px] text-gray-400 text-center mt-4">
                By submitting this form, you agree to our Terms of Service and Privacy Policy.
            </p>
        </form>
    )
}
