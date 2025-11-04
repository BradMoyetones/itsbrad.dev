import { getContent } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

const locales = ["en", "es"];

export default async function sitemap() {
  const blogPosts = await getContent("posts")
  const workProjects = await getContent("projects");
  
  const blogs = blogPosts.flatMap((post) =>
    locales.map((locale) => ({
      url: `${baseURL}/${locale}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }))
  );
  
  const works = workProjects.flatMap((post) =>
    locales.map((locale) => ({
      url: `${baseURL}/${locale}/work/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }))
  );

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig]
  );

  const routes = activeRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${baseURL}/${locale}${route !== "/" ? route : ""}`,
      lastModified: new Date().toISOString().split("T")[0],
    }))
  );

  return [...routes, ...blogs, ...works];
}
