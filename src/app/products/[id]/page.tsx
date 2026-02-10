'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Star, Minus, Plus, Share2, ChevronRight, Droplets, Sparkles, Clock } from 'lucide-react'
import { useCartStore, useWishlistStore, type Product } from '@/store'
import { formatPrice } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'

// Mock product data - in production this would come from API/Database
const getProductById = (id: string): Product & { 
  images: string[]
  longDescription: string
  rating: number
  reviewCount: number
  inStock: boolean
  sizes: { size: string; price: number }[]
  concentration: string
  longevity: string
  sillage: string
} => {
  return {
    id,
    name: 'Midnight Oud',
    price: 295,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=600&h=800&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=800&h=1000&fit=crop',
    ],
    category: 'For Him',
    size: '100ml',
    description: 'A captivating blend of aged oud and smoky incense',
    longDescription: `Midnight Oud is a sophisticated and intense fragrance that captures the essence of mystery and elegance. This luxurious scent opens with vibrant notes of bergamot and pink pepper, creating an invigorating first impression that immediately captivates the senses.

The heart reveals a rich blend of aged oud wood and Bulgarian rose, a classic combination that speaks to traditional Middle Eastern perfumery while remaining thoroughly modern. The interplay of these notes creates a fascinating complexity that evolves throughout the day.

Finally, the base notes of amber, musk, and sandalwood provide a warm, sensual foundation that ensures exceptional longevity. Midnight Oud is perfect for special occasions and evening wear, leaving a memorable impression wherever you go.`,
    notes: {
      top: ['Bergamot', 'Pink Pepper', 'Saffron'],
      middle: ['Oud', 'Rose', 'Jasmine'],
      base: ['Amber', 'Musk', 'Sandalwood'],
    },
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    sizes: [
      { size: '30ml', price: 145 },
      { size: '50ml', price: 195 },
      { size: '100ml', price: 295 },
    ],
    concentration: 'Eau de Parfum',
    longevity: '8-12 hours',
    sillage: 'Strong',
  }
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  const [quantity, setQuantity] = useState(1)
  
  const { addItem, openCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  
  const detailsRef = useRef<HTMLDivElement>(null)
  const isDetailsInView = useInView(detailsRef, { once: true, margin: '-100px' })

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: selectedSize.price,
      image: product.image,
      size: selectedSize.size,
      quantity: quantity,
    })
    toast({
      title: 'Added to bag',
      description: `${quantity}x ${product.name} (${selectedSize.size}) has been added.`,
    })
    openCart()
  }

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({ title: 'Removed from wishlist' })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
      toast({ title: 'Added to wishlist' })
    }
  }

  return (
    <div className="min-h-screen bg-luxury-black pt-24">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-luxury-cream/60">
          <Link href="/" className="hover:text-luxury-gold transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-luxury-gold transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-luxury-cream">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Gallery */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-[3/4] rounded-lg overflow-hidden bg-luxury-charcoal"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-luxury-gold' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Category & Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm uppercase tracking-[0.2em] text-luxury-gold">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-luxury-gold text-luxury-gold'
                            : 'text-luxury-cream/30'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-luxury-cream/60 ml-2">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                {/* Name */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-light tracking-[0.1em] text-luxury-cream mb-2">
                  {product.name}
                </h1>
                
                <p className="text-luxury-cream/60 mb-6">{product.concentration}</p>
                
                <p className="text-luxury-cream/80 leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Price */}
                <p className="text-3xl font-display text-luxury-gold mb-8">
                  {formatPrice(selectedSize.price)}
                </p>

                {/* Size Selection */}
                <div className="mb-8">
                  <p className="text-sm uppercase tracking-wider text-luxury-cream/60 mb-3">
                    Select Size
                  </p>
                  <div className="flex gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size.size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-3 border rounded-lg transition-all ${
                          selectedSize.size === size.size
                            ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold'
                            : 'border-luxury-gold/30 text-luxury-cream hover:border-luxury-gold'
                        }`}
                      >
                        <span className="block text-lg">{size.size}</span>
                        <span className="text-sm opacity-60">{formatPrice(size.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <p className="text-sm uppercase tracking-wider text-luxury-cream/60 mb-3">
                    Quantity
                  </p>
                  <div className="inline-flex items-center border border-luxury-gold/30 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 text-luxury-cream hover:text-luxury-gold transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-16 text-center text-lg text-luxury-cream">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 text-luxury-cream hover:text-luxury-gold transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mb-8">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 luxury-button flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Bag
                  </button>
                  <button
                    onClick={handleWishlist}
                    className={`p-4 rounded border transition-colors ${
                      isInWishlist(product.id)
                        ? 'bg-luxury-gold border-luxury-gold text-luxury-black'
                        : 'border-luxury-gold/30 text-luxury-cream hover:border-luxury-gold'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-4 rounded border border-luxury-gold/30 text-luxury-cream hover:border-luxury-gold transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 p-6 bg-luxury-dark/50 rounded-lg border border-luxury-gold/10">
                  <div className="text-center">
                    <Droplets className="w-6 h-6 text-luxury-gold mx-auto mb-2" />
                    <p className="text-xs uppercase tracking-wider text-luxury-cream/60">Sillage</p>
                    <p className="text-sm text-luxury-cream mt-1">{product.sillage}</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-6 h-6 text-luxury-gold mx-auto mb-2" />
                    <p className="text-xs uppercase tracking-wider text-luxury-cream/60">Longevity</p>
                    <p className="text-sm text-luxury-cream mt-1">{product.longevity}</p>
                  </div>
                  <div className="text-center">
                    <Sparkles className="w-6 h-6 text-luxury-gold mx-auto mb-2" />
                    <p className="text-xs uppercase tracking-wider text-luxury-cream/60">Type</p>
                    <p className="text-sm text-luxury-cream mt-1">EDP</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section ref={detailsRef} className="py-16 md:py-24 border-t border-luxury-gold/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isDetailsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-display text-luxury-cream mb-6">About This Fragrance</h2>
              <div className="prose prose-invert prose-lg">
                {product.longDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-luxury-cream/70 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Notes Pyramid */}
            {product.notes && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isDetailsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-display text-luxury-cream mb-6">Fragrance Notes</h2>
              <div className="space-y-8">
                {/* Top Notes */}
                <div className="luxury-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                      <span className="text-luxury-gold text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-wider text-luxury-gold">Top Notes</h3>
                      <p className="text-xs text-luxury-cream/40">First impression (0-30 min)</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.top.map((note) => (
                      <span key={note} className="px-4 py-2 bg-luxury-gold/10 rounded-full text-sm text-luxury-cream">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Middle Notes */}
                <div className="luxury-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                      <span className="text-luxury-gold text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-wider text-luxury-gold">Heart Notes</h3>
                      <p className="text-xs text-luxury-cream/40">The signature (30 min - 3h)</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.middle.map((note) => (
                      <span key={note} className="px-4 py-2 bg-luxury-gold/10 rounded-full text-sm text-luxury-cream">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Base Notes */}
                <div className="luxury-card">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-luxury-gold/20 flex items-center justify-center">
                      <span className="text-luxury-gold text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-wider text-luxury-gold">Base Notes</h3>
                      <p className="text-xs text-luxury-cream/40">The lasting impression (3h+)</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.notes.base.map((note) => (
                      <span key={note} className="px-4 py-2 bg-luxury-gold/10 rounded-full text-sm text-luxury-cream">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
