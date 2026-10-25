# Phase 1 baseline

Baseline captured on **2026-10-26** for the deployed KOLINN site and the
current production build.

## Build and repository

| Item | Result |
| --- | --- |
| Repository revision | `6e9c1f9` (`main`) |
| Initial worktree state | Clean. |
| Runtime | Linux; Node.js `v24.21.0`; pnpm `12.14.0` |
| Project requirements | Node.js `>=22.12.0`; Astro `5.18.2`; Wrangler `4.152.0` |
| Build output | 29 generated HTML routes; CSP generated for 8 unique inline scripts, 12 style blocks, and 9 style attributes. |

The local pnpm version differs from the documented Cloudflare build version
(pnpm `9.10.0`); this run does not certify dependency installation in the
Cloudflare build environment.

Checks run from the repository root:

| Command | Result |
| --- | --- |
| `pnpm run check` | Passed: 72 Astro files; 0 errors, 0 warnings, 0 hints. |
| `pnpm run build` | Passed: 29 pages generated; CSP hash generation completed. |
| `pnpm run check:routes` | Passed: 1,646 local links checked; required routes, legacy redirects, and local targets resolve. |
| `pnpm exec wrangler deploy --dry-run` | Passed: Wrangler read 122 asset files and completed the dry run. |
| `git diff --check` | Passed. |

Representative production-preview routes returned `/` 200, `/search/` 200,
`/blog/guides/quick-start/` 200, `/projects/releases/apex-sentinel/` 200, and
an unknown path 404.

## Browser captures

Screenshots were captured from the production build served by `astro preview`
at `http://127.0.0.1:4322/`. Desktop captures used a 1440×900 viewport; mobile
captures used 540×1139, below the 769px mobile-navigation breakpoint. Images
are JPEG quality 70.

| View | Capture |
| --- | --- |
| Homepage — desktop | [home-desktop.jpg](./screenshots/home-desktop.jpg) |
| Homepage — mobile | [home-mobile.jpg](./screenshots/home-mobile.jpg) |
| Mobile navigation open | [mobile-menu-open.jpg](./screenshots/mobile-menu-open.jpg) |
| Desktop search open | [desktop-search-open.jpg](./screenshots/desktop-search-open.jpg) |
| Guide page — desktop | [guide-desktop.jpg](./screenshots/guide-desktop.jpg) |
| Project release — desktop | [project-desktop.jpg](./screenshots/project-desktop.jpg) |
| Not-found page — desktop | [not-found-desktop.jpg](./screenshots/not-found-desktop.jpg) |

Browser spot checks found no horizontal overflow at the measured mobile and
desktop widths. The homepage has one H1. Mobile menu open/close and focus
containment were exercised in the preceding review; this phase captured the
open state. The desktop search flyout was opened for its screenshot. These
checks are not a screen-reader or WCAG contrast audit.

## Performance sample

One browser Performance API sample per viewport was collected against the
local production preview, with no CPU or network throttling. This is a
diagnostic sample, not a Lighthouse score, field Core Web Vitals result, or
release budget. Browser/cache state can materially affect these numbers.

| Viewport | Response start | DOMContentLoaded | Load | FCP | LCP | CLS | Resources / transferred bytes |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Mobile 540×1139 | 7 ms | 77 ms | 106 ms | 232 ms | 364 ms | 0.000 | 7 / 2,100 bytes |
| Desktop 1440×900 | 7 ms | 89 ms | 116 ms | 232 ms | Not reported by observer | 0.000 | 7 / 2,100 bytes |

The local preview had already been visited during screenshot capture, so these
measurements may include warm-cache effects. Do not compare them directly to
Lighthouse or production field metrics.

## Audit limitations and prioritized follow-ups

1. **P1 — Verify Cloudflare Web Analytics delivery.** The live homepage
   returned the CSP allowing `static.cloudflareinsights.com` and
   `cloudflareinsights.com`, with no browser CSP console errors. No Insights
   beacon request was observed, so successful analytics delivery is not yet
   established.
2. **P2 — Re-run Lighthouse in an isolated browser profile.** The Lighthouse
   tool could not run: the Chrome DevTools MCP reported that its configured
   browser profile was already in use; the alternate audit entrypoint returned
   `INVALID_URL`. No score is inferred from the Performance API sample.
3. **P2 — Complete manual accessibility verification.** Keyboard behavior and
   static route checks provide partial evidence. Screen-reader announcements
   and measured light/dark contrast remain unaudited; no WCAG conformance
   claim is made.

The live homepage's restrictive CSP and mobile dialog behavior were rechecked
on 2026-10-26. Browser access to the public origin was intermittent during
capture, so the screenshots use the same revision's local production preview.
