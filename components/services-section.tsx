"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Download, Calendar, CheckCircle, Zap, BarChart } from "lucide-react"
import Link from "next/link"

export function ServicesSection() {
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

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const services = [
    {
      title: "Landing Page de Ventas",
      description:
        "Diseñada para convertir visitantes en clientes, con un enfoque en la persuasión y el cierre de ventas.",
      icon: <ShoppingBag className="h-10 w-10 text-white" />,
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Copywriting persuasivo orientado a ventas",
        "Diseño de alta conversión",
        "Elementos de confianza y social proof",
        "Optimización para SEO y PPC",
      ],
      caseStudy: {
        client: "TechSolutions Inc.",
        result: "+45% conversiones",
      },
      color: "from-secondary to-purple-700",
    },
    {
      title: "Landing Page Lead Magnet",
      description:
        "Optimizada para capturar leads de calidad a través de contenido valioso y formularios estratégicos.",
      icon: <Download className="h-10 w-10 text-white" />,
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Formularios optimizados para conversión",
        "Propuestas de valor claras y atractivas",
        "Integración con CRM y email marketing",
        "Seguimiento y nurturing automatizado",
      ],
      caseStudy: {
        client: "EcoFriendly",
        result: "320 leads en 1 semana",
      },
      color: "from-accent to-teal-600",
    },
    {
      title: "Landing Page Evento",
      description:
        "Perfecta para promocionar eventos y maximizar registros con diseño enfocado en la acción inmediata.",
      icon: <Calendar className="h-10 w-10 text-white" />,
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Cuenta regresiva y elementos de urgencia",
        "Agenda y detalles del evento",
        "Perfiles de speakers y participantes",
        "Integración con plataformas de eventos",
      ],
      caseStudy: {
        client: "EventMasters",
        result: "98% de registros completados",
      },
      color: "from-primary to-blue-800",
    },
  ]

  return (
    <section id="servicios" ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] bg-[length:40px_40px] opacity-[0.03] -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-1.5 mb-6 text-sm font-medium text-secondary bg-secondary/10 rounded-full"
          >
            <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
            <span>Soluciones Estratégicas</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary dark:text-white"
          >
            Landing pages para <span className="text-secondary">cualquier objetivo</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Diseñamos landing pages estratégicas que convierten visitantes en clientes, con un enfoque científico basado
            en psicología de conversión y análisis de datos.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
              <span>Diseño UX/UI avanzado</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
              <span>Copywriting persuasivo</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
              <span>Optimización para conversión</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
              <span>Análisis de resultados</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden border border-border"
            >
              {/* Top gradient bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${service.color}`} />

              <div className="p-8">
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

                <h3 className="text-2xl font-bold mb-3 text-primary dark:text-white">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>

                <div className="mb-6">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
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

                {/* Case study pill */}
                <div className="flex items-center mb-8 p-3 bg-muted/50 rounded-lg">
                  <div className="mr-3">
                    <BarChart className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{service.caseStudy.client}</div>
                    <div className="text-sm text-secondary font-semibold">{service.caseStudy.result}</div>
                  </div>
                </div>

                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white group">
                  <span>Ver detalles</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 text-center"
        >
          <motion.div variants={itemVariants} className="inline-block p-1 bg-muted rounded-full mb-8">
            <div className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-800 rounded-full">
              <Zap className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium">¿Necesitas una solución personalizada?</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="#" className="inline-flex items-center text-lg font-medium text-secondary hover:underline">
              Agenda una consulta estratégica gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
