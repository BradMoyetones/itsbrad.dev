import type { SocialProfile } from "@/features/portfolio/types/social-links"

export const SOCIAL = {
  github: {
    title: "GitHub",
    handle: "BradMoyetones",
    href: "https://github.com/BradMoyetones",
    sameAs: true,
  },
  linkedin: {
    title: "LinkedIn",
    handle: "brad-moyetones",
    href: "https://www.linkedin.com/in/brad-moyetones/",
    sameAs: true,
  },
  instagram: {
    title: "Instagram",
    handle: "its.bradn",
    href: "https://www.instagram.com/its.bradn/",
    sameAs: true,
  },
} satisfies Record<string, SocialProfile>

export type SocialName = keyof typeof SOCIAL
export type SocialLink = SocialProfile & { name: SocialName }

export const SOCIAL_LINKS: SocialLink[] = (
  Object.entries(SOCIAL) as [SocialName, SocialProfile][]
).map(([name, profile]) => ({ name, ...profile }))
