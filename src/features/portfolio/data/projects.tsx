import { CodeXmlIcon } from "lucide-react"
import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "chess-fw",
    title: "@chess-fw/core",
    period: {
      start: "07.2024",
    },
    link: "https://github.com/BradMoyetones/chess",
    skills: ["JavaScript", "TypeScript", "chess.js", "pnpm", "Turborepo"],
    description: "**Professional, event-driven, framework-agnostic chess engine core in TypeScript.** Features time travel, event bus, PGN/FEN parsing, and Stockfish integration.\\n\\n**Chess Framework**\\nA headless, purely Object-Oriented Chess Engine and Framework written in TypeScript. This repository is managed as a monorepo using pnpm workspaces and Turborepo.\\n\\nEl proyecto utiliza \`chess.js\` internamente para abstraer la lógica de ajedrez y proporcionar una capa superior con datos enriquecidos y funcionalidades adicionales, como anotaciones, manejo de eventos y otras capacidades orientadas a construir una experiencia más completa alrededor del motor de ajedrez.",
    icon: <CodeXmlIcon />,
  }
]
