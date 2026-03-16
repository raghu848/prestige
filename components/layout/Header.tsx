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
              ? 'h-[70px] rounded-full bg-[#494545cc] backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
              : 'h-[90px] bg-[#494545cc] border-b border-white/10'
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
          <nav className="hidden lg:flex items-center gap-1 bg-white/10 p-1 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-full no-underline ${isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/20 rounded-full z-0"
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
              className="hidden xl:flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <div className="p-2 bg-white/10 rounded-full">
                <Phone size={16} />
              </div>
              <span className="text-sm font-semibold">+91 98765 43210</span>
            </a>

            <Link
              href="/contact"
              className="group relative hidden sm:flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full overflow-hidden transition-all hover:pr-8 active:scale-95"
            >
              <span className="text-sm font-bold relative z-10">Book a Visit</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-prestige-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
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
              className="absolute top-[100px] left-4 right-4 bg-[#494545]/95 backdrop-blur-2xl rounded-[32px] border border-white/10 shadow-2xl p-8 lg:hidden z-[101]"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-2xl font-semibold no-underline ${pathname === link.href ? 'text-prestige-gold' : 'text-white'
                      }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <hr className="border-white/10 my-4" />
                <div className="flex flex-col gap-4">
                  <p className="text-white/50 text-sm uppercase tracking-widest font-bold">Contact Us</p>
                  <a href="tel:+919876543210" className="text-xl font-medium text-white no-underline">+91 98765 43210</a>
                  <Link
                    href="/contact"
                    className="w-full bg-prestige-gold text-prestige-navy text-center py-4 rounded-2xl font-bold no-underline"
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