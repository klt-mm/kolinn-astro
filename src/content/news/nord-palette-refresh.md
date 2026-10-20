---
title: "Nord palette refresh: every pair re-tested for AA"
description: "Semantic color roles were re-mapped across dark and light Nord primitives, and all text/background pairs now clear WCAG AA with headroom."
pubDate: 2026-09-28
category: announcement
tags: [color, accessibility, tokens]
---

The color layer of the KOLINN Design System got a full audit this month. Every
semantic role — surfaces, text, actions, status — was re-tested against its
background in **both** themes, and a handful of Nord primitives were re-mapped
so no pair sits on the AA boundary.

## What changed

- `--kds-accent-subtitle` now resolves to `frost-0`, which holds ≥ 4.5:1 on
  raised surfaces in light mode (previously 4.3:1 — a fail we'd rather not
  ship).
- Action hover/active states were pushed one primitive darker in light mode,
  keeping the pressed feedback visible without touching hue.
- Status colors gained dedicated light-mode variants (aurora at ~60%
  lightness) instead of reusing the dark palette values.

```css
/* tokens/semantic.css — roles never hardcode hex values */
:root {
  --kds-accent-subtitle: var(--kds-frost-0);
  --kds-action-primary: var(--kds-frost-1);
  --kds-status-success: var(--kds-aurora-green);
}
```

## Why it matters

Because components only ever consume **semantic roles**, this refresh shipped
without a single component change. That is the token-first promise in
practice: primitives move, roles hold, the UI follows.

If you maintain a fork, re-run the contrast matrix before merging — the
[theming guide](/blog/guides/theming-and-tokens) walks through the checklist.
