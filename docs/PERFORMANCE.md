# Performance

The site uses Astro static generation to avoid rendering pages on every
request. This is an architectural choice, not a measured performance score;
measure the deployed site before making numeric performance claims.

## Current implementation

- Routes and collection content are rendered into static files in `dist/`.
- Component JavaScript is used for interactive navigation, theme selection,
  and search; the remaining page content is delivered as HTML.
- Fonts are self-hosted from Fontsource packages.
- Project preview illustrations are local SVG assets. Below-the-fold project
  images use lazy loading, asynchronous decoding, and declared dimensions.
- Search loads a generated JSON index when the search UI is used.
- Homepage content has modest opacity/transform entrance animations, a loading
  accent, and reduced-motion overrides in `src/styles/a11y.css`.
- Decorative card spotlights use one delegated, mouse-only `pointermove`
  listener on pages that contain spotlight cards; they do not register
  per-card listeners or reinitialize after navigation swaps.

## Performance review checklist

When changing the site:

1. Build the production site and measure representative routes at desktop and
   mobile widths.
2. Check Largest Contentful Paint, Cumulative Layout Shift, and Interaction to
   Next Paint using a repeatable browser profile and network conditions.
3. Inspect transferred JS/CSS, font loading, image dimensions, and the search
   index size; avoid loading the search data when the search interface is not
   opened.
4. Confirm that animations use compositor-friendly properties where possible
   and that reduced-motion preferences remove them.
5. Re-run `pnpm run check`, `pnpm run build`, and `pnpm run check:routes`.
6. After Cloudflare deployment is configured, compare local production build
   results with the deployed Workers Static Assets site.

## Measurement policy

Do not report Lighthouse or Core Web Vitals targets as achieved unless the
report, test environment, URL, and date are recorded. Record a baseline before
setting numeric budgets, then use the same device profile and test procedure
when comparing changes.
