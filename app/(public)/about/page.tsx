import { Metadata } from 'next'
import AboutPageClient from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About Us | Prestige Realty चंडीगढ़ - The Narrative Path',
  description: 'Explore the legacy of Prestige Realty, our growth, milestones, and core values of Excellence, Integrity, and Innovation through an interactive narrative path.',
  keywords: 'About Prestige Realty, real estate developers Chandigarh, luxury living values, company history, real estate stats',
}

export default function AboutPage() {
  return <AboutPageClient />
}
