"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function PricingSection() {
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

  const plans = [
    {
      name: "Esencial",
      description: "Para profesionales independientes",
      price: "1,499",
      features: [
        "1 Landing Page",
        "Diseño responsive",
        "Copywriting persuasivo",
        "Formulario de contacto",
        "Optimización SEO básica",
        "Entrega en 7 días",
      ],
      popular: false,
    },
    {
      name: "Profesional",
      description: "Para pequeñas empresas",
      price: "2,499",
      features: [
        "1 Landing Page",
        "Diseño responsive premium",
        "Copywriting avanzado",
        "Integración con CRM",
        "Animaciones personalizadas",
        "Optimización SEO completa",
        "A/B Testing",
        "Entrega en 10 días",
      ],
      popular: true,
    },
    {
      name: "Premium",
      description: "Para medianas empresas",
      price: "3,999",
      features: [
        "1 Landing Page compleja",
        "Diseño responsive premium+",
        "Copywriting por expertos",
        "Integraciones avanzadas",
        "Animaciones personalizadas",
        "Optimización SEO avanzada",
        "A/B Testing múltiple",
        "Análisis de conversión",
        "Entrega en 14 días",
      ],
      popular: false,
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-muted/50 dark:bg-slate-900/50">
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
            Planes que se adaptan a tu negocio
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluciones a medida para maximizar tus conversiones, sin importar el tamaño de tu empresa.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`bg-white dark:bg-slate-800 rounded-lg shadow-md border ${
                plan.popular ? "border-secondary" : "border-border"
              } overflow-hidden`}
            >
              {plan.popular && (
                <div className="bg-secondary text-white text-center py-2 text-sm font-medium">Más popular</div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-primary dark:text-white">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary dark:text-white">${plan.price}</span>
                  <span className="text-muted-foreground"> EUR</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-secondary hover:bg-secondary/90 text-white"
                      : "bg-primary hover:bg-primary/90 text-white"
                  }`}
                >
                  Seleccionar plan
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
