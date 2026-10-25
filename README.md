# KOLINN_ASTRO

KOLINN_ASTRO is a content-driven Astro 5 demo site built around the KOLINN
Design System. It includes responsive mega-menu navigation, a searchable
content index, project release examples, support and documentation samples,
and news and guides. All content and contact details are demonstration data.

The site builds as a static site (`dist/`); no server-side runtime is currently
required. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the implementation
overview and [docs/REFACTORING_PLAN.md](docs/REFACTORING_PLAN.md) for the
incremental quality and design roadmap.

## Requirements

- Node.js `>=22.12.0`
- pnpm (the repository includes a pnpm v9 lockfile)

## Local development and checks

```sh
pnpm install
pnpm run dev
pnpm run check
pnpm run build
pnpm run check:routes
pnpm run preview
```

`pnpm run check:routes` requires a current production build. It checks generated
pages, local link and anchor targets, required routes, image dimensions and
accessible names. `pnpm run preview` serves the built `dist/` output.

## Routes

```text
/
├── blog/
│   ├── news/                  archive and /:slug posts
│   └── guides/                archive and /:slug posts
├── projects/
│   ├── releases/              archive and /:slug case studies
│   └── help/
│       ├── documentations
│       └── faqs
├── info/
│   ├── support
│   ├── contact
│   └── about
└── search/                    client-side search plus browseable links
```

`/about` and `/contact` are retained as legacy redirect pages. Search data is
generated at `/search-index.json`. Static pages and local artwork are served
from the Astro build output.

## Project structure

```text
src/
├── components/                shared navigation, UI, content cards and sections
├── config/site.ts             site metadata, branding and navigation CTA
├── content/
│   ├── guides/                Markdown how-to content
│   ├── news/                  Markdown announcements and release notes
│   └── projects/              Markdown project case studies
├── content.config.ts          typed Astro Content Layer schemas
├── data/                      navigation and About page data
├── layouts/                   shared page shells
├── pages/                     static routes, archives and content templates
├── styles/
│   ├── tokens/                primitive, semantic and theme values
│   └── components/            global component and page styles
└── utils/                     content formatting and search-index helpers
tools/
└── check-routes.mjs           generated route and local-link smoke check
docs/                           architecture, design, a11y, performance and plans
```

## Content

Posts and projects are Markdown files under `src/content/`. Their schemas are
defined in `src/content.config.ts`. A typical news or guide entry looks like:

```md
---
title: "Sample post"
description: "A short summary for archive cards and page metadata."
pubDate: 2026-11-01
tags: [demo]
draft: false
---

Post content goes here.
```

News entries may set `category` (`release`, `announcement`, or `community`).
Guides may set `level` (`beginner`, `intermediate`, or `advanced`) and `order`.
Project entries may set `image`, `techStack`, `githubUrl`, and `liveUrl`.
Draft entries are excluded from public lists and routes.

## Design and accessibility

Global styles enter through `src/styles/global.css`. The import order establishes
the token, base, component, responsive, and accessibility cascade; keep
`a11y.css` last so reduced-motion preferences override component animations.
Components should use semantic design tokens instead of literal palette values.

The shared layout provides the skip link, landmarks, theme boot, header, mobile
navigation, and footer. Navigation scripts manage menu state and focus behavior;
the site also has reduced-motion overrides and a non-blocking loading accent.
See [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md) and
[docs/DESIGN_TOKENS.md](docs/DESIGN_TOKENS.md) for implementation guidance.

## Cloudflare deployment status

The project is configured for Cloudflare Workers Static Assets using
[`wrangler.jsonc`](wrangler.jsonc). Connect `klt-mm/kolinn-astro` in the
Cloudflare dashboard and use `pnpm run build` as the build command and
`pnpm run worker:deploy` as the deployment command. See
[docs/CLOUDFLARE_DEPLOYMENT.md](docs/CLOUDFLARE_DEPLOYMENT.md) for local
testing, GitHub connection steps, and post-deployment verification.

`pnpm run worker:dev` and `pnpm run worker:deploy` serve the existing `dist/`
build; run `pnpm run build` first. The `astro preview` command is not a Worker
runtime test.

The Cloudflare account connection, GitHub authorization, initial deployment,
and optional custom domain still need to be completed in the dashboard. The
codebase does not contain account credentials or secrets.

For the broader code-quality roadmap, see
[docs/REFACTORING_PLAN.md](docs/REFACTORING_PLAN.md).
