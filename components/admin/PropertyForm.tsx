'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Save, X, Upload, Plus, Loader2, Building2, MapPin, DollarSign, Ruler, Bed, Bath, Info } from 'lucide-react'
import toast from 'react-hot-toast'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

const propertySchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    price: z.number().min(0, 'Price must be positive'),
    property_type: z.string().min(1, 'Please select a property type'),
    bedrooms: z.number().min(0),
    bathrooms: z.number().min(0),
    area_sqft: z.number().min(0),
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    status: z.enum(['available', 'sold', 'rented']),
    is_featured: z.boolean().default(false),
})

type PropertyFormData = z.infer<typeof propertySchema>

interface PropertyFormProps {
    initialData?: any
    id?: string
}

export default function PropertyForm({ initialData, id }: PropertyFormProps) {
    const router = useRouter()
    const supabase = createClient()
    const [submitting, setSubmitting] = useState(false)

    if (!supabase) {
        return (
            <div className="bg-white p-12 rounded-2xl shadow-xl border border-rose-100 bg-rose-50/30 text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Info size={32} />
                </div>
                <h3 className="text-2xl font-bold text-rose-900 mb-2">Configuration Required</h3>
                <p className="text-rose-700/80 mb-8 leading-relaxed">Please add your Supabase credentials to <code className="bg-rose-100 px-2 py-1 rounded text-rose-900">.env.local</code> to enable property management and database interactions.</p>
                <button
                    onClick={() => router.back()}
                    className="px-8 py-3 bg-white border border-rose-200 text-rose-900 rounded-xl font-bold hover:bg-rose-100 transition-all shadow-sm"
                >
                    Return to Safety
                </button>
            </div>
        )
    }

    const [featuredImage, setFeaturedImage] = useState<string | null>(initialData?.featured_image || null)
    const [galleryImages, setGalleryImages] = useState<string[]>(initialData?.gallery_images || [])
    const [uploading, setUploading] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const galleryInputRef = useRef<HTMLInputElement>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PropertyFormData>({
        resolver: zodResolver(propertySchema),
        defaultValues: initialData || {
            status: 'available',
            is_featured: false,
        },
    })

    const uploadImage = async (file: File) => {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `properties/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(filePath)

        return publicUrl
    }

    const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        try {
            const url = await uploadImage(file)
            setFeaturedImage(url)
            toast.success('Main showcase image updated')
        } catch (error: any) {
            toast.error('Upload failed: ' + error.message)
        } finally {
            setUploading(false)
        }
    }

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setUploading(true)
        try {
            const uploadPromises = Array.from(files).map(file => uploadImage(file))
            const urls = await Promise.all(uploadPromises)
            setGalleryImages(prev => [...prev, ...urls])
            toast.success(`Enhanced gallery with ${urls.length} new views`)
        } catch (error: any) {
            toast.error('Gallery sync failed: ' + error.message)
        } finally {
            setUploading(false)
        }
    }

    const removeGalleryImage = (url: string) => {
        setGalleryImages(prev => prev.filter(img => img !== url))
    }

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
    }

    const onSubmit = async (data: PropertyFormData) => {
        if (!featuredImage) {
            toast.error('A featured showcase image is mandatory')
            return
        }

        setSubmitting(true)
        try {
            const slug = generateSlug(data.title)
            const propertyData = {
                ...data,
                slug,
                featured_image: featuredImage,
                gallery_images: galleryImages,
                updated_at: new Date().toISOString(),
            }

            let error
            if (id && id !== 'new') {
                const { error: updateError } = await supabase
                    .from('properties')
                    .update(propertyData)
                    .eq('id', id)
                error = updateError
            } else {
                const { error: insertError } = await supabase
                    .from('properties')
                    .insert([propertyData])
                error = insertError
            }

            if (error) throw error

            toast.success(`Listing successfully ${id && id !== 'new' ? 'updated' : 'published'}!`)
            router.push('/agent/projects')
            router.refresh()
        } catch (error: any) {
            toast.error('Transaction failed: ' + error.message)
        } finally {
            setSubmitting(false)
        }
    }

    const inputClasses = "w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-4 focus:ring-prestige-gold/10 focus:border-prestige-gold outline-none transition-all duration-300 font-[family-name:var(--font-outfit)] text-prestige-navy placeholder-gray-300 shadow-sm"
    const labelClasses = "flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2.5 ml-1"

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 max-w-5xl mx-auto pb-20">
            {/* Header / Intro */}
            <div className="flex items-center justify-between bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-prestige-navy">
                        {id && id !== 'new' ? 'Edit Luxury Listing' : 'Publish New Masterpiece'}
                    </h2>
                    <p className="text-gray-400 text-sm font-medium mt-1 uppercase tracking-wider">Property Management Suite</p>
                </div>
                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-3 border border-gray-100 font-bold text-gray-500 rounded-xl hover:bg-gray-50 transition-all text-sm"
                    >
                        Discard
                    </button>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-8 py-3 bg-prestige-navy text-white rounded-xl flex items-center gap-2 font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm disabled:opacity-50"
                    >
                        {submitting ? (
                            <><Loader2 className="animate-spin" size={18} /> Processing...</>
                        ) : (
                            <><Save size={18} /> {id && id !== 'new' ? 'Apply Changes' : 'Authorize Publication'}</>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Basic Info */}
                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Info size={120} />
                        </div>
                        <h3 className="text-xl font-bold mb-8 text-prestige-navy flex items-center gap-3 relative z-10">
                            <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center italic font-serif">i</span>
                            Primary Definitions
                        </h3>
                        <div className="space-y-6 relative z-10">
                            <div>
                                <label className={labelClasses}><Building2 size={14} /> Property Title</label>
                                <input
                                    {...register('title')}
                                    className={inputClasses}
                                    placeholder="The Grand Emerald Heights"
                                />
                                {errors.title && <p className="text-rose-500 text-[10px] font-bold uppercase mt-2 ml-1 tracking-wider">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className={labelClasses}><Info size={14} /> Narrative Description</label>
                                <textarea
                                    {...register('description')}
                                    rows={6}
                                    className={`${inputClasses} resize-none`}
                                    placeholder="Describe the architectural soul and ambiance..."
                                />
                                {errors.description && <p className="text-rose-500 text-[10px] font-bold uppercase mt-2 ml-1 tracking-wider">{errors.description.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}><DollarSign size={14} /> Valuation (USD)</label>
                                    <input
                                        type="number"
                                        {...register('price', { valueAsNumber: true })}
                                        className={inputClasses}
                                        placeholder="0.00"
                                    />
                                    {errors.price && <p className="text-rose-500 text-[10px] font-bold uppercase mt-2 ml-1 tracking-wider">{errors.price.message}</p>}
                                </div>

                                <div>
                                    <label className={labelClasses}><Building2 size={14} /> Architectural Type</label>
                                    <select
                                        {...register('property_type')}
                                        className={inputClasses}
                                    >
                                        <option value="">Signature Selection</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Penthouse">Penthouse</option>
                                        <option value="Townhouse">Townhouse</option>
                                        <option value="Mansion">Mansion</option>
                                    </select>
                                    {errors.property_type && <p className="text-rose-500 text-[10px] font-bold uppercase mt-2 ml-1 tracking-wider">{errors.property_type.message}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical Specs */}
                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-8 text-prestige-navy flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center italic font-serif">s</span>
                            Specifications & Location
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                            <div>
                                <label className={labelClasses}><Bed size={14} /> Suites</label>
                                <input type="number" {...register('bedrooms', { valueAsNumber: true })} className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}><Bath size={14} /> Baths</label>
                                <input type="number" {...register('bathrooms', { valueAsNumber: true })} className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}><Ruler size={14} /> Living Area</label>
                                <input type="number" {...register('area_sqft', { valueAsNumber: true })} className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}><Info size={14} /> Availability</label>
                                <select {...register('status')} className={inputClasses}>
                                    <option value="available">Active</option>
                                    <option value="sold">Acquired</option>
                                    <option value="rented">Leased</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className={labelClasses}><MapPin size={14} /> Precise Address</label>
                                <input {...register('address')} className={inputClasses} placeholder="Prime Location Boulevard" />
                                {errors.address && <p className="text-rose-500 text-[10px] font-bold uppercase mt-2 ml-1 tracking-wider">{errors.address.message}</p>}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}><MapPin size={14} /> Metropolitan City</label>
                                    <input {...register('city')} className={inputClasses} placeholder="Luxury Hub Center" />
                                    {errors.city && <p className="text-rose-500 text-[10px] font-bold uppercase mt-2 ml-1 tracking-wider">{errors.city.message}</p>}
                                </div>
                                <div className="flex items-center gap-3 mt-8 ml-2">
                                    <input
                                        type="checkbox"
                                        id="is_featured"
                                        {...register('is_featured')}
                                        className="w-5 h-5 text-prestige-gold rounded-lg border-gray-200 focus:ring-prestige-gold/20 focus:ring-offset-0 transition-all cursor-pointer"
                                    />
                                    <label htmlFor="is_featured" className="text-sm font-bold text-prestige-navy tracking-tight cursor-pointer select-none ring-offset-rose-500">
                                        Highlight as Featured Listing
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Media */}
                <div className="space-y-10">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="text-lg font-bold mb-6 text-prestige-navy flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-serif italic text-sm">m</span>
                            Visual Assets
                        </h3>

                        {/* Showcase Image */}
                        <div className="mb-8">
                            <label className={labelClasses}>Primary Showcase (Req.)</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="relative aspect-[4/3] w-full bg-gray-50 border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center cursor-pointer group hover:bg-gray-100 hover:border-prestige-gold/30 transition-all overflow-hidden"
                            >
                                {featuredImage ? (
                                    <>
                                        <Image src={featuredImage} alt="Showcase" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Upload className="text-white" size={24} />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-4 bg-white rounded-2xl shadow-sm text-gray-300 group-hover:text-prestige-gold transition-colors mb-3">
                                            <Upload />
                                        </div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Main View</span>
                                    </>
                                )}
                                {uploading && (
                                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                                        <Loader2 className="animate-spin text-prestige-gold" size={32} />
                                    </div>
                                )}
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleFeaturedImageUpload} className="hidden" accept="image/*" />
                        </div>

                        {/* Gallery Section */}
                        <div>
                            <label className={labelClasses}>Extended Gallery</label>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {galleryImages.map((url, index) => (
                                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden shadow-sm group border border-gray-100">
                                        <Image src={url} alt={`Gallery ${index}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <button
                                            type="button"
                                            onClick={() => removeGalleryImage(url)}
                                            className="absolute top-2 right-2 p-1.5 bg-rose-500 text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 hover:bg-rose-600 transition-all"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => galleryInputRef.current?.click()}
                                    className="aspect-square bg-gray-50 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-300 hover:bg-prestige-gold/5 hover:border-prestige-gold/30 hover:text-prestige-gold transition-all"
                                >
                                    <Plus size={24} />
                                    <span className="text-[10px] font-bold uppercase mt-1 tracking-wider">Perspective</span>
                                </button>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium italic text-center px-4">Upload high-resolution architectural captures for maximum impact.</p>
                            <input type="file" ref={galleryInputRef} onChange={handleGalleryUpload} className="hidden" multiple accept="image/*" />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
