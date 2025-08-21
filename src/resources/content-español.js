import { Logo } from "@once-ui-system/core";

const person = {
  firstName: "Brad",
  lastName: "Moyetones",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Ingeniero de Software",
  avatar: "/images/avatar.jpg",
  email: "brad.moyetones@gmail.com",
  location: "America/Bogota", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["Español", "Inglés"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: false,
  title: <>Suscríbete al boletín de {person.firstName}</>,
  description: (
    <>
      Ocasionalmente escribo sobre software, tecnología y comparto ideas sobre la intersección
      entre creatividad e ingeniería.
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
  label: "Inicio",
  title: `Portafolio de ${person.name}`,
  description: `Sitio web portafolio mostrando mi trabajo como ${person.role}`,
  headline: <>Construyendo puentes entre software y código</>,
  featured: {
    display: true,
    title: <>Proyecto reciente: <strong className="ml-4">Noesis</strong></>,
    href: "/work/noesis-reflection-platform",
  },
  subline: (
    <>
      Soy {person.name}, {person.role} en el Parque Jaime Duque,
      donde desarrollo herramientas internas y sistemas a la medida que resuelven problemas reales.
      <br />
      Disfruto aprender nuevas tecnologías y crear proyectos personales que combinan lógica e introspección.
    </>
  ),
};

const about = {
  path: "/about",
  label: "Acerca de mí",
  title: `Acerca de – ${person.name}`,
  description: `Conoce a ${person.name}, ${person.role} de ${person.location}`,
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
    title: "Introducción",
    description: (
      <>
        Soy un desarrollador de sistemas apasionado por resolver desafíos organizacionales mediante software a la medida.  
        Empecé como practicante en el Parque Jaime Duque y rápidamente pasé a un rol de tiempo completo, liderando el desarrollo
        de varias aplicaciones internas críticas usadas a diario por el personal.  
        Me especializo en desarrollo backend y fullstack con tecnologías como Node.js, Next.js, React, entre otras.
      </>
    ),
  },
  work: {
    display: true,
    title: "Experiencia Laboral",
    experiences: [
      {
        company: "Parque Jaime Duque",
        timeframe: "2023 - Presente",
        role: "Desarrollador de Sistemas",
        achievements: [
          <>
            Desarrollé un sistema de registro de almuerzos para gestionar beneficios alimenticios de los empleados, incluyendo módulo de reclamaciones,
            estadísticas en tiempo real y reportes predictivos para optimizar la logística de preparación.
          </>,
          <>
            Creé la plataforma Ecotrueque para digitalizar aportes de reciclaje y redención de incentivos de los empleados, integrándola con el sistema de almuerzos
            para automatizar descuentos de beneficios según el peso aportado.
          </>,
          <>
            Construí una biblioteca digital para administrar inventario de libros, disponibilidad y seguimiento de préstamos, reemplazando flujos manuales en Excel.
          </>,
          <>
            Desarrollé una herramienta de programación de turnos para el personal de portería del parque, permitiendo a los administradores asignar turnos y a los empleados
            consultar su ruta semanal desde una interfaz modular.
          </>,
        ],
        images: [
          {
            src: "/images/projects/lunches/cover-01.png",
            alt: "Proyecto Almuerzos",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/ecotrueque/cover-01.jpeg",
            alt: "Proyecto Ecotrueque",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "BradTunes",
        timeframe: "2024 - Presente",
        role: "Proyecto Personal – Desktop App de Música",
        achievements: [
          <>
            Diseñé e implementé una aplicación que permite descargar contenido
            multimedia con licencia Creative Commons usando únicamente la URL del
            recurso, apoyándome en YT-DLP y FFMPEG para la conversión entre formatos.
          </>,
          <>
            Utilicé Shadcn/ui para crear una interfaz moderna y consistente, junto con
            SQLite como base de datos local para gestionar toda la multimedia
            descargada, usando Drizzle como ORM para simplificar las consultas SQL.
          </>,
          <>
            Implementé la aplicación como un software de escritorio usando Electron.js
            y React, logrando la integración con el sistema operativo para el
            almacenamiento y manejo de los archivos descargados.
          </>,
        ],
        images: [
          {
            src: "/images/projects/bradtunes/cover-02.jpeg",
            alt: "Proyecto Bradtunes",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Noesis",
        timeframe: "2025 - Presente",
        role: "Proyecto Personal – Plataforma de Conocimiento",
        achievements: [
          <>
            Desarrollo de una aplicación fullstack con Next.js, PostgreSQL y Prisma
            orientada a la gestión de contenido, aprendizaje y escritura colaborativa.
          </>,
          <>
            Integración de autenticación segura con NextAuth (Google y credenciales),
            verificación por correo electrónico y manejo avanzado de sesiones.
          </>,
          <>
            Implementación de un editor enriquecido con Plate.js para notas y artículos
            con formato dinámico.
          </>,
          <>
            Uso de Shadcn/ui y Tailwind para construir una interfaz moderna, modular y
            totalmente responsive.
          </>,
        ],
        images: [
          {
            src: "/images/projects/noesis/cover-01.jpeg",
            alt: "Proyecto Noesis",
            width: 16,
            height: 9,
          },
          {
            src: "/images/projects/noesis/cover-02.jpeg",
            alt: "Proyecto Noesis",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Formación Académica",
    institutions: [
      {
        name: "Aprendizaje autodidacta",
        description: <>Amplié mis conocimientos en tecnologías web modernas como React, Node.js y Next.js mediante proyectos personales y autoformación.</>,
      },
      {
        name: "Universidad CUN - Corporación Unificada Nacional de Educación Superior (Feb 29, 2024 - Jun 30, 2025)",
        description: <>Estudié Ingeniería de Sistemas.</>,
      },
      {
        name: "SENA - Servicio Nacional de Aprendizaje (Jul 19, 2021 - Jul 19, 2023)",
        description: <>Estudié el tecnólogo en ADSI: Análisis y Desarrollo de Sistemas de Información. Este fué el comienzo de mi carrera como desarrollador fullstack.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Habilidades Técnicas",
    skills: [
      {
        title: "Node.js & Express",
        description: <>Construcción de sistemas backend y APIs para aplicaciones internas, incluyendo autenticación y procesamiento de datos.</>,
        images: [],
      },
      {
        title: "React & Next.js",
        description: <>Desarrollo de interfaces modulares y soluciones fullstack con herramientas modernas como Next.js, Tailwind y SWR.</>,
        images: [],
      },
      {
        title: "PostgreSQL & SQL",
        description: <>Diseño de esquemas relacionales y escritura de consultas eficientes para sistemas con alto volumen de datos internos.</>,
        images: [],
      },
      {
        title: "Integración de sistemas",
        description: <>Conexión de herramientas internas (ej. sistema de almuerzos + Ecotrueque) para automatizar flujos de trabajo y reducir esfuerzo manual.</>,
        images: [],
      },
      {
        title: "PHP & Laravel",
        description: <>Construcción de aplicaciones web robustas con Laravel, incluyendo sistemas CRUD, autenticación y manejo de APIs RESTful.</>,
        images: [],
      },
      {
        title: "PHP & Slim Framework",
        description: <>Desarrollo de microservicios y APIs ligeras usando Slim, con foco en simplicidad, rendimiento y escalabilidad.</>,
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
  title: "Reflexiones sobre código, crecimiento y construir con propósito",
  description: `Pensamientos, lecciones y descubrimientos de ${person.name}, un desarrollador autodidacta apasionado por aprender, resolver problemas y llevar ideas a la realidad.`,
  // Crea nuevas publicaciones agregando un archivo .mdx en app/blog/posts
  // Todas las publicaciones aparecerán en la ruta /blog
};

const work = {
  path: "/work",
  label: "Proyectos",
  title: `Proyectos – ${person.name}`,
  description: `Proyectos de diseño y desarrollo de ${person.name}`,
  // Crea nuevas páginas de proyectos agregando un archivo .mdx en app/blog/posts
  // Todos los proyectos aparecerán en las rutas /home y /work
};

const gallery = {
  path: "/gallery",
  label: "Galería",
  title: `Galería fotográfica – ${person.name}`,
  description: `Una colección de fotografías de ${person.name}`,
  // Imágenes por https://lorant.one
  // Estas son imágenes de ejemplo, reemplázalas con las tuyas propias
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
