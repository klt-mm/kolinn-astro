# Architecture

KOLINN_NAV is an Astro 5 static site. Content, pages, and navigation are
rendered at build time; the browser scripts are limited to interactive
components such as menus, theme selection, and search.

## Request and build flow

```text
Markdown collections + typed site/navigation data
                 ↓
        Astro page templates
                 ↓
     shared layout and components
                 ↓
       static HTML/CSS/JS in dist/
```

`pnpm run build` generates the production site in `dist/`. There is no
server-rendered route or Worker handler at present. The static build is a fit
for Cloudflare Workers Static Assets once the Worker deployment configuration
and CLI scripts are added.

## Source organization

- `src/layouts/` contains the shared document shell and specialized layouts.
  `BaseLayout.astro` defines metadata, global style/font imports, theme boot,
  navigation, the page slot, and footer.
- `src/pages/` defines the public URL tree, content archives, search page, and
  static routes generated from collection entries.
- `src/components/nav/` and `src/components/` hold navigation behavior,
  reusable UI, and content cards.
- `src/content/` contains Markdown news, guides, and project examples.
  `src/content.config.ts` validates collection frontmatter.
- `src/config/` and `src/data/` hold site configuration, navigation structure,
  and page data that is shared across templates.
- `src/styles/` holds the token layers, global entry point, responsive rules,
  accessibility overrides, and component styles.
- `src/utils/` contains shared content and search-index helpers.
- `tools/check-routes.mjs` checks generated route and link integrity after a
  production build.

## Public route groups

```text
/blog/news/:slug
/blog/guides/:slug
/projects/releases/:slug
/projects/help/documentations
/projects/help/faqs
/info/support
/info/contact
/info/about
/search
```

The `/blog`, `/blog/news`, `/blog/guides`, and `/projects/releases` routes are
content archives. `/search-index.json` is generated from public searchable
content; the search UI uses it client-side and offers browseable links if
JavaScript is unavailable.

## Styling and behavior boundaries

`src/styles/global.css` defines the CSS import order: tokens, base and utility
styles, component styles, responsive rules, then `a11y.css`. Keep accessibility
overrides last. Component scripts own state transitions and ARIA/focus updates;
CSS styles the resulting state classes and attributes.

## Deployment boundary

The project currently builds static output only. Hosting, custom domains,
environment bindings, and Worker runtime code are not configured in the
repository. For a static site, prefer Workers Static Assets rather than adding
an SSR adapter or backend services without a concrete runtime requirement.
