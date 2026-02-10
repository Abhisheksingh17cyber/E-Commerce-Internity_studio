'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Filter, SortAsc, Grid3X3, LayoutGrid, Heart, ShoppingBag, Star, X } from 'lucide-react'
import { useCartStore, useWishlistStore, type Product } from '@/store'
import { formatPrice } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'

const allProducts: Product[] = [
  {
    id: '1',
    name: 'Midnight Oud',
    price: 295,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=800&fit=crop',
    category: 'For Him',
    size: '100ml',
    description: 'A captivating blend of aged oud and smoky incense',
    notes: { top: ['Bergamot', 'Pink Pepper'], middle: ['Oud', 'Rose'], base: ['Amber', 'Musk'] },
  },
  {
    id: '2',
    name: 'Rose Petale',
    price: 245,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&h=800&fit=crop',
    category: 'For Her',
    size: '75ml',
    description: 'A romantic bouquet of Bulgarian roses',
    notes: { top: ['Peony', 'Lychee'], middle: ['Rose', 'Jasmine'], base: ['White Musk', 'Cedar'] },
  },
  {
    id: '3',
    name: 'Citrus Bloom',
    price: 195,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=800&fit=crop',
    category: 'Unisex',
    size: '100ml',
    description: 'Fresh Mediterranean citrus with white florals',
    notes: { top: ['Bergamot', 'Lemon'], middle: ['Neroli', 'Orange Blossom'], base: ['Vetiver', 'Cedarwood'] },
  },
  {
    id: '4',
    name: 'Velvet Noir',
    price: 345,
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600&h=800&fit=crop',
    category: 'Exclusive',
    size: '50ml',
    description: 'An intense evening fragrance with dark florals',
    notes: { top: ['Black Pepper', 'Cardamom'], middle: ['Tuberose', 'Iris'], base: ['Leather', 'Sandalwood'] },
  },
  {
    id: '5',
    name: 'Ocean Mist',
    price: 175,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=800&fit=crop',
    category: 'Unisex',
    size: '100ml',
    description: 'Fresh marine notes with a woody dry down',
    notes: { top: ['Sea Salt', 'Grapefruit'], middle: ['Jasmine', 'Sea Moss'], base: ['Driftwood', 'Musk'] },
  },
  {
    id: '6',
    name: 'Amber Dreams',
    price: 265,
    image: 'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?w=600&h=800&fit=crop',
    category: 'For Her',
    size: '75ml',
    description: 'Warm amber wrapped in vanilla and spice',
    notes: { top: ['Saffron', 'Cinnamon'], middle: ['Amber', 'Orchid'], base: ['Vanilla', 'Benzoin'] },
  },
  {
    id: '7',
    name: 'Noir Intense',
    price: 325,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&h=800&fit=crop',
    category: 'For Him',
    size: '100ml',
    description: 'Deep and mysterious with leather and spice',
    notes: { top: ['Bergamot', 'Black Pepper'], middle: ['Leather', 'Tobacco'], base: ['Oud', 'Patchouli'] },
  },
  {
    id: '8',
    name: 'Garden Whisper',
    price: 215,
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600&h=800&fit=crop',
    category: 'For Her',
    size: '50ml',
    description: 'Delicate florals from an English garden',
    notes: { top: ['Pear', 'Bergamot'], middle: ['Lily', 'Violet'], base: ['Wood', 'Musk'] },
  },
]

const categories = ['All', 'For Her', 'For Him', 'Unisex', 'Exclusive']
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Name: A-Z']

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Featured')
  const [viewMode, setViewMode] = useState<'grid' | 'large'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = allProducts
    .filter((p) => selectedCategory === 'All' || p.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'Price: Low to High':
          return a.price - b.price
        case 'Price: High to Low':
          return b.price - a.price
        case 'Name: A-Z':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-luxury-black pt-24">
      {/* Hero Banner */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 bg-luxury-gradient" />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-transparent to-luxury-black" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-[0.3em] text-luxury-gold mb-4"
          >
            Our Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-light tracking-[0.15em] text-luxury-cream"
          >
            All Perfumes
          </motion.h1>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-20 z-40 bg-luxury-black/95 backdrop-blur-sm border-b border-luxury-gold/10">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left - Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm uppercase tracking-wider text-luxury-cream hover:text-luxury-gold transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {/* Center - Categories (Desktop) */}
            <div className="hidden md:flex items-center gap-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-sm uppercase tracking-wider transition-colors ${
                    selectedCategory === cat
                      ? 'text-luxury-gold'
                      : 'text-luxury-cream/60 hover:text-luxury-cream'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right - Sort & View */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm text-luxury-cream border border-luxury-gold/30 rounded px-3 py-2 focus:outline-none focus:border-luxury-gold"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option} className="bg-luxury-black">
                    {option}
                  </option>
                ))}
              </select>

              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'text-luxury-gold' : 'text-luxury-cream/60'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('large')}
                  className={`p-2 rounded ${viewMode === 'large' ? 'text-luxury-gold' : 'text-luxury-cream/60'}`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Categories */}
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden pt-4 mt-4 border-t border-luxury-gold/10"
            >
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat)
                      setShowFilters(false)
                    }}
                    className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                      selectedCategory === cat
                        ? 'border-luxury-gold bg-luxury-gold text-luxury-black'
                        : 'border-luxury-gold/30 text-luxury-cream hover:border-luxury-gold'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-sm text-luxury-cream/60 mb-8">
            Showing {filteredProducts.length} products
          </p>

          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} viewMode={viewMode} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function ProductCard({ product, index, viewMode }: { product: Product; index: number; viewMode: 'grid' | 'large' }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })
  const { addItem, openCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  const handleAddToCart = () => {
    addItem(product)
    toast({ title: 'Added to bag', description: `${product.name} has been added.` })
    openCart()
  }

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group"
    >
      <div className={`relative overflow-hidden rounded-lg bg-luxury-charcoal mb-4 ${
        viewMode === 'large' ? 'aspect-[2/1]' : 'aspect-[3/4]'
      }`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2 py-3 bg-luxury-gold text-luxury-black text-sm uppercase tracking-wider font-medium rounded hover:bg-luxury-gold/90 transition-colors">
            <ShoppingBag className="w-4 h-4" />
            Add to Bag
          </button>
          <button
            onClick={handleWishlist}
            className={`p-3 rounded border transition-colors ${
              isInWishlist(product.id)
                ? 'bg-luxury-gold border-luxury-gold text-luxury-black'
                : 'bg-luxury-black/80 border-luxury-gold/30 text-luxury-cream hover:border-luxury-gold'
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs uppercase tracking-wider bg-luxury-black/80 text-luxury-gold rounded">
            {product.category}
          </span>
        </div>
      </div>

      <Link href={`/products/${product.id}`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-display text-luxury-cream group-hover:text-luxury-gold transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-luxury-cream/60 mt-1">{product.size}</p>
          </div>
          <p className="text-lg font-medium text-luxury-gold">{formatPrice(product.price)}</p>
        </div>
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-luxury-gold text-luxury-gold' : 'text-luxury-cream/30'}`} />
          ))}
          <span className="text-xs text-luxury-cream/60 ml-1">(48)</span>
        </div>
      </Link>
    </motion.div>
  )
}
