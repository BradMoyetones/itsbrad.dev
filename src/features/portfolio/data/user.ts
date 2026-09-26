import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Brad",
  lastName: "Moyetones",
  displayName: "Brad Moyetones",
  username: "bradmoyetones",
  gender: "male",
  pronouns: "he/him",
  bio: "Software Engineer & Creator",
  flipSentences: [
    "Software Engineer",
    "Creative Developer",
    "Open Source Enthusiast",
  ],
  address: "Planet Earth",
  phoneNumberB64: "", 
  emailB64: "", 
  website: "https://bradmoyetones.com",
  jobTitle: "Software Engineer",
  jobs: [
    {
      title: "Software Engineer",
      company: "Company",
      website: "#",
      experienceId: "current",
    }
  ],
  about: `- I’m Brad Moyetones — a Software Engineer passionate about web development, design, and user experience.
- Currently building awesome web applications and expanding my knowledge of modern frameworks like Astro, Next.js, and React.
`,
  avatar: "https://avatars.githubusercontent.com/u/1?v=4", // Placeholder avatar
  avatarSketch: "https://avatars.githubusercontent.com/u/1?v=4",
  avatarVariants: {},
  ogImage: "",
  namePronunciationUrl: "",
  timeZone: "UTC",
  keywords: [
    "bradmoyetones",
    "brad moyetones",
    "brad",
    "software engineer",
    "developer",
  ],
  dateCreated: "2024-01-01",
}
