/**
 * Site-level configuration.
 * Single source of truth for document metadata, branding and the
 * footer "console manifest" strip.
 */
export const site = {
  /** Product name rendered in the hero title. */
  name: 'KOLINN_NAV',
  /** <title> for pages that don't override it. */
  title: 'KOLINN_NAV — terminal-inspired mega menu',
  /** <meta name="description"> default. */
  description:
    'A terminal-inspired mega menu built on the KOLINN Design System with Nord tokens, Fira typefaces, and 8px rhythm.',
  /** Brand shown in the logo + footer. */
  brand: 'KOLINN',
  /** Author credit under the hero. */
  author: {
    name: 'KOLINN',
    url: 'https://kolinn.dev',
  },
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
