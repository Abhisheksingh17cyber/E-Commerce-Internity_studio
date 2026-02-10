'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const collections = [
  {
    id: 'for-her',
    name: 'For Her',
    description: 'Elegant and enchanting fragrances that celebrate the essence of femininity. From delicate florals to sensual orientals, discover scents that captivate and inspire.',
    image: 'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?w=1200&h=800&fit=crop',
    count: 18,
    featured: ['Rose Petale', 'Amber Dreams', 'Garden Whisper'],
  },
  {
    id: 'for-him',
    name: 'For Him',
    description: 'Bold and sophisticated scents crafted for the modern gentleman. Experience the power of woody aromatics and rich spices that leave a lasting impression.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&h=800&fit=crop',
    count: 15,
    featured: ['Midnight Oud', 'Noir Intense', 'Royal Tobacco'],
  },
  {
    id: 'unisex',
    name: 'Unisex',
    description: 'Versatile fragrances that transcend traditional boundaries. These modern compositions are designed to be worn by anyone who appreciates exceptional perfumery.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&h=800&fit=crop',
    count: 12,
    featured: ['Citrus Bloom', 'Ocean Mist', 'White Tea'],
  },
  {
    id: 'exclusive',
    name: 'Exclusive Collection',
    description: 'Limited edition masterpieces crafted with the rarest ingredients. These exceptional fragrances represent the pinnacle of INTERNITY artistry.',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=1200&h=800&fit=crop',
    count: 8,
    featured: ['Velvet Noir', 'Royal Oud', 'Diamond Iris'],
  },
]

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-luxury-black pt-24">
      {/* Hero */}
      <section className="relative h-80 md:h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920"
            alt="Collections"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-black/50 to-luxury-black" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-[0.3em] text-luxury-gold mb-4"
          >
            Explore
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-[0.15em] text-luxury-cream"
          >
            Our Collections
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-luxury-cream/60 mt-4 max-w-lg"
          >
            Discover our carefully curated collections, each telling a unique story through the art of perfumery.
          </motion.p>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="space-y-24">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Link href={`/collections/${collection.id}`} className="block group">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 to-transparent" />
                      
                      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                        <span className="text-sm uppercase tracking-[0.2em] text-luxury-gold">
                          {collection.count} Fragrances
                        </span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-cream group-hover:bg-luxury-gold group-hover:text-luxury-black group-hover:border-luxury-gold transition-all"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1 lg:pr-12' : 'lg:pl-12'}`}>
                  <p className="text-sm uppercase tracking-[0.3em] text-luxury-gold mb-4">
                    Collection {String(index + 1).padStart(2, '0')}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-display font-light tracking-[0.1em] text-luxury-cream mb-4">
                    {collection.name}
                  </h2>
                  <p className="text-luxury-cream/70 leading-relaxed mb-8">
                    {collection.description}
                  </p>
                  
                  {/* Featured Fragrances */}
                  <div className="mb-8">
                    <p className="text-xs uppercase tracking-wider text-luxury-cream/40 mb-3">Featured</p>
                    <div className="flex flex-wrap gap-2">
                      {collection.featured.map((fragrance) => (
                        <span
                          key={fragrance}
                          className="px-4 py-2 border border-luxury-gold/20 rounded-full text-sm text-luxury-cream/80"
                        >
                          {fragrance}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/collections/${collection.id}`}
                    className="luxury-button inline-flex items-center gap-2"
                  >
                    Explore Collection
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
