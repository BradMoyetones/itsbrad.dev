// utils/content.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
};

interface MDXItem {
  metadata: Metadata;
  slug: string;
  content: string;
}

/**
 * Lee todos los archivos .mdx dentro de una carpeta
 */
function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

/**
 * Lee un archivo .mdx y extrae su frontmatter y contenido
 */
function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
  };

  return { metadata, content };
}

/**
 * Obtiene el contenido MDX desde src/content/[locale]/[type]
 * 
 * @param type - 'posts' | 'projects' | 'work' | etc.
 * @param locale - opcional, si no se pasa se detecta con getLocale()
 */
export async function getContent(type: string, locale?: string): Promise<MDXItem[]> {
  const currentLocale = locale || (await getLocale());
  const baseDir = path.join(process.cwd(), "src", "content", currentLocale, type);

  if (!fs.existsSync(baseDir)) {
    notFound();
  }

  const mdxFiles = getMDXFiles(baseDir);

  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(baseDir, file));
    const slug = path.basename(file, path.extname(file));
    return { metadata, slug, content };
  });
}
