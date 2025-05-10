import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const supportedLocales = ["es", "pt"]
const defaultLocale = "pt"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verificar si la ruta ya tiene un locale soportado
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Si ya tiene locale, continuar normalmente
  if (pathnameHasLocale) return NextResponse.next()

  // Si es la raíz, redirigir al locale por defecto
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }

  // Para otras rutas sin locale, añadir el locale por defecto
  const newPathname = `/${defaultLocale}${pathname}`
  return NextResponse.rewrite(new URL(newPathname, request.url))
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|svg|ico)).*)",
  ],
}