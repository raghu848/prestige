'use client'

import React from 'react'
import SafeImage from '@/components/ui/SafeImage'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BedDouble, Bath, Square, MapPin, Star } from 'lucide-react'

interface PropertyCardProps {
    property: {
        id: string
        title: string
        slug: string
        price: number
        property_type: string
        bedrooms: number
        bathrooms: number
        area_sqft: number
        address: string
        city: string
        featured_image: string
        is_featured: boolean
        status: string
    }
}

export default function PropertyCard({ property }: PropertyCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-slate-900/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] hover:border-amber-500/30 transition-all duration-500"
        >
            {/* Property Badge */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {property.is_featured && (
                    <span className="bg-slate-950/80 backdrop-blur-md text-amber-300 px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg border border-amber-500/20">
                        <Star className="w-3 h-3 mr-1 fill-amber-400 text-amber-400" />
                        FEATURED
                    </span>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold text-slate-950 shadow-lg uppercase tracking-wider ${property.status === 'available' ? 'bg-gradient-to-r from-amber-400 to-amber-500' : 'bg-slate-100'
                    }`}>
                    {property.status}
                </span>
            </div>

            {/* Image Section */}
            <div className="relative h-72 overflow-hidden">
                <SafeImage
                    src={property.featured_image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-1 block">
                            {property.property_type}
                        </span>
                        <Link href={`/properties/${property.slug}`}>
                            <h3 className="text-xl font-display font-medium text-white hover:text-amber-300 transition-colors line-clamp-1">
                                {property.title}
                            </h3>
                        </Link>
                    </div>
                    <p className="text-xl font-bold text-amber-200">
                        ₹{(property.price / 10000000).toFixed(2)} Cr
                    </p>
                </div>

                <div className="flex items-center text-slate-400 text-sm mb-6">
                    <MapPin size={16} className="text-amber-400 mr-1 flex-shrink-0" />
                    <span className="line-clamp-1">{property.address}, {property.city}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/5">
                    <div className="flex flex-col items-center text-center">
                        <BedDouble className="text-amber-400 mb-1" size={20} />
                        <span className="text-xs font-semibold text-slate-300">{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Bath className="text-amber-400 mb-1" size={20} />
                        <span className="text-xs font-semibold text-slate-300">{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Square className="text-amber-400 mb-1" size={18} />
                        <span className="text-xs font-semibold text-slate-300">{property.area_sqft} sqft</span>
                    </div>
                </div>

                <Link
                    href={`/properties/${property.slug}`}
                    className="mt-6 block w-full text-center py-3 border border-amber-500/20 text-amber-300 hover:text-slate-950 font-bold rounded-lg bg-transparent hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300 transform active:scale-95"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    )
}
