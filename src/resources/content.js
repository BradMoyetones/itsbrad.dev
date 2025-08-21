import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Brad",
  lastName: "Moyetones",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Engineer",
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
    link: "https://cal.com", // puedes actualizar con tu link real
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm a systems developer passionate about solving internal organizational challenges through custom software.
        I started as an intern at Parque Jaime Duque and quickly transitioned into a full-time role, where I've led the development
        of several critical internal applications used daily by staff. I specialize in backend and fullstack development with technologies like
        Node.js, Next.js, React, and more.
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
            Developed a lunch registration system to manage employee food benefits, including a claims module,
            real-time statistics, and predictive reports to optimize meal preparation logistics.
          </>,
          <>
            Created the Ecotrueque platform to digitize recycling contributions and employee incentive redemptions,
            integrating it with the lunch system to automatically apply benefit discounts based on weight contributed.
          </>,
          <>
            Built a digital library to manage book inventory, availability, and loan tracking, replacing manual Excel workflows.
          </>,
          <>
            Developed a shift scheduling tool for park gate staff, allowing administrators to assign shifts and employees
            to view their weekly routes through a modular interface.
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
            Designed and implemented an application to download Creative Commons licensed multimedia content
            using only the resource URL, leveraging YT-DLP and FFMPEG for format conversion.
          </>,
          <>
            Used Shadcn/ui to create a modern and consistent interface, along with SQLite as a local database
            to manage all downloaded media, using Drizzle as an ORM to simplify SQL queries.
          </>,
          <>
            Implemented the app as a desktop software using Electron.js and React, achieving OS integration
            for storage and management of downloaded files.
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
            Developed a fullstack application with Next.js, PostgreSQL, and Prisma
            focused on content management, learning, and collaborative writing.
          </>,
          <>
            Integrated secure authentication with NextAuth (Google and credentials),
            email verification, and advanced session management.
          </>,
          <>
            Implemented a rich-text editor using Plate.js for notes and articles with dynamic formatting.
          </>,
          <>
            Used Shadcn/ui and Tailwind to build a modern, modular, and fully responsive interface.
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
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Self-directed Learning",
        description: <>Expanded my knowledge in modern web technologies such as React, Node.js, and Next.js through personal projects and self-study.</>,
      },
      {
        name: "CUN University - National Unified Higher Education Corporation (Feb 29, 2024 - Jun 30, 2025)",
        description: <>Studied Systems Engineering.</>,
      },
      {
        name: "SENA - National Learning Service (Jul 19, 2021 - Jul 19, 2023)",
        description: <>Studied ADSI: Analysis and Development of Information Systems. This marked the beginning of my career as a fullstack developer.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Node.js & Express",
        description: <>Built backend systems and APIs for internal applications, including authentication and data processing.</>,
        images: [],
      },
      {
        title: "React & Next.js",
        description: <>Developed modular interfaces and fullstack solutions using modern tools like Next.js, Tailwind, and SWR.</>,
        images: [],
      },
      {
        title: "PostgreSQL & SQL",
        description: <>Designed relational schemas and wrote efficient queries for high-volume internal data systems.</>,
        images: [],
      },
      {
        title: "System Integration",
        description: <>Connected internal tools (e.g., lunch system + Ecotrueque) to automate workflows and reduce manual effort.</>,
        images: [],
      },
      {
        title: "PHP & Laravel",
        description: <>Built robust web applications with Laravel, including CRUD systems, authentication, and RESTful API management.</>,
        images: [],
      },
      {
        title: "PHP & Slim Framework",
        description: <>Developed lightweight microservices and APIs using Slim, focusing on simplicity, performance, and scalability.</>,
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
