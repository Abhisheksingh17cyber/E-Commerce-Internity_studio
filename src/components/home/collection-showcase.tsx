'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const collections = [
  {
    id: 'for-her',
    name: 'For Her',
    description: 'Elegant and enchanting fragrances that celebrate femininity',
    image: 'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?w=800&h=600&fit=crop',
    count: 18,
  },
  {
    id: 'for-him',
    name: 'For Him',
    description: 'Bold and sophisticated scents for the modern gentleman',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=600&fit=crop',
    count: 15,
  },
  {
    id: 'unisex',
    name: 'Unisex',
    description: 'Versatile fragrances that transcend boundaries',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=600&fit=crop',
    count: 12,
  },
  {
    id: 'exclusive',
    name: 'Exclusive',
    description: 'Limited edition masterpieces for true connoisseurs',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&h=600&fit=crop',
    count: 8,
  },
]

export function CollectionShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-luxury-black">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-luxury-gold mb-4">
            Explore
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-light tracking-[0.1em] text-luxury-cream">
            Our Collections
          </h2>
          <div className="w-16 h-px bg-luxury-gold mx-auto mt-6" />
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Link href={`/collections/${collection.id}`} className="block group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  {/* Image */}
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-luxury-gold mb-2">
                          {collection.count} Fragrances
                        </p>
                        <h3 className="text-2xl md:text-3xl font-display text-luxury-cream group-hover:text-luxury-gold transition-colors">
                          {collection.name}
                        </h3>
                        <p className="text-sm text-luxury-cream/60 mt-2 max-w-xs">
                          {collection.description}
                        </p>
                      </div>
                      
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-center w-12 h-12 rounded-full border border-luxury-gold/30 text-luxury-cream group-hover:border-luxury-gold group-hover:bg-luxury-gold group-hover:text-luxury-black transition-all"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover border effect */}
                  <div className="absolute inset-0 border border-luxury-gold/0 group-hover:border-luxury-gold/30 rounded-lg transition-colors duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
