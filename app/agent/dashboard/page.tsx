'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus, Eye, Edit, Trash2, TrendingUp, FileText, Users } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function AgentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [inquiries, setInquiries] = useState<any[]>([])
  const [stats, setStats] = useState({
    activeProjects: 0,
    inquiries: 0,
    views: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/agent/login')
      return
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
        fetchDashboardData(token)
      } else {
        router.push('/agent/login')
      }
    } catch (error) {
      router.push('/agent/login')
    }
  }

  const fetchDashboardData = async (token: string) => {
    try {
      const [projectsRes, inquiriesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/projects`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/inquiries`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      const projectsData = await projectsRes.json()
      const inquiriesData = await inquiriesRes.json()

      setProjects(projectsData.projects || [])
      setInquiries(inquiriesData.inquiries || [])
      setStats({
        activeProjects: projectsData.projects?.length || 0,
        inquiries: inquiriesData.inquiries?.length || 0,
        views: 0, // Would come from analytics
      })
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-display font-bold text-prestige-navy">
            Dashboard
          </h1>
          <Link href="/agent/projects/new" className="button-89 flex items-center text-decoration-none">
            <Plus className="mr-2" size={20} />
            New Project
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Active Projects</p>
                <p className="text-3xl font-bold text-prestige-navy">{stats.activeProjects}</p>
              </div>
              <FileText className="text-prestige-gold" size={40} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Inquiries</p>
                <p className="text-3xl font-bold text-prestige-navy">{stats.inquiries}</p>
              </div>
              <Users className="text-prestige-gold" size={40} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Views</p>
                <p className="text-3xl font-bold text-prestige-navy">{stats.views}</p>
              </div>
              <TrendingUp className="text-prestige-gold" size={40} />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Projects Table */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-prestige-navy mb-4">My Projects</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 text-gray-600">Name</th>
                    <th className="text-left py-3 text-gray-600">Category</th>
                    <th className="text-left py-3 text-gray-600">Status</th>
                    <th className="text-left py-3 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b">
                      <td className="py-3 font-semibold">{project.name}</td>
                      <td className="py-3 capitalize">{project.category}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${project.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                            project.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                          }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex space-x-2">
                          <Link
                            href={`/projects/${project.category}/${project.slug}`}
                            className="text-prestige-gold hover:text-prestige-navy"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            href={`/agent/projects/${project.id}/edit`}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Edit size={18} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inquiries Table */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-prestige-navy mb-4">Recent Inquiries</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 text-gray-600">Name</th>
                    <th className="text-left py-3 text-gray-600">Project</th>
                    <th className="text-left py-3 text-gray-600">Status</th>
                    <th className="text-left py-3 text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.slice(0, 5).map((inquiry) => (
                    <tr key={inquiry.id} className="border-b">
                      <td className="py-3 font-semibold">{inquiry.name}</td>
                      <td className="py-3 text-sm">{inquiry.project_name || 'N/A'}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${inquiry.status === 'new' ? 'bg-yellow-100 text-yellow-700' :
                            inquiry.status === 'contacted' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                          }`}>
                          {inquiry.status}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}





