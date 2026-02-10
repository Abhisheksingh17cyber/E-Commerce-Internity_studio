'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { Award, Leaf, Heart, Sparkles, ArrowRight } from 'lucide-react'

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'Every fragrance is crafted with uncompromising attention to detail, using only the finest ingredients from around the world.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'We are committed to ethical sourcing and sustainable practices, ensuring our luxury leaves a positive footprint.',
  },
  {
    icon: Heart,
    title: 'Artistry',
    description: 'Our master perfumers blend tradition with innovation, creating scents that tell stories and evoke emotions.',
  },
  {
    icon: Sparkles,
    title: 'Exclusivity',
    description: 'Limited productions ensure that each INTERNITY fragrance remains a rare and treasured possession.',
  },
]

const timeline = [
  { year: '2010', event: 'INTERNITY was founded in Paris, with a vision to create timeless luxury fragrances.' },
  { year: '2013', event: 'Launched our first signature collection, featuring five exclusive scents.' },
  { year: '2016', event: 'Opened our flagship boutique on Avenue Montaigne, Paris.' },
  { year: '2019', event: 'Expanded globally, with presence in over 40 luxury destinations worldwide.' },
  { year: '2022', event: 'Launched the Exclusive Collection, featuring ultra-rare ingredients.' },
  { year: '2024', event: 'Celebrating 14 years of crafting unforgettable olfactory experiences.' },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <div className="min-h-screen bg-luxury-black">
      {/* Hero */}
      <section ref={heroRef} className="relative h-[80vh] overflow-hidden">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920"
            alt="INTERNITY Atelier"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-luxury-black/70 via-luxury-black/50 to-luxury-black" />
        </motion.div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm uppercase tracking-[0.4em] text-luxury-gold mb-6"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-light tracking-[0.15em] text-luxury-cream mb-6"
          >
            INTERNITY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-luxury-cream/70 font-light tracking-wide max-w-2xl"
          >
            Where artistry meets eternity
          </motion.p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-luxury-gold mb-4">Our Philosophy</p>
              <h2 className="text-3xl md:text-4xl font-display font-light tracking-[0.1em] text-luxury-cream mb-6">
                Crafting Memories Through Scent
              </h2>
              <div className="space-y-4 text-luxury-cream/70 leading-relaxed">
                <p>
                  At INTERNITY, we believe that fragrance is more than a luxury — it is an art form that 
                  transcends time. Each perfume we create is a masterpiece, designed to capture fleeting 
                  moments and transform them into eternal memories.
                </p>
                <p>
                  Our journey began in the heart of Paris, where a passion for exceptional perfumery 
                  met an unwavering commitment to quality. Today, we continue this legacy, working 
                  with the world&apos;s most talented noses to create fragrances that are both timeless 
                  and contemporary.
                </p>
                <p>
                  Every INTERNITY fragrance tells a story — of rare ingredients sourced from the 
                  most prestigious origins, of centuries-old techniques passed down through generations, 
                  and of the modern artistry that brings it all together.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/5] relative rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800"
                  alt="Perfume crafting"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-luxury-gold/10 rounded-lg -z-10" />
              <div className="absolute -top-8 -right-8 w-32 h-32 border border-luxury-gold/30 rounded-lg -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-gradient-to-b from-luxury-charcoal/50 to-luxury-black">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-luxury-gold mb-4">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-display font-light tracking-[0.1em] text-luxury-cream">
              What We Stand For
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 border border-white/10 rounded-lg hover:border-luxury-gold/30 transition-colors group"
              >
                <value.icon className="w-10 h-10 text-luxury-gold mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-display text-luxury-cream mb-3">{value.title}</h3>
                <p className="text-luxury-cream/60 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-luxury-gold mb-4">Our Journey</p>
            <h2 className="text-3xl md:text-4xl font-display font-light tracking-[0.1em] text-luxury-cream">
              A Legacy of Excellence
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-luxury-gold/20 md:-translate-x-1/2" />
              
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-start md:items-center gap-8 mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-luxury-gold rounded-full md:-translate-x-1/2 z-10" />
                  
                  {/* Year */}
                  <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <span className="text-2xl font-display text-luxury-gold">{item.year}</span>
                  </div>
                  
                  {/* Event */}
                  <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <p className="text-luxury-cream/70">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=1920"
            alt="Craftsmanship"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/80 to-luxury-black" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-luxury-gold mb-4">Master Craftsmanship</p>
              <h2 className="text-3xl md:text-4xl font-display font-light tracking-[0.1em] text-luxury-cream mb-6">
                The Art of Perfumery
              </h2>
              <p className="text-luxury-cream/70 leading-relaxed mb-8">
                Our fragrances are created in our atelier by master perfumers who have dedicated 
                their lives to the art of scent. Using traditional techniques combined with modern 
                innovation, each bottle represents hundreds of hours of meticulous work.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <p className="text-3xl font-display text-luxury-gold mb-2">200+</p>
                  <p className="text-xs uppercase tracking-wider text-luxury-cream/50">Ingredients</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-display text-luxury-gold mb-2">50+</p>
                  <p className="text-xs uppercase tracking-wider text-luxury-cream/50">Countries</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-display text-luxury-gold mb-2">14</p>
                  <p className="text-xs uppercase tracking-wider text-luxury-cream/50">Years</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=600"
                  alt="Perfume bottle"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden mt-12">
                <Image
                  src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600"
                  alt="Ingredients"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-light tracking-[0.1em] text-luxury-cream mb-6">
              Experience INTERNITY
            </h2>
            <p className="text-luxury-cream/60 max-w-xl mx-auto mb-8">
              Discover our collections and find the fragrance that speaks to your soul.
            </p>
            <Link href="/collections" className="luxury-button inline-flex items-center gap-2">
              Explore Collections
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
