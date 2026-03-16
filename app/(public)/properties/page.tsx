import { createClient } from '@/lib/supabase/server'
import PropertyCard from '@/components/ui/PropertyCard'
import SectionHeader from '@/components/ui/SectionHeader'

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
        featured_image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
        is_featured: true,
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
        featured_image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
        is_featured: true,
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
        featured_image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
        is_featured: true,
        status: 'available'
    }
];

export default async function PropertiesListingPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams
    const supabase = await createClient()
    let properties = [];

    if (!supabase) {
        console.warn('Supabase not configured. Using fallback data for PropertiesListingPage.');
        properties = FALLBACK_PROPERTIES;
    } else {
        let query = supabase.from('properties').select('*')

        // Simple filtering logic
        if (searchParams.type) {
            query = query.eq('property_type', searchParams.type)
        }
        if (searchParams.city) {
            query = query.eq('city', searchParams.city)
        }

        const { data, error } = await query.order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching properties:', error)
        } else {
            properties = data || [];
        }
    }

    if (properties.length === 0 && !supabase) {
        properties = FALLBACK_PROPERTIES;
    }

    return (
        <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
            <div className="container-custom">
                <SectionHeader
                    title="Our Properties"
                    subtitle="Explore our curated collection of luxury estates across the city."
                    align="center"
                />

                {/* Filters placeholder */}
                <div className="mt-12 mb-12 flex flex-wrap justify-center gap-4">
                    <button className="px-6 py-2 bg-prestige-navy text-white rounded-full font-bold shadow-lg">
                        All
                    </button>
                    <button className="px-6 py-2 bg-white text-prestige-navy border border-gray-200 rounded-full font-medium hover:border-prestige-gold transition-colors">
                        Apartments
                    </button>
                    <button className="px-6 py-2 bg-white text-prestige-navy border border-gray-200 rounded-full font-medium hover:border-prestige-gold transition-colors">
                        Villas
                    </button>
                    <button className="px-6 py-2 bg-white text-prestige-navy border border-gray-200 rounded-full font-medium hover:border-prestige-gold transition-colors">
                        Penthouses
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties?.length === 0 ? (
                        <div className="col-span-full text-center py-24">
                            <p className="text-xl text-gray-500">No properties found matching your criteria.</p>
                        </div>
                    ) : (
                        properties?.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
