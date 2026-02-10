'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MapPin, Phone, Mail, Clock, Send, Check, MessageCircle, Package, HelpCircle } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(5, 'Subject is required'),
  orderNumber: z.string().optional(),
  message: z.string().min(20, 'Please provide more details (minimum 20 characters)'),
})

type ContactFormData = z.infer<typeof contactSchema>

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Our Boutique',
    lines: ['123 Avenue Montaigne', 'Paris, 75008', 'France'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+33 1 42 25 00 00', 'Mon-Fri: 9AM - 6PM CET'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['contact@internity.com', 'orders@internity.com'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['Monday - Friday: 9AM - 7PM', 'Saturday: 10AM - 6PM', 'Sunday: Closed'],
  },
]

const inquiryTypes = [
  { id: 'general', label: 'General Inquiry', icon: MessageCircle },
  { id: 'order', label: 'Order Support', icon: Package },
  { id: 'product', label: 'Product Question', icon: HelpCircle },
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedType, setSelectedType] = useState('general')
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log('Form data:', data)
    setIsSubmitted(true)
    reset()
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-luxury-black pt-24">
      {/* Hero */}
      <section className="relative h-72 md:h-80 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920"
            alt="Contact INTERNITY"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-black/50 to-luxury-black" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-[0.3em] text-luxury-gold mb-4"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-light tracking-[0.15em] text-luxury-cream"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-luxury-cream/60 mt-4 max-w-lg"
          >
            We&apos;re here to assist you with any questions about our fragrances or your orders.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-white/10 rounded-lg hover:border-luxury-gold/30 transition-colors text-center"
              >
                <info.icon className="w-8 h-8 text-luxury-gold mx-auto mb-4" />
                <h3 className="text-luxury-cream font-display mb-3">{info.title}</h3>
                {info.lines.map((line, i) => (
                  <p key={i} className="text-luxury-cream/60 text-sm">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-display font-light tracking-[0.1em] text-luxury-cream mb-8">
                Send Us a Message
              </h2>

              {/* Inquiry Type Selection */}
              <div className="flex flex-wrap gap-3 mb-8">
                {inquiryTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${
                      selectedType === type.id
                        ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold'
                        : 'border-white/20 text-luxury-cream/60 hover:border-white/40'
                    }`}
                  >
                    <type.icon className="w-4 h-4" />
                    <span className="text-sm">{type.label}</span>
                  </button>
                ))}
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 border border-green-500/30 rounded-lg text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-display text-luxury-cream mb-2">Message Sent!</h3>
                  <p className="text-luxury-cream/60">
                    Thank you for reaching out. We&apos;ll respond within 24-48 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-luxury-cream/70 mb-2">Name *</label>
                      <input
                        {...register('name')}
                        className="w-full px-4 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream placeholder:text-luxury-cream/40 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-luxury-cream/70 mb-2">Email *</label>
                      <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream placeholder:text-luxury-cream/40 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-luxury-cream/70 mb-2">Subject *</label>
                    <input
                      {...register('subject')}
                      className="w-full px-4 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream placeholder:text-luxury-cream/40 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                      placeholder="How can we help?"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  {selectedType === 'order' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                    >
                      <label className="block text-sm text-luxury-cream/70 mb-2">Order Number</label>
                      <input
                        {...register('orderNumber')}
                        className="w-full px-4 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream placeholder:text-luxury-cream/40 focus:outline-none focus:border-luxury-gold/50 transition-colors"
                        placeholder="INT-XXXXXXXXX"
                      />
                    </motion.div>
                  )}

                  <div>
                    <label className="block text-sm text-luxury-cream/70 mb-2">Message *</label>
                    <textarea
                      {...register('message')}
                      rows={6}
                      className="w-full px-4 py-3 bg-luxury-charcoal border border-white/10 rounded text-luxury-cream placeholder:text-luxury-cream/40 focus:outline-none focus:border-luxury-gold/50 transition-colors resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="luxury-button w-full md:w-auto px-12 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-luxury-black border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Right: Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="aspect-square md:aspect-[4/3] relative rounded-lg overflow-hidden bg-luxury-charcoal">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                  alt="Paris location"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6 bg-luxury-black/80 backdrop-blur-sm rounded-lg">
                    <MapPin className="w-8 h-8 text-luxury-gold mx-auto mb-3" />
                    <p className="text-luxury-cream font-display">INTERNITY Paris</p>
                    <p className="text-luxury-cream/60 text-sm">123 Avenue Montaigne</p>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="p-6 border border-white/10 rounded-lg">
                <h3 className="text-lg font-display text-luxury-cream mb-4">Frequently Asked Questions</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="flex items-center gap-2 text-luxury-cream/70 hover:text-luxury-gold transition-colors">
                      <span className="text-luxury-gold">→</span>
                      Shipping & Delivery Information
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-luxury-cream/70 hover:text-luxury-gold transition-colors">
                      <span className="text-luxury-gold">→</span>
                      Returns & Exchange Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-luxury-cream/70 hover:text-luxury-gold transition-colors">
                      <span className="text-luxury-gold">→</span>
                      How to Choose Your Fragrance
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center gap-2 text-luxury-cream/70 hover:text-luxury-gold transition-colors">
                      <span className="text-luxury-gold">→</span>
                      Fragrance Care & Storage
                    </a>
                  </li>
                </ul>
              </div>

              {/* VIP Contact */}
              <div className="p-6 bg-gradient-to-br from-luxury-gold/10 to-transparent border border-luxury-gold/20 rounded-lg">
                <h3 className="text-lg font-display text-luxury-gold mb-2">VIP Client Services</h3>
                <p className="text-luxury-cream/70 text-sm mb-4">
                  For our exclusive VIP members, enjoy priority support and personalized consultations.
                </p>
                <a
                  href="tel:+33142250001"
                  className="inline-flex items-center gap-2 text-luxury-gold hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  +33 1 42 25 00 01
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
