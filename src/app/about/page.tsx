'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, Users, Target, Award, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const teamMembers = [
  {
    name: 'Avanish Tripathi',
    role: 'Founder & Organizer',
    image: '/Avanish.png',
    description: 'Passionate about bringing communities together through cultural celebrations'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Community Coordinator',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    description: 'Dedicated to organizing meaningful events that strengthen community bonds'
  },
  {
    name: 'Sunita Gupta',
    role: 'Cultural Advisor',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    description: 'Expert in traditional Indian culture and festival celebrations'
  },
  {
    name: 'Anjali Singh',
    role: 'Volunteer Coordinator',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
    description: 'Manages our amazing team of volunteers who make everything possible'
  }
]

const values = [
  {
    icon: Heart,
    title: 'Community First',
    description: 'We believe in putting our community at the heart of everything we do, creating events that bring people together and strengthen bonds.'
  },
  {
    icon: Users,
    title: 'Inclusive Celebration',
    description: 'Our events welcome everyone regardless of age, background, or ability. We celebrate diversity and create spaces where all feel valued.'
  },
  {
    icon: Target,
    title: 'Cultural Preservation',
    description: 'We are committed to preserving and sharing the rich cultural heritage of India, especially during important festivals like Diwali.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of our events, from planning to execution, ensuring memorable experiences for all participants.'
  }
]

export default function AboutPage() {
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
              About Us
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Learn about our mission to bring communities together through celebration
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                At Diwali Family Carnivals, we believe in the power of community celebration. 
                Our mission is to create meaningful experiences that bring families together, 
                preserve cultural traditions, and strengthen the bonds within our community.
              </p>
              <p className="text-lg text-gray-700">
                We organize inclusive events that celebrate the joy of Diwali while providing 
                opportunities for people of all ages to participate, compete, and create 
                lasting memories together.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <Image
                src="/mission.jpg"
                alt="Community celebration"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
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
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="bg-orange-500 p-3 rounded-full mr-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-700">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
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
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate individuals who make our events possible
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-orange-600 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Have questions or want to get involved? We&apos;d love to hear from you!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="flex flex-col items-center text-white">
                <Mail className="h-8 w-8 mb-3" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p>help@njuvapp.com</p>
              </div>
              <div className="flex flex-col items-center text-white">
                <Phone className="h-8 w-8 mb-3" />
                <h3 className="font-semibold mb-2">Phone</h3>
                <p>+91-8120174075</p>
                <p>+91-7000174075</p>
              </div>
              <div className="flex flex-col items-center text-white">
                <MapPin className="h-8 w-8 mb-3" />
                <h3 className="font-semibold mb-2">Location</h3>
                <p>Indore, Madhya Pradesh</p>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-white hover:text-orange-200 transition-colors"
              >
                <Facebook className="h-8 w-8" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-white hover:text-orange-200 transition-colors"
              >
                <Instagram className="h-8 w-8" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-white hover:text-orange-200 transition-colors"
              >
                <Twitter className="h-8 w-8" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
