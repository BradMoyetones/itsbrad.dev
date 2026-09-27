import { BriefcaseBusinessIcon } from "lucide-react"
import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
  {
    id: "jaime-duque",
    companyName: "Parque Jaime Duque",
    companyLogo: "",
    companyWebsite: "https://www.parquejaimeduque.com",
    location: "Cundinamarca, Colombia",
    locationType: "Hybrid",
    isCurrentEmployer: true,
    positions: [
      {
        id: "jaime-duque-1",
        title: "Ingeniero de Sistemas / Software Developer",
        employmentPeriod: {
          start: "01.2023",
        },
        icon: <BriefcaseBusinessIcon />,
        description: "Trabajo en el desarrollo de aplicaciones y soluciones internas para el Parque Jaime Duque, participando en todo el proceso técnico, desde el diseño y estructuración de los datos y la lógica del backend hasta la implementación y diseño de las interfaces frontend.\\n\\nActualmente soy el único desarrollador de software del equipo, trabajando bajo la coordinación de mi jefe, quien define las necesidades, proyectos y objetivos que deben desarrollarse y entregarse.\\n\\nMi trabajo abarca distintas áreas del desarrollo de software, incluyendo backend, frontend, bases de datos, APIs, arquitectura e integración de sistemas. La idea principal de mi rol es diseñar y desarrollar aplicaciones internas que sean funcionales, mantenibles y adaptadas a las necesidades reales de la organización.",
        skills: ["PHP", "MySQL", "JavaScript", "TypeScript", "Vite", "Tailwind CSS", "React", "Node.js"],
      }
    ]
  }
]
