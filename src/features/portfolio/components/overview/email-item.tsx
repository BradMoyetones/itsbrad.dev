import { MailIcon } from "lucide-react"

import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item"

export function EmailItem({ emailB64 }: { emailB64: string }) {
  if (!emailB64) return null;

  return (
    <IntroItem>
      <IntroItemIcon>
        <MailIcon />
      </IntroItemIcon>
      <IntroItemContent>
        <IntroItemLink href={"mailto:" + atob(emailB64)}>
          {atob(emailB64)}
        </IntroItemLink>
      </IntroItemContent>
    </IntroItem>
  )
}
