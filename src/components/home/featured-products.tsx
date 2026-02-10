'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { useCartStore, useWishlistStore, type Product } from '@/store'
import { formatPrice } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Midnight Oud',
    price: 295,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=800&fit=crop',
    category: 'For Him',
    size: '100ml',
    description: 'A captivating blend of aged oud and smoky incense',
    notes: {
      top: ['Bergamot', 'Pink Pepper'],
      middle: ['Oud', 'Rose'],
      base: ['Amber', 'Musk'],
    },
  },
  {
    id: '2',
    name: 'Rose Petale',
    price: 245,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&h=800&fit=crop',
    category: 'For Her',
    size: '75ml',
    description: 'A romantic bouquet of Bulgarian roses',
    notes: {
      top: ['Peony', 'Lychee'],
      middle: ['Rose', 'Jasmine'],
      base: ['White Musk', 'Cedar'],
    },
  },
  {
    id: '3',
    name: 'Citrus Bloom',
    price: 195,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=800&fit=crop',
    category: 'Unisex',
    size: '100ml',
    description: 'Fresh Mediterranean citrus with white florals',
    notes: {
      top: ['Bergamot', 'Lemon'],
      middle: ['Neroli', 'Orange Blossom'],
      base: ['Vetiver', 'Cedarwood'],
    },
  },
  {
    id: '4',
    name: 'Velvet Noir',
    price: 345,
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600&h=800&fit=crop',
    category: 'Exclusive',
    size: '50ml',
    description: 'An intense evening fragrance with dark florals',
    notes: {
      top: ['Black Pepper', 'Cardamom'],
      middle: ['Tuberose', 'Iris'],
      base: ['Leather', 'Sandalwood'],
    },
  },
]

interface ProductCardProps {
  product: Product
  index: number
}

function ProductCard({ product, index }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })
  const { addItem, openCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size || '50ml',
      quantity: 1,
    })
    toast({
      title: 'Added to bag',
      description: `${product.name} has been added to your shopping bag.`,
    })
    openCart()
  }

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: 'Removed from wishlist',
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
      toast({
        title: 'Added to wishlist',
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-luxury-charcoal mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick actions */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-luxury-gold text-luxury-black text-sm uppercase tracking-wider font-medium rounded hover:bg-luxury-gold/90 transition-colors"
          >
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

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs uppercase tracking-wider bg-luxury-black/80 text-luxury-gold rounded">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-display text-luxury-cream group-hover:text-luxury-gold transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-luxury-cream/60 mt-1">{product.size}</p>
          </div>
          <p className="text-lg font-medium text-luxury-gold">
            {formatPrice(product.price)}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < 4 ? 'fill-luxury-gold text-luxury-gold' : 'text-luxury-cream/30'
              }`}
            />
          ))}
          <span className="text-xs text-luxury-cream/60 ml-1">(48)</span>
        </div>
      </Link>
    </motion.div>
  )
}

export function FeaturedProducts() {
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
            Bestsellers
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-light tracking-[0.1em] text-luxury-cream">
            Featured Fragrances
          </h2>
          <div className="w-16 h-px bg-luxury-gold mx-auto mt-6" />
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/products" className="luxury-button">
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
