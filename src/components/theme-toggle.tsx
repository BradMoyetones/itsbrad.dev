import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "lucide-react"

import { Button } from "./ui/button"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "dark" : "light")
  }, [])

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="shrink-0"
      aria-label="Toggle theme"
      onClick={() => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        if (newTheme === "dark") {
          document.documentElement.classList.add("dark")
          localStorage.setItem("theme", "dark")
        } else {
          document.documentElement.classList.remove("dark")
          localStorage.setItem("theme", "light")
        }
      }}
    >
      <SunIcon className="size-4.5 scale-100 transition-all dark:scale-0" />
      <MoonIcon className="absolute size-4.5 scale-0 transition-all dark:scale-100" />
    </Button>
  )
}
