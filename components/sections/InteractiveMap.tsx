'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Dynamically import Leaflet components properly
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

// Fix for default Leaflet markers in Next.js
const LeafletIconFix = () => {
  useEffect(() => {
    // @ts-ignore
    import('leaflet').then((L) => {
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    })
  }, [])
  return null
}

interface Project {
  id: string
  name: string
  slug: string
  category: string
  location_coords: { lat: number; lng: number }
  price_min: number
  hero_image_url: string
}

export default function InteractiveMap() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/projects?limit=10`)
      const data = await res.json()
      setProjects(data.projects || [])
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    }
  }

  // Pre-calculate center or default to Chandigarh
  const center = { lat: 30.7333, lng: 76.7794 }

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-prestige-navy mb-6">
              Explore Our Locations
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover premium properties across prime locations. Whether you're looking for a luxury home, a strategic commercial space, or a leasing opportunity, our map helps you find the perfect spot.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-prestige-gold rounded-full mr-3"></span>
                Strategic locations in city centers
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-prestige-gold rounded-full mr-3"></span>
                Easy connectivity to major hubs
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-prestige-gold rounded-full mr-3"></span>
                Premium neighborhoods with high appreciation
              </li>
            </ul>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button-89 inline-flex items-center justify-center w-full sm:w-auto text-decoration-none"
            >
              Get Directions <ArrowRight className="ml-2" size={20} />
            </a>
          </motion.div>

          {/* Map Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[500px] rounded-2xl overflow-hidden shadow-2xl relative z-0"
          >
            {isMounted && (
              <MapContainer center={[center.lat, center.lng]} zoom={12} style={{ height: '100%', width: '100%' }}>
                <LeafletIconFix />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {projects.map((project) => (
                  <Marker
                    key={project.id}
                    position={[project.location_coords.lat, project.location_coords.lng]}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <h3 className="font-bold text-prestige-navy text-lg mb-1">{project.name}</h3>
                        <p className="text-sm text-gray-600 capitalize mb-1">{project.category}</p>
                        <p className="text-sm font-semibold text-prestige-gold mb-2">
                          From ₹{(project.price_min / 10000000).toFixed(1)} Cr
                        </p>
                        <Link
                          href={`/projects/${project.category}/${project.slug}`}
                          className="text-white bg-prestige-navy px-3 py-1 rounded text-xs inline-flex items-center hover:bg-prestige-gold transition-colors"
                        >
                          View Details <ArrowRight size={12} className="ml-1" />
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
