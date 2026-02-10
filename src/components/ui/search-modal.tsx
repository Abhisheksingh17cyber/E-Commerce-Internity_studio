'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const popularSearches = ['Noir Collection', 'Summer Breeze', 'Rose Essence', 'Oud Premium']

const quickResults = [
  {
    id: '1',
    name: 'Midnight Oud',
    category: 'For Him',
    price: 295,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=200&h=200&fit=crop',
  },
  {
    id: '2',
    name: 'Rose Petale',
    category: 'For Her',
    price: 245,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=200&h=200&fit=crop',
  },
  {
    id: '3',
    name: 'Citrus Bloom',
    category: 'Unisex',
    price: 195,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=200&h=200&fit=crop',
  },
]

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-x-0 top-0 z-50 bg-luxury-black/95 border-b border-luxury-gold/10"
          >
            <div className="container mx-auto px-4 md:px-8 py-8">
              {/* Search Input */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-luxury-gold" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for perfumes, collections..."
                  className="w-full bg-transparent border-b-2 border-luxury-gold/30 py-4 pl-10 pr-12 text-lg text-luxury-cream placeholder:text-luxury-cream/40 focus:border-luxury-gold focus:outline-none transition-colors"
                />
                <button
                  onClick={onClose}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-luxury-cream/60 hover:text-luxury-gold transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search Content */}
              <div className="mt-8 max-w-4xl mx-auto">
                {query ? (
                  // Search Results
                  <div>
                    <p className="text-sm text-luxury-cream/60 mb-4">
                      Showing results for &quot;{query}&quot;
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {quickResults
                        .filter((item) =>
                          item.name.toLowerCase().includes(query.toLowerCase())
                        )
                        .map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            onClick={onClose}
                            className="group flex items-center gap-4 p-3 rounded-lg hover:bg-luxury-dark/50 transition-colors"
                          >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-luxury-charcoal">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-luxury-cream group-hover:text-luxury-gold transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-xs text-luxury-cream/60">
                                {product.category}
                              </p>
                              <p className="text-sm text-luxury-gold mt-1">
                                ${product.price}
                              </p>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                ) : (
                  // Popular Searches
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm uppercase tracking-[0.2em] text-luxury-cream/60 mb-4">
                        Popular Searches
                      </h3>
                      <ul className="space-y-3">
                        {popularSearches.map((term) => (
                          <li key={term}>
                            <button
                              onClick={() => setQuery(term)}
                              className="flex items-center gap-3 text-luxury-cream hover:text-luxury-gold transition-colors group"
                            >
                              <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:ml-0 group-hover:opacity-100 transition-all" />
                              {term}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm uppercase tracking-[0.2em] text-luxury-cream/60 mb-4">
                        Featured Products
                      </h3>
                      <div className="space-y-3">
                        {quickResults.slice(0, 3).map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            onClick={onClose}
                            className="group flex items-center gap-4 p-2 rounded-lg hover:bg-luxury-dark/50 transition-colors"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-luxury-charcoal">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="text-sm text-luxury-cream group-hover:text-luxury-gold transition-colors">
                                {product.name}
                              </h4>
                              <p className="text-xs text-luxury-cream/60">
                                ${product.price}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
