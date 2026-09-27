import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  DraftingCompassIcon,
  LightbulbIcon,
} from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "empresa-1",
    companyName: "Empresa 1",
    companyLogo: "",
    companyWebsite: "https://ejemplo.com",
    location: "Ciudad, Pais",
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "Tu Rol",
        employmentPeriod: {
          start: "01.2024",
        },
        employmentType: "Full-time",
        icon: <CodeXmlIcon />,
        description: "- Responsabilidad 1\\n- Responsabilidad 2\\n- Responsabilidad 3\\n",
        skills: ["Habilidad 1", "Habilidad 2"],
      }
    ]
  }
]
