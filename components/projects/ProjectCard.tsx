'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'

interface ProjectCardProps {
  project: {
    id: string
    name: string
    slug: string
    category: string
    city: string
    hero_image_url: string
    price_min: number
    price_max?: number
    status: string
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)} L`
    }
    return `₹${price.toLocaleString()}`
  }

  return (
    <Link href={`/projects/${project.category}/${project.slug}`}>
      <motion.div
        whileHover={{ y: -8 }}
        className="bg-white rounded-xl overflow-hidden shadow-lg card-hover"
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={project.hero_image_url || '/images/placeholder-project.jpg'}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-prestige-gold text-prestige-navy px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {project.category}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${project.status === 'ongoing' ? 'bg-green-500 text-white' :
                project.status === 'completed' ? 'bg-blue-500 text-white' :
                  'bg-yellow-500 text-white'
              }`}>
              {project.status}
            </span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-prestige-navy mb-2 group-hover:text-prestige-gold transition-colors">
            {project.name}
          </h3>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{project.city}</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-prestige-gold">
                {formatPrice(project.price_min)}
              </p>
              {project.price_max && project.price_max > project.price_min && (
                <p className="text-sm text-gray-600">
                  - {formatPrice(project.price_max)}
                </p>
              )}
            </div>
            <ArrowRight className="text-prestige-gold group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}





