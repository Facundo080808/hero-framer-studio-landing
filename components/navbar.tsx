"use client"

import { useState } from "react"
import Link from "next/link"
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
    // { name: t("nav.blog"), href: "#blog" },
    { name: t("nav.services"), href: "#servicios" },
    { name: t("nav.portfolio"), href: "#portafolio" },
    { name: t("nav.process"), href: "#proceso" },
    { name: t("nav.testimonials"), href: "#testimonios" },
    { name: t("nav.contact"), href: "#contact-form" },
  ]

  return (
    <>
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
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* <Link href="#contact-form" className="hidden md:block">
              <Button className="bg-secondary hover:bg-secondary/90 text-white">
                {t("nav.consultation")} 
              </Button>
            </Link> */}
            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              <ModeToggle />
            </div>
            
            {/* Mobile Navigation Toggle - Moved to the right */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-2" 
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Navigation Sidebar - Slides from right */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed right-0 top-0 h-full w-80 bg-background dark:bg-slate-900 z-50 md:hidden shadow-2xl overflow-y-auto"
      >
        <div className="p-6">
          {/* Close button */}
          <div className="flex justify-end mb-8">
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-primary p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800 mt-4">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("language.language")}
                </span>
                <LanguageSwitcher />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {t("theme.theme")}
                </span>
                <ModeToggle />
              </div>
            </div>
            
            <Button 
              className="bg-secondary hover:bg-secondary/90 text-white w-full mt-4 py-6 text-base"
              onClick={() => setIsOpen(false)}
            >
              {t("nav.consultation")} 
            </Button>
          </nav>
        </div>
      </motion.div>
    </>
  )
}