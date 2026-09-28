import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BUILD_TIMESTAMP: new Date().toISOString(),
  },
  reactStrictMode: true,
  typedRoutes: true,
  transpilePackages: ["next-mdx-remote"],
  devIndicators: false,
  experimental: {
    // Rewrite barrel imports to deep imports so a single icon doesn't pull the
    // whole package into the module graph. Next already optimizes lucide-react,
    // @tabler/icons-react, date-fns and lodash-es by default; these are the
    // heavy icon packages this app uses that are NOT on that default list.
    optimizePackageImports: [
      "@hugeicons/react",
      "@hugeicons/core-free-icons",
      "@phosphor-icons/react",
      "@remixicon/react",
    ],
  },
  compiler:
    process.env.NODE_ENV === "production"
      ? {
        removeConsole: {
          exclude: ["error"],
        },
      }
      : undefined,
  async redirects() {
    return [
      {
        source: "/llms-full.txt",
        destination: "/llms.txt",
        permanent: true,
      },
      {
        source: "/:section(blog)/:slug.mdx",
        destination: "/:section/:slug.md",
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:section(blog)/:slug.md",
          destination: "/doc.md/:slug",
        },
        {
          source: "/index.md",
          destination: "/llms.txt",
        },
        {
          source: "/",
          destination: "/llms.txt",
          has: [
            {
              type: "header",
              key: "accept",
              value: "(?<accept>.*text/markdown.*)",
            },
          ],
        },
      ],
    }
  }
};

export default nextConfig;
