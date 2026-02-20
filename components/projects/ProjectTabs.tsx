'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Check } from 'lucide-react'
import dynamic from 'next/dynamic'

const GoogleMap = dynamic(() => import('@/components/ui/GoogleMap'), { ssr: false })

interface ProjectTabsProps {
  project: any
}

export default function ProjectTabs({ project }: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'floor-plans', label: 'Floor Plans' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'location', label: 'Location' },
  ]

  const amenities = Array.isArray(project.amenities) ? project.amenities : []

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Tab Headers */}
      <div className="border-b border-gray-200 flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'text-prestige-gold border-b-2 border-prestige-gold'
                : 'text-gray-600 hover:text-prestige-navy'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="prose max-w-none"
          >
            <div
              dangerouslySetInnerHTML={{ __html: project.overview || project.description || '' }}
            />
          </motion.div>
        )}

        {activeTab === 'amenities' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {amenities.map((amenity: string, index: number) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Check className="text-prestige-gold flex-shrink-0" size={20} />
                <span className="text-gray-700">{amenity}</span>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'floor-plans' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {project.floor_plan_urls && Array.isArray(project.floor_plan_urls) && project.floor_plan_urls.length > 0 ? (
              project.floor_plan_urls.map((url: string, index: number) => (
                <div key={index} className="relative w-full h-96 rounded-lg overflow-hidden">
                  <Image
                    src={url}
                    alt={`Floor Plan ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-600">Floor plans coming soon.</p>
            )}
          </motion.div>
        )}

        {activeTab === 'gallery' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {project.image_urls && Array.isArray(project.image_urls) && project.image_urls.length > 0 ? (
              project.image_urls.map((url: string, index: number) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={url}
                    alt={`Gallery Image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full">Gallery images coming soon.</p>
            )}
          </motion.div>
        )}

        {activeTab === 'location' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {project.location_coords && (
              <div className="h-96 rounded-lg overflow-hidden">
                <GoogleMap
                  center={{
                    lat: typeof project.location_coords === 'object' && 'lat' in project.location_coords
                      ? project.location_coords.lat
                      : 30.7333,
                    lng: typeof project.location_coords === 'object' && 'lng' in project.location_coords
                      ? project.location_coords.lng
                      : 76.7794,
                  }}
                  zoom={15}
                />
              </div>
            )}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-prestige-navy mb-4">Nearby Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-prestige-gold mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Schools</p>
                    <p className="text-sm text-gray-600">Multiple schools within 2 km</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="text-prestige-gold mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Hospitals</p>
                    <p className="text-sm text-gray-600">Premium healthcare facilities nearby</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="text-prestige-gold mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Shopping</p>
                    <p className="text-sm text-gray-600">Malls and markets within 3 km</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="text-prestige-gold mt-1" size={20} />
                  <div>
                    <p className="font-semibold">Transport</p>
                    <p className="text-sm text-gray-600">Well-connected to major routes</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}





