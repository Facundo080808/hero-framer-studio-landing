"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("cookiesAccepted")

    if (!hasAccepted) {
      // Show cookie consent after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-slate-800 border-t border-border shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground mb-4 sm:mb-0 sm:mr-4">
              {t("cookie_consent.message")}{" "}
              <a href="#" className="underline hover:text-primary">
                {t("cookie_consent.policy")}
              </a>
              .
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" onClick={() => setIsVisible(false)}>
                {t("cookie_consent.reject")}
              </Button>
              <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-white" onClick={acceptCookies}>
                {t("cookie_consent.accept")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}