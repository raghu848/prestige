'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Home, Building, Key } from 'lucide-react'

export default function ProjectFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentFilters = {
    category: searchParams.get('category') || '',
    status: searchParams.get('status') || '',
    city: searchParams.get('city') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
    bhk: searchParams.get('bhk') || '',
    min_area: searchParams.get('min_area') || '',
    max_area: searchParams.get('max_area') || '',
  }

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    // Reset to page 1 on filter change
    params.set('page', '1')

    router.push(`/projects?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/projects')
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-prestige-navy">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-prestige-gold font-bold hover:underline uppercase tracking-wider"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Category</label>
        <div className="space-y-2">
          {[
            { value: 'residential', icon: Home, label: 'Residential' },
            { value: 'commercial', icon: Building, label: 'Commercial' },
            { value: 'leasing', icon: Key, label: 'Leasing' },
          ].map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              onClick={() => updateFilters({ category: currentFilters.category === value ? '' : value })}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${currentFilters.category === value
                ? 'bg-prestige-navy text-white shadow-md'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
            >
              <Icon size={18} className={currentFilters.category === value ? 'text-prestige-gold' : ''} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Status</label>
        <select
          value={currentFilters.status}
          onChange={(e) => updateFilters({ status: e.target.value })}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-prestige-gold/20 text-prestige-navy font-medium"
        >
          <option value="">All Status</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="rented">Rented</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Price Range (USD)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={currentFilters.min_price}
            onChange={(e) => updateFilters({ min_price: e.target.value })}
            className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-prestige-gold/20 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={currentFilters.max_price}
            onChange={(e) => updateFilters({ max_price: e.target.value })}
            className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-prestige-gold/20 text-sm"
          />
        </div>
      </div>

      {/* BHK / Bedrooms */}
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Bedrooms</label>
        <select
          value={currentFilters.bhk}
          onChange={(e) => updateFilters({ bhk: e.target.value })}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-prestige-gold/20 text-prestige-navy font-medium"
        >
          <option value="">Any</option>
          <option value="1">1+ BHK</option>
          <option value="2">2+ BHK</option>
          <option value="3">3+ BHK</option>
          <option value="4">4+ BHK</option>
          <option value="5">5+ BHK</option>
        </select>
      </div>

      {/* Area Range */}
      <div className="mb-2">
        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Area (sqft)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={currentFilters.min_area}
            onChange={(e) => updateFilters({ min_area: e.target.value })}
            className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-prestige-gold/20 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={currentFilters.max_area}
            onChange={(e) => updateFilters({ max_area: e.target.value })}
            className="px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-prestige-gold/20 text-sm"
          />
        </div>
      </div>
    </div>
  )
}





