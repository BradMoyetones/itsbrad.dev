import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, newsletter } from "@/resources";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const tb = await getTranslations('blog'); // ✅ versión server-safe de useTranslations
  const tp = await getTranslations('person'); // ✅ versión server-safe de useTranslations

  return {
    title: tb('title'),
    description: tb('description', { name: tp("name") }),
    openGraph: {
      title: tb('title'),
      description: tb('description', { name: tp("name") }),
      images: [
        `/api/og/generate?title=${encodeURIComponent(tb('title'))}`
      ],
      url: `${baseURL}${tb('path')}`,
    },
  };
}

export default function Blog() {
  
  return (
    <Column maxWidth="s">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {blog.title}
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
