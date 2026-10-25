# KOLINN_NAV

KOLINN_NAV is a content-driven Astro 5 demo site built around the KOLINN
Design System. It includes responsive mega-menu navigation, a searchable
content index, project release examples, support and documentation samples,
and news and guides. All content and contact details are demonstration data.

The site builds as a static site (`dist/`); no server-side runtime is currently
required. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the implementation
overview and [docs/REFACTORING_PLAN.md](docs/REFACTORING_PLAN.md) for the
incremental quality and design roadmap.

## Requirements

- Node.js `^18.20.8 || ^20.3.0 || >=22.0.0`
- pnpm (the repository includes `pnpm-lock.yaml`)

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

The app is a static Astro build and is suited to Cloudflare Workers Static
Assets. The repository does not yet include a Cloudflare Worker deployment
configuration. Add that configuration and its local development/deploy scripts
once the Cloudflare `cf` CLI is available in the development environment; do
not treat `astro preview` as a Worker runtime test.

For the complete quality roadmap, including the Cloudflare deployment
milestone, see [docs/REFACTORING_PLAN.md](docs/REFACTORING_PLAN.md).
