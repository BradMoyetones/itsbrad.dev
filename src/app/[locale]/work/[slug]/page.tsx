import { notFound } from "next/navigation";
import { Meta, Schema, AvatarGroup, Button, Column, Flex, Heading, Media, Text } from "@once-ui-system/core";
import { baseURL, about } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { getContent } from "@/utils/utils";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

// export async function generateStaticParams(): Promise<{ slug: string }[]> {
//   const posts = await getContent("projects");
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

export async function generateStaticParams(): Promise<{ slug: string; locale: string }[]> {
  // 1. Obtener todos los posts (proyectos)
  const posts = await getContent("projects");

  // 2. Obtener todos los locales/idiomas definidos por Next.js Intl
  const locales = routing.locales;

  // 3. Generar la matriz combinada de { slug, locale }
  const params: { slug: string; locale: string }[] = [];

  posts.forEach((post) => {
    locales.forEach((locale) => {
      params.push({
        slug: post.slug, // El slug del proyecto
        locale: locale,  // El código del idioma (ej: 'es', 'en')
      });
    });
  });

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const tw = await getTranslations('work');
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const posts = await getContent("projects")
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${tw("path")}/${post.slug}`,
  });
}

export default async function Project({
  params
}: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const tw = await getTranslations('work');
  const tp = await getTranslations('person');
  const ta = await getTranslations('about');

  const postContent = await getContent("projects");
  const slugPath = Array.isArray(routeParams.slug) ? routeParams.slug.join('/') : routeParams.slug || '';

  const post = postContent.find((post) => post.slug === slugPath)

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${tw("path")}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`}
        author={{
          name: tp("name"),
          url: `${baseURL}${ta("path")}`,
          image: `${baseURL}${tp("avatar")}`,
        }}
      />
      <Column maxWidth="xs" gap="16">
        <Button data-border="rounded" href="/work" variant="tertiary" weight="default" size="s" prefixIcon="chevronLeft">
          Projects
        </Button>
        <Heading variant="display-strong-s">{post.metadata.title}</Heading>
      </Column>
      {post.metadata.images.length > 0 && (
        <Media
          priority
          aspectRatio="16 / 9"
          radius="m"
          alt="image"
          src={post.metadata.images[0]}
        />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <Flex gap="12" marginBottom="24" vertical="center">
          {post.metadata.team && <AvatarGroup reverse avatars={avatars} size="m" />}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
          </Text>
        </Flex>
        <CustomMDX source={post.content} />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
