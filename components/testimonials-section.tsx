"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export function TestimonialsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Carlos Rodríguez",
      company: "TechSolutions Inc.",
      image: "/placeholder.svg?height=80&width=80",
      text: "Trabajar con Hero&Framer Studio fue una experiencia excepcional. Entendieron perfectamente nuestras necesidades y crearon una landing page que superó todas nuestras expectativas. Las conversiones aumentaron un 45% en el primer mes.",
      result: "45% más conversiones",
    },
    {
      name: "Laura Martínez",
      company: "EcoFriendly",
      image: "/placeholder.svg?height=80&width=80",
      text: "Nuestra campaña de lead magnet fue un éxito rotundo gracias a la landing page diseñada por Hero&Framer Studio. El diseño atractivo y el copywriting persuasivo nos ayudaron a captar más de 300 leads cualificados en una semana.",
      result: "320 leads en 1 semana",
    },
    {
      name: "Miguel Sánchez",
      company: "FinanceGrow",
      image: "/placeholder.svg?height=80&width=80",
      text: "La atención al detalle y el enfoque estratégico de Hero&Framer Studio marcaron la diferencia en nuestro proyecto. La landing page no solo es visualmente impresionante, sino que también convierte a un nivel que nunca habíamos visto antes.",
      result: "67% más tiempo en página",
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
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Historias reales de clientes que transformaron sus resultados con nuestras landing pages.
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
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-secondary/20"
                  />
                </div>

                <div className="text-center md:text-left">
                  <p className="italic text-muted-foreground mb-6">"{testimonials[currentIndex].text}"</p>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="font-semibold text-primary dark:text-white">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-sm text-muted-foreground">{testimonials[currentIndex].company}</div>
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
                aria-label="Testimonio anterior"
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
                    aria-label={`Ir al testimonio ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Siguiente testimonio"
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
