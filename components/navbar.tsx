"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { scrollY } = useScroll()
  const height = useTransform(scrollY, [0, 100], [80, 64])
  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"])
  const darkBackgroundColor = useTransform(scrollY, [0, 100], ["rgba(15, 23, 42, 0)", "rgba(15, 23, 42, 0.9)"])
  const boxShadow = useTransform(scrollY, [0, 100], ["none", "0 2px 10px rgba(0, 0, 0, 0.1)"])
  const { t } = useLanguage()

  const navItems = [
    { name: t("nav.services"), href: "#servicios" },
    { name: t("nav.portfolio"), href: "#portafolio" },
    { name: t("nav.process"), href: "#proceso" },
    { name: t("nav.testimonials"), href: "#testimonios" },
    { name: t("nav.blog"), href: "#blog" },
    { name: t("nav.contact"), href: "#contacto" },
  ]

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 dark:text-white"
      style={{
        height,
        boxShadow,
        backgroundColor: "var(--color-bg)",
      }}
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
    >
      <style jsx global>{`
        :root {
          --color-bg: ${backgroundColor};
        }
        .dark {
          --color-bg: ${darkBackgroundColor};
        }
      `}</style>

      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/placeholder.svg?height=40&width=180"
            alt="Hero&Framer Studio"
            width={180}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover:text-secondary transition-colors"
            >
              {item.name}
            </Link>
          ))}
          <LanguageSwitcher />
          <ModeToggle />
          <Button className="bg-secondary hover:bg-secondary/90 text-white">{t("nav.consultation")}</Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden space-x-4">
          <LanguageSwitcher />
          <ModeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="text-primary p-2" aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-background dark:bg-slate-900 border-b"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium py-2 hover:text-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="bg-secondary hover:bg-secondary/90 text-white w-full">{t("nav.consultation")}</Button>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
