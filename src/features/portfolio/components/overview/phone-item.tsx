import { PhoneIcon } from "lucide-react"

import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item"

export function PhoneItem({ phoneNumberB64 }: { phoneNumberB64: string }) {
  if (!phoneNumberB64) return null;
  return (
    <IntroItem>
      <IntroItemIcon>
        <PhoneIcon />
      </IntroItemIcon>
      <IntroItemContent>
        <IntroItemLink href={"tel:" + atob(phoneNumberB64)}>
          {atob(phoneNumberB64)}
        </IntroItemLink>
      </IntroItemContent>
    </IntroItem>
  )
}
