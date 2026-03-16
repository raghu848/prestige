import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Star, Eye, Building2, MapPin } from 'lucide-react'
import Image from 'next/image'
import DeletePropertyButton from '@/components/admin/DeletePropertyButton'

export default async function ProjectsPage() {
    const supabase = await createClient()
    let properties = []

    if (!supabase) {
        console.warn('Supabase not configured. Using fallback properties.')
        properties = [
            {
                id: '1',
                title: 'Modern Sky Penthouse',
                price: 2500000,
                property_type: 'Penthouse',
                status: 'available',
                city: 'Chandigarh',
                slug: 'modern-sky-penthouse',
                featured_image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
                is_featured: true
            },
            {
                id: '2',
                title: 'The Golden Residence',
                price: 1800000,
                property_type: 'Villa',
                status: 'sold',
                city: 'Mohali',
                slug: 'the-golden-residence',
                featured_image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
                is_featured: false
            }
        ]
    } else {
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching properties:', error)
        }
        properties = data || []
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold text-prestige-navy">
                        Property Inventory
                    </h1>
                    <p className="text-gray-500 mt-2 font-[family-name:var(--font-outfit)]">
                        Manage and update your luxury listings.
                    </p>
                </div>
                <Link
                    href="/agent/projects/new"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-prestige-gold text-prestige-navy rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-md"
                >
                    <Plus size={20} />
                    Add Listing
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#0a1529] text-white">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Listing Detail</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Valuation</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Type</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-right">Management</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 font-[family-name:var(--font-outfit)]">
                            {properties?.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-24 text-center">
                                        <div className="inline-flex p-4 bg-gray-50 rounded-full text-gray-300 mb-4">
                                            <Building2 size={32} />
                                        </div>
                                        <p className="text-gray-500 font-medium text-lg">Your inventory is empty.</p>
                                        <Link href="/agent/projects/new" className="text-prestige-gold font-bold hover:underline mt-2 inline-block">
                                            Add your first property
                                        </Link>
                                    </td>
                                </tr>
                            ) : (
                                properties?.map((property) => (
                                    <tr key={property.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-5">
                                                <div className="relative w-20 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                                                    <Image
                                                        src={property.featured_image}
                                                        alt={property.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-prestige-navy text-base">{property.title}</span>
                                                        {property.is_featured && (
                                                            <div className="bg-amber-50 p-1 rounded-md">
                                                                <Star className="text-prestige-gold fill-prestige-gold" size={14} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                                                        <MapPin size={12} className="mr-1 text-prestige-gold" />
                                                        {property.city}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-prestige-navy font-bold text-lg">
                                                ${property.price.toLocaleString()}
                                            </div>
                                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Verified Market Value</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                                                {property.property_type}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${property.status === 'available' ? 'bg-emerald-50 text-emerald-700' :
                                                    property.status === 'sold' ? 'bg-rose-50 text-rose-700' :
                                                        'bg-indigo-50 text-indigo-700'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${property.status === 'available' ? 'bg-emerald-500' :
                                                        property.status === 'sold' ? 'bg-rose-500' :
                                                            'bg-indigo-500'
                                                    }`} />
                                                {property.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/properties/${property.slug}`}
                                                    className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                    title="View Public Page"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                                <Link
                                                    href={`/agent/projects/${property.id}/edit`}
                                                    className="p-2.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                                                    title="Edit Property"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <div className="h-6 w-[1px] bg-gray-100 mx-1" />
                                                <DeletePropertyButton id={property.id} title={property.title} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
