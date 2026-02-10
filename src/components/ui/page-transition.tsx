'use client'

import { useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '@/store'

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
    const count = 80 // Number of spray droplets

    for (let i = 0; i < count; i++) {
      // Spray originates from center-top, spreading outward
      const centerX = window.innerWidth / 2
      const centerY = 100
      
      // Random angle for spray direction (semicircle downward)
      const angle = (Math.random() * 180) * (Math.PI / 180)
      const distance = Math.random() * Math.max(window.innerWidth, window.innerHeight)
      
      droplets.push({
        id: i,
        x: centerX + Math.cos(angle) * distance * 0.3,
        y: centerY + Math.sin(angle) * distance * 0.8,
        size: Math.random() * 12 + 4,
        delay: Math.random() * 0.3,
        duration: Math.random() * 0.8 + 0.5,
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
      }, 1500)
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
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-luxury-black/90"
          />
          
          {/* Spray droplets */}
          {dropletsRef.current.map((droplet) => (
            <motion.div
              key={droplet.id}
              initial={{
                opacity: 0,
                scale: 0,
                x: window.innerWidth / 2,
                y: 0,
              }}
              animate={{
                opacity: [0, 0.9, 0.7, 0],
                scale: [0, 1.2, 1, 0.3],
                x: droplet.x,
                y: droplet.y,
              }}
              transition={{
                duration: droplet.duration + 0.5,
                delay: droplet.delay,
                ease: [0.32, 0.72, 0, 1],
              }}
              style={{
                position: 'absolute',
                width: droplet.size,
                height: droplet.size * 1.2,
                background: `radial-gradient(ellipse at 30% 30%, 
                  rgba(201, 169, 98, 0.9) 0%, 
                  rgba(201, 169, 98, 0.5) 40%, 
                  rgba(201, 169, 98, 0.1) 70%, 
                  transparent 100%)`,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                filter: 'blur(0.5px)',
                transform: `rotate(${droplet.angle}deg)`,
              }}
            />
          ))}

          {/* Central mist effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.6, 0], scale: [0.5, 2, 3] }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(201,169,98,0.3) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
