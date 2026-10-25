/**
 * Navigation data model.
 *
 * The mega menu, search suggestions, mobile accordion and footer are all
 * rendered from these structures — edit content here, not in markup.
 * Mirrors the public sitemap across the desktop mega menu, mobile
 * accordion, search suggestions, and footer.
 */

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
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

const link = (label: string, href: string): NavLink => ({ label, href });

/* ---------------- Desktop mega-menu panels ---------------- */

export const navPanels: NavPanel[] = [
  {
    id: 'panel-blog',
    label: 'Blog',
    cols: 3,
    columns: [
      {
        title: 'News',
        links: [
          link('All news', '/blog/news'),
          link('Inspector commands preview', '/blog/news/inspector-commands-preview'),
          link('KOLINN_NAV 1.0', '/blog/news/kolinn-nav-1-0'),
          link('Nord palette refresh', '/blog/news/nord-palette-refresh'),
        ],
      },
      {
        title: 'Guides',
        links: [
          link('All guides', '/blog/guides'),
          link('Installation', '/blog/guides/installation'),
          link('Quick start', '/blog/guides/quick-start'),
          link('Theming & tokens', '/blog/guides/theming-and-tokens'),
        ],
      },
      {
        title: 'Blog',
        links: [
          link('All posts', '/blog'),
        ],
      },
    ],
  },
  {
    id: 'panel-projects',
    label: 'Projects',
    cols: 3,
    columns: [
      {
        title: 'Releases',
        links: [
          link('All releases', '/projects/releases'),
          link('Apex Sentinel', '/projects/releases/apex-sentinel'),
          link('Lumina UI', '/projects/releases/lumina-ui'),
          link('Nova Core', '/projects/releases/nova-core'),
        ],
      },
      {
        title: 'Help',
        links: [
          link('Documentations', '/projects/help/documentations'),
          link('FAQs', '/projects/help/faqs'),
        ],
      },
      {
        title: 'Projects',
        links: [
          link('All projects', '/projects'),
        ],
      },
    ],
  },
  {
    id: 'panel-info',
    label: 'Info',
    cols: 3,
    columns: [
      {
        title: 'Information',
        links: [
          link('Support', '/info/support'),
          link('Contact', '/info/contact'),
          link('About', '/info/about'),
        ],
      },
      {
        title: 'Help',
        links: [
          link('Documentations', '/projects/help/documentations'),
          link('FAQs', '/projects/help/faqs'),
        ],
      },
    ],
  },
];

/* ---------------- Search panel suggestions ---------------- */

export const searchSuggestions: NavColumn = {
  title: 'Quick links',
  links: [
    link('Documentations', '/projects/help/documentations'),
    link('FAQs', '/projects/help/faqs'),
    link('Support', '/info/support'),
    link('Contact', '/info/contact'),
  ],
};

/* ---------------- Mobile accordion sections ---------------- */

export const mobileSections: MobileSection[] = [
  {
    label: 'Blog · News',
    links: [
      link('All news', '/blog/news'),
      link('Inspector commands preview', '/blog/news/inspector-commands-preview'),
      link('KOLINN_NAV 1.0', '/blog/news/kolinn-nav-1-0'),
      link('Nord palette refresh', '/blog/news/nord-palette-refresh'),
    ],
  },
  {
    label: 'Blog · Guides',
    links: [
      link('All guides', '/blog/guides'),
      link('Installation', '/blog/guides/installation'),
      link('Quick start', '/blog/guides/quick-start'),
      link('Theming & tokens', '/blog/guides/theming-and-tokens'),
    ],
  },
  {
    label: 'Projects · Releases',
    links: [
      link('All releases', '/projects/releases'),
      link('Apex Sentinel', '/projects/releases/apex-sentinel'),
      link('Lumina UI', '/projects/releases/lumina-ui'),
      link('Nova Core', '/projects/releases/nova-core'),
      link('All projects', '/projects'),
    ],
  },
  {
    label: 'Projects · Help',
    links: [
      link('Documentations', '/projects/help/documentations'),
      link('FAQs', '/projects/help/faqs'),
    ],
  },
  {
    label: 'Info',
    links: [
      link('Support', '/info/support'),
      link('Contact', '/info/contact'),
      link('About', '/info/about'),
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
      link('Documentations', '/projects/help/documentations'),
      link('FAQs', '/projects/help/faqs'),
      link('Support', '/info/support'),
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'GitHub', href: 'https://github.com/klt-mm/', external: true },
      { label: 'CodePen', href: 'https://codepen.io/klt-mm/', external: true },
      {
        label: 'HackerRank',
        href: 'https://hackerrank.com/profile/kyawlinthant_mm/',
        external: true,
      },
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
