import { createClient } from '@/lib/supabase/server'
import BlogForm from '@/components/admin/BlogForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditBlogPostPage({
    params: paramsPromise,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await paramsPromise
    const supabase = await createClient()

    let post = null

    if (supabase) {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('id', id)
            .single()

        if (error || !data) {
            console.error('Error fetching post for edit:', error)
            return notFound()
        }
        post = data
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Link
                    href="/agent/blog"
                    className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-prestige-navy hover:shadow-md transition-all"
                >
                    <ChevronLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-prestige-navy font-[family-name:var(--font-playfair)]">Refine Insight</h1>
                    <p className="text-gray-500">Updating: <span className="text-prestige-gold font-bold">{post.title}</span></p>
                </div>
            </div>

            <BlogForm initialData={post} />
        </div>
    )
}
