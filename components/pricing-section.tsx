"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function   PricingSection() {
  const { t, language } = useLanguage()
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

  // Define prices based on language
  const prices = {
    es: {
      startup: "69.990 CLP neto",
      grow: "99.990 CLP neto",
      scaleUp: "149.990 CLP neto",
      enterprise: "199.990 CLP neto",
    },
    pt: {
      startup: " 897 à vista ou 6x R$ 162 ",
      grow: " 1.597  à vista ou 6x R$ 294",
      scaleUp: " 1.997 à vista ou 6x R$ 368",
      enterprise: " 3.297 à vista ou 6x R$ 608",
    },
  }

  const plans = [
    {
      name: t("pricing.plan4.name"),
      description: t("pricing.plan4.description"),
      price: prices[language].startup,
      features: [
        t("pricing.plan4.features.1"),
        t("pricing.plan4.features.2"),
        t("pricing.plan4.features.3"),
        t("pricing.plan4.features.4"),
        t("pricing.plan4.features.5"),
        t("pricing.plan4.features.6"),
        t("pricing.plan4.features.7"),
        t("pricing.plan4.features.8"),
      ],
      popular: false,
    },
    {
      name: t("pricing.plan5.name"),
      description: t("pricing.plan5.description"),
      price: prices[language].grow,
      features: [
        t("pricing.plan5.features.1"),
        t("pricing.plan5.features.2"),
        t("pricing.plan5.features.3"),
        t("pricing.plan5.features.4"),
        t("pricing.plan5.features.5"),
        t("pricing.plan5.features.6"),
        t("pricing.plan5.features.7"),
        t("pricing.plan5.features.8"),
      ],
      popular: true,
    },
    {
      name: t("pricing.plan6.name"),
      description: t("pricing.plan6.description"),
      price: prices[language].scaleUp,
      features: [
        t("pricing.plan6.features.1"),
        t("pricing.plan6.features.2"),
        t("pricing.plan6.features.3"),
        t("pricing.plan6.features.4"),
        t("pricing.plan6.features.5"),
        t("pricing.plan6.features.6"),
        t("pricing.plan6.features.7"),
        // t("pricing.plan6.features.8"),
        // t("pricing.plan6.features.9"),
      ],
      popular: false,
    },
    {
      name: t("pricing.plan7.name"),
      description: t("pricing.plan7.description"),
      price: prices[language].enterprise,
      features: [
        t("pricing.plan7.features.1"),
        t("pricing.plan7.features.2"),
        t("pricing.plan7.features.3"),
        t("pricing.plan7.features.4"),
        t("pricing.plan7.features.5"),
        t("pricing.plan7.features.6"),
        // t("pricing.plan7.features.7"),
      ],
      popular: false,
    },
  ]

  const scrollToContact = (planName: string) => {
    sessionStorage.setItem('selectedPlan', planName);
    const contactSection = document.querySelector('#contact-form')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Function to determine if cards should be shown
  const shouldShowCards = () => {
    return language !== "es"
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-muted/50 dark:bg-slate-900/50" id="pricing">
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

        {shouldShowCards() && (
          <motion.div
            variants={containerVariants}
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`bg-white dark:bg-slate-800 rounded-lg shadow-md border ${plan.popular ? "border-secondary" : "border-border"} overflow-hidden`}
              >
                {plan.popular && (
                  <div className="bg-secondary text-white text-center py-2 text-sm font-medium">
                    {t("pricing.popular_label")}
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-primary dark:text-white">{plan.name}</h3>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-primary dark:text-white">
                      {language === "es" ? plan.price : `R$ ${plan.price}`}
                    </div>
                    {/* <div className="text-sm text-muted-foreground mt-1">
                      {language === "es" 
                        ? "+ 10% de Crédito al Contado o en Cuotas"
                        : "+ 10% Crédito a Vista o Parcelado"
                      }
                    </div> */}
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
                    className={`w-full ${plan.popular
                        ? "bg-secondary hover:bg-secondary/90 text-white"
                        : "bg-primary hover:bg-primary/90 text-white"
                      }`}
                    onClick={() => scrollToContact(plan.name)}
                  >
                    {t("pricing.button")}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}