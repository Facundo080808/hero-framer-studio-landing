"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

export type Language = "es" | "pt"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Traducciones completas para ambos idiomas
const translations = {
  es: {
    "nav.services": "Servicios",
    "nav.portfolio": "Portafolio",
    "nav.process": "Proceso",
    "nav.testimonials": "Testimonios",
    "nav.blog": "Blog",
    "nav.contact": "Contacto",
    "nav.consultation": "Consulta Gratuita",
    "language.es": "Español",
    "language.pt": "Português",
    "language.switch": "Idioma: ES",
    "hero.title": "Convertimos visitantes en",
    "hero.subtitle":
      "Diseñamos landing pages que convierten hasta un 93% más que el promedio de la industria. Estrategia, diseño y psicología de conversión.",
    "hero.cta.primary": "Consulta Estratégica Gratuita",
    "hero.cta.secondary": "Ver Casos de Éxito",
    "hero.feature.1": "Diseño estratégico",
    "hero.feature.2": "Copywriting persuasivo",
    "hero.feature.3": "Animaciones atractivas",
    "hero.feature.4": "Optimización continua",
    "hero.trusted": "CONFÍAN EN NOSOTROS",
    "faq.title": "Preguntas frecuentes",
    "faq.subtitle": "Respuestas a las dudas más comunes sobre nuestros servicios de landing pages.",
    "form.whatsapp": "WhatsApp (opcional)",
    "form.whatsapp.placeholder": "+34 600 000 000",
    // Añadir más traducciones según sea necesario
  },
  pt: {
    "nav.services": "Serviços",
    "nav.portfolio": "Portfólio",
    "nav.process": "Processo",
    "nav.testimonials": "Depoimentos",
    "nav.blog": "Blog",
    "nav.contact": "Contato",
    "nav.consultation": "Consulta Gratuita",
    "language.es": "Español",
    "language.pt": "Português",
    "language.switch": "Idioma: PT",
    "hero.title": "Convertemos visitantes em",
    "hero.subtitle":
      "Projetamos landing pages que convertem até 93% mais do que a média do setor. Estratégia, design e psicologia de conversão.",
    "hero.cta.primary": "Consulta Estratégica Gratuita",
    "hero.cta.secondary": "Ver Casos de Sucesso",
    "hero.feature.1": "Design estratégico",
    "hero.feature.2": "Copywriting persuasivo",
    "hero.feature.3": "Animações atraentes",
    "hero.feature.4": "Otimização contínua",
    "hero.trusted": "CONFIAM EM NÓS",
    "faq.title": "Perguntas frequentes",
    "faq.subtitle": "Respostas às dúvidas mais comuns sobre nossos serviços de landing pages.",
    "form.whatsapp": "WhatsApp (opcional)",
    "form.whatsapp.placeholder": "+55 11 00000 0000",
    // Añadir más traducciones según sea necesario
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")
  const router = useRouter()
  const pathname = usePathname()

  // Función para cambiar el idioma y actualizar la URL
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)

    // Actualizar la URL con el código de idioma
    if (pathname) {
      const currentPath = pathname || "/"
      const basePath = currentPath.replace(/^\/(es|pt)/, "")
      router.push(`/${newLanguage}${basePath}`)
    }
  }

  // Detectar el idioma de la URL al cargar
  useEffect(() => {
    if (pathname) {
      const match = pathname.match(/^\/(es|pt)/)
      if (match && (match[1] === "es" || match[1] === "pt")) {
        setLanguage(match[1] as Language)
      }
    }
  }, [pathname])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
