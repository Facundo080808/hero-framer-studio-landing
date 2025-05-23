"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()
  const languageNames = {
    es: "Español",
    pt: "Português"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 w-9 p-0 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label={t("language.switch")}
        >
          <span className="text-sm font-medium uppercase">
            {language}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-40"
        sideOffset={8}
      >
        <div className="px-2 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
          {t("language.language")}
        </div>
        <DropdownMenuItem
          onClick={() => setLanguage("es")}
          className={`flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer ${
            language === "es" 
              ? "bg-secondary/10 text-secondary font-medium" 
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <span>Español</span>
          {language === "es" && (
            <span className="ml-2 text-secondary">✓</span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLanguage("pt")}
          className={`flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer ${
            language === "pt" 
              ? "bg-secondary/10 text-secondary font-medium" 
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <span>Português</span>
          {language === "pt" && (
            <span className="ml-2 text-secondary">✓</span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
