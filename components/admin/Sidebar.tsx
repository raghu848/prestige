'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Home,
    Settings,
    LogOut,
    PlusCircle,
    MessageSquare,
    Building2
} from 'lucide-react'
import { signOut } from '@/app/agent/login/actions'
import { cn } from '@/lib/utils'

const navigation = [
    { name: 'Dashboard', href: '/agent/dashboard', icon: LayoutDashboard },
    { name: 'Manage Properties', href: '/agent/projects', icon: Building2 },
    { name: 'Add Property', href: '/agent/projects/new', icon: PlusCircle },
    { name: 'Inquiries', href: '/agent/dashboard/inquiries', icon: MessageSquare },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col w-64 bg-prestige-navy text-white min-h-screen">
            <div className="p-6">
                <h1 className="text-2xl font-display font-bold text-prestige-gold">
                    PRESTIGE
                </h1>
                <p className="text-xs text-gray-400">Admin Portal</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                            pathname === item.href
                                ? "bg-prestige-gold text-prestige-navy"
                                : "text-gray-300 hover:bg-white/10 hover:text-white"
                        )}
                    >
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/10">
                <button
                    onClick={() => signOut()}
                    className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-300 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Sign Out
                </button>
            </div>
        </div>
    )
}
