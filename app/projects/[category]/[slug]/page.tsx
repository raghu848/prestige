'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Square, Calendar, CheckCircle2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProjectDetailPage() {
    const params = useParams()
    const slug = params?.slug as string
    const category = params?.category as string
    const [project, setProject] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // In a real app, fetch by slug. For now, we'll mock it or fetch all and find.
        // Since our mock API doesn't support slug filtering yet, we'll just fetch all and find.
        fetchProject()
    }, [slug])

    const fetchProject = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/projects`)
            const data = await res.json()
            // Mock finding the project
            const found = data.projects.find((p: any) => p.slug === slug) || data.projects[0]
            setProject(found)
        } catch (error) {
            console.error('Failed to fetch project:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">Loading...</div>
    if (!project) return <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">Project not found</div>

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[80vh]">
                <Image
                    src={project.hero_image_url}
                    alt={project.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-prestige-gold text-prestige-navy px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block"
                        >
                            {project.category}
                        </motion.span>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-display font-bold mb-4"
                        >
                            {project.name}
                        </motion.h1>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center justify-center gap-2 text-xl"
                        >
                            <MapPin size={24} className="text-prestige-gold" />
                            <span>{project.city}</span>
                        </motion.div>
                    </div>
                </div>
            </section>

            <div className="container-custom py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Overview */}
                        <section>
                            <h2 className="text-3xl font-display font-bold text-prestige-navy mb-6">Overview</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Experience the epitome of luxury living at {project.name}. Located in the heart of {project.city},
                                this project offers world-class amenities and sophisticated design.
                                {/* Mock description filler */}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </section>

                        {/* Key Features / Amenities */}
                        <section>
                            <h2 className="text-3xl font-display font-bold text-prestige-navy mb-6">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {['Swimming Pool', 'Gymnasium', 'Clubhouse', '24/7 Security', 'Power Backup', 'Landscaped Gardens'].map((amenity, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                        <CheckCircle2 className="text-prestige-gold flex-shrink-0" />
                                        <span className="text-gray-700 font-medium">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Gallery Preview */}
                        <section>
                            <h2 className="text-3xl font-display font-bold text-prestige-navy mb-6">Gallery</h2>
                            <div className="grid grid-cols-2 gap-4 h-96">
                                <div className="relative h-full rounded-2xl overflow-hidden block col-span-1">
                                    <Image src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop" alt="Interior" fill className="object-cover" />
                                </div>
                                <div className="grid grid-rows-2 gap-4 h-full">
                                    <div className="relative rounded-2xl overflow-hidden">
                                        <Image src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop" alt="Room" fill className="object-cover" />
                                    </div>
                                    <div className="relative rounded-2xl overflow-hidden">
                                        <Image src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop" alt="Kitchen" fill className="object-cover" />
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>

                    {/* Sidebar: Lead form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Starting From</p>
                                    <p className="text-3xl font-bold text-prestige-navy">₹{(project.price_min / 10000000).toFixed(2)} Cr*</p>
                                </div>

                                <form className="space-y-4">
                                    <h3 className="text-xl font-bold text-prestige-navy mb-4">Enquire Now</h3>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-prestige-gold focus:border-transparent outline-none" placeholder="Your Name" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <input type="tel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-prestige-gold focus:border-transparent outline-none" placeholder="+91" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-prestige-gold focus:border-transparent outline-none" placeholder="john@example.com" />
                                    </div>

                                    <button type="button" className="w-full button-89 py-4 text-lg shadow-lg hover:shadow-xl transform transition-all">
                                        Request Callback
                                    </button>

                                    <p className="text-xs text-gray-500 text-center mt-4">
                                        By clicking, you agree to our Terms & Privacy Policy.
                                    </p>
                                </form>

                                <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                                    <p className="font-bold text-prestige-navy mb-2">Prefer to call?</p>
                                    <a href="tel:+919876543210" className="text-prestige-gold font-bold text-xl hover:underline">
                                        +91 98765 43210
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
