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
                <span className="text-amber-400 font-bold tracking-[0.25em] uppercase text-xs mb-3 block">
                    Elite Real Estate
                </span>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 leading-tight">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-slate-400 text-lg leading-relaxed font-light">
                        {subtitle}
                    </p>
                )}
                <div className={`mt-6 h-[2px] w-24 bg-gradient-to-r from-amber-400 to-transparent ${align === 'center' ? 'mx-auto' : ''}`} />
            </motion.div>
        </div>
    )
}
