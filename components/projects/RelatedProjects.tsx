'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

interface RelatedProjectsProps {
  projects: any[]
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`
    }
    return `₹${(price / 100000).toFixed(1)} L`
  }

  return (
    <div>
      <h2 className="text-3xl font-display font-bold text-prestige-navy mb-8">
        Related Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/projects/${project.category}/${project.slug}`}>
              <div className="bg-white rounded-xl overflow-hidden shadow-lg card-hover">
                <div className="relative h-48">
                  <Image
                    src={project.hero_image_url || '/images/placeholder-project.jpg'}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-prestige-navy mb-2">{project.name}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin size={14} className="mr-1" />
                    {project.city}
                  </div>
                  <p className="text-lg font-bold text-prestige-gold">
                    {formatPrice(project.price_min)}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}





