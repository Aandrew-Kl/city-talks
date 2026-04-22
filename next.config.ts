import type { NextConfig } from "next";

/**
 * Post slugs that must 308 from `/{slug}/` (WordPress) → `/articles/{slug}`.
 * Source: /tmp/city-talks-posts.json — 12 entries.
 * Kept in sync with content/articles/*.md filenames.
 */
const POST_SLUGS = [
  "harmonia",
  "pep-attikis-60-65",
  "diaxeirisi-nerou",
  "eksypnoi-dimoi-psifiaki-dimosia-ygeia",
  "poleodomia-kai-dimoi",
  "i-politiki-kai-oi-politikoi",
  "oi-metatakseis-kai-i-kinitikotita-stous-dimous-2024",
  "proslipseis-mono-sta-xartia",
  "telos-stin-tafi-aporrimmatwn",
  "to-leksilogio-enos-aftodioikitikoy",
  "o-prasinos-tourismos-ws-moxlos-topikis-anaptyksis",
  "city-talks-intro",
];

const LEGACY_PAGES = [
  "about-us",
  "our-approach",
  "expertise",
  "case-studies",
  "sample-page",
  "homepage-2",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "city-talks.gr", pathname: "/wp-content/uploads/**" },
      { protocol: "https", hostname: "i0.wp.com", pathname: "/**" },
      { protocol: "https", hostname: "i1.wp.com", pathname: "/**" },
      { protocol: "https", hostname: "i2.wp.com", pathname: "/**" },
    ],
  },

  async redirects() {
    return [
      // WP category archives → unified Next.js routes
      { source: "/blog", destination: "/opinions", permanent: true },
      { source: "/blog/", destination: "/opinions", permanent: true },
      { source: "/category/smart-cities", destination: "/smart-cities", permanent: true },
      { source: "/category/smart-cities/", destination: "/smart-cities", permanent: true },
      { source: "/category/local-administration", destination: "/opinions", permanent: true },
      { source: "/category/local-administration/", destination: "/opinions", permanent: true },
      { source: "/category/politics", destination: "/opinions", permanent: true },
      { source: "/category/politics/", destination: "/opinions", permanent: true },
      { source: "/category/programs", destination: "/opinions", permanent: true },
      { source: "/category/programs/", destination: "/opinions", permanent: true },
      { source: "/category/city-talks", destination: "/opinions", permanent: true },
      { source: "/category/city-talks/", destination: "/opinions", permanent: true },
      { source: "/category/uncategorized", destination: "/opinions", permanent: true },
      { source: "/category/uncategorized/", destination: "/opinions", permanent: true },

      // WP brief/mission pages → /lets-talk
      { source: "/city-talks", destination: "/lets-talk", permanent: true },
      { source: "/city-talks/", destination: "/lets-talk", permanent: true },
      { source: "/city-talks-intro", destination: "/lets-talk", permanent: true },
      { source: "/city-talks-intro/", destination: "/lets-talk", permanent: true },
      { source: "/contact", destination: "/lets-talk#contact", permanent: true },
      { source: "/contact/", destination: "/lets-talk#contact", permanent: true },

      // Legacy Liquid theme demo pages → home
      ...LEGACY_PAGES.flatMap((slug) => [
        { source: `/${slug}`, destination: "/", permanent: true },
        { source: `/${slug}/`, destination: "/", permanent: true },
      ]),

      // WP flat post slugs → /articles/{slug}
      ...POST_SLUGS.flatMap((slug) => [
        { source: `/${slug}`, destination: `/articles/${slug}`, permanent: true },
        { source: `/${slug}/`, destination: `/articles/${slug}`, permanent: true },
      ]),
    ];
  },
};

export default nextConfig;
