"use client"

import { useEffect, useState } from "react"
import { useHotkeys } from "react-hotkeys-hook"
import { META_THEME_COLORS } from "@/config/site"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "./ui/button"
import { Kbd } from "./ui/kbd"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setTheme(isDark ? "dark" : "light")

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark")
      setTheme(isDark ? "dark" : "light")
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  const switchTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    document.documentElement.classList.toggle("dark", nextTheme === "dark")
    
    // Update theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        nextTheme === "dark" ? META_THEME_COLORS.dark : META_THEME_COLORS.light
      )
    }
  }

  useHotkeys("d", () => switchTheme())

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            className="relative touch-manipulation border-none"
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle mode"
            onClick={() => switchTheme()}
          >
            <span
              className="absolute size-12 pointer-fine:hidden"
              aria-hidden
            />
            <DarkSideIcon />
          </Button>
        }
      />
      <TooltipContent className="pr-2 pl-3">
        <div className="flex items-center gap-3">
          Toggle mode
          <Kbd>D</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}

// Adapted from toggles.dev "Dark Side".
// `transition-transform!` overrides the `transition: none !important` that
// `next-themes` applies during theme changes (`disableTransitionOnChange`).
function DarkSideIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden
    >
      <path
        d="M16 .5C7.4.5.5 7.4.5 16S7.4 31.5 16 31.5 31.5 24.6 31.5 16 24.6.5 16 .5zm0 28.1V3.4C23 3.4 28.6 9 28.6 16S23 28.6 16 28.6z"
        className="origin-center motion-safe:transition-transform! motion-safe:duration-500 motion-safe:ease-[ease] dark:rotate-180"
      />
    </svg>
  )
}
