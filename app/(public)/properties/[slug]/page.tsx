import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import {
    BedDouble,
    Bath,
    Square,
    MapPin,
    Calendar,
    CheckCircle2,
    Phone,
    Mail,
    User
} from 'lucide-react'
import InquiryForm from '@/components/forms/InquiryForm'

const FALLBACK_PROPERTIES = [
    {
        id: '1',
        title: 'Modern Sky Penthouse',
        slug: 'modern-sky-penthouse',
        price: 2500000,
        property_type: 'Penthouse',
        bedrooms: 4,
        bathrooms: 3,
        area_sqft: 3500,
        address: '123 Sky Garden Way',
        city: 'Dubai',
        description: 'Exquisite penthouse with panoramic city views and private terrace.',
        featured_image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
        gallery_images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop'
        ],
        status: 'available'
    },
    {
        id: '2',
        title: 'Azure Marina Villa',
        slug: 'azure-marina-villa',
        price: 4800000,
        property_type: 'Villa',
        bedrooms: 6,
        bathrooms: 5,
        area_sqft: 7200,
        address: '45 Marina Shore',
        city: 'Palm Jumeirah',
        description: 'Luxury waterfront villa with private dock and infinity pool.',
        featured_image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
        gallery_images: [
            'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1512915922611-e211c3f300cd?q=80&w=2070&auto=format&fit=crop'
        ],
        status: 'available'
    },
    {
        id: '3',
        title: 'The Golden Residence',
        slug: 'the-golden-residence',
        price: 1200000,
        property_type: 'Apartment',
        bedrooms: 3,
        bathrooms: 2,
        area_sqft: 2100,
        address: '88 Elite Avenue',
        city: 'Chandigarh',
        description: 'Sophisticated urban living in the heart of the city.',
        featured_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
        gallery_images: [],
        status: 'available'
    }
];

export default async function PropertyDetailPage(props: {
    params: Promise<{ slug: string }>
}) {
    const params = await props.params
    const supabase = await createClient()
    let property = null;

    if (!supabase) {
        console.warn('Supabase not configured. Using fallback data for PropertyDetailPage.');
        property = FALLBACK_PROPERTIES.find(p => p.slug === params.slug);
    } else {
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('slug', params.slug)
            .single()

        if (!error && data) {
            property = data;
        }
    }

    if (!property && !supabase) {
        property = FALLBACK_PROPERTIES.find(p => p.slug === params.slug);
    }

    if (!property) {
        notFound()
    }

    return (
        <div className="pt-24 pb-24">
            {/* Hero Gallery */}
            <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-gray-900">
                <Image
                    src={property.featured_image}
                    alt={property.title}
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-prestige-navy via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <div className="container-custom">
                        <span className="bg-prestige-gold text-prestige-navy px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 inline-block">
                            {property.property_type}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4 max-w-4xl">
                            {property.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-gray-300">
                            <div className="flex items-center">
                                <MapPin className="text-prestige-gold mr-2" size={20} />
                                <span>{property.address}, {property.city}</span>
                            </div>
                            <div className="flex items-center font-bold text-2xl text-white">
                                ${property.price.toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container-custom mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Overview */}
                        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <h2 className="text-2xl font-display font-bold text-prestige-navy mb-6">Property Overview</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Bedrooms</span>
                                    <div className="flex items-center text-prestige-navy font-bold">
                                        <BedDouble className="text-prestige-gold mr-2" size={20} />
                                        {property.bedrooms}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Bathrooms</span>
                                    <div className="flex items-center text-prestige-navy font-bold">
                                        <Bath className="text-prestige-gold mr-2" size={20} />
                                        {property.bathrooms}
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Area</span>
                                    <div className="flex items-center text-prestige-navy font-bold">
                                        <Square className="text-prestige-gold mr-2" size={18} />
                                        {property.area_sqft} sqft
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Status</span>
                                    <div className="flex items-center text-prestige-navy font-bold capitalize">
                                        <Calendar className="text-prestige-gold mr-2" size={20} />
                                        {property.status}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="text-2xl font-display font-bold text-prestige-navy mb-6">About this Property</h2>
                            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                                {property.description}
                            </p>
                        </div>

                        {/* Gallery */}
                        {property.gallery_images?.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-display font-bold text-prestige-navy mb-6">Gallery</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {property.gallery_images.map((img: string, idx: number) => (
                                        <div key={idx} className="relative h-64 rounded-xl overflow-hidden group">
                                            <Image
                                                src={img}
                                                alt={`Gallery ${idx}`}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            <div className="bg-prestige-navy p-8 rounded-2xl text-white shadow-2xl overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-prestige-gold/10 rounded-full -mr-16 -mt-16" />
                                <h3 className="text-2xl font-display font-bold mb-2">Interested?</h3>
                                <p className="text-gray-400 mb-8 text-sm">Schedule a viewing or request more information about this exclusive property.</p>
                                <InquiryForm propertyId={property.id} />
                            </div>

                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <h4 className="font-bold text-prestige-navy mb-6">Property Agent</h4>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                                        <User className="w-full h-full p-3 text-gray-400" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-prestige-navy text-lg">Prestige Estates</h5>
                                        <p className="text-prestige-gold text-sm font-semibold">Senior Listing Agent</p>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-4">
                                    <div className="flex items-center text-gray-600">
                                        <Phone size={18} className="text-prestige-gold mr-3" />
                                        <span className="text-sm font-medium">+1 (647) 913-4501</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Mail size={18} className="text-prestige-gold mr-3" />
                                        <span className="text-sm font-medium">concierge@prestige.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
