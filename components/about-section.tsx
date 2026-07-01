'use client'

import { motion } from 'framer-motion'
import { Heart, Lightbulb, Zap, Target, Sparkles, Eye } from 'lucide-react'
import { useState, useEffect } from 'react'
import { VerificationModal } from './verification-modal'

export function AboutSection() {
  const [isVerified, setIsVerified] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem('verified_about') === 'true'
    setIsVerified(verified)
    if (!verified) {
      setShowModal(true)
    }
  }, [])

  const handleVerificationSuccess = () => {
    setIsVerified(true)
    setShowModal(false)
  }

  const features = [
    {
      icon: Heart,
      title: 'Compassionate',
      description: 'A heart that touches everyone with genuine kindness.',
    },
    {
      icon: Eye,
      title: 'Deeply Perceptive',
      description: 'Always seeing the best in others with such clear, gentle insight.',
    },
    {
      icon: Zap,
      title: 'Unwaveringly Determined',
      description: 'Tackling every dream with an unstoppable spirit and focus.',
    },
    {
      icon: Target,
      title: 'Diligently Committed',
      description: 'Putting heart and soul into everything you choose to do.',
    },
    {
      icon: Lightbulb,
      title: 'Creatively Adaptable',
      description: 'Turning every challenge into an opportunity with brilliant, new ideas.',
    },
    {
      icon: Sparkles,
      title: 'Attentively Caring',
      description: 'Noticing the little things that make everyone feel loved and valued.',
    },
  ]

  return (
    <section id="about" className="relative py-24 px-6 bg-gradient-to-b from-background to-card overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">About You</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
            My Perspective of You
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        {!isVerified ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground mb-4">Answer the verification question to view this section</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Verify to Continue
            </button>
          </motion.div>
        ) : (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto mb-16 leading-relaxed text-center text-balance"
            >
              Here are the beautiful qualities that make Rica truly special.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
                  >
                    <div className="mb-6 inline-block p-4 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </>
        )}

        <VerificationModal
          isOpen={showModal}
          question="What is the name of my dog?"
          correctAnswers={['Cooper', 'kuku', 'cooperlaling']}
          sectionId="about"
          onSuccess={handleVerificationSuccess}
          onClose={() => setShowModal(false)}
        />
      </div>
    </section>
  )
}
