import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const tw = await getTranslations('work');
  const tp = await getTranslations('person');

  return Meta.generate({
    title: tw("title", { name: tp("name") }),
    description: tw("description", { name: tp("name") }),
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(tw("title", { name: tp("name") }))}`,
    path: tw("path"),
  });
}

export default async function Work() {
  const tw = await getTranslations('work');
  const tp = await getTranslations('person');
  const ta = await getTranslations('about');

  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={tw("path")}
        title={tw("title", { name: tp("name") })}
        description={tw("description", { name: tp("name") })}
        image={`/api/og/generate?title=${encodeURIComponent(tw("title", { name: tp("name") }))}`}
        author={{
          name: tp("name"),
          url: `${baseURL}${ta("path")}`,
          image: `${baseURL}${tp("avatar")}`,
        }}
      />
      <Projects />
    </Column>
  );
}
