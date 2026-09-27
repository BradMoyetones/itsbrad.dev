import type { SocialProfile } from "@/features/portfolio/types/social-links"

export const SOCIAL = {
  x: {
    title: "X",
    handle: "@tu_usuario",
    href: "https://x.com/tu_usuario",
    sameAs: true,
  },
  github: {
    title: "GitHub",
    handle: "tu_usuario",
    href: "https://github.com/tu_usuario",
    sameAs: true,
  },
  linkedin: {
    title: "LinkedIn",
    handle: "tu_usuario",
    href: "https://linkedin.com/in/tu_usuario",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL
export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
