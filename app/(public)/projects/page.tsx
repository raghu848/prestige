import { createClient } from '@/lib/supabase/server'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectFilters from '@/components/projects/ProjectFilters'
import { motion } from 'framer-motion'
import { Suspense } from 'react'

export default async function ProjectsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const supabase = await createClient()

  // Parse filters from searchParams
  const category = (searchParams.category as string) || ''
  const status = (searchParams.status as string) || ''
  const minPrice = parseInt(searchParams.min_price as string) || 0
  const maxPrice = parseInt(searchParams.max_price as string) || 0
  const bhk = parseInt(searchParams.bhk as string) || 0
  const minArea = parseInt(searchParams.min_area as string) || 0
  const maxArea = parseInt(searchParams.max_area as string) || 0
  const page = parseInt(searchParams.page as string) || 1
  const limit = 12

  let properties: any[] = []
  let totalCount = 0

  if (supabase) {
    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' })

    // Apply filters
    if (category) query = query.eq('property_type', category)
    if (status) query = query.eq('status', status)
    if (minPrice > 0) query = query.gte('price', minPrice)
    if (maxPrice > 0) query = query.lte('price', maxPrice)
    if (bhk > 0) query = query.gte('bedrooms', bhk)
    if (minArea > 0) query = query.gte('area_sqft', minArea)
    if (maxArea > 0) query = query.lte('area_sqft', maxArea)

    // Pagination
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) {
      console.error('Supabase Error in ProjectsPage:', error)
    } else {
      properties = data || []
      totalCount = count || 0
    }
  }

  const totalPages = Math.ceil(totalCount / limit)

  // Map property data to ProjectCard expected format
  const projects = properties.map(p => ({
    id: p.id,
    name: p.title,
    slug: p.slug,
    category: p.property_type,
    city: p.city,
    hero_image_url: p.featured_image,
    price_min: p.price,
    status: p.status
  }))

  return (
    <div className="pt-20 min-h-screen bg-gray-50/50">
      <div className="container-custom py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-playfair)] font-bold text-prestige-navy mb-4">
            Exclusive <span className="text-prestige-gold">Projects</span>
          </h1>
          <p className="text-lg text-gray-500 font-[family-name:var(--font-outfit)] max-w-2xl">
            Discover our collection of premium architectural masterpieces and luxury residential developments.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-2xl" />}>
              <ProjectFilters />
            </Suspense>
          </aside>

          {/* Projects Grid */}
          <main className="lg:w-3/4">
            {projects.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
                <p className="text-gray-400 text-lg font-medium">No projects found matching your criteria.</p>
                <p className="text-sm text-gray-300 mt-2">Try adjusting your filters or clear all.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>

                {/* Detailed Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-2 py-8 border-t border-gray-100">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <a
                        key={pageNum}
                        href={`/projects?${new URLSearchParams({ ...Object.fromEntries(Object.entries(searchParams).filter(([_, v]) => v !== undefined) as [string, string][]), page: pageNum.toString() }).toString()}`}
                        className={`w-12 h-12 flex items-center justify-center rounded-xl font-bold transition-all ${page === pageNum
                          ? 'bg-prestige-navy text-white shadow-lg'
                          : 'bg-white text-prestige-navy border border-gray-100 hover:border-prestige-gold hover:text-prestige-gold'
                          }`}
                      >
                        {pageNum}
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}





