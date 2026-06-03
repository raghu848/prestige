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

const FALLBACK_PROJECTS = [
  {
    id: '1',
    name: 'Modern Sky Penthouse',
    slug: 'modern-sky-penthouse',
    category: 'Penthouse',
    location_coords: { lat: 30.7333, lng: 76.7794 },
    price_min: 25000000,
    hero_image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Azure Marina Villa',
    slug: 'azure-marina-villa',
    category: 'Villa',
    location_coords: { lat: 30.7100, lng: 76.7500 },
    price_min: 48000000,
    hero_image_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'The Golden Residence',
    slug: 'the-golden-residence',
    category: 'Apartment',
    location_coords: { lat: 30.7500, lng: 76.8000 },
    price_min: 12000000,
    hero_image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
  }
];

export default function InteractiveMap() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS)

  useEffect(() => {
    // In a production environment, you would fetch these from Supabase
    // const fetchProjects = async () => { ... }
  }, [])

  // Pre-calculate center or default to Chandigarh
  const center = { lat: 30.7333, lng: 76.7794 }

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="section-padding bg-gradient-to-b from-[#020617] to-slate-950 relative overflow-hidden z-10">
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Explore Our Locations
            </h2>
            <p className="text-xl text-slate-450 mb-8 font-light leading-relaxed">
              Discover premium properties across prime locations. Whether you're looking for a luxury home, a strategic commercial space, or a leasing opportunity, our map helps you find the perfect spot.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-slate-300 font-medium">
                <span className="w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mr-3 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
                Strategic locations in city centers
              </li>
              <li className="flex items-center text-slate-300 font-medium">
                <span className="w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mr-3 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
                Easy connectivity to major hubs
              </li>
              <li className="flex items-center text-slate-300 font-medium">
                <span className="w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mr-3 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
                Premium neighborhoods with high appreciation
              </li>
            </ul>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest transition-all hover:scale-105 shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.45)] text-decoration-none w-full sm:w-auto"
            >
              Get Directions <ArrowRight className="ml-2" size={16} />
            </a>
          </motion.div>

          {/* Map Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[500px] rounded-3xl overflow-hidden shadow-2xl relative z-0 border border-amber-500/20 p-1 bg-slate-900/40 backdrop-blur-md dark-map"
          >
            {isMounted && (
              <MapContainer center={[center.lat, center.lng]} zoom={12} style={{ height: '100%', width: '100%', borderRadius: '1.25rem' }}>
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
                      <div className="p-1 min-w-[200px]">
                        <h3 className="font-bold text-white text-base mb-1">{project.name}</h3>
                        <p className="text-xs text-slate-400 capitalize mb-2">{project.category}</p>
                        <p className="text-sm font-bold text-amber-300 mb-3">
                          From ₹{(project.price_min / 10000000).toFixed(1)} Cr
                        </p>
                        <Link
                          href={`/projects/${project.category}/${project.slug}`}
                          className="text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-450 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider inline-flex items-center transition-all shadow-[0_2px_8px_rgba(245,158,11,0.25)] no-underline"
                        >
                          View Details <ArrowRight size={10} className="ml-1" />
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
