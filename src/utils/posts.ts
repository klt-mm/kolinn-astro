/** Post helpers: human dates + a naive reading-time estimate. */

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
});

/** `2026-10-15T00:00:00.000Z` → `Oct 15, 2026` */
export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}

/** ~200 wpm estimate, minimum 1 minute. Accepts raw markdown source. */
export function readingTime(body: string | undefined): string {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
