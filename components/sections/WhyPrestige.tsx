'use client'

import { motion } from 'framer-motion'
import { Award, MapPin, Users, TrendingUp } from 'lucide-react'

const features = [
  {
    icon: Award,
    title: 'Expertise',
    description: '20+ years of experience in premium real estate',
  },
  {
    icon: TrendingUp,
    title: '1000+ Projects',
    description: 'Successfully delivered projects across premium markets',
  },
  {
    icon: MapPin,
    title: 'Premium Locations',
    description: 'Strategic locations in prime sectors of Chandigarh',
  },
  {
    icon: Users,
    title: 'Client Success',
    description: '10,000+ satisfied customers and growing',
  },
]

export default function WhyPrestige() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-prestige-navy mb-4">
            Why Prestige Realty?
          </h2>
          <p className="text-xl text-gray-600">
            Your trusted partner in premium real estate
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-prestige-cream to-white hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-prestige-gold rounded-full mb-4">
                  <Icon className="text-prestige-navy" size={32} />
                </div>
                <h3 className="text-xl font-bold text-prestige-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}





