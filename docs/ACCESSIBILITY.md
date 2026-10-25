# Accessibility

Accessibility behavior is implemented in the shared layout, navigation
components, semantic page templates, and `src/styles/a11y.css`. This describes
the implementation; it is not a claim of conformance certification.

## Existing support

- The shared layout renders a skip link to the page's focusable `#main` landmark.
- Interactive controls use native links and buttons, visible focus styling, and
  labels or accessible names.
- Desktop and mobile navigation expose disclosure state and manage focus during
  the mobile dialog interaction. The dialog scope includes its single animated
  menu toggle; Tab and Shift+Tab remain within that scope, Escape closes the
  dialog, and focus returns to the toggle.
- Search results and form feedback use accessible status/label patterns.
- The global reduced-motion stylesheet reduces animation and transition
  durations and disables selected decorative motion.
- Layouts support light, dark, and system theme selection.
- The generated route checker tests for a main landmark, duplicate IDs,
  accessible input/link names, local targets, and image alt/dimension
  attributes. These static checks do not replace manual assistive-technology
  testing.

## Review checklist

For each behavior or content change:

1. Use keyboard-only navigation to test focus order, visible focus, and
   activation of all controls.
2. Test mobile navigation open/close, Tab and Shift+Tab wrapping, Escape, focus
   containment/restoration, background inertness, and resizing across the
   breakpoint.
3. Test search and forms with screen-reader announcements and error states.
4. Inspect heading order, landmark names, link purpose, image alternatives, and
   accessible names in the rendered page.
5. Test with reduced motion enabled and with both themes active.
6. Measure foreground/background contrast for each theme; do not assume a
   palette passes WCAG based on its name.
7. Include automated checks and manual browser/assistive-technology results in
   the change report.

Run `pnpm run check`, `pnpm run build`, and `pnpm run check:routes` after
changes. Browser checks should cover both desktop and mobile layouts.
