# KOLINN_NAV — Astro Starter

A terminal-inspired mega menu and demo site built on the **KOLINN Design System**
(Nord tokens · Fira typefaces · 8px rhythm · co-equal dark & light themes),
migrated from a monolithic `index.html + style.css + script.js` bundle to a
**component-based Astro project** — with the design philosophy, the token
architecture and every interaction preserved.

> All site content (posts, contact channels, manifest data) is generic demo data.

## Quick start

```bash
pnpm install
pnpm run dev        # → http://localhost:4321
pnpm run build      # → dist/ (static)
pnpm run preview    # serve the production build
pnpm run check      # astro check — type checking (0 errors)
```

Requires Node `^18.20.8 || ^20.3.0 || >=22.0.0` (Astro 5). Astro 6/7 need
Node ≥ 22 — upgrade `astro` when you're ready; nothing in this project uses
Astro-5-specific APIs.

## Routes

| Route                       | Page                                        |
| --------------------------- | ------------------------------------------- |
| `/`                         | Hero + "Uncompromised" featured grid        |
| `/about`                    | Principles · system manifest · changelog    |
| `/contact`                  | Demo transmission form + direct channels    |
| `/blog`                     | News + guides listing                       |
| `/blog/news/:slug`          | News post template (`news` collection)      |
| `/blog/guides/:slug`        | Guide post template (`guides` collection)   |

## Project structure

```text
src/
├── config/site.ts            # branding, metadata, CTA, manifest strip
├── content.config.ts         # Astro 5 Content Layer: news + guides collections
├── content/
│   ├── news/*.md             # 3 sample news posts (release/announcement/community)
│   └── guides/*.md           # 3 sample guides (ordered, leveled)
├── data/
│   ├── navigation.ts         # every mega-panel / accordion / footer link, typed
│   └── about.ts              # principles, manifest, timeline demo data
├── layouts/BaseLayout.astro  # tokens + fonts + theme boot + chrome + <slot/>
├── pages/                    # index, about, contact, blog/, blog/news|guides/[slug]
├── components/
│   ├── Header.astro          # nav shell + desktop mega-menu behavior script
│   ├── Footer.astro  PageHeader.astro  PostCard.astro  ContactForm.astro
│   ├── SkipLink.astro
│   ├── nav/                  # Logo, DesktopNav, NavActions, ThemeToggle, Hamburger,
│   │                         # MegaMenu, MegaPanel, SearchPanel, MenuCurtain,
│   │                         # MobileMenu (+ sheet/accordion script), MobileAccordion
│   ├── sections/             # Hero, FeaturedSection, FeaturedCard
│   └── ui/                   # Button, Badge, SearchField, icons/*
├── styles/
│   ├── global.css            # single entry — @import order mirrors the original §1→§15
│   ├── tokens/               # primitives.css → semantic.css → themes.css
│   ├── base.css  utilities.css  responsive.css  a11y.css (imported last)
│   └── components/           # one sheet per system component (+ page/post/form)
└── utils/posts.ts            # date formatting + reading-time estimate

tools/parity/                 # migration verification harnesses (see below)
```

## Design tokens

The token layer is extracted verbatim from the monolith into three files that
keep the original resolve-chain:

```text
tokens/primitives.css   Nord hex values, type scale, spacing, radii, motion, shadows
        ↓
tokens/semantic.css     roles only — surface-raised, text-muted, action-primary…
        ↓
tokens/themes.css       [data-theme="dark"] + auto (prefers-color-scheme) swap primitives
```

Components **never** reference a hex value — only semantic roles — so themes
flip the whole UI without touching a single component. 81 custom properties,
AA-verified pairs, `color-scheme` honored in both directions.

## Styling strategy

The design system stays **global, class-based CSS** organized per component
under `src/styles/components/`. This is deliberate:

- The original philosophy is *"all visual state is class-driven"* — behavior
  scripts toggle `is-open` / `is-active` / `is-animating` / `is-visible`
  across component boundaries (header ↔ flyout ↔ curtain ↔ sheet).
