import type { Education } from "../types/education"

export const EDUCATION: Education[] = [
  {
    id: "cun",
    school: "Universidad CUN — Corporación Unificada Nacional de Educación Superior",
    degree: "Ingeniería de Sistemas",
    period: {
      start: "02.2024",
      end: "06.2025",
    },
    description: "Estudios en Ingeniería de Sistemas.",
  },
  {
    id: "sena",
    school: "SENA — Servicio Nacional de Aprendizaje",
    degree: "ADSI — Análisis y Desarrollo de Sistemas de Información",
    period: {
      start: "07.2021",
      end: "07.2023",
    },
    description: "Este programa marcó el inicio de mi carrera como desarrollador full-stack y me proporcionó las bases para continuar desarrollándome profesionalmente en el área de software.",
  },
  {
    id: "autodidacta",
    school: "Aprendizaje autodidacta",
    degree: "Desarrollo de Software",
    period: {
      start: "2020",
    },
    description: "Amplié mis conocimientos en tecnologías web modernas como React, Node.js y Next.js a través de proyectos personales, práctica constante y autoestudio.",
  }
]
