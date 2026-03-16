import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Square, Calendar, CheckCircle2, ArrowRight } from 'lucide-react'
import InquiryForm from '@/components/forms/InquiryForm'

export default async function ProjectDetailPage({
    params: paramsPromise,
}: {
    params: Promise<{ category: string, slug: string }>
}) {
    const { category, slug } = await paramsPromise
    const supabase = await createClient()

    let property = null

    if (supabase) {
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('slug', slug)
            .single()

        if (error) {
            console.error('Supabase Error in ProjectDetailPage:', error)
        } else {
            property = data
        }
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-gray-50 pt-32 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-bold text-prestige-navy mb-4 font-[family-name:var(--font-playfair)]">Property Not Found</h1>
                <p className="text-gray-500 mb-8 font-[family-name:var(--font-outfit)]">The architectural masterpiece you are looking for does not exist or has been moved.</p>
                <Link href="/projects" className="px-8 py-3 bg-prestige-navy text-white rounded-xl font-bold hover:shadow-lg transition-all">
                    Back to Collection
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero Banner */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                <Image
                    src={property.featured_image || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop'}
                    alt={property.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prestige-navy via-prestige-navy/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 py-16">
                    <div className="container-custom">
                        <div className="max-w-3xl">
                            <span className="inline-block bg-prestige-gold text-prestige-navy px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 shadow-xl">
                                {property.property_type}
                            </span>
                            <h1 className="text-4xl md:text-7xl font-[family-name:var(--font-playfair)] font-bold text-white mb-6 drop-shadow-2xl">
                                {property.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-white/90">
                                <div className="flex items-center gap-2">
                                    <MapPin size={24} className="text-prestige-gold" />
                                    <span className="text-xl font-medium">{property.city}</span>
                                </div>
                                <div className="h-6 w-[1px] bg-white/20 hidden md:block" />
                                <div className="flex items-center gap-2">
                                    <span className="text-prestige-gold font-bold text-2xl">${property.price.toLocaleString()}</span>
                                    <span className="text-xs uppercase tracking-widest font-bold opacity-60">Verified Price</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container-custom py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Details Column */}
                    <div className="lg:col-span-2 space-y-16">
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm">
                            <div className="text-center">
                                <Bed size={24} className="text-prestige-gold mx-auto mb-2" />
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Bedrooms</p>
                                <p className="text-xl font-bold text-prestige-navy mt-1">{property.bedrooms}</p>
                            </div>
                            <div className="text-center border-l border-gray-200">
                                <Bath size={24} className="text-prestige-gold mx-auto mb-2" />
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Bathrooms</p>
                                <p className="text-xl font-bold text-prestige-navy mt-1">{property.bathrooms}</p>
                            </div>
                            <div className="text-center border-l border-gray-200">
                                <Square size={24} className="text-prestige-gold mx-auto mb-2" />
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Area</p>
                                <p className="text-xl font-bold text-prestige-navy mt-1">{property.area_sqft} <span className="text-xs">sqft</span></p>
                            </div>
                            <div className="text-center border-l border-gray-200">
                                <Calendar size={24} className="text-prestige-gold mx-auto mb-2" />
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-widest">Status</p>
                                <p className="text-xl font-bold text-prestige-navy mt-1 capitalize">{property.status}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <section>
                            <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-prestige-navy mb-8 border-l-4 border-prestige-gold pl-6">
                                Development Overview
                            </h2>
                            <div className="prose prose-lg text-gray-600 max-w-none font-[family-name:var(--font-outfit)] leading-relaxed">
                                {property.description || `Experience luxury living at its finest in ${property.title}, a premier development located in the prestigious neighborhood of ${property.city}. This architectural masterpiece offers unparalleled sophistication and contemporary design elements. Each detail has been meticulously crafted to create an environment of comfort and elegance.`}
                            </div>
                        </section>

                        {/* Amenities */}
                        <section>
                            <h2 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-prestige-navy mb-8 border-l-4 border-prestige-gold pl-6">
                                World-Class Amenities
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {['Infinity Pool', 'State-of-the-Art Gym', 'Private Cinema', 'Concierge Service', 'Garden Terrace', 'Smart Home Integration'].map((item) => (
                                    <div key={item} className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-10 h-10 bg-prestige-gold/10 rounded-full flex items-center justify-center text-prestige-gold">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <span className="font-bold text-prestige-navy">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Inquiry Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-prestige-navy rounded-3xl p-8 shadow-2xl border border-white/5 relative overflow-hidden group">
                                {/* Decoration */}
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-prestige-gold/10 rounded-full blur-3xl group-hover:bg-prestige-gold/20 transition-all duration-700" />

                                <div className="relative z-10 text-white mb-8">
                                    <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2">Request Information</h3>
                                    <p className="text-gray-400 text-sm">Our luxury advisors will provide you with full floorplans and technical specifications.</p>
                                </div>

                                <InquiryForm propertyId={property.id} />

                                <div className="relative z-10 mt-8 pt-8 border-t border-white/10 text-center">
                                    <p className="text-gray-400 text-sm mb-2">Direct Concierge Service</p>
                                    <a href="tel:+919876543210" className="text-prestige-gold font-bold text-xl hover:text-white transition-colors">
                                        +91 98765 43210
                                    </a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
