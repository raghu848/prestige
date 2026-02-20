'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative text-white overflow-hidden font-sans">
      {/* Background & Grain */}
      <div className="footer-bg-main absolute inset-0 z-0" />
      <div className="footer-grain-overlay" />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-16">

        {/* Main Grid */}
        <div className="footer-grid pt-8 lg:pt-12 pb-4 lg:pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Column 1: Brand */}
          <div className="flex flex-col">
            <Link href="/" className="inline-block mb-3">
              <div className="relative w-[150px] h-[50px]">
                <Image
                  src="/Prestige_Realty-01.png"
                  alt="Prestige Realty"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="brand-desc text-[13px] leading-relaxed text-[rgba(255,255,255,0.38)] max-w-[260px] mb-6 font-[family-name:var(--font-outfit)]">
              Your trusted partner in premium real estate. Delivering excellence across residential, commercial, and leasing projects since 1998.
            </p>
            <div className="flex gap-2.5 mb-2">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="footer-social-btn hover:scale-105 transition-transform">
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="footer-watermark hidden lg:block opacity-40 -mt-4">1998</div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <div className="footer-col-head font-medium font-[family-name:var(--font-outfit)]">Navigate</div>
            <ul className="flex flex-col gap-3 font-[family-name:var(--font-outfit)]">
              {[
                { name: 'Browse Projects', href: '/projects' },
                { name: 'Our Services', href: '/services' },
                { name: 'About Us', href: '/about' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="footer-nav-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <div className="footer-col-head font-medium font-[family-name:var(--font-outfit)]">Services</div>
            <ul className="flex flex-col gap-3 font-[family-name:var(--font-outfit)]">
              {[
                { name: 'Residential', href: '/projects?category=residential' },
                { name: 'Commercial', href: '/projects?category=commercial' },
                { name: 'Leasing', href: '/projects?category=leasing' },
                { name: 'Agent Login', href: '/agent/login' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="footer-nav-link">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <div className="footer-col-head font-medium font-[family-name:var(--font-outfit)]">Get in Touch</div>

            <div className="space-y-4 font-[family-name:var(--font-outfit)]">
              <div className="flex items-start gap-4">
                <div className="footer-contact-icon shadow-lg">
                  <MapPin size={15} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.32em] text-[rgba(255,255,255,0.22)] font-semibold mb-1">Office Address</span>
                  <span className="text-[13.5px] text-[rgba(255,255,255,0.6)] leading-relaxed">
                    Sector 5, Chandigarh<br />Punjab 160005, India
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="footer-contact-icon shadow-lg">
                  <Phone size={15} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.32em] text-[rgba(255,255,255,0.22)] font-semibold mb-1">Phone</span>
                  <a href="tel:+919876543210" className="text-[13.5px] text-[rgba(255,255,255,0.6)] hover:text-[#E8C97A] transition-colors font-medium">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="footer-contact-icon shadow-lg">
                  <Mail size={15} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.32em] text-[rgba(255,255,255,0.22)] font-semibold mb-1">Email</span>
                  <a href="mailto:info@prestigerealty.com" className="text-[13.5px] text-[rgba(255,255,255,0.6)] hover:text-[#E8C97A] transition-colors font-medium">
                    info@prestigerealty.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pb-6 font-[family-name:var(--font-outfit)]">
          <div className="footer-divider mb-4" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="font-[family-name:var(--font-bebas)] text-[0.9rem] tracking-[0.25em] text-[rgba(255,255,255,0.15)] select-none">
                PRESTIGE REALTY
              </span>
              <span className="text-[rgba(255,255,255,0.1)] text-xs hidden sm:inline">—</span>
              <span className="text-xs tracking-wider text-[rgba(255,255,255,0.22)]">
                © {currentYear} All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6 lg:gap-8">
              <Link href="/privacy" className="footer-nav-link text-[11.5px] border-none scale-90 sm:scale-100">
                Privacy Policy
              </Link>
              <span className="text-[rgba(255,255,255,0.12)] text-xs select-none">·</span>
              <Link href="/terms" className="footer-nav-link text-[11.5px] border-none scale-90 sm:scale-100">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
