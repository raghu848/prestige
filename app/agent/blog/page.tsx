import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Trash2, Calendar, FileText } from 'lucide-react'
import DeleteBlogButton from '@/components/admin/DeleteBlogButton'

export default async function AdminBlogPage() {
    const supabase = await createClient()

    let posts: any[] = []

    if (supabase) {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Supabase Error in AdminBlogPage:', error)
        } else {
            posts = data || []
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-prestige-navy font-[family-name:var(--font-playfair)]">Blog Management</h1>
                    <p className="text-gray-500 mt-1">Manage your insights and architectural news</p>
                </div>
                <Link
                    href="/agent/blog/new"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-prestige-navy text-white font-bold rounded-xl hover:bg-prestige-navy/90 transition-all shadow-lg active:scale-95"
                >
                    <Plus size={20} />
                    Write New Post
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Post Details</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Date</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {posts.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">
                                        No blog posts found. Start sharing your expertise!
                                    </td>
                                </tr>
                            ) : (
                                posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-gray-50/30 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-prestige-gold/10 flex items-center justify-center text-prestige-gold flex-shrink-0">
                                                    <FileText size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-prestige-navy group-hover:text-prestige-gold transition-colors">{post.title}</p>
                                                    <p className="text-xs text-gray-400 truncate max-w-xs">{post.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${post.published_at
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {post.published_at ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Calendar size={14} />
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/agent/blog/${post.id}`}
                                                    className="p-2 text-gray-400 hover:text-prestige-navy hover:bg-gray-100 rounded-lg transition-all"
                                                    title="Edit Post"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <DeleteBlogButton id={post.id} title={post.title} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
