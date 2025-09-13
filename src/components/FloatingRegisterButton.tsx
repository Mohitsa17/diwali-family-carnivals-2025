'use client'

import { motion } from 'framer-motion'
import { UserPlus } from 'lucide-react'
import { useRegistration } from '@/contexts/RegistrationContext'

export function FloatingRegisterButton() {
  const { openModal } = useRegistration()

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => openModal()}
      className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 rounded-full shadow-lg hover:shadow-orange-500/25 transition-all duration-200"
      aria-label="Register for the event"
    >
      <UserPlus className="h-6 w-6" />
    </motion.button>
  )
}
