import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import { Meta, Schema, AvatarGroup, Button, Column, Heading, HeadingNav, Icon, Row, Text } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getContent } from "@/utils/utils";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface BlogParams {
  params: { 
    slug: string;
    locale: string;
  };
}

export async function generateStaticParams() {
	const locales = routing.locales;
    
  // Create an array to store all posts from all locales
  const allPosts: { slug: string; locale: string }[] = [];

  // Fetch posts for each locale
  for (const locale of locales) {
    const posts = getContent('posts', locale);
    allPosts.push(...posts.map(post => ({
      slug: post.slug,
      locale: locale,
    })));
  }

  return allPosts;
}

export async function generateMetadata({ params: { slug, locale } }: BlogParams) {
  const tb = await getTranslations('blog');
  const posts = getContent("posts", locale);

  const slugPath = Array.isArray(slug) ? slug.join('/') : slug || '';
  const post = posts.find(p => p.slug === slugPath);

  if (!post) return;

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL,
    image: post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`,
    path: `/${locale}${tb("path")}/${post.slug}`,
  });
}

export default function Blog({ params }: BlogParams) {
  setRequestLocale(params.locale)
  const tb = useTranslations('blog');
  const tp = useTranslations('person');
  const ta = useTranslations('about');

  let post = getContent("posts", params.locale).find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Row fillWidth>
      <Row maxWidth={12} hide="m"/>
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="xs" gap="l">
          <Schema
            as="blogPosting"
            baseURL={baseURL}
            path={`${tb("path")}/${params.locale}/${post.slug}`}
            title={post.metadata.title}
            description={post.metadata.summary}
            datePublished={post.metadata.publishedAt}
            dateModified={post.metadata.publishedAt}
            image={post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`}
            author={{
              name: tp("name"),
              url: `${baseURL}${ta("path")}`,
              image: `${baseURL}/${tp("avatar")}`,
            }}
          />
          <Button data-border="rounded" href="/blog" weight="default" variant="tertiary" size="s" prefixIcon="chevronLeft">
            Posts
          </Button>
          <Heading variant="display-strong-s">{post.metadata.title}</Heading>
          <Row gap="12" vertical="center">
            {avatars.length > 0 && <AvatarGroup size="s" avatars={avatars} />}
            <Text variant="body-default-s" onBackground="neutral-weak">
              {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
            </Text>
          </Row>
          <Column as="article" fillWidth>
            <CustomMDX source={post.content} />
          </Column>
          <ScrollToHash />
        </Column>
      </Row>
      <Column maxWidth={12} paddingLeft="40" fitHeight position="sticky" top="80" gap="16" hide="m">
        <Row
          gap="12"
          paddingLeft="2"
          vertical="center"
          onBackground="neutral-medium"
          textVariant="label-default-s"
        >
          <Icon name="document" size="xs" />
          On this page
        </Row>
        <HeadingNav fitHeight/>
      </Column>
    </Row>
  );
}
