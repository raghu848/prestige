'use client'

import { motion } from 'framer-motion'

interface SectionHeaderProps {
    title: string
    subtitle?: string
    align?: 'left' | 'center'
}

export default function SectionHeader({ title, subtitle, align = 'left' }: SectionHeaderProps) {
    return (
        <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
            <motion.div
                initial={{ opacity: 0, x: align === 'center' ? 0 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <span className="text-prestige-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                    Elite Real Estate
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-prestige-navy mb-4 leading-tight">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-gray-500 text-lg leading-relaxed">
                        {subtitle}
                    </p>
                )}
                <div className={`mt-6 h-1 w-20 bg-prestige-gold ${align === 'center' ? 'mx-auto' : ''}`} />
            </motion.div>
        </div>
    )
}
