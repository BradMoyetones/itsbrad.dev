import { notFound } from "next/navigation";
import { Meta, Schema, AvatarGroup, Button, Column, Flex, Heading, Media, Text } from "@once-ui-system/core";
import { baseURL, about } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Metadata } from "next";
import { getContent } from "@/utils/utils";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface WorkParams {
  params: {
    slug: string;
    locale: string;
  };
}

export async function generateStaticParams(): Promise<{ slug: string; locale: string }[]> {
  const locales = routing.locales;
  
  // Create an array to store all posts from all locales
  const allPosts: { slug: string; locale: string }[] = [];

  // Fetch posts for each locale
  for (const locale of locales) {
    const posts = getContent('projects', locale);
    allPosts.push(...posts.map(post => ({
      slug: post.slug,
      locale: locale,
    })));
  }

  return allPosts;
}

export async function generateMetadata({
  params: { slug, locale },
}: WorkParams): Promise<Metadata> {
  const tw = await getTranslations('work');
  const post = getContent("projects").find(p => p.slug === slug);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL,
    image: post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`,
    path: `${tw("path")}/${post.slug}`,
  });
}

export default function Project({ params }: WorkParams) {
  setRequestLocale(params.locale);
  const tw = useTranslations('work');
  const tp = useTranslations('person');
  const ta = useTranslations('about');
  
  const post = getContent("projects", params.locale).find((post) => post.slug === params.slug);

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
