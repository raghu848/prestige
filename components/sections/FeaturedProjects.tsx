import { createClient } from '@/lib/supabase/server'
import PropertyCard from '@/components/ui/PropertyCard'
import SectionHeader from '@/components/ui/SectionHeader'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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

export default async function FeaturedProjects() {
  const supabase = await createClient()
  let properties = [];

  if (!supabase) {
    console.warn('Supabase not configured. Using fallback data for FeaturedProjects.');
    properties = FALLBACK_PROPERTIES;
  } else {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('is_featured', true)
        .limit(3)

      if (error) throw error;
      properties = data || [];
    } catch (err: any) {
      // Check if the error is a large string (like a Cloudflare HTML error page)
      const errorMessage = typeof err === 'string' && err.includes('<!DOCTYPE html>')
        ? 'SSL Handshake failed or backend unavailable (HTML error received)'
        : (err.message || String(err));

      console.error('Error fetching featured properties:', errorMessage);
      // Fallback to empty or sample data on error
      properties = FALLBACK_PROPERTIES;
    }
  }

  if (properties.length === 0 && !supabase) {
    properties = FALLBACK_PROPERTIES;
  }

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeader
            title="Featured Properties"
            subtitle="Exclusive selection of our most premium listings"
          />
          <Link
            href="/properties"
            className="group flex items-center text-prestige-gold font-bold hover:text-prestige-navy transition-colors"
          >
            Explore All Properties
            <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties?.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
