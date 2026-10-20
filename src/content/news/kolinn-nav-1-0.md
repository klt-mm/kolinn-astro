---
title: "KOLINN_NAV 1.0.0 ships the terminal mega menu"
description: "The first stable release of KOLINN_NAV lands with a height-animated flyout, hover-intent opening, inert-based focus containment and co-equal Nord themes."
pubDate: 2026-10-15
category: release
tags: [release, navigation, accessibility]
---

After three release candidates, **KOLINN_NAV 1.0.0** is stable. The mega menu now
anchors the KOLINN Design System: a terminal-inspired navigation surface built on
Nord tokens, Fira typefaces and an 8px rhythm.

## What ships in 1.0.0

- **Height-animated flyout.** The container measures exactly one layout read per
  interaction and keeps the panel height truthful through a `ResizeObserver`.
- **Hover intent + deterministic clicks.** Panels open after an 80 ms hover
  delay, close on a 200 ms grace period, and always open immediately on click,
  Enter or Space. Search is click-only.
- **Focus containment.** Closed surfaces are `inert`; Escape restores focus to
  the trigger that opened the panel.
- **Co-equal themes.** Dark and light are both first-class: the same semantic
  roles resolve over swapped Nord primitives, with an `auto` mode that follows
  the OS.

```bash
$ kolinn init --nav
✔ tokens resolved (81 custom properties)
✔ panels compiled (4 + search)
✔ theme: auto
> system ready
```

## Numbers behind the release

| Metric              | Value       |
| ------------------- | ----------- |
| JS shipped          | ~6 KB min   |
| Dependencies        | 0           |
| Layout reads / open | 1           |
| Contrast            | AA verified |

## What's next

The inspector command palette enters public preview next cycle, followed by
breadcrumb and pagination patterns for the documentation shell. Track progress
in the guides section — the [quick start tutorial](/blog/guides/quick-start)
already covers the 1.0.0 API.

> Terminal at heart. Rich, not noisy. Legibility first. Responsive by default.
