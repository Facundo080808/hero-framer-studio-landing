"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contacto" className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/placeholder.svg?height=40&width=180"
                alt="Hero&Framer Studio"
                width={180}
                height={40}
                className="h-10 w-auto"
              />
            </Link>

            <p className="text-white/80 mb-6">
              Agencia especializada en diseño de landing pages convertibles y lead magnets. Transformamos visitantes en
              clientes con diseños estratégicos y persuasivos.
            </p>

            <div className="flex space-x-4">
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-white/80 hover:text-white transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Enlaces rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#servicios" className="text-white/80 hover:text-white transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#portafolio" className="text-white/80 hover:text-white transition-colors">
                  Portafolio
                </Link>
              </li>
              <li>
                <Link href="#proceso" className="text-white/80 hover:text-white transition-colors">
                  Proceso
                </Link>
              </li>
              <li>
                <Link href="#testimonios" className="text-white/80 hover:text-white transition-colors">
                  Testimonios
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Servicios</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  Landing Page de Ventas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  Landing Page Lead Magnet
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  Landing Page Evento
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  Optimización de Conversión
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/80 hover:text-white transition-colors">
                  Copywriting Persuasivo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-1 flex-shrink-0 text-accent" />
                <span className="text-white/80">Calle Innovación 123, 28001 Madrid, España</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 flex-shrink-0 text-accent" />
                <span className="text-white/80">+34 91 123 45 67</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 flex-shrink-0 text-accent" />
                <span className="text-white/80">info@heroframer.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Hero&Framer Studio. Todos los derechos reservados.
          </p>

          <div className="flex space-x-6">
            <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Política de Privacidad
            </Link>
            <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Términos y Condiciones
            </Link>
            <Link href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
