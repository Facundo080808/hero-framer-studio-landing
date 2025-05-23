"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function WhatsAppButton() {
  const { t } = useLanguage()

  return (
    <motion.a
      href="https://wa.me/56930835236"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <MessageCircle size={24} />
      <span className="sr-only">{t("whatsapp.accessibility")}</span>
    </motion.a>
  )
}