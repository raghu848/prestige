'use client'

import { motion } from 'framer-motion'
import { Award, Users, Target, TrendingUp } from 'lucide-react'
import Image from 'next/image'

const stats = [
  { label: 'Years of Experience', value: '20+', icon: Award },
  { label: 'Projects Delivered', value: '500+', icon: TrendingUp },
  { label: 'Happy Clients', value: '10k+', icon: Users },
]

const values = [
  {
    title: 'Excellence',
    description: 'We strive for excellence in every project we undertake.',
  },
  {
    title: 'Integrity',
    description: 'Honest and transparent dealings with all our clients.',
  },
  {
    title: 'Innovation',
    description: 'Embracing modern technologies and design trends.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-prestige-navy to-prestige-dark" />
        <div className="relative z-10 container-custom text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold mb-4"
          >
            About Prestige Realty
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl"
          >
            Your trusted partner in premium real estate
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center bg-white rounded-xl p-8 shadow-lg"
                >
                  <Icon className="text-prestige-gold mx-auto mb-4" size={48} />
                  <p className="text-4xl font-bold text-prestige-navy mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold text-prestige-navy mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded with a vision to redefine luxury living, Prestige Realty has been at the
                forefront of premium real estate development for over two decades. We specialize in
                creating exceptional residential, commercial, and leasing solutions that exceed
                expectations.
              </p>
              <p className="text-lg text-gray-600">
                Our commitment to quality, innovation, and customer satisfaction has made us a
                trusted name in Chandigarh and beyond. We believe in building not just properties,
                but communities that enrich lives.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-xl overflow-hidden"
            >
              <Image
                src="/images/about-team.jpg"
                alt="Prestige Realty Team"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="section-padding bg-prestige-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-prestige-navy mb-4">
              Our Vision & Values
            </h2>
            <p className="text-xl text-gray-600">
              What drives us forward
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <h3 className="text-2xl font-bold text-prestige-navy mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-prestige-navy text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Join Us as a Partner
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Be part of our growing network of trusted partners
            </p>
            <a href="/contact" className="button-89 inline-flex items-center text-decoration-none">
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}





