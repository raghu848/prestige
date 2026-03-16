import { createClient } from '@/lib/supabase/server'
import { MessageSquare, Phone, Mail, Clock, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default async function InquiriesPage() {
    const supabase = await createClient()
    let inquiries = []

    if (!supabase) {
        console.warn('Supabase not configured. Using fallback inquiries.')
        inquiries = [
            {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                phone: '+1 234 567 8901',
                created_at: new Date().toISOString(),
                message: 'I am interested in the penthouse. Can we schedule a viewing?',
                properties: { title: 'Modern Sky Penthouse' }
            },
            {
                id: '2',
                name: 'Jane Smith',
                email: 'jane@example.com',
                phone: '+1 987 654 3210',
                created_at: new Date(Date.now() - 86400000).toISOString(),
                message: 'Looking for a villa in Chandigarh. Do you have any other options?',
                properties: { title: 'The Golden Residence' }
            }
        ]
    } else {
        try {
            const { data, error } = await supabase
                .from('inquiries')
                .select('*, properties(title)')
                .order('created_at', { ascending: false })

            if (error) throw error;
            inquiries = data || []
        } catch (err: any) {
            console.error('Error fetching inquiries:', err.message || err);
            return (
                <div className="max-w-4xl mx-auto py-20 text-center">
                    <div className="inline-flex p-6 bg-rose-50 text-rose-500 rounded-3xl mb-8">
                        <MessageSquare size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-prestige-navy mb-4">Inquiries Load Failed</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        We couldn't retrieve the inquiries. This might be due to a paused Supabase project or a database connection error.
                    </p>
                    <div className="p-4 bg-gray-50 rounded-xl text-xs font-mono text-gray-500 border border-gray-100 inline-block text-left mb-8 max-w-full overflow-auto">
                        {err.message || 'Unknown database error'}
                    </div>
                    <div className="flex justify-center">
                        <Link href="/agent/dashboard" className="px-8 py-3 bg-prestige-navy text-white rounded-xl font-bold">
                            Return to Dashboard
                        </Link>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold text-prestige-navy">
                        Client Inquiries
                    </h1>
                    <p className="text-gray-500 mt-2 font-[family-name:var(--font-outfit)]">
                        Manage your leads and property engagement.
                    </p>
                </div>
                <Link
                    href="/agent/dashboard"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-100 bg-white text-gray-500 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-sm"
                >
                    <ArrowLeft size={18} />
                    Back to Insight
                </Link>
            </div>

            {/* inquiries List */}
            <div className="grid grid-cols-1 gap-6">
                {inquiries?.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-gray-100 p-24 text-center">
                        <div className="inline-flex p-5 bg-gray-50 rounded-2xl text-gray-300 mb-6">
                            <MessageSquare size={48} />
                        </div>
                        <h3 className="text-xl font-bold text-prestige-navy mb-2">No active leads</h3>
                        <p className="text-gray-400 max-w-sm mx-auto">When clients express interest in your properties, their inquiries will materialize here for your review.</p>
                    </div>
                ) : (
                    inquiries?.map((inquiry: any) => (
                        <div key={inquiry.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                            <div className="flex flex-col lg:flex-row">
                                {/* Meta Panel */}
                                <div className="lg:w-80 bg-gray-50/50 p-8 border-r border-gray-50 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 bg-prestige-navy text-prestige-gold rounded-xl flex items-center justify-center font-bold text-lg shadow-inner">
                                                {inquiry.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-prestige-navy text-lg leading-tight">{inquiry.name}</h3>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Potential Client</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                                                <Mail size={16} className="text-prestige-gold" />
                                                <span className="truncate">{inquiry.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                                                <Phone size={16} className="text-prestige-gold" />
                                                {inquiry.phone || 'N/A'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                                            <Clock size={12} />
                                            Received {new Date(inquiry.created_at).toLocaleDateString(undefined, {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Panel */}
                                <div className="flex-1 p-8 lg:p-10">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="bg-indigo-50/50 px-4 py-2 rounded-xl border border-indigo-100 inline-flex items-center gap-2">
                                            <Home size={16} className="text-indigo-600" />
                                            <div className="text-xs font-bold text-indigo-900 uppercase tracking-wide">
                                                Interest in: <span className="text-indigo-600">{inquiry.properties?.title || 'General Property Inquiry'}</span>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest">
                                            New Message
                                        </span>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute top-0 left-0 -ml-4 -mt-2 opacity-5 text-prestige-navy">
                                            <MessageSquare size={64} />
                                        </div>
                                        <blockquote className="relative z-10 text-lg text-prestige-navy/80 font-[family-name:var(--font-outfit)] leading-relaxed italic">
                                            "{inquiry.message}"
                                        </blockquote>
                                    </div>

                                    <div className="mt-10 flex gap-4">
                                        <a href={`mailto:${inquiry.email}`} className="px-6 py-3 bg-prestige-navy text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2">
                                            <Mail size={16} />
                                            Draft Reply
                                        </a>
                                        {inquiry.phone && (
                                            <a href={`tel:${inquiry.phone}`} className="px-6 py-3 border border-gray-100 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all flex items-center gap-2">
                                                <Phone size={16} />
                                                Contact Client
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
