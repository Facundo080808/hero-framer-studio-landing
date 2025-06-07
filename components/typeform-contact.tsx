"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  MessageCircle,
  User,
  Mail,
  Building,
  Phone,
  Package,
  MessageSquare,
  AlertCircle,
  X,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Plan {
  id: string
  name: string
  price: string
  description: string
  features: string[]
}

interface TypeformContactProps {
  plans?: Plan[]
  whatsappNumber?: string
  className?: string
}

export default function TypeformContact({
  plans = [
    {
      id: "startup",
      name: "Startup",
      price: "",
      description: "Para startups en fase inicial",
      features: [
        "1 Landing Page",
        "Diseño responsive premium",
        "Animaciones Framer Motion",
        "Entrega en 2 semanas",
        "Hasta 2 cambios",
        "Botón de WhatsApp",
        "Todo en una sola página",
      ],
    },
    {
      id: "grow",
      name: "Grow",
      price: "",
      description: "Para empresas en crecimiento",
      features: [
        "1 Landing Page",
        "Diseño responsive premium",
        "Animaciones Framer Motion",
        "Entrega en 7 días hábiles",
        "Hasta 3 cambios",
        "Formulario de contacto",
        "Widget de WhatsApp",
        "Todo en una sola página",
      ],
    },
    {
      id: "scaleUp",
      name: "Scale Up",
      price: "",
      description: "Para empresas que buscan escalar",
      features: [
        "1 Landing Page",
        "Diseño responsive premium",
        "Animaciones Framer Motion",
        "Entrega en 5 días hábiles",
        "Hasta 5 cambios",
        "Formulario de contacto",
        "Widget de WhatsApp",
        "Secciones extra (testimonios, FAQ)",
        "Todo en una sola página",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "",
      description: "Para empresas establecidas",
      features: [
        "1 Landing Page",
        "Diseño responsive premium",
        "Animaciones Framer Motion",
        "Entrega en 5 días hábiles",
        "Todas las funcionalidades anteriores",
        "Optimización SEO básica",
        "Todo en una sola página",
      ],
    },
  ],
  whatsappNumber = "3148171914",//56930835236
  className = "",
}: TypeformContactProps) {
  const { language, t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    whatsapp: "",
    plan: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showValidation, setShowValidation] = useState(false)
  const [fieldTouched, setFieldTouched] = useState<Record<string, boolean>>({})
  const formContainerRef = useRef<HTMLDivElement>(null)

  // Define prices based on language, matching pricing-section.tsx
  const prices = {
    es: {
      startup: "69.990 CLP neto",
      grow: "99.990 CLP neto",
      scaleUp: "149.990 CLP neto",
      enterprise: "199.990 CLP neto",
    },
    pt: {
      startup: "479",
      grow: "700",
      scaleUp: "990",
      enterprise: "1490",
    },
  }

  // Map plan IDs to translation keys
  const planKeyMap: Record<string, string> = {
    startup: "plan4",
    grow: "plan5",
    scaleUp: "plan6",
    enterprise: "plan7",
  }

  // Update plans with language-specific prices and translated names/descriptions
  const updatedPlans = plans.map((plan) => {
    const planKey = planKeyMap[plan.id]
    return {
      ...plan,
      price: prices[language][plan.id as keyof typeof prices[typeof language]],
      name: t(`pricing.${planKey}.name`),
      description: t(`pricing.${planKey}.description`),
      features: Array.from({ length: plan.features.length }, (_, index) =>
        t(`pricing.${planKey}.features.${index + 1}`)
      ),
    }
  })

  // Read selected plan from sessionStorage and set it
  useEffect(() => {
    const selectedPlan = sessionStorage.getItem('selectedPlan')
    if (selectedPlan) {
      const planId = updatedPlans.find((plan) => plan.name === selectedPlan)?.id
      if (planId) {
        setFormData((prev) => ({ ...prev, plan: planId }))
        setCurrentStep(4) // Jump to the plan selection step
        sessionStorage.removeItem('selectedPlan') // Clear sessionStorage after use
      }
    }
  }, [updatedPlans])

  const steps = [
    {
      id: "name",
      title: t("contact.step1.title"),
      subtitle: t("contact.step1.title"),
      type: "text",
      placeholder: t("contact.step1.placeholder"),
      icon: <User className="h-6 w-6" />,
      required: true,
      validate: (value: string) => {
        if (!value.trim()) {
          return t("contact.step1.error.empty") || "Por favor, introduce tu nombre"
        }
        return value.trim().length >= 5
          ? ""
          : t("contact.step1.error.minLength") || "Ingresa un nombre de mínimo 5 caracteres"
      },
    },
    {
      id: "email",
      title: t("contact.step2.title").replace("{name}", formData.name.split(" ")[0] || "amigo"),
      subtitle: t("contact.step2.title"),
      type: "email",
      placeholder: t("contact.step2.placeholder"),
      icon: <Mail className="h-6 w-6" />,
      required: true,
      validate: (value: string) => {
        if (!value.trim()) {
          return t("contact.step2.error.empty") || "Por favor, introduce tu correo electrónico"
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value)
          ? ""
          : t("contact.step2.error.invalid") || "Ingresa un correo electrónico válido"
      },
    },
    {
      id: "company",
      title: t("contact.step3.title"),
      subtitle: t("contact.step3.title"),
      type: "text",
      placeholder: t("contact.step3.placeholder"),
      icon: <Building className="h-6 w-6" />,
      required: true,
      validate: (value: string) => {
        if (!value.trim()) {
          return t("contact.step3.error.empty") || "Por favor, introduce el nombre de la empresa"
        }
        return value.trim().length >= 5
          ? ""
          : t("contact.step3.error.minLength") || "Ingresa un nombre de empresa de mínimo 5 caracteres"
      },
    },
    {
      id: "whatsapp",
      title: t("form.whatsapp"),
      subtitle: t("form.whatsapp"),
      type: "tel",
      placeholder: t("form.whatsapp.placeholder"),
      icon: <Phone className="h-6 w-6" />,
      required: false,
      validate: () => "",
    },
    {
      id: "plan",
      title: t("contact.step5.title"),
      subtitle: t("contact.step5.title"),
      type: "radio",
      icon: <Package className="h-6 w-6" />,
      required: true,
      validate: (value: string) =>
        value ? "" : t("contact.step5.error.select") || "Elige el plan que necesitas",
    },
    {
      id: "message",
      title: t("contact.step6.title"),
      subtitle: t("contact.step6.title"),
      type: "textarea",
      placeholder: t("contact.step6.placeholder"),
      icon: <MessageSquare className="h-6 w-6" />,
      required: false,
      validate: () => "",
    },
  ]

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  const validateCurrentStep = () => {
    const step = steps[currentStep]
    const value = formData[step.id as keyof typeof formData]
    const error = step.validate(value)

    setErrors((prev) => ({ ...prev, [step.id]: error }))
    setShowValidation(true)
    
    if (error) {
      setTimeout(() => setShowValidation(false), 3000)
    }
    
    return !error
  }

  const handleNext = () => {
    setFieldTouched((prev) => ({ ...prev, [currentStepData.id]: true }))
    
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1)
        setShowValidation(false)
        if (formContainerRef.current) {
          formContainerRef.current.scrollTo({ top: 0, behavior: "smooth" })
        }
      } else {
        handleSubmit()
      }
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      setShowValidation(false)
      if (formContainerRef.current) {
        formContainerRef.current.scrollTo({ top: 0, behavior: "smooth" })
      }
    }
  }

  const handleInputChange = (value: string) => {
    const stepId = currentStepData.id as keyof typeof formData
    setFormData((prev) => ({ ...prev, [stepId]: value }))
    setFieldTouched((prev) => ({ ...prev, [stepId]: true }))

    if (errors[stepId]) {
      setErrors((prev) => ({ ...prev, [stepId]: "" }))
      setShowValidation(false)
    }
  }

  const handleBlur = () => {
    const stepId = currentStepData.id
    setFieldTouched((prev) => ({ ...prev, [stepId]: true }))
    
    if (fieldTouched[stepId] && currentStepData.required) {
      const value = formData[stepId as keyof typeof formData]
      const error = currentStepData.validate(value)
      setErrors((prev) => ({ ...prev, [stepId]: error }))
    }
  }

  const generateWhatsAppMessage = () => {
    const selectedPlan = updatedPlans.find((plan) => plan.id === formData.plan)
    const currentUrl = typeof window !== "undefined" ? window.location.href : ""

    const message = [
      t("whatsapp.title"),
      t("whatsapp.subtitle"),
      "",
      t("whatsapp.customer_data") + ":",
      `• ${t("form.name")}: ${formData.name}`,
      `• ${t("form.email")}: ${formData.email}`,
      `• ${t("form.company")}: ${formData.company}`,
      `• ${t("form.whatsapp")}: ${formData.whatsapp || t("form.not_provided")}`,
      "",
      t("whatsapp.selected_plan") + ":",
      `• ${t("form.plan")}: *${selectedPlan?.name || t("form.not_specified")}*`,
      `• ${t("form.price")}: *${selectedPlan?.price || t("form.not_specified")}*`,
      `• ${t("form.description")}: ${selectedPlan?.description || t("form.not_specified")}`, 
      "",
    ]

    if (formData.message.trim()) {
      message.push(
        t("whatsapp.additional_message"),
        formData.message.trim(),
        ""
      )
    }

    message.push(
      t("whatsapp.reference_link"),
      currentUrl,
      "",
      "━━━━━━━━━━━━━━━━━━━━",
      t("whatsapp.generated_by"),
      t("whatsapp.company_name"),
      t("whatsapp.tagline")
    )

    return message
      .join('\n')
      .replace(/\*/g, '**')
      .replace(/\n/g, '%0a')
      .replace(/\s+/g, '%20')
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsCompleted(true)

      const whatsappMessage = generateWhatsAppMessage()
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`
      window.open(whatsappUrl, "_blank")
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleNext()
    }
  }

  const ValidationMessage = ({ error, stepId }: { error: string; stepId: string }) => {
    if (!error || !showValidation) return null

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3, type: "spring", damping: 20 }}
          className="mt-3"
        >
          <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl shadow-sm">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                {error}
              </p>
            </div>
            <button
              onClick={() => setShowValidation(false)}
              className="flex-shrink-0 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-800/30 transition-colors"
            >
              <X className="h-4 w-4 text-red-500 dark:text-red-400" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  if (isCompleted) {
    return (
      <div
        id="contact-form"
        className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4 ${className}`}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center max-w-md"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t("contact.success.title")}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {t("contact.success.message")}
          </p>
          <Button
            onClick={() => {
              setIsCompleted(false)
              setCurrentStep(0)
              setFormData({
                name: "",
                email: "",
                company: "",
                whatsapp: "",
                plan: "",
                message: "",
              })
              setErrors({})
              setFieldTouched({})
              setShowValidation(false)
            }}
            variant="outline"
            className="border-gray-300 dark:border-gray-600"
          >
            {t("contact.button.reset")}
          </Button>
        </motion.div>
      </div>
    )
  }

  const hasError = errors[currentStepData.id] && showValidation
  const isFieldValid = fieldTouched[currentStepData.id] && !errors[currentStepData.id] && formData[currentStepData.id as keyof typeof formData]

  return (
    <div
      id="contact-form"
      className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col ${className}`}
    >
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-1">
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div
          ref={formContainerRef}
          className="w-full max-w-2xl h-[80vh] overflow-y-auto"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8 p-4"
            >
              <div className="text-center space-y-4">
                <motion.div 
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 ${
                    hasError
                      ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 animate-pulse"
                      : isFieldValid
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                      : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  }`}
                  animate={hasError ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {isFieldValid ? <CheckCircle className="h-6 w-6" /> : currentStepData.icon}
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  {currentStepData.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">{currentStepData.subtitle}</p>
              </div>

              <div className="space-y-6">
                {currentStepData.type === "radio" ? (
                  <div className="space-y-4">
                    <RadioGroup value={formData.plan} onValueChange={handleInputChange}>
                      {updatedPlans.map((plan) => (
                        <motion.div
                          key={plan.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                            formData.plan === plan.id
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                          onClick={() => handleInputChange(plan.id)}
                        >
                          <div className="flex items-start space-x-4">
                            <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                            <div className="flex-1">
                              <Label htmlFor={plan.id} className="cursor-pointer">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {language === "es" ? plan.price : `R$ ${plan.price}`}
                                  </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-3">{plan.description}</p>
                                <ul className="space-y-1">
                                  {plan.features.map((feature, index) => (
                                    <li
                                      key={index}
                                      className="text-sm text-gray-500 dark:text-gray-400 flex items-center"
                                    >
                                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                              </Label>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </RadioGroup>
                    <ValidationMessage error={errors[currentStepData.id]} stepId={currentStepData.id} />
                  </div>
                ) : currentStepData.type === "textarea" ? (
                  <div>
                    <Textarea
                      value={formData[currentStepData.id as keyof typeof formData]}
                      onChange={(e) => handleInputChange(e.target.value)}
                      onKeyDown={handleKeyPress}
                      onBlur={handleBlur}
                      placeholder={currentStepData.placeholder}
                      className={`w-full text-lg p-6 border-2 rounded-2xl resize-none h-32 transition-all duration-300 ${
                        hasError
                          ? "border-red-500 dark:border-red-400 bg-red-50/50 dark:bg-red-900/10 focus:border-red-500 dark:focus:border-red-400"
                          : isFieldValid
                          ? "border-green-500 dark:border-green-400 bg-green-50/50 dark:bg-green-900/10 focus:border-green-500 dark:focus:border-green-400"
                          : "border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                      }`}
                      autoFocus={false}
                    />
                    <ValidationMessage error={errors[currentStepData.id]} stepId={currentStepData.id} />
                  </div>
                ) : (
                  <div>
                    <div className="relative">
                      <Input
                        type={currentStepData.type}
                        value={formData[currentStepData.id as keyof typeof formData]}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyDown={handleKeyPress}
                        onBlur={handleBlur}
                        placeholder={currentStepData.placeholder}
                        className={`w-full text-lg p-6 border-2 rounded-2xl transition-all duration-300 ${
                          hasError
                            ? "border-red-500 dark:border-red-400 bg-red-50/50 dark:bg-red-900/10 focus:border-red-500 dark:focus:border-red-400"
                            : isFieldValid
                            ? "border-green-500 dark:border-green-400 bg-green-50/50 dark:bg-green-900/10 focus:border-green-500 dark:focus:border-green-400"
                            : "border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400"
                        }`}
                        autoFocus={false}
                      />
                      {isFieldValid && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        >
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </motion.div>
                      )}
                    </div>
                    <ValidationMessage error={errors[currentStepData.id]} stepId={currentStepData.id} />
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-8">
                <Button
                  onClick={handlePrev}
                  variant="ghost"
                  className={`${currentStep === 0 ? "invisible" : ""}`}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("contact.button.prev")}
                </Button>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {currentStep + 1} de {steps.length}
                </div>

                <motion.div
                  animate={hasError ? { x: [-10, 10, -10, 10, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <Button
                    onClick={handleNext}
                    className={`transition-all duration-300 ${
                      hasError
                        ? "bg-red-500 hover:bg-red-600 animate-pulse"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      t("contact.button.submitting")
                    ) : currentStep === steps.length - 1 ? (
                      <>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {t("contact.button.submitwhatsapp")}
                      </>
                    ) : (
                      <>
                        {t("contact.button.next")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="text-center p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Presiona <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Enter</kbd> para continuar
        </p>
      </div>
    </div>
  )
}