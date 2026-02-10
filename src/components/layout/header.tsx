'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, Menu, X, Heart, User } from 'lucide-react'
import { useCartStore, useUIStore } from '@/store'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { SearchModal } from '@/components/ui/search-modal'
import { MobileMenu } from '@/components/layout/mobile-menu'
import { TransitionLink } from '@/components/ui/transition-link'

const navLinks = [
  { href: '/collections', label: 'Collections' },
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { items, openCart } = useCartStore()
  const { isMenuOpen, toggleMenu, isSearchOpen, toggleSearch } = useUIStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-luxury-black/95 nav-blur border-b border-luxury-gold/10'
            : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-luxury-cream hover:text-luxury-gold transition-colors"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-12">
              {navLinks.slice(0, 2).map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className="luxury-link text-sm uppercase tracking-[0.2em] font-light"
                >
                  {link.label}
                </TransitionLink>
              ))}
            </nav>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <h1 className="text-xl md:text-2xl lg:text-3xl font-display font-light tracking-[0.3em] text-luxury-cream">
                  <span className="text-luxury-gold">INTERNITY</span>
                </h1>
                <p className="text-[10px] md:text-xs tracking-[0.5em] text-luxury-cream/60 text-center mt-0.5">
                  PERFUME
                </p>
              </motion.div>
            </Link>

            {/* Navigation - Desktop (Right) */}
            <nav className="hidden lg:flex items-center space-x-12">
              {navLinks.slice(2).map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className="luxury-link text-sm uppercase tracking-[0.2em] font-light"
                >
                  {link.label}
                </TransitionLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <button
                onClick={toggleSearch}
                className="p-2 text-luxury-cream hover:text-luxury-gold transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <TransitionLink
                href="/wishlist"
                className="hidden md:block p-2 text-luxury-cream hover:text-luxury-gold transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
              </TransitionLink>

              <TransitionLink
                href="/account"
                className="hidden md:block p-2 text-luxury-cream hover:text-luxury-gold transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </TransitionLink>

              <button
                onClick={openCart}
                className="relative p-2 text-luxury-cream hover:text-luxury-gold transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-luxury-gold text-luxury-black text-xs font-medium rounded-full flex items-center justify-center"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-luxury-gold"
          style={{
            width: isScrolled ? '100%' : '0%',
            transition: 'width 0.3s ease',
          }}
        />
      </motion.header>

      {/* Modals and Drawers */}
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={toggleSearch} />
      <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} links={navLinks} />
    </>
  )
}
