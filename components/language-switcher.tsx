"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-9">
          {t("language.switch")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLanguage("es")}
          className={language === "es" ? "bg-secondary/10 text-secondary" : ""}
        >
          {t("language.es")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("pt")}
          className={language === "pt" ? "bg-secondary/10 text-secondary" : ""}
        >
          {t("language.pt")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
