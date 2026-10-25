/**
 * @param {{ data: { draft: boolean } }} entry
 */
export function isPublished(entry) {
  return !entry.data.draft;
}

/**
 * @param {{ id: string, data: { pubDate: Date } }} a
 * @param {{ id: string, data: { pubDate: Date } }} b
 */
export function compareNewestFirst(a, b) {
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf() || a.id.localeCompare(b.id);
}
