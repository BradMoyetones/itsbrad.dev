import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "TuNombre",
  lastName: "TuApellido",
  displayName: "TuNombre TuApellido",
  username: "tu_usuario",
  gender: "male",
  pronouns: "he/him",
  bio: "Tu Bio Corta",
  flipSentences: [
    "Rol 1",
    "Rol 2",
    "Rol 3",
  ],
  address: "Tu Ubicacion",
  phoneNumberB64: "", 
  emailB64: "", 
  website: "https://tudominio.com",
  jobTitle: "Tu Rol Principal",
  jobs: [
    {
      title: "Tu Rol",
      company: "Tu Empresa",
      website: "#",
      experienceId: "current",
    }
  ],
  about: "- Sobre mi\\n- Parrafo 1\\n- Parrafo 2\\n",
  avatar: "/placeholder-avatar.png",
  avatarSketch: "/placeholder-avatar.png",
  avatarVariants: {},
  ogImage: "",
  namePronunciationUrl: "",
  timeZone: "UTC",
  keywords: [
    "keyword1",
    "keyword2",
  ],
  dateCreated: "2024-01-01",
}
