"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowRight, ArrowLeft, CheckCircle, Send } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

type Plan = {
  id: string
  name: string
  price: string
  description: string
}

export function ContactForm() {
  const { t } = useLanguage()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    whatsapp: "",
    plan: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const plans: Plan[] = [
    {
      id: "startup",
      name: t("contact.plan4.name"),
      price: "479",
      description: t("contact.plan4.description"),
    },
    {
      id: "grow",
      name: t("contact.plan5.name"),
      price: "700",
      description: t("contact.plan5.description"),
    },
    {
      id: "scale-up",
      name: t("contact.plan6.name"),
      price: "990",
      description: t("contact.plan6.description"),
    },
    {
      id: "enterprise",
      name: t("contact.plan7.name"),
      price: "1490",
      description: t("contact.plan7.description"),
    },
  ]

  const steps = [
    {
      title: t("contact.step1.title"),
      field: "name",
      type: "text",
      placeholder: t("contact.step1.placeholder"),
      validate: (value: string) => value.trim().length > 0,
    },
    {
      title: t("contact.step2.title"),
      field: "email",
      type: "email",
      placeholder: t("contact.step2.placeholder"),
      validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    },
    {
      title: t("contact.step3.title"),
      field: "company",
      type: "text",
      placeholder: t("contact.step3.placeholder"),
      validate: (value: string) => value.trim().length > 0,
    },
    {
      title: t("form.whatsapp"),
      field: "whatsapp",
      type: "tel",
      placeholder: t("form.whatsapp.placeholder"),
      validate: () => true, // Campo opcional
    },
    {
      title: t("contact.step5.title"),
      field: "plan",
      type: "radio",
      options: plans,
      validate: (value: string) => value.trim().length > 0,
    },
    {
      title: t("contact.step6.title"),
      field: "message",
      type: "textarea",
      placeholder: t("contact.step6.placeholder"),
      validate: () => true, // Optional field
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    const currentStep = steps[step]
    if (currentStep.validate(formData[currentStep.field as keyof typeof formData])) {
      if (step < steps.length - 1) {
        setStep((prev) => prev + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handlePrev = () => {
    if (step > 0) {
      setStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
  
      const data = await response.json()
  
      if (data.success) {
        setIsSubmitting(false)
        setIsSubmitted(true)
      } else {
        console.error("Email sending failed", data.error)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Submission error:", error)
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleNext()
    }
  }

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  return (
    <section id="contacto-form" className="py-16 md:py-24 bg-muted/30 dark:bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary dark:text-white">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div
          ref={formRef}
          className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-border overflow-hidden"
        >
          {!isSubmitted ? (
            <div className="p-8 md:p-12">
              {/* Progress bar */}
              <div className="w-full h-1 bg-muted rounded-full mb-8 overflow-hidden">
                <motion.div
                  className="h-full bg-secondary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold mb-6 text-primary dark:text-white">{steps[step].title}</h3>

                  {steps[step].type === "radio" ? (
                    <RadioGroup
                      value={formData.plan}
                      onValueChange={(value) => handleInputChange("plan", value)}
                      className="space-y-4"
                    >
                      {plans.map((plan) => (
                        <div
                          key={plan.id}
                          className={`flex items-center space-x-2 p-4 rounded-lg border ${
                            formData.plan === plan.id
                              ? "border-secondary bg-secondary/5"
                              : "border-border hover:border-secondary/50"
                          } cursor-pointer transition-colors`}
                          onClick={() => handleInputChange("plan", plan.id)}
                        >
                          <RadioGroupItem value={plan.id} id={plan.id} className="text-secondary" />
                          <div className="flex-1">
                            <Label htmlFor={plan.id} className="text-lg font-medium cursor-pointer">
                              {plan.name} - R${plan.price}
                            </Label>
                            <p className="text-sm text-muted-foreground">{plan.description}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : steps[step].type === "textarea" ? (
                    <Textarea
                      value={formData[steps[step].field as keyof typeof formData]}
                      onChange={(e) => handleInputChange(steps[step].field, e.target.value)}
                      placeholder={steps[step].placeholder}
                      className="w-full h-32"
                      onKeyDown={handleKeyDown}
                    />
                  ) : (
                    <Input
                      type={steps[step].type}
                      value={formData[steps[step].field as keyof typeof formData]}
                      onChange={(e) => handleInputChange(steps[step].field, e.target.value)}
                      placeholder={steps[step].placeholder}
                      className="w-full text-lg py-6"
                      onKeyDown={handleKeyDown}
                    />
                  )}

                  <div className="flex justify-between mt-8">
                    {step > 0 ? (
                      <Button variant="outline" onClick={handlePrev} className="flex items-center">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t("contact.button.prev")}
                      </Button>
                    ) : (
                      <div></div>
                    )}

                    <Button
                      onClick={handleNext}
                      className="bg-secondary hover:bg-secondary/90 text-white"
                      disabled={
                        !steps[step].validate(formData[steps[step].field as keyof typeof formData]) || isSubmitting
                      }
                    >
                      {isSubmitting ? (
                        t("contact.button.submitting")
                      ) : step === steps.length - 1 ? (
                        <>
                          {t("contact.button.submit")}
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      ) : (
                        <>
                          {t("contact.button.next")}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            <div className="p-8 md:p-12 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 mb-6">
                  <CheckCircle className="h-10 w-10 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary dark:text-white">{t("contact.success.title")}</h3>
                <p className="text-muted-foreground mb-8">{t("contact.success.message")}</p>
                <Button
                  onClick={() => {
                    setStep(0)
                    setFormData({
                      name: "",
                      email: "",
                      company: "",
                      whatsapp: "",
                      plan: "",
                      message: "",
                    })
                    setIsSubmitted(false)
                  }}
                  className="bg-secondary hover:bg-secondary/90 text-white"
                >
                  {t("contact.button.reset")}
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}