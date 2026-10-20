# Architecture

This project is built using **Astro**, a modern web framework designed for content-driven websites. The primary goal of the architecture is to maximize performance through static site generation (SSG) while maintaining a highly maintainable and extensible design system.

## Core Pillars

### 1. Static-First Approach
The site is primarily static. By leveraging Astro's zero-JS-by-default architecture, the site delivers minimal JavaScript to the client, ensuring near-instant load times and optimal SEO.

### 2. Component-Based UI
The UI is decomposed into a hierarchy of Astro components:
- **Layouts (`/src/layouts`)**: The `BaseLayout.astro` serves as the primary shell, managing the HTML head, global styles, and the core page structure.
- **Navigation (`/src/components/nav`)**: A complex, specialized set of components (MegaMenus, MobileMenus, ThemeToggles) designed for a professional navigation experience.
- **UI Library (`/src/components/ui`)**: Atomic components like `Button.astro`, `Badge.astro`, and `SearchField.astro` that provide consistent primitives across the site.
- **Sections (`/src/components/sections`)**: Composite components (Hero, FeaturedSection) used to build page-specific layouts.

### 3. Content-Driven Design
Content is separated from presentation using **Astro Content Collections**:
- **Guides**: Technical documentation and how-tos.
- **News**: Updates and announcements.
Markdown files in `/src/content` are processed and typed, ensuring data integrity and allowing for dynamic routing via `[slug].astro` pages.

### 4. Centralized Data Management
To avoid hardcoding values, site-wide data is centralized:
- **Configuration (`/src/config`)**: General site settings.
- **Static Data (`/src/data`)**: Navigation structures and "About" page content.

### 5. Tokenized Styling System
The styling architecture follows a strict three-tier hierarchy (detailed in [DESIGN_TOKENS.md](./DESIGN_TOKENS.md)):
`Primitives` $\rightarrow$ `Semantic Tokens` $\rightarrow$ `Themes`.
This allows the entire visual identity of the site to be swapped (e.g., Light to Dark mode) by redefining primitives without touching component-level CSS.

## Data Flow
`Content/Data` $\rightarrow$ `Astro Components` $\rightarrow$ `BaseLayout` $\rightarrow$ `Static HTML/CSS`
