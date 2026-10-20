---
title: "Theming & design tokens"
description: "How KOLINN's three token layers — Nord primitives, semantic roles, theme overrides — deliver co-equal dark and light modes with zero component changes."
pubDate: 2026-10-10
level: intermediate
order: 3
tags: [tokens, theming, architecture]
---

Theming in KOLINN is not a dark-mode bolt-on. Dark and light are **co-equal**:
the same components, the same roles, a different primitive palette underneath.

## The three layers

```text
primitives.css   Nord hex values + type scale + spacing + motion
      ↓
semantic.css     roles: surface-raised, text-muted, action-primary…
      ↓
themes.css       [data-theme="dark"] / auto swap the primitives
```

Components reference **roles only**. When a theme flips, roles re-resolve —
no component stylesheet is ever edited.

```css
/* a component consumes roles… */
.featured-card {
  background: var(--kds-surface-raised);
  border: 1px solid var(--kds-border-default);
}

/* …so themes only ever touch tokens */
[data-theme="dark"] {
  --kds-polar-1: #3b4252;  /* surface-raised follows automatically */
  --kds-polar-3: #4c566a;  /* border-default follows automatically */
}
```

## The auto mode

`data-theme="auto"` defers to `prefers-color-scheme` through a media query
scoped to `:root:not([data-theme="light"])`. A pre-paint inline script in
`BaseLayout` restores the visitor's last explicit choice from
`localStorage`, so there is no flash of the wrong theme.

The toggle cycles `auto → light → dark → auto` and the glyph set
(monitor / sun / moon) is pure CSS keyed off the `data-theme` attribute —
the script never swaps icons manually.

## Adding a new role

1. Pick or add the primitive in `tokens/primitives.css`.
2. Map the role in `tokens/semantic.css`.
3. If the dark palette needs a different primitive value, override it in
   `tokens/themes.css` — **both** the pinned-dark and auto blocks.
4. Re-run the contrast matrix: every role pair must clear AA in both themes.

> Rule of thumb: if a component PR contains a hex code, the review answer is
> "make it a token."

## Reduced motion is a theme too

`a11y.css` treats `prefers-reduced-motion` like a first-class theme: all
animation durations collapse to ~0, the shimmer gradient falls back to solid
text, and the blinking cursor stands still. It is imported last so it always
wins the cascade.
