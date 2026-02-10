'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function BrandStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-luxury-dark relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a962' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            style={{ y: imageY }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop"
                alt="Perfume craftsmanship"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/50 to-transparent" />
            </motion.div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-8 md:right-8 bg-luxury-black/90 backdrop-blur-sm border border-luxury-gold/20 p-6 rounded-lg max-w-xs"
            >
              <p className="text-4xl font-display text-luxury-gold mb-2">20+</p>
              <p className="text-sm text-luxury-cream/80">
                Years of crafting exceptional fragrances with passion and precision
              </p>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-luxury-gold mb-4">
                Our Heritage
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-light tracking-[0.1em] text-luxury-cream mb-6">
                The Art of
                <br />
                Perfumery
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-luxury-cream/70 leading-relaxed"
            >
              <p>
                Since our founding, INTERNITY has been dedicated to the art of creating 
                extraordinary fragrances. Our master perfumers travel the world to source 
                the finest ingredients, from the jasmine fields of Grasse to the oud forests 
                of Southeast Asia.
              </p>
              <p>
                Each INTERNITY fragrance is a masterpiece of olfactory art, carefully composed 
                to evoke emotions, memories, and dreams. We believe that a truly great perfume 
                is not just a scent—it&apos;s an experience that transforms and elevates.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-6 mt-10"
            >
              {[
                { label: 'Natural Ingredients', value: '100%' },
                { label: 'Handcrafted Bottles', value: 'Artisan' },
                { label: 'Sustainability', value: 'Certified' },
                { label: 'Global Shipping', value: 'Worldwide' },
              ].map((feature, index) => (
                <div key={index} className="border-l-2 border-luxury-gold/30 pl-4">
                  <p className="text-lg font-display text-luxury-gold">{feature.value}</p>
                  <p className="text-sm text-luxury-cream/60">{feature.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10"
            >
              <Link href="/about" className="luxury-button">
                Discover Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
