'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store'

export function IntroVideo() {
  const { showIntro, hideIntro } = useUIStore()
  const [isLoaded, setIsLoaded] = useState(false)
  const [showSkip, setShowSkip] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Show skip button after 2 seconds
    const skipTimer = setTimeout(() => {
      setShowSkip(true)
    }, 2000)

    // Auto-hide intro after video ends or timeout
    const autoHideTimer = setTimeout(() => {
      hideIntro()
    }, 8000) // Maximum 8 seconds

    return () => {
      clearTimeout(skipTimer)
      clearTimeout(autoHideTimer)
    }
  }, [hideIntro])

  const handleVideoEnd = () => {
    hideIntro()
  }

  const handleSkip = () => {
    hideIntro()
  }

  // Check if video exists
  useEffect(() => {
    const checkVideo = async () => {
      try {
        const response = await fetch('/videos/intro.mp4', { method: 'HEAD' })
        if (response.ok) {
          setIsLoaded(true)
        } else {
          // If no video, show animated intro instead
          setIsLoaded(false)
        }
      } catch {
        setIsLoaded(false)
      }
    }
    checkVideo()
  }, [])

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="intro-video-container"
        >
          {isLoaded ? (
            // Video Intro
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="intro-video"
            >
              <source src="/videos/intro.mp4" type="video/mp4" />
            </video>
          ) : (
            // Animated Logo Intro (fallback)
            <div className="relative w-full h-full flex items-center justify-center bg-luxury-black overflow-hidden">
              {/* Animated background particles */}
              <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      opacity: 0,
                      x: '50vw',
                      y: '50vh',
                      scale: 0
                    }}
                    animate={{ 
                      opacity: [0, 0.5, 0],
                      x: `${Math.random() * 100}vw`,
                      y: `${Math.random() * 100}vh`,
                      scale: [0, 1, 0.5]
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      delay: Math.random() * 1,
                      ease: 'easeOut'
                    }}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: `radial-gradient(circle, rgba(201,169,98,0.6) 0%, transparent 70%)`,
                      filter: 'blur(1px)'
                    }}
                  />
                ))}
              </div>

              {/* Spray mist effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.4, 0.2], scale: [0.5, 1.5, 2] }}
                transition={{ duration: 3, ease: 'easeOut' }}
                className="absolute w-[600px] h-[600px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(201,169,98,0.15) 0%, transparent 60%)',
                  filter: 'blur(40px)'
                }}
              />

              {/* Logo reveal */}
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <motion.h1 
                    className="text-4xl md:text-6xl lg:text-7xl font-display font-light tracking-[0.4em] text-luxury-cream"
                    initial={{ letterSpacing: '0.8em', opacity: 0 }}
                    animate={{ letterSpacing: '0.4em', opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  >
                    <span className="text-luxury-gold">INTERNITY</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    className="text-lg md:text-xl tracking-[0.6em] text-luxury-cream/60 mt-4"
                  >
                    PERFUME
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                  className="w-24 h-px bg-luxury-gold mx-auto mt-8"
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 2.5 }}
                  className="text-sm text-luxury-cream/40 tracking-[0.3em] uppercase mt-6"
                >
                  The Art of Luxury
                </motion.p>
              </div>
            </div>
          )}

          {/* Skip Button */}
          <AnimatePresence>
            {showSkip && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleSkip}
                className="absolute bottom-8 right-8 px-6 py-2 text-sm uppercase tracking-[0.2em] text-luxury-cream/60 hover:text-luxury-gold border border-luxury-cream/20 hover:border-luxury-gold/50 transition-all duration-300"
              >
                Skip
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
