'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Users, Award, Clock, Phone } from 'lucide-react'
import { CONTESTS, Contest } from '@/lib/types'
import { useRegistration } from '@/contexts/RegistrationContext'

export default function ContestsPage() {
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null)
  const { openModal } = useRegistration()

  const contestList = Object.values(CONTESTS).filter(contest => contest.id !== Contest.NONE)

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-yellow-500 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contest Details
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Choose from our exciting contests and showcase your talents!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contest Cards */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            {contestList.map((contest, index) => (
              <motion.div
                key={contest.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedContest(contest.id)}
              >
                <div className="relative h-64">
                  <Image
                    src={contest.sampleImage}
                    alt={contest.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {contest.title}
                    </h3>
                    <p className="text-orange-200">
                      {contest.shortDescription}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-2" />
                      <span className="text-sm">{contest.whoCanJoin}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Award className="h-5 w-5 mr-2" />
                      <span className="text-sm">Prizes Available</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      openModal(contest.id)
                    }}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-200"
                  >
                    Join This Contest
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Judges Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Esteemed Judges
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the distinguished panel of judges who will evaluate all contest entries with fairness and expertise.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Judge 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl shadow-lg text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">BS</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Shree Bhawna Shelke
              </h3>
              <p className="text-orange-600 font-semibold mb-4">
                Retired Principal
              </p>
              <p className="text-gray-600 text-sm">
                With decades of experience in education and community leadership, bringing wisdom and fairness to our judging panel.
              </p>
            </motion.div>

            {/* Judge 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl shadow-lg text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">AD</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Arti Dangi
              </h3>
              <p className="text-orange-600 font-semibold mb-4">
                International Yoga Coach
              </p>
              <p className="text-gray-600 text-sm">
                A certified international yoga instructor with expertise in wellness and holistic living, bringing a unique perspective to our contests.
              </p>
            </motion.div>

            {/* Judge 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl shadow-lg text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">AP</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Sh. Archana Potdar
              </h3>
              <p className="text-orange-600 font-semibold mb-4">
                Community Leader
              </p>
              <p className="text-gray-600 text-sm">
                A respected community leader with extensive experience in cultural events and community engagement, ensuring fair and thoughtful evaluation.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-4">Fair & Transparent Judging</h3>
              <p className="text-lg text-orange-100 max-w-3xl mx-auto">
                Our judges will evaluate all entries based on creativity, presentation, and adherence to contest guidelines. 
                All decisions will be made with complete transparency and fairness.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contest Detail Modal */}
      <AnimatePresence>
        {selectedContest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedContest(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const contest = CONTESTS[selectedContest]
                return (
                  <>
                    {/* Header */}
                    <div className="relative h-64">
                      <Image
                        src={contest.sampleImage}
                        alt={contest.title}
                        fill
                        className="object-cover rounded-t-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-2xl" />
                      <button
                        onClick={() => setSelectedContest(null)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                      >
                        <X className="h-8 w-8" />
                      </button>
                      <div className="absolute bottom-6 left-6 right-6">
                        <h2 className="text-3xl font-bold text-white mb-2">
                          {contest.title}
                        </h2>
                        <p className="text-orange-200 text-lg">
                          {contest.description}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-8">
                      {/* Who Can Join */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                          <Users className="h-6 w-6 mr-2 text-orange-500" />
                          Who Can Join
                        </h3>
                        <p className="text-gray-700">{contest.whoCanJoin}</p>
                      </div>

                      {/* Eligibility */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                          <Award className="h-6 w-6 mr-2 text-orange-500" />
                          Eligibility
                        </h3>
                        <p className="text-gray-700">{contest.eligibility}</p>
                      </div>

                      {/* Rules */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                          <Clock className="h-6 w-6 mr-2 text-orange-500" />
                          Rules & Guidelines
                        </h3>
                        <ul className="space-y-2">
                          {contest.rules.map((rule, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-orange-500 mr-2">•</span>
                              <span className="text-gray-700">{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Judging Criteria */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                          Judging Criteria
                        </h3>
                        <p className="text-gray-700 mb-4">{contest.judgingCriteria}</p>
                        
                        </div>
        
                      {/* Contact */}
                      <div className="bg-orange-50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                          <Phone className="h-6 w-6 mr-2 text-orange-500" />
                          Need Help?
                        </h3>
                        <p className="text-gray-700 mb-2">
                          For any questions about this contest, contact us:
                        </p>
                        <p className="text-orange-600 font-semibold">
                          WhatsApp: {contest.contactWhatsApp}
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="text-center pt-6">
                        <button
                          onClick={() => {
                            openModal(selectedContest)
                            setSelectedContest(null)
                          }}
                          className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-200"
                        >
                          Join This Contest Now
                        </button>
                      </div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
