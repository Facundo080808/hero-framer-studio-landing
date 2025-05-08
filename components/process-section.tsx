"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Search, Palette, Code, BarChart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ProcessSection() {
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

  const processSteps = [
    {
      title: t("process.step1.title"),
      description: t("process.step1.description"),
      icon: <Search className="h-10 w-10 text-secondary" />,
    },
    {
      title: t("process.step2.title"),
      description: t("process.step2.description"),
      icon: <Palette className="h-10 w-10 text-secondary" />,
    },
    {
      title: t("process.step3.title"),
      description: t("process.step3.description"),
      icon: <Code className="h-10 w-10 text-secondary" />,
    },
    {
      title: t("process.step4.title"),
      description: t("process.step4.description"),
      icon: <BarChart className="h-10 w-10 text-secondary" />,
    },
  ]

  return (
    <section id="proceso" ref={sectionRef} className="py-16 md:py-24 bg-muted/50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-white"
          >
            {t("process.title")}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("process.subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border dark:bg-slate-700 transform -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 md:space-y-0 relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 text-center md:text-${index % 2 === 0 ? "right" : "left"}`}>
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-border">
                    <h3 className="text-xl font-bold mb-3 text-primary dark:text-white">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 border-4 border-background dark:border-slate-900 z-10">
                  <div className="text-secondary">{step.icon}</div>
                  <div className="absolute top-0 left-0 w-full h-full rounded-full bg-secondary/10 animate-ping opacity-75" />
                </div>

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}