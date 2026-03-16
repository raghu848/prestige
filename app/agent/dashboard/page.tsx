import { createClient } from '@/lib/supabase/server'
import { Building2, MessageSquare, Star, TrendingUp, Plus, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  let propertyCount = 0
  let inquiryCount = 0
  let recentInquiries = []

  if (!supabase) {
    console.warn('Supabase not configured. Using fallback data for Dashboard.')
    propertyCount = 12
    inquiryCount = 45
    recentInquiries = [
      {
        id: '1',
        name: 'John Doe',
        created_at: new Date().toISOString(),
        message: 'I am interested in the penthouse.',
        properties: { title: 'Modern Sky Penthouse' }
      },
      {
        id: '2',
        name: 'Jane Smith',
        created_at: new Date(Date.now() - 86400000).toISOString(),
        message: 'Looking for a villa in Chandigarh.',
        properties: { title: 'The Golden Residence' }
      }
    ]
  } else {
    try {
      const { count: pCount, error: pError } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })

      if (pError) throw pError;
      propertyCount = pCount || 0

      const { count: iCount, error: iError } = await supabase
        .from('inquiries')
        .select('*', { count: 'exact', head: true })

      if (iError) throw iError;
      inquiryCount = iCount || 0

      const { data: rInquiries, error: rError } = await supabase
        .from('inquiries')
        .select('*, properties(title)')
        .order('created_at', { ascending: false })
        .limit(5)

      if (rError) throw rError;
      recentInquiries = rInquiries || []
    } catch (err: any) {
      console.error('Supabase Query Error:', err.message || err);
      return (
        <div className="flex flex-col items-center justify-center py-20 bg-rose-50 rounded-3xl border border-rose-100 text-center px-6">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-6">
            <TrendingUp size={32} />
          </div>
          <h2 className="text-2xl font-bold text-rose-900 mb-2">Supabase Connection Error</h2>
          <p className="text-rose-700 max-w-md mb-6">
            The dashboard could not connect to your database. This is usually because your Supabase project is paused or the table schema is missing.
          </p>
          <div className="bg-white/50 p-4 rounded-xl text-xs font-mono text-rose-800 text-left border border-rose-200 mb-8 whitespace-pre-wrap">
            {err.message || 'Unknown connection error (Check 525 SSL or paused project)'}
          </div>
          <p className="text-sm text-rose-600 font-medium">
            Please restoration your project in the Supabase Dashboard and run the <code>database/schema.sql</code> and <code>database/supabase-seed.sql</code> scripts.
          </p>
        </div>
      )
    }
  }

  const stats = [
    { name: 'Total Properties', value: propertyCount, icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Total Inquiries', value: inquiryCount, icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Featured Listings', value: 3, icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Views Today', value: '1,248', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
  ]

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-[family-name:var(--font-playfair)] font-bold text-prestige-navy">
            Welcome back, Agent
          </h1>
          <p className="text-gray-500 mt-2 font-[family-name:var(--font-outfit)]">
            Here's a glimpse of your property portfolio performance today.
          </p>
        </div>
        <Link
          href="/agent/projects/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-prestige-navy text-white rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <Plus size={20} />
          Add New Property
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} transition-colors group-hover:bg-opacity-80`}>
                <stat.icon size={24} />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">{stat.name}</p>
                <p className="text-3xl font-bold text-prestige-navy mt-1 tracking-tight">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-prestige-navy flex items-center gap-2">
              <MessageSquare size={20} className="text-prestige-gold" />
              Recent Inquiries
            </h2>
            <Link href="/agent/dashboard/inquiries" className="text-sm font-semibold text-prestige-gold hover:text-prestige-navy transition-colors flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentInquiries?.length === 0 ? (
              <div className="py-16 text-center">
                <div className="inline-flex p-4 bg-gray-50 rounded-full text-gray-300 mb-4">
                  <MessageSquare size={32} />
                </div>
                <p className="text-gray-500 font-medium">No inquiries received yet.</p>
              </div>
            ) : (
              recentInquiries?.map((inquiry: any) => (
                <div key={inquiry.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-prestige-navy text-lg">{inquiry.name}</h3>
                      <p className="text-sm text-gray-500">
                        Interested in <span className="text-prestige-gold font-semibold">{inquiry.properties?.title || 'General Inquiry'}</span>
                      </p>
                    </div>
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-tighter">
                      {new Date(inquiry.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="mt-3 bg-white border border-gray-100 p-4 rounded-xl text-sm text-gray-600 italic leading-relaxed shadow-sm">
                    "{inquiry.message}"
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions / CTA Card */}
        <div className="bg-gradient-to-br from-prestige-navy to-[#0a1529] p-8 rounded-2xl shadow-xl text-white flex flex-col justify-between relative overflow-hidden group">
          {/* Decoration */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-prestige-gold/10 rounded-full blur-3xl group-hover:bg-prestige-gold/20 transition-all duration-700" />

          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10 text-prestige-gold">
              <Building2 size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-3 tracking-tight">Expand Your <br />Market Presence</h2>
            <p className="text-gray-400 font-medium leading-relaxed mb-8">
              Keep your property portfolio fresh and engaging. Add high-quality images and detailed overviews to attract premium clients.
            </p>
          </div>

          <div className="relative z-10 space-y-3">
            <Link
              href="/agent/projects/new"
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-prestige-gold text-prestige-navy rounded-xl font-bold hover:bg-white transition-all shadow-lg active:scale-95"
            >
              <Plus size={20} />
              Create Listing
            </Link>
            <Link
              href="/agent/projects"
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              Manage Inventory
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
