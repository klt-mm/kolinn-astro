---
title: "Quick start tutorial"
description: "Compose a new page with the KOLINN component set: layout, page header, sections, buttons and badges — all driven by design tokens."
pubDate: 2026-10-05
level: beginner
order: 2
tags: [components, pages, composition]
---

In ten minutes you'll add a new page that looks like it has always been part
of the system. No new CSS required — every piece below already exists.

## 1 · Create the route

```astro
---
// src/pages/status.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import PageHeader from '../components/PageHeader.astro';
import Badge from '../components/ui/Badge.astro';
---

<BaseLayout title="Status — KOLINN_NAV">
  <main id="main" tabindex="-1">
    <PageHeader command="$ kolinn status --all" title="System status" />
    <section class="featured-section">
      <div class="container">
        <Badge pulsing>All systems nominal</Badge>
      </div>
    </section>
  </main>
</BaseLayout>
```

`BaseLayout` wires the tokens, fonts, theme boot script, header, mobile sheet
and footer around your `<slot />`.

## 2 · Reuse the card grid

`FeaturedCard` is a plain presentational component — index, title, slot:

```astro
<FeaturedCard index="04" title="Uptime">
  Rendered statically. No server, no runtime, nothing to fall over.
</FeaturedCard>
```

## 3 · Wire actions with Button

```astro
<Button href="/info/contact" variant="primary">Open a ticket</Button>
```

Pass `href` for a link, omit it for a `<button>`; extra classes merge onto the
root element for contextual sizing (`nav-cta`, `mobile-cta`, `form-submit`).

## Ground rules worth internalizing

1. **Never hardcode a hex value** in a component — consume a semantic role
   (`--kds-action-primary`), or add the role to `tokens/semantic.css` first.
2. **Space on the 8px grid** via `--kds-space-*`; half-steps exist for a
   reason (`--kds-space-half`).
3. **State is class-driven.** Behavior scripts toggle `is-*` classes and ARIA
   attributes; CSS owns every visual outcome.

Continue with [theming & design tokens](/blog/guides/theming-and-tokens) to
learn how the role system swaps entire palettes without touching components.
