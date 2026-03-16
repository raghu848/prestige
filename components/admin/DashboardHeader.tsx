'use client'

import Link from 'next/link'
import { Plus, LogOut, LayoutDashboard, Building2, MessageSquare } from 'lucide-react'
import { signOut } from '@/app/agent/login/actions'
import { usePathname } from 'next/navigation'

export default function DashboardHeader() {
    const pathname = usePathname()

    return (
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center gap-8">
                    <Link href="/agent/dashboard" className="flex flex-col">
                        <span className="text-2xl font-[family-name:var(--font-bebas)] tracking-[0.15em] text-prestige-navy">
                            PRESTIGE
                        </span>
                        <span className="text-[10px] tracking-[0.3em] uppercase text-prestige-gold font-light -mt-1">
                            Admin Portal
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1 bg-gray-50 p-1 rounded-xl">
                        <Link
                            href="/agent/dashboard"
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${pathname === '/agent/dashboard'
                                ? 'bg-white text-prestige-navy shadow-sm'
                                : 'text-gray-500 hover:text-prestige-navy'
                                }`}
                        >
                            <LayoutDashboard size={18} />
                            Overview
                        </Link>
                        <Link
                            href="/agent/projects"
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${pathname.startsWith('/agent/projects') && pathname !== '/agent/projects/new'
                                ? 'bg-white text-prestige-navy shadow-sm'
                                : 'text-gray-500 hover:text-prestige-navy'
                                }`}
                        >
                            <Building2 size={18} />
                            Properties
                        </Link>
                        <Link
                            href="/agent/dashboard/inquiries"
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${pathname === '/agent/dashboard/inquiries'
                                ? 'bg-white text-prestige-navy shadow-sm'
                                : 'text-gray-500 hover:text-prestige-navy'
                                }`}
                        >
                            <MessageSquare size={18} />
                            Inquiries
                        </Link>
                        <Link
                            href="/agent/blog"
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${pathname.startsWith('/agent/blog')
                                ? 'bg-white text-prestige-navy shadow-sm'
                                : 'text-gray-500 hover:text-prestige-navy'
                                }`}
                        >
                            <span className="w-4 h-4 rounded-sm border-2 border-current" />
                            Blog
                        </Link>
                    </nav>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/agent/projects/new"
                        className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-prestige-gold text-prestige-navy text-[13px] font-bold tracking-wider uppercase rounded-lg hover:bg-prestige-gold/90 transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                        <Plus size={18} />
                        Submit Property
                    </Link>

                    <button
                        onClick={() => signOut()}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        title="Sign Out"
                    >
                        <LogOut size={20} />
                    </button>

                    {/* Mobile Menu Icon (Simplified for now) */}
                    <Link href="/agent/projects/new" className="sm:hidden p-2.5 bg-prestige-gold text-prestige-navy rounded-lg shadow-sm">
                        <Plus size={20} />
                    </Link>
                </div>
            </div>
        </header>
    )
}
