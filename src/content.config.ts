/**
 * Content collections — KOLINN_NAV blog.
 *
 * Two markdown-backed collections rendered by the blog templates:
 *   news   → /blog/news/:slug   (announcements, releases, changelog)
 *   guides → /blog/guides/:slug (how-to documentation, ordered)
 *
 * Astro 5 Content Layer: files live in src/content/<collection>/*.md.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Fields shared by every post. */
const baseSchema = z.object({
  title: z.string(),
  /** One-line teaser used on cards + <meta name="description">. */
  description: z.string(),
  pubDate: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: baseSchema.extend({
    /** Announcement flavor, shown as a chip on cards + post header. */
    category: z.enum(['release', 'announcement', 'community']).default('announcement'),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: baseSchema.extend({
    /** Difficulty shown as a chip on cards + post header. */
    level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    /** Sort order inside the guides listing (ascending). */
    order: z.number().default(99),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: baseSchema.extend({
    image: z.string().startsWith('/').optional(),
    githubUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    techStack: z.array(z.string()).default([]),
  }),
});

export const collections = { news, guides, projects };
