'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from '@/hooks/use-toast'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

export function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  })

  const onSubmit = async (data: NewsletterFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    console.log('Newsletter subscription:', data)
    setIsSubmitted(true)
    reset()
    
    toast({
      title: 'Welcome to INTERNITY',
      description: 'Thank you for subscribing to our newsletter.',
    })

    // Reset success state after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-luxury-black relative overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/90 to-luxury-black" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 rounded-full border border-luxury-gold/30 flex items-center justify-center mx-auto mb-8"
          >
            <Mail className="w-7 h-7 text-luxury-gold" />
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-display font-light tracking-[0.1em] text-luxury-cream mb-4">
            Join Our World
          </h2>
          <p className="text-luxury-cream/60 mb-8 max-w-md mx-auto">
            Subscribe to receive exclusive offers, early access to new collections, 
            and curated fragrance tips from our master perfumers.
          </p>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="relative max-w-md mx-auto"
          >
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email address"
                {...register('email')}
                className="w-full bg-luxury-dark/50 border border-luxury-gold/30 rounded-full py-4 pl-6 pr-14 text-luxury-cream placeholder:text-luxury-cream/40 focus:border-luxury-gold focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-luxury-gold text-luxury-black flex items-center justify-center hover:bg-luxury-gold/90 transition-colors disabled:opacity-50"
              >
                {isSubmitted ? (
                  <CheckCircle className="w-5 h-5" />
                ) : isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-luxury-black/30 border-t-luxury-black rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            </div>
            
            {errors.email && (
              <p className="text-sm text-red-400 mt-2">{errors.email.message}</p>
            )}
          </motion.form>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-luxury-cream/60"
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
              <span>Exclusive Offers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
              <span>Early Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
              <span>Fragrance Tips</span>
            </div>
          </motion.div>

          <p className="text-xs text-luxury-cream/40 mt-6">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
