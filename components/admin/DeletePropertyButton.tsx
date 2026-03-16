'use client'

import { Trash2, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function DeletePropertyButton({ id, title }: { id: string, title: string }) {
    const [deleting, setDeleting] = useState(false)
    const supabase = createClient()
    if (!supabase) {
        return (
            <button
                disabled
                className="p-2 text-gray-300 cursor-not-allowed"
                title="Supabase not configured"
            >
                <Trash2 size={18} />
            </button>
        )
    }
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            return
        }

        setDeleting(true)
        try {
            const { error } = await supabase
                .from('properties')
                .delete()
                .eq('id', id)

            if (error) throw error

            toast.success('Property deleted')
            router.refresh()
        } catch (error: any) {
            toast.error('Error: ' + error.message)
        } finally {
            setDeleting(false)
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
            title="Delete"
        >
            {deleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
        </button>
    )
}
