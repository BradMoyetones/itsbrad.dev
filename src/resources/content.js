import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Brad",
  lastName: "Moyetones",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Systems Engineer",
  avatar: "/images/avatar.jpg",
  email: "brad.moyetones@gmail.com",
  location: "America/Bogota", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Spanish", "English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about software, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
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
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building bridges between software and code</>,
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">Noises</strong></>,
    href: "/work/noesis-reflection-platform",
  },
  subline: (
    <>
      I'm {person.name}, a {person.role} at Jaime Duque Park,
      where I build internal tools and custom systems that solve real-world problems.
      <br />
      I enjoy learning new technologies and creating side projects that reflect both logic and introspection.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com", // you can update with your real link
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I am a systems developer passionate about creating solutions that optimize internal processes.  
        I started as an intern at Parque Jaime Duque and quickly moved into a full-time role.  
        Today I combine my professional experience and personal projects to grow as a backend and fullstack developer.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Parque Jaime Duque",
        timeframe: "2023 - Present",
        role: "Systems Developer",
        achievements: [
          <>
            At Parque Jaime Duque I have had the opportunity to design solutions that directly impact the daily operations 
            of the staff. Some of these include a meal management system with reports and analytics, the Ecotrueque 
            platform that promotes recycling through benefits, a digital library that replaced manual Excel processes, 
            and a scheduling tool that streamlined staff shift organization.
          </>,
        ],
        images: [
          {
            src: "/images/projects/lunches/cover-01.png",
            alt: "Lunch Project",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/ecotrueque/cover-01.jpeg",
            alt: "Ecotrueque Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "BradTunes",
        timeframe: "2024 - Present",
        role: "Personal Project – Desktop Music App",
        achievements: [
          <>
            BradTunes started as a personal project where I combined several of my passions: music, programming, 
            and user experience. I built a desktop application with Electron and React that allows users to download 
            and organize multimedia content, integrating format conversion with YT-DLP and FFMPEG, a local database 
            with SQLite, and a modern interface built with Shadcn/ui.
          </>,
        ],
        images: [
          {
            src: "/images/projects/bradtunes/cover-02.jpeg",
            alt: "BradTunes Project",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Noesis",
        timeframe: "2025 - Present",
        role: "Personal Project – Knowledge Platform",
        achievements: [
          <>
            I am currently developing Noesis, a platform designed for learning and collaborative writing.  
            It is a fullstack application built with Next.js and PostgreSQL, integrating secure authentication 
            with NextAuth, a rich editor with Plate.js, and a modular, responsive design with Shadcn/ui and Tailwind.
          </>,
        ],
        images: [
          {
            src: "/images/projects/noesis/cover-01.jpeg",
            alt: "Noesis Project",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/noesis/cover-02.jpeg",
            alt: "Noesis Project",
            width: 16,
            height: 9,
          },
        ]
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Self-taught learning",
        description: <>Expanded my knowledge in modern web technologies such as React, Node.js, and Next.js through personal projects and self-study.</>,
      },
      {
        name: "Universidad CUN - Corporación Unificada Nacional de Educación Superior (Feb 29, 2024 - Jun 30, 2025)",
        description: <>Studied Systems Engineering.</>,
      },
      {
        name: "SENA - Servicio Nacional de Aprendizaje (Jul 19, 2021 - Jul 19, 2023)",
        description: <>Studied the ADSI program: Analysis and Development of Information Systems. This was the beginning of my career as a fullstack developer.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Skills",
    skills: [
      {
        title: "Technologies",
        description: (
          <>
            Node.js, Express, React, Next.js, Tailwind, PostgreSQL, MySQL, Prisma, SQLite,  
            PHP (Laravel & Slim), system integration, and API development.
          </>
        ),
        images: [],
      },
      {
        title: "Soft Skills",
        description: (
          <>
            I am collaborative, responsible, and passionate about development.  
            I work with vocation, enjoy problem-solving, and adapt quickly to new challenges.
          </>
        ),
        images: [],
      },
    ],
  },
};

// const about = {
//   path: "/about",
//   label: "About",
//   title: `About – ${person.name}`,
//   description: `Meet ${person.name}, ${person.role} from ${person.location}`,
//   tableOfContent: {
//     display: true,
//     subItems: false,
//   },
//   avatar: {
//     display: true,
//   },
//   calendar: {
//     display: true,
//     link: "https://cal.com",
//   },
//   intro: {
//     display: true,
//     title: "Introduction",
//     description: (
//       <>
//         Selene is a Jakarta-based design engineer with a passion for transforming complex challenges
//         into simple, elegant design solutions. Her work spans digital interfaces, interactive
//         experiences, and the convergence of design and technology.
//       </>
//     ),
//   },
//   work: {
//     display: true, // set to false to hide this section
//     title: "Work Experience",
//     experiences: [
//       {
//         company: "FLY",
//         timeframe: "2022 - Present",
//         role: "Senior Design Engineer",
//         achievements: [
//           <>
//             Redesigned the UI/UX for the FLY platform, resulting in a 20% increase in user
//             engagement and 30% faster load times.
//           </>,
//           <>
//             Spearheaded the integration of AI tools into design workflows, enabling designers to
//             iterate 50% faster.
//           </>,
//         ],
//         images: [
//           // optional: leave the array empty if you don't want to display images
//           {
//             src: "/images/projects/project-01/cover-01.jpg",
//             alt: "Once UI Project",
//             width: 16,
//             height: 9,
//           },
//         ],
//       },
//       {
//         company: "Creativ3",
//         timeframe: "2018 - 2022",
//         role: "Lead Designer",
//         achievements: [
//           <>
//             Developed a design system that unified the brand across multiple platforms, improving
//             design consistency by 40%.
//           </>,
//           <>
//             Led a cross-functional team to launch a new product line, contributing to a 15% increase
//             in overall company revenue.
//           </>,
//         ],
//         images: [],
//       },
//     ],
//   },
//   studies: {
//     display: true, // set to false to hide this section
//     title: "Studies",
//     institutions: [
//       {
//         name: "University of Jakarta",
//         description: <>Studied software engineering.</>,
//       },
//       {
//         name: "Build the Future",
//         description: <>Studied online marketing and personal branding.</>,
//       },
//     ],
//   },
//   technical: {
//     display: true, // set to false to hide this section
//     title: "Technical skills",
//     skills: [
//       {
//         title: "Figma",
//         description: <>Able to prototype in Figma with Once UI with unnatural speed.</>,
//         // optional: leave the array empty if you don't want to display images
//         images: [
//           {
//             src: "/images/projects/project-01/cover-02.jpg",
//             alt: "Project image",
//             width: 16,
//             height: 9,
//           },
//           {
//             src: "/images/projects/project-01/cover-03.jpg",
//             alt: "Project image",
//             width: 16,
//             height: 9,
//           },
//         ],
//       },
//       {
//         title: "Next.js",
//         description: <>Building next gen apps with Next.js + Once UI + Supabase.</>,
//         // optional: leave the array empty if you don't want to display images
//         images: [
//           {
//             src: "/images/projects/project-01/cover-04.jpg",
//             alt: "Project image",
//             width: 16,
//             height: 9,
//           },
//         ],
//       },
//     ],
//   },
// };

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Reflections on code, growth, and building with purpose",
  description: `Thoughts, lessons, and discoveries from ${person.name}, a self-taught developer passionate about learning, problem-solving, and pushing ideas into reality.`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    // {
    //   src: "/images/gallery/horizontal-1.jpg",
    //   alt: "image",
    //   orientation: "horizontal",
    // },
    {
      src: "/images/gallery/horizontal-5.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-6.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-7.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-5.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-6.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-7.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-8.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-9.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-10.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-12.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-13.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-14.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
