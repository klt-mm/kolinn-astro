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
  dialog, and focus returns to the toggle. Inactive desktop panels and
  collapsed mobile accordion panels are hidden from assistive technology and
  removed from keyboard focus. A static mobile navigation is available when
  JavaScript is disabled.
- Search results and form feedback use accessible status/label patterns.
- The demonstration contact form requires JavaScript to activate its submit
  control; without JavaScript it explains that no message can be sent and
  directs visitors to the direct contact links.
- The global reduced-motion stylesheet reduces animation and transition
  durations and disables selected decorative motion.
- Layouts support light, dark, and system theme selection.
- The generated route checker tests for a main landmark, duplicate IDs,
  accessible input/link names, local targets, and image alt/dimension
  attributes. These static checks do not replace manual assistive-technology
  testing.

## Measured token contrast

Ratios below use the WCAG relative-luminance contrast formula on the literal
token colors against the light/dark canvas and raised-surface colors. These
measurements were recorded on 2026-10-26. They are focused design-token
checks, not a full-page WCAG audit; gradients,
translucent overlays, images, syntax highlighting, and browser rendering need
separate inspection.

| Foreground role | Light canvas | Light raised | Dark canvas | Dark raised |
| --- | ---: | ---: | ---: | ---: |
| Primary text | 10.84:1 | 10.26:1 | 10.84:1 | 8.73:1 |
| Body text | 8.73:1 | 8.26:1 | 10.26:1 | 8.26:1 |
| Muted text | 6.40:1 | 6.06:1 | 9.25:1 | 7.45:1 |
| Accent subtitle | 5.20:1 | 4.92:1 | 5.99:1 | 4.83:1 |
| Primary action/link | 4.92:1 | 4.65:1 | 6.24:1 | 5.03:1 |
| Error text | 5.92:1 | 5.60:1 | 6.12:1 | 4.93:1 |
| Success text | 4.88:1 | 4.62:1 | 6.13:1 | 4.94:1 |

Button foreground/background contrast is 4.92:1 in light mode and 6.24:1 in
dark mode for the primary state. Hover/active states measure at least 4.92:1
in light mode and 4.64:1 in dark mode. Focus-ring contrast against
canvas/raised surfaces is 7.13:1 / 6.75:1 in light mode and 4.64:1 / 3.74:1
in dark mode, meeting the 3:1 non-text contrast threshold for the measured
solid colors.

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

Run `pnpm run check`, `pnpm test`, `pnpm run build`, and
`pnpm run check:routes` after changes. Browser checks should cover both desktop
and mobile layouts.
