"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "@/contexts/language-context"

export function FaqSection() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

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

  const faqs = [
    {
      question: "¿Cuánto tiempo tarda en crearse una landing page?",
      answer:
        "El tiempo de desarrollo depende de la complejidad del proyecto. Nuestras landing pages esenciales se entregan en 7 días, las profesionales en 10 días y las premium en 14 días. Cada proyecto incluye una fase de revisión para asegurar que todo cumpla con tus expectativas.",
    },
    {
      question: "¿Qué información necesitan para empezar?",
      answer:
        "Para comenzar, necesitamos entender tus objetivos de negocio, tu audiencia objetivo, y cualquier material de marca existente (logo, colores, etc.). También es útil si puedes compartir ejemplos de landing pages que te gusten o referencias de la competencia. Con esta información, podemos crear una estrategia personalizada para tu proyecto.",
    },
    {
      question: "¿Las landing pages incluyen hosting?",
      answer:
        "Nuestros servicios no incluyen hosting por defecto, pero ofrecemos opciones de alojamiento como un servicio adicional. También podemos implementar la landing page en tu hosting existente o recomendarte proveedores confiables según tus necesidades específicas.",
    },
    {
      question: "¿Ofrecen mantenimiento después del lanzamiento?",
      answer:
        "Sí, ofrecemos planes de mantenimiento mensuales que incluyen actualizaciones de contenido, optimización continua y soporte técnico. También realizamos análisis periódicos de rendimiento para identificar oportunidades de mejora y maximizar tus conversiones a largo plazo.",
    },
    {
      question: "¿Cómo miden el éxito de una landing page?",
      answer:
        "Medimos el éxito a través de métricas clave como tasa de conversión, tiempo en página, tasa de rebote y retorno de inversión. Implementamos herramientas de análisis avanzadas para rastrear el comportamiento de los usuarios y optimizar continuamente el rendimiento de tu landing page.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 md:py-24">
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
            {t("faq.title")}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-primary dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
