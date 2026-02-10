'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'
import { useWishlistStore, useCartStore } from '@/store'
import { formatPrice } from '@/lib/utils'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const addToCart = useCartStore((state) => state.addItem)

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      size: '50ml',
    })
    removeItem(item.id)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-luxury-black pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4"
        >
          <div className="w-24 h-24 mx-auto rounded-full border-2 border-luxury-gold/30 flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-luxury-gold" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display text-luxury-cream mb-4">
            Your Wishlist is Empty
          </h1>
          <p className="text-luxury-cream/60 mb-8 max-w-md">
            Save your favorite fragrances to your wishlist and never lose sight of what you love.
          </p>
          <Link href="/products" className="luxury-button inline-flex items-center gap-2">
            Explore Fragrances
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luxury-black pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-display font-light tracking-[0.1em] text-luxury-cream mb-2">
            My Wishlist
          </h1>
          <p className="text-luxury-cream/60">
            {items.length} item{items.length !== 1 ? 's' : ''} saved
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 bg-luxury-charcoal">
                  <Link href={`/products/${item.id}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-luxury-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/80"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                  
                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(item)}
                    className="absolute bottom-4 left-4 right-4 py-2.5 bg-luxury-black/80 backdrop-blur-sm text-luxury-cream text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all hover:bg-luxury-gold hover:text-luxury-black flex items-center justify-center gap-2 rounded"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Move to Bag
                  </motion.button>
                </div>
                
                <Link href={`/products/${item.id}`}>
                  <h3 className="text-luxury-cream font-display text-lg tracking-wide group-hover:text-luxury-gold transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-luxury-cream/70 mt-1">
                    {formatPrice(item.price)}
                  </p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Continue Shopping */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-luxury-cream/70 hover:text-luxury-gold transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
