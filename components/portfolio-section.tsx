"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

export function PortfolioSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const portfolioItems = [
    {
      image: "/placeholder.svg?height=400&width=600",
      client: "TechSolutions Inc.",
      type: "Landing Page de Ventas",
      result: "45% más conversiones",
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      client: "EcoFriendly",
      type: "Landing Page Lead Magnet",
      result: "320 leads en 1 semana",
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      client: "FinanceGrow",
      type: "Landing Page de Ventas",
      result: "67% más tiempo en página",
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      client: "EventMasters",
      type: "Landing Page Evento",
      result: "98% de registros completados",
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      client: "HealthPlus",
      type: "Landing Page Lead Magnet",
      result: "52% tasa de conversión",
    },
    {
      image: "/placeholder.svg?height=400&width=600",
      client: "TravelDreams",
      type: "Landing Page de Ventas",
      result: "3x ROI en campañas",
    },
  ]

  return (
    <section id="portafolio" ref={sectionRef} className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-white"
          >
            Casos de éxito que hablan por sí mismos
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre cómo hemos ayudado a empresas a aumentar sus conversiones con landing pages estratégicas.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group overflow-hidden rounded-lg shadow-md"
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.client}
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white mb-1">{item.client}</h3>
                <p className="text-white/80 text-sm mb-2">{item.type}</p>
                <div className="inline-block bg-accent/90 text-primary text-sm font-medium px-3 py-1 rounded-full">
                  {item.result}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-12">
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
            Ver todo el portafolio
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
