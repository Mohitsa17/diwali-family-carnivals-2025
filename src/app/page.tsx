'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Sparkles } from "lucide-react"
import { useRegistration } from "@/contexts/RegistrationContext"
import { CONTESTS } from "@/lib/types"

export default function Home() {
  const { openModal } = useRegistration()

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
        <Image
            src="/home_family.avif"
            alt="Diwali celebration"
            fill
            className="object-cover"
          priority
        />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-12 w-12 text-orange-500 mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold">
                Deepotsav Family Carnivals
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-orange-400 mb-4">
              Indore 2025
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Join us for an amazing family celebration with contests, food, and festivities! 
              Special contests for women, children, and senior citizens.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <div className="flex items-center text-gray-300">
              <Calendar className="h-5 w-5 mr-2 text-orange-500" />
              <span>17th & 18th October, 2025</span>
            </div>
            <div className="flex items-center text-gray-300">
              <MapPin className="h-5 w-5 mr-2 text-orange-500" />
              <span>Gandhi Hall, Indore, Madhya Pradesh</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Users className="h-5 w-5 mr-2 text-orange-500" />
              <span>All Ages Welcome</span>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal()}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-200"
          >
            Register for the event
          </motion.button>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Contests Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Exciting Contests
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Participate in our special contests designed for different age groups and showcase your talents!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(CONTESTS)
              .filter(contest => contest.id !== 'NONE')
              .map((contest, index) => (
                <motion.div
                  key={contest.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48">
          <Image
                      src={contest.sampleImage}
                      alt={contest.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {contest.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {contest.shortDescription}
                    </p>
                    <button
                      onClick={() => openModal(contest.id)}
                      className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-200"
                    >
                      Join Contest
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Event Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A day filled with joy, laughter, and celebration for the entire family
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎭",
                title: "Exciting Performances",
                description: "Enjoy traditional dance, music, and cultural shows by all aging groups"
              },
              {
                icon: "🍽️",
                title: "Delicious Food",
                description: "Savor authentic Indian cuisine and festive treats"
              },
              {
                icon: "👘🥻",
                title: "Traditional Fashion Show",
                description: "Enjoy the traditional wear of all aging groups"
              },
              {
                icon: "",
                title: "",
                description: ""
              },
              {
                icon: "🎁",
                title: "Prizes & Gifts",
                description: "Win exciting prizes in our contests"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
