"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, MousePointer, Zap } from "lucide-react"
import Image from "next/image"

export function CtaSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

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

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary z-0" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] bg-[length:40px_40px] opacity-[0.05] z-0" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <motion.div variants={itemVariants} className="text-white">
            <div className="inline-flex items-center px-4 py-1.5 mb-6 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full">
              <Zap className="mr-2 h-4 w-4" />
              <span>Impulsa tu negocio ahora</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              ¿Listo para <span className="text-accent">multiplicar</span> tus conversiones?
            </h2>

            <p className="text-xl text-white/90 mb-8 max-w-xl">
              Agenda una consulta estratégica gratuita y descubre cómo podemos transformar tu landing page en una
              máquina de conversión que genere resultados excepcionales.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-accent mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Análisis de tu landing page actual</h4>
                  <p className="text-white/80">Identificamos oportunidades de mejora y puntos débiles.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-accent mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Estrategia personalizada</h4>
                  <p className="text-white/80">Desarrollamos un plan adaptado a tus objetivos específicos.</p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-accent mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Proyección de resultados</h4>
                  <p className="text-white/80">Estimamos el impacto potencial en tus métricas clave.</p>
                </div>
              </div>
            </div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-7 h-auto group">
                Reservar Consulta Estratégica
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <p className="mt-4 text-sm text-white/70">Sin compromiso. Plazas limitadas cada semana.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <motion.div variants={floatingVariants} initial="initial" animate="animate" className="relative z-10">
              <div className="relative bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-white/80 text-sm">hero-framer-studio.com</div>
                </div>

                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=500&width=600"
                    alt="Landing page de alto impacto"
                    width={600}
                    height={500}
                    className="w-full h-auto rounded-lg border border-white/20"
                  />

                  {/* Interactive elements overlay */}
                  <motion.div
                    className="absolute top-1/4 left-1/4 h-12 w-12 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(45, 212, 191, 0.2)",
                        "0 0 0 10px rgba(45, 212, 191, 0)",
                        "0 0 0 0 rgba(45, 212, 191, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <MousePointer className="h-5 w-5 text-accent" />
                  </motion.div>
                </div>

                <div className="mt-6 p-4 bg-white/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-white font-medium">Tasa de conversión</div>
                    <div className="text-accent font-bold">+93%</div>
                  </div>
                  <div className="mt-2 w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent"
                      initial={{ width: "0%" }}
                      animate={{ width: "93%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 h-40 w-40 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
