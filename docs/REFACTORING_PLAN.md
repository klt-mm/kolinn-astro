# Code quality and design polish roadmap

This is the step-by-step implementation plan for improving the current Astro
site. Work phase by phase, preserve existing routes and interactions, and
record measured results rather than assuming an improvement. The roadmap also
includes Cloudflare Workers Static Assets readiness.

## Principles and delivery gates

- Make one focused phase per change set; avoid mixing unrelated visual and
  behavior changes.
- Before editing, capture the current generated routes and exercise the
  affected desktop/mobile interaction.
- For each phase, run the smallest relevant check, then the common gate:
  `pnpm run check`, `pnpm run build`, `pnpm run check:routes`, and
  `git diff --check`.
- Keep accessibility, responsive behavior, both themes, and reduced motion in
  each phase's acceptance checks.
- Document intentional behavior changes and update the architecture/docs in
  the same phase.

## Phase 1 — Establish a trustworthy baseline

1. Review the actual `package.json`, source tree, generated routes, and git diff.
2. Run the common validation gate and save the output and environment details.
3. Capture desktop and mobile screenshots of the homepage, menu, search, one
   content page, a project detail, and the 404 page.
4. Run accessibility and performance audits in an available browser profile;
   record URL/build, viewport, device/network profile, date, and report.
5. Create a prioritized issue list from reproducible findings only.

**Acceptance:** Baseline commands and evidence are reproducible; unverified
performance or contrast claims are not presented as measured facts.

## Phase 2 — Build correctness and maintainability

1. Resolve build/type diagnostics and fix broken or inconsistent route
   generation.
2. Remove stale comments, scripts, and documentation that refer to files or
   checks no longer in the repository.
3. Review content collection schemas, draft filtering, archive ordering, and
   canonical URLs for consistency.
4. Extract duplicated route, date, and content mapping logic only where a real
   duplication exists.
5. Add focused tests for content mapping, search-index output, and route
   generation where those behaviors currently lack coverage.

**Acceptance:** Type checks and production build pass; automated tests cover
the corrected behavior; public URLs remain stable or have explicit redirects.

## Phase 3 — Accessibility and interaction reliability

1. Audit desktop mega-menu and mobile dialog keyboard paths, focus restoration,
   escape behavior, inertness, and breakpoint changes.
2. Audit search, theme control, accordions, and contact form labels, announced
   states, errors, and no-JavaScript fallbacks.
3. Check heading hierarchy, landmarks, link purpose, image alternatives, and
   contrast in light and dark themes.
4. Test with keyboard and screen reader; retain `check:routes` as a static
   regression check, not a substitute for manual testing.
5. Fix findings in their owning component and update accessibility guidance.

**Acceptance:** No keyboard traps or inaccessible control states remain in
tested flows; contrast results are measured and recorded; reduced motion stays
usable.

## Phase 4 — Design system and visual consistency

1. Inventory token use and identify literal colors, spacing exceptions, and
   typography values that diverge from the system.
2. Agree on shared page-width, section-spacing, card, button, and heading
   patterns before changing individual pages.
3. Bring homepage, archives, detail pages, support content, forms, and errors
   into a consistent responsive layout using semantic tokens.
4. Review hover, focus, active, disabled, empty, and error states in both
   themes; ensure motion is nonessential.
5. Compare screenshots at defined mobile, tablet, and desktop viewports and
   iterate on visible regressions.

**Acceptance:** Page families share consistent layout and interaction styling;
no horizontal overflow at tested widths; screenshot differences are intentional.

## Phase 5 — Performance and content experience

1. Measure the production build and deployed pages before setting budgets.
2. Inspect client JavaScript and defer optional work, including search-index
   loading, until its interface is opened.
3. Verify image dimensions, loading priority, local asset sizes, font subsets,
   and layout stability.
4. Review homepage content freshness and archive ordering; avoid implying
   sample content is production or recently published content.
5. Re-test Core Web Vitals/Lighthouse with the Phase 1 procedure and document
   actual changes.

**Acceptance:** Measured improvements meet the agreed budgets with no
accessibility or layout regressions; no numeric score is claimed without a
recorded report.

## Phase 6 — Search, routes, and content quality

1. Verify generated search entries exclude drafts and point to canonical public
   routes.
2. Validate result ordering, no-result messaging, keyboard selection, and
   query initialization.
3. Ensure archive cards and page metadata share the collection's canonical
   values and dates.
4. Remove or replace placeholder destinations and demo contact information
   where they no longer match intended product behavior.
5. Expand the route checker only for stable, testable invariants.

**Acceptance:** Search and archives behave consistently with content schemas;
all local links and required routes resolve.

## Phase 7 — Cloudflare Workers Static Assets (repository configured)

1. Confirm the intended Cloudflare account/project name and deployment target.
2. Use the Cloudflare `cf` CLI workflow for this new project; do not add an SSR
   adapter because the site is statically generated.
3. Configure the Worker to serve Astro's `dist/` output, generated 404 pages,
   headers, and current URL/trailing-slash behavior.
4. Add package scripts for local Worker preview and deployment, binding type
   generation only if bindings are introduced, and concise setup instructions.
5. Validate the built site locally through the Worker toolchain, check route
   behavior and headers, then deploy only after account authentication and
   project details are supplied.
6. Add deployment/preview checks to CI after the local workflow is stable.

**Acceptance:** A clean checkout can build and run locally in the Worker
environment; static routes and 404 responses behave as expected; no secrets or
account identifiers are committed.

**Repository work completed:** Added Wrangler as a development dependency,
`wrangler.jsonc` for the static `dist/` assets, local preview/deploy scripts,
and [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md).

**Still required outside the repository:** Connect the GitHub repo and
Cloudflare account in Workers Builds, authorize access, complete the initial
deployment, then check deployed routes, headers, and optional custom domain.
Do not claim production deployment until those account-side steps and
verification are complete.

## Phase 8 — CI and release hygiene

1. Add or update CI to install from the committed pnpm lockfile and run check,
   build, and route validation.
2. Add browser smoke coverage for key desktop/mobile navigation and search
   flows if the repository's CI environment supports browsers.
3. Keep dependency updates intentional and verify lockfile consistency.
4. Document release, rollback, and Cloudflare preview steps after deployment
   is configured.

**Acceptance:** CI gates the same validated workflow used locally; release
instructions match the actual deployment setup.

## Completed work reflected in the current codebase

- Added support, documentation, FAQ, news/guides, project release, and search
  routes with navigation and route checks.
- Added local project preview illustrations and search index generation.
- Improved mobile navigation focus handling and menu consistency.
- Refreshed homepage content and added reduced-motion-aware entrance motion.
- Updated README and architecture, accessibility, and performance guidance to
  reflect current implementation.
