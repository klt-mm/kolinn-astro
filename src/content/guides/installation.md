---
title: "Installation guide"
description: "Stand up the KOLINN_NAV Astro starter from scratch: prerequisites, install, dev server, and production build — plus how the design tokens are wired in."
pubDate: 2026-10-01
level: beginner
order: 1
tags: [setup, astro, tooling]
---

This guide takes you from an empty directory to a running KOLINN_NAV site.

## Prerequisites

- **Node.js** `>=22.12.0`
- **pnpm** 9 (use the repository's `pnpm-lock.yaml`)

## 1 · Get the project

```bash
pnpm install --frozen-lockfile
```

The site is statically generated, so it has no application runtime dependency.
Astro, the sitemap integration, and the Fira font packages are used during
development and build.

## 2 · Run the dev server

```bash
pnpm run dev
# → http://localhost:4321
```

Hot reload covers templates, styles and the per-component behavior scripts.

## 3 · Production build

```bash
pnpm run build     # → dist/
pnpm run preview   # serve the built site locally
```

The build inlines the small behavior modules, bundles one token-driven
stylesheet, and self-hosts the Fira woff2 files — no third-party requests.

## Where the system lives

| Path                    | Role                                  |
| ----------------------- | ------------------------------------- |
| `src/styles/tokens/`    | primitives → semantic roles → themes  |
| `src/styles/components/`| one stylesheet per system component   |
| `src/data/navigation.ts`| every menu link, in one typed file    |
| `src/content/`          | markdown for news, guides, and projects |

## Verify the install

Open any page and press the theme toggle: it should cycle
`auto → light → dark` with the monitor/sun/moon glyphs swapping. Then open a
mega menu panel and press <kbd>Esc</kbd> — focus must return to the trigger.

Next up: build your first page in the [quick start tutorial](/blog/guides/quick-start).
