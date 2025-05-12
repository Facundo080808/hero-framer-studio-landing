"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function PricingSection() {
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

  const plans = [
    {
      name: t("pricing.plan1.name"),
      description: t("pricing.plan1.description"),
      price: "1,499",
      features: [
        t("pricing.plan1.features.1"),
        t("pricing.plan1.features.2"),
        t("pricing.plan1.features.3"),
        t("pricing.plan1.features.4"),
        t("pricing.plan1.features.5"),
        t("pricing.plan1.features.6"),
      ],
      popular: false,
    },
    {
      name: t("pricing.plan2.name"),
      description: t("pricing.plan2.description"),
      price: "2,499",
      features: [
        t("pricing.plan2.features.1"),
        t("pricing.plan2.features.2"),
        t("pricing.plan2.features.3"),
        t("pricing.plan2.features.4"),
        t("pricing.plan2.features.5"),
        t("pricing.plan2.features.6"),
        t("pricing.plan2.features.7"),
        t("pricing.plan2.features.8"),
      ],
      popular: true,
    },
    {
      name: t("pricing.plan3.name"),
      description: t("pricing.plan3.description"),
      price: "3,999",
      features: [
        t("pricing.plan3.features.1"),
        t("pricing.plan3.features.2"),
        t("pricing.plan3.features.3"),
        t("pricing.plan3.features.4"),
        t("pricing.plan3.features.5"),
        t("pricing.plan3.features.6"),
        t("pricing.plan3.features.7"),
        t("pricing.plan3.features.8"),
        t("pricing.plan3.features.9"),
      ],
      popular: false,
    },
    {
      name: t("pricing.plan4.name"),
      description: t("pricing.plan4.description"),
      price: "479",
      features: [
        t("pricing.plan4.features.1"),
        t("pricing.plan4.features.2"),
        t("pricing.plan4.features.3"),
        t("pricing.plan4.features.4"),
        t("pricing.plan4.features.5"),
        t("pricing.plan4.features.6"),
      ],
      popular: false,
    },
    {
      name: t("pricing.plan5.name"),
      description: t("pricing.plan5.description"),
      price: "700",
      features: [
        t("pricing.plan5.features.1"),
        t("pricing.plan5.features.2"),
        t("pricing.plan5.features.3"),
        t("pricing.plan5.features.4"),
        t("pricing.plan5.features.5"),
        t("pricing.plan5.features.6"),
        t("pricing.plan5.features.7"),
      ],
      popular: false,
    },
    {
      name: t("pricing.plan6.name"),
      description: t("pricing.plan6.description"),
      price: "990",
      features: [
        t("pricing.plan6.features.1"),
        t("pricing.plan6.features.2"),
        t("pricing.plan6.features.3"),
        t("pricing.plan6.features.4"),
        t("pricing.plan6.features.5"),
        t("pricing.plan6.features.6"),
        t("pricing.plan6.features.7"),
        t("pricing.plan6.features.8"),
      ],
      popular: false,
    },
    {
      name: t("pricing.plan7.name"),
      description: t("pricing.plan7.description"),
      price: "1,490",
      features: [
        t("pricing.plan7.features.1"),
        t("pricing.plan7.features.2"),
        t("pricing.plan7.features.3"),
        t("pricing.plan7.features.4"),
        t("pricing.plan7.features.5"),
        t("pricing.plan7.features.6"),
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
            {t("pricing.title")}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 auto-rows-fr"
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
                <div className="bg-secondary text-white text-center py-2 text-sm font-medium">{t("pricing.popular_label")}</div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-primary dark:text-white">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary dark:text-white">€{plan.price}</span>
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
                  {t("pricing.button")}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}