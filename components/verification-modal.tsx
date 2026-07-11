'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export const getStorageKey = (sectionId: string) => {
  if (typeof window !== 'undefined') {
    return `_sec_v_${btoa(sectionId).replace(/=/g, '')}`
  }
  return `_sec_v_${sectionId}`
}

interface VerificationModalProps {
  isOpen: boolean
  question: string
  correctAnswers: string[]
  sectionId: string
  onSuccess: () => void
  onClose: () => void
}

export function VerificationModal({
  isOpen,
  question,
  correctAnswers,
  sectionId,
  onSuccess,
  onClose,
}: VerificationModalProps) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if this section was already verified in localStorage
    const verified = localStorage.getItem(getStorageKey(sectionId))
    if (verified === 'true') {
      onSuccess()
    }
  }, [sectionId, onSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const normalizedInput = input.toLowerCase().trim()
      
      const encoder = new TextEncoder()
      const data = encoder.encode(normalizedInput)
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const hashedInput = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

      const isCorrect = correctAnswers.includes(hashedInput)

      setTimeout(() => {
        if (isCorrect) {
          localStorage.setItem(getStorageKey(sectionId), 'true')
          onSuccess()
          setInput('')
        } else {
          setError('Incorrect answer. Please try again.')
          setInput('')
        }
        setIsLoading(false)
      }, 300)
    } catch (err) {
      console.error(err)
      setError('An error occurred.')
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-card border border-border rounded-2xl max-w-md w-full p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-foreground">Verification</h2>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{question}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your answer..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading}
              />

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Checking...' : 'Submit Answer'}
              </button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Answer the question to unlock this section
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
