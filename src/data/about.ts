/**
 * About-page demo data: principles, system manifest and changelog.
 * Labels mirror the mega-menu "Core principles" column so the nav and
 * the page tell the same story.
 */

export interface Principle {
  index: string;
  title: string;
  body: string;
}

export const principles: Principle[] = [
  {
    index: '01',
    title: 'Terminal at heart',
    body:
      'Prompts, cursors and command lines are not decoration — they are the interface grammar. ' +
      'Every surface should read like a well-kept console: explicit, stateful, honest.',
  },
  {
    index: '02',
    title: 'Rich, not noisy',
    body:
      'Motion and chrome exist to explain state, never to fill silence. One layout read per ' +
      'interaction, animations on transform and opacity only, and stagger measured in 40ms.',
  },
  {
    index: '03',
    title: 'Legibility first',
    body:
      'Nord pairs re-tested for AA in both themes, Fira Code for machine voice, Fira Sans for ' +
      'prose, and an 8px rhythm that keeps density calm at every breakpoint.',
  },
  {
    index: '04',
    title: 'Responsive by default',
    body:
      'The desktop flyout and the mobile sheet are the same system at different widths — ' +
      'identical tokens, identical content, breakpoint-aware behavior.',
  },
];

export interface ManifestEntry {
  key: string;
  value: string;
}

export const manifest: ManifestEntry[] = [
  { key: 'version', value: 'v1.0.0 · stable' },
  { key: 'palette', value: 'Nord — dark + light, auto-ready' },
  { key: 'typefaces', value: 'Fira Code Variable (mono) · Fira Sans (prose)' },
  { key: 'rhythm', value: '8px grid, 4px half-steps' },
  { key: 'container', value: 'max 90rem · gutter clamp(8px, 2.5vw, 32px)' },
  { key: 'tokens', value: '81 custom properties across 3 layers' },
  { key: 'motion', value: '150–400ms · cubic-bezier(0.4, 0, 0.2, 1)' },
  { key: 'a11y', value: 'AA contrast · inert containment · full keyboard paths' },
  { key: 'dependencies', value: '0 runtime (Astro + Fira font sources at build time)' },
];

export interface TimelineEntry {
  date: string;
  label: string;
  href: string;
}

export const timeline: TimelineEntry[] = [
  {
    date: '2026-10-15',
    label: 'KOLINN_NAV 1.0.0 ships the terminal mega menu',
    href: '/blog/news/kolinn-nav-1-0',
  },
  {
    date: '2026-09-28',
    label: 'Nord palette refresh — every pair re-tested for AA',
    href: '/blog/news/nord-palette-refresh',
  },
  {
    date: '2026-09-02',
    label: 'Inspector commands enter public preview',
    href: '/blog/news/inspector-commands-preview',
  },
];
