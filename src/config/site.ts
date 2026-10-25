/**
 * Site-level configuration.
 * Single source of truth for document metadata, branding and the
 * footer "console manifest" strip.
 */
export const site = {
  /** Product name rendered in the hero title. */
  name: 'KOLINN_NAV',
  /** <title> for pages that don't override it. */
  title: 'KOLINN_NAV — Projects, guides, and design system',
  /** <meta name="description"> default. */
  description:
    'Explore KOLINN_NAV, an Astro-powered site featuring responsive navigation, project releases, searchable documentation, news, and practical guides.',
  /** Brand shown in the logo + footer. */
  brand: 'KOLINN',
  /** Primary call-to-action (desktop nav + mobile sheet). */
  cta: {
    label: 'Get started',
    href: '/blog/guides/quick-start',
  },
  /** Version/meta strip — mirrored in the hero badge and the footer. */
  version: 'v1.0.0',
  updated: '2026-10-15',
  channel: 'stable',
} as const;
