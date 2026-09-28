"use client"

import { useRouter } from "@bprogress/next/app"
import { useHotkeys } from "react-hotkeys-hook"

export function KeyboardShortcuts() {
  const router = useRouter()

  const navigate = (path: string, keys: string) => {
    router.push(path)
  }

  useHotkeys("g>h", () => navigate("/", "g>h"))
  useHotkeys("g>c", () => navigate("/components", "g>c"))
  useHotkeys("g>b", () => navigate("/blocks", "g>b"))
  useHotkeys("g>r", () => navigate("/craft", "g>r"))
  useHotkeys("g>l", () => navigate("/blog", "g>l"))
  useHotkeys("g>s", () => navigate("/sponsors", "g>s"))
  useHotkeys("g>m", () => navigate("/bookmarks", "g>m"))
  useHotkeys("g>i", () => navigate("/insights", "g>i"))
  useHotkeys("g>t", () => navigate("/testimonials", "g>t"))

  return null
}
