'use client'

import { useState } from 'react'
import { Home, Building, Key, X } from 'lucide-react'

interface ProjectFiltersProps {
  filters: any
  onFilterChange: (filters: any) => void
}

export default function ProjectFilters({ filters, onFilterChange }: ProjectFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleChange = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const cleared = {
      category: '',
      status: '',
      city: '',
      min_price: '',
      max_price: '',
      bhk: '',
      min_area: '',
      max_area: '',
    }
    setLocalFilters(cleared)
    onFilterChange(cleared)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-prestige-navy">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-prestige-gold hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-prestige-navy mb-3">Category</label>
        <div className="space-y-2">
          {[
            { value: 'residential', icon: Home, label: 'Residential' },
            { value: 'commercial', icon: Building, label: 'Commercial' },
            { value: 'leasing', icon: Key, label: 'Leasing' },
          ].map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              onClick={() => handleChange('category', localFilters.category === value ? '' : value)}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                localFilters.category === value
                  ? 'bg-prestige-gold text-prestige-navy'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Status */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-prestige-navy mb-2">Status</label>
        <select
          value={localFilters.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prestige-gold"
        >
          <option value="">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="sold-out">Sold Out</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-prestige-navy mb-2">Price Range</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={localFilters.min_price}
            onChange={(e) => handleChange('min_price', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prestige-gold"
          />
          <input
            type="number"
            placeholder="Max"
            value={localFilters.max_price}
            onChange={(e) => handleChange('max_price', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prestige-gold"
          />
        </div>
      </div>

      {/* BHK */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-prestige-navy mb-2">BHK</label>
        <input
          type="text"
          placeholder="e.g., 2BHK, 3BHK"
          value={localFilters.bhk}
          onChange={(e) => handleChange('bhk', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prestige-gold"
        />
      </div>

      {/* Area Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-prestige-navy mb-2">Area (sqft)</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={localFilters.min_area}
            onChange={(e) => handleChange('min_area', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prestige-gold"
          />
          <input
            type="number"
            placeholder="Max"
            value={localFilters.max_area}
            onChange={(e) => handleChange('max_area', e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-prestige-gold"
          />
        </div>
      </div>
    </div>
  )
}





