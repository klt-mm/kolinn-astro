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
    title: 'Scalable & Robust',
    body:
      'Specializing in building robust, scalable applications and web solutions. ' +
      'With over 5 years of experience, the focus is on driving technical implementations ' +
      'and maintaining high code quality standards.',
  },
  {
    index: '02',
    title: 'Full-Stack Capability',
    body:
      'From advanced Python scripting and backend logic to frontend component-based ' +
      'development with React, delivering end-to-end digital solutions that scale.',
  },
  {
    index: '03',
    title: 'CS Fundamentals',
    body:
      'Strong foundation in core computer science principles, algorithmic proficiency, ' +
      'and data structures optimization for high-performance software design.',
  },
  {
    index: '04',
    title: 'Data-Driven Design',
    body:
      'Expertise in database querying, design, and management using SQL to ensure ' +
      'data integrity and efficient retrieval across complex services.',
  },
];

export interface ManifestEntry {
  key: string;
  value: string;
}

export const manifest: ManifestEntry[] = [
  { key: 'role', value: 'Software Engineer' },
  { key: 'location', value: 'Myanmar' },
  { key: 'experience', value: '5+ years' },
  { key: 'expertise', value: 'Python (5★), SQL, React, C++, Problem Solving' },
  { key: 'certifications', value: 'SE Role, SQL Adv, JS Int, REST Int' },
  { key: 'verification', value: 'https://hackerrank.com/profile/kyawlinthant_mm/' },
  { key: 'philosophy', value: 'End-to-end delivery · High code quality · Scalability' },
  { key: 'specialization', value: 'Backend logic · Automation · System Design' },
  { key: 'status', value: 'Available for professional opportunities' },
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

