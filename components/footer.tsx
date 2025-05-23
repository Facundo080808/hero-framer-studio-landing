"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contacto" className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            {/* <Link href="/" className="inline-block mb-6">
              <Image
                src="/placeholder.svg?height=40&width=180"
                alt="Hero&Framer Studio"
                width={180}
                height={40}
                className="h-10 w-auto"
              />
            </Link> */}

            <p className="text-white/80 mb-6">
              {t("footer.description")}
            </p>

            {/* <div className="flex space-x-4">
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">{t("footer.social.facebook")}</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">{t("footer.social.twitter")}</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">{t("footer.social.instagram")}</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">{t("footer.social.linkedin")}</span>
              </Link>
            </div> */}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t("footer.quick_links")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#servicios" className="text-white/80 hover:text-white transition-colors">
                  {t("footer.quick_links.services")}
                </Link>
              </li>
              <li>
                <Link href="#portafolio" className="text-white/80 hover:text-white transition-colors">
                  {t("footer.quick_links.portfolio")}
                </Link>
              </li>
              <li>
                <Link href="#proceso" className="text-white/80 hover:text-white transition-colors">
                  {t("footer.quick_links.process")}
                </Link>
              </li>
              <li>
                <Link href="#testimonios" className="text-white/80 hover:text-white transition-colors">
                  {t("footer.quick_links.testimonials")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  {t("footer.quick_links.blog")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t("footer.services")}</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  {t("footer.services.sales")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  {t("footer.services.lead_magnet")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  {t("footer.services.event")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  {t("footer.services.conversion")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  {t("footer.services.copywriting")}
                </Link>
              </li>
            </ul>
          </div>

          {/* <div>
            <h3 className="text-lg font-semibold mb-6">{t("footer.contact")}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 flex-shrink-0 text-accent" />
                <span className="text-white/80">{t("footer.contact.address")}</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 flex-shrink-0 text-accent" />
                <span className="text-white/80">{t("footer.contact.phone")}</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 flex-shrink-0 text-accent" />
                <span className="text-white/80">{t("footer.contact.email")}</span>
              </li>
            </ul>
          </div> */}
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            {t("footer.copyright").replace("{currentYear}", currentYear.toString())}
          </p>

          <div className="flex space-x-6">
            <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              {t("footer.privacy")}
            </Link>
            <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              {t("footer.terms")}
            </Link>
            <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              {t("footer.cookies")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}