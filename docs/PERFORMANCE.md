# Performance

Performance is a first-class citizen in this project. By utilizing the Astro framework and a lean asset strategy, the site achieves high Lighthouse scores and a snappy user experience.

## Optimization Strategies

### 1. Static Site Generation (SSG)
The project uses Astro's SSG capabilities to pre-render all pages to static HTML at build time. 
- **Zero-JS by Default**: No JavaScript is sent to the client unless explicitly requested via a `client:*` directive.
- **Fast Time-to-First-Byte (TTFB)**: Since pages are static files, they can be served directly from a CDN.

### 2. CSS Optimization
- **Token-Based Delivery**: CSS is structured into a small number of global files (`global.css`, `tokens/*.css`), reducing the number of HTTP requests.
- **Critical CSS**: Astro automatically extracts and inlines critical CSS to prevent Flash of Unstyled Content (FOUC) and improve Largest Contentful Paint (LCP).
- **Efficient Selectors**: Styles are written to be performant, avoiding deeply nested selectors and expensive CSS rules.

### 3. Asset Management
- **Variable Fonts**: The use of `Fira Code Variable` and `Fira Sans` reduces the number of font files that need to be downloaded by combining multiple weights into a single file.
- **Optimized SVGs**: Icons are implemented as Astro components, which inline the SVG code into the HTML, eliminating extra requests for small graphics.
- **Image Optimization**: Astro's image components are used to provide correctly sized and compressed images.

### 4. Quality Assurance & Parity
The project includes a set of custom parity tools in `/tools/parity` to prevent performance and visual regressions:
- **`css-diff.js` & `dom-diff.js`**: Used to compare the output of different build versions to ensure no unexpected bloat is introduced into the CSS or HTML.
- **Smoke Tests**: Simple automation scripts (`smoke.js`) verify that critical pages load and functional elements are present.

## Performance Metrics Goals

| Metric | Target | Strategy |
| :--- | :--- | :--- |
| **LCP** | < 1.2s | Static HTML + Inlined Critical CSS |
| **FID** | < 100ms | Minimal Client-side JS |
| **CLS** | < 0.1 | Fixed layout containers and font-swap optimization |
| **TBT** | < 100ms | Avoid heavy JS execution on the main thread |
