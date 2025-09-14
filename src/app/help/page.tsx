'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'

const faqs = [
  {
    question: 'When and where is the Diwali Family Carnival 2025?',
    answer: 'The Diwali Family Carnival 2025 will be held on 17th & 18th October, 2025, in Gandhi Hall, Indore, Madhya Pradesh. The exact venue details will be shared with registered participants closer to the event date.'
  },
  {
    question: 'How can I register for the event?',
    answer: 'You can register by clicking the "Register Now" button on our website. Fill out the registration form with your details and select any contests you&apos;d like to participate in. Registration is free for general attendance.'
  },
  {
    question: 'What contests are available?',
    answer: 'We have four exciting contests: Super Mom Contest (for mothers of age 21-60), Cutest Baby of Indore Contest (for children under 12), Senior Citizens Contest (for 60+), and General Join (for everyone). Each contest has specific rules and eligibility criteria.'
  },
  {
    question: 'Is there an entry fee for the event?',
    answer: 'General admission to the Diwali Family Carnival is completely free! However, some contests may have specific requirements or materials needed for participation.'
  },
  {
    question: 'What should I bring to the event?',
    answer: 'Bring your family, enthusiasm, and any materials required for the contests you&apos;re participating in. We recommend bringing water bottles, comfortable clothing, and cameras to capture the memories!'
  },
  {
    question: 'Are there food and drinks available?',
    answer: 'Yes! We have various food vendors offering delicious Indian cuisine and festive treats. Food and drinks are available for purchase throughout the event.'
  },
  {
    question: 'Is the event suitable for all ages?',
    answer: 'Absolutely! Our Diwali Family Carnival is designed for all ages. We have activities and contests specifically designed for children, adults, and senior citizens.'
  },
  {
    question: 'What if it rains on the event day?',
    answer: 'The event will proceed rain or shine! We have covered areas and indoor spaces available. In case of severe weather, we will communicate any changes through our website and social media.'
  },
  {
    question: 'Can I volunteer for the event?',
    answer: 'Yes! We welcome volunteers to help make our event successful. Please contact us through our website or call us to learn about volunteer opportunities.'
  },
  {
    question: 'How can I become a sponsor?',
    answer: 'We have various sponsorship opportunities available. Please visit our Sponsors page or contact us directly to discuss how your organization can support our community event.'
  }
]

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: '+91-8120174075 \n +91-7000174075',
    description: 'Call us for immediate assistance'
  },
  {
    icon: Mail,
    title: 'Email',
    details: 'help@njuvapp.com',
    description: 'Send us your questions via email'
  },
  {
    icon: MapPin,
    title: 'Location',
    details: 'Indore, Madhya Pradesh',
    description: 'Visit us in person'
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: 'Mon-Fri: 9 AM - 6 PM',
    description: 'We&apos;re here to help during business hours'
  }
]

export default function HelpPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

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
              Help & Support
            </h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Find answers to common questions and get the support you need
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get in touch with us through any of these channels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-orange-500 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <contact.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {contact.title}
                </h3>
                <p className="text-orange-600 font-semibold mb-2">
                  {contact.details}
                </p>
                <p className="text-gray-600 text-sm">
                  {contact.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to the most common questions about our event
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-gray-700">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Send us a message and we&apos;ll get back to you as soon as possible
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <select
                  id="subject"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select a subject</option>
                  <option value="registration">Registration Help</option>
                  <option value="contest">Contest Information</option>
                  <option value="sponsorship">Sponsorship Inquiry</option>
                  <option value="volunteer">Volunteer Opportunity</option>
                  <option value="general">General Question</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Please describe your question or concern in detail..."
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-200 flex items-center mx-auto"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Quick Links
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Find what you&apos;re looking for quickly
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a
                href="/contests"
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-200"
              >
                <h3 className="text-xl font-semibold text-white mb-2">Contest Details</h3>
                <p className="text-orange-100">Learn about all our contests and how to participate</p>
              </a>
              <a
                href="/sponsors"
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-200"
              >
                <h3 className="text-xl font-semibold text-white mb-2">Sponsorship</h3>
                <p className="text-orange-100">Become a sponsor and support our community event</p>
              </a>
              <a
                href="/about"
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-200"
              >
                <h3 className="text-xl font-semibold text-white mb-2">About Us</h3>
                <p className="text-orange-100">Learn more about our mission and team</p>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
