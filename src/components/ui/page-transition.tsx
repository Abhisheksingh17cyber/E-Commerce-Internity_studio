'use client'

import { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store'
import Image from 'next/image'

interface Droplet {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  angle: number
}

export function PageTransition() {
  const { isPageTransitioning, endPageTransition } = useUIStore()
  const dropletsRef = useRef<Droplet[]>([])

  const generateDroplets = useCallback(() => {
    const droplets: Droplet[] = []
    const count = 120 // Increased droplet count for fuller spray effect

    for (let i = 0; i < count; i++) {
      // Spray originates from center-top, spreading outward
      const centerX = window.innerWidth / 2
      const centerY = 100

      // Random angle for spray direction (wide semicircle downward)
      const angle = ((Math.random() * 200 - 10) * Math.PI) / 180
      const distance = Math.random() * Math.max(window.innerWidth, window.innerHeight) * 0.9

      droplets.push({
        id: i,
        x: centerX + Math.cos(angle) * distance * 0.4,
        y: centerY + Math.sin(angle) * distance * 0.85,
        size: Math.random() * 14 + 3,
        delay: Math.random() * 0.2,
        duration: Math.random() * 0.9 + 0.6,
        angle: Math.random() * 360,
      })
    }

    dropletsRef.current = droplets
    return droplets
  }, [])

  useEffect(() => {
    if (isPageTransitioning) {
      generateDroplets()
      const timer = setTimeout(() => {
        endPageTransition()
      }, 2000) // Extended duration for logo reveal
      return () => clearTimeout(timer)
    }
  }, [isPageTransitioning, generateDroplets, endPageTransition])

  return (
    <AnimatePresence>
      {isPageTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="page-transition-overlay"
        >
          {/* Background overlay that fades */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-luxury-black/95"
          />

          {/* Logo reveal in center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1.05, 1, 1.1], y: [20, 0, 0, -10] }}
            transition={{ duration: 1.8, times: [0, 0.3, 0.7, 1], ease: 'easeInOut' }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <div className="relative">
              {/* Glow effect behind logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.4, 0.2, 0], scale: [0.5, 1.2, 1.5, 2] }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className="absolute inset-0 -m-20"
                style={{
                  background: 'radial-gradient(circle, rgba(201,169,98,0.3) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              <Image
                src="/images/logo.png"
                alt="INTERNITY PERFUME"
                width={300}
                height={300}
                className="relative z-10"
                priority
              />
            </div>
          </motion.div>

          {/* Spray droplets */}
          {dropletsRef.current.map((droplet) => (
            <motion.div
              key={droplet.id}
              initial={{
                opacity: 0,
                scale: 0,
                x: window.innerWidth / 2,
                y: 80,
              }}
              animate={{
                opacity: [0, 1, 0.9, 0.6, 0],
                scale: [0, 1.3, 1.1, 0.9, 0.3],
                x: droplet.x,
                y: droplet.y,
              }}
              transition={{
                duration: droplet.duration + 0.6,
                delay: droplet.delay,
                ease: [0.32, 0.72, 0, 1],
              }}
              style={{
                position: 'absolute',
                width: droplet.size,
                height: droplet.size * 1.3,
                background: `radial-gradient(ellipse at 30% 30%, 
                  rgba(201, 169, 98, 0.95) 0%, 
                  rgba(201, 169, 98, 0.6) 35%, 
                  rgba(201, 169, 98, 0.2) 65%, 
                  transparent 100%)`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                filter: 'blur(0.8px)',
                transform: `rotate(${droplet.angle}deg)`,
              }}
            />
          ))}

          {/* Central burst/mist effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: [0, 0.8, 0.4, 0], scale: [0.3, 1.5, 2.5, 4] }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(201,169,98,0.4) 0%, rgba(201,169,98,0.15) 40%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />

          {/* Additional fine mist particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`mist-${i}`}
              initial={{
                opacity: 0,
                x: window.innerWidth / 2,
                y: 100,
                scale: 0,
              }}
              animate={{
                opacity: [0, 0.6, 0.3, 0],
                x: window.innerWidth / 2 + (Math.random() - 0.5) * window.innerWidth * 0.8,
                y: 100 + Math.random() * window.innerHeight * 0.7,
                scale: [0, Math.random() * 2 + 1, Math.random() + 0.5],
              }}
              transition={{
                duration: Math.random() * 1.2 + 0.8,
                delay: Math.random() * 0.3,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                width: Math.random() * 30 + 10,
                height: Math.random() * 30 + 10,
                background: 'radial-gradient(circle, rgba(201,169,98,0.25) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(8px)',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
