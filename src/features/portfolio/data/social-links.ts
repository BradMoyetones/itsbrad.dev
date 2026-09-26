import type { SocialProfile } from "@/features/portfolio/types/social-links"

export const SOCIAL = {
  x: {
    title: "X",
    handle: "@bradmoyetones",
    href: "https://x.com/bradmoyetones",
    sameAs: true,
  },
  github: {
    title: "GitHub",
    handle: "bradmoyetones",
    href: "https://github.com/bradmoyetones",
    sameAs: true,
  },
  linkedin: {
    title: "LinkedIn",
    handle: "bradmoyetones",
    href: "https://linkedin.com/in/bradmoyetones",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL

export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
