"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { motion, spring, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Download, Calendar, CheckCircle, Zap, BarChart } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export function ServicesSection() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 }) // Lowered amount for mobile

  // Fallback to ensure visibility on mobile if useInView fails
  useEffect(() => {
    if (isInView) {
      setIsVisible(true)
    }
    // Timeout fallback for mobile devices
    const timer = setTimeout(() => setIsVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [isInView])

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

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: spring,
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const services = [
    {
      title: t("services.card1.title"),
      description: t("services.card1.description"),
      icon: <ShoppingBag className="h-10 w-10 text-white" />,
      image: "/autority-seccion1.jpg",
      features: [
        t("services.card1.feature1"),
        t("services.card1.feature2"),
        t("services.card1.feature3"),
        t("services.card1.feature4"),
      ],
      caseStudy: {
        client: t("services.card1.case_study.client"),
        result: t("services.card1.case_study.result"),
      },
      color: "from-secondary to-purple-700",
    },
    {
      title: t("services.card2.title"),
      description: t("services.card2.description"),
      icon: <Download className="h-10 w-10 text-white" />,
      image: "/autority-seccion1.jpg",
      features: [
        t("services.card2.feature1"),
        t("services.card2.feature2"),
        t("services.card2.feature3"),
        t("services.card2.feature4"),
      ],
      caseStudy: {
        client: t("services.card2.case_study.client"),
        result: t("services.card2.case_study.result"),
      },
      color: "from-accent to-teal-600",
    },
    {
      title: t("services.card3.title"),
      description: t("services.card3.description"),
      icon: <Calendar className="h-10 w-10 text-white" />,
      image: "/autority-seccion1.jpg",
      features: [
        t("services.card3.feature1"),
        t("services.card3.feature2"),
        t("services.card3.feature3"),
        t("services.card3.feature4"),
      ],
      caseStudy: {
        client: t("services.card3.case_study.client"),
        result: t("services.card3.case_study.result"),
      },
      color: "from-primary to-blue-800",
    },
  ]

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-12 sm:py-20 md:py-32 relative"
      style={{ minHeight: "200px" }} // Ensure section is visible even if content fails
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] bg-[length:40px_40px] opacity-[0.03] -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-1.5 mb-6 text-sm font-medium text-secondary bg-secondary/10 rounded-full"
          >
            <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
            <span>{t("services.subtitle")}</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary dark:text-white"
          >
            {t("services.title")}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            {t("services.description")}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12 sm:mb-16"
          >
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
              <span>{t("services.feature1")}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
              <span>{t("services.feature2")}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
              <span>{t("services.feature3")}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
              <span>{t("services.feature4")}</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-border"
            >
              {/* Top gradient bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${service.color}`} />

              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`h-16 w-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${service.color}`}
                  >
                    {service.icon}
                  </div>

                  <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 rounded-full bg-secondary" />
                    <div className="h-2 w-2 rounded-full bg-muted" />
                    <div className="h-2 w-2 rounded-full bg-muted" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-primary dark:text-white">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                <div className="mb-6">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={t(`services.card${index + 1}.alt`)}
                    width={400}
                    height={300}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-auto rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={index === 0} // Prioritize first image for faster loading
                  />
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="mt-12 sm:mt-20 text-center"
        >
          <motion.div variants={itemVariants} className="inline-block p-1 bg-muted rounded-full mb-8">
            <div className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-800 rounded-full">
              <Zap className="h-5 w-5 text-secondary" />
              <span>{t("services.custom_solution")}</span>
            </div>
          </motion.div>

          {/* <motion.div variants={itemVariants}>
            <Link 
              href="#contact-form" 
              className="inline-flex items-center text-lg font-medium text-secondary hover:underline"
            >
              {t("services.cta")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div> */}
        </motion.div>
      </div>
    </section>
  )
}