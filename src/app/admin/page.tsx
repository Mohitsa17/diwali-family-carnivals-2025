'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Search, Eye, Lock, Users, Calendar, Phone, Mail, ExternalLink } from 'lucide-react'
import { Contest } from '@/lib/types'

interface Registration {
  id: string
  name: string
  age?: number
  whatsapp: string
  email?: string
  contest: Contest
  message?: string
  numberOfChildren?: number
  photoUrl?: string
  videoUrl?: string
  createdAt: string
  ipAddress?: string
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [allRegistrations, setAllRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContest, setSelectedContest] = useState<Contest | 'ALL'>('ALL')
  const [activeCard, setActiveCard] = useState<Contest | 'ALL'>('ALL')
  const [viewItem, setViewItem] = useState<Registration | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    byContest: {} as Record<Contest, number>
  })

  const authenticate = async () => {
    if (!password) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/admin/registrations', {
        headers: {
          'x-admin-secret': password
        }
      })

      if (response.ok) {
        const data = await response.json()
        setRegistrations(data.data)
        setAllRegistrations(data.data)
        setIsAuthenticated(true)
        calculateStats(data.data)
      } else {
        setError('Invalid password')
      }
    } catch {
      setError('Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (data: Registration[]) => {
    const total = data.length
    const byContest = data.reduce((acc, reg) => {
      acc[reg.contest] = (acc[reg.contest] || 0) + 1
      return acc
    }, {} as Record<Contest, number>)
    
    setStats({ total, byContest })
  }

  // Keep a one-time fetch above; further filtering is client-side to avoid refresh loops

  const exportCSV = async () => {
    try {
      const params = new URLSearchParams()
      if (selectedContest !== 'ALL') params.append('contest', selectedContest)
      if (searchTerm) params.append('search', searchTerm)
      params.append('export', 'csv')

      const response = await fetch(`/api/admin/registrations?${params}`, {
        headers: {
          'x-admin-secret': password
        }
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `registrations-${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch {
      setError('Failed to export CSV')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      // Recalculate stats based on the full dataset only
      calculateStats(allRegistrations)
    }
  }, [isAuthenticated, allRegistrations])

  const filteredRegistrations = (allRegistrations.length ? allRegistrations : registrations).filter(reg => {
    const matchesSearch = !searchTerm || 
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.whatsapp.includes(searchTerm) ||
      (reg.email && reg.email.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesContest = selectedContest === 'ALL' || reg.contest === selectedContest
    
    return matchesSearch && matchesContest
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full"
        >
          <div className="text-center mb-8">
            <Lock className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Admin Access
            </h1>
            <p className="text-gray-600">
              Enter the admin password to access the dashboard
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); authenticate(); }} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter admin password"
                required
                suppressHydrationWarning
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Access Dashboard'}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage registrations and view event statistics
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              {typeof window !== 'undefined' && process.env.NEXT_PUBLIC_SHEETS_URL && (
                <a
                  href={process.env.NEXT_PUBLIC_SHEETS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Google Sheet
                </a>
              )}
              <button
                onClick={exportCSV}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6"
        >
          <button
            onClick={() => {
              setSelectedContest('ALL')
              setActiveCard('ALL')
            }}
            className={`bg-white rounded-2xl shadow-lg p-6 text-left border-2 ${
              activeCard === 'ALL' ? 'border-orange-500' : 'border-transparent'
            }`}
          >
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Registrations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </button>

          {(['SUPERMOM','CUTESTBABY','SENIORCITIZEN','GENERAL'] as const).map((contestKey) => (
            <button
              key={contestKey}
              onClick={() => {
                setSelectedContest(contestKey as Contest)
                setActiveCard(contestKey as Contest)
              }}
              className={`bg-white rounded-2xl shadow-lg p-6 text-left border-2 ${
                activeCard === contestKey ? 'border-orange-500' : 'border-transparent'
              }`}
            >
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-orange-500 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">{contestKey}</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.byContest[contestKey as Contest] || 0}</p>
                </div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, phone, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
            <div className="md:w-64">
              <select
                value={selectedContest}
                onChange={(e) => setSelectedContest(e.target.value as Contest | 'ALL')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="ALL">All Contests</option>
                <option value="NONE">General Registration</option>
                <option value="SUPERMOM">Super Mom</option>
                <option value="CUTESTBABY">Cutest Baby</option>
                <option value="SENIORCITIZEN">Senior Citizens</option>
                <option value="GENERAL">General Join</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Registrations Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {registration.name}
                        </div>
                        {registration.age && (
                          <div className="text-sm text-gray-500">
                            Age: {registration.age}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{registration.whatsapp}</span>
                      </div>
                      {registration.email && (
                        <div className="flex items-center space-x-2 mt-1">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{registration.email}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        registration.contest === 'NONE' 
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {registration.contest}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(registration.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={() => setViewItem(registration)} className="text-orange-600 hover:text-orange-900 flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRegistrations.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No registrations found</p>
            </div>
          )}
        </motion.div>

        {/* Detail Modal */}
        {viewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewItem(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Registration Details</h3>
                <button onClick={() => setViewItem(null)} className="text-gray-500 hover:text-gray-700">✕</button>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <div><span className="font-semibold">Name:</span> {viewItem.name}</div>
                {viewItem.age && <div><span className="font-semibold">Age:</span> {viewItem.age}</div>}
                <div><span className="font-semibold">WhatsApp:</span> {viewItem.whatsapp}</div>
                {viewItem.email && <div><span className="font-semibold">Email:</span> {viewItem.email}</div>}
                <div><span className="font-semibold">Contest:</span> {viewItem.contest}</div>
                {viewItem.numberOfChildren && <div><span className="font-semibold">Number of Children:</span> {viewItem.numberOfChildren}</div>}
                {viewItem.message && <div><span className="font-semibold">Message:</span> {viewItem.message}</div>}
                {viewItem.photoUrl && (
                  <div className="space-y-1">
                    <span className="font-semibold">Photo:</span> <a className="text-orange-600 underline" href={viewItem.photoUrl} target="_blank" rel="noreferrer">Open</a>
                    <div className="mt-2">
                      <img src={viewItem.photoUrl} alt="Uploaded" className="rounded-md max-h-48 border" />
                    </div>
                  </div>
                )}
                {viewItem.videoUrl && (
                  <div className="space-y-1">
                    <span className="font-semibold">Video:</span> <a className="text-orange-600 underline" href={viewItem.videoUrl} target="_blank" rel="noreferrer">Open</a>
                    <div className="mt-2">
                      <video src={viewItem.videoUrl} controls className="rounded-md max-h-48 border w-full"></video>
                    </div>
                  </div>
                )}
                <div><span className="font-semibold">Registered:</span> {new Date(viewItem.createdAt).toLocaleString()}</div>
                {viewItem.ipAddress && <div><span className="font-semibold">IP:</span> {viewItem.ipAddress}</div>}
              </div>
              <div className="mt-6 text-right">
                <button onClick={() => setViewItem(null)} className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
