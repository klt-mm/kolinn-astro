import { getCollection } from 'astro:content';
import { navPanels } from '../data/navigation';
import { isPublished } from './content.js';

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  content?: string;
}

export async function getSearchIndex(): Promise<SearchItem[]> {
  const [news, guides, projects] = await Promise.all([
    getCollection('news', isPublished),
    getCollection('guides', isPublished),
    getCollection('projects', isPublished),
  ]);

  const items: SearchItem[] = [
    ...news.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      href: `/blog/news/${entry.id}`,
      content: entry.body,
    })),
    ...guides.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      href: `/blog/guides/${entry.id}`,
      content: entry.body,
    })),
    ...projects.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      href: `/projects/releases/${entry.id}`,
      content: `${entry.data.techStack.join(' ')} ${entry.body}`,
    })),
    { title: 'Home', description: 'KOLINN_NAV home page', href: '/' },
    { title: 'Blog', description: 'News and guides archive', href: '/blog' },
    { title: 'All news', description: 'News and release announcements', href: '/blog/news' },
    { title: 'All guides', description: 'How-to guides and documentation', href: '/blog/guides' },
    { title: 'Projects', description: 'Project gallery', href: '/projects' },
    { title: 'Project releases', description: 'Project release archive', href: '/projects/releases' },
    {
      title: 'Documentations',
      description: 'Setup, usage, and design-system documentation',
      href: '/projects/help/documentations',
    },
    { title: 'FAQs', description: 'Frequently asked questions', href: '/projects/help/faqs' },
    { title: 'Support', description: 'Support options and contact information', href: '/info/support' },
    { title: 'Contact', description: 'Contact and collaboration inquiries', href: '/info/contact' },
    { title: 'About', description: 'About, principles, and system manifest', href: '/info/about' },
    ...navPanels.flatMap((panel) =>
      panel.columns.flatMap((column) =>
        column.links.map((link) => ({
          title: link.label,
          description: `${panel.label} · ${column.title}`,
          href: link.href,
        }))
      )
    ),
  ];

  const uniqueItems = new Map<string, SearchItem>();
  items.forEach((item) => {
    if (!uniqueItems.has(item.href)) uniqueItems.set(item.href, item);
  });
  return [...uniqueItems.values()];
}