- A single imported cascade (`global.css`) preserves the exact §1→§15 order,
  including the reduced-motion contract in `a11y.css`, which must win last.
- New screens (page hero, post cards, prose, forms) extend the same token
  vocabulary instead of inventing parallel styles.

## Behavior layer

The monolithic `script.js` was split by ownership — each script ships only on
pages that render its component, is bundled as a dependency-free ES module,
and keeps the original semantics:

| Original section                  | Lives in                            |
| --------------------------------- | ----------------------------------- |
| §1 theme cycle + persistence      | `nav/ThemeToggle.astro` + pre-paint boot script in `BaseLayout.astro` |
| §2 mega menu (hover intent, click-only search, ResizeObserver height, curtain, dismissal paths) | `Header.astro` |
| §3 accordion + §4 mobile sheet    | `nav/MobileMenu.astro`              |
| §5 Escape / breakpoint handling   | split across Header + MobileMenu (mutually exclusive states) |
| — (new) demo contact form         | `ContactForm.astro`                 |

Scripts are written in TypeScript (type-checked by `pnpm run check`, types
stripped at build). DOM contracts — ids, `data-target`, ARIA wiring, `inert`
at rest — are unchanged from the monolith.

## Content collections

Markdown posts live in `src/content/{news,guides}/` (Astro 5 Content Layer,
zod-validated frontmatter). To add a post, drop a file in:

```md
---
title: "Your post"
description: "One-line teaser for cards + meta description."
pubDate: 2026-11-01
tags: [demo]
# news only:    category: release | announcement | community
# guides only:  level: beginner | intermediate | advanced
#               order: 4
draft: false
---
```

News is listed newest-first; guides sort by `order`. `draft: true` excludes a
post from both the listing and the static routes.

## Navigation data

All menu content is rendered from `src/data/navigation.ts` — mega panels,
search suggestions, the mobile accordion and the footer. Links that now have
real destinations (guides, news, about sections, contact) are wired; entries
without a demo page yet keep their original `href="#"` placeholder.

## Migration fidelity & verification

`tools/parity/` contains the harnesses used to prove the migration didn't
break anything (they need `npm i -D jsdom`; `css-diff` runs on plain Node):

```bash
node tools/parity/css-diff.js ../uploads/style.css dist/_astro
NODE_PATH=... node tools/parity/smoke.js dist/index.html
```

Results at migration time:

- **DOM parity** — built home page body was node-for-node identical to the
  original `index.html` (485/485 nodes, attributes and text; boolean-attr and
  whitespace normalized).
- **CSS parity** — all 140 original selectors, 81 custom properties and all
  4 `@keyframes` present in the bundled sheet (minifier renormalizations like
  `[data-theme=dark]` accounted for).
- **Behavior smoke (39/39)** — click/hover-intent activation, panel switching,
  click-only search, Escape + focus restoration, outside-click/scroll/grace
  dismissal, theme cycle + persistence, mobile sheet open/inert/scroll-lock,
  single-open accordion with stagger replay, link-click dismiss.
- **Contact form (9/9)** — validation states, aria-invalid, focus management,
  demo submit + reset.

The home page has since gained **intentional** diffs from the monolith: nav /
footer / CTA links now point at the new routes (plus two added links in the
Overview → System panel). Structure, classes, ids and ARIA are untouched.

## Intentional enhancements over the monolith

1. **Theme persistence** — the original saved the choice to `localStorage`
   but never read it back; a pre-paint inline boot script now restores it
   (validated, defaults to `auto`), with no flash of the wrong theme.
2. **Real Fira typefaces** — the original assumed locally installed fonts;
   the starter self-hosts Fira Code Variable + Fira Sans (400/500/600) via
   `@fontsource`, with the local-font stacks kept as fallbacks.
3. **Dead code dropped** — the unused `reduceMotionMQ` variable and the
   `onReady` wrapper (Astro module scripts are deferred by construction).
4. **favicon.svg** — terminal glyph in Nord colors.

Everything else — hover delays (80/200 ms), stagger timing, `inert`-based
focus containment, reduced-motion contract, skip link, live region — is a
faithful carry-over.
