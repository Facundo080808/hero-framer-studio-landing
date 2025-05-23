"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function PortfolioSection() {
  const { t } = useLanguage()
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
      image: "/placeholder.svg",
      client: t("portfolio.item1.client"),
      type: t("portfolio.item1.type"),
      result: t("portfolio.item1.result"),
      alt: t("portfolio.item1.alt"),
      url: "https://saidafiscal.pro"
    },
    {
      image: "/placeholder.svg",
      client: t("portfolio.item2.client"),
      type: t("portfolio.item2.type"),
      result: t("portfolio.item2.result"),
      alt: t("portfolio.item2.alt"),
      url: "https://whatsorderai.protoly.lat"
    },
    {
      image: "/placeholder.svg",
      client: t("portfolio.item3.client"),
      type: t("portfolio.item3.type"),
      result: t("portfolio.item3.result"),
      alt: t("portfolio.item3.alt"),
      url: "https://perceivoai.agency"
    },
    {
      image: "/placeholder.svg",
      client: t("portfolio.item4.client"),
      type: t("portfolio.item4.type"),
      result: t("portfolio.item4.result"),
      alt: t("portfolio.item4.alt"),
      url: "https://franchise.perceivoai.agency"
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
            {t("portfolio.title")}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("portfolio.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioItems.map((item, index) => (
            <a 
              key={index} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <motion.div
                variants={itemVariants}
                className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.alt}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/20 group-hover:from-primary/95 group-hover:to-primary/30 opacity-100 flex flex-col justify-end p-6 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-white/90">{item.client}</h3>
                  <p className="text-white/80 text-sm mb-2 group-hover:text-white">{item.type}</p>
                  <div className="inline-flex items-center bg-accent/90 text-primary text-sm font-medium px-3 py-1 rounded-full group-hover:bg-accent">
                    {item.result}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </a>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="text-center mt-12">
          <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
            {t("portfolio.button")}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}