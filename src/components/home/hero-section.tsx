'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, Play } from 'lucide-react'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] overflow-hidden"
    >
      {/* Background Video/Image */}
      <motion.div
        style={{ scale, opacity }}
        className="absolute inset-0"
      >
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Fallback gradient if no video */}
        <div className="absolute inset-0 bg-luxury-gradient" />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/60 via-luxury-black/40 to-luxury-black" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        {/* Decorative Line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-px h-20 bg-luxury-gold/50 mb-8 origin-top"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm md:text-base uppercase tracking-[0.4em] text-luxury-gold mb-6"
        >
          The Art of Luxury Perfumery
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-light tracking-[0.15em] text-luxury-cream max-w-4xl"
        >
          Discover Your
          <br />
          <span className="text-luxury-gold">Signature Scent</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 text-base md:text-lg text-luxury-cream/70 max-w-xl leading-relaxed"
        >
          Immerse yourself in a world of exquisite fragrances, 
          crafted with the finest ingredients from around the globe.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-10"
        >
          <Link href="/collections" className="luxury-button">
            Explore Collections
          </Link>
          <Link
            href="/about"
            className="flex items-center gap-2 px-8 py-4 text-sm uppercase tracking-[0.2em] text-luxury-cream/80 hover:text-luxury-gold transition-colors group"
          >
            <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Our Story
          </Link>
        </motion.div>

        {/* Featured Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-8"
        >
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-display text-luxury-gold">20+</p>
            <p className="text-xs uppercase tracking-wider text-luxury-cream/60">
              Years of Excellence
            </p>
          </div>
          <div className="w-px h-12 bg-luxury-gold/30" />
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-display text-luxury-gold">50+</p>
            <p className="text-xs uppercase tracking-wider text-luxury-cream/60">
              Signature Scents
            </p>
          </div>
          <div className="w-px h-12 bg-luxury-gold/30" />
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-display text-luxury-gold">100k+</p>
            <p className="text-xs uppercase tracking-wider text-luxury-cream/60">
              Happy Customers
            </p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-luxury-cream/40">
              Scroll
            </span>
            <ChevronDown className="w-5 h-5 text-luxury-gold" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Side decorative elements */}
      <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="w-px h-32 bg-gradient-to-b from-transparent via-luxury-gold/50 to-transparent"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-xs uppercase tracking-[0.3em] text-luxury-cream/40 rotate-180 writing-mode-vertical"
          style={{ writingMode: 'vertical-rl' }}
        >
          Since 2006
        </motion.p>
      </div>
    </section>
  )
}
