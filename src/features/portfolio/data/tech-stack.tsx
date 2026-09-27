import { CodeXmlIcon } from "lucide-react"
import type { TechStack } from "../types/tech-stack"

export const TECH_STACK: TechStack[] = [
  {
    key: "react",
    title: "React",
    href: "https://react.dev",
    icon: <CodeXmlIcon />,
    categories: ["Frontend"],
  },
]
