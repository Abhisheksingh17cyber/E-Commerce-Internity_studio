'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface CursorWave {
  id: number
  x: number
  y: number
  timestamp: number
}

interface SprayParticle {
  id: number
  x: number
  y: number
  angle: number
  distance: number
  size: number
}

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [waves, setWaves] = useState<CursorWave[]>([])
  const [spray, setSpray] = useState<SprayParticle[]>([])
  const [isVisible, setIsVisible] = useState(false)

  // Track cursor movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)

      // Add wave effect on movement
      const newWave: CursorWave = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      }
      setWaves((prev) => [...prev.slice(-2), newWave]) // Keep last 3 waves
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  // Handle click spray effect
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const particles: SprayParticle[] = []
      const count = 20 // Number of spray particles on click

      for (let i = 0; i < count; i++) {
        const angle = (Math.random() * 360 * Math.PI) / 180
        const distance = Math.random() * 100 + 30

        particles.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          angle,
          distance,
          size: Math.random() * 6 + 3,
        })
      }

      setSpray(particles)

      // Clear spray after animation
      setTimeout(() => setSpray([]), 1000)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  // Clean up old waves
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setWaves((prev) => prev.filter((wave) => now - wave.timestamp < 1000))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Don't show on touch devices
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) {
      setIsVisible(false)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        a,
        button,
        input,
        textarea,
        select {
          cursor: none !important;
        }
      `}</style>

      {/* Wave effects */}
      {waves.map((wave) => (
        <motion.div
          key={wave.id}
          initial={{ scale: 0, opacity: 0.6 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: wave.x,
            top: wave.y,
            width: 40,
            height: 40,
            marginLeft: -20,
            marginTop: -20,
            border: '2px solid rgba(201, 169, 98, 0.4)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        />
      ))}

      {/* Click spray particles */}
      {spray.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: particle.x + Math.cos(particle.angle) * particle.distance,
            y: particle.y + Math.sin(particle.angle) * particle.distance,
            scale: [0, 1.2, 0.8, 0],
            opacity: [1, 0.8, 0.5, 0],
          }}
          transition={{
            duration: 0.8,
            ease: [0.32, 0.72, 0, 1],
          }}
          style={{
            position: 'fixed',
            width: particle.size,
            height: particle.size * 1.3,
            background: `radial-gradient(ellipse at 30% 30%, 
              rgba(201, 169, 98, 0.9) 0%, 
              rgba(201, 169, 98, 0.5) 40%, 
              rgba(201, 169, 98, 0.1) 70%, 
              transparent 100%)`,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            filter: 'blur(1px)',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        animate={{ x: position.x - 6, y: position.y - 6 }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 400,
          mass: 0.5,
        }}
        style={{
          position: 'fixed',
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: 'rgba(201, 169, 98, 0.8)',
          border: '1px solid rgba(201, 169, 98, 1)',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 10px rgba(201, 169, 98, 0.5)',
        }}
      />

      {/* Cursor follower (larger circle) */}
      <motion.div
        animate={{ x: position.x - 20, y: position.y - 20 }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 200,
          mass: 0.8,
        }}
        style={{
          position: 'fixed',
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(201, 169, 98, 0.3)',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  )
}
