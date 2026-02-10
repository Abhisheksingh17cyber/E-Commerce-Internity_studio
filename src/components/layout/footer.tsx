'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react'

const footerLinks = {
  shop: [
    { href: '/products', label: 'All Perfumes' },
    { href: '/collections/for-her', label: 'For Her' },
    { href: '/collections/for-him', label: 'For Him' },
    { href: '/collections/unisex', label: 'Unisex' },
    { href: '/collections/gift-sets', label: 'Gift Sets' },
  ],
  about: [
    { href: '/about', label: 'Our Story' },
    { href: '/craftsmanship', label: 'Craftsmanship' },
    { href: '/sustainability', label: 'Sustainability' },
    { href: '/press', label: 'Press' },
    { href: '/careers', label: 'Careers' },
  ],
  support: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping' },
    { href: '/returns', label: 'Returns' },
    { href: '/track-order', label: 'Track Order' },
  ],
}

const socialLinks = [
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://youtube.com', icon: Youtube, label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="bg-luxury-black border-t border-luxury-gold/10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-2xl font-display font-light tracking-[0.3em] text-luxury-cream">
                <span className="text-luxury-gold">INTERNITY</span>
              </h2>
              <p className="text-xs tracking-[0.5em] text-luxury-cream/60 mt-1">
                PERFUME
              </p>
            </Link>
            <p className="text-luxury-cream/60 text-sm leading-relaxed mb-6 max-w-md">
              Crafting exquisite fragrances that capture the essence of timeless elegance. 
              Each INTERNITY creation is a masterpiece of olfactory artistry, designed to 
              leave an unforgettable impression.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-luxury-cream/60">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-luxury-gold" />
                <span>123 Luxury Avenue, Paris, France</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-luxury-gold" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-luxury-gold" />
                <span>contact@internity-perfume.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-luxury-cream mb-6">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-luxury-cream/60 hover:text-luxury-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-luxury-cream mb-6">About</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-luxury-cream/60 hover:text-luxury-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-luxury-cream mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-luxury-cream/60 hover:text-luxury-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-luxury-gold/10">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-cream/60 hover:text-luxury-gold hover:border-luxury-gold transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-xs text-luxury-cream/40 tracking-wider">
              © {new Date().getFullYear()} INTERNITY PERFUME. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-xs text-luxury-cream/40">
              <Link href="/privacy" className="hover:text-luxury-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-luxury-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
