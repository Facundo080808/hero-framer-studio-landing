import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Lista de idiomas soportados
const supportedLocales = ["es", "pt"]
const defaultLocale = "es"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verificar si la URL ya tiene un prefijo de idioma
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )

  // Si ya tiene un prefijo de idioma, no hacer nada
  if (pathnameHasLocale) return NextResponse.next()

  // Si no tiene prefijo, redirigir a la URL con el idioma predeterminado
  const locale = defaultLocale

  // Crear nueva URL con el prefijo de idioma
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Matcher para todas las rutas excepto las que comienzan con /api/, /_next/, etc.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
