import assert from 'node:assert/strict';
import test from 'node:test';
import { compareNewestFirst, isPublished } from '../src/utils/content.js';

test('published-content filtering excludes drafts', () => {
  assert.equal(isPublished({ data: { draft: false } }), true);
  assert.equal(isPublished({ data: { draft: true } }), false);
});

test('newest-first ordering is deterministic when publication dates match', () => {
  const entries = [
    { id: 'zeta', data: { pubDate: new Date('2026-10-01') } },
    { id: 'older', data: { pubDate: new Date('2026-09-01') } },
    { id: 'alpha', data: { pubDate: new Date('2026-10-01') } },
  ];

  assert.deepEqual(
    entries.sort(compareNewestFirst).map(({ id }) => id),
    ['alpha', 'zeta', 'older']
  );
});
