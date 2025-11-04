import mdx from "@next/mdx";
import createNextIntlPlugin from 'next-intl/plugin';

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(withMDX(nextConfig));
