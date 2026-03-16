import HeroSection from '@/components/sections/HeroSection'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import ConstellationSection from '@/components/sections/ConstellationSection'
import InteractiveMap from '@/components/sections/InteractiveMap'
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel'
import WhyPrestige from '@/components/sections/WhyPrestige'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prestige Realty - Discover Premium Living in Chandigarh',
  description: 'Explore luxury residential, commercial, and leasing projects. Premium real estate solutions with world-class amenities and expert guidance.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <ConstellationSection />
      <InteractiveMap />
      <TestimonialsCarousel />
      <WhyPrestige />
    </>
  )
}





