import { Logo } from "@once-ui-system/core";

const newsletter = {
  display: false,
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/BradMoyetones",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/brad-moyetones/",
  },
  {
    name: "Threads",
    icon: "threads",
    link: "https://www.threads.com/@its.bradn",
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/its.bradn",
  },
  {
    name: "Web",
    icon: "globe",
    link: "https://portfolio-brad.vercel.app",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:contact@itsbrad.dev`,
  },
];

const home = {
  featured: {
    display: true,
  },
};

const about = {
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
  },
  intro: {
    display: true,
  },
  work: {
    display: true,
  },
  studies: {
    display: true,
  },
  technical: {
    display: true,
  },
};


export { social, newsletter, home, about };
