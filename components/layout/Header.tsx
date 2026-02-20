'use client'
// Re-triggering HMR update

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
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
      {/* TOP BAR */}
      <div className="wood-top-bar fixed top-0 left-0 right-0 z-[100] border-b border-[#C4843B40] h-[33px] flex items-center">
        <div className="container-custom w-full flex justify-between items-center">
          <span className="hidden md:block text-[10.5px] tracking-[0.22em] text-[rgba(196,132,59,0.65)] uppercase italic font-cormorant-garamond">
            Crafting Exceptional Living Spaces Since 1998
          </span>
          <div className="hidden md:flex items-center space-x-5 ml-0">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 text-[10.5px] tracking-[0.12em] text-[rgba(245,225,185,0.6)] hover:text-[#C4843B] uppercase transition-colors font-cormorant-garamond no-underline">
              <Phone size={11} className="stroke-2" />
              +91 98765 43210
            </a>
            <span className="text-[rgba(196,132,59,0.25)] text-[10px]">|</span>
            <a href="mailto:hello@prestigerealty.com" className="flex items-center gap-1.5 text-[10.5px] tracking-[0.12em] text-[rgba(245,225,185,0.6)] hover:text-[#C4843B] uppercase transition-colors font-cormorant-garamond no-underline">
              <Mail size={11} className="stroke-2" />
              hello@prestigerealty.com
            </a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header
        className={`fixed left-0 right-0 z-[99] transition-all duration-400 wood-header-gradient overflow-hidden border-b border-[#C4843B4d] ${isScrolled ? 'shadow-[0_6px_50px_rgba(0,0,0,0.65)]' : 'shadow-[0_4px_40px_rgba(0,0,0,0.55)]'
          }`}
        style={{ top: '33px' }}
      >
        {/* Wood Grain Overlay */}
        <div className="wood-grain-overlay absolute inset-0 pointer-events-none opacity-100 z-0" />
        {/* Vignette */}
        <div className="wood-vignette absolute inset-0 pointer-events-none z-0" />

        <div className="container-custom relative z-10 h-[76px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none gap-[3px] group no-underline relative">
            <div className="relative w-[180px] h-[60px]">
              <Image
                src="/Prestige_Realty-01.png"
                alt="Prestige Realty"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center">
            {navLinks.map((link, index) => (
              <div key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className={`wood-nav-link relative px-[18px] py-2 text-[12px] transition-colors duration-250 no-underline ${pathname === link.href ? 'active font-bold text-[#C4843B]' : ''
                    }`}
                >
                  {link.label}
                  {/* Underline effect */}
                  <span className={`absolute bottom-[2px] left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#C4843B] to-transparent transition-all duration-300 ${pathname === link.href ? 'w-[calc(100%-24px)]' : 'w-0 hover:w-[calc(100%-24px)]'
                    }`} />
                </Link>
                {index < navLinks.length - 1 && (
                  <span className="w-[1px] h-[14px] bg-[rgba(196,132,59,0.18)]" />
                )}
              </div>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden sm:inline-block wood-cta-btn px-[26px] py-[11px] text-[10.5px] font-bold shadow-[0_2px_20px_rgba(196,132,59,0.35)] no-underline">
              Book Visit
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#C4843B] border border-[rgba(196,132,59,0.35)] rounded-[2px] hover:bg-[rgba(196,132,59,0.1)] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Bottom Rule */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(196,132,59,0.6)] to-transparent relative z-10 opacity-35" />

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[linear-gradient(180deg,#3D1A0A_0%,#1A0800_100%)] border-t border-[rgba(196,132,59,0.15)] relative z-10"
            >
              <div className="container-custom py-6 pb-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-[14px] text-[14px] tracking-[0.22em] uppercase font-cormorant-garamond border-b border-[rgba(196,132,59,0.1)] transition-all relative pl-0 hover:pl-3 hover:text-[#C4843B] no-underline ${pathname === link.href ? 'text-[#C4843B] pl-3' : 'text-[rgba(245,225,185,0.82)]'
                      }`}
                  >
                    {/* Active indicator */}
                    {(pathname === link.href) && (
                      <span className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-[3px] h-[60%] bg-[#C4843B] rounded-r-[2px]" />
                    )}
                    {link.label}
                  </Link>
                ))}

                <div className="mt-5 pt-[14px] border-t border-[rgba(196,132,59,0.15)] flex items-center gap-2 text-[12px] tracking-[0.12em] text-[rgba(245,225,185,0.55)] font-cormorant-garamond">
                  <Phone size={14} />
                  +91 98765 43210
                </div>

                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-5 block text-center py-[13px] px-6 bg-gradient-to-br from-[#C4843B] to-[#A06828] text-[#1A0800] text-[11px] tracking-[0.28em] uppercase font-bold font-cormorant-garamond rounded-[2px] shadow-[0_4px_24px_rgba(196,132,59,0.3)] no-underline"
                >
                  Schedule a Property Visit
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
