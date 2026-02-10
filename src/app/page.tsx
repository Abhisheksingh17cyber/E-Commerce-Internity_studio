'use client'

import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { BrandStory } from '@/components/home/brand-story'
import { CollectionShowcase } from '@/components/home/collection-showcase'
import { Testimonials } from '@/components/home/testimonials'
import { Newsletter } from '@/components/home/newsletter'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <BrandStory />
      <CollectionShowcase />
      <Testimonials />
      <Newsletter />
    </>
  )
}
