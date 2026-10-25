/**
 * Navigation data model.
 *
 * The mega menu, search suggestions, mobile accordion and footer are all
 * rendered from these structures — edit content here, not in markup.
 * Mirrors the original index.html exactly (labels, order, hrefs).
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface NavColumn {
  title: string;
  links: NavLink[];
}

export interface NavPanel {
  /** Panel id — referenced by nav triggers via data-target/aria-controls. */
  id: string;
  /** Trigger label in the desktop nav. */
  label: string;
  /** Desktop grid span: 2 or 3 columns. */
  cols: 2 | 3;
  columns: NavColumn[];
}

export interface MobileSection {
  label: string;
  links: NavLink[];
}

const link = (label: string, href = '#'): NavLink => ({ label, href });

/* ---------------- Desktop mega-menu panels ---------------- */

export const navPanels: NavPanel[] = [
  {
    id: 'panel-overview',
    label: 'Overview',
    cols: 3,
    columns: [
      {
        title: 'Quick links',
        links: [
          link('Color tokens', '/blog/guides/theming-and-tokens'),
          link('Typography ladder', '/blog/guides/theming-and-tokens'),
          link('Spacing & layout', '/about#manifest'),
          link('Inspector commands', '/blog/news/inspector-commands-preview'),
        ],
      },
      {
        title: 'Core principles',
        links: [
          link('01 · Terminal at heart', '/about#principles'),
          link('02 · Rich, not noisy', '/about#principles'),
          link('03 · Legibility first', '/about#principles'),
          link('04 · Responsive by default', '/about#principles'),
        ],
      },
      {
        title: 'System',
        links: [
          link('Manifest & configuration', '/about#manifest'),
          link('Projects gallery', '/projects'),
          link('Inspector commands', '/blog/news/inspector-commands-preview'),
          link('Changelog — v1.0.0', '/blog/news/kolinn-nav-1-0'),
          link('Newsroom', '/blog'),
          link('Contact', '/contact'),
          link('Privacy Policy', '/legal/privacy-policy'),
        ],
      },
    ],
  },
  {
    id: 'panel-components',
    label: 'Components',
    cols: 3,
    columns: [
      {
        title: 'Inputs & controls',
        links: [
          link('Buttons & triggers'),
          link('Text controls & fields'),
          link('Selection controls'),
          link('Interactive command field'),
        ],
      },
      {
        title: 'Navigation & wayfinding',
        links: [
          link('Structural header'),
          link('Tabs & breadcrumbs'),
          link('Pagination & table controls'),
        ],
      },
      {
        title: 'Feedback & data',
        links: [
          link('Tags, badges & indicators'),
          link('Alerts & status banners'),
          link('Overlays & tooltips'),
          link('Data tables'),
          link('Skeleton loaders'),
        ],
      },
    ],
  },
  {
    id: 'panel-patterns',
    label: 'Patterns',
    cols: 2,
    columns: [
      {
        title: 'Workflows',
        links: [
          link('Operations overview'),
          link('Command → progress → result'),
          link('Progressive configuration'),
        ],
      },
      {
        title: 'Composition',
        links: [
          link('Three-up content discovery'),
          link('Theme parity', '/blog/guides/theming-and-tokens'),
        ],
      },
    ],
  },
  {
    id: 'panel-documentation',
    label: 'Documentation',
    cols: 3,
    columns: [
      {
        title: 'Specifications',
        links: [
          link('01 · Overview & principles'),
          link('02 · Color tokens'),
          link('03 · Typography'),
          link('04 · Spacing & layout'),
        ],
      },
      {
        title: 'Reference',
        links: [
          link('05 · Elements & components'),
          link('06 · Patterns & usage'),
          link('07 · System manifest'),
        ],
      },
      {
        title: 'Get started',
        links: [
          link('Installation guide', '/blog/guides/installation'),
          link('Quick start tutorial', '/blog/guides/quick-start'),
        ],
      },
    ],
  },
];

/* ---------------- Search panel suggestions ---------------- */

export const searchSuggestions: NavColumn = {
  title: 'Quick links',
  links: [
    link('Color tokens', '/blog/guides/theming-and-tokens'),
    link('Typography ladder', '/blog/guides/theming-and-tokens'),
    link('Spacing & layout', '/about#manifest'),
    link('Inspector commands', '/blog/news/inspector-commands-preview'),
  ],
};

/* ---------------- Mobile accordion sections ---------------- */

export const mobileSections: MobileSection[] = [
  {
    label: 'Overview',
    links: [
      link('01 · Terminal at heart', '/about#principles'),
      link('02 · Rich, not noisy', '/about#principles'),
      link('03 · Legibility first', '/about#principles'),
      link('04 · Responsive by default', '/about#principles'),
      link('Manifest & configuration', '/about#manifest'),
      link('Inspector commands', '/blog/news/inspector-commands-preview'),
      link('Changelog — v1.0.0', '/blog/news/kolinn-nav-1-0'),
    ],
  },
  {
    label: 'Components',
    links: [
      link('Buttons & triggers'),
      link('Text controls & fields'),
      link('Selection controls'),
      link('Interactive command field'),
      link('Structural header'),
      link('Tabs & breadcrumbs'),
      link('Pagination & table controls'),
      link('Tags, badges & indicators'),
      link('Alerts & status banners'),
      link('Overlays & tooltips'),
      link('Data tables'),
      link('Skeleton loaders'),
    ],
  },
  {
    label: 'Patterns',
    links: [
      link('Operations overview'),
      link('Command → progress → result'),
      link('Progressive configuration'),
      link('Three-up content discovery'),
      link('Theme parity', '/blog/guides/theming-and-tokens'),
    ],
  },
  {
    label: 'Documentation',
    links: [
      link('01 · Overview & principles'),
      link('02 · Color tokens'),
      link('03 · Typography'),
      link('04 · Spacing & layout'),
      link('05 · Elements & components'),
      link('06 · Patterns & usage'),
      link('07 · System manifest'),
      link('Get started', '/blog/guides/installation'),
    ],
  },
];

/* ---------------- Footer ---------------- */

export const footerLinks: NavColumn[] = [
  {
    title: 'Quick links',
    links: [
      link('Blog', '/blog'),
      link('Projects', '/projects'),
      link('Documentations', '/blog/guides'),
    ],
  },
  {
    title: 'Legal',
    links: [
      link('Terms', '/legal/terms-of-service'),
      link('Privacy', '/legal/privacy-policy'),
    ],
  },
];
