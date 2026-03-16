'use client'

import React from 'react'
import Image from 'next/image'
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
            className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
        >
            {/* Property Badge */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {property.is_featured && (
                    <span className="bg-white/90 backdrop-blur-md text-prestige-gold px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg border border-prestige-gold/20">
                        <Star className="w-3 h-3 mr-1 fill-prestige-gold" />
                        FEATURED
                    </span>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg uppercase ${property.status === 'available' ? 'bg-prestige-gold' : 'bg-prestige-navy'
                    }`}>
                    {property.status}
                </span>
            </div>

            {/* Image Section */}
            <div className="relative h-72 overflow-hidden">
                <Image
                    src={property.featured_image || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop'}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prestige-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <span className="text-prestige-gold text-xs font-bold tracking-widest uppercase mb-1 block">
                            {property.property_type}
                        </span>
                        <Link href={`/properties/${property.slug}`}>
                            <h3 className="text-xl font-display font-bold text-prestige-navy hover:text-prestige-gold transition-colors line-clamp-1">
                                {property.title}
                            </h3>
                        </Link>
                    </div>
                    <p className="text-xl font-bold text-prestige-navy">
                        ${property.price.toLocaleString('en-US')}
                    </p>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-6">
                    <MapPin size={16} className="text-prestige-gold mr-1" />
                    <span className="line-clamp-1">{property.address}, {property.city}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                    <div className="flex flex-col items-center text-center">
                        <BedDouble className="text-prestige-gold mb-1" size={20} />
                        <span className="text-xs font-semibold text-prestige-navy">{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Bath className="text-prestige-gold mb-1" size={20} />
                        <span className="text-xs font-semibold text-prestige-navy">{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Square className="text-prestige-gold mb-1" size={18} />
                        <span className="text-xs font-semibold text-prestige-navy">{property.area_sqft} sqft</span>
                    </div>
                </div>

                <Link
                    href={`/properties/${property.slug}`}
                    className="mt-6 block w-full text-center py-3 border border-prestige-navy text-prestige-navy font-bold rounded-lg hover:bg-prestige-navy hover:text-white transition-all duration-300 transform active:scale-95"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    )
}
