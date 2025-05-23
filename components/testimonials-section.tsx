"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function TestimonialsSection() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    
    {
      name: t("testimonials.item4.name"),
      company: t("testimonials.item4.company"),
      image: "/placeholder.svg?height=80&width=80",
      text: t("testimonials.item4.text"),
      result: t("testimonials.item4.result"),
      alt: t("testimonials.item4.alt"),
      link: t("testimonials.item4.link"),
    },
    {
      name: t("testimonials.item5.name"),
      company: t("testimonials.item5.company"),
      image: "/placeholder.svg?height=80&width=80",
      text: t("testimonials.item5.text"),
      result: t("testimonials.item5.result"),
      alt: t("testimonials.item5.alt"),
      link: t("testimonials.item5.link"),
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  }

  return (
    <section id="testimonios" ref={sectionRef} className="py-16 md:py-24">
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
            {t("testimonials.title")}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative max-w-4xl mx-auto"
        >
          <div className="absolute -top-8 -left-8 text-secondary/20 dark:text-secondary/10">
            <Quote size={80} />
          </div>

          <div className="relative bg-white dark:bg-slate-800 p-8 md:p-12 rounded-lg shadow-md border border-border">
            <AnimatePresence custom={currentIndex} mode="wait">
              <motion.div
                key={currentIndex}
                custom={currentIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="flex-shrink-0">
                 
                </div>

                <div className="text-center md:text-left">
                  <p className="italic text-muted-foreground mb-6">"{testimonials[currentIndex].text}"</p>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="font-semibold text-primary dark:text-white">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].link ? (
                          <Link
                            href={testimonials[currentIndex].link}
                            className="text-primary hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {testimonials[currentIndex].company}
                          </Link>
                        ) : (
                          testimonials[currentIndex].company
                        )}
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0">
                      <span className="inline-block bg-accent/90 text-primary text-sm font-medium px-3 py-1 rounded-full">
                        {testimonials[currentIndex].result}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label={t("testimonials.prev_button")}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex ? "bg-secondary" : "bg-muted-foreground/30"
                    }`}
                    aria-label={t("testimonials.nav_button").replace("{index}", (index + 1).toString())}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label={t("testimonials.next_button")}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}