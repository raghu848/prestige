import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'

export default async function BlogPage() {
  const supabase = await createClient()

  let posts: any[] = []

  if (supabase) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Supabase Error in BlogPage:', error)
    } else {
      posts = data || []
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50/30">
      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center bg-prestige-navy overflow-hidden">
        {/* Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-prestige-gold/5 skew-x-12 transform translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-prestige-gold/5 -skew-x-12 transform -translate-x-1/2" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-prestige-gold/10 text-prestige-gold rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-prestige-gold/20">
              Knowledge Base
            </span>
            <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-playfair)] font-bold text-white mb-6">
              Insights & <span className="text-prestige-gold underline decoration-prestige-gold/30 underline-offset-8">Perspectives</span>
            </h1>
            <p className="text-xl text-gray-400 font-[family-name:var(--font-outfit)] max-w-xl leading-relaxed">
              Expert analysis on real estate trends, architectural movements, and luxury lifestyle within the heart of the city.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-24">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="text-gray-300" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-prestige-navy mb-2">The press is quiet today.</h2>
              <p className="text-gray-400">We are currently curating more insights. Please check back shortly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={post.featured_image_url || 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop'}
                      alt={post.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-prestige-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-[1px] bg-prestige-gold" />
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                        <Calendar size={14} className="mr-2 text-prestige-gold" />
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-prestige-navy mb-4 group-hover:text-prestige-gold transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-gray-500 font-[family-name:var(--font-outfit)] leading-relaxed mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-prestige-navy font-bold group/link"
                      >
                        <span className="relative pb-1">
                          Read Masterpiece
                          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-prestige-gold group-hover/link:w-full transition-all duration-300" />
                        </span>
                        <div className="ml-3 w-10 h-10 border border-gray-100 rounded-full flex items-center justify-center group-hover/link:bg-prestige-gold group-hover/link:border-prestige-gold group-hover/link:text-prestige-navy transition-all">
                          <ArrowRight size={18} />
                        </div>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}





