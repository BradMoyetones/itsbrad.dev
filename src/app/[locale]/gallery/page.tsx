import { Flex, Meta, Schema } from "@once-ui-system/core";
import MasonryGrid from "@/components/gallery/MasonryGrid";
import { baseURL } from "@/resources";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

export async function generateMetadata() {
  const tg = await getTranslations('gallery');
  const tp = await getTranslations('person');

  return Meta.generate({
    title: tg("title", { name: tp("name") }),
    description: tg("description", { name: tp("name") }),
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(tg("title", { name: tp("name") }))}`,
    path: tg("path"),
  });
}

export default function Gallery({ params: {locale}}: { params: { locale: string }}) {
  setRequestLocale(locale);
  const tg = useTranslations('gallery');
  const tp = useTranslations('person');

  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={tg("title", { name: tp("name") })}
        description={tg("description", { name: tp("name") })}
        path={tg("path")}
        image={`/api/og/generate?title=${encodeURIComponent(tg("title", { name: tp("name") }))}`}
        author={{
          name: tp("name"),
          url: `${baseURL}${tg("path")}`,
          image: `${baseURL}${tp("avatar")}`,
        }}
      />
      <MasonryGrid />
    </Flex>
  );
}
