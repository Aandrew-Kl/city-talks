# City Talks

Πλατφόρμα συζητήσεων για Τοπική Αυτοδιοίκηση & Έξυπνες Πόλεις.

## Stack

Next.js 16, React 19, TypeScript (strict), Tailwind CSS 4, markdown+gray-matter content.

## Quick start

```bash
npm install
cp .env.example .env.local  # fill in required vars
npm run dev                  # open http://localhost:3000
```

## Scripts

`npm run dev` / `npm run build` / `npm run start` / `npm run lint` / `npm run test`

## Content

Articles live in `content/articles/*.md` with frontmatter:

```yaml
---
title: "Τίτλος άρθρου"
slug: "url-friendly-slug"
date: "2026-04-22"
category: "opinions"               # or "smart-cities"
excerpt: "Σύντομη περίληψη για listings και OG tags."
image: "/article-images/slug.jpg"  # goes in public/article-images/
author: "Όνομα Αρθρογράφου"
---
```

Images live in `public/article-images/` — featured image at `public/article-images/<slug>.jpg`; inline images under `public/article-images/<slug>/`.

## Routes

- `/` — homepage (hero, IA grid, featured 6, lets-talk CTA, newsletter)
- `/opinions`, `/smart-cities` — category listings
- `/articles/[slug]` — individual articles (SSG)
- `/lets-talk`, `/podcasts` — interaction pages
- `/api/contact`, `/api/newsletter` — POST handlers (zod-validated, honeypot, structured logs)
- `/robots.txt`, `/sitemap.xml`, `/feed.xml` — SEO surfaces

## Env

See `.env.example`. `NEXT_PUBLIC_SITE_URL` must match production.

## Deploy

Any Next-compatible host (Vercel recommended). Build: `npm run build`.

## Note on Next.js 16

This is NOT the Next.js you (or AI agents) might know from training data. It has breaking changes. See `AGENTS.md` and the local docs at `node_modules/next/dist/docs/`.
