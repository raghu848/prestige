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
    <section className="py-24 bg-gradient-to-b from-[#020617] to-slate-950 overflow-hidden relative z-10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Why Prestige Realty?
          </h2>
          <p className="text-xl text-slate-400 font-light">
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
                className="text-center p-8 rounded-3xl bg-slate-900/30 backdrop-blur-md border border-white/10 hover:border-amber-500/25 hover:shadow-[0_15px_30px_rgba(245,158,11,0.08)] hover:-translate-y-1 transition-all duration-300 relative group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                  <Icon className="text-amber-400" size={28} />
                </div>
                <h3 className="text-xl font-display font-medium text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
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





