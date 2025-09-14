'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { useRegistration } from '@/contexts/RegistrationContext'
import { Contest, CONTESTS, RegistrationData } from '@/lib/types'

export function RegistrationModal() {
  const { isModalOpen, selectedContest, closeModal } = useRegistration()
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    age: undefined,
    whatsapp: '',
    email: '',
    contest: selectedContest || Contest.NONE,
    message: '',
    numberOfChildren: undefined,
    photoUrl: '',
    videoUrl: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const photoInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    // Special handling for name field - only allow letters and spaces
    if (name === 'name') {
      const filteredValue = value.replace(/[^a-zA-Z\s]/g, '')
      setFormData(prev => ({
        ...prev,
        [name]: filteredValue
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: (name === 'age' || name === 'numberOfChildren') ? (value ? parseInt(value) : undefined) : value
      }))
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleContestChange = (contest: Contest) => {
    setFormData(prev => ({ ...prev, contest }))
  }

  const handleFileUpload = async (file: File, type: 'photo' | 'video') => {
    if (!file) return

    // Validate file size and type
    const maxSize = type === 'photo' ? 5 * 1024 * 1024 : 10 * 1024 * 1024 // 5MB for photos, 10MB for videos
    const allowedTypes = type === 'photo' 
      ? ['image/jpeg', 'image/png', 'image/webp']
      : ['video/mp4', 'video/webm', 'video/quicktime']

    if (file.size > maxSize) {
      setErrors(prev => ({ 
        ...prev, 
        [type]: `File size must be less than ${type === 'photo' ? '5MB' : '10MB'}` 
      }))
      return
    }

    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({ 
        ...prev, 
        [type]: `Invalid file type. Please upload ${type === 'photo' ? 'JPEG, PNG, or WebP' : 'MP4, WebM, or MOV'}` 
      }))
      return
    }

    try {
      // In a real app, you would upload to Cloudinary here
      // For now, we'll simulate the upload
      const mockUrl = URL.createObjectURL(file)
      setFormData(prev => ({
        ...prev,
        [type === 'photo' ? 'photoUrl' : 'videoUrl']: mockUrl
      }))
    } catch {
      setErrors(prev => ({ 
        ...prev, 
        [type]: 'Failed to upload file. Please try again.' 
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters and spaces'
    }

    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age (1-120)'
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required'
    } else if (!/^[6-9]\d{9}$/.test(formData.whatsapp.replace(/\D/g, ''))) {
      newErrors.whatsapp = 'Please enter a valid 10-digit mobile number'
    }

    if (formData.email && formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address (e.g., user@gmail.com)'
    }

    // Contest-specific validations
    if (formData.contest === Contest.SUPERMOM) {
      if (!formData.numberOfChildren || formData.numberOfChildren < 1 || formData.numberOfChildren > 20) {
        newErrors.numberOfChildren = 'Please enter the number of children (1-20)'
      }
    }

    // Message is now optional for all contests

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            age: undefined,
            whatsapp: '',
            email: '',
            contest: Contest.NONE,
            message: '',
            numberOfChildren: undefined,
            photoUrl: '',
            videoUrl: ''
          })
          setSubmitStatus('idle')
          closeModal()
        }, 3000)
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      age: undefined,
      whatsapp: '',
      email: '',
      contest: Contest.NONE,
      message: '',
      numberOfChildren: undefined,
      photoUrl: '',
      videoUrl: ''
    })
    setErrors({})
    setSubmitStatus('idle')
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Register for Diwali Carnival
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Contest Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you want to join a contest?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.values(CONTESTS).filter(contest => contest.id !== Contest.NONE).map((contest) => (
                    <motion.button
                      key={contest.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleContestChange(contest.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData.contest === contest.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900">{contest.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{contest.shortDescription}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age || ''}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.age ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                    required
                  />
                  {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.whatsapp ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="9876543210"
                  />
                  {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Contest-specific fields */}
              {formData.contest !== Contest.NONE && (
                <div className="space-y-4">
                  {/* Number of Children field for SuperMom contest */}
                  {formData.contest === Contest.SUPERMOM && (
                    <div>
                      <label htmlFor="numberOfChildren" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Children *
                      </label>
                      <input
                        type="number"
                        id="numberOfChildren"
                        name="numberOfChildren"
                        value={formData.numberOfChildren || ''}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                          errors.numberOfChildren ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter number of children"
                        min="1"
                        max="20"
                        required
                      />
                      {errors.numberOfChildren && <p className="text-red-500 text-sm mt-1">{errors.numberOfChildren}</p>}
                    </div>
                  )}

                  {/* Message field - now optional */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Why do you want to join this contest? (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Tell us why you want to participate..."
                    />
                  </div>
                </div>
              )}

              {/* File Uploads */}
              {formData.contest !== Contest.NONE && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Photo (Optional)
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'photo')}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => photoInputRef.current?.click()}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Choose Photo</span>
                      </button>
                      {formData.photoUrl && (
                        <span className="text-green-600 text-sm flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Photo uploaded
                        </span>
                      )}
                    </div>
                    {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Video (Optional)
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'video')}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => videoInputRef.current?.click()}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
                      >
                        <Upload className="h-4 w-4" />
                        <span>Choose Video</span>
                      </button>
                      {formData.videoUrl && (
                        <span className="text-green-600 text-sm flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Video uploaded
                        </span>
                      )}
                    </div>
                    {errors.video && <p className="text-red-500 text-sm mt-1">{errors.video}</p>}
                  </div>
                </div>
              )}

              {/* Submit Status */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-green-800">Registration successful! We&apos;ll contact you soon.</p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <p className="text-red-800">Registration failed. Please try again.</p>
                </motion.div>
              )}

              {/* Submit Button */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
