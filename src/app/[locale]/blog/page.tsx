import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, newsletter } from "@/resources";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata(
  { params: {locale}}: { params: { locale: string }}
) {
  const tb = await getTranslations('blog');
  const tp = await getTranslations('person');

  return {
    title: tb('title'),
    description: tb('description', { name: tp("name") }),
    openGraph: {
      title: tb('title'),
      description: tb('description', { name: tp("name") }),
      images: [
        `/api/og/generate?title=${encodeURIComponent(tb('title'))}`
      ],
      url: `${baseURL}/${locale}${tb('path')}`,
    },
  };
}

export default async function Blog(
  { params: {locale}}: { params: { locale: string }}
) {
  const tb = await getTranslations('blog');
  const tp = await getTranslations('person');
  
  setRequestLocale(locale)
  return (
    <Column maxWidth="s">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={tb("title")}
        description={tb("description", { name: tp("name") })}
        path={tb("path")}
        image={`/api/og/generate?title=${encodeURIComponent(tb("title"))}`}
        author={{
          name: tp("name"),
          url: `${baseURL}/blog`,
          image: `${baseURL}${tp("avatar")}`,
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {tb("title")}
      </Heading>
      <Column
				fillWidth flex={1}>
				<Posts range={[1,1]} thumbnail direction="column"/>
				<Posts range={[2,3]} thumbnail/>
				<Posts range={[4]} columns="2"/>
			</Column>
      {newsletter.display && <Mailchimp newsletter={newsletter} />}
    </Column>
  );
}
