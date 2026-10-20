# Accessibility (a11y)

This project is committed to providing an inclusive user experience. Accessibility is integrated into the core design system and component architecture rather than being added as an afterthought.

## Core Implementations

### 1. Keyboard Navigation
- **Skip Links**: A `SkipLink.astro` component is provided at the top of every page. This allows keyboard-only users to bypass the navigation and jump directly to the main content (`#main`).
- **Focus Management**: Semantic focus rings are defined in the design tokens (`--kds-focus-ring`), ensuring that interactive elements have a highly visible indicator when focused.
- **Logical Tab Order**: Components are structured to ensure a natural and predictable tab order.

### 2. Motion Comfort
To support users with vestibular disorders or those who prefer reduced motion, the site implements a global override in `a11y.css`:

- **`prefers-reduced-motion`**: When this system setting is detected, all animations and transitions are reduced to `0.01ms`, effectively disabling them.
- **Animation Kill-switch**: Specific complex animations (like shimmer text or logo cursors) are explicitly disabled to prevent distraction or nausea.

### 3. Visual Accessibility
- **Contrast**: The Nord-based color palette is chosen to maintain high contrast ratios between text and surfaces.
- **Theme Support**: Full support for Light, Dark, and System (Auto) themes allows users to choose the visual mode that best suits their visual needs.
- **Responsive Design**: A fluid layout system (using `clamp()` and relative units) ensures the site remains usable across various screen sizes and zoom levels.

### 4. Semantic HTML
The project prioritizes the use of native HTML5 semantic elements to provide meaning to assistive technologies:
- `<header>`, `<footer>`, `<main>`, and `<nav>` are used to define page regions.
- Proper heading hierarchies (`h1` $\rightarrow$ `h6`) are maintained across all content pages.
- Use of `<button>` for actions and `<a>` for navigation.

## Testing Checklist
When adding new features, ensure the following:
- [ ] Can the element be reached and activated via keyboard?
- [ ] Is the focus state clearly visible?
- [ ] Does the element have a descriptive `aria-label` if the text is not clear?
- [ ] Does the design remain functional when animations are disabled?
- [ ] Is the color contrast sufficient for the primary text roles?
