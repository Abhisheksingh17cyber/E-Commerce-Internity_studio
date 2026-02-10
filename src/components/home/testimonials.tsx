'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sophia Laurent',
    location: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    rating: 5,
    product: 'Rose Petale',
    text: 'INTERNITY has completely transformed my perfume experience. Rose Petale is absolutely divine—it lasts all day and I receive compliments everywhere I go. This is true luxury.',
  },
  {
    id: 2,
    name: 'Alexander Chen',
    location: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    rating: 5,
    product: 'Midnight Oud',
    text: 'As someone who has tried countless fragrances, Midnight Oud stands out as exceptional. The depth and complexity of this scent is unmatched. Worth every penny.',
  },
  {
    id: 3,
    name: 'Isabella Rodriguez',
    location: 'Madrid, Spain',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    rating: 5,
    product: 'Velvet Noir',
    text: 'The attention to detail in every INTERNITY bottle is remarkable. Velvet Noir has become my signature scent—sophisticated, mysterious, and unforgettable.',
  },
  {
    id: 4,
    name: 'James Morrison',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    rating: 5,
    product: 'Citrus Bloom',
    text: 'Fresh, elegant, and perfect for any occasion. Citrus Bloom has become my everyday fragrance. The quality is exceptional and the longevity is impressive.',
  },
]

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-luxury-dark relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-luxury-gold/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 rounded-full bg-luxury-gold/5 blur-3xl" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-luxury-gold mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-light tracking-[0.1em] text-luxury-cream">
            What Our Clients Say
          </h2>
          <div className="w-16 h-px bg-luxury-gold mx-auto mt-6" />
        </motion.div>

        {/* Testimonial Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Quote Icon */}
            <Quote className="absolute -top-8 left-0 w-16 h-16 text-luxury-gold/20" />

            {/* Testimonial Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-luxury-gold text-luxury-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl lg:text-2xl text-luxury-cream/90 leading-relaxed italic mb-8">
                  &ldquo;{currentTestimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-luxury-gold/30">
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-luxury-cream font-medium">
                      {currentTestimonial.name}
                    </p>
                    <p className="text-sm text-luxury-cream/60">
                      {currentTestimonial.location}
                    </p>
                    <p className="text-sm text-luxury-gold mt-1">
                      Purchased: {currentTestimonial.product}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-cream hover:border-luxury-gold hover:text-luxury-gold transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === currentIndex
                        ? 'bg-luxury-gold w-8'
                        : 'bg-luxury-cream/30 hover:bg-luxury-cream/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-luxury-gold/30 flex items-center justify-center text-luxury-cream hover:border-luxury-gold hover:text-luxury-gold transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
