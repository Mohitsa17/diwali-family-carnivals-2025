'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Contest } from '@/lib/types'

interface RegistrationContextType {
  isModalOpen: boolean
  selectedContest: Contest | null
  openModal: (contest?: Contest) => void
  closeModal: () => void
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined)

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null)

  const openModal = (contest?: Contest) => {
    setSelectedContest(contest || null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedContest(null)
  }

  return (
    <RegistrationContext.Provider value={{
      isModalOpen,
      selectedContest,
      openModal,
      closeModal
    }}>
      {children}
    </RegistrationContext.Provider>
  )
}

export function useRegistration() {
  const context = useContext(RegistrationContext)
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider')
  }
  return context
}
