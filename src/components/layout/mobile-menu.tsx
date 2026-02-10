'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, Heart, User, ShoppingBag } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: { href: string; label: string }[]
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
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
            className="fixed inset-0 bg-black/80 z-50 lg:hidden"
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-luxury-black z-50 lg:hidden border-r border-luxury-gold/10"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-luxury-gold/10">
                <h2 className="text-xl font-display font-light tracking-[0.3em] text-luxury-cream">
                  <span className="text-luxury-gold">INTERNITY</span>
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-luxury-cream hover:text-luxury-gold transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-6 py-8">
                <ul className="space-y-6">
                  {links.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="block text-lg uppercase tracking-[0.2em] text-luxury-cream hover:text-luxury-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Quick Links */}
              <div className="px-6 py-6 border-t border-luxury-gold/10">
                <div className="flex items-center justify-center gap-8">
                  <Link
                    href="/wishlist"
                    onClick={onClose}
                    className="flex flex-col items-center gap-2 text-luxury-cream/60 hover:text-luxury-gold transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-wider">Wishlist</span>
                  </Link>
                  <Link
                    href="/account"
                    onClick={onClose}
                    className="flex flex-col items-center gap-2 text-luxury-cream/60 hover:text-luxury-gold transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-wider">Account</span>
                  </Link>
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="flex flex-col items-center gap-2 text-luxury-cream/60 hover:text-luxury-gold transition-colors"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span className="text-xs uppercase tracking-wider">Cart</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
