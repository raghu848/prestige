'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[100] transition-all duration-500 flex justify-center px-4 sm:px-6 lg:px-8 ${isScrolled ? 'top-4' : 'top-0'
          }`}
      >
        {/* Main Floating Container */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`relative w-full max-w-7xl transition-all duration-500 ease-in-out flex items-center justify-between px-6 md:px-10 
            ${isScrolled
              ? 'h-[70px] rounded-full bg-slate-950/75 backdrop-blur-2xl border border-amber-500/20 shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
              : 'h-[80px] bg-slate-950/45 backdrop-blur-md border-b border-white/5'
            }`}
        >
          {/* LOGO */}
          <Link href="/" className="relative z-10 flex-shrink-0">
            <div className="relative w-[150px] h-[50px] transition-transform duration-300 hover:scale-105">
              <Image
                src="/Prestige_Realty-01.png"
                alt="Prestige Realty"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* DESKTOP NAV - Pill Style */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-full no-underline ${isActive ? 'text-amber-200' : 'text-white/70 hover:text-amber-100'
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-yellow-600/20 border border-amber-500/30 rounded-full z-0"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className="hidden xl:flex items-center gap-2 text-white/70 hover:text-amber-300 transition-colors group"
            >
              <div className="p-2 bg-white/5 border border-white/10 rounded-full group-hover:bg-amber-500/10 group-hover:border-amber-500/30 group-hover:scale-115 group-hover:rotate-12 transition-all">
                <Phone size={16} className="text-white group-hover:text-amber-400 transition-colors" />
              </div>
              <span className="text-sm font-semibold transition-colors group-hover:text-amber-200">+91 98765 43210</span>
            </a>

            <Link
              href="/contact"
              className="group relative hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-6 py-3 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 font-bold shadow-[0_4px_20px_rgba(245,158,11,0.25)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.45)]"
            >
              <span className="text-sm font-extrabold relative z-10 tracking-wide">Book a Visit</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 relative z-10" />
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-full bg-white/5 text-white hover:bg-amber-500/25 hover:text-amber-300 transition-colors border border-white/10"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className={`absolute left-4 right-4 bg-slate-950/90 backdrop-blur-2xl rounded-[32px] border border-amber-500/20 shadow-2xl p-8 lg:hidden z-[101] transition-all duration-500 ${
                isScrolled ? 'top-[96px]' : 'top-[90px]'
              }`}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-semibold no-underline transition-colors ${pathname === link.href ? 'text-amber-400' : 'text-white hover:text-amber-200'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-white/10 my-4" />
                <div className="flex flex-col gap-4">
                  <p className="text-white/50 text-sm uppercase tracking-widest font-bold">Contact Us</p>
                  <a href="tel:+919876543210" className="text-xl font-medium text-amber-200 hover:text-amber-300 no-underline">+91 98765 43210</a>
                  <Link
                    href="/contact"
                    className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-center py-4 rounded-2xl font-black tracking-widest uppercase text-xs no-underline hover:from-amber-300 hover:to-amber-400 transition-all shadow-[0_4px_15px_rgba(245,158,11,0.25)]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Schedule Tour
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}