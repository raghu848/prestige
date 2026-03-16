'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Save, X, Loader2, Image as ImageIcon, Type, Link as LinkIcon, AlignLeft } from 'lucide-react'
import toast from 'react-hot-toast'

interface BlogFormProps {
    initialData?: {
        id?: string
        title: string
        slug: string
        excerpt: string
        content: string
        featured_image_url: string
        published_at?: string | null
    }
}

export default function BlogForm({ initialData }: BlogFormProps) {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        featured_image_url: initialData?.featured_image_url || '',
        is_published: !!initialData?.published_at
    })

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        setFormData(prev => ({
            ...prev,
            title,
            slug: initialData?.id ? prev.slug : generateSlug(title)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const payload = {
            title: formData.title,
            slug: formData.slug,
            excerpt: formData.excerpt,
            content: formData.content,
            featured_image_url: formData.featured_image_url,
            published_at: formData.is_published ? (initialData?.published_at || new Date().toISOString()) : null,
            updated_at: new Date().toISOString()
        }

        try {
            if (!supabase) {
                throw new Error('Supabase client failed to initialize. Check your environment variables.');
            }

            console.log('Attempting to save payload:', payload);

            let result;
            if (initialData?.id) {
                result = await supabase
                    .from('blog_posts')
                    .update(payload)
                    .eq('id', initialData.id)
            } else {
                result = await supabase
                    .from('blog_posts')
                    .insert([payload])
            }

            console.log('Supabase Response:', result);

            if (result.error) throw result.error

            toast.success(`Insight successfully ${initialData?.id ? 'updated' : 'published'}!`)
            router.push('/agent/blog')
            router.refresh()
        } catch (error: any) {
            console.error('--- BLOG SAVE ERROR DEBUG START ---');
            console.error('Raw Error Object:', error);
            console.error('Error Type:', typeof error);
            if (error && typeof error === 'object') {
                console.error('Error Keys:', Object.keys(error));
                console.error('Error Message:', error.message);
                console.error('Error Details:', error.details);
                console.error('Error Hint:', error.hint);
                console.error('Error Code:', error.code);
            }
            console.error('--- BLOG SAVE ERROR DEBUG END ---');

            const errorMessage = error?.message || error?.details || 'Check console for debug logs (Possible uuid_generate_v4 or RLS issue)';
            toast.error('Failed to save insight: ' + errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl space-y-8 pb-20">
            {/* Header / Actions Sidebar Style */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                            <Type size={14} className="text-prestige-gold" />
                            Post Title
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={handleTitleChange}
                            placeholder="e.g., The Future of Chandigarh Architecture"
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-prestige-gold/20 text-prestige-navy font-bold text-lg placeholder:text-gray-300 transition-all"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                            <LinkIcon size={14} className="text-prestige-gold" />
                            URL Slug
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.slug}
                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                            className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-prestige-gold/20 text-sm text-gray-500 font-medium"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                            <ImageIcon size={14} className="text-prestige-gold" />
                            Featured Image URL
                        </label>
                        <input
                            type="url"
                            value={formData.featured_image_url}
                            onChange={(e) => setFormData(prev => ({ ...prev, featured_image_url: e.target.value }))}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-prestige-gold/20 text-sm"
                        />
                    </div>
                </div>

                {/* Excerpt */}
                <div>
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        <AlignLeft size={14} className="text-prestige-gold" />
                        Excerpt / Summary
                    </label>
                    <textarea
                        required
                        rows={3}
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="A brief summary for the blog card..."
                        className="w-full px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-prestige-gold/20 text-sm leading-relaxed"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                        Full Content (supports text)
                    </label>
                    <textarea
                        required
                        rows={12}
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Write your masterpiece here..."
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-prestige-gold/20 text-prestige-navy font-medium leading-relaxed"
                    />
                </div>

                {/* Status Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div>
                        <p className="font-bold text-prestige-navy">Publish immediately?</p>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">Visibility: {formData.is_published ? 'Public' : 'Draft'}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, is_published: !prev.is_published }))}
                        className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${formData.is_published ? 'bg-prestige-gold' : 'bg-gray-200'
                            }`}
                    >
                        <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform ${formData.is_published ? 'translate-x-6' : 'translate-x-0'
                            }`} />
                    </button>
                </div>
            </div>

            {/* Sticky Actions */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-4 bg-white/80 backdrop-blur-xl border border-gray-100 rounded-full shadow-2xl z-[100]">
                <button
                    type="button"
                    onClick={() => router.push('/agent/blog')}
                    className="flex items-center gap-2 px-6 py-2.5 text-gray-500 font-bold hover:text-prestige-navy transition-colors"
                >
                    <X size={18} />
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-10 py-3 bg-prestige-navy text-white font-bold rounded-full hover:bg-prestige-navy/90 transition-all shadow-lg hover:shadow-prestige-navy/20 active:scale-95 disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                    ) : (
                        <Save size={20} />
                    )}
                    {initialData?.id ? 'Update Insight' : 'Publish Insight'}
                </button>
            </div>
        </form>
    )
}
