"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
} from "lucide-react"

interface Plan {
  id: string
  name: string
  price: number
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
      id: "esencial",
      name: "Esencial",
      price: 1499,
      description: "Para profesionales independientes",
      features: ["Diseño personalizado", "Responsive", "SEO básico"],
    },
    {
      id: "profesional",
      name: "Profesional",
      price: 2499,
      description: "Para pequeñas empresas",
      features: ["Todo lo anterior", "Animaciones", "Formularios", "3 revisiones"],
    },
    {
      id: "premium",
      name: "Premium",
      price: 3999,
      description: "Para medianas empresas",
      features: ["Todo lo anterior", "CRM", "Analytics", "Revisiones ilimitadas"],
    },
  ],
  whatsappNumber = "56930835236",
  className = "",
}: TypeformContactProps) {
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

  const steps = [
    {
      id: "name",
      title: "¡Hola! 👋",
      subtitle: "¿Cómo te llamas?",
      type: "text",
      placeholder: "Escribe tu nombre completo",
      icon: <User className="h-6 w-6" />,
      required: true,
      validate: (value: string) => (value.trim().length >= 2 ? "" : "El nombre debe tener al menos 2 caracteres"),
    },
    {
      id: "email",
      title: "Perfecto, " + (formData.name.split(" ")[0] || "amigo") + " 📧",
      subtitle: "¿Cuál es tu correo electrónico?",
      type: "email",
      placeholder: "tu@email.com",
      icon: <Mail className="h-6 w-6" />,
      required: true,
      validate: (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value) ? "" : "Por favor, introduce un correo válido"
      },
    },
    {
      id: "company",
      title: "Genial 🏢",
      subtitle: "¿Para qué empresa trabajas?",
      type: "text",
      placeholder: "Nombre de tu empresa",
      icon: <Building className="h-6 w-6" />,
      required: true,
      validate: (value: string) => (value.trim().length >= 2 ? "" : "El nombre de la empresa es requerido"),
    },
    {
      id: "whatsapp",
      title: "Casi terminamos 📱",
      subtitle: "¿Cuál es tu WhatsApp? (opcional)",
      type: "tel",
      placeholder: "+56 9 1234 5678",
      icon: <Phone className="h-6 w-6" />,
      required: false,
      validate: () => "",
    },
    {
      id: "plan",
      title: "¡Excelente! 🚀",
      subtitle: "¿Qué plan te interesa más?",
      type: "radio",
      icon: <Package className="h-6 w-6" />,
      required: true,
      validate: (value: string) => (value ? "" : "Por favor selecciona un plan"),
    },
    {
      id: "message",
      title: "Una última cosa 💭",
      subtitle: "¿Hay algo más que quieras contarnos sobre tu proyecto?",
      type: "textarea",
      placeholder: "Cuéntanos más detalles sobre tu proyecto, objetivos, timeline, etc.",
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
    return !error
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleInputChange = (value: string) => {
    const stepId = currentStepData.id as keyof typeof formData
    setFormData((prev) => ({ ...prev, [stepId]: value }))

    // Clear error when user starts typing
    if (errors[stepId]) {
      setErrors((prev) => ({ ...prev, [stepId]: "" }))
    }
  }

  const generateWhatsAppMessage = () => {
    const selectedPlan = plans.find((plan) => plan.id === formData.plan)
    const currentUrl = typeof window !== "undefined" ? window.location.href : ""

    return encodeURIComponent(`🚀 *SOLICITUD DE LANDING PAGE - HERO&FRAMER STUDIO*

👤 *DATOS DEL CLIENTE:*
• Nombre: ${formData.name}
• Email: ${formData.email}
• Empresa: ${formData.company}
${formData.whatsapp ? `• WhatsApp: ${formData.whatsapp}` : ""}

📋 *PLAN SELECCIONADO:*
• Plan: ${selectedPlan?.name || "No especificado"}
• Precio: $${selectedPlan?.price || "No especificado"}
• Descripción: ${selectedPlan?.description || "No especificado"}

💬 *MENSAJE ADICIONAL:*
${formData.message || "Sin mensaje adicional"}

🌐 *ENLACE DE REFERENCIA:*
${currentUrl}

---
*Solicitud generada desde Hero&Framer Studio*
*Landing Pages que Convierten*`)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsCompleted(true)

      // Abrir WhatsApp
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

  // Auto-focus input when step changes
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     const input = document.querySelector("input, textarea") as HTMLElement
  //     if (input) input.focus()
  //   }, 300)
  //   return () => clearTimeout(timer)
  // }, [currentStep])

  if (isCompleted) {
    return (
      <div
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
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">¡Perfecto! 🎉</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Tu solicitud se ha enviado por WhatsApp. Nos pondremos en contacto contigo muy pronto para comenzar tu
            proyecto.
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
            }}
            variant="outline"
            className="border-gray-300 dark:border-gray-600"
          >
            Enviar otra solicitud
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col ${className}`}
    >
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 h-1">
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 to-purple-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                  {currentStepData.icon}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                  {currentStepData.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">{currentStepData.subtitle}</p>
              </div>

              {/* Form Field */}
              <div className="space-y-6">
                {currentStepData.type === "radio" ? (
                  <RadioGroup value={formData.plan} onValueChange={handleInputChange} className="space-y-4">
                    {plans.map((plan) => (
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
                                  ${plan.price}
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
                ) : currentStepData.type === "textarea" ? (
                  <Textarea
                    value={formData[currentStepData.id as keyof typeof formData]}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={currentStepData.placeholder}
                    className="w-full text-lg p-6 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-blue-500 dark:focus:border-blue-400 resize-none h-32"
                  />
                ) : (
                  <Input
                    type={currentStepData.type}
                    value={formData[currentStepData.id as keyof typeof formData]}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={currentStepData.placeholder}
                    className="w-full text-lg p-6 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-blue-500 dark:focus:border-blue-400"
                  />
                )}

                {errors[currentStepData.id] && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors[currentStepData.id]}
                  </motion.p>
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8">
                <Button
                  onClick={handlePrev}
                  variant="ghost"
                  className={`${currentStep === 0 ? "invisible" : ""}`}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Anterior
                </Button>

                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {currentStep + 1} de {steps.length}
                </div>

                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : currentStep === steps.length - 1 ? (
                    <>
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Enviar por WhatsApp
                    </>
                  ) : (
                    <>
                      Siguiente
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center p-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Presiona <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">Enter</kbd> para continuar
        </p>
      </div>
    </div>
  )
}
