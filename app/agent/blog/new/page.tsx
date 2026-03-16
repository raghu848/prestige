import BlogForm from '@/components/admin/BlogForm'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewBlogPostPage() {
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
                    <h1 className="text-3xl font-bold text-prestige-navy font-[family-name:var(--font-playfair)]">Draft New Insight</h1>
                    <p className="text-gray-500">Share your latest architectural discovery</p>
                </div>
            </div>

            <BlogForm />
        </div>
    )
}
