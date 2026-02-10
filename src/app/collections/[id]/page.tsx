'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Heart, ShoppingBag, SlidersHorizontal, ChevronDown, ArrowLeft } from 'lucide-react'
import { useCartStore, useWishlistStore } from '@/store'
import { formatPrice } from '@/lib/utils'

const collectionsData: Record<string, {
  name: string
  description: string
  image: string
  products: Array<{
    id: string
    name: string
    price: number
    image: string
    category: string
    isNew?: boolean
    isBestseller?: boolean
  }>
}> = {
  'for-her': {
    name: 'For Her',
    description: 'Elegant and enchanting fragrances that celebrate the essence of femininity.',
    image: 'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?w=1920',
    products: [
      { id: 'rose-petale', name: 'Rose Pétale', price: 245, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600', category: 'Floral', isNew: true },
      { id: 'amber-dreams', name: 'Amber Dreams', price: 285, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600', category: 'Oriental', isBestseller: true },
      { id: 'garden-whisper', name: 'Garden Whisper', price: 195, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600', category: 'Fresh Floral' },
      { id: 'velvet-rose', name: 'Velvet Rose', price: 265, image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600', category: 'Floral' },
      { id: 'jasmine-night', name: 'Jasmine Night', price: 225, image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600', category: 'White Floral', isNew: true },
      { id: 'peony-blush', name: 'Peony Blush', price: 215, image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600', category: 'Fresh Floral' },
    ],
  },
  'for-him': {
    name: 'For Him',
    description: 'Bold and sophisticated scents crafted for the modern gentleman.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1920',
    products: [
      { id: 'midnight-oud', name: 'Midnight Oud', price: 325, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600', category: 'Oud', isBestseller: true },
      { id: 'noir-intense', name: 'Noir Intense', price: 295, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600', category: 'Woody Spicy' },
      { id: 'royal-tobacco', name: 'Royal Tobacco', price: 275, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600', category: 'Tobacco Vanilla', isNew: true },
      { id: 'leather-soul', name: 'Leather Soul', price: 285, image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600', category: 'Leather' },
      { id: 'cedar-homme', name: 'Cedar Homme', price: 245, image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600', category: 'Woody' },
    ],
  },
  'unisex': {
    name: 'Unisex',
    description: 'Versatile fragrances that transcend traditional boundaries.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1920',
    products: [
      { id: 'citrus-bloom', name: 'Citrus Bloom', price: 195, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600', category: 'Citrus', isNew: true },
      { id: 'ocean-mist', name: 'Ocean Mist', price: 215, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600', category: 'Aquatic' },
      { id: 'white-tea', name: 'White Tea', price: 185, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600', category: 'Green Tea', isBestseller: true },
      { id: 'sandalwood-silk', name: 'Sandalwood Silk', price: 255, image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600', category: 'Woody' },
    ],
  },
  'exclusive': {
    name: 'Exclusive Collection',
    description: 'Limited edition masterpieces crafted with the rarest ingredients.',
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=1920',
    products: [
      { id: 'velvet-noir', name: 'Velvet Noir', price: 495, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600', category: 'Oriental', isBestseller: true },
      { id: 'royal-oud', name: 'Royal Oud', price: 595, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600', category: 'Oud' },
      { id: 'diamond-iris', name: 'Diamond Iris', price: 545, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600', category: 'Powdery', isNew: true },
      { id: 'eternal-amber', name: 'Eternal Amber', price: 475, image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600', category: 'Amber' },
    ],
  },
}

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
]

export default function CollectionPage() {
  const params = useParams()
  const collectionId = params.id as string
  const collection = collectionsData[collectionId]
  
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore()

  const sortedProducts = useMemo(() => {
    if (!collection) return []
    
    const products = [...collection.products]
    
    switch (sortBy) {
      case 'newest':
        return products.filter(p => p.isNew).concat(products.filter(p => !p.isNew))
      case 'price-low':
        return products.sort((a, b) => a.price - b.price)
      case 'price-high':
        return products.sort((a, b) => b.price - a.price)
      case 'name':
        return products.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return products
    }
  }, [collection, sortBy])

  if (!collection) {
    return (
      <div className="min-h-screen bg-luxury-black pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display text-luxury-cream mb-4">Collection Not Found</h1>
          <Link href="/collections" className="luxury-button">
            View All Collections
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luxury-black pt-24">
      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-black/50 to-luxury-black" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <Link
            href="/collections"
            className="flex items-center gap-2 text-luxury-cream/60 hover:text-luxury-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">All Collections</span>
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-[0.15em] text-luxury-cream"
          >
            {collection.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-luxury-cream/60 mt-4 max-w-lg"
          >
            {collection.description}
          </motion.p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
            <p className="text-luxury-cream/60">
              {sortedProducts.length} fragrance{sortedProducts.length !== 1 ? 's' : ''}
            </p>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-luxury-cream/70 hover:text-luxury-gold transition-colors md:hidden"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm">Filter</span>
              </button>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent text-luxury-cream/70 text-sm pr-8 cursor-pointer focus:outline-none hover:text-luxury-gold transition-colors"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-luxury-black">
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-luxury-cream/50 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {sortedProducts.map((product, index) => {
                const isWishlisted = wishlistItems.some(item => item.id === product.id)
                
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-luxury-charcoal">
                      <Link href={`/products/${product.id}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && (
                          <span className="px-2 py-1 bg-luxury-gold text-luxury-black text-xs uppercase tracking-wider">
                            New
                          </span>
                        )}
                        {product.isBestseller && (
                          <span className="px-2 py-1 bg-white/90 text-luxury-black text-xs uppercase tracking-wider">
                            Bestseller
                          </span>
                        )}
                      </div>
                      
                      {/* Wishlist Button */}
                      <button
                        onClick={() => isWishlisted 
                          ? removeFromWishlist(product.id)
                          : addToWishlist({ id: product.id, name: product.name, price: product.price, image: product.image })
                        }
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-luxury-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-luxury-black"
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-luxury-cream'}`} />
                      </button>
                      
                      {/* Quick Add */}
                      <motion.button
                        initial={false}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          quantity: 1,
                          image: product.image,
                          size: '50ml',
                        })}
                        className="absolute bottom-4 left-4 right-4 py-2.5 bg-luxury-black/80 backdrop-blur-sm text-luxury-cream text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all hover:bg-luxury-gold hover:text-luxury-black flex items-center justify-center gap-2 rounded"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Add to Bag
                      </motion.button>
                    </div>
                    
                    <Link href={`/products/${product.id}`}>
                      <p className="text-xs text-luxury-gold/70 uppercase tracking-wider mb-1">
                        {product.category}
                      </p>
                      <h3 className="text-luxury-cream font-display text-lg tracking-wide group-hover:text-luxury-gold transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-luxury-cream/70 mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </Link>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  )
}
