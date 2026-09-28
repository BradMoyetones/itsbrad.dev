import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
} from "@/components/icons"
import type { SocialName } from "@/features/portfolio/data/social-links"

export const SOCIAL_ICONS: Record<SocialName, React.JSX.Element> = {
  github: <GitHubIcon />,
  linkedin: <LinkedInIcon />,
  instagram: <InstagramIcon />,
}
