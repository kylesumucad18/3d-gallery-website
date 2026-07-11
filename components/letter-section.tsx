'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Mail, MessageCircle, ArrowLeft, Image as ImageIcon } from 'lucide-react'
import { PhotoCarouselModal } from './photo-carousel-modal'

export function LetterSection() {
  const [isVerified, setIsVerified] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showCarousel, setShowCarousel] = useState(false)
  const [step, setStep] = useState<'question' | 'why4' | 'messenger'>('question')
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const verified = localStorage.getItem('verified_letter') === 'true'
    setIsVerified(verified)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const ans = input.trim()
    if (['1', '2', '3', '5', '6'].includes(ans)) {
      setError('Wrong Answer, try again.')
      setInput('')
    } else if (ans === '4') {
      setStep('why4')
      setTimeout(() => {
        setStep('messenger')
      }, 2500)
    } else {
      setError('Please enter a valid number (e.g. 1, 2, 3...)')
    }
  }

  const handleMessengerClick = () => {
    window.open('https://www.messenger.com/', '_blank')
    localStorage.setItem('verified_letter', 'true')
    setIsVerified(true)
    setShowModal(false)
  }

  return (
    <section id="letter" className="relative py-24 px-6 bg-secondary/20 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">A Special Note</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
            Letter for the Birthday Girl
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        {!isVerified ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-card rounded-2xl border border-border shadow-xl"
          >
            <div className="mb-6 flex justify-center">
              <div className="p-6 bg-primary/10 rounded-full border border-primary/20">
                <Mail className="text-primary" size={48} />
              </div>
            </div>
            <p className="text-muted-foreground mb-8 text-lg px-6">There is a special letter waiting for you.</p>
            <button
              onClick={() => {
                setShowModal(true)
                setStep('question')
                setInput('')
                setError('')
              }}
              className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
            >
              Unlock Letter
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-2xl relative"
          >
            {/* The Letter Content */}
            <div className="prose prose-invert max-w-none mb-12">
              <p className="text-2xl text-foreground leading-relaxed font-serif mb-6 italic">
                Dear sleepymedtekbabyyykoo,
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-serif">
                hi baby, I hope you liked my website that I made for you :)) pero bitaw to be honest I started this last week and to be specific its July 2 huhu pero i was too confident i could finish it in a day so here i am writing this letter on 10:35PM on July 11 HAHAHAHAHAHHAHAHA that&apos;s why i was so busy and sitting all day just to finish what i have created for you, and i hope you like it, btw thanks for also answering the questions hehehe thanks God kahibaw ka charot, im writing this in advance bitaw so idk yet pero i hope u do :))
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-serif">
                first of all, i wanna thank you for staying with me even if im hard to understand and too unstable most of the times, thank you for being so understanding and open to my feelings and thoughts. thank you for leaning towards me when you&apos;re having a hard time, thank you for sharing your thoughts and ideas about something, thank you for being the crying shoulder that i could cry on tapos pinamove saibang location (chariz lang b loveyou), thank you for holding on to me when things aren&apos;t going your way, throughout the 6 months of us talking again (from jhs pa yan sha), i wanna thank you for being the genuine and loving person that you are. thank you for being you with me baby :(( . i love you :^^ . 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-serif">
                iloveyou on all words, all actions, all ideas and all ways that i have in mind Rica Marie :&lt; . i am not good on all of them but i promise to make you feel that i love you all of you *kanta pabasa* cz all of me loves all u, love ur piercings and ur imperfections *okay wala na sa tono* despite your downs and insecurities in life, *kanta* i will love you till they take my heart awayyyyy, believeeee im here to stayyy, i will love youuu till they take my heart away *okay na*. pero i promise bbb, im here to stay. i love you baby! sana ma appreaciate mo e2ng ginawa q0h para saU :&gt;&gt; labvyu eksdi ka sakin!
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-serif italic">
                ps. di nalang nako itaas baby basin kapoyon kag basa basta i love you mwamwamwachuchu ka sakin :^^ this day!!! magshave ko! raaaaawrr pero wala lang tay room so awts2
              </p>
              <p className="text-xl text-foreground leading-relaxed font-serif mt-12 italic">
                from your badlungon baby,<br/>
                <span className="text-primary mt-2 block not-italic font-bold">baby kyle way ligo xD HAHAHAHAHHA</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-border">
              <button
                onClick={() => setIsVerified(false)}
                className="flex items-center gap-2 px-8 py-4 border-2 border-border text-foreground font-semibold rounded-full hover:bg-muted transition-colors w-full sm:w-auto justify-center"
              >
                <ArrowLeft size={18} />
                Close Letter
              </button>
              <button
                onClick={() => window.open('https://www.messenger.com/', '_blank')}
                className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 w-full sm:w-auto justify-center"
              >
                <MessageCircle size={20} />
                Reply in Messenger
              </button>
            </div>
          </motion.div>
        )}

        {/* Custom Verification Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-card border border-border rounded-3xl max-w-md w-full p-8 shadow-2xl relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors z-10"
                >
                  <X size={24} />
                </button>

                {step === 'question' && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-6">Verification</h2>
                    <p className="text-lg text-foreground mb-6 leading-relaxed">
                      How many times have I given you flowers?
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter a number..."
                        className="w-full px-5 py-4 bg-background border border-border rounded-xl text-foreground text-lg placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                        autoFocus
                      />
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-500 font-medium px-1"
                        >
                          {error}
                        </motion.p>
                      )}
                      <button
                        type="submit"
                        disabled={!input.trim()}
                        className="w-full px-6 py-4 mt-2 bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                      >
                        Submit Answer
                      </button>
                    </form>
                  </motion.div>
                )}

                {step === 'why4' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <motion.div
                      animate={{ rotate: [-5, 5, -5, 5, 0] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <h2 className="text-4xl font-bold text-primary mb-4">Why is it 4? 🤔</h2>
                    </motion.div>
                  </motion.div>
                )}

                {step === 'messenger' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-8 text-center"
                  >
                    <div className="flex justify-center mb-6">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary relative">
                        <MessageCircle size={48} />
                        <motion.div
                          className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-card"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: 'spring' }}
                        />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-4">Check your Messenger inbox</h2>
                    <p className="text-muted-foreground font-medium mb-8">
                      — Little Food Critic
                    </p>
                    <button
                      onClick={handleMessengerClick}
                      className="w-full px-6 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-3"
                    >
                      <MessageCircle size={24} />
                      Open Messenger
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
