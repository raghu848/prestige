'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Building, Key, Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: 'residential',
    icon: Home,
    title: 'Residential',
    subtitle: 'Luxury Homes & Apartments',
    description: 'Premium residential properties including luxury apartments, villas, and smart homes designed for modern living.',
    features: ['3-5BHK Villas', 'Smart Home Technology', 'Premium Finishes', 'World-Class Amenities'],
    idealFor: 'Families & Investors',
  },
  {
    id: 'commercial',
    icon: Building,
    title: 'Commercial',
    subtitle: 'Grade-A Offices & Retail',
    description: 'Strategic commercial spaces including Grade-A offices, retail outlets, and business hubs in prime locations.',
    features: ['Grade-A Offices', 'Retail Spaces', 'Modern Infrastructure', 'Strategic Locations'],
    idealFor: 'Businesses & Corporates',
  },
  {
    id: 'leasing',
    icon: Key,
    title: 'Leasing',
    subtitle: 'Flexible Terms & Furnished',
    description: 'Premium furnished spaces available for lease with flexible terms, perfect for short and long-term requirements.',
    features: ['Fully Furnished', 'Flexible Terms', 'Short & Long-Term', 'Premium Locations'],
    idealFor: 'Corporates & Expats',
  },
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('residential')

  const activeService = services.find(s => s.id === activeTab) || services[0]
  const Icon = activeService.icon

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-r from-prestige-navy to-prestige-dark">
        <div className="container-custom text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold mb-4"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl"
          >
            Comprehensive real estate solutions for every need
          </motion.p>
        </div>
      </section>

      {/* Tabs */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {services.map((service) => {
              const ServiceIcon = service.icon
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveTab(service.id)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all ${activeTab === service.id
                    ? 'bg-prestige-gold text-prestige-navy shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <ServiceIcon size={24} />
                  <span className="font-semibold">{service.title}</span>
                </button>
              )
            })}
          </div>

          {/* Service Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-prestige-gold rounded-full p-4">
                <Icon className="text-prestige-navy" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold text-prestige-navy">
                  {activeService.title}
                </h2>
                <p className="text-gray-600">{activeService.subtitle}</p>
              </div>
            </div>

            <p className="text-lg text-gray-700 mb-8">{activeService.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-prestige-navy mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {activeService.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="text-prestige-gold flex-shrink-0" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-prestige-navy mb-4">Ideal For</h3>
                <p className="text-lg text-gray-700 mb-6">{activeService.idealFor}</p>
                <Link
                  href="/contact"
                  className="button-89 inline-flex items-center text-decoration-none"
                >
                  Get Started
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-prestige-navy mb-4">
              Service Comparison
            </h2>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-prestige-navy text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Service</th>
                  <th className="px-6 py-4 text-left">Key Features</th>
                  <th className="px-6 py-4 text-left">Ideal For</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={service.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-semibold text-prestige-navy">{service.title}</td>
                    <td className="px-6 py-4 text-gray-700">{service.features.join(', ')}</td>
                    <td className="px-6 py-4 text-gray-700">{service.idealFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}





