import { useState } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import AboutSection from "./components/AboutSection"
import Footer from "./components/Footer"
import PricingPlans from "./components/PricingPlans"
import Services from "./components/Services"
import Testimonials from "./components/Testimonials"
import WhyChoose from "./components/WhyChoose"

export default function Home() {

  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <Hero/>
      <Services />
      <AboutSection />
      <WhyChoose />
      <Testimonials />
      <PricingPlans />
      <Footer />
    </div>
  )
}
