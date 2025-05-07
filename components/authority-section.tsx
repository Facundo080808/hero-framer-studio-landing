"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useCountUp } from "react-countup"
import { ArrowUpRight, BarChart3, LineChart, TrendingUp, Users } from "lucide-react"
import Link from "next/link"

export function AuthoritySection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])
  const y3 = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])

  // CountUp hooks for statistics
  const conversionsRef = useRef(null)
  const landingPagesRef = useRef(null)
  const clientsRef = useRef(null)

  useCountUp({
    ref: conversionsRef,
    end: 93,
    enableScrollSpy: true,
    scrollSpyDelay: 500,
    suffix: "%",
    duration: 2.5,
  })

  useCountUp({
    ref: landingPagesRef,
    end: 200,
    enableScrollSpy: true,
    scrollSpyDelay: 500,
    prefix: "+",
    duration: 2.5,
  })

  useCountUp({
    ref: clientsRef,
    end: 87,
    enableScrollSpy: true,
    scrollSpyDelay: 500,
    suffix: "%",
    duration: 2.5,
  })

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

  return (
    <section ref={sectionRef} className="py-4 md:py-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-muted/30 dark:bg-slate-900/50 -z-10" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] bg-[length:40px_40px] opacity-[0.03] -z-10" />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-6"
        >
          <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end gap-2 mb-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary dark:text-white">
              Expertos en <span className="text-secondary">resultados</span>
            </h2>
            <div className="h-px flex-grow bg-border dark:bg-slate-700 mb-4"></div>
          </motion.div>

          <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-3xl mb-4">
            Diseñamos landing pages estratégicas que maximizan conversiones y generan resultados medibles.
          </motion.p>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl -z-10 transform group-hover:scale-[1.03] transition-transform duration-300" />
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-border shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-10 w-10 text-secondary" />
                  <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                      className="h-6 w-6 rounded-full bg-secondary/30"
                    />
                  </div>
                </div>
                <div className="text-5xl font-bold text-secondary mb-2" ref={conversionsRef}>
                  0%
                </div>
                <p className="text-lg text-muted-foreground">de aumento en conversiones promedio</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Superamos consistentemente los benchmarks de la industria con estrategias de conversión avanzadas.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-2xl -z-10 transform group-hover:scale-[1.03] transition-transform duration-300" />
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-border shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <BarChart3 className="h-10 w-10 text-secondary" />
                  <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                      className="h-6 w-6 rounded-full bg-secondary/30"
                    />
                  </div>
                </div>
                <div className="text-5xl font-bold text-secondary mb-2" ref={landingPagesRef}>
                  0
                </div>
                <p className="text-lg text-muted-foreground">landing pages creadas</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Experiencia comprobada en diversos sectores, desde SaaS y startups hasta e-commerce y servicios
                    profesionales.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 rounded-2xl -z-10 transform group-hover:scale-[1.03] transition-transform duration-300" />
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-border shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-10 w-10 text-secondary" />
                  <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                      className="h-6 w-6 rounded-full bg-secondary/30"
                    />
                  </div>
                </div>
                <div className="text-5xl font-bold text-secondary mb-2" ref={clientsRef}>
                  0%
                </div>
                <p className="text-lg text-muted-foreground">de clientes que aumentan sus ventas</p>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Nuestro enfoque orientado a resultados garantiza un impacto real y medible en tu negocio.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <div className="inline-flex items-center px-4 py-1.5 mb-4 text-sm font-medium text-secondary bg-secondary/10 rounded-full">
              <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
              <span>Casos de éxito verificados</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-white">
              Transformamos métricas en <span className="text-secondary">crecimiento real</span>
            </h3>

            <p className="text-lg text-muted-foreground mb-4">
              Nuestras landing pages impulsan el crecimiento sostenible con estrategias probadas en startups de
              YCombinator y empresas SaaS.
            </p>

            <div className="space-y-4 mb-4">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <LineChart className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Optimización continua</h4>
                  <p className="text-muted-foreground">
                    Mejoramos constantemente el rendimiento con pruebas A/B y análisis de datos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-1">Enfoque centrado en el usuario</h4>
                  <p className="text-muted-foreground">
                    Diseñamos experiencias que conectan con tu audiencia y generan acción.
                  </p>
                </div>
              </div>
            </div>

            <Link href="#" className="inline-flex items-center text-secondary font-medium hover:underline">
              Ver todos los casos de éxito
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 lg:order-2 relative">
            <div className="relative h-[400px] w-full">
              <motion.div style={{ y: y1 }} className="absolute top-0 left-0 w-2/3 h-auto z-10">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Dashboard de resultados"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-xl border border-white/20"
                />
              </motion.div>

              <motion.div style={{ y: y2 }} className="absolute bottom-0 right-0 w-2/3 h-auto z-20">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Análisis de conversión"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-xl border border-white/20"
                />
              </motion.div>

              <motion.div
                style={{ y: y3 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-auto z-30"
              >
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-4 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-muted rounded-full w-full" />
                    <div className="h-2 bg-muted rounded-full w-3/4" />
                    <div className="h-2 bg-muted rounded-full w-1/2" />
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Conversión</div>
                      <div className="text-sm font-bold text-secondary">+93%</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
