import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "../../components/theme-provider"
import { LanguageProvider } from "../../contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Framer Studio | Agencia de Landing Pages de Alto Impacto",
  description:
    "Agencia especializada en diseño de landing pages convertibles y lead magnets. Transformamos visitantes en clientes con diseños estratégicos y persuasivos.",
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  return (
    <html lang={resolvedParams.lang} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
