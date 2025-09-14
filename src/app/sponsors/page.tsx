'use client'

import { motion } from 'framer-motion'
import { Star, Crown, Award, Mail, Phone } from 'lucide-react'
import Image from 'next/image'

const sponsorTiers = [
  {
    name: 'Platinum Sponsors',
    icon: Crown,
    color: 'from-gray-400 to-gray-600',
    description: 'Our premier partners who make this event possible',
    sponsors: [
      {
        name: 'Indore Business Group',
        logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop',
        description: 'Leading business community supporting local events'
      },
      {
        name: 'Madhya Pradesh Tourism',
        logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop',
        description: 'Promoting cultural heritage and tourism'
      }
    ]
  },
  {
    name: 'Gold Sponsors',
    icon: Star,
    color: 'from-yellow-400 to-yellow-600',
    description: 'Valued partners contributing to our success',
    sponsors: [
      {
        name: 'Indore Food Court',
        logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=100&fit=crop',
        description: 'Delicious food and catering services'
      },
      {
        name: 'Local Media Partners',
        logo: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=200&h=100&fit=crop',
        description: 'Media coverage and event promotion'
      }
    ]
  },
  {
    name: 'Silver Sponsors',
    icon: Award,
    color: 'from-gray-300 to-gray-500',
    description: 'Supporting partners helping us grow',
    sponsors: [
      {
        name: 'Community Centers',
        logo: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&h=100&fit=crop',
        description: 'Venue and community support'
      },
      {
        name: 'Local Vendors',
        logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=100&fit=crop',
        description: 'Products and services for the event'
      }
    ]
  }
]

const benefits = [
  {
    icon: '👥',
    title: 'Brand Visibility',
    description: 'Get your brand in front of 500+ families and community members'
  },
  {
    icon: '📱',
    title: 'Social Media Coverage',
    description: 'Featured in our social media posts and event coverage'
  },
  {
    icon: '🎯',
    title: 'Targeted Audience',
    description: 'Connect with families and community members in Indore'
  },
  {
    icon: '🤝',
    title: 'Community Impact',
    description: 'Support local community events and cultural celebrations'
  }
]

export default function SponsorsPage() {
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
              Our Sponsors
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Thank you to our amazing sponsors who make this event possible
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sponsor Tiers */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sponsor Tiers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Different levels of partnership to suit your business needs
            </p>
          </motion.div>

          <div className="space-y-16">
            {sponsorTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${tier.color} mr-4`}>
                    <tier.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {tier.name}
                    </h3>
                    <p className="text-gray-600">{tier.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {tier.sponsors.map((sponsor) => (
                    <motion.div
                      key={sponsor.name}
                      whileHover={{ y: -5 }}
                      className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 bg-white rounded-lg shadow-sm mr-4 flex items-center justify-center overflow-hidden">
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {sponsor.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {sponsor.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Sponsor */}
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
              Become a Sponsor
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us in making this Diwali celebration memorable for the community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Benefits */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Why Sponsor Our Event?
              </h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div className="text-2xl mr-4">{benefit.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    id="contact"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Tell us about your sponsorship interest..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-200"
                >
                  Send Inquiry
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Partner With Us?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss sponsorship opportunities and be part of this amazing celebration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center text-white">
                <Mail className="h-5 w-5 mr-2" />
                <span>help@njuvapp.com</span>
              </div>
              <div className="flex items-center text-white">
                <Phone className="h-5 w-5 mr-2" />
                <span>+91-8120174075</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
