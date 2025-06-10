
"use client"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FaqSection } from "@/components/faq-section"
import { AuthoritySection } from "@/components/authority-section"
import { ServicesSection } from "@/components/services-section"
import { ProcessSection } from "@/components/process-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { ContactForm } from "@/components/contact-form"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CookieConsent } from "@/components/cookie-consent"
import TypeformContact from "@/components/typeform-contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AuthoritySection />
      <ServicesSection />
      <ProcessSection />
      <PortfolioSection />
      <TestimonialsSection />
      {/* <PricingSection /> */}
      {/* <ContactForm /> */}
      <TypeformContact />
      <CtaSection />
      <FaqSection />
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </main>
  )
}
