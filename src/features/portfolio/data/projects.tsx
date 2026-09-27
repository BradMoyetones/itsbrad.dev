import { CodeXmlIcon } from "lucide-react"
import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "proyecto-1",
    title: "Proyecto 1",
    period: {
      start: "01.2024",
    },
    link: "https://ejemplo.com",
    skills: [
      "Tecnologia 1",
      "Tecnologia 2",
    ],
    description: "Descripcion del proyecto\\n- Punto 1\\n- Punto 2",
    icon: <CodeXmlIcon />,
  }
]
