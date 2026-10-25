---
title: "Nord palette refresh: key text colors checked for AA"
description: "Semantic color roles were re-mapped across dark and light Nord primitives, with key text and status pairs measured against their surfaces."
pubDate: 2026-09-28
category: announcement
tags: [color, accessibility, tokens]
---

The color layer of the KOLINN Design System had its key foreground and status
roles checked against canvas and raised surfaces in **both** themes. A few
primitives were adjusted where small text missed the 4.5:1 WCAG AA contrast
threshold.

## What changed

- `--kds-accent-subtitle` now resolves to `frost-0` (`#356c6a` in light mode),
  measuring 4.92:1 on raised surfaces (previously 4.04:1).
- Action hover/active states were pushed one primitive darker in light mode,
  keeping the pressed feedback visible without touching hue.
- Light success text and dark error text were adjusted to meet 4.5:1 on both
  canvas and raised surfaces.

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
