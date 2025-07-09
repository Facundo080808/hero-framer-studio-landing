"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { easeInOut, motion, spring, useScroll, useTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowRight, CheckCircle, MousePointer, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const { t, language } = useLanguage()
  const targetRef = useRef<HTMLDivElement>(null)  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Typewriter effect
  const [displayText, setDisplayText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  // Palabras según el idioma
  const words =
    language === "es"
      ? ["clientes", "ventas", "leads", "resultados", "crecimiento"]
      : ["clientes", "vendas", "leads", "resultados", "crescimento"]

  useEffect(() => {
    const word = words[currentWordIndex]

    const handleTyping = () => {
      // If deleting, remove a character
      if (isDeleting) {
        setDisplayText((prev) => prev.substring(0, prev.length - 1))
        setTypingSpeed(50) // Faster when deleting
      }
      // If typing, add a character
      else {
        setDisplayText(word.substring(0, displayText.length + 1))
        setTypingSpeed(150) // Normal speed when typing
      }

      // If completed typing the word
      if (!isDeleting && displayText === word) {
        setTypingSpeed(2000) // Pause at the end of word
        setIsDeleting(true)
      }
      // If completed deleting the word
      else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setTypingSpeed(150)
        setCurrentWordIndex((currentWordIndex + 1) % words.length)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentWordIndex, words, typingSpeed])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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

  const statsVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: spring,
        stiffness: 100,
        damping: 15,
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
        ease: easeInOut,
      },
    },
  }

  return (
    <section ref={targetRef} className="relative pt-20 pb-4 md:pt-28 md:pb-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 -left-10 w-72 h-72 bg-secondary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/3 -right-10 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] bg-[length:40px_40px] opacity-[0.03]" />
      </div>

      <motion.div style={{ y, opacity }} className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center mb-6"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-1.5 mb-4 text-sm font-medium text-secondary bg-secondary/10 rounded-full"
          >
            <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
            <span>Agencia de Landing Pages de Alto Impacto</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent"
          >
            {t("hero.title")}  <br className="hidden md:block" />
            <span className="relative inline-block">
              <span className="text-primary dark:text-white">{displayText}</span>
              <span className="animate-pulse">|</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5C47.6667 1.5 154.4 -1.9 199 5.5"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-3xl">
            {t("hero.subtitle")}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          
            <Link href="#pricing">
                <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8 py-7 h-auto group"
                // onClick={() => {
                //   const contactSection = document.getElementById('contact-form');
                //   if (contactSection) {
                //     contactSection.scrollIntoView({ behavior: 'smooth' });
                //   }
                // }}
              >
                Planos
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#portafolio">
              <Button size="lg" variant="outline" className="border-primary dark:border-white text-lg px-8 py-7 h-auto">
                {t("hero.cta.secondary")}
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
              <span>{t("hero.feature.1")}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
              <span>{t("hero.feature.2")}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
              <span>{t("hero.feature.3")}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-2 h-4 w-4 text-secondary" />
              <span>{t("hero.feature.4")}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative">
        
          <motion.div
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            className="relative z-10 mx-auto max-w-5xl"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm">
              <Image
                src="https://imgs.search.brave.com/rGAspx_uOvbQQfow1foE6tNYCNSZGVjqj0dneY3h3sQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNi8w/NC8yMi8xNy8zNi93/b29kZW4tbi0xMzQ2/MTk3XzY0MC5wbmc"
                alt="Landing page de alto impacto"
                width={1400}
                height={800}
                className="w-full h-auto"
                priority
              />

             
              <motion.div
                className="absolute top-[30%] left-[25%] h-12 w-12 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30 flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(124, 58, 237, 0.2)",
                    "0 0 0 10px rgba(124, 58, 237, 0)",
                    "0 0 0 0 rgba(124, 58, 237, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <MousePointer className="h-5 w-5 text-secondary" />
              </motion.div>

              <motion.div
                className="absolute bottom-[25%] right-[20%] h-12 w-12 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(45, 212, 191, 0.2)",
                    "0 0 0 10px rgba(45, 212, 191, 0)",
                    "0 0 0 0 rgba(45, 212, 191, 0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              >
                <Users className="h-5 w-5 text-accent" />
              </motion.div>
            </div>
          </motion.div>

          
          <motion.div
            variants={statsVariants}
            className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-white dark:bg-slate-800 rounded-lg shadow-xl p-4 border border-border"
          >
            <div className="flex items-center">
              <div className="text-3xl font-bold text-secondary mr-2">93%</div>
              <div className="text-xs">
                <div className="font-medium">Aumento en</div>
                <div>conversiones</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={statsVariants}
            className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-white dark:bg-slate-800 rounded-lg shadow-xl p-4 border border-border"
          >
            <div className="flex items-center">
              <div className="text-3xl font-bold text-accent mr-2">4.9</div>
              <div className="text-xs">
                <div className="font-medium">Valoración</div>
                <div>de clientes</div>
              </div>
            </div>
          </motion.div>
        </motion.div> */}

        {/* Trusted by logos */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-12 text-center">
          <motion.p variants={itemVariants} className="text-sm text-muted-foreground mb-4">
            {t("hero.trusted")}
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <Image
                key={i}
                src={`/placeholder.svg?height=30&width=120&text=LOGO${i}`}
                alt={`Cliente ${i}`}
                width={120}
                height={30}
                className="h-6 md:h-8 w-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
      </motion.div>
    </section>
  )
}