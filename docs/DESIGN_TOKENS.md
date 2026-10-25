# Design Tokens

The site uses a token system based on Nord color primitives. Tokens centralize
palette, typography, spacing, radii, motion, and semantic roles so components
can stay consistent across the light and dark themes.

## Token Hierarchy

The styling system is split into three distinct layers to decouple raw values from their intent.

### 1. Primitives (`primitives.css`)
Primitives are the "source of truth" for raw values. They are theme-agnostic and do not describe *how* a value is used, only *what* it is.

- **Colors**: Named based on the Nord palette (e.g., `--kds-polar-0`, `--kds-frost-1`, `--kds-aurora-red`).
- **Typography**: Definitive font stacks for Sans and Mono, and a strict type scale (Caption $\rightarrow$ Display).
- **Spacing**: Based on an **8px rhythm** (e.g., `--kds-space-1: 8px`, `--kds-space-2: 16px`).
- **Radii**: Standardized corner rounding (`sm`, `md`, `lg`, `full`).
- **Motion**: Preset transition durations and a standard cubic-bezier timing function.
- **Shadows**: A set of elevation levels from `sm` to `xl`.

### 2. Semantic Layer (`semantic.css`)
Semantic tokens map palette values to roles. Use semantic tokens for component
colors so components do not depend on a specific theme's palette. Use the
provided typography, spacing, radius, and motion tokens for those properties.

| Role | Example Token | Intent |
| :--- | :--- | :--- |
| **Surface** | `--kds-surface-canvas` | The base background of the page |
| **Surface** | `--kds-surface-raised` | Background for cards or menus |
| **Text** | `--kds-text-primary` | High-contrast headings/body |
| **Text** | `--kds-text-muted` | De-emphasized secondary text |
| **Action** | `--kds-action-primary` | Main interactive elements (buttons, links) |
| **Status** | `--kds-status-error` | Error states, alerts |

### 3. Themes (`themes.css`)
Theme selectors update palette and semantic role values according to the
user's selected theme. The theme control supports light, dark, and automatic
system preference.

- **Light Theme**: Uses the standard Nord Light palette.
- **Dark Theme**: Overrides primitives with darker Nord values.
- **Auto Theme**: Uses `@media (prefers-color-scheme: dark)` to automatically switch based on system settings.

## Implementation Guide

When creating new components:
1. **Avoid raw hex codes**.
2. **Use semantic color roles** (for example, `--kds-surface-canvas`) rather
   than palette primitives in component color declarations.
3. **Use semantic tokens** for component colors (for example,
   `--kds-surface-canvas`).
4. For layout and spacing, use the spacing scale (e.g., `padding: var(--kds-space-3)`).

Tokenization does not establish WCAG contrast compliance. Measure actual
foreground/background pairs in both themes when changing colors.
