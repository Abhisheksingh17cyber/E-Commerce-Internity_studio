'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store'
import { formatPrice } from '@/lib/utils'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  const totalPrice = getTotalPrice()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-luxury-black z-50 border-l border-luxury-gold/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-luxury-gold/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-luxury-gold" />
                <h2 className="text-lg uppercase tracking-[0.2em] text-luxury-cream">
                  Shopping Bag
                </h2>
                <span className="text-sm text-luxury-cream/60">
                  ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-luxury-cream hover:text-luxury-gold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-luxury-gold/30 mb-4" />
                  <h3 className="text-lg text-luxury-cream mb-2">
                    Your bag is empty
                  </h3>
                  <p className="text-sm text-luxury-cream/60 mb-6">
                    Discover our exquisite fragrances
                  </p>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="luxury-button"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item, index) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 pb-6 border-b border-luxury-gold/10"
                    >
                      {/* Product Image */}
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-luxury-charcoal flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-sm font-medium text-luxury-cream truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs text-luxury-cream/60 mt-1">
                              {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-luxury-cream/40 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 border border-luxury-gold/30 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 text-luxury-cream/60 hover:text-luxury-gold transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-sm text-luxury-cream">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 text-luxury-cream/60 hover:text-luxury-gold transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <p className="text-sm text-luxury-gold font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-luxury-gold/10 bg-luxury-dark/50">
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-luxury-cream/60">Subtotal</span>
                  <span className="text-lg font-medium text-luxury-cream">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                
                <p className="text-xs text-luxury-cream/40 mb-4">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full luxury-button text-center"
                >
                  Proceed to Checkout
                </Link>
                
                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="w-full mt-3 py-3 text-sm uppercase tracking-[0.2em] text-luxury-cream/60 hover:text-luxury-gold transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
