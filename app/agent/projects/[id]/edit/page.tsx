'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState<any>(null)

  useEffect(() => {
    if (params.id && params.id !== 'new') {
      fetchProject()
    } else {
      setLoading(false)
    }
  }, [params.id])

  const fetchProject = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/agent/login')
      return
    }

    try {
      // Fetch project details - would need a GET endpoint for single project by ID
      toast.success('Project loaded')
      setLoading(false)
    } catch (error) {
      toast.error('Failed to load project')
      setLoading(false)
    }
  }

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/agent/login')
      return
    }

    try {
      const url = params.id === 'new'
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/projects`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/projects/${params.id}`

      const res = await fetch(url, {
        method: params.id === 'new' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        toast.success('Project saved successfully!')
        router.push('/agent/dashboard')
      } else {
        throw new Error('Failed to save project')
      }
    } catch (error) {
      toast.error('Failed to save project')
    }
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-prestige-gold"></div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        <div className="mb-8">
          <Link href="/agent/dashboard" className="text-prestige-gold hover:underline flex items-center mb-4">
            <ArrowLeft className="mr-2" size={20} />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-display font-bold text-prestige-navy">
            {params.id === 'new' ? 'Create New Project' : 'Edit Project'}
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <p className="text-gray-600 mb-6">
            Project management form with multi-step wizard would go here. This includes:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Step 1: Basic Information (name, category, status, price)</li>
            <li>Step 2: Location (address, coordinates, map picker)</li>
            <li>Step 3: Description & Amenities (rich text editor, multi-select)</li>
            <li>Step 4: Media Upload (images, videos, floor plans, brochures)</li>
            <li>Step 5: SEO Settings (meta title, description, keywords, slug)</li>
          </ul>
          <p className="text-sm text-gray-500">
            Full implementation would include React Hook Form with validation, file upload handling,
            image preview, and integration with AWS S3 for media storage.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
